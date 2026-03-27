import { 
  ArrowLeft, 
  FolderKanban, 
  MessageSquare, 
  GitBranch, 
  Shield, 
  Eye, 
  EyeOff,
  Settings,
  Play,
  Trash2,
  MoreVertical
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link, useParams } from "react-router";

const mockProjectDetail = {
  id: "proj_1",
  name: "Mobile App Redesign",
  description: "Complete redesign of mobile experience with focus on accessibility and performance",
  status: "confirmed",
  conversationCount: 23,
  hasAssessment: true,
  createdAt: "2026-02-15T10:00:00Z",
  lastActivity: "2026-03-26T16:42:00Z",
  conversations: [
    {
      id: "conv_1",
      title: "Mobile navigation redesign with accessibility focus",
      turnCount: 42,
      model: "Claude 3.5 Sonnet",
      createdAt: "2026-03-26T09:30:00Z",
      tags: ["ui-design", "accessibility", "react"],
    },
    {
      id: "conv_5",
      title: "Touch target sizing and responsive breakpoints",
      turnCount: 28,
      model: "ChatGPT-4",
      createdAt: "2026-03-24T14:15:00Z",
      tags: ["ui-design", "responsive"],
    },
    {
      id: "conv_9",
      title: "Animation performance on low-end devices",
      turnCount: 31,
      model: "Claude 3.5 Sonnet",
      createdAt: "2026-03-22T10:00:00Z",
      tags: ["performance", "animation"],
    },
  ],
  repos: [
    {
      id: "repo_1",
      url: "https://github.com/acme/mobile-app",
      branch: "feature/redesign",
      commits: 47,
      addedAt: "2026-02-20T11:00:00Z",
    },
  ],
  masks: [
    {
      id: "mask_1",
      pattern: "api_key_*",
      type: "redaction",
      createdAt: "2026-02-15T10:30:00Z",
    },
    {
      id: "mask_2",
      pattern: "user_email",
      type: "redaction",
      createdAt: "2026-02-15T10:30:00Z",
    },
  ],
  workProfile: {
    cai: 421,
    hls: 85,
    ai_execution_load: 0.64,
  },
};

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="mb-4">
            <Link to="/projects">
              <Button variant="ghost" size="sm" className="-ml-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <FolderKanban className="h-5 w-5 text-[#717182]" />
                <h1 className="text-xl tracking-tight">{mockProjectDetail.name}</h1>
                {mockProjectDetail.hasAssessment && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    Assessed
                  </Badge>
                )}
              </div>
              <p className="mb-3 text-[14px] text-[#717182]">{mockProjectDetail.description}</p>
              <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                <span>{mockProjectDetail.conversationCount} conversations</span>
                <span className="font-mono">
                  Created {new Date(mockProjectDetail.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="font-mono">
                  Last activity {new Date(mockProjectDetail.lastActivity).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Run Assessment
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Work Profile Scores (if assessed) */}
        {mockProjectDetail.hasAssessment && (
          <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
            <div className="mb-4 text-[13px] uppercase tracking-wider text-[#717182]">
              Project Work Profile
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="border-r border-[rgba(0,0,0,0.06)] pr-8">
                <div className="mb-1 text-[13px] text-[#717182]">Human Leadership</div>
                <div className="text-5xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-hls)' }}>
                  {mockProjectDetail.workProfile.hls}
                </div>
              </div>
              <div className="border-r border-[rgba(0,0,0,0.06)] pr-8">
                <div className="mb-1 text-[13px] text-[#717182]">AI Execution Load</div>
                <div className="text-5xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-execution)' }}>
                  {(mockProjectDetail.workProfile.ai_execution_load * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="mb-1 text-[13px] text-[#717182]">Cognitive Amplification Index</div>
                <div className="text-5xl tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--score-cai)' }}>
                  {mockProjectDetail.workProfile.cai}
                </div>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="conversations">
              <MessageSquare className="mr-2 h-4 w-4" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="repos">
              <GitBranch className="mr-2 h-4 w-4" />
              Repositories
            </TabsTrigger>
            <TabsTrigger value="censorship">
              <Shield className="mr-2 h-4 w-4" />
              Censorship
            </TabsTrigger>
          </TabsList>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="space-y-4">
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
              <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px]">Project Conversations</h3>
                  <Button variant="outline" size="sm">
                    Add Conversation
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {mockProjectDetail.conversations.map((conv) => (
                  <Link
                    key={conv.id}
                    to={`/conversations/${conv.id}`}
                    className="block px-6 py-5 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-1 text-[14px]">{conv.title}</div>
                        <div className="mb-2 flex items-center gap-4 text-[13px] text-[#717182]">
                          <span>{conv.turnCount} turns</span>
                          <span>{conv.model}</span>
                          <span className="font-mono">
                            {new Date(conv.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {conv.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-mono"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Repositories Tab */}
          <TabsContent value="repos" className="space-y-4">
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
              <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px]">Attached Repositories</h3>
                  <Button variant="outline" size="sm">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Attach Repository
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {mockProjectDetail.repos.map((repo) => (
                  <div key={repo.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <GitBranch className="h-4 w-4 text-[#717182]" />
                          <span className="font-mono text-[14px]">{repo.url}</span>
                        </div>
                        <div className="ml-7 flex items-center gap-4 text-[13px] text-[#717182]">
                          <span>Branch: {repo.branch}</span>
                          <span>{repo.commits} commits analyzed</span>
                          <span className="font-mono">
                            Added {new Date(repo.addedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Correlations
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-blue-200 bg-blue-50 p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 flex-shrink-0">
                  <GitBranch className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-[15px] text-blue-900">Repository Correlation</h3>
                  <p className="text-[13px] text-blue-800">
                    Attached repositories are analyzed to correlate code commits with conversation timestamps,
                    providing evidence of conversation-to-output validation.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Censorship Tab */}
          <TabsContent value="censorship" className="space-y-4">
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
              <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px]">Censorship Masks</h3>
                  <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Add Mask
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {mockProjectDetail.masks.map((mask) => (
                  <div key={mask.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <Shield className="h-4 w-4 text-[#717182]" />
                          <span className="font-mono text-[14px]">{mask.pattern}</span>
                          <Badge variant="secondary" className="bg-[#F5F5F7]">
                            {mask.type}
                          </Badge>
                        </div>
                        <div className="ml-7 text-[13px] text-[#717182] font-mono">
                          Created {new Date(mask.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 flex-shrink-0">
                  <Shield className="h-5 w-5 text-amber-700" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-[15px] text-amber-900">Content Masking</h3>
                  <p className="text-[13px] text-amber-800">
                    Masks allow you to redact sensitive information (API keys, credentials, proprietary data)
                    before generating proof pages. Patterns use regex syntax. Preview censored content before publishing.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview Censored Content
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}