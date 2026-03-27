import { ClipboardList, Plus, ChevronRight, Clock, CheckCircle2, XCircle, RotateCw } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useAssessments } from "../../hooks/useApi";

function StatusBadge({ status, progress }: { status: string; progress?: number }) {
  if (status === "completed") {
    return (
      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Completed
      </Badge>
    );
  }
  if (status === "running") {
    return (
      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock className="mr-1 h-3 w-3" />
        Running {progress}%
      </Badge>
    );
  }
  if (status === "failed") {
    return (
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3 w-3" />
        Failed
      </Badge>
    );
  }
  return null;
}

export default function Assessments() {
  const { data, isLoading, isError } = useAssessments();

  const assessments: any[] = Array.isArray(data) ? data : (data?.items ?? []);
  const completedCount = assessments.filter(a => a.status === "completed").length;
  const runningCount = assessments.filter(a => a.status === "running").length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Assessments</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Run forensic evaluations to generate AI Work Profile scores
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Info Card */}
        <Card className="mb-6 border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 flex-shrink-0">
              <ClipboardList className="h-5 w-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-[15px] text-blue-900">How Assessments Work</h3>
              <p className="text-[13px] text-blue-800">
                Assessments analyze your AI conversations to compute HLS (Human Leadership Score), AI Execution Load,
                and CAI (Cognitive Amplification Index). Each assessment requires completed projects with ship proof
                for accurate measurement. Results are used to generate proof pages and portfolios.
              </p>
            </div>
          </div>
        </Card>

        {/* Loading */}
        {isLoading && (
          <div className="py-12 text-center text-[13px] text-[#717182]">
            Loading assessments...
          </div>
        )}

        {/* Error */}
        {isError && (
          <Card className="border border-red-200 bg-red-50 p-6 shadow-sm">
            <p className="text-[13px] text-red-800">Failed to load assessments.</p>
          </Card>
        )}

        {/* Assessments List */}
        {!isLoading && !isError && (
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
            <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px]">Assessment History</h3>
                <span className="text-[13px] text-[#717182]">{assessments.length} total</span>
              </div>
            </div>
            {assessments.length === 0 ? (
              <div className="px-6 py-8 text-center text-[13px] text-[#717182]">
                No assessments yet. Create your first assessment to measure your AI work profile.
              </div>
            ) : (
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {assessments.map((assessment: any) => (
                  <div key={assessment.id} className="px-6 py-5 hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="text-[14px]">{assessment.name}</div>
                          <StatusBadge status={assessment.status} progress={assessment.progress} />
                        </div>

                        <div className="mb-2 flex items-center gap-4 text-[13px] text-[#717182]">
                          {assessment.project_count != null && (
                            <span>{assessment.project_count} projects</span>
                          )}
                          {assessment.conversation_count != null && (
                            <span>{assessment.conversation_count} conversations</span>
                          )}
                          {(assessment.created_at ?? assessment.createdAt) && (
                            <span className="font-mono">
                              Created {new Date(assessment.created_at ?? assessment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          )}
                        </div>

                        {assessment.status === "running" && assessment.progress != null && (
                          <div className="mb-2">
                            <Progress value={assessment.progress} className="h-1.5" />
                          </div>
                        )}

                        {assessment.status === "completed" && (
                          <div className="flex items-center gap-4">
                            {assessment.cai != null && (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] uppercase tracking-wider text-[#717182]">CAI</span>
                                <span className="font-mono text-[15px]" style={{ color: 'var(--score-cai)' }}>
                                  {assessment.cai}
                                </span>
                              </div>
                            )}
                            {assessment.hls != null && (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] uppercase tracking-wider text-[#717182]">HLS</span>
                                <span className="font-mono text-[15px]" style={{ color: 'var(--score-hls)' }}>
                                  {assessment.hls}
                                </span>
                              </div>
                            )}
                            {(assessment.completed_at ?? assessment.completedAt) && (
                              <span className="text-[13px] text-[#717182] font-mono">
                                Completed {new Date(assessment.completed_at ?? assessment.completedAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            )}
                          </div>
                        )}

                        {assessment.status === "failed" && assessment.error && (
                          <div className="rounded-sm bg-red-50 px-3 py-2 text-[13px] text-red-800">
                            {assessment.error}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {assessment.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">View Results</Button>
                            <Button variant="ghost" size="sm">
                              <RotateCw className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {assessment.status === "failed" && (
                          <Button variant="outline" size="sm">
                            <RotateCw className="mr-2 h-4 w-4" />
                            Retry
                          </Button>
                        )}
                        {assessment.status === "running" && (
                          <Button variant="ghost" size="sm" disabled>
                            <Clock className="h-4 w-4 animate-spin" />
                          </Button>
                        )}
                        <ChevronRight className="h-4 w-4 text-[#717182]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Stats Cards */}
        {!isLoading && !isError && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
              <div className="text-[13px] text-[#717182]">Total Assessments</div>
              <div className="mt-1 text-2xl tracking-tight">{assessments.length}</div>
            </Card>
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
              <div className="text-[13px] text-[#717182]">Completed</div>
              <div className="mt-1 text-2xl tracking-tight">{completedCount}</div>
            </Card>
            <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-sm">
              <div className="text-[13px] text-[#717182]">Running</div>
              <div className="mt-1 text-2xl tracking-tight">{runningCount}</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
