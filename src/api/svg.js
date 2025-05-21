export default function handler(req, res) {
  try {
    const rawEmoji = decodeURIComponent(req.url.replace('/svg/', ''));
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const graphemes = [...segmenter.segment(rawEmoji)];

    if (!rawEmoji || graphemes.length > 6) {
      res.statusCode = 400;
      return res.end("Invalid emoji");
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
      <text x="8" y="12" font-size="12" text-anchor="middle" dominant-baseline="middle">${rawEmoji}</text>
    </svg>`;

    res.setHeader("Content-Type", "image/svg+xml");
    res.statusCode = 200;
    res.end(svg);

  } catch {
    res.statusCode = 400;
    res.end("Invalid emoji");
  }
}
