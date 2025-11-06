import fs from 'fs';

/**
 * Copies the GDG logo to the root public directory as favicon and apple-touch-icon.
 * This is a one-time script for branding update.
 */
const src = './public/assets/images/GDG LOGO.png';
const targets = [
  './public/favicon-32x32.png',
  './public/favicon-16x16.png',
  './public/apple-touch-icon.png',
  './public/favicon.ico',
];

for (const target of targets) {
  fs.copyFileSync(src, target);
  console.log(`Copied to ${target}`);
}
