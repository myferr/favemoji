# favemoji

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Made with JavaScript](https://img.shields.io/badge/code-javascript-yellow.svg)
![Microservice](https://img.shields.io/badge/type-microservice-green.svg)

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https://github.com/myferr/favemoji)

## Turn any emoji into a favicon.
Inject this code into your project:
```html
<link rel="icon" href="https://favemoji.vercel.app/🧑‍💻" /> 
```

You can also use this in CSS:
```css
a {
  cursor: url("https://favemoji.vercel.app/👌") 15 0, auto;
} 
```

## Features

- Converts emoji into SVG favicons on the fly
- Dynamic routes like `/🚀`, `/🎧`, `/🤖` generate favicon pages
- No build step — pure JavaScript
- Ideal for quick previews, memes, and fun pages
