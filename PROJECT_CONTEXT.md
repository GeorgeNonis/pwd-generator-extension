# PROJECT_CONTEXT — Password Generator Extension

**Repo:** `pwd-generator-extension` · Manifest V3 Chrome popup · React + TypeScript + Redux Toolkit + Webpack

## Stack & layout

| Path | Role |
|------|------|
| `src/App.tsx` | Shell: navbar + tab routing (generator / settings / history) |
| `src/components/passwordgenerator/` | Main form + strength indicator |
| `src/components/history/` | Saved passwords list |
| `src/components/settings/` | Extension settings |
| `src/App.css` | All popup styling (primary UI touchpoint) |
| `src/lib/password.ts` | Password generation (pure, tested) |
| `docs/BEHAVIOR.md` | Spec IDs mapped to tests |
| `manifest.json` | MV3, `storage` permission, popup action |
| `webpack.config.js` | Build → `dist/` for Load unpacked |

Popup size: ~23rem × 32rem fixed in CSS.

## Commands

```bash
npm install
npm run build    # production → dist/
npm run watch    # rebuild on change
npm test         # behavior specs
```

Load in Chrome: `chrome://extensions` → Developer mode → Load unpacked → **`dist`**

Preview without Chrome APIs: serve `dist/` and open `js/preview.html`.

## Gotchas

- Build output is `dist/`; manifest popup points to `js/index.html`.
- `icon.png` copied to `dist/` via webpack CopyPlugin.
- History row copy: per-row icon in `src/components/history/passwords/pwd/`.

## Local AI wiring (optional, gitignored)

`.cursor/` and `AI_GUIDELINES.md` symlink — re-wire via `ai_skills` setup script if needed. Session state for AI lives in private `ai_context`, not in this repo.
