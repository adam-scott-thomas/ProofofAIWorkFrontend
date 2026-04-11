import { Copy, Globe, Share2, Eye, ExternalLink, CheckCircle2, Sparkles, Plus, Search, MoreVertical } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useState } from "react";
import { ShareDialog } from "../components/ShareDialog";
import { useProofPages } from "../../hooks/useApi";

type ViewMode = "my-proofs" | "directory";

export default function ProofPages() {
  const [viewMode, setViewMode] = useState<ViewMode>("my-proofs");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "level" | "proofs">("recent");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const { data: pagesData, isLoading } = useProofPages();

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center text-[13px] text-[#717182]">Loading...</div>
  );

  const proofPages: any[] = Array.isArray(pagesData) ? pagesData : pagesData?.data ?? pagesData?.items ?? [];

  const handleShare = (page: any) => {
    setSelectedProof({
      name: "",
      handle: "",
      hlsScore: page.hls ?? 0,
      aelScore: 0,
      caiScore: page.cai ?? 0,
      proofUrl: `https://proofofaiwork.com/p/${page.slug ?? page.id}`,
      projectName: page.title ?? page.project_name ?? "",
      conversationCount: 0,
      date: page.created_at ? new Date(page.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
    });
    setShareDialogOpen(true);
  };

  const publishedPages = proofPages.filter((p: any) => p.published);
  const draftPages = proofPages.filter((p: any) => !p.published);
  const totalViews = proofPages.reduce((sum: number, p: any) => sum + (p.views ?? 0), 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Proof Pages</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                {viewMode === "my-proofs"
                  ? "Shareable evidence pages based on AI-organized work streams"
                  : "Browse public AI work profiles"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-md border border-[rgba(0,0,0,0.08)] bg-white p-1">
                <button
                  onClick={() => setViewMode("my-proofs")}
                  className={`rounded px-4 py-2 text-[13px] transition-colors ${
                    viewMode === "my-proofs"
                      ? "bg-[#F5F5F7] text-[#030213]"
                      : "text-[#717182] hover:text-[#030213]"
                  }`}
                >
                  My Proofs
                </button>
                <button
                  onClick={() => setViewMode("directory")}
                  className={`rounded px-4 py-2 text-[13px] transition-colors ${
                    viewMode === "directory"
                      ? "bg-[#F5F5F7] text-[#030213]"
                      : "text-[#717182] hover:text-[#030213]"
                  }`}
                >
                  Directory
                </button>
              </div>
              {viewMode === "my-proofs" && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Proof Page
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {viewMode === "my-proofs" ? (
          <>
            {proofPages.length === 0 ? (
              <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 text-center shadow-sm">
                <p className="text-[13px] text-[#717182]">No proof pages yet. Create one from an assessed project.</p>
              </Card>
            ) : (
              <>
                {/* Stats */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
                    <div className="text-[13px] text-[#717182]">Total Pages</div>
                    <div className="mt-1 text-2xl tracking-tight">{proofPages.length}</div>
                  </Card>
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
                    <div className="text-[13px] text-[#717182]">Published</div>
                    <div className="mt-1 text-2xl tracking-tight">{publishedPages.length}</div>
                  </Card>
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
                    <div className="text-[13px] text-[#717182]">Total Views</div>
                    <div className="mt-1 text-2xl tracking-tight">{totalViews}</div>
                  </Card>
                </div>

                {/* Published Pages */}
                {publishedPages.length > 0 && (
                  <div className="mb-8">
                    <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
                      <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-[#717182]" />
                            <h3 className="text-[15px]">Published Proof Pages</h3>
                          </div>
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            {publishedPages.length} live
                          </Badge>
                        </div>
                      </div>
                      <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                        {publishedPages.map((page: any) => (
                          <div key={page.id} className="px-6 py-5 hover:bg-[#FAFAFA] transition-colors">
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex-1">
                                <div className="mb-2 flex items-center gap-3">
                                  <Link to={`/p/${page.slug ?? page.id}`} className="text-[14px] hover:underline">
                                    {page.title ?? page.project_name ?? page.id}
                                  </Link>
                                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    Published
                                  </Badge>
                                  <Badge variant="outline" className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-normal" style={{ color: 'var(--score-execution)' }}>
                                    <Sparkles className="mr-1 h-2.5 w-2.5" />
                                    AI-organized work
                                  </Badge>
                                </div>
                                {page.slug && (
                                  <div className="mb-3 flex items-center gap-2">
                                    <span className="font-mono text-[12px] text-[#717182]">
                                      proofofaiwork.com/p/{page.slug}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                                <div className="flex items-center gap-6">
                                  {page.cai != null && (
                                    <div className="flex items-baseline gap-1.5">
                                      <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                                      <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>
                                        {page.cai}
                                      </span>
                                    </div>
                                  )}
                                  {page.hls != null && (
                                    <div className="flex items-baseline gap-1.5">
                                      <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                                      <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>
                                        {page.hls}
                                      </span>
                                    </div>
                                  )}
                                  {page.views != null && (
                                    <div className="flex items-center gap-1.5 text-[13px] text-[#717182]">
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>{page.views} views</span>
                                    </div>
                                  )}
                                  {(page.published_at ?? page.publishedAt) && (
                                    <span className="text-[13px] text-[#717182] font-mono">
                                      Published {new Date(page.published_at ?? page.publishedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                      })}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleShare(page)}>
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Draft Pages */}
                {draftPages.length > 0 && (
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
                    <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px]">Drafts</h3>
                        <span className="text-[13px] text-[#717182]">{draftPages.length} unpublished</span>
                      </div>
                    </div>
                    <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                      {draftPages.map((page: any) => (
                        <div key={page.id} className="px-6 py-5 hover:bg-[#FAFAFA] transition-colors">
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                <Link to={`/p/${page.slug ?? page.id}`} className="text-[14px] hover:underline">
                                  {page.title ?? page.project_name ?? page.id}
                                </Link>
                                <Badge variant="secondary" className="bg-[#F5F5F7] text-[#717182]">
                                  Draft
                                </Badge>
                              </div>
                              <div className="flex items-center gap-6">
                                {page.cai != null && (
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                                    <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>
                                      {page.cai}
                                    </span>
                                  </div>
                                )}
                                {page.hls != null && (
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                                    <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>
                                      {page.hls}
                                    </span>
                                  </div>
                                )}
                                {page.created_at && (
                                  <span className="text-[13px] text-[#717182] font-mono">
                                    Created {new Date(page.created_at).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                Preview
                              </Button>
                              <Button size="sm">
                                <Globe className="mr-2 h-4 w-4" />
                                Publish
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* Search and Filter */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]" />
                <Input
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "level" | "proofs")}
                className="rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-[13px] outline-none focus:border-[rgba(0,0,0,0.2)]"
              >
                <option value="recent">Most Recent</option>
                <option value="level">By Level</option>
                <option value="proofs">Most Proofs</option>
              </select>
            </div>

            {/* Directory placeholder — public profiles not yet in API */}
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-12 text-center shadow-sm">
              <p className="text-[15px] text-[#717182]">
                Public directory coming soon.
              </p>
            </Card>
          </>
        )}
      </div>

      {selectedProof && (
        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={selectedProof} />
      )}
    </div>
  );
}
