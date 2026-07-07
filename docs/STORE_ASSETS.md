# Chrome Web Store — graphic assets (v1.1.0)

All files in [`../store_assets/`](../store_assets/).

## Required / uploaded

| Asset | Size | File | Status |
|-------|------|------|--------|
| **Store icon** | 128×128 | `store_assets/icon-128.png` | ✅ New (indigo key — replace orange padlock) |
| **Screenshot 1** | 1280×800 | `store_assets/screenshot-01-generator.png` | ✅ Password mode + presets |
| **Screenshot 2** | 1280×800 | `store_assets/screenshot-02-passphrase.png` | ✅ Passphrase mode |
| **Screenshot 3** | 1280×800 | `store_assets/screenshot-03-history.png` | ✅ History + export |
| **Screenshot 4** | 1280×800 | `store_assets/screenshot-04-settings.png` | ✅ Settings + light theme |

Toolbar / manifest icons (auto from build):

| Size | File |
|------|------|
| 16×16 | `icons/icon-16.png` |
| 48×48 | `icons/icon-48.png` |
| 128×128 | `icons/icon-128.png` |

## Optional promo tiles (not yet created)

| Asset | Size | Purpose |
|-------|------|---------|
| **Small promo tile** | 440×280 | Small promotional card in store discovery surfaces |
| **Marquee promo tile** | 1400×560 | Wide hero banner for featured / editorial placement |

See [`STORE_LISTING.md`](./STORE_LISTING.md) for copy suggestions.

## Remove from dashboard

- Old orange padlock store icon
- Legacy screenshots (Nonis branding, black old UI, blue “Generate password” bar)

## Manual capture (pixel-perfect alternative)

1. `npm run build` → load `dist/` unpacked
2. Capture each tab at 1280×800
3. Or serve `dist/js/store-frame.html` for framed shots

## Listing copy

See [`STORE_LISTING.md`](./STORE_LISTING.md).
