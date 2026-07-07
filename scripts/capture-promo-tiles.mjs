/**
 * Renders promo tile HTML templates to PNGs in store_assets/.
 * Usage: node scripts/capture-promo-tiles.mjs
 */
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "store_assets");

const tiles = [
  {
    html: path.join(__dirname, "promo-tiles", "promo-small.html"),
    output: path.join(outDir, "promo-tile-small-440x280.png"),
    width: 440,
    height: 280,
  },
  {
    html: path.join(__dirname, "promo-tiles", "promo-marquee.html"),
    output: path.join(outDir, "promo-tile-marquee-1400x560.png"),
    width: 1400,
    height: 560,
  },
];

async function captureTile(page, { html, output, width, height }) {
  const fileUrl = `file:///${html.replace(/\\/g, "/")}`;
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(fileUrl, { waitUntil: "networkidle0" });
  await page.screenshot({ path: output, type: "png" });
  console.log(`Wrote ${path.relative(root, output)} (${width}×${height})`);
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  for (const tile of tiles) {
    await captureTile(page, tile);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
