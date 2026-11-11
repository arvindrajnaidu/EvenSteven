import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('out', { recursive: true, force: true });
await mkdir('out/assets', { recursive: true });
await copyFile('node_modules/three/build/three.min.js', 'out/assets/three.min.js');
await copyFile('node_modules/cannon/build/cannon.min.js', 'out/assets/cannon.min.js');

const fonts = { fredoka: [500, 600], nunito: [600, 700, 800] };
let fontCSS = '';
for (const [family, weights] of Object.entries(fonts)) {
  for (const weight of weights) {
    const filename = `${family}-latin-${weight}-normal.woff2`;
    await copyFile(`node_modules/@fontsource/${family}/files/${filename}`, `out/assets/${filename}`);
    fontCSS += `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('./${filename}') format('woff2')}\n`;
  }
}
await writeFile('out/assets/fonts.css', fontCSS);
let html = await readFile('game.html', 'utf8');
html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts.googleapis.com[^>]+>/, '<link rel="stylesheet" href="./assets/fonts.css">');
html = html.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', './assets/three.min.js');
html = html.replace('https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js', './assets/cannon.min.js');
await writeFile('out/index.html', html);
console.log('Built offline game in out/');
