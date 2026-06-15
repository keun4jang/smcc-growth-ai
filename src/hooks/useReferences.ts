import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
  toggleFavorite,
} from '@/lib/references'
import type { CreateReferenceInput, UpdateReferenceInput, ReferenceFilters } from '@/types'
import { useAuthStore } from '@/store/authStore'

const QUERY_KEY = 'references'

export function useReferences(filters: ReferenceFilters = {}) {
  const userId = useAuthStore((s) => s.user?.id)

  return useQuery({
    queryKey: [QUERY_KEY, userId, filters],
    queryFn: () => getReferences(userId!, filters),
    enabled: !!userId,
  })
}

export function useReference(id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getReferenceById(id!),
    enabled: !!id,
  })
}

export function useCreateReference() {
  const queryClient = useQueryClient()
  const userId = useAuthStore((s) => s.user?.id)

  return useMutation({
    mutationFn: (input: CreateReferenceInput) => createReference(userId!, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateReference() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateReferenceInput }) =>
      updateReference(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteReference() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteReference(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, current }: { id: string; current: boolean }) =>
      toggleFavorite(id, current),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
