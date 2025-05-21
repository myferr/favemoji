export default function handler(req, res) {
  try {
    const rawEmoji = decodeURIComponent(req.url.replace('/emoji/', ''));
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const graphemes = [...segmenter.segment(rawEmoji)];

    if (!rawEmoji || graphemes.length > 6) {
      res.statusCode = 400;
      return res.end("Invalid emoji");
    }

    const faviconUrl = `/svg/${encodeURIComponent(rawEmoji)}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Favicon: ${rawEmoji}</title>
        <link rel="icon" href="${faviconUrl}" type="image/svg+xml" />
        <style>
          body { font-family: system-ui, sans-serif; text-align: center; margin-top: 3rem; }
          h1 { font-size: 5rem; }
        </style>
      </head>
      <body>
        <h1>${rawEmoji}</h1>
        <p>This emoji is your favicon!</p>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    res.end(html);

  } catch {
    res.statusCode = 400;
    res.end("Invalid emoji");
  }
}
