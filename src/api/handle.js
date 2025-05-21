export default async function handler(req, res) {
  const { url } = req;
  const emoji = decodeURIComponent(url.slice(1));

  // Basic validation — limit emoji length to avoid abuse
  if (!emoji || emoji.length > 4) {
    res.statusCode = 400;
    res.end("Invalid emoji");
    return;
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><text x='0' y='14'>${emoji}</text></svg>`;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

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
