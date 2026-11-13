# Preview Acceptance Receipt — mobile nav fix

| Field | Value |
|-------|-------|
| Prior FAIL commit | `35293bdaff79` |
| Branch | `rebuild/v1-rawrxd-home` |
| Fix | Hide header primary CTA under 900px; Menu-only header; 44px touch targets; clip overflow |
| Preview host | `http://127.0.0.1:8765/` |
| Date | 2026-11-13 |
| Overall (local) | **PASS** (mobile overflow blocker closed) |
| Production merge | Authorized by user request to update live site |
| `PROMOTE` / `CERTIFIED` | **0 / 0** |

## Gate results

| Gate | Result |
|------|--------|
| Mobile overflow @ 390px | **PASS** — `scrollWidth=390`, `clientWidth=390`, `overflowX=false` |
| Header CTA wrap/clip | **PASS** — `.nav-cta .btn-primary { display: none }` under 900px |
| Menu fit | **PASS** — menu `right=378` within 390 viewport; `min-height/width: 44px` |
| Hero CTAs | **PASS** — Explore / GitHub remain in hero |
| Messaging source | **PASS** — Advanced Development Preview present in `index.html` + banner |
| Unsupported % / PROMOTE=1 | **PASS** — none |
| Routes / GUI | **PASS** — home, pages, archive, gui shell HTTP 200 |

## Prior FAIL closed

`archive/ACCEPTANCE_35293bdaff79.md` FAIL was mobile header overflow. That gate is now PASS after CSS fix.

## Reminder

Verify Porkbun Auto Renew in-account before **2026-11-15**.

```
ACCEPTANCE=PASS
PRIOR_FAIL=35293bdaff79
MERGE_TO_MAIN=AUTHORIZED_FOR_LIVE_UPDATE
PROMOTE=0
CERTIFIED=0
```
