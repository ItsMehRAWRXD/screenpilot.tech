# screenpilot.tech — Porkbun Static + GitHub deploy

## Live URLs (correct)

| Page | URL |
|------|-----|
| Landing | https://screenpilot.tech/ |
| Agent shell | https://screenpilot.tech/gui/ide_chatbot_standalone.html |
| GUI index | https://screenpilot.tech/gui/ |

**404 by design:** `…/ide_chatbot_standalone.html:11435/gui` — invalid; browser treats `:11435` as part of the filename.

**Local IDE only (same machine):** `http://127.0.0.1:11435/gui` when Win32IDE LocalServer is running.

## Porkbun panel settings

1. **Site Status:** Live (pixie-ss1-sh) — OK
2. **SSL:** Have certificate — OK
3. **Fix DNS Records** — run after any registrar change — OK
4. **Rewrite URL:** leave **empty** for this multi-file site.  
   If you use rewrite, enter **`/index.html`** only (server path), never a Windows path like `F:\...`.
5. **GitHub Connect:** pick a repo whose **root** contains `index.html` and `gui/` (see below).
6. **www subdomain:** point to same root or leave unset until apex works.

## GitHub auto-publish

Repository in Porkbun shows **none** until you connect one.

Option A — dedicated repo (recommended):

```powershell
cd F:\~dev\rawrxd\sites\screenpilot.tech
git init
git add index.html launcher.html gui/
git commit -m "ScreenPilot static site"
git remote add origin https://github.com/YOUR_USER/screenpilot.tech.git
git push -u origin main
```

Then Porkbun → GitHub Connect → select `screenpilot.tech` repo.

Option B — monorepo subfolder: only if Porkbun supports deploy subdirectory; otherwise use Option A.

## Manual FTP (fallback)

Host: `pixie-ss1-ftp.porkbun.com`  
User: `screenpilot.tech`  
Upload repo root files to FTP `/` (not a Windows path).

## Hosted chat expectations

HTTPS shell loads; chat stays **Offline** until **local** Ollama (`:11434`) or IDE (`:11435`) runs on the visitor's PC. Public site cannot call localhost.
