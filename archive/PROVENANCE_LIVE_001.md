# Live deployment provenance — 2026-11-13

## Finding

Footer text `rebuild/v1 staging candidate` was leftover marketing/copy from the rebuild branch HTML. It did **not** mean Porkbun was publishing a staging branch.

## Verified wiring

| Item | Value |
|------|-------|
| Porkbun product | Secure Static Hosting (Live) |
| GitHub Connect repo | `ItsMehRAWRXD/screenpilot.tech` |
| GitHub Connect branch | `main` (confirmed earlier in panel paste) |
| `origin/main` at verification | `239bdf0be5726055669bfbe72fb4ac03f06578c3` |
| Merge parents | `e103aeb4b935` (prior production) + `32bbb02c797c` (rebuild tip) |
| Rebuild is ancestor of main | Yes |
| Live homepage | Serves Advanced Development Preview content |
| Secondary pages | All HTTP 200 |
| `/gui/ide_chatbot_standalone.html` | HTTP 200 · title `RawrXD IDE // AGENTIC INTERFACE` |

## Correction

Replace footer with `screenpilot.tech · production · main` and add deploy meta. `PROMOTE=0` · `CERTIFIED=0` unchanged.
