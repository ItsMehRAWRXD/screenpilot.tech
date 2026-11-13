# Preview Acceptance Receipt — ScreenPilot.tech rebuild

| Field | Value |
|-------|-------|
| Commit under test | `35293bdaff792d4bf79387b8fca02b2ed6cef599` (`35293bdaff79`) |
| Branch | `rebuild/v1-rawrxd-home` |
| Production `main` | `e103aeb4b935` (unchanged; merge **HOLD**) |
| Preview host | Local static server `http://127.0.0.1:8765/` (not Porkbun staging) |
| Date | 2026-11-13 |
| Tester | Cursor agent acceptance run |
| Overall result | **FAIL** |
| Merge authorization | **NOT REQUESTED** / **NOT GRANTED** |
| `PROMOTE` / `CERTIFIED` | **0 / 0** |

## Gate results

| Gate | Result | Evidence |
|------|--------|----------|
| Desktop navigation / layout / typography | **PASS** | Homepage at 1440×900: primary nav (IDE/Deep2/Benchmarks/Research/Roadmap/Docs), hero H1, CTAs present; `overflowX=false` |
| Desktop internal links | **PASS** | Absolute asset/page paths resolve HTTP 200 for home, CSS, JS, 8 secondary pages |
| Console / asset load | **PASS** | `document.readyState=complete`; CSS/JS linked; broken images = 0 on homepage |
| Mobile responsive layout | **FAIL** | At ~390 CSS px: horizontal overflow (`scrollWidth=402`, `clientWidth=390`); nav primary CTA wraps (`h≈70`, `y≈-1`); Menu control right-edge clips (`right=402`) |
| Mobile menu functionality | **PASS** | Menu toggle expands; 6 primary nav links appear (`aria-expanded=true`) |
| Eight secondary pages | **PASS** | All return 200 with expected titles (ide, deep2, benchmarks, research, docs, roadmap, downloads, enterprise) |
| Archived homepage | **PASS** | `/archive/index-2026-09-10.html` → 200 · title “Local-First Command Surface” |
| Standalone IDE chatbot | **PASS** | `/gui/ide_chatbot_standalone.html` → 200 · title “RawrXD IDE // AGENTIC INTERFACE” · UI interactive · no secrets matched in sampled body |
| Messaging — Advanced Development Preview | **PASS** | Eyebrow text exact; label hits = 3 across pages |
| Messaging — no unsupported % / cert claims | **PASS** | `BATCH_085=0`, `PROMOTE=1=0`, `CERTIFIED=1=0`, unsupported %-as-score = 0; `~85%` only appears as **retired** wording |
| Secrets exposure | **PASS** | No API keys / private key material / `ghp_` tokens in rebuilt HTML/CSS/JS |
| HTTPS / production redirects | **N/A (pending hosted preview)** | Local HTTP only; Porkbun/GitHub Connect still publishes `main` only |
| Porkbun Auto Renew | **UNVERIFIED** | Must be confirmed in Porkbun account before **2026-11-15** |

## Fail detail (blocking)

Mobile viewport (~390px):

- Document horizontal overflow: **true**
- `.nav-cta .btn-primary` wraps (“Explore RawrXD”) and slightly overflows nav vertically
- `.nav-toggle` (“Menu”) extends past viewport right edge

**Release rule:** failed acceptance gate → production merge remains **HOLD**.

## Recommended fix (not applied in this receipt)

On `rebuild/v1-rawrxd-home`, tighten mobile header:

- Hide or relocate primary nav CTA under 900px (keep Menu + brand only), **or**
- Reduce CTA padding/font and prevent wrap (`white-space: nowrap` + smaller button), ensure Menu fully inside viewport

After fix: new commit SHA required; re-run this acceptance against the new tip.

## Reminder

**Verify Porkbun Auto Renew directly in the Porkbun account before November 15, 2026.** GitHub Connect does not establish domain/hosting renewal status.

## Decision

```
ACCEPTANCE=FAIL
COMMIT=35293bdaff79
MERGE=HOLD
PROMOTE=0
CERTIFIED=0
NEXT=fix-mobile-nav-overflow-then-retest
```
