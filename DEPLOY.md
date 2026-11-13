# screenpilot.tech — Porkbun Static + GitHub deploy

## Live URLs (correct)

| Page | URL |
|------|-----|
| Landing | https://screenpilot.tech/ |
| Agent shell | https://screenpilot.tech/gui/ide_chatbot_standalone.html |
| GUI index | https://screenpilot.tech/gui/ |

**404 by design:** `…/ide_chatbot_standalone.html:11435/gui` — invalid; browser treats `:11435` as part of the filename.

**Local IDE only (same machine):** `http://127.0.0.1:11435/gui` when Win32IDE LocalServer is running.

## Hosting (confirmed 2026-11-13)

| Item | Value |
|------|-------|
| Provider | Porkbun Secure Static Hosting (Pro Monthly) |
| Site status | Live (`pixie-ss1-sh`) |
| SSL | Have certificate (auto-renew — confirm before 2026-11-15) |
| GitHub Connect | **Connected** → `ItsMehRAWRXD/screenpilot.tech` · branch `main` |
| Storage | 5 GB |

**Critical:** pushes to `main` auto-publish to production via Porkbun GitHub Connect.

**Live as of 2026-11-13:** production serves `main` (merge commit published after rebuild acceptance). Footer must read `production · main`, never `staging candidate`.

## Safe rebuild workflow

1. Keep production on `main` @ `e103aeb4b935` (2026-09-10 snapshot) until accepted.
2. Develop on `rebuild/v1-rawrxd-home` (or later rebuild branches).
3. Preview locally (open `index.html` via a static server, or open files carefully noting absolute `/css` paths need a server).
4. Optional staging: temporarily point Porkbun GitHub Connect to the rebuild branch **only after** local acceptance — then switch back / merge.
5. Merge to `main` only after desktop + mobile check, GUI route check, and claim review.

Rollback: restore `archive/index-2026-09-10.html` → `index.html` and push to `main`.

## Messaging law (Nov 13, 2026)

- Public label: **Advanced Development Preview — Core capabilities operational, production certification in progress.**
- Do **not** publish `~85%` / BATCH_085 completion figures.
- Working engineering paths ≠ certified IDE. Keep `PROMOTE=0` · `CERTIFIED=0` · `TIP_CLIMB=HOLD`.
- Licensing prices = **proposed** until fulfillment is ready.

## Porkbun panel settings

1. **Site Status:** Live — OK
2. **SSL:** Have certificate — confirm Auto Renew before expiry
3. **Rewrite URL:** leave **empty** for this multi-file site (or `/index.html` only if SPA rewrite required — not needed today)
4. **GitHub Connect:** `ItsMehRAWRXD/screenpilot.tech` @ `main`
5. **www subdomain:** point to same root or leave unset until apex works
6. Do not run **Fix DNS Records** unless records are actually broken

## Manual FTP (fallback)

Host: `pixie-ss1-ftp.porkbun.com`  
User: `screenpilot.tech`  
Upload repo root files to FTP `/` (not a Windows path).  
FTP updates production immediately — use only after staging acceptance.

## Hosted chat expectations

HTTPS shell loads; chat stays **Offline** until **local** Ollama (`:11434`) or IDE (`:11435`) runs on the visitor's PC. Public site cannot call localhost.
