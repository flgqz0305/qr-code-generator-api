// api/generate-qr.js
const QRCode = require('qrcode');

module.exports = async (req, res) => {
  const { text } = req.query;

  if (!text) {
    res.status(400).send('Missing "text" query parameter.');
    return;
  }

  try {
    const qrDataURL = await QRCode.toDataURL(text);
    const img = Buffer.from(qrDataURL.split(',')[1], 'base64');

    res.setHeader('Content-Type', 'image/png');
    res.send(img);
  } catch (error) {
    res.status(500).send('Error generating QR code.');
  }
};
