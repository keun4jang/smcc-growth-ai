import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCollections, createCollection, updateCollection, deleteCollection } from '@/lib/collections'
import { useAuthStore } from '@/store/authStore'

const QUERY_KEY = 'collections'

export function useCollections() {
  const userId = useAuthStore((s) => s.user?.id)

  return useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => getCollections(userId!),
    enabled: !!userId,
  })
}

export function useCreateCollection() {
  const queryClient = useQueryClient()
  const userId = useAuthStore((s) => s.user?.id)

  return useMutation({
    mutationFn: (input: { name: string; description?: string; color?: string }) =>
      createCollection(userId!, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: { name?: string; description?: string; color?: string } }) =>
      updateCollection(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCollection(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
