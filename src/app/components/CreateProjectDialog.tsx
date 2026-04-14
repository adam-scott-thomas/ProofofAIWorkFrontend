import { useState } from "react";
import { useNavigate } from "react-router";
import { FolderKanban, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useCreateProject } from "../../hooks/useApi";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    createProject.mutate(
      { title: name.trim(), description: description.trim() || undefined },
      {
        onSuccess: (data: any) => {
          toast.success("Project created");
          setName("");
          setDescription("");
          onOpenChange(false);
          // Navigate to the new project detail page if we got an id back
          const newId = data?.id ?? data?.project_id;
          if (newId) {
            navigate(`/app/projects/${newId}`);
          }
        },
        onError: (err: any) => {
          toast.error(err?.message ?? "Failed to create project");
        },
      },
    );
  };

  const loading = createProject.isPending;

  return (
    <Dialog open={open} onOpenChange={(o) => !loading && onOpenChange(o)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Projects help you organize related conversations and track work over time.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="e.g. Mobile App Redesign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
              disabled={loading}
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              placeholder="Brief description of the project goals"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5"
              disabled={loading}
            />
          </div>
          {createProject.isError && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-[13px] text-red-700">
              {(createProject.error as Error)?.message ?? "Failed to create project"}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading || !name.trim()}>
            {loading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
