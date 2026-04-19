import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  ExternalLink,
  FolderKanban,
  Globe,
  Layers,
  Loader2,
  Lock,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useProjects } from "../../hooks/useApi";
import { apiDelete, apiFetch, apiPatch, apiPost } from "../../lib/api";
import { asArray, dateTime } from "../lib/poaw";

type PortfolioProject = {
  project_id: string;
  title: string;
  description: string | null;
  display_order: number;
  show_excerpts: boolean;
  show_github: boolean;
};

type PortfolioDetail = {
  id: string;
  title: string;
  headline: string | null;
  summary: string | null;
  public_token: string;
  slug: string | null;
  visibility: string;
  status: "draft" | "published" | "disabled" | string;
  version: number;
  projects: PortfolioProject[];
  created_at: string;
  updated_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-[#EAE3CF] text-[#6B6B66]",
  published: "bg-[#D3E9D9] text-[#1F6A3F]",
  disabled: "bg-[#F3D1D1] text-[#8B2F2F]",
};

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pickProjectId, setPickProjectId] = useState<string>("");

  const portfolioQuery = useQuery<PortfolioDetail>({
    queryKey: ["portfolio", id],
    queryFn: () => apiFetch<PortfolioDetail>(`/portfolios/${id}`),
    enabled: !!id,
  });
  const projectsQuery = useProjects();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["portfolio", id] });

  const update = useMutation({
    mutationFn: (body: { title?: string; headline?: string | null; summary?: string | null; slug?: string | null }) =>
      apiPatch(`/portfolios/${id}`, body),
    onSuccess: () => {
      toast.success("Portfolio updated");
      setEditing(false);
      invalidate();
    },
    onError: (error: any) => toast.error(error?.message ?? "Update failed"),
  });

  const addProject = useMutation({
    mutationFn: (projectId: string) =>
      apiPost(`/portfolios/${id}/projects`, { project_id: projectId, display_order: 0 }),
    onSuccess: () => {
      toast.success("Project added");
      setAdding(false);
      setPickProjectId("");
      invalidate();
    },
    onError: (error: any) => toast.error(error?.message ?? "Add failed"),
  });

  const removeProject = useMutation({
    mutationFn: (projectId: string) => apiDelete(`/portfolios/${id}/projects/${projectId}`),
    onSuccess: () => {
      toast.success("Project removed");
      invalidate();
    },
    onError: (error: any) => toast.error(error?.message ?? "Remove failed"),
  });

  const reorder = useMutation({
    mutationFn: (order: string[]) => apiPatch(`/portfolios/${id}/reorder`, { project_ids: order }),
    onSuccess: () => invalidate(),
    onError: (error: any) => toast.error(error?.message ?? "Reorder failed"),
  });

  const publish = useMutation({
    mutationFn: () => apiPost(`/portfolios/${id}/publish`, {}),
    onSuccess: () => {
      toast.success("Portfolio published");
      invalidate();
    },
    onError: (error: any) => toast.error(error?.message ?? "Publish failed"),
  });

  const unpublish = useMutation({
    mutationFn: () => apiPost(`/portfolios/${id}/unpublish`, {}),
    onSuccess: () => {
      toast.success("Portfolio unpublished");
      invalidate();
    },
    onError: (error: any) => toast.error(error?.message ?? "Unpublish failed"),
  });

  const remove = useMutation({
    mutationFn: () => apiDelete(`/portfolios/${id}`),
    onSuccess: () => {
      toast.success("Portfolio deleted");
      navigate("/app/portfolios");
    },
    onError: (error: any) => toast.error(error?.message ?? "Delete failed"),
  });

  const allProjects = asArray<any>(projectsQuery.data);

  const assigned = portfolioQuery.data?.projects ?? [];
  const available = useMemo(() => {
    const taken = new Set(assigned.map((project) => project.project_id));
    return allProjects.filter((project) => !taken.has(project.id));
  }, [assigned, allProjects]);

  const move = (projectId: string, delta: 1 | -1) => {
    const sorted = [...assigned].sort((a, b) => a.display_order - b.display_order);
    const index = sorted.findIndex((project) => project.project_id === projectId);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= sorted.length) return;
    const next = [...sorted];
    [next[index], next[target]] = [next[target], next[index]];
    reorder.mutate(next.map((project) => project.project_id));
  };

  if (portfolioQuery.isLoading || !portfolioQuery.data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[13px] text-[#6B6B66]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading portfolio...
      </div>
    );
  }

  const portfolio = portfolioQuery.data;
  const VisIcon = portfolio.visibility === "public" ? Globe : Lock;
  const publicPath = portfolio.slug ? `/u/${portfolio.slug}` : `/u/${portfolio.public_token}`;
  const published = portfolio.status === "published";

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#161616]">
      <header className="border-b border-[#D8D2C4] bg-[#FBF8F1]">
        <div className="px-8 py-7">
          <Link to="/app/portfolios" className="inline-flex items-center gap-2 text-[13px] text-[#5C5C5C] hover:text-[#161616]">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolios
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase ${STATUS_STYLE[portfolio.status] || "bg-[#EAE3CF] text-[#6B6B66]"}`}>
                  {portfolio.status}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#D8D2C4] px-2 py-0.5 text-[10px] text-[#6B6B66]">
                  <VisIcon className="h-3 w-3" />
                  {portfolio.visibility}
                </span>
                <span className="text-[10px] text-[#6B6B66]">v{portfolio.version}</span>
              </div>
              <h1 className="mt-2 flex items-start gap-2 text-3xl tracking-tight">
                <Layers className="mt-1.5 h-6 w-6 shrink-0 text-[#6B6B66]" />
                <span className="min-w-0 truncate">{portfolio.title}</span>
              </h1>
              {portfolio.headline ? (
                <p className="mt-1 text-[14px] leading-relaxed text-[#5C5C5C]">{portfolio.headline}</p>
              ) : null}
              {portfolio.summary ? (
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#6B6B66]">{portfolio.summary}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6B6B66]">
                <span>{assigned.length} project{assigned.length === 1 ? "" : "s"}</span>
                <span>created {dateTime(portfolio.created_at)}</span>
                {portfolio.updated_at && portfolio.updated_at !== portfolio.created_at ? (
                  <span>updated {dateTime(portfolio.updated_at)}</span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              {published ? (
                <>
                  <a href={publicPath} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </a>
                  <Button variant="ghost" onClick={() => unpublish.mutate()} disabled={unpublish.isPending}>
                    {unpublish.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                    Unpublish
                  </Button>
                </>
              ) : (
                <Button onClick={() => publish.mutate()} disabled={publish.isPending || assigned.length === 0}>
                  {publish.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                  Publish
                </Button>
              )}
              <Button
                variant="ghost"
                className="text-[#8B2F2F] hover:bg-[#F3D1D1]/40 hover:text-[#8B2F2F]"
                onClick={() => setDeleting(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#6B6B66]">Projects in order</div>
              <h2 className="text-xl tracking-tight">{assigned.length} linked</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => setAdding(true)} disabled={available.length === 0}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add project
            </Button>
          </div>

          {assigned.length === 0 ? (
            <Card className="border border-dashed border-[#D8D2C4] bg-[#FBF8F1] p-10 text-center text-[13px] text-[#5C5C5C]">
              No projects yet. Add at least one before publishing.
            </Card>
          ) : (
            <div className="space-y-2">
              {[...assigned]
                .sort((a, b) => a.display_order - b.display_order)
                .map((project, index, arr) => (
                  <Card key={project.project_id} className="border border-[#D8D2C4] bg-white p-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => move(project.project_id, -1)}
                          disabled={index === 0 || reorder.isPending}
                          className="rounded p-0.5 text-[#6B6B66] hover:bg-[#EAE3CF] disabled:opacity-30"
                          title="Move up"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(project.project_id, 1)}
                          disabled={index === arr.length - 1 || reorder.isPending}
                          className="rounded p-0.5 text-[#6B6B66] hover:bg-[#EAE3CF] disabled:opacity-30"
                          title="Move down"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                      </div>
                      <FolderKanban className="h-4 w-4 shrink-0 text-[#315D8A]" />
                      <div className="min-w-0 flex-1">
                        <Link to={`/app/projects/${project.project_id}`} className="truncate text-[14px] text-[#161616] hover:text-[#315D8A]">
                          {project.title}
                        </Link>
                        {project.description ? (
                          <div className="mt-0.5 line-clamp-1 text-[11px] text-[#6B6B66]">{project.description}</div>
                        ) : null}
                      </div>
                      <div className="flex gap-1">
                        {project.show_excerpts ? (
                          <span className="inline-flex items-center rounded-full bg-[#DCE4F0] px-2 py-0.5 text-[10px] tracking-[0.08em] text-[#315D8A]">
                            <Check className="mr-0.5 h-2.5 w-2.5" />
                            Excerpts
                          </span>
                        ) : null}
                        {project.show_github ? (
                          <span className="inline-flex items-center rounded-full bg-[#DCE4F0] px-2 py-0.5 text-[10px] tracking-[0.08em] text-[#315D8A]">
                            <Check className="mr-0.5 h-2.5 w-2.5" />
                            GitHub
                          </span>
                        ) : null}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8B2F2F] hover:bg-[#F3D1D1]/40 hover:text-[#8B2F2F]"
                        onClick={() => removeProject.mutate(project.project_id)}
                        disabled={removeProject.isPending}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit portfolio</DialogTitle>
            <DialogDescription>Changes apply to any published version when you next publish.</DialogDescription>
          </DialogHeader>
          <EditPortfolioForm portfolio={portfolio} onSubmit={(body) => update.mutate(body)} pending={update.isPending} />
        </DialogContent>
      </Dialog>

      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add project to portfolio</DialogTitle>
            <DialogDescription>Only projects you haven't already added appear here.</DialogDescription>
          </DialogHeader>
          {available.length === 0 ? (
            <div className="rounded-md border border-dashed border-[#D8D2C4] bg-[#FBF8F1] p-4 text-center text-[13px] text-[#5C5C5C]">
              Every project is already in this portfolio.
            </div>
          ) : (
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {available.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    setPickProjectId(project.id);
                    addProject.mutate(project.id);
                  }}
                  disabled={addProject.isPending}
                  className="flex w-full items-center justify-between gap-3 rounded-md border border-[#D8D2C4] bg-[#FBF8F1] px-3 py-2 text-left transition-colors hover:border-[#A88F5F] hover:bg-white disabled:opacity-60"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[13px]">{project.title}</div>
                    <div className="mt-0.5 text-[10px] text-[#6B6B66]">
                      {project.conversation_count ?? 0} conversations
                    </div>
                  </div>
                  {addProject.isPending && pickProjectId === project.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 text-[#6B6B66]" />
                  )}
                </button>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAdding(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleting} onOpenChange={setDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {portfolio.title}?</DialogTitle>
            <DialogDescription>
              Projects are unaffected. The portfolio URL returns 404 immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleting(false)}>Cancel</Button>
            <Button
              className="bg-[#8B2F2F] hover:bg-[#7A2525]"
              disabled={remove.isPending}
              onClick={() => remove.mutate()}
            >
              {remove.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditPortfolioForm({
  portfolio,
  onSubmit,
  pending,
}: {
  portfolio: PortfolioDetail;
  onSubmit: (body: { title?: string; headline?: string | null; summary?: string | null; slug?: string | null }) => void;
  pending: boolean;
}) {
  const [title, setTitle] = useState(portfolio.title);
  const [headline, setHeadline] = useState(portfolio.headline ?? "");
  const [summary, setSummary] = useState(portfolio.summary ?? "");
  const [slug, setSlug] = useState(portfolio.slug ?? "");

  return (
    <>
      <div className="space-y-3">
        <div>
          <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Title</label>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Headline</label>
          <Input value={headline} onChange={(event) => setHeadline(event.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Summary</label>
          <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={4} className="mt-1" />
        </div>
        <div>
          <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Slug</label>
          <Input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="your-name"
            pattern="^[a-z0-9-]+$"
            className="mt-1 font-mono text-[13px]"
          />
          <div className="mt-1 text-[11px] text-[#6B6B66]">Lowercase letters, numbers, hyphens. Public URL: /u/{slug || portfolio.public_token}</div>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() =>
            onSubmit({
              title: title.trim() || undefined,
              headline: headline.trim() || null,
              summary: summary.trim() || null,
              slug: slug.trim() || null,
            })
          }
          disabled={pending || !title.trim()}
        >
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
