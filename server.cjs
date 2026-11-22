const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const cloudName = 'do52esnhp';
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
  '.md': 'text/markdown; charset=utf-8',
};
const requestsByIp = new Map();

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 2048) throw new Error('Request too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter(time => now - time < 3600000);
  if (recent.length >= 6) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

function assetUrl(publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fit,w_900,h_1200/f_jpg,q_auto/${publicId}`;
}

async function makeTryOn(publicId, credentials) {
  const auth = `Basic ${Buffer.from(`${credentials.key}:${credentials.secret}`).toString('base64')}`;
  const body = {
    prompt: 'Create a respectful AI virtual try-on visualization. Keep the same adult person from image [1], preserving their face, skin tone, age, expression, and pose. Wrap a red checked shuka over their shoulders using only the cloth as inspiration from image [2]. Add layered multicolour bead necklaces inspired by the beadwork details in image [3]. Keep the original background. Do not copy other people or text from the reference images. No weapons. Photorealistic.',
    reference_images: [
      { source_type: 'url', url: assetUrl(publicId) },
      { source_type: 'url', url: assetUrl('stories-woven-in-beads/voices-4') },
      { source_type: 'url', url: assetUrl('stories-woven-in-beads/beadwork-detail') },
    ],
    model: { mode: 'auto', preference: 'economy_fast' },
    image_size: { width: 768, height: 1024 },
    format: 'png',
    target: { target_type: 'temporary' },
  };
  const response = await fetch(`https://api.cloudinary.com/v2/generate/${cloudName}/image_to_image`, {
    method: 'POST',
    headers: { authorization: auth, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(120000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Cloudinary generation returned ${response.status}: ${result.error?.message || 'unknown error'}`);
  const asset = result.data?.assets?.[0];
  if (!asset?.storage?.secure_url) throw new Error('Cloudinary did not return an image URL');
  return { imageUrl: asset.storage.secure_url, expiresAt: asset.storage.expires_at, model: asset.model?.id || '' };
}

function startServer({ key = process.env.CLOUDINARY_API_KEY, secret = process.env.CLOUDINARY_API_SECRET, port = Number(process.env.PORT || 4173), host = process.env.HOST || '127.0.0.1' } = {}) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === '/api/try-on/status' && req.method === 'GET') {
      sendJson(res, 200, { available: Boolean(key && secret) });
      return;
    }
    if (url.pathname === '/api/try-on' && req.method === 'POST') {
      if (!key || !secret) { sendJson(res, 503, { error: 'Try-on server is not configured.' }); return; }
      const origin = req.headers.origin;
      let sameOrigin = !origin;
      try { if (origin) sameOrigin = new URL(origin).host === req.headers.host; }
      catch { sameOrigin = false; }
      if (!sameOrigin) {
        sendJson(res, 403, { error: 'This request must come from the site.' }); return;
      }
      if (req.headers['content-type']?.split(';')[0] !== 'application/json') {
        sendJson(res, 415, { error: 'Expected JSON.' }); return;
      }
      let input;
      try { input = await readJson(req); }
      catch { sendJson(res, 400, { error: 'Invalid request.' }); return; }
      const id = String(input.photoPublicId || '');
      if (!/^stories-woven-in-beads\/visitor-photos\/[A-Za-z0-9_-]+$/.test(id)) {
        sendJson(res, 400, { error: 'Upload a portrait using the photo picker first.' }); return;
      }
      if (rateLimited(req.socket.remoteAddress || 'unknown')) {
        sendJson(res, 429, { error: 'Try-on limit reached. Please try again later.' }); return;
      }
      try { sendJson(res, 200, await makeTryOn(id, { key, secret })); }
      catch (error) {
        console.error(error.message);
        sendJson(res, 502, { error: 'Cloudinary could not create this preview. Try a clearer portrait or try again later.' });
      }
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
    let filePath;
    try { filePath = path.resolve(root, `.${decodeURIComponent(url.pathname)}`); }
    catch { res.writeHead(400); res.end('Invalid path'); return; }
    if (filePath !== root && !filePath.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    const servedFile = filePath === root ? path.join(root, 'index.html') : filePath;
    fs.readFile(servedFile, (error, data) => {
      if (error) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, {
        'content-type': mimeTypes[path.extname(servedFile)] || 'application/octet-stream',
        'cache-control': /\.(html|js|css)$/.test(servedFile) ? 'no-cache' : 'public, max-age=3600',
      });
      res.end(req.method === 'HEAD' ? undefined : data);
    });
  });
  server.listen(port, host, () => console.log(`Preview: http://127.0.0.1:${port}`));
  return server;
}

if (require.main === module) startServer();
module.exports = { startServer, makeTryOn };
