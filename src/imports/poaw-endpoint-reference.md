# PoAW Complete Endpoint Reference — Frontend Build Guide

> **Total: 78 endpoints** (53 original + 13 gap-fill + 12 memory layer)
> Plus intake/evaluation endpoints for the AI Work Profile pipeline.

---

## Page: Dashboard

The landing page after login. Shows overview stats, recent activity, quick actions.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/auth/me` | User profile (name, email, handle) | Also returns CAI score once work-profile exists |
| GET | `/api/v1/pool` | List of all parsed uploads with conversation counts | Feed the "Conversations" stat card |
| GET | `/api/v1/projects` | All projects with status (suggested/confirmed) and conversation counts | Feed "Projects" stat card + project list |
| GET | `/api/v1/assessments` | Paginated assessment list with status | Feed "Assessments" stat card |
| GET | `/api/v1/proof-pages` | All proof pages with publish status | Feed "Published proofs" stat card |
| GET | `/api/v1/portfolios` | All portfolios with publish status | Feed portfolio count |
| GET | `/api/v1/activity` | Recent actions audit log | **NEW** — powers the activity feed |
| GET | `/api/v1/disputes` | Open disputes list | Badge count for disputes |
| GET | `/api/v1/webhooks` | Active webhooks | Badge count for system section |

---

## Page: Upload + Parse

Upload conversation exports, monitor parsing progress.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/uploads/presign` | Presigned upload URL | Step 1: get upload target |
| PUT | `/api/v1/uploads/{id}/file` | Upload confirmation | Single file upload |
| PUT | `/api/v1/uploads/{id}/files` | Upload confirmation | Multiple file upload |
| POST | `/api/v1/uploads/complete` | Job ID | Triggers background parsing |
| GET | `/api/v1/uploads/parse-status/{id}` | Parse progress (%) | Poll until complete |

---

## Page: Upload Pool

View parsed conversations, trigger clustering, manage unassigned conversations.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/pool` | All parsed conversations with metadata | Main list view |
| GET | `/api/v1/pool/{id}/parse-status` | Parse status for specific upload | Per-item status |
| DELETE | `/api/v1/pool/{id}` | Confirmation | Remove from pool |
| POST | `/api/v1/projects/cluster` | Suggested projects | Free rule-based clustering |
| GET | `/api/v1/projects/ai-cluster/estimate` | Cost estimate | Show "$7" before payment |
| POST | `/api/v1/projects/ai-cluster` | Suggested projects | Premium LLM clustering |
| POST | `/api/v1/payments/ai-sort` | Payment confirmation + cluster results | $7 payment + AI clustering |
| GET | `/api/v1/payments/config` | Square SDK config | Initialize payment form |

---

## Page: Projects List

View all projects, manage lifecycle.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/projects` | All projects with conversation counts, status | Main list |
| POST | `/api/v1/projects` | New project | Manual creation |
| PATCH | `/api/v1/projects/{id}` | Updated project | **NEW** — rename, update description |
| POST | `/api/v1/projects/{id}/confirm` | Confirmed project | Accept suggested project |
| DELETE | `/api/v1/projects/{id}` | Confirmation | Dissolve project |
| POST | `/api/v1/projects/merge` | Merged project | Combine two projects |

---

## Page: Project Detail

Deep view into a single project — conversations, assessments, repos, censorship, integrity.

### Core
| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/projects/{id}` | Project detail with conversation list | Main view |
| PATCH | `/api/v1/projects/{id}` | Updated project | **NEW** — inline rename |
| POST | `/api/v1/projects/{id}/evaluate` | Evaluation job ID | Trigger assessment pipeline |
| POST | `/api/v1/projects/{id}/split` | New project | Split conversations out |
| POST | `/api/v1/projects/move-conversation` | Confirmation | Move conversation between projects |
| POST | `/api/v1/projects/{id}/scuttle` | Confirmation | Delete raw uploaded files |

### Censorship / Masking
| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/projects/{id}/masks` | Created mask | Add censorship mask |
| GET | `/api/v1/projects/{id}/masks` | All masks for project | List view |
| DELETE | `/api/v1/projects/{id}/masks/{maskId}` | Confirmation | Remove mask |
| GET | `/api/v1/projects/{id}/preview` | Censored conversation preview | Shows masked content |

### Integrity
| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/projects/{id}/integrity` | Hash chain result | Compute integrity chain |
| GET | `/api/v1/projects/{id}/integrity` | Integrity records | View hash chain |

### GitHub Repos
| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/projects/{id}/repos` | Attached repo | Attach + parse repo |
| GET | `/api/v1/projects/{id}/repos` | All repos for project | List view |
| GET | `/api/v1/projects/{id}/repos/{repoId}` | Repo detail with correlations | Detail view |
| DELETE | `/api/v1/projects/{id}/repos/{repoId}` | Confirmation | Detach repo |

### Knowledge Map
| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/projects/{id}/knowledge-map` | Entities, topics, code fingerprints, task types | **MEMORY LAYER** — visual entity graph |

---

## Page: Project Intake (AI Work Profile)

The intake form for evaluation — brief, deliverables, ship proof. Two paths: self-compiled or agent-compiled.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/projects/{id}/brief` | Saved brief | Goal statement, solo estimate, starting point, role, team context, difficulty |
| GET | `/api/v1/projects/{id}/brief` | Current brief | Load saved brief for editing |
| POST | `/api/v1/projects/{id}/deliverables` | Saved deliverable refs | Upload primary artifact, supporting artifacts |
| GET | `/api/v1/projects/{id}/deliverables` | List of deliverables | Show uploaded files |
| POST | `/api/v1/projects/{id}/ship-proof` | Saved proof | Git commit, URL, filing, deploy log + ship date |
| GET | `/api/v1/projects/{id}/ship-proof` | Current proof | Load saved proof |
| PATCH | `/api/v1/projects/{id}/outcome` | Updated outcome | Post-hoc outcome statement |
| POST | `/api/v1/intake/compile` | Compile job ID | **AGENT PATH** — agent reads raw chats, proposes briefs |
| GET | `/api/v1/intake/compile/{id}/status` | Job progress | Poll agent compilation |
| GET | `/api/v1/intake/compile/{id}/results` | Proposed projects with draft briefs | Review + edit before confirming |

---

## Page: Assessments List

View all assessments, their status, access results.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/assessments` | New assessment | Create from uploads |
| GET | `/api/v1/assessments` | Paginated assessment list | Main list view |
| GET | `/api/v1/assessments/{id}` | Assessment detail | Status, metadata |
| DELETE | `/api/v1/assessments/{id}` | Confirmation | **NEW** — delete assessment |
| POST | `/api/v1/assessments/{id}/rerun` | Re-evaluation job | **NEW** — re-evaluate with updated signals |

---

## Page: Assessment Results

Deep view into a single assessment — scores, signals, observations, download.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/assessments/{id}/results` | Full results with signals | Detailed signal data |
| GET | `/api/v1/assessments/{id}/live-observations` | Real-time dimension scores | Live polling during eval |
| GET | `/api/v1/assessments/{id}/normalized` | "What We Saw" features | Normalized observation data |
| GET | `/api/v1/assessments/{id}/download` | JSON or PDF export | Export results |

---

## Page: AI Work Profile

The three-score output card — HLS, AI Execution Load, CAI. Evidence trail, archetype, narrative.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/work-profile` | Aggregate work profile (all projects) | Dashboard hero card |
| GET | `/api/v1/work-profile?project_id={id}` | Per-project work profile | Project-scoped scores |

### Work Profile Response Shape
```
{
  human_leadership_score: int (0-100)
  hls_dimensions: { goal_origination, constraint_setting,
    decision_control, correction_pressure,
    strategic_pivots, final_ownership }
  ai_execution_load: float (0-1.0)
  cai: int (percentage, e.g. 437)
  cai_dimensions: { complexity_ceiling, iteration_depth,
    velocity, domain_span, throughput,
    leverage_maturity }
  confidence: "low" | "medium" | "high"
  confidence_rationale: string[]
  integrity: { manipulation_likelihood, flags[], adjustments[] }
  evidence: { rejected_drafts, constructive_revisions,
    strategic_pivots, validated_domains,
    velocity_days, velocity_baseline_days,
    complexity_percentile, accepted_artifacts,
    correction_cost_trend, prompt_sophistication_gain }
  archetype: { primary, secondary[] }
  narrative: string
  evaluated_at: ISO 8601
  project_id: string | null
}
```

---

## Page: Baseline Quiz

Onboarding cognitive baseline assessment. 5 minutes, one-time, taken during signup or before first evaluation.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/baseline/quiz` | Quiz questions (5 scenarios) | Load the assessment |
| POST | `/api/v1/baseline/quiz` | Baseline profile + percentile | Submit answers, get scored |
| GET | `/api/v1/baseline/profile` | Current baseline profile | Population percentile, baseline archetype, domains |

---

## Page: Proof Pages

Create, manage, publish proof pages.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/proof-pages` | All proof pages | List view |
| POST | `/api/v1/proof-pages` | New proof page | Create |
| PATCH | `/api/v1/proof-pages/{id}` | Updated proof page | Edit metadata |
| DELETE | `/api/v1/proof-pages/{id}` | Confirmation | **NEW** — delete |
| POST | `/api/v1/proof-pages/{id}/publish` | Published page | Make public |
| POST | `/api/v1/proof-pages/{id}/unpublish` | Unpublished page | Take down |

---

## Page: Portfolios

Create, manage, publish portfolios of proof pages.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/portfolios` | New portfolio | Create |
| GET | `/api/v1/portfolios` | All portfolios | List view |
| GET | `/api/v1/portfolios/{id}` | Portfolio detail | With project list |
| PATCH | `/api/v1/portfolios/{id}` | Updated portfolio | Edit metadata |
| DELETE | `/api/v1/portfolios/{id}` | Confirmation | **NEW** — delete |
| POST | `/api/v1/portfolios/{id}/projects` | Confirmation | Add project to portfolio |
| DELETE | `/api/v1/portfolios/{id}/projects/{pid}` | Confirmation | Remove project |
| PATCH | `/api/v1/portfolios/{id}/reorder` | Updated order | **NEW** — reorder projects |
| POST | `/api/v1/portfolios/{id}/publish` | Published | Make public |
| POST | `/api/v1/portfolios/{id}/unpublish` | Unpublished | Take down |

---

## Page: Memory / Search

Search conversations, saved searches, conversation detail.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/memory/query` | Conversations, groups, facets | **MEMORY LAYER** — the unified search endpoint |
| POST | `/api/v1/memory/export` | ZIP file download | Export filtered results |
| POST | `/api/v1/memory/saved-searches` | Saved search | Create |
| GET | `/api/v1/memory/saved-searches` | All saved searches | List |
| DELETE | `/api/v1/memory/saved-searches/{id}` | Confirmation | Delete |
| POST | `/api/v1/memory/reindex` | Reindex stats | Admin — re-index all conversations |

---

## Page: Conversation Detail

View a single conversation — all turns, tags, features.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/conversations` | Paginated conversation list | **MEMORY LAYER** — with filters |
| GET | `/api/v1/conversations/{upload_id}` | Full conversation with all turns | **MEMORY LAYER** — the reader view |
| POST | `/api/v1/conversations/{upload_id}/tags` | Created tag | Tag a conversation or turn |
| GET | `/api/v1/conversations/{upload_id}/tags` | All tags | List tags |
| DELETE | `/api/v1/conversations/{upload_id}/tags/{tag_id}` | Confirmation | Remove tag |

---

## Page: Disputes

Challenge observations, manage disputes.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/observations/{id}/dispute` | Created dispute | Challenge an observation |
| GET | `/api/v1/disputes` | All disputes | List view |
| PATCH | `/api/v1/disputes/{id}` | Updated dispute | Update status/response |

---

## Page: Webhooks

Manage webhook integrations.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| POST | `/api/v1/webhooks` | Created webhook | Create |
| GET | `/api/v1/webhooks` | All webhooks | List |
| PATCH | `/api/v1/webhooks/{id}` | Updated webhook | **NEW** — edit URL/events |
| DELETE | `/api/v1/webhooks/{id}` | Confirmation | Delete |
| POST | `/api/v1/webhooks/{id}/test` | Test payload result | **NEW** — send test event |

---

## Page: Directory

Public signal directory — browse and opt in/out.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/directory` | Public proof pages + work profiles | Browse directory |
| POST | `/api/v1/directory/{id}/opt-in` | Confirmation | List proof page in directory |
| POST | `/api/v1/directory/{id}/opt-out` | Confirmation | Remove from directory |

---

## Page: Account / Settings

User profile, session management.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/auth/me` | Current user profile | Load profile |
| PATCH | `/api/v1/auth/me` | Updated profile | **NEW** — update name/handle |
| POST | `/api/v1/auth/logout` | Confirmation | **NEW** — invalidate session |
| POST | `/api/v1/auth/magic-link` | Confirmation | Request login link |
| GET | `/api/v1/auth/callback` | Session token | Validate magic link |

---

## Page: Global Search

Cross-cutting search across everything.

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/api/v1/search?q=` | Projects, conversations, proofs matching query | **NEW** — global search |

---

## Public Pages (no auth)

| Method | Endpoint | Returns | Notes |
|--------|----------|---------|-------|
| GET | `/p/{token}` | Public proof page | Shareable link |
| GET | `/u/{slug}` | Public portfolio | Shareable profile |
| GET | `/portfolio/{token}` | Public portfolio (alt URL) | Legacy/alt route |
| GET | `/health` | Health status | System check |

---

## Endpoint Counts by Page

| Page | Endpoints | Status |
|------|-----------|--------|
| Dashboard | 9 | 8 existing + 1 new (activity) |
| Upload + Parse | 5 | All existing |
| Upload Pool | 8 | All existing |
| Projects List | 6 | 5 existing + 1 new (PATCH) |
| Project Detail | 17 | 16 existing + 1 new (knowledge-map) |
| Project Intake | 10 | All new (AI Work Profile) |
| Assessments List | 5 | 3 existing + 2 new (DELETE, rerun) |
| Assessment Results | 4 | All existing |
| AI Work Profile | 1-2 | All new |
| Baseline Quiz | 3 | All new |
| Proof Pages | 6 | 5 existing + 1 new (DELETE) |
| Portfolios | 10 | 8 existing + 2 new (DELETE, reorder) |
| Memory / Search | 6 | All new (memory layer) |
| Conversation Detail | 5 | All new (memory layer) |
| Disputes | 3 | All existing |
| Webhooks | 5 | 3 existing + 2 new (PATCH, test) |
| Directory | 3 | All existing |
| Account / Settings | 5 | 3 existing + 2 new (PATCH, logout) |
| Global Search | 1 | New |
| Public Pages | 4 | All existing |
