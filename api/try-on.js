const { makeTryOn } = require('../server.cjs');

const requestsByIp = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter(time => now - time < 3600000);
  if (recent.length >= 6) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
}

module.exports = async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' });
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!key || !secret) return response.status(503).json({ error: 'Try-on server is not configured.' });
  let sameOrigin = !request.headers.origin;
  try { if (request.headers.origin) sameOrigin = new URL(request.headers.origin).host === request.headers.host; }
  catch { sameOrigin = false; }
  if (!sameOrigin) return response.status(403).json({ error: 'This request must come from the site.' });
  if (request.headers['content-type']?.split(';')[0] !== 'application/json') return response.status(415).json({ error: 'Expected JSON.' });
  let input;
  try { input = request.body; }
  catch { return response.status(400).json({ error: 'Invalid request.' }); }
  if (JSON.stringify(input || {}).length > 2048) return response.status(413).json({ error: 'Request too large.' });
  const id = String(input?.photoPublicId || '');
  if (!/^stories-woven-in-beads\/visitor-photos\/[A-Za-z0-9_-]+$/.test(id)) return response.status(400).json({ error: 'Upload a portrait using the photo picker first.' });
  if (rateLimited(request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown')) return response.status(429).json({ error: 'Try-on limit reached. Please try again later.' });
  try { return response.status(200).json(await makeTryOn(id, { key, secret })); }
  catch (error) {
    console.error(error.message);
    return response.status(502).json({ error: 'Cloudinary could not create this preview. Try a clearer portrait or try again later.' });
  }
};
