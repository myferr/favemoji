export default function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const emojiEncoded = decodeURIComponent(url.pathname.slice(1));
    const sizeParam = parseInt(url.searchParams.get("size"), 10);

    if (!emojiEncoded || emojiEncoded.length > 16) {
      res.status(400).end("Invalid emoji");
      return;
    }

    const size = !isNaN(sizeParam) && sizeParam > 0 ? sizeParam : 64;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.floor(size * 0.75)}">
          ${emojiEncoded}
        </text>
      </svg>
    `;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.status(200).end(svg);
  } catch (e) {
    res.status(500).end("Server error: " + e.message);
  }
}
