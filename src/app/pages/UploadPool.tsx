import { Upload, Inbox, MessageSquare, AlertCircle, CheckCircle2, Clock, X, FolderKanban, Download, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router";
import { useState } from "react";
import { UploadDialog } from "../components/UploadDialog";

const mockUploads = [
  {
    id: "upl_1",
    filename: "claude-conversations-march-2026.zip",
    status: "completed",
    conversationCount: 47,
    uploadedAt: "2026-03-26T14:30:00Z",
    size: "2.4 MB",
  },
  {
    id: "upl_2",
    filename: "chatgpt-export-q1-2026.json",
    status: "completed",
    conversationCount: 38,
    uploadedAt: "2026-03-20T09:15:00Z",
    size: "1.8 MB",
  },
  {
    id: "upl_3",
    filename: "gemini-conversations-feb.zip",
    status: "parsing",
    conversationCount: 0,
    uploadedAt: "2026-03-27T10:00:00Z",
    size: "3.1 MB",
    progress: 67,
  },
  {
    id: "upl_4",
    filename: "perplexity-export-2026.json",
    status: "completed",
    conversationCount: 22,
    uploadedAt: "2026-03-15T16:45:00Z",
    size: "890 KB",
  },
  {
    id: "upl_5",
    filename: "claude-jan-feb-2026.zip",
    status: "error",
    conversationCount: 0,
    uploadedAt: "2026-03-10T11:20:00Z",
    size: "4.2 MB",
    error: "Invalid JSON format in conversation_3.json",
  },
];

const mockStats = {
  totalConversations: 107,
  unassigned: 42,
  suggestedProjects: 3,
};

function StatusBadge({ status, progress }: { status: string; progress?: number }) {
  if (status === "completed") {
    return (
      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        Completed
      </Badge>
    );
  }
  if (status === "parsing") {
    return (
      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock className="mr-1 h-3 w-3" />
        Parsing {progress}%
      </Badge>
    );
  }
  if (status === "error") {
    return (
      <Badge variant="destructive">
        <AlertCircle className="mr-1 h-3 w-3" />
        Error
      </Badge>
    );
  }
  return null;
}

export default function UploadPool() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl tracking-tight">Upload Pool</h1>
              <p className="mt-1 text-[13px] text-[#717182]">
                Imported conversations awaiting project assignment
              </p>
            </div>
            <Button onClick={() => setUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Conversations
            </Button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Stats Bar */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm">
            <div className="text-[13px] text-[#717182]">Total Conversations</div>
            <div className="mt-1 text-2xl tracking-tight">{mockStats.totalConversations}</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm">
            <div className="text-[13px] text-[#717182]">Unassigned</div>
            <div className="mt-1 text-2xl tracking-tight">{mockStats.unassigned}</div>
          </Card>
          <Card className="border border-[rgba(0,0,0,0.08)] bg-white p-4 shadow-sm">
            <div className="text-[13px] text-[#717182]">Suggested Projects</div>
            <div className="mt-1 text-2xl tracking-tight">{mockStats.suggestedProjects}</div>
          </Card>
        </div>

        {/* Clustering Actions */}
        <Card className="mb-6 border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="mb-1 text-[15px]">Organize Conversations</h3>
            <p className="text-[13px] text-[#717182]">
              Cluster conversations into projects using rule-based or AI-powered analysis
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              Free Clustering
              <span className="ml-2 text-[11px] text-[#717182]">Rule-based</span>
            </Button>
            <Button>
              AI Clustering
              <span className="ml-2 text-[11px]">$7</span>
            </Button>
          </div>
        </Card>

        {/* Uploads List */}
        <Card className="border border-[rgba(0,0,0,0.08)] bg-white shadow-sm">
          <div className="border-b border-[rgba(0,0,0,0.06)] px-6 py-4">
            <h3 className="text-[15px]">Upload History</h3>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)]">
            {mockUploads.map((upload) => (
              <div key={upload.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="text-[14px]">{upload.filename}</div>
                      <StatusBadge status={upload.status} progress={upload.progress} />
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                      <span className="font-mono">{upload.size}</span>
                      {upload.conversationCount > 0 && (
                        <span>{upload.conversationCount} conversations</span>
                      )}
                      <span>
                        {new Date(upload.uploadedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {upload.status === "parsing" && upload.progress && (
                      <div className="mt-3">
                        <Progress value={upload.progress} className="h-1.5" />
                      </div>
                    )}
                    {upload.status === "error" && upload.error && (
                      <div className="mt-2 rounded-sm bg-red-50 px-3 py-2 text-[13px] text-red-800">
                        {upload.error}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {upload.status === "completed" && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                    {upload.status === "error" && (
                      <Button variant="outline" size="sm">
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <UploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
    </div>
  );
}