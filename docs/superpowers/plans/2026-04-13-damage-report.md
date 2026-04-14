# PoAW Damage Report — Fix Plan (2026-04-13)

21 real bugs, ranked by revenue/legal risk, then broken UI, then silent failures.

**Rule for this pass:** no cosmetic work until B, J, C are shipped. Revenue leaks first.

---

## Tier 0 — Revenue leaks and legal risk (SHIP SAME DAY)

### B. `/projects/ai-cluster` has no paywall check ⚠️ ACTIVE REVENUE LEAK

**Problem:** `POST /api/v1/projects/ai-cluster` runs the LLM clustering with zero auth beyond "logged in." Anyone can curl it for free. The `POST /payments/ai-sort` path charges, but the cluster endpoint is completely unguarded. The `free_trial_ai_sort` flag exists in `flags.py` but is never read anywhere.

**Fix:**
1. Add a paywall dependency to `ai_cluster` endpoint. Check if user has a valid ai_sort payment in the last 24h (or subscription, or free trial left).
2. Implement `free_trial_ai_sort` enforcement: count completed `ai_sort` payments on the user → allow 1 free run.
3. Frontend: stop calling `/projects/ai-cluster` directly. Only call it through the payment success flow.

**Files:**
- `src/poaw/api/routers/projects.py` — add `Depends(check_paywall("ai_sort"))` to ai-cluster endpoint
- `src/poaw/billing/paywall.py` — implement free trial counting logic
- `src/app/components/PaymentModal.tsx` — only fire ai-cluster after confirmed payment

**Test:** `curl POST /projects/ai-cluster` without prior payment → 402 Payment Required.

---

### J. MAELSTROM99 coupon is client-side fiction ⚠️ REVENUE LEAK

**Problem:** The 100% coupon is validated in React. Backend has no knowledge of coupons. Anyone who reads the JS bundle or this conversation gets infinite free AI sort.

**Fix:**
1. Move coupon validation to backend. New endpoint `POST /payments/coupon/redeem` that takes `{ code, feature }`, returns `{ valid, discount, unlock_token }`.
2. The unlock_token is a short-lived signed token that the clustering endpoint accepts as proof of payment.
3. Record coupon use in a new `coupon_redemptions` table for auditing/rate-limiting.
4. Remove the client-side `VALID_COUPONS` dict.

**Files:**
- `src/poaw/api/routers/payments.py` — new `/coupon/redeem` endpoint
- `src/poaw/models/coupon.py` — new model
- `alembic/versions/` — new migration
- `src/app/components/PaymentModal.tsx` — replace client logic with real endpoint call

**Test:** Generate a coupon code, redeem via backend, verify DB row, verify token works once.

---

### C. $7 hardcoded vs $5 advertised ⚠️ CHARGEBACK RISK

**Problem:** `flags.py` says `price_ai_sort_cents = 500`, frontend shows "$5", but `payments.py` hardcodes `amount_cents=700` in the ai-sort handler. Stale comment `# $7.00` still sits in the file. Customers are being charged $2 more than advertised. Legal risk.

**Fix:**
- `src/poaw/api/routers/payments.py` — replace hardcoded `amount_cents=700` with `get_price_cents("ai_sort")` from flags
- Remove the stale `# $7.00` comment

**Test:** Call `/payments/ai-sort` → verify actual Square charge is $5.00.

---

## Tier 1 — Core UI broken (user cannot see their own data)

### G. Project titles render blank

**Problem:** Backend `ProjectSummary` returns `title`. Frontend `Projects.tsx:158` reads `project.name`. Every project card renders with no visible title.

**Fix:** Change `project.name` → `project.title` (with `project.name` as fallback) everywhere in `Projects.tsx`, `ProjectDetail.tsx`, `Dashboard.tsx`, `CreateProjectDialog.tsx`.

**Files:** grep `project\.name` across `src/app/`.

**Test:** Open `/app/projects` → see real titles.

---

### H. Manually created projects silently corrupt

**Problem:** `useCreateProject` sends `{ name: string }`. `CreateProjectRequest` expects `{ title: string }`. Pydantic drops the field silently. Projects are inserted with `title=None`, hitting the DB `min_length=1` constraint as a 422, which the frontend eats.

**Fix:** Frontend sends `{ title }`. Backend adds `name` as a field alias on the Pydantic model for forward compatibility but ALSO validates min_length=1.

**Files:**
- `src/hooks/useApi.ts` — `useCreateProject`
- `src/app/components/CreateProjectDialog.tsx` — ensure it passes `title`
- `src/poaw/api/schemas/project.py` — add `name` alias or strict required

**Test:** Create project from UI → check `projects` table → `title` column populated.

---

### F. Conversations list always empty

**Problem:** `/conversations` returns `ConversationIndex` rows. `ConversationIndex` is only populated by `batch_index_all()`, which is ONLY called via `POST /memory/reindex` (manual admin endpoint). The worker pipeline never calls it. So after parse → evaluate, zero index rows exist, and the Conversations page always shows "No conversations uploaded yet."

**Fix:**
1. Call `batch_index_all()` (or a per-upload equivalent) at the end of `parse_task` after successful parsing.
2. Also call it at the end of `evaluate_task` as a safety net.
3. Write a one-shot backfill that indexes all existing conversation uploads.

**Files:**
- `src/poaw/worker/parse_task.py` — call indexer after creating conversation rows
- `src/poaw/services/memory_service.py` — extract per-upload index function
- `scripts/backfill_conversation_index.py` — new one-shot

**Test:** After uploading a conversation file → `GET /conversations` returns ≥1 row.

---

## Tier 2 — Pipeline fundamentally broken (parse/evaluate chain)

### A. Parse pipeline produces no metadata for legacy data

**Problem:** 1968 of 2136 conversation uploads have no `parse_metadata` artifact. They were bulk-imported as `claude_import` — but turns out they're `.py` files (dojo_scrolls_*.py etc), not conversations at all. The "clustering by filename" observation is correct.

**Fix:**
1. **Delete the 52 `claude_import` projects** and their 1968 code-file uploads (user approval required per Blackbeard Rule; user already reviewing).
2. **Future-proof the upload endpoint** — already done: code extensions removed from `ALLOWED_EXTENSIONS`.
3. **Verify parse_task actually runs end-to-end for new uploads** — upload a real ChatGPT export, trace through the pipeline, confirm `parse_metadata` is created.
4. If not: debug celery dispatch (GPT flagged queue routing hint, though `task_default_queue="assessments"` in config looks correct).

**Files:**
- `src/poaw/api/routers/uploads.py` — (done)
- `src/poaw/worker/parse_task.py` — (done, removed fake one-turn wrap)
- `scripts/delete_claude_import_junk.py` — new, Blackbeard-compliant (archive first)

**Test:** Upload a real conversation.zip → verify parse_metadata row + conversation_index row + project cluster picks it up.

---

### D. `evaluate_task` invokes `run_assessment` as a plain function

**Problem:** `evaluate_task.py` calls `result = run_assessment(assessment_id)`. But `run_assessment` is a `@shared_task` — calling it directly bypasses Celery's async event-loop setup. Whole evaluation stage silently fails after parse completes.

**Fix:**
- Change `evaluate_task` to call `run_assessment.apply_async(args=[assessment_id]).get()` (if it needs the result) OR `run_assessment.delay(assessment_id)` (fire-and-forget).
- Better: collapse the two — if evaluate_task is just a wrapper, delete it and have parse_task dispatch `run_assessment` directly.

**Files:**
- `src/poaw/worker/evaluate_task.py`
- `src/poaw/worker/parse_task.py` — end of successful parse, dispatch the next task properly
- `src/poaw/worker/task.py` — verify the chain

**Test:** Upload → parse → evaluate → results all complete without manual intervention.

---

### E. `trigger_project_evaluation` orphans artifacts

**Problem:** `project_service.py` evaluates a confirmed project by doing `UPDATE uploads SET assessment_id = new_assessment_id`. This orphans the original assessment's `parse_metadata` artifacts — they still reference the old assessment_id. Evaluation can't find the normalized data it needs.

**Fix:**
- Don't reassign uploads. Instead, create a new Assessment that references the SAME uploads by a join table (or copy the artifacts to the new assessment_id).
- Simplest: add a nullable `project_id` to Assessment model and link by project, not by re-owning uploads.

**Files:**
- `src/poaw/api/services/project_service.py` — `trigger_project_evaluation`
- `src/poaw/models/assessment.py` — maybe add `project_id` FK

**Test:** Create project → run assessment → verify assessment sees the parse_metadata artifacts.

---

## Tier 3 — Features sold but not delivered

### I. Paid model tier does nothing

**Problem:** `WorkerConfig` hardcodes `llm_model="gpt-4o-mini"`. The `model_free`/`model_paid`/`model_premium` flags in billing exist but are never read by the worker. Users paying for "Premium Model" get the same model as free users.

**Fix:**
- `evaluate_task` reads user's `model_tier` from DB and sets `config.llm_model = get_model_for_tier(tier)` (already a helper in flags.py, just never called).
- Pipeline stages that call the LLM must read from `config.llm_model`, not a hardcoded constant.

**Files:**
- `src/poaw/worker/config.py`
- `src/poaw/worker/evaluate_task.py`
- `src/poaw/worker/stages/stage3_llm_gate.py`
- `src/poaw/worker/stages/stage4_evaluate.py`

**Test:** Set user's `model_tier = "premium"` → run assessment → check the LLM call logs show the premium model.

---

### K. Crypto payment success never surfaces

**Problem:** Card + coupon paths call `triggerUnlock()`. Crypto path opens NowPayments, waits for webhook, updates DB — but the PaymentModal has no polling or confirmation. User pays, closes invoice window, UI is stuck on invoice screen.

**Fix:**
- After creating the crypto invoice, start polling `/payments/crypto-status/{invoice_id}` every 5s.
- When status transitions to "paid" or "confirmed", call `triggerUnlock()` and show the unlock success card.
- Also: handle the case where user closes the modal before confirmation — store invoice_id in a pending state tied to their user so the dashboard shows "crypto payment pending" until webhook fires.

**Files:**
- `src/app/components/PaymentModal.tsx`
- `src/hooks/useApi.ts` — `useCryptoStatus` (may already exist)

**Test:** Create invoice → pay on NowPayments → return to app → UI auto-transitions to unlocked.

---

## Tier 4 — Honesty pass (UI lies about backend state)

### L. Fake timed progress on Processing screens

**Problem:** `Processing.tsx`, `StudentProcessing.tsx`, `StudentAnalyze.tsx` advance fake steps on a `setTimeout` so the UI looks alive even when the backend is stuck. Users can wait through the whole "pipeline" while parse_task is silently failing.

**Fix:**
- Steps advance ONLY when the backend status changes.
- If the assessment is stuck in `pending` for >60s with no progress, show an actual stuck state with a retry button and a link to check status later.
- Remove `fakeStepIdx` / `STEP_TIMINGS` arrays entirely.

**Files:**
- `src/app/pages/Processing.tsx`
- `src/app/pages/StudentProcessing.tsx`
- `src/app/pages/student/StudentAnalyze.tsx`

---

### M. Account page is a shell

**Problem:** Claude/ChatGPT/GitHub integrations, API keys, visibility settings, export all data, account deletion — all UI-only, zero backend.

**Fix:** **Hide the entire section until backend exists.** Replace with a single "Profile" form that works (name, handle) and "Sign out." Everything else gets a "Coming soon — [status]" banner at the top of the page. Don't render dead buttons at all.

**Files:** `src/app/pages/Account.tsx`

---

### N. Search / filters / tagging decorative

**Problem:** Advanced filters, date filters, export, tag editing, turn tagging, more-options buttons all toast "Coming soon."

**Fix:** Same rule — **hide them**. Don't render disabled buttons. A missing feature is better than a fake one.

**Files:**
- `src/app/pages/Search.tsx`
- `src/app/pages/Conversations.tsx`
- `src/app/pages/ConversationDetail.tsx`

---

### O. Project detail actions not wired

**Problem:** Settings, repo attachment, correlation view, content masking, mask removal, repo removal — all "coming soon."

**Fix:** Hide until built. Show only the actions that actually work: run assessment, delete project.

**Files:** `src/app/pages/ProjectDetail.tsx`

---

### R. ProofPages directory tab says "coming soon" while `/explore` works

**Problem:** Inside ProofPages, the directory tab is a placeholder. Meanwhile `/explore` is a real page hitting the real directory endpoint. Split-brain.

**Fix:** Remove the directory tab from ProofPages entirely. Keep only "My Proofs." Link to `/explore` from a one-liner at the top.

**Files:** `src/app/pages/ProofPages.tsx`

---

## Tier 5 — Security TODOs

### P. Missing auth checks

**Problem:** Backend has `# TODO` comments for:
- `directory.py` — verify user owns the proof page before opt-in
- `requests.py` — validate captcha token
- `disputes.py` — admin check

**Fix:**
- Implement ownership check in directory opt-in (already partially done — verify).
- Add captcha validation on requests (use Cloudflare Turnstile or similar).
- Add admin role check on dispute endpoints (new `is_admin` field on User or a role table).

**Files:**
- `src/poaw/api/routers/directory.py`
- `src/poaw/api/routers/requests.py`
- `src/poaw/api/routers/disputes.py`
- `src/poaw/models/user.py` — maybe add `is_admin`

---

## Tier 6 — Architectural cleanup

### Q. Export/download returns 501

**Problem:** `GET /assessments/{id}/download?format=pdf` returns 501 Not Implemented. Frontend download button tries to call it.

**Fix:**
- Implement JSON export (should be trivial — serialize the assessment results).
- PDF can use ReportLab (already in requirements).
- Markdown export (also trivial).
- Frontend: wire to the new endpoint, show real download.

**Files:**
- `src/poaw/api/routers/assessments.py`
- `src/poaw/services/export.py` — new

---

### S. Legacy `assessment_service.py` with TODO

**Problem:** `src/poaw/api/services/assessment_service.py` still has `# TODO: Enqueue assessment for worker pipeline processing`. The real path is now in `uploads.py complete_upload_endpoint`. Two mental models in the codebase.

**Fix:** Delete the legacy creation path. Keep only the one in `uploads.py`. Update any callers.

**Files:**
- `src/poaw/api/services/assessment_service.py`
- grep callers

---

### T. Upload architecture split-brain

**Problem:** `upload_service.py` is an S3-style service. `uploads.py` is direct-to-local-disk. Live path is the latter. The service layer is dead code.

**Fix:** Delete `upload_service.py` (or archive it to `_deepfreeze` per Blackbeard Rule). Standardize on the local-disk path.

**Files:**
- `src/poaw/api/services/upload_service.py` (archive)

---

### U. Normalization stage7 has placeholder fields

**Problem:** `stage7_canonical.py` uses placeholder values for `content_hash` and `generated_at`. Downstream logic may be operating on incomplete canonical records.

**Fix:** Populate real values. `content_hash = sha256(canonical_json)`, `generated_at = datetime.now(UTC)`.

**Files:** `src/poaw/normalization/stage7_canonical.py`

---

## Execution order

| Day | Focus |
|---|---|
| **1 AM** | B, C, J — stop revenue leak today |
| **1 PM** | G, H, F — fix visible UI lies so users can see their data |
| **2 AM** | A cleanup (delete claude_import junk with user approval), D, E |
| **2 PM** | Upload a real conversation → verify end-to-end pipeline works |
| **3 AM** | I (paid model tier), K (crypto confirmation polling) |
| **3 PM** | L, M, N, O, R — honesty pass, hide dead buttons |
| **4 AM** | P — security TODOs |
| **4 PM** | Q, S, T, U — cleanup |

**Rule:** don't touch days 3-4 until days 1-2 are fully verified working.

---

## Verification gate for each fix

Before marking any item done:

1. Write an e2e test in `tests/e2e/` that fails before the fix, passes after
2. Run it against prod
3. Manually walk the user flow in a browser
4. Only then commit + push
