export default function handler(req, res) {
  try {
    const path = req.url.split("?")[0];
    const emojiEncoded = decodeURIComponent(path.slice(1));

    if (!emojiEncoded || emojiEncoded.length > 16) {
      res.status(400).end("Invalid emoji");
      return;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 64 64">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48">
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
