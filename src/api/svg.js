export default function handler(req, res) {
  try {
    const urlParts = req.url.split("/");
    const emojiEncoded = urlParts[1];

    if (!emojiEncoded) {
      res.status(400).end("Invalid emoji: missing");
      return;
    }

    const emoji = decodeURIComponent(emojiEncoded);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
      <text x="0" y="14" font-size="14">${emoji}</text>
    </svg>`;

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.status(200).end(svg);
  } catch (e) {
    res.status(500).end("Server error: " + e.message);
  }
}
