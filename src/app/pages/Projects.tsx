import { Plus, FolderKanban, MessageSquare, Calendar, CheckCircle2, Clock, AlertCircle, Sparkles, MoreVertical, ChevronRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";
import { useState } from "react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { EmptyState } from "../components/EmptyState";
import { PaymentModal } from "../components/PaymentModal";

const rawConversations = [
  { id: "conv_1", title: "Discussion about mobile UX patterns", timestamp: "2026-03-26T16:42:00Z" },
  { id: "conv_2", title: "Backend service architecture brainstorm", timestamp: "2026-03-26T14:20:00Z" },
  { id: "conv_3", title: "ETL pipeline performance issues", timestamp: "2026-03-25T11:30:00Z" },
  { id: "conv_4", title: "Design tokens and component library", timestamp: "2026-03-24T09:15:00Z" },
  { id: "conv_5", title: "Customer analytics requirements", timestamp: "2026-03-23T15:45:00Z" },
  { id: "conv_6", title: "API endpoint documentation review", timestamp: "2026-03-22T10:00:00Z" },
  { id: "conv_7", title: "Security vulnerability scan results", timestamp: "2026-03-21T16:30:00Z" },
  { id: "conv_8", title: "ML model training pipeline setup", timestamp: "2026-03-20T14:15:00Z" },
  { id: "conv_9", title: "Mobile app navigation refactor", timestamp: "2026-03-19T11:00:00Z" },
  { id: "conv_10", title: "Microservices event patterns", timestamp: "2026-03-18T13:45:00Z" },
];

const organizedProjects = [
  {
    id: "proj_1",
    name: "Mobile App Redesign",
    description: "Complete redesign of mobile experience with focus on accessibility and performance",
    conversationCount: 23,
    hasAssessment: true,
    createdAt: "2026-02-15T10:00:00Z",
    lastActivity: "2026-03-26T16:42:00Z",
  },
  {
    id: "proj_2",
    name: "Backend Architecture Migration",
    description: "Migrate monolith to microservices architecture with event-driven patterns",
    conversationCount: 18,
    hasAssessment: true,
    createdAt: "2026-01-20T14:30:00Z",
    lastActivity: "2026-03-24T14:05:00Z",
  },
  {
    id: "proj_3",
    name: "Data Pipeline Optimization",
    description: "Optimize ETL pipelines for real-time processing and cost reduction",
    conversationCount: 12,
    hasAssessment: false,
    createdAt: "2026-03-23T10:18:00Z",
    lastActivity: "2026-03-23T10:18:00Z",
  },
  {
    id: "proj_4",
    name: "Design System Implementation",
    description: "Build and document comprehensive design system for product consistency",
    conversationCount: 15,
    hasAssessment: false,
    createdAt: "2026-02-01T09:00:00Z",
    lastActivity: "2026-03-20T11:30:00Z",
  },
  {
    id: "proj_5",
    name: "Security Audit & Remediation",
    description: "Comprehensive security review and vulnerability remediation",
    conversationCount: 19,
    hasAssessment: true,
    createdAt: "2026-02-28T11:00:00Z",
    lastActivity: "2026-03-22T16:30:00Z",
  },
  {
    id: "proj_6",
    name: "API Documentation Overhaul",
    description: "Rewrite developer documentation with interactive examples",
    conversationCount: 11,
    hasAssessment: false,
    createdAt: "2026-01-10T13:20:00Z",
    lastActivity: "2026-03-15T09:00:00Z",
  },
];

export default function Projects() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [hasAISorted, setHasAISorted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Projects</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                {!hasAISorted
                  ? "Your conversations are uploaded but not yet organized into structured work"
                  : "AI-organized work streams based on your conversation history"}
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {!hasAISorted ? (
          <>
            {/* Raw Conversations (Pre-Sort) */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#C0C0C5]" />
                <h2 className="text-[15px] text-[#717182]">Raw Conversations (Pre-Sort)</h2>
              </div>
              <p className="mb-6 text-[13px] text-[#717182] max-w-2xl">
                These are your uploaded conversations. They are not yet organized or evaluated.
              </p>

              <Card className="border border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] shadow-none">
                <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                  {rawConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="px-6 py-3 hover:bg-white/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-[14px] text-[#717182]">{conv.title}</div>
                        </div>
                        <div className="font-mono text-[12px] text-[#C0C0C5] whitespace-nowrap">
                          {new Date(conv.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="mt-6 flex items-center justify-center">
                <Button size="lg" onClick={() => setPaymentModalOpen(true)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Run AI Sort — $7
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* AI-Organized Work (Post-Sort) */}
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--score-execution)' }} />
                <h2 className="text-[15px]">AI-Organized Work (Post-Sort)</h2>
              </div>
              <p className="mb-6 text-[13px] text-[#3A3A3A] max-w-2xl">
                Your conversations have been analyzed and grouped into real work streams.
              </p>

              <div className="space-y-4">
                {organizedProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/app/projects/${project.id}`}
                    className="block"
                  >
                    <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="px-6 py-5">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-3">
                              <FolderKanban className="h-4 w-4" style={{ color: 'var(--score-execution)' }} />
                              <div className="text-[15px]">{project.name}</div>
                              {project.hasAssessment && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                                  Assessed
                                </Badge>
                              )}
                            </div>
                            <p className="mb-3 ml-7 text-[13px] text-[#717182]">{project.description}</p>
                            <div className="ml-7 flex items-center gap-4 text-[13px] text-[#717182]">
                              <span>{project.conversationCount} conversations</span>
                              <span className="font-mono">
                                Last activity{" "}
                                {new Date(project.lastActivity).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-5 w-5 text-[#717182]" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <CreateProjectDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onComplete={() => setHasAISorted(true)}
      />
    </div>
  );
}