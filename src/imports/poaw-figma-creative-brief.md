# PoAW Frontend — Creative Direction Brief

## What this product is

Proof of AI Work is a forensic evidence platform that measures and proves how humans use AI to extend their cognitive capacity. It's not a productivity tracker. It's not a chatbot wrapper. It's the first system that produces a defensible, evidence-backed score of human-AI collaboration quality.

The audience is professionals who use AI seriously — architects, founders, researchers, engineers — and the people evaluating them: hiring managers, investors, clients, collaborators. The score needs to feel credible to skeptical adults.

## Design identity

**The feeling:** A legal document that learned to breathe. Think Bloomberg Terminal meets a beautifully typeset research paper. Dense information presented with enough whitespace to feel authoritative, not overwhelming. This is a platform where evidence is the product — every pixel should feel like it could be submitted as an exhibit.

**Not this:** Dashboard SaaS with rounded cards, gradient hero sections, and "Your AI journey starts here!" copy. Not gamified. Not playful. Not startup-cute. The numbers on this platform have consequences — they go on portfolios, proof pages, and public profiles. Design for weight, not whimsy.

**Also not this:** Cold, sterile, clinical. The product is about human cognition being amplified. There should be warmth in the typography, life in the data visualizations, and moments where the design makes you feel the arc of someone's growth. The evidence is forensic but the story is human.

## Typography direction

Two weights doing all the work. A refined serif or editorial sans for the big numbers and headings — the CAI score, the leadership score, the archetype label. These are the moments people screenshot and share. They need to feel like a magazine cover stat, not a dashboard metric.

A clean, highly legible sans for everything else — body text, table data, form labels, navigation. This is the workhorse. It should disappear.

Monospace for evidence references — turn IDs, timestamps, content hashes, code blocks, the formula. These are the forensic layer. They should feel like court exhibits.

## Color philosophy

The platform has three emotional registers and each needs its own color treatment:

**Neutral/structural** — the chrome. Navigation, cards, borders, backgrounds. Warm grays, not blue-grays. The platform should feel like paper and ink, not screens and pixels.

**Scores and metrics** — the signal. The three core scores (HLS, AI Execution Load, CAI) each need a distinct color that's used nowhere else on the platform. These colors become the brand shorthand: users should eventually recognize "that purple" as the leadership score without reading the label. Suggest:
- HLS (Human Leadership): a deep confident purple — this is about human authority
- AI Execution Load: a grounded teal — this is about the AI doing its job
- CAI (Cognitive Amplification): a warm amber/gold — this is about leverage, about more

**Status and confidence** — the system. Success/warning/danger for publish states, parse status, integrity checks. Standard semantic colors but tuned to the warm palette so green doesn't feel clinical.

## Key pages and what they need to feel like

### Dashboard
The command center. Dense but scannable. The user should know the health of their entire platform in 3 seconds. Four stat cards across the top, activity feed with timestamps, quick actions that don't look like a toy.

The AI Work Profile hero card sits at the top of the dashboard when a score exists. This is the most important visual on the entire platform. The CAI number should be the largest thing on the page. Not in a "look at my gamerscore" way — in a "this is a measured result" way. Like a financial statement headline number.

### Conversation Detail (the reader)
This is where people read their AI conversations. It needs to feel like reading a deposition transcript — clean, sequential, every turn attributed and timestamped. User turns on one side, assistant turns on the other (or visually distinguished). Opening turns (the cognitive baseline) should be subtly highlighted — maybe a thin accent border or a slightly different background — without being loud about it.

Attachments inline. If a turn has a file, show it: code blocks rendered, images displayed, documents linked. These are evidence — don't hide them behind a download button.

Tags should feel like sticky notes on a document — visible but non-destructive. Turn-level tags sit next to the turn. Conversation-level tags sit at the top.

### Memory / Search
The search interface. The `POST /memory/query` endpoint is extremely flexible — it supports full-text search, filters, grouping, similarity, and aggregation in one call. The UI should expose this power progressively: a simple search bar by default, with filter chips and advanced options that expand when needed.

Results should show conversation cards with highlighted snippets, project grouping, and relevance scores. Saved searches live in a sidebar or a pinned section — these are the user's bookmarks into their own history.

### Project Intake Form
The brief + deliverables + ship proof form. This is a multi-step wizard but it should NOT feel like a checkout flow. Each step should feel like filling out a serious document — a patent application or a grant proposal. The "why this field matters" explanations should be visible (not hidden in tooltips) because users need to understand that every field directly improves the quality of their score.

The toggle between self-compiled and agent-compiled paths should be prominent at the top. When the agent path is selected, the form transforms: instead of empty fields, it shows the agent's proposed briefs with edit buttons. The user is reviewing and approving, not writing from scratch.

### AI Work Profile Output
The three-score card with evidence trail. This is the product's money shot — the thing that goes on proof pages and portfolios.

Layout: the three scores across the top (HLS, Execution Load, CAI) each in their own color. Confidence badge. Archetype label. Below that, the evidence grid — rejected drafts, constructive revisions, strategic pivots, validated domains, velocity comparison, complexity percentile. Each evidence item should feel like a stat in a scouting report, not a bullet point.

The narrative interpretation at the bottom — the LLM-generated summary — should be set in the editorial typeface. It's the human-readable version of what the numbers say. Give it room to breathe.

The Leadership × Amplification quadrant chart should be interactive. Hover shows the quadrant labels (Architect, Delegator, Craftsman, Tourist). The user's dot is highlighted. If they have multiple project evaluations, show all of them on the quadrant so they can see their pattern.

### Baseline Quiz
Five scenario-based questions. Should NOT feel like a standardized test. Each question presents a messy real-world scenario and asks the user how they'd approach it. Think "case study interview" not "multiple choice exam." 

Use generous spacing, the editorial typeface for scenario descriptions, and subtle progress indication. The result at the end — population percentile and baseline profile — should transition smoothly into "now upload your conversations and let's see what AI adds to this baseline."

### Proof Page (Public)
This is what the world sees. It needs to be beautiful enough that someone would be proud to put it in a job application or a client proposal. The work profile scores, the evidence trail, the narrative — all rendered in a clean, shareable format. 

Include the project name, the user's name/handle, the evaluation date, and the confidence level. The integrity hash chain should be subtly visible — not the full chain, but a "verified" badge that links to the full integrity record. This is the forensic backbone showing through.

### Portfolio (Public)
A collection of proof pages. This is the user's professional profile. It should feel like a portfolio site — clean, project-focused, with the aggregate work profile scores at the top and individual project cards below. The aggregate CAI across all projects is the headline number.

## Micro-interactions worth getting right

**Score reveal:** When an evaluation completes and the work profile loads for the first time, the three scores should animate in — not with confetti or celebration, but with the confidence of a result being delivered. A clean count-up on the numbers. The evidence items appearing sequentially below. It should feel like watching a document being unsealed.

**Confidence indicator:** The confidence badge (Low/Medium/High) should feel like a rating agency stamp — not a traffic light. Low confidence isn't "bad" — it means "we need more evidence." The design should communicate that.

**Era timeline:** On the conversation list or memory search, there should be a subtle timeline visualization that shows the user's conversation history across time. The gap periods (missing data) should be visually apparent — a dashed or faded section. This tells the story of their AI journey.

**Archetype badge:** The primary archetype (Architect, Delegator, Craftsman, Tourist) should have a distinctive visual treatment — not an icon, but a typographic treatment. Something that looks good as a badge on a proof page or portfolio. Think "rated by" not "achievement unlocked."

## What NOT to do

- No onboarding carousels or product tours. The interface should be self-evident.
- No empty states with cartoon illustrations. If there's no data, show the intake path clearly.
- No "AI-powered" badges or sparkle icons anywhere. The whole product is AI-powered. Calling attention to it is like a restaurant putting "contains food" on the menu.
- No gamification. No streaks. No leaderboards (the directory is a signal board, not a leaderboard). No "you're doing great!" encouragement. The numbers speak for themselves.
- No dark mode as default. This is a document-reading platform. Light background, dark text, warm grays. Dark mode as an option, not the identity.
- No excessive card nesting. If a card contains cards that contain cards, the information architecture is wrong. Flatten it.

## Reference aesthetic touchpoints

For the vibe, not to copy:
- Bloomberg Terminal (information density done right)
- Stripe documentation (clarity of technical content)
- Are.na (thoughtful presentation of collected work)
- Swiss typographic design (grid, whitespace, hierarchy)
- Legal briefs (the forensic evidence presentation)
- The Economist (data journalism that respects the reader)

## The one thing to remember

This platform turns AI chat history into courtroom-grade evidence of human capability. Every design decision should serve that mission. If a visual choice makes the platform feel less credible, less serious, or less trustworthy — even if it looks cool — cut it. The user is trusting this platform to represent their professional capabilities to the world. Design accordingly.
