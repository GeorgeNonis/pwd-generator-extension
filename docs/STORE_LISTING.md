# Chrome Web Store listing copy

Use in the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole) for v1.1.0+.

## Listing title

```
Password Generator
```

(Do not use "Nonis" anywhere in store copy.)

## Short description (max 132 characters)

```
Generate strong passwords or memorable passphrases. Presets, history export, themes, and keyboard shortcuts. No data collection.
```

(131 characters)

## Detailed description

```
Password Generator is a fast, privacy-focused Chrome extension for creating strong passwords and memorable passphrases. Everything runs locally in your browser — no accounts, no analytics, no cloud servers.

KEY FEATURES

Password & passphrase modes
• Password mode: length slider (4–32) with toggles for uppercase, lowercase, numbers, and symbols
• Passphrase mode: diceware-style random words (4–8 words), easier to remember and type
• One-click presets: Banking (16 chars, all sets), WiFi (12 chars, alphanumeric), PIN (6 digits)

Security options
• Cryptographically secure generation via crypto.getRandomValues
• Optional exclusion of ambiguous characters (0, O, 1, l, I) for easier reading
• Built-in strength indicator to visualize password length / passphrase word count

Copy & history
• One-click copy with visual feedback
• Optional password history (off by default) — enable in Settings
• Copy individual entries, copy all, export as .txt, or clear history
• History stored in Chrome sync storage only when you opt in

Comfort & productivity
• Light and dark theme (saved automatically)
• Keyboard shortcuts — customize at chrome://extensions/shortcuts
  - Ctrl+Shift+P (Cmd+Shift+P on Mac): open the extension
  - Ctrl+Shift+G (Cmd+Shift+G on Mac): regenerate (when popup is open)

PRIVACY

Password Generator does not collect, transmit, or sell personal data. Generated passwords stay on your device unless you enable history, in which case they are saved to your Chrome sync storage under your Google account.

Take control of your online security — generate strong credentials in one click.
```

---

## Additional fields (dashboard screenshot)

| Field | Recommended value | Notes |
|-------|-----------------|-------|
| **Official URL** | Leave **None** (for now) | Requires a domain you verify in Google Search Console. GitHub repo URLs do not qualify. Add later if you have a personal site (e.g. `georgenonis.dev`). |
| **Homepage URL** | `https://github.com/GeorgeNonis/pwd-generator-extension` | Link to source + README. Builds trust for technical users. |
| **Support URL** | `https://github.com/GeorgeNonis/pwd-generator-extension/issues` | Users report bugs / ask questions via GitHub Issues. |
| **Mature content** | **Off** | Not applicable. |

### Privacy practices (required tab)

Declare:

- **Does not collect user data** (or only storage if prompted — history uses `chrome.storage.sync` locally when user opts in)
- No remote servers, no analytics SDK in extension code

---

## Category & discoverability

| Setting | Recommendation |
|---------|----------------|
| **Category** | Productivity (or Developer Tools) |
| **Language** | English (add Greek later if you want local discovery) |
| **Regions** | All regions (or start with EU + US) |

### Search keywords (use naturally in description — no separate keyword field)

`password generator`, `passphrase`, `diceware`, `secure password`, `random password`, `wifi password`, `pin generator`, `password manager helper`, `privacy`, `offline`

---

## Promo tiles (optional — boosts visibility when featured)

Chrome may show these in curated collections or promotional slots. **Optional** but worth having ready.

| Asset | Size | What it is |
|-------|------|------------|
| **Small promo tile** | **440 × 280** | Compact card: icon + short headline. Used in small promotional grids. |
| **Marquee promo tile** | **1400 × 560** | Wide hero banner: headline + UI mockup + gradient. Used for featured/editorial spots. |

Not required for publish. Add when you want a polished store presence or if applying for featuring.

**Suggested headline copy:** `Strong passwords. Zero cloud.` or `Passwords & passphrases — offline & private`

Assets would live in `store_assets/` (future session — see CONTINUATION next prompt).

---

## Store analytics (“Additional metrics”)

After publish, use **Chrome Web Store Developer Dashboard → Analytics**:

| Metric | What to watch |
|--------|----------------|
| **Impressions** | How often listing appears in search/browse |
| **Installs** | Conversion from listing views |
| **Weekly users** | Retention signal |
| **Uninstalls** | Spike after update = possible bug |

You cannot add custom metrics to the listing. Improve conversion by:

1. Strong icon + screenshots (done in `store_assets/`)
2. Short description front-loads benefits
3. Responding to reviews (especially negative)
4. Regular updates (version bumps signal active maintenance)

---

## Visibility checklist (beyond listing)

- [ ] Pin repo on GitHub profile
- [ ] Add Chrome Web Store install link to README badge
- [ ] LinkedIn / portfolio “Featured” with store link
- [ ] Ask satisfied users for 5-star reviews (don't incentivize)
- [ ] Ship v1.1.1+ with CI badge in README when CI lands
- [ ] Consider `single purpose` clarity in privacy form — one job: generate passwords

---

## Graphic assets quick reference

See [`STORE_ASSETS.md`](./STORE_ASSETS.md).
