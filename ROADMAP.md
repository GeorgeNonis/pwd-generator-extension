# Roadmap

Post-polish improvements. Ordered by impact for users and portfolio signal.

## Near term

| Item | Why |
|------|-----|
| ~~**Extension icon**~~ | Done — 16/48/128 PNG assets in `icons/` |
| ~~**Keyboard shortcut**~~ | Done — `_execute_action` + regenerate command |
| ~~**Password presets**~~ | Done — Banking / WiFi / PIN |
| ~~**Export history**~~ | Done — download `.txt` locally |

## Medium term

| Item | Why |
|------|-----|
| ~~**Chrome Web Store listing**~~ | v1.1.0 submitted for review (2026-07-07) |
| ~~**Passphrase mode**~~ | Done — diceware-style memorable passwords |
| ~~**Exclude ambiguous chars**~~ | Done — settings toggle |
| ~~**Theme toggle**~~ | Done — light/dark with storage persistence |

## Engineering

| Item | Why |
|------|-----|
| **E2E with Playwright** | Extension popup smoke tests in real Chrome |
| ~~**CI workflow**~~ | Done — `.github/workflows/ci.yml` |
| ~~**Bundle size audit**~~ | Done — removed unused deps; dev/prod split |

## Out of scope (by design)

- Cloud sync beyond Chrome’s built-in storage
- Master password / encryption layer (different product category)
- Account system or telemetry
