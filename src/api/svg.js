export default async function handler(req, res) {
  const match = req.url.match(/\/svg\/(.+)$/);
  const emoji = decodeURIComponent(match ? match[1] : "");

  if (typeof Intl.Segmenter === "undefined") {
    res.statusCode = 500;
    return res.end("Intl.Segmenter not supported.");
  }

  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(emoji)];

  if (!emoji || graphemes.length > 8) {
    res.statusCode = 400;
    return res.end("Invalid emoji");
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48">${emoji}</text>
  </svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.statusCode = 200;
  res.end(svg);
}
