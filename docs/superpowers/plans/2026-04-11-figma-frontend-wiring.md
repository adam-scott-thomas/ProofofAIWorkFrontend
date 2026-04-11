# Figma Make Frontend Wiring — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current ProofOfAIWork frontend with Figma Make pages wired to the live backend API at `api.proofofaiwork.com`.

**Architecture:** Copy the Figma Make pages from `ProofOfAIWork/src/app/` (main branch) into the frontend repo `ProofOfAIWork-frontend/src/app/`. Keep the existing API infrastructure (`lib/api.ts`, `hooks/useApi.ts`, `stores/authStore.ts`). Replace every `const mock*` with real API calls using TanStack React Query. The route structure changes from `/dashboard/*` to `/app/*`.

**Tech Stack:** React 18, React Router 7, TanStack React Query 5, Zustand 5, Vite 6, Tailwind CSS 4, Radix UI, Lucide Icons, Square Web Payments SDK

---

## Source Repos

- **Figma Make pages:** `D:/lost_marbles/ProofOfAIWork/src/app/` (main branch)
- **Frontend repo:** `D:/lost_marbles/ProofOfAIWork-frontend/`
- **Backend API:** `http://localhost:8000/api/v1/*` (local dev) / `https://api.proofofaiwork.com/api/v1/*` (prod)

## File Map

### Keep from existing frontend (DO NOT OVERWRITE)
- `src/lib/api.ts` — fetch wrapper with auth
- `src/hooks/useApi.ts` — React Query hooks for all endpoints
- `src/stores/authStore.ts` — Zustand auth state
- `src/types/square.d.ts` — Square SDK types
- `src/app/components/SquarePaymentForm.tsx` — Square card tokenization
- `src/app/pages/Billing.tsx` — already wired to Square + NowPayments
- `src/app/pages/SignIn.tsx` — auth page
- `src/app/pages/AuthCallback.tsx` — magic link callback
- `src/app/components/ProtectedRoute.tsx` — auth guard
- `functions/p/[slug].ts` — Cloudflare Pages function for OG tags
- `.env.production` — API URL config
- `vite.config.ts` — keep existing (has dev proxy to localhost:8000)

### Copy from Figma Make (OVERWRITE existing)
- `src/app/components/Layout.tsx` — new sidebar with `/app/*` routes
- `src/app/components/ShareDialog.tsx` — social share cards (html2canvas)
- `src/app/components/UploadDialog.tsx` — drag-and-drop upload
- `src/app/components/PaymentModal.tsx` — payment dialog (will rewire to Square)
- `src/app/components/KeyboardShortcutsDialog.tsx` — keyboard shortcuts help
- `src/app/components/EmptyState.tsx` — empty state placeholder
- `src/app/components/ConfirmDialog.tsx` — generic confirm
- `src/app/components/CreateProjectDialog.tsx` — project creation
- `src/app/components/KnowledgeMap.tsx` — visualization
- `src/app/components/LoadingState.tsx` — loading placeholder
- `src/app/pages/Dashboard.tsx` — main dashboard
- `src/app/pages/Landing.tsx` — marketing landing page
- `src/app/pages/UploadFlow.tsx` — first-time upload experience
- `src/app/pages/UploadPool.tsx` — upload management
- `src/app/pages/Projects.tsx` — project list
- `src/app/pages/ProjectDetail.tsx` — project detail
- `src/app/pages/WorkProfile.tsx` — work profile scores
- `src/app/pages/Assessments.tsx` — assessment list
- `src/app/pages/ProofPages.tsx` — proof page management
- `src/app/pages/PublicProfile.tsx` — public user profile
- `src/app/pages/Leaderboard.tsx` — leaderboard
- `src/app/pages/Conversations.tsx` — conversation browser
- `src/app/pages/ConversationDetail.tsx` — single conversation
- `src/app/pages/KnowledgeMapPage.tsx` — knowledge map page
- `src/app/pages/Account.tsx` — settings
- `src/app/pages/Search.tsx` — search page
- `src/app/pages/NotFound.tsx` — 404
- `src/app/pages/student/StudentUpload.tsx` — student upload
- `src/app/pages/student/StudentAnalyze.tsx` — student processing
- `src/app/pages/student/StudentShareGate.tsx` — student share gate
- `src/app/pages/student/StudentResults.tsx` — student results

### Modify after copy
- `src/app/routes.ts` — new route structure from Figma, plus auth guards

---

## Task Breakdown

### Task 1: Copy Figma Make files into frontend repo

**Files:**
- Copy: all files listed in "Copy from Figma Make" section above
- Keep: all files listed in "Keep from existing frontend" section above

- [ ] **Step 1: Copy Figma page files**

```bash
# From D:/lost_marbles/ProofOfAIWork (on main branch)
# Copy pages
cp src/app/pages/Dashboard.tsx ../ProofOfAIWork-frontend/src/app/pages/Dashboard.tsx
cp src/app/pages/Landing.tsx ../ProofOfAIWork-frontend/src/app/pages/Landing.tsx
cp src/app/pages/UploadFlow.tsx ../ProofOfAIWork-frontend/src/app/pages/UploadFlow.tsx
cp src/app/pages/UploadPool.tsx ../ProofOfAIWork-frontend/src/app/pages/UploadPool.tsx
cp src/app/pages/Projects.tsx ../ProofOfAIWork-frontend/src/app/pages/Projects.tsx
cp src/app/pages/ProjectDetail.tsx ../ProofOfAIWork-frontend/src/app/pages/ProjectDetail.tsx
cp src/app/pages/WorkProfile.tsx ../ProofOfAIWork-frontend/src/app/pages/WorkProfile.tsx
cp src/app/pages/Assessments.tsx ../ProofOfAIWork-frontend/src/app/pages/Assessments.tsx
cp src/app/pages/ProofPages.tsx ../ProofOfAIWork-frontend/src/app/pages/ProofPages.tsx
cp src/app/pages/PublicProfile.tsx ../ProofOfAIWork-frontend/src/app/pages/PublicProfile.tsx
cp src/app/pages/Leaderboard.tsx ../ProofOfAIWork-frontend/src/app/pages/Leaderboard.tsx
cp src/app/pages/Conversations.tsx ../ProofOfAIWork-frontend/src/app/pages/Conversations.tsx
cp src/app/pages/ConversationDetail.tsx ../ProofOfAIWork-frontend/src/app/pages/ConversationDetail.tsx
cp src/app/pages/KnowledgeMapPage.tsx ../ProofOfAIWork-frontend/src/app/pages/KnowledgeMapPage.tsx
cp src/app/pages/Account.tsx ../ProofOfAIWork-frontend/src/app/pages/Account.tsx
cp src/app/pages/Search.tsx ../ProofOfAIWork-frontend/src/app/pages/Search.tsx
cp src/app/pages/NotFound.tsx ../ProofOfAIWork-frontend/src/app/pages/NotFound.tsx

# Copy student pages
mkdir -p ../ProofOfAIWork-frontend/src/app/pages/student
cp src/app/pages/student/StudentUpload.tsx ../ProofOfAIWork-frontend/src/app/pages/student/
cp src/app/pages/student/StudentAnalyze.tsx ../ProofOfAIWork-frontend/src/app/pages/student/
cp src/app/pages/student/StudentShareGate.tsx ../ProofOfAIWork-frontend/src/app/pages/student/
cp src/app/pages/student/StudentResults.tsx ../ProofOfAIWork-frontend/src/app/pages/student/

# Copy components (NOT SquarePaymentForm — keep ours)
cp src/app/components/Layout.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/ShareDialog.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/UploadDialog.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/PaymentModal.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/KeyboardShortcutsDialog.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/EmptyState.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/ConfirmDialog.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/CreateProjectDialog.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/KnowledgeMap.tsx ../ProofOfAIWork-frontend/src/app/components/
cp src/app/components/LoadingState.tsx ../ProofOfAIWork-frontend/src/app/components/

# Copy figma subdir if exists
cp -r src/app/components/figma ../ProofOfAIWork-frontend/src/app/components/
```

- [ ] **Step 2: Verify build compiles**

Run: `cd D:/lost_marbles/ProofOfAIWork-frontend && npm run build`
Expected: Build succeeds (may have warnings about unused imports)

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: import Figma Make pages — static UI, not yet wired to API"
```

---

### Task 2: Update routes to new structure with auth guards

**Files:**
- Modify: `src/app/routes.ts`
- Modify: `src/app/App.tsx`

The Figma Make routes use `/app/*` for the authenticated workspace. The old frontend used `/dashboard/*`. We keep `/sign-in`, `/auth/callback`, `/p/:slug` from the old routes and adopt the new structure for everything else.

- [ ] **Step 1: Write new routes.ts**

Replace `src/app/routes.ts` with:

```typescript
import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import UploadFlow from "./pages/UploadFlow";
import UploadPool from "./pages/UploadPool";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Conversations from "./pages/Conversations";
import ConversationDetail from "./pages/ConversationDetail";
import KnowledgeMapPage from "./pages/KnowledgeMapPage";
import WorkProfile from "./pages/WorkProfile";
import Assessments from "./pages/Assessments";
import ProofPages from "./pages/ProofPages";
import Billing from "./pages/Billing";
import Search from "./pages/Search";
import Account from "./pages/Account";
import PublicProofPage from "./pages/PublicProofPage";
import PublicProfile from "./pages/PublicProfile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import StudentUpload from "./pages/student/StudentUpload";
import StudentAnalyze from "./pages/student/StudentAnalyze";
import StudentShareGate from "./pages/student/StudentShareGate";
import StudentResults from "./pages/student/StudentResults";

export const router = createBrowserRouter([
  { path: "/", Component: Landing },
  { path: "/sign-in", Component: SignIn },
  { path: "/auth/callback", Component: AuthCallback },
  { path: "/upload", Component: UploadFlow },

  // Authenticated workspace
  {
    path: "/app",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { index: true, Component: Dashboard },
      { path: "upload", Component: UploadPool },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "conversations", Component: Conversations },
      { path: "conversations/:id", Component: ConversationDetail },
      { path: "knowledge-map", Component: KnowledgeMapPage },
      { path: "work-profile", Component: WorkProfile },
      { path: "assessments", Component: Assessments },
      { path: "proof-pages", Component: ProofPages },
      { path: "billing", Component: Billing },
      { path: "search", Component: Search },
      { path: "account", Component: Account },
    ],
  },

  // Public pages
  { path: "/@:username", Component: PublicProfile },
  { path: "/p/:slug", Component: PublicProofPage },
  { path: "/leaderboard", Component: Leaderboard },

  // Student flow
  { path: "/student/upload", Component: StudentUpload },
  { path: "/student/analyze", Component: StudentAnalyze },
  { path: "/student/share", Component: StudentShareGate },
  { path: "/student/results", Component: StudentResults },

  { path: "*", Component: NotFound },
]);
```

Note: `ProtectedRoute` wraps `Layout` as an `element`, not `Component`. This is because `ProtectedRoute` needs to render `Layout` as its child.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/routes.ts && git commit -m "feat: new route structure — /app/* with auth guards"
```

---

### Task 3: Add missing API hooks to useApi.ts

**Files:**
- Modify: `src/hooks/useApi.ts`

The Figma pages need these hooks that don't exist yet:

- [ ] **Step 1: Add hooks for dashboard, projects, conversations, work profile, assessments, proof pages, activity**

Append to `useApi.ts`:

```typescript
// Activity feed
export const useActivity = () =>
  useAuthQuery(["activity"], () => apiFetch<any>("/activity"));

// Projects — full CRUD
export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string; description?: string }) =>
      apiPost<any>("/projects", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/projects/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useAiClusterEstimate = () =>
  useAuthQuery(["ai-cluster-estimate"], () =>
    apiFetch<any>("/projects/ai-cluster/estimate"),
  );

export const useAiCluster = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { source_id?: string }) =>
      apiPost<any>("/projects/ai-cluster", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

// Proof pages
export const useCreateProofPage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => apiPost<any>("/proof-pages", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["proof-pages"] }),
  });
};

export const usePublishProofPage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<any>(`/proof-pages/${id}/publish`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["proof-pages"] }),
  });
};

// Assessment detail + results
export const useAssessment = (id: string) =>
  useAuthQuery(["assessment", id], () => apiFetch<any>(`/assessments/${id}`), {
    enabled: !!id,
  });

export const useAssessmentResults = (id: string) =>
  useAuthQuery(
    ["assessment-results", id],
    () => apiFetch<any>(`/assessments/${id}/results`),
    { enabled: !!id },
  );

// Upload via direct PUT
export const useDirectUpload = () =>
  useMutation({
    mutationFn: async (files: File[]) => {
      // Step 1: presign
      const presign = await apiPost<any>("/uploads/presign", {
        filename: files.length === 1 ? files[0].name : "batch-upload.zip",
        content_type: files[0].type || "application/octet-stream",
      });

      // Step 2: upload file(s) to the upload endpoint
      const uploadId = presign.upload_id;
      const token = localStorage.getItem("poaw-token");
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const API_HOST = import.meta.env.VITE_API_URL || "";
      const API_BASE = API_HOST ? `${API_HOST}/api/v1` : "/api/v1";

      if (files.length === 1) {
        await fetch(`${API_BASE}/uploads/${uploadId}/file`, {
          method: "PUT",
          headers: { ...headers, "Content-Type": files[0].type || "application/octet-stream" },
          body: files[0],
        });
      } else {
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));
        await fetch(`${API_BASE}/uploads/${uploadId}/files`, {
          method: "PUT",
          headers,
          body: formData,
        });
      }

      // Step 3: complete
      return apiPost<any>("/uploads/complete", { upload_id: uploadId });
    },
  });

// Search
export const useGlobalSearch = (q: string) =>
  useAuthQuery(["search", q], () => apiFetch<any>(`/search?q=${encodeURIComponent(q)}`), {
    enabled: q.length >= 2,
  });

// User profile update
export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => apiPatch<any>("/auth/me", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
};
```

Check: these hooks use `apiFetch`, `apiPost`, `apiPatch`, `apiDelete` already imported at the top of `useApi.ts`. Also uses `useQueryClient` already imported.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useApi.ts && git commit -m "feat: add API hooks for dashboard, projects, uploads, search"
```

---

### Task 4: Wire PaymentModal to Square (replace fake Stripe form)

**Files:**
- Modify: `src/app/components/PaymentModal.tsx`

The Figma PaymentModal has fake Stripe card inputs. Replace with SquarePaymentForm + crypto option, reusing the pattern from Billing.tsx.

- [ ] **Step 1: Rewrite PaymentModal.tsx**

Replace the entire file with a component that:
- Fetches Square config via `usePaymentConfig()`
- Renders `SquarePaymentForm` for card tokenization
- Calls `/payments/ai-sort` with the nonce on submit
- Has a crypto tab that calls `/payments/crypto-invoice` with `feature: "ai_sort"`
- Calls `onComplete()` on payment success
- Shows the $7 price and what you get (from the existing Figma design)

- [ ] **Step 2: Verify build + test locally**

Run: `npm run build`
Navigate to dashboard, click "Run AI Sort", verify Square card form loads

- [ ] **Step 3: Commit**

```bash
git add src/app/components/PaymentModal.tsx && git commit -m "feat: wire PaymentModal to Square + NowPayments"
```

---

### Task 5: Wire Dashboard.tsx to real API

**Files:**
- Modify: `src/app/pages/Dashboard.tsx`

Replace all `const mock*` objects with API calls. The dashboard needs:
- `useCurrentUser()` → user name, email, handle
- `useWorkProfile()` → HLS, AEL, CAI, archetype, narrative
- `useActivity()` → recent activity feed
- `useProjects()` → project count
- `useConversations()` → conversation count
- `useAssessments()` → assessment count
- `useProofPages()` → published proof count
- `usePool()` → upload pool for "has conversations" check
- `useBilling()` → check if AI sort has been paid for

Key behavior:
- If user has no projects (projects.length === 0), show the "unstructured" CTA
- If user has projects, show the "structured" dashboard with real scores
- Activity feed from `/activity` endpoint
- Stats from counting items in each list
- PaymentModal triggers real Square payment for AI Sort

- [ ] **Step 1: Replace mock data with hooks**
- [ ] **Step 2: Add loading states using LoadingState component**
- [ ] **Step 3: Wire PaymentModal onComplete to invalidate queries**
- [ ] **Step 4: Wire ShareDialog with real user data**
- [ ] **Step 5: Verify locally — sign in, check dashboard renders real data**
- [ ] **Step 6: Commit**

```bash
git add src/app/pages/Dashboard.tsx && git commit -m "feat: wire dashboard to live API data"
```

---

### Task 6: Wire UploadFlow.tsx to real upload pipeline

**Files:**
- Modify: `src/app/pages/UploadFlow.tsx`

This is the first-time user experience. Flow: upload file → real processing → partial results → unlock.

- [ ] **Step 1: Replace fake upload with `useDirectUpload()` hook**

When user selects file and clicks "Start Analysis":
1. Call `useDirectUpload().mutate(files)`
2. On success, get back assessment ID
3. Navigate to processing step

- [ ] **Step 2: Replace fake processing with real assessment polling**

Poll `useAssessment(id)` every 3 seconds. Map status to step:
- `pending/parsing/normalizing` → "Reading conversations"
- `gating` → "Detecting patterns"
- `evaluating` → "Mapping projects"
- `aggregating/complete/partial` → "Generating insights" → done

- [ ] **Step 3: Replace fake partial results with real data**

Fetch `useAssessmentResults(id)` for the partial view.
Fetch `useProjects()` for detected projects list.

- [ ] **Step 4: Wire unlock to PaymentModal (Square, not Stripe)**

PaymentModal `onComplete` navigates to `/app`.

- [ ] **Step 5: Verify full flow locally**
- [ ] **Step 6: Commit**

```bash
git add src/app/pages/UploadFlow.tsx && git commit -m "feat: wire upload flow to real upload + assessment pipeline"
```

---

### Task 7: Wire UploadDialog.tsx to real upload

**Files:**
- Modify: `src/app/components/UploadDialog.tsx`

- [ ] **Step 1: Replace fake upload with `useDirectUpload()` hook**

On "Upload" click, call `useDirectUpload().mutate(files)`. Show real progress. Invalidate `["pool"]` and `["conversations"]` queries on success.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/UploadDialog.tsx && git commit -m "feat: wire upload dialog to real API"
```

---

### Task 8: Wire remaining data pages

**Files:**
- Modify: `src/app/pages/Projects.tsx`
- Modify: `src/app/pages/ProjectDetail.tsx`
- Modify: `src/app/pages/Conversations.tsx`
- Modify: `src/app/pages/ConversationDetail.tsx`
- Modify: `src/app/pages/WorkProfile.tsx`
- Modify: `src/app/pages/Assessments.tsx`
- Modify: `src/app/pages/ProofPages.tsx`
- Modify: `src/app/pages/UploadPool.tsx`

Each page follows the same pattern:
1. Replace `const mock*` with the appropriate `useX()` hook
2. Add loading state with `LoadingState` component
3. Add empty state with `EmptyState` component
4. Keep the Figma UI layout exactly as-is

Endpoint mapping:
- `Projects.tsx` → `useProjects()`, `useConversations()` for raw view
- `ProjectDetail.tsx` → `useProject(id)`, `useConversation(id)` for conversations tab
- `Conversations.tsx` → `useConversations()`
- `ConversationDetail.tsx` → `useConversation(id)`
- `WorkProfile.tsx` → `useWorkProfile()`
- `Assessments.tsx` → `useAssessments()`
- `ProofPages.tsx` → `useProofPages()`
- `UploadPool.tsx` → `usePool()`, `useUploads()`

- [ ] **Step 1: Wire Projects.tsx** — replace mock with `useProjects()` + `useConversations()`
- [ ] **Step 2: Commit**
- [ ] **Step 3: Wire ProjectDetail.tsx** — replace mock with `useProject(id)`
- [ ] **Step 4: Commit**
- [ ] **Step 5: Wire Conversations.tsx** — replace mock with `useConversations()`
- [ ] **Step 6: Commit**
- [ ] **Step 7: Wire ConversationDetail.tsx** — replace mock with `useConversation(id)`
- [ ] **Step 8: Commit**
- [ ] **Step 9: Wire WorkProfile.tsx** — replace mock with `useWorkProfile()`
- [ ] **Step 10: Commit**
- [ ] **Step 11: Wire Assessments.tsx** — replace mock with `useAssessments()`
- [ ] **Step 12: Commit**
- [ ] **Step 13: Wire ProofPages.tsx** — replace mock with `useProofPages()`
- [ ] **Step 14: Commit**
- [ ] **Step 15: Wire UploadPool.tsx** — replace mock with `usePool()`, `useUploads()`
- [ ] **Step 16: Commit**

---

### Task 9: Wire Search and Account pages

**Files:**
- Modify: `src/app/pages/Search.tsx`
- Modify: `src/app/pages/Account.tsx`

- [ ] **Step 1: Wire Search.tsx** — use `useGlobalSearch(q)` with debounced input
- [ ] **Step 2: Wire Account.tsx** — use `useCurrentUser()` for display, `useUpdateProfile()` for saves
- [ ] **Step 3: Commit each**

---

### Task 10: Wire Student flow to real pipeline

**Files:**
- Modify: `src/app/pages/student/StudentUpload.tsx`
- Modify: `src/app/pages/student/StudentAnalyze.tsx`
- Modify: `src/app/pages/student/StudentShareGate.tsx`
- Modify: `src/app/pages/student/StudentResults.tsx`

Student flow mirrors UploadFlow but simplified:
1. `StudentUpload` → `useDirectUpload()` to upload file
2. `StudentAnalyze` → poll `useAssessment(id)` for processing status
3. `StudentShareGate` → share buttons (Twitter/LinkedIn intent URLs) using real data
4. `StudentResults` → `useAssessmentResults(id)` for real scores

State passes between pages via URL params: `/student/analyze?id={assessment_id}`

- [ ] **Step 1: Wire StudentUpload** — real upload, navigate with assessment ID
- [ ] **Step 2: Wire StudentAnalyze** — poll assessment status from URL param
- [ ] **Step 3: Wire StudentShareGate** — populate share URLs with real scores
- [ ] **Step 4: Wire StudentResults** — display real assessment results
- [ ] **Step 5: Commit each step**

---

### Task 11: Build and verify full flow

- [ ] **Step 1: Run `npm run build`** — must pass with zero errors
- [ ] **Step 2: Test locally end-to-end**
  - Landing page loads
  - Sign in works (magic link)
  - Dashboard shows real data or empty states
  - Upload flow: select file → processing → results
  - Projects page lists real projects
  - AI Sort payment works (Square card form)
  - Share dialog generates downloadable images
  - Student flow works end-to-end
- [ ] **Step 3: Fix any broken pages**
- [ ] **Step 4: Final commit**

---

### Task 12: Deploy

- [ ] **Step 1: Push frontend to GitHub** — `git push origin main` (auto-deploys to Cloudflare Pages)
- [ ] **Step 2: Deploy backend** (if any backend changes were needed)

```bash
cd D:/lost_marbles/ProofOfAIWork
tar czf /tmp/poaw-deploy.tar.gz src/
gcloud compute scp /tmp/poaw-deploy.tar.gz proofofaiwork:/tmp/ --zone=us-west1-a
gcloud compute ssh proofofaiwork --zone=us-west1-a --command="cd /opt/proofofaiwork && sudo rm -rf src/ && sudo tar xzf /tmp/poaw-deploy.tar.gz && sudo docker compose build --no-cache api worker && sudo docker compose up -d"
```

- [ ] **Step 3: Verify production** — `curl https://api.proofofaiwork.com/api/v1/health` returns ok
- [ ] **Step 4: Test proofofaiwork.com in browser**

---

## Execution Notes

- **Do NOT touch the Figma UI.** The layouts, typography, spacing, colors — all stay exactly as designed. We only replace mock data sources with real API calls.
- **PaymentModal must use Square, not Stripe.** The Figma mock says "Stripe" — replace with SquarePaymentForm component.
- **Auth flows already exist.** SignIn, AuthCallback, ProtectedRoute are in the current frontend and work. Don't rebuild them.
- **Local dev is running.** Backend at localhost:8000, frontend at localhost:5173. Test every page after wiring.
- **One commit per wired page.** Granular history.
