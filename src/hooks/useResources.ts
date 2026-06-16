import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  toggleResourceFavorite,
} from '@/lib/resources'
import type { CreateResourceInput, UpdateResourceInput, ResourceFilters } from '@/types'
import { useAuthStore } from '@/store/authStore'

const QUERY_KEY = 'creator_resources'

export function useResources(filters: ResourceFilters = {}) {
  const userId = useAuthStore((s) => s.user?.id)

  return useQuery({
    queryKey: [QUERY_KEY, userId, filters],
    queryFn: () => getResources(userId!, filters),
    enabled: !!userId,
  })
}

export function useCreateResource() {
  const queryClient = useQueryClient()
  const userId = useAuthStore((s) => s.user?.id)

  return useMutation({
    mutationFn: (input: CreateResourceInput) => createResource(userId!, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateResource() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateResourceInput }) =>
      updateResource(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteResource() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useToggleResourceFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, current }: { id: string; current: boolean }) =>
      toggleResourceFavorite(id, current),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
