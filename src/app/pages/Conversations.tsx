import { MessageSquare, Search, Filter, Tag, Calendar, FolderKanban } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Link } from "react-router";
import { useState } from "react";

const mockConversations = [
  {
    id: "conv_1",
    title: "Mobile navigation redesign with accessibility focus",
    turnCount: 42,
    model: "Claude 3.5 Sonnet",
    project: "Mobile App Redesign",
    createdAt: "2026-03-26T09:30:00Z",
    tags: ["ui-design", "accessibility", "react"],
    preview: "I need to redesign the mobile navigation to be more accessible. The current hamburger menu doesn't work well with screen readers...",
  },
  {
    id: "conv_2",
    title: "Event-driven architecture patterns for microservices",
    turnCount: 38,
    model: "ChatGPT-4",
    project: "Backend Architecture Migration",
    createdAt: "2026-03-24T14:15:00Z",
    tags: ["architecture", "events", "kafka"],
    preview: "Can you explain the different patterns for implementing event-driven architecture in a microservices environment? I'm particularly interested in...",
  },
  {
    id: "conv_3",
    title: "Optimizing PostgreSQL queries for large datasets",
    turnCount: 27,
    model: "Claude 3.5 Sonnet",
    project: "Data Pipeline Optimization",
    createdAt: "2026-03-23T11:00:00Z",
    tags: ["database", "performance", "sql"],
    preview: "Our ETL pipeline is struggling with queries on tables with 100M+ rows. Here's the current query structure...",
  },
  {
    id: "conv_4",
    title: "Design system token architecture and naming conventions",
    turnCount: 31,
    model: "Claude 3.5 Sonnet",
    project: "Design System Implementation",
    createdAt: "2026-03-20T16:45:00Z",
    tags: ["design-tokens", "css", "documentation"],
    preview: "I'm setting up design tokens for our new design system. What's the best approach for organizing color, typography, and spacing tokens?",
  },
  {
    id: "conv_5",
    title: "Real-time analytics dashboard with WebSocket updates",
    turnCount: 19,
    model: "ChatGPT-4",
    project: "Customer Analytics Dashboard",
    createdAt: "2026-03-18T10:20:00Z",
    tags: ["websockets", "react", "analytics"],
    preview: "Building a real-time dashboard that needs to update metrics every few seconds. Should I use WebSockets, Server-Sent Events, or polling?",
  },
  {
    id: "conv_6",
    title: "Interactive API documentation with code examples",
    turnCount: 24,
    model: "Claude 3.5 Sonnet",
    project: "API Documentation Overhaul",
    createdAt: "2026-03-15T14:30:00Z",
    tags: ["documentation", "api", "developer-experience"],
    preview: "Need to create interactive API docs where developers can try endpoints directly. Looking at tools like Swagger, Redoc, or building custom...",
  },
  {
    id: "conv_7",
    title: "OAuth2 implementation security best practices",
    turnCount: 35,
    model: "Claude 3.5 Sonnet",
    project: "Security Audit & Remediation",
    createdAt: "2026-03-22T09:00:00Z",
    tags: ["security", "oauth", "authentication"],
    preview: "Implementing OAuth2 for our API. What are the current security best practices for token storage, rotation, and PKCE?",
  },
  {
    id: "conv_8",
    title: "Recommendation engine feature engineering",
    turnCount: 29,
    model: "ChatGPT-4",
    project: "Machine Learning Model Training",
    createdAt: "2026-03-12T15:45:00Z",
    tags: ["ml", "feature-engineering", "python"],
    preview: "Working on features for a content recommendation system. Have user behavior data, need to decide which features will be most predictive...",
  },
];

// Group conversations by project for AI Organized view
const groupedByProject = mockConversations.reduce((acc, conv) => {
  const project = conv.project;
  if (!acc[project]) {
    acc[project] = [];
  }
  acc[project].push(conv);
  return acc;
}, {} as Record<string, typeof mockConversations>);

export default function Conversations() {
  const [viewMode, setViewMode] = useState<"raw" | "organized">("raw");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Conversations</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                {viewMode === "raw"
                  ? "Chronological list of all conversations"
                  : "Conversations organized by AI-detected work streams"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-2 rounded-md border border-[rgba(0,0,0,0.08)] bg-white p-1">
                <Button
                  variant={viewMode === "raw" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("raw")}
                  className="h-8"
                >
                  Raw Conversations
                </Button>
                <Button
                  variant={viewMode === "organized" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("organized")}
                  className="h-8"
                >
                  AI Organized
                </Button>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Search Bar */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]" />
            <Input
              placeholder="Search conversations by content, tags, or project..."
              className="pl-10 border-none bg-transparent focus-visible:ring-0"
            />
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-[13px] text-[#717182]">
          {viewMode === "raw"
            ? `${mockConversations.length} conversations found`
            : `${Object.keys(groupedByProject).length} projects • ${mockConversations.length} conversations`}
        </div>

        {/* Raw View - Chronological list, messy inbox feel */}
        {viewMode === "raw" && (
          <div className="space-y-2">
            {mockConversations.map((conversation) => (
              <Link key={conversation.id} to={`/app/conversations/${conversation.id}`}>
                <Card className="border border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] p-4 shadow-none hover:bg-white hover:border-[rgba(0,0,0,0.12)] transition-all">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-[#C0C0C5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-start justify-between gap-4">
                        <h3 className="text-[14px] text-[#717182] line-clamp-1">{conversation.title}</h3>
                        <div className="text-[12px] text-[#C0C0C5] whitespace-nowrap font-mono">
                          {new Date(conversation.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                      <p className="mb-2 text-[13px] text-[#C0C0C5] line-clamp-1">
                        {conversation.preview}
                      </p>
                      <div className="flex items-center gap-3 text-[12px] text-[#C0C0C5]">
                        <span>{conversation.model}</span>
                        <span>•</span>
                        <span>{conversation.turnCount} turns</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* AI Organized View - Grouped by project */}
        {viewMode === "organized" && (
          <div className="space-y-6">
            {Object.entries(groupedByProject).map(([project, conversations]) => (
              <div key={project}>
                <div className="mb-3 flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" style={{ color: 'var(--score-execution)' }} />
                  <h3 className="text-[15px]">{project}</h3>
                  <span className="text-[13px] text-[#717182]">
                    → {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <Link key={conversation.id} to={`/app/conversations/${conversation.id}`}>
                      <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm hover:shadow-md transition-all">
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F5F5F7] flex-shrink-0">
                            <MessageSquare className="h-4 w-4 text-[#717182]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="mb-1 flex items-start justify-between gap-4">
                              <h3 className="text-[14px] line-clamp-1">{conversation.title}</h3>
                              <div className="text-[12px] text-[#717182] whitespace-nowrap font-mono">
                                {new Date(conversation.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                            <p className="mb-2 text-[13px] text-[#717182] line-clamp-1">
                              {conversation.preview}
                            </p>
                            <div className="flex items-center gap-3 text-[12px] text-[#717182]">
                              <span>{conversation.model}</span>
                              <span>•</span>
                              <span>{conversation.turnCount} turns</span>
                              <div className="ml-auto flex items-center gap-1.5">
                                {conversation.tags.slice(0, 2).map((tag) => (
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
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
