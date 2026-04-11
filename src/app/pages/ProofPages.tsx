import { Copy, Download, Globe, Lock, MoreVertical, Share2, Eye, ExternalLink, Calendar, CheckCircle2, Sparkles, Plus, Search } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
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

const mockPublicProfiles = [
  {
    id: "user_1",
    name: "Alex Chen",
    username: "alexchen",
    tagline: "Builds systems using AI",
    level: "ADVANCED–INTERMEDIATE",
    leadership: 87,
    proofCount: 5,
    updatedAt: "2026-03-28T10:00:00Z",
  },
  {
    id: "user_2",
    name: "Sarah Miller",
    username: "sarahmiller",
    tagline: "Product designer leveraging AI",
    level: "INTERMEDIATE",
    leadership: 72,
    proofCount: 3,
    updatedAt: "2026-03-26T14:30:00Z",
  },
  {
    id: "user_3",
    name: "James Park",
    username: "jamespark",
    tagline: "Full-stack developer + AI workflows",
    level: "ADVANCED",
    leadership: 91,
    proofCount: 8,
    updatedAt: "2026-03-25T09:15:00Z",
  },
  {
    id: "user_4",
    name: "Maya Patel",
    username: "mayapatel",
    tagline: "Data analyst using AI for insights",
    level: "INTERMEDIATE",
    leadership: 68,
    proofCount: 4,
    updatedAt: "2026-03-24T16:45:00Z",
  },
  {
    id: "user_5",
    name: "David Kim",
    username: "davidkim",
    tagline: "Engineering manager scaling with AI",
    level: "ADVANCED–INTERMEDIATE",
    leadership: 84,
    proofCount: 6,
    updatedAt: "2026-03-23T11:20:00Z",
  },
];

type ViewMode = "my-proofs" | "directory";

export default function ProofPages() {
  const [viewMode, setViewMode] = useState<ViewMode>("my-proofs");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "level" | "proofs">("recent");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  const handleShare = (page: any) => {
    setSelectedProof({
      name: "Alex Chen",
      handle: "@alexchen",
      hlsScore: page.hls || 85,
      aelScore: 68,
      caiScore: page.cai || 405,
      proofUrl: `https://proofofaiwork.com/p/${page.slug}`,
      projectName: page.projectName,
      conversationCount: 127,
      date: new Date(page.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setShareDialogOpen(true);
  };

  const publishedPages = mockProofPages.filter(p => p.published);
  const draftPages = mockProofPages.filter(p => !p.published);

  const filteredProfiles = mockPublicProfiles
    .filter((profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortBy === "level") {
        return b.leadership - a.leadership;
      } else {
        return b.proofCount - a.proofCount;
      }
    });

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
                          <Badge variant="outline" className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-normal" style={{ color: 'var(--score-execution)' }}>
                            <Sparkles className="mr-1 h-2.5 w-2.5" />
                            AI-organized work
                          </Badge>
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <span className="font-mono text-[12px] text-[#717182]">
                            proofofaiwork.com/p/{page.slug}
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

            {/* Public Profiles Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredProfiles.map((profile) => (
                <Link
                  key={profile.id}
                  to={`/@${profile.username}`}
                  className="group"
                >
                  <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-all hover:border-[rgba(0,0,0,0.2)] hover:shadow-lg">
                    <div className="mb-4">
                      <h3 className="mb-1 text-lg font-medium tracking-tight group-hover:underline">
                        {profile.name}
                      </h3>
                      <p className="text-[13px] text-[#717182]">
                        @{profile.username}
                      </p>
                    </div>

                    <p className="mb-4 text-[15px] text-[#717182]">
                      {profile.tagline}
                    </p>

                    <div className="mb-4 inline-block rounded border border-[rgba(0,0,0,0.08)] bg-[#FAFAFA] px-3 py-1.5">
                      <div className="text-[10px] uppercase tracking-wider text-[#717182]">
                        Level
                      </div>
                      <div className="mt-0.5 text-[13px] font-medium">
                        {profile.level}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[rgba(0,0,0,0.06)] pt-4">
                      <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                        <span>{profile.leadership}% Leadership</span>
                        <span>•</span>
                        <span>{profile.proofCount} proofs</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#717182] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredProfiles.length === 0 && (
              <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-12 text-center">
                <p className="text-[15px] text-[#717182]">
                  No profiles found matching "{searchQuery}"
                </p>
              </Card>
            )}
          </>
        )}
      </div>

      {selectedProof && (
        <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={selectedProof} />
      )}
    </div>
  );
}