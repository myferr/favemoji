export default async function handler(req, res) {
  const { url } = req;
  const emoji = decodeURIComponent(url.slice(1));

  if (!emoji) {
    res.statusCode = 400;
    res.end("Invalid emoji");
    return;
  }

  // Use Intl.Segmenter to count grapheme clusters
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const graphemes = [...segmenter.segment(emoji)];

  if (graphemes.length > 4) {
    res.statusCode = 400;
    res.end("Emoji too long");
    return;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48">${emoji}</text>
  </svg>`;

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Favicon: ${emoji}</title>
      <link rel="icon" type="image/svg+xml" href="${dataUrl}" />
      <style>
        body { font-family: system-ui, sans-serif; text-align: center; margin-top: 3rem; }
        h1 { font-size: 5rem; }
      </style>
    </head>
    <body>
      <h1>${emoji}</h1>
      <p>This emoji is your favicon!</p>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.statusCode = 200;
  res.end(html);
}
