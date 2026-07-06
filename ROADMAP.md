# Roadmap

Post-polish improvements. Ordered by impact for users and portfolio signal.

## Near term

| Item | Why |
|------|-----|
| **Extension icon** | Professional toolbar presence; required for Web Store |
| **Keyboard shortcut** | `Ctrl+Shift+P` or similar to open popup / regenerate |
| **Password presets** | “Banking”, “WiFi”, “PIN” one-click length + charset combos |
| **Export history** | Download selected passwords as `.txt` (local only, no cloud) |

## Medium term

| Item | Why |
|------|-----|
| **Chrome Web Store listing** | Public install link for wider distribution |
| **Passphrase mode** | diceware-style memorable passwords |
| **Exclude ambiguous chars** | Toggle to omit `0/O`, `1/l` etc. |
| **Theme toggle** | Light mode for bright environments |

## Engineering

| Item | Why |
|------|-----|
| **E2E with Playwright** | Extension popup smoke tests in real Chrome |
| **CI workflow** | `npm test` + `npm run build` on push |
| **Bundle size audit** | Drop unused deps (`react-color`, `react-scripts` dev split) |

## Out of scope (by design)

- Cloud sync beyond Chrome’s built-in storage
- Master password / encryption layer (different product category)
- Account system or telemetry
