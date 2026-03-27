import { Plus, FolderKanban, Sparkles, ChevronRight, MoreVertical } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router";
import { useState } from "react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { useProjects } from "../../hooks/useApi";

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
  const { data, isLoading, isError } = useProjects();

  const allProjects: any[] = Array.isArray(data) ? data : (data?.items ?? []);
  const confirmedProjects = allProjects.filter(p => p.status === "confirmed");
  const suggestedProjects = allProjects.filter(p => p.status === "suggested");

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
        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center text-[13px] text-[#717182]">
            Loading projects...
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-[13px] text-red-800">Failed to load projects. Check your connection and try again.</p>
          </Card>
        )}

        {/* Empty state */}
        {!isLoading && !isError && allProjects.length === 0 && (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-8 shadow-sm text-center">
            <FolderKanban className="mx-auto mb-3 h-8 w-8 text-[#717182]" />
            <p className="text-[14px]">No projects yet</p>
            <p className="mt-1 mb-4 text-[13px] text-[#717182]">
              Upload conversations and cluster them into projects to get started.
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>Create Project</Button>
          </Card>
        )}

        {/* Suggested Projects Section */}
        {!isLoading && !isError && suggestedProjects.length > 0 && (
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
                {suggestedProjects.map((project: any) => (
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
                        {project.description && (
                          <p className="mb-2 text-[13px] text-[#717182]">{project.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                          {project.conversation_count != null && (
                            <span>{project.conversation_count} conversations</span>
                          )}
                          <span className="font-mono">
                            Created{" "}
                            {new Date(project.created_at ?? project.createdAt).toLocaleDateString('en-US', {
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
        {!isLoading && !isError && confirmedProjects.length > 0 && (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
            <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px]">Confirmed Projects</h3>
                <span className="text-[13px] text-[#717182]">{confirmedProjects.length} total</span>
              </div>
            </div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {confirmedProjects.map((project: any) => (
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
                        {project.has_assessment && (
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            Assessed
                          </Badge>
                        )}
                      </div>
                      {project.description && (
                        <p className="mb-2 ml-7 text-[13px] text-[#717182]">{project.description}</p>
                      )}
                      <div className="ml-7 flex items-center gap-4 text-[13px] text-[#717182]">
                        {project.conversation_count != null && (
                          <span>{project.conversation_count} conversations</span>
                        )}
                        {(project.last_activity ?? project.lastActivity) && (
                          <span className="font-mono">
                            Last activity{" "}
                            {new Date(project.last_activity ?? project.lastActivity).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
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
        )}
      </div>

      <CreateProjectDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}
