import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiPost, apiPatch, apiDelete } from "../lib/api";

// Auth
export const useCurrentUser = () =>
  useQuery({ queryKey: ["me"], queryFn: () => apiFetch<any>("/auth/me") });

// Pool
export const usePool = () =>
  useQuery({ queryKey: ["pool"], queryFn: () => apiFetch<any>("/pool") });

// Conversations
export const useConversations = (params?: { project_id?: string; cursor?: string }) =>
  useQuery({
    queryKey: ["conversations", params],
    queryFn: () => {
      const qs = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
      return apiFetch<any>(`/conversations${qs ? `?${qs}` : ""}`);
    },
  });

export const useConversation = (id: string) =>
  useQuery({
    queryKey: ["conversation", id],
    queryFn: () => apiFetch<any>(`/conversations/${id}`),
    enabled: !!id,
  });

// Projects
export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: () => apiFetch<any>("/projects") });

export const useProject = (id: string) =>
  useQuery({
    queryKey: ["project", id],
    queryFn: () => apiFetch<any>(`/projects/${id}`),
    enabled: !!id,
  });

// Work Profile
export const useWorkProfile = (projectId?: string) =>
  useQuery({
    queryKey: ["work-profile", projectId],
    queryFn: () =>
      apiFetch<any>(`/work-profile${projectId ? `?project_id=${projectId}` : ""}`),
    retry: false,
  });

// Assessments
export const useAssessments = () =>
  useQuery({ queryKey: ["assessments"], queryFn: () => apiFetch<any>("/assessments") });

// Proof Pages
export const useProofPages = () =>
  useQuery({ queryKey: ["proof-pages"], queryFn: () => apiFetch<any>("/proof-pages") });

// Search (POST /memory/query)
export const useMemorySearch = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (query: {
      q?: string;
      filter?: any;
      group_by?: string;
      aggregate?: string[];
      limit?: number;
    }) => apiPost<any>("/memory/query", query),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["search"] }),
  });
};

// Tags
export const useAddTag = () =>
  useMutation({
    mutationFn: ({
      uploadId,
      tag,
      turnIndex,
    }: {
      uploadId: string;
      tag: string;
      turnIndex?: number;
    }) => apiPost<any>(`/conversations/${uploadId}/tags`, { tag, turn_index: turnIndex }),
  });

export const useDeleteTag = () =>
  useMutation({
    mutationFn: ({ uploadId, tagId }: { uploadId: string; tagId: string }) =>
      apiDelete(`/conversations/${uploadId}/tags/${tagId}`),
  });

// Activity
export const useActivity = () =>
  useQuery({ queryKey: ["activity"], queryFn: () => apiFetch<any>("/activity") });

// Upload
export const usePresignUpload = () =>
  useMutation({ mutationFn: (body: any) => apiPost<any>("/uploads/presign", body) });

export const useCompleteUpload = () =>
  useMutation({ mutationFn: (body: any) => apiPost<any>("/uploads/complete", body) });

// Upload Pool (list of uploads)
export const useUploads = () =>
  useQuery({ queryKey: ["uploads"], queryFn: () => apiFetch<any>("/uploads") });

// Clustering
export const useTriggerClustering = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiPost<any>("/projects/cluster", {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

// Intake
export const useIntake = (projectId: string) =>
  useQuery({
    queryKey: ["intake", projectId],
    queryFn: () => apiFetch<any>(`/intake/${projectId}`),
    enabled: !!projectId,
    retry: false,
  });

export const useCreateIntake = () =>
  useMutation({ mutationFn: (body: any) => apiPost<any>("/intake", body) });

// Evaluate
export const useTriggerEvaluation = () =>
  useMutation({
    mutationFn: (projectId: string) =>
      apiPost<any>(`/work-profile/evaluate?project_id=${projectId}`, {}),
  });
