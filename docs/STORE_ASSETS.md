# Chrome Web Store — graphic assets

All files in [`../store_assets/`](../store_assets/).

## Store listing

| Asset | Size | File |
|-------|------|------|
| Store icon | 128×128 | `icon-128.png` |
| Screenshot 1 | 1280×800 | `screenshot-01-generator.png` |
| Screenshot 2 | 1280×800 | `screenshot-02-passphrase.png` |
| Screenshot 3 | 1280×800 | `screenshot-03-history.png` |
| Screenshot 4 | 1280×800 | `screenshot-04-settings.png` |

## Promo tiles (optional)

| Asset | Size | File |
|-------|------|------|
| Small promo tile | 440×280 | `promo-tile-small-440x280.png` |
| Marquee promo tile | 1400×560 | `promo-tile-marquee-1400x560.png` |

Regenerate:

```bash
npm install
npx puppeteer browsers install chrome   # first run only
npm run capture:promo
```

Templates: `scripts/promo-tiles/`.

## Toolbar icons (from build)

| Size | File |
|------|------|
| 16×16 | `icons/icon-16.png` |
| 48×48 | `icons/icon-48.png` |
| 128×128 | `icons/icon-128.png` |

## Package upload

The Package tab accepts a `.zip` file. After `npm run build`, zip the **contents** of `dist/` (not the folder). `manifest.json` must be at the zip root.

**macOS / Linux / Git Bash:**

```bash
cd dist
zip -r ../pwd-generator.zip manifest.json icon.png icons js
```

**Windows (PowerShell):**

```powershell
cd dist
Compress-Archive -Path manifest.json,icon.png,icons,js -DestinationPath ..\pwd-generator.zip -Force
```

Screenshots and store graphics upload in separate Store listing fields.

## Listing copy

See [`STORE_LISTING.md`](./STORE_LISTING.md).
