import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
  Globe,
  Layers,
  Loader2,
  Lock,
  Plus,
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
import { apiFetch, apiPost } from "../../lib/api";

type Portfolio = {
  id: string;
  title: string;
  headline: string | null;
  public_token: string;
  slug: string | null;
  visibility: string;
  status: "draft" | "published" | string;
  version: number;
  project_count: number;
  created_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-[#EAE3CF] text-[#6B6B66]",
  published: "bg-[#D3E9D9] text-[#1F6A3F]",
  disabled: "bg-[#F3D1D1] text-[#8B2F2F]",
};

export default function Portfolios() {
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newHeadline, setNewHeadline] = useState("");
  const [newSummary, setNewSummary] = useState("");

  const listQuery = useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: () => apiFetch<Portfolio[]>(`/portfolios`),
  });

  const create = useMutation({
    mutationFn: () =>
      apiPost<Portfolio>(`/portfolios`, {
        title: newTitle.trim(),
        headline: newHeadline.trim() || null,
        summary: newSummary.trim() || null,
      }),
    onSuccess: () => {
      toast.success("Portfolio created");
      setCreating(false);
      setNewTitle("");
      setNewHeadline("");
      setNewSummary("");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: (error: any) => toast.error(error?.message ?? "Create failed"),
  });

  const portfolios = listQuery.data ?? [];
  const published = portfolios.filter((portfolio) => portfolio.status === "published");

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#161616]">
      <header className="border-b border-[#D8D2C4] bg-[#FBF8F1]">
        <div className="px-8 py-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#6B6B66]">Portfolios</div>
              <h1 className="mt-2 text-3xl tracking-tight">Collections of proof pages.</h1>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5C5C5C]">
                Group projects under a single shareable page at <span className="font-mono">/u/:slug</span>.
                A portfolio is the right link to send someone if you want them to see more than one piece of work at once.
              </p>
            </div>
            <Button onClick={() => setCreating(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New portfolio
            </Button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Tile label="Total" value={portfolios.length} />
            <Tile label="Published" value={published.length} />
            <Tile label="Drafts" value={portfolios.length - published.length} />
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        <div className="mx-auto max-w-5xl">
          {listQuery.isLoading ? (
            <div className="flex items-center gap-2 p-8 text-[13px] text-[#6B6B66]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading portfolios...
            </div>
          ) : portfolios.length === 0 ? (
            <Card className="border border-dashed border-[#D8D2C4] bg-[#FBF8F1] p-10 text-center text-[13px] text-[#5C5C5C]">
              <Layers className="mx-auto mb-2 h-5 w-5 text-[#6B6B66]" />
              <div className="text-[#161616]">No portfolios yet.</div>
              <div className="mt-1">
                Create one, then add the projects you want to bundle. Best for when a single proof page isn't enough.
              </div>
            </Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New portfolio</DialogTitle>
            <DialogDescription>
              Draft status by default. You can add projects and publish from the detail page.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Title</label>
              <Input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="AI builder portfolio"
                className="mt-1"
                autoFocus
              />
            </div>
            <div>
              <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Headline</label>
              <Input
                value={newHeadline}
                onChange={(event) => setNewHeadline(event.target.value)}
                placeholder="One line across the whole collection."
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-[12px] uppercase tracking-[0.1em] text-[#6B6B66]">Summary</label>
              <Textarea
                value={newSummary}
                onChange={(event) => setNewSummary(event.target.value)}
                placeholder="Optional framing paragraph."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
            <Button onClick={() => create.mutate()} disabled={create.isPending || !newTitle.trim()}>
              {create.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: number }) {
  return (
    <Card className="border border-[#D8D2C4] bg-white p-3">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[#6B6B66]">{label}</div>
      <div className="mt-1 text-2xl tracking-tight">{value}</div>
    </Card>
  );
}

function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const published = portfolio.status === "published";
  const VisIcon = portfolio.visibility === "public" ? Globe : Lock;
  const publicPath = portfolio.slug ? `/u/${portfolio.slug}` : `/u/${portfolio.public_token}`;
  return (
    <Link to={`/app/portfolios/${portfolio.id}`}>
      <Card className="group border border-[#D8D2C4] bg-white p-4 transition-colors hover:border-[#A88F5F] hover:bg-[#FBF8F1]">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase ${STATUS_STYLE[portfolio.status] || "bg-[#EAE3CF] text-[#6B6B66]"}`}>
            {portfolio.status}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#D8D2C4] px-2 py-0.5 text-[10px] text-[#6B6B66]">
            <VisIcon className="h-2.5 w-2.5" />
            {portfolio.visibility}
          </span>
          <span className="text-[10px] text-[#6B6B66]">v{portfolio.version}</span>
        </div>
        <div className="mt-2 flex items-start gap-2">
          <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[#6B6B66] group-hover:text-[#315D8A]" />
          <div className="min-w-0">
            <div className="truncate text-[15px] text-[#161616] group-hover:text-[#315D8A]">{portfolio.title}</div>
            {portfolio.headline ? (
              <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-[#6B6B66]">{portfolio.headline}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#6B6B66]">
          <span className="inline-flex items-center gap-1">
            <FolderKanban className="h-3 w-3" />
            {portfolio.project_count} project{portfolio.project_count === 1 ? "" : "s"}
          </span>
          {published ? (
            <a
              href={publicPath}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1 text-[#315D8A] hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              {publicPath}
            </a>
          ) : null}
          <ArrowRight className="ml-auto h-4 w-4 text-[#6B6B66] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Card>
    </Link>
  );
}
