module.exports = (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed.' });
  response.status(200).json({ available: Boolean(process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) });
};
