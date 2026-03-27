import { Copy, Globe, MoreVertical, Share2, Eye, CheckCircle2, Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router";
import { useState } from "react";
import { ShareDialog } from "../components/ShareDialog";
import { useProofPages, useCurrentUser } from "../../hooks/useApi";

export default function ProofPages() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const { data, isLoading, isError } = useProofPages();
  const { data: user } = useCurrentUser();

  const allPages: any[] = Array.isArray(data) ? data : (data?.items ?? []);
  const publishedPages = allPages.filter(p => p.published);
  const draftPages = allPages.filter(p => !p.published);
  const totalViews = allPages.reduce((sum, p) => sum + (p.views ?? 0), 0);

  const handleShare = (page: any) => {
    setSelectedProof({
      name: user?.name ?? "—",
      handle: user?.handle ?? "",
      hlsScore: page.hls ?? 0,
      aelScore: 0,
      caiScore: page.cai ?? 0,
      proofUrl: `https://poaw.io/p/${page.slug}`,
      projectName: page.project_name ?? page.projectName,
      conversationCount: 0,
      date: new Date(page.created_at ?? page.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    setShareDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Proof Pages</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Create shareable evidence pages for your work
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Proof Page
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="text-[13px] text-[#717182]">Total Pages</div>
            <div className="mt-1 text-2xl tracking-tight">{allPages.length}</div>
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

        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center text-[13px] text-[#717182]">
            Loading proof pages...
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-[13px] text-red-800">Failed to load proof pages.</p>
          </Card>
        )}

        {/* Empty state */}
        {!isLoading && !isError && allPages.length === 0 && (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm text-center">
            <Globe className="mx-auto mb-3 h-8 w-8 text-[#717182]" />
            <p className="text-[14px]">No proof pages yet</p>
            <p className="mt-1 mb-4 text-[13px] text-[#717182]">
              Complete an assessment and publish your first proof page to share your AI work profile.
            </p>
            <Button>Create Proof Page</Button>
          </Card>
        )}

        {/* Published Pages */}
        {!isLoading && !isError && publishedPages.length > 0 && (
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
                          <Link to={`/proof-pages/${page.id}`} className="text-[14px] hover:underline">
                            {page.project_name ?? page.projectName}
                          </Link>
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Published
                          </Badge>
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <span className="font-mono text-[12px] text-[#717182]">
                            poaw.io/p/{page.slug}
                          </span>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
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
        {!isLoading && !isError && draftPages.length > 0 && (
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
                        <Link to={`/proof-pages/${page.id}`} className="text-[14px] hover:underline">
                          {page.project_name ?? page.projectName}
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
                        {(page.created_at ?? page.createdAt) && (
                          <span className="text-[13px] text-[#717182] font-mono">
                            Created {new Date(page.created_at ?? page.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Preview</Button>
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
      </div>

      {selectedProof && (
        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={selectedProof} />
      )}
    </div>
  );
}
