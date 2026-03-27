import { Plus, FolderKanban, MessageSquare, Calendar, CheckCircle2, Clock, AlertCircle, Sparkles, MoreVertical, ChevronRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Link } from "react-router";
import { useState } from "react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { EmptyState } from "../components/EmptyState";

const mockProjects = [
  {
    id: "proj_1",
    name: "Mobile App Redesign",
    description: "Complete redesign of mobile experience with focus on accessibility and performance",
    status: "confirmed",
    conversationCount: 23,
    hasAssessment: true,
    createdAt: "2026-02-15T10:00:00Z",
    lastActivity: "2026-03-26T16:42:00Z",
  },
  {
    id: "proj_2",
    name: "Backend Architecture Migration",
    description: "Migrate monolith to microservices architecture with event-driven patterns",
    status: "confirmed",
    conversationCount: 18,
    hasAssessment: true,
    createdAt: "2026-01-20T14:30:00Z",
    lastActivity: "2026-03-24T14:05:00Z",
  },
  {
    id: "proj_3",
    name: "Data Pipeline Optimization",
    description: "Optimize ETL pipelines for real-time processing and cost reduction",
    status: "suggested",
    conversationCount: 12,
    hasAssessment: false,
    createdAt: "2026-03-23T10:18:00Z",
    lastActivity: "2026-03-23T10:18:00Z",
  },
  {
    id: "proj_4",
    name: "Design System Implementation",
    description: "Build and document comprehensive design system for product consistency",
    status: "confirmed",
    conversationCount: 15,
    hasAssessment: false,
    createdAt: "2026-02-01T09:00:00Z",
    lastActivity: "2026-03-20T11:30:00Z",
  },
  {
    id: "proj_5",
    name: "Customer Analytics Dashboard",
    description: "Internal analytics dashboard for customer success team",
    status: "suggested",
    conversationCount: 8,
    hasAssessment: false,
    createdAt: "2026-03-18T15:45:00Z",
    lastActivity: "2026-03-18T15:45:00Z",
  },
  {
    id: "proj_6",
    name: "API Documentation Overhaul",
    description: "Rewrite developer documentation with interactive examples",
    status: "confirmed",
    conversationCount: 11,
    hasAssessment: false,
    createdAt: "2026-01-10T13:20:00Z",
    lastActivity: "2026-03-15T09:00:00Z",
  },
  {
    id: "proj_7",
    name: "Security Audit & Remediation",
    description: "Comprehensive security review and vulnerability remediation",
    status: "confirmed",
    conversationCount: 19,
    hasAssessment: true,
    createdAt: "2026-02-28T11:00:00Z",
    lastActivity: "2026-03-22T16:30:00Z",
  },
  {
    id: "proj_8",
    name: "Machine Learning Model Training",
    description: "Train and deploy recommendation engine for personalized content",
    status: "suggested",
    conversationCount: 14,
    hasAssessment: false,
    createdAt: "2026-03-12T14:15:00Z",
    lastActivity: "2026-03-12T14:15:00Z",
  },
];

function ProjectStatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <Badge variant="secondary" className="bg-[#F5F5F7] text-[#030213] border-[rgba(0,0,0,0.08)]">
        Confirmed
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
      <Sparkles className="mr-1 h-3 w-3" />
      Suggested
    </Badge>
  );
}

export default function Projects() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const confirmedProjects = mockProjects.filter(p => p.status === "confirmed");
  const suggestedProjects = mockProjects.filter(p => p.status === "suggested");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Projects</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Organize conversations into work projects for evaluation
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
        {/* Suggested Projects Section */}
        {suggestedProjects.length > 0 && (
          <div className="mb-8">
            <Card className="border border-purple-200 bg-purple-50 shadow-sm">
              <div className="border-b border-purple-200 bg-purple-100/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-700" />
                    <h3 className="text-[15px] text-purple-900">Suggested Projects</h3>
                  </div>
                  <Badge variant="secondary" className="bg-purple-200 text-purple-900">
                    {suggestedProjects.length} new
                  </Badge>
                </div>
              </div>
              <div className="divide-y divide-purple-200">
                {suggestedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="px-6 py-4 hover:bg-purple-100/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-3">
                          <Link to={`/projects/${project.id}`} className="text-[14px] hover:underline">
                            {project.name}
                          </Link>
                          <ProjectStatusBadge status={project.status} />
                        </div>
                        <p className="mb-2 text-[13px] text-[#717182]">{project.description}</p>
                        <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                          <span>{project.conversationCount} conversations</span>
                          <span className="font-mono">
                            Created{" "}
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Confirm Project
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

        {/* Confirmed Projects */}
        <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
          <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px]">Confirmed Projects</h3>
              <span className="text-[13px] text-[#717182]">{confirmedProjects.length} total</span>
            </div>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {confirmedProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block px-6 py-5 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <FolderKanban className="h-4 w-4 text-[#717182]" />
                      <div className="text-[14px]">{project.name}</div>
                      {project.hasAssessment && (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          Assessed
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 ml-7 text-[13px] text-[#717182]">{project.description}</p>
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
                    <ChevronRight className="h-4 w-4 text-[#717182]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
      
      <CreateProjectDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}