import { TrendingUp, Search, ExternalLink } from "lucide-react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useState } from "react";

// Mock data
const mockLeaderboard = [
  {
    rank: 1,
    name: "James Park",
    username: "jamespark",
    tagline: "Full-stack developer + AI workflows",
    level: "ADVANCED",
    leadership: 91,
    aiExecution: 76,
    amplification: 5.2,
    proofCount: 8,
    conversationCount: 234,
  },
  {
    rank: 2,
    name: "Alex Chen",
    username: "alexchen",
    tagline: "Builds systems using AI",
    level: "ADVANCED–INTERMEDIATE",
    leadership: 87,
    aiExecution: 68,
    amplification: 4.37,
    proofCount: 5,
    conversationCount: 127,
  },
  {
    rank: 3,
    name: "David Kim",
    username: "davidkim",
    tagline: "Engineering manager scaling with AI",
    level: "ADVANCED–INTERMEDIATE",
    leadership: 84,
    aiExecution: 72,
    amplification: 4.8,
    proofCount: 6,
    conversationCount: 189,
  },
  {
    rank: 4,
    name: "Sarah Miller",
    username: "sarahmiller",
    tagline: "Product designer leveraging AI",
    level: "INTERMEDIATE",
    leadership: 72,
    aiExecution: 64,
    amplification: 3.9,
    proofCount: 3,
    conversationCount: 98,
  },
  {
    rank: 5,
    name: "Maya Patel",
    username: "mayapatel",
    tagline: "Data analyst using AI for insights",
    level: "INTERMEDIATE",
    leadership: 68,
    aiExecution: 59,
    amplification: 3.2,
    proofCount: 4,
    conversationCount: 112,
  },
];

type SortBy = "leadership" | "amplification" | "proofs" | "recent";

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("leadership");

  const filteredAndSorted = mockLeaderboard
    .filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "leadership") return b.leadership - a.leadership;
      if (sortBy === "amplification") return b.amplification - a.amplification;
      if (sortBy === "proofs") return b.proofCount - a.proofCount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="mx-auto max-w-5xl px-8 py-12">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-4xl tracking-tight">Leaderboard</h1>
          </div>
          <p className="text-xl text-[#717182]">
            Top AI operators ranked by leadership, amplification, and proof
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#717182]" />
            <Input
              placeholder="Search operators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-11 text-[15px]"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="h-12 rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[15px] outline-none focus:border-[rgba(0,0,0,0.2)]"
          >
            <option value="leadership">By Leadership</option>
            <option value="amplification">By Amplification</option>
            <option value="proofs">By Proofs</option>
          </select>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {filteredAndSorted.map((profile) => (
            <Link
              key={profile.username}
              to={`/@${profile.username}`}
              className="group block"
            >
              <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-6 transition-all hover:border-[rgba(0,0,0,0.2)] hover:shadow-lg">
                <div className="flex items-start gap-6">
                  {/* Rank */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAFAFA]">
                    <span className="text-xl font-medium tracking-tight">
                      {profile.rank}
                    </span>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-1 text-xl font-medium tracking-tight group-hover:underline">
                          {profile.name}
                        </h3>
                        <p className="mb-2 text-[13px] text-[#717182]">
                          @{profile.username}
                        </p>
                        <p className="text-[15px] text-[#717182]">
                          {profile.tagline}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 shrink-0 text-[#717182] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>

                    {/* Level Badge */}
                    <div className="mb-4 inline-block rounded border border-[rgba(0,0,0,0.08)] bg-[#FAFAFA] px-3 py-1.5">
                      <div className="text-[10px] uppercase tracking-wider text-[#717182]">
                        Level
                      </div>
                      <div className="mt-0.5 text-[13px] font-medium">
                        {profile.level}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 border-t border-[rgba(0,0,0,0.06)] pt-4">
                      <div>
                        <div className="mb-1 text-2xl tracking-tight">
                          {profile.leadership}%
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                          Leadership
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl tracking-tight">
                          {profile.aiExecution}%
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                          AI Execution
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl tracking-tight">
                          {profile.amplification}x
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                          Amplification
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl tracking-tight">
                          {profile.proofCount}
                        </div>
                        <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                          Proofs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-16 text-center">
            <p className="text-lg text-[#717182]">
              No operators found matching "{searchQuery}"
            </p>
          </Card>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-[15px] text-[#717182]">
            Want to see your profile here?
          </p>
          <Link
            to="/upload"
            className="inline-block text-[15px] text-[#030213] underline underline-offset-4 hover:text-[#717182]"
          >
            Upload your conversations →
          </Link>
        </div>
      </div>
    </div>
  );
}
