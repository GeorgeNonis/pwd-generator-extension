# Behavior specifications

Spec-driven behaviors for the Password Generator extension. Tests in `src/**/*.test.ts(x)` map to these specs.

## Password generation (`src/lib/password.ts`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| GEN-01 | Build character set from toggles | Only enabled sets appear in the pool |
| GEN-02 | Generate password of requested length | Output length equals `length` when pool is non-empty |
| GEN-03 | Empty pool returns empty string | No uppercase/lowercase/numbers/symbols → `""` |
| GEN-04 | Uses only characters from enabled sets | Every character ∈ union of enabled sets |
| GEN-05 | Cryptographic randomness by default | Uses `crypto.getRandomValues` (injectable in tests) |
| GEN-06 | Exclude ambiguous characters | When `excludeAmbiguous` is true, pool omits `0`, `O`, `o`, `1`, `l`, `I`, `i` |

## Generator UI (`PasswordGeneratorForm`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| UI-GEN-01 | Renders length control and character toggles | All options visible on generator tab |
| UI-GEN-02 | Generate submits form | Clicking Generate produces a password in the output field |
| UI-GEN-03 | Password shown once | No duplicate display outside the output row |
| UI-GEN-04 | Copy writes to clipboard | Copy button calls `navigator.clipboard.writeText` |
| UI-GEN-05 | Copy feedback | “Copied” notification appears then clears |
| UI-GEN-06 | Strength bars optional | Bars hidden unless “Show strength” is checked |
| UI-GEN-07 | Strength bars reflect length | Filled bar count matches generated password length |

## Navigation (`Navbar`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| UI-NAV-01 | Three tabs | generator, history, settings |
| UI-NAV-02 | Tab switches view | Active tab content replaces previous |
| UI-NAV-03 | Active tab styled | Active tab has distinct visual state |

## History (`History`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| HIST-01 | Empty state | Message when history disabled or no passwords |
| HIST-02 | Lists stored passwords | Renders one row per stored password |
| HIST-03 | Clear history | Clears Redux + `chrome.storage.sync` |
| HIST-04 | Copy all | Joins all passwords with comma, copies to clipboard |
| HIST-05 | Copy single row | Each row has copy icon; copies that password to clipboard |
| HIST-06 | Row copy feedback | Icon switches to checkmark briefly after copy |
| EXPORT-01 | Export history | “Export” downloads `.txt` with one password per line (local only) |
| EXPORT-02 | Export disabled when empty | Export control not offered when `pwds` is empty |

## Settings (`Settings`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| SET-01 | History toggle | Checkbox reflects `history` from store |
| SET-02 | Persist toggle | Changing checkbox writes `history` to chrome storage |
| SET-03 | Security notice | Warning visible when settings tab is open |
| SET-04 | Exclude ambiguous toggle | Checkbox reflects `excludeAmbiguous` from store |
| SET-05 | Persist ambiguous toggle | Changing checkbox writes `excludeAmbiguous` to chrome storage |
| THEME-01 | Theme toggle | Control switches between light and dark appearance |
| THEME-02 | Persist theme | Changing theme writes `theme` to chrome storage |
| THEME-03 | Hydrate theme | On mount, `theme` loaded from storage and applied to root |

## App integration (`useApp`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| APP-01 | Hydrate from storage | On mount, reads `history` and `pwds` from chrome storage |
| APP-02 | Save on generate when history on | New password appended to store + storage when `history === true` |
| APP-03 | Skip save when history off | Generate does not persist when `history === false` |

## Redux (`pwds-slice`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| REDUX-01 | `changeCompo` | Updates `component` |
| REDUX-02 | `historyHandler` | Updates `history` |
| REDUX-03 | `setPasswords` | Replaces `pwds` array |
| REDUX-04 | `historyPush` | Appends one password |
| REDUX-05 | `clearHistorry` | Empties `pwds` |
| REDUX-06 | `themeHandler` | Updates `theme` (`light` \| `dark`) |
| REDUX-07 | `excludeAmbiguousHandler` | Updates `excludeAmbiguous` |

## Keyboard shortcuts (`manifest.json` + `background.ts`)

| ID | Behavior | Acceptance |
|----|----------|------------|
| SHORT-01 | Open popup shortcut | `_execute_action` bound to Ctrl+Shift+P (Cmd+Shift+P on Mac) |
| SHORT-02 | Regenerate shortcut | `regenerate-password` command messages open popup to regenerate |
