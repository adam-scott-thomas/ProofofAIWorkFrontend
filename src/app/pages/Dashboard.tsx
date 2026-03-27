import { ArrowRight, TrendingUp, Clock, MessageSquare, FolderKanban, CheckCircle2, AlertCircle, Sparkles, Upload, Share2, Webhook, FileText, ClipboardList, Globe } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router";
import { useState } from "react";
import { ShareDialog } from "../components/ShareDialog";

// Mock data based on API endpoints
const mockUser = {
  name: "Alex Chen",
  email: "alex@example.com",
  handle: "@alexchen",
};

const mockWorkProfile = {
  human_leadership_score: 87,
  ai_execution_load: 0.68,
  cai: 4.37,
  confidence: "high" as const,
  archetype: {
    primary: "Architect",
    secondary: "Explorer",
  },
  narrative: "You maintain strong strategic control while effectively delegating execution to AI. Your work demonstrates sophisticated architectural thinking with systematic cognitive amplification through AI collaboration.",
};

const mockStats = {
  conversations: 127,
  projects: 8,
  assessments: 3,
  publishedProofs: 5,
  disputes: 2,
  webhooks: 1,
};

const mockActivity = [
  { id: 1, action: "Assessment completed", detail: "Q1 2026 Product Work", timestamp: "2026-03-27T09:15:00Z" },
  { id: 2, action: "Project confirmed", detail: "Mobile App Redesign", timestamp: "2026-03-26T16:42:00Z" },
  { id: 3, action: "Conversations uploaded", detail: "14 new conversations parsed", timestamp: "2026-03-25T11:20:00Z" },
  { id: 4, action: "Proof page published", detail: "Backend Architecture Migration", timestamp: "2026-03-24T14:05:00Z" },
  { id: 5, action: "Project created", detail: "Data Pipeline Optimization", timestamp: "2026-03-23T10:18:00Z" },
];

function formatRelativeTime(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function Dashboard() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const shareData = {
    name: "Alex Chen",
    handle: "@alexchen",
    hlsScore: 87,
    aelScore: 68,
    caiScore: 4.37,
    proofUrl: "https://proofofaiwork.com/p/alexchen-q1-2026",
    conversationCount: 127,
    date: "Mar 27, 2026",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Dashboard</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Welcome back, {mockUser.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <AlertCircle className="mr-2 h-4 w-4" />
                Disputes
                {mockStats.disputes > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 px-1.5">
                    {mockStats.disputes}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Webhook className="mr-2 h-4 w-4" />
                System
                {mockStats.webhooks > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {mockStats.webhooks}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* AI Work Profile Hero Card */}
        <Card className="mb-8 border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-[15px]">Your AI Work Profile</h2>
              <p className="text-[13px] text-[#717182]">
                Last updated Mar 27, 2026 • 127 conversations analyzed
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Three Scores */}
          <div className="grid grid-cols-3 gap-8">
            <div className="border-r border-[rgba(0,0,0,0.06)] pr-8">
              <div className="mb-2 text-[13px] text-[#717182]">Human Leadership</div>
              <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-hls)' }}>
                {mockWorkProfile.human_leadership_score}%
              </div>
              <div className="text-[13px] text-[#717182]">leadership score</div>
            </div>

            <div className="border-r border-[rgba(0,0,0,0.06)] pr-8">
              <div className="mb-2 text-[13px] text-[#717182]">AI Execution Load</div>
              <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-execution)' }}>
                {(mockWorkProfile.ai_execution_load * 100).toFixed(0)}%
              </div>
              <div className="text-[13px] text-[#717182]">delegation rate</div>
            </div>

            <div>
              <div className="mb-2 text-[13px] text-[#717182]">Cognitive Amplification</div>
              <div className="mb-1 text-6xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-cai)' }}>
                {mockWorkProfile.cai}x
              </div>
              <div className="text-[13px] text-[#717182]">capacity multiplier</div>
            </div>
          </div>

          {/* Archetype */}
          <div className="mb-6 flex items-center gap-3 border-t border-[rgba(0,0,0,0.06)] pt-6">
            <div className="text-[13px] uppercase tracking-wider text-[#717182]">Archetype</div>
            <div className="rounded-sm bg-[#F5F5F7] px-3 py-1.5 font-mono text-[13px] tracking-tight">
              {mockWorkProfile.archetype.primary}
            </div>
            <div className="rounded-sm bg-[#F5F5F7] px-3 py-1.5 font-mono text-[13px] tracking-tight text-[#717182]">
              {mockWorkProfile.archetype.secondary}
            </div>
          </div>

          {/* Narrative */}
          <div className="border-t border-[rgba(0,0,0,0.06)] pt-6">
            <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">
              Interpretation
            </div>
            <p className="leading-relaxed text-[#3A3A3A]">
              {mockWorkProfile.narrative}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6 border-t border-[rgba(0,0,0,0.06)] pt-6">
            <Button size="sm">View Full Work Profile</Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F5F7]">
                <Upload className="h-4 w-4 text-[#717182]" />
              </div>
            </div>
            <div className="mb-1 text-3xl tracking-tight">{mockStats.conversations}</div>
            <div className="text-[13px] text-[#717182]">Conversations</div>
          </Card>

          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F5F7]">
                <FileText className="h-4 w-4 text-[#717182]" />
              </div>
            </div>
            <div className="mb-1 text-3xl tracking-tight">{mockStats.projects}</div>
            <div className="text-[13px] text-[#717182]">Projects</div>
          </Card>

          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F5F7]">
                <ClipboardList className="h-4 w-4 text-[#717182]" />
              </div>
            </div>
            <div className="mb-1 text-3xl tracking-tight">{mockStats.assessments}</div>
            <div className="text-[13px] text-[#717182]">Assessments</div>
          </Card>

          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F5F7]">
                <Globe className="h-4 w-4 text-[#717182]" />
              </div>
            </div>
            <div className="mb-1 text-3xl tracking-tight">{mockStats.publishedProofs}</div>
            <div className="text-[13px] text-[#717182]">Published Proofs</div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Activity Feed */}
          <Card className="col-span-2 border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
            <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
              <h3 className="text-[15px]">Recent Activity</h3>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {mockActivity.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-[#FAFAFA] transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-0.5 text-[14px]">{item.action}</div>
                      <div className="text-[13px] text-[#717182]">{item.detail}</div>
                    </div>
                    <div className="font-mono text-[12px] text-[#717182] whitespace-nowrap">
                      {formatRelativeTime(item.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgba(0,0,0,0.06)] px-6 py-3">
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
            <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
              <h3 className="text-[15px]">Quick Actions</h3>
            </div>
            <div className="space-y-2 p-4">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Conversations
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Create Project
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <ClipboardList className="mr-2 h-4 w-4" />
                Run Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Globe className="mr-2 h-4 w-4" />
                Publish Proof Page
              </Button>
            </div>
            <div className="border-t border-[rgba(0,0,0,0.06)] p-4">
              <Button className="w-full" size="sm">
                View Upload Pool
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <ShareDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen} data={shareData} />
    </div>
  );
}