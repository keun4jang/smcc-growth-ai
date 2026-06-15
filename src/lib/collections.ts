import { supabase } from './supabase'
import type { ReferenceCollection } from '@/types'

export async function getCollections(userId: string): Promise<ReferenceCollection[]> {
  const { data, error } = await supabase
    .from('reference_collections')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as ReferenceCollection[]
}

export async function createCollection(
  userId: string,
  input: { name: string; description?: string; color?: string }
): Promise<ReferenceCollection> {
  const { data, error } = await supabase
    .from('reference_collections')
    .insert({ user_id: userId, ...input })
    .select()
    .single()

  if (error) throw error
  return data as ReferenceCollection
}

export async function updateCollection(
  id: string,
  input: { name?: string; description?: string; color?: string }
): Promise<ReferenceCollection> {
  const { data, error } = await supabase
    .from('reference_collections')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as ReferenceCollection
}

export async function deleteCollection(id: string): Promise<void> {
  const { error } = await supabase
    .from('reference_collections')
    .delete()
    .eq('id', id)

  if (error) throw error
}
