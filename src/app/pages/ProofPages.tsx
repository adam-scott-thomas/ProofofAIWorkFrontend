import { Copy, Download, Globe, Lock, MoreVertical, Share2, Eye, ExternalLink, Calendar, CheckCircle2, Sparkles, Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";
import { useState } from "react";
import { ShareDialog } from "../components/ShareDialog";

const mockProofPages = [
  {
    id: "proof_1",
    projectId: "proj_2",
    projectName: "Backend Architecture Migration",
    slug: "backend-arch-migration-alex-chen",
    published: true,
    publishedAt: "2026-03-24T14:05:00Z",
    views: 142,
    cai: 456,
    hls: 89,
    createdAt: "2026-03-24T13:30:00Z",
  },
  {
    id: "proof_2",
    projectId: "proj_1",
    projectName: "Mobile App Redesign",
    slug: "mobile-redesign-2026",
    published: true,
    publishedAt: "2026-03-20T10:15:00Z",
    views: 87,
    cai: 421,
    hls: 85,
    createdAt: "2026-03-20T09:45:00Z",
  },
  {
    id: "proof_3",
    projectId: "proj_7",
    projectName: "Security Audit & Remediation",
    slug: "security-audit-q1-2026",
    published: true,
    publishedAt: "2026-03-18T16:30:00Z",
    views: 203,
    cai: 448,
    hls: 91,
    createdAt: "2026-03-18T15:00:00Z",
  },
  {
    id: "proof_4",
    projectId: "proj_4",
    projectName: "Design System Implementation",
    slug: "design-system-proof",
    published: false,
    views: 0,
    cai: 398,
    hls: 82,
    createdAt: "2026-03-15T11:20:00Z",
  },
  {
    id: "proof_5",
    projectId: "proj_6",
    projectName: "API Documentation Overhaul",
    slug: "api-docs-rewrite",
    published: false,
    views: 0,
    cai: 412,
    hls: 84,
    createdAt: "2026-03-10T14:00:00Z",
  },
];

export default function ProofPages() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const handleShare = (page: any) => {
    setSelectedProof({
      name: "Alex Chen",
      handle: "@alexchen",
      hlsScore: page.hls || 85,
      aelScore: 68,
      caiScore: page.cai || 405,
      proofUrl: `https://poaw.io/p/${page.slug}`,
      projectName: page.projectName,
      conversationCount: 127,
      date: new Date(page.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setShareDialogOpen(true);
  };

  const publishedPages = mockProofPages.filter(p => p.published);
  const draftPages = mockProofPages.filter(p => !p.published);

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
            <div className="mt-1 text-2xl tracking-tight">{mockProofPages.length}</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="text-[13px] text-[#717182]">Published</div>
            <div className="mt-1 text-2xl tracking-tight">{publishedPages.length}</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="text-[13px] text-[#717182]">Total Views</div>
            <div className="mt-1 text-2xl tracking-tight">
              {mockProofPages.reduce((sum, p) => sum + p.views, 0)}
            </div>
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
                {publishedPages.map((page) => (
                  <div key={page.id} className="px-6 py-5 hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <Link to={`/proof-pages/${page.id}`} className="text-[14px] hover:underline">
                            {page.projectName}
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
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                            <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>
                              {page.cai}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                            <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>
                              {page.hls}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[13px] text-[#717182]">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{page.views} views</span>
                          </div>
                          <span className="text-[13px] text-[#717182] font-mono">
                            Published {new Date(page.publishedAt!).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
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
              {draftPages.map((page) => (
                <div key={page.id} className="px-6 py-5 hover:bg-[#FAFAFA] transition-colors">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Link to={`/proof-pages/${page.id}`} className="text-[14px] hover:underline">
                          {page.projectName}
                        </Link>
                        <Badge variant="secondary" className="bg-[#F5F5F7] text-[#717182]">
                          Draft
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                          <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>
                            {page.cai}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                          <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>
                            {page.hls}
                          </span>
                        </div>
                        <span className="text-[13px] text-[#717182] font-mono">
                          Created {new Date(page.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
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
      </div>
      
      {selectedProof && (
        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={selectedProof} />
      )}
    </div>
  );
}