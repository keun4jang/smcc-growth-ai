import { supabase } from './supabase'
import type {
  CreatorResource,
  CreateResourceInput,
  UpdateResourceInput,
  ResourceFilters,
} from '@/types'

export async function getResources(
  userId: string,
  filters: ResourceFilters = {}
): Promise<CreatorResource[]> {
  let query = supabase
    .from('creator_resources')
    .select('*')
    .eq('user_id', userId)

  if (filters.category) query = query.eq('category', filters.category)
  if (filters.is_favorite) query = query.eq('is_favorite', true)
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,use_case.ilike.%${filters.search}%,memo.ilike.%${filters.search}%`
    )
  }

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as CreatorResource[]
}

export async function createResource(
  userId: string,
  input: CreateResourceInput
): Promise<CreatorResource> {
  const { data, error } = await supabase
    .from('creator_resources')
    .insert({
      user_id: userId,
      title: input.title,
      url: input.url,
      category: input.category,
      description: input.description ?? null,
      platform_or_tool: input.platform_or_tool ?? null,
      use_case: input.use_case ?? null,
      is_free: input.is_free ?? true,
      is_commercial_use_allowed: input.is_commercial_use_allowed ?? null,
      attribution_required: input.attribution_required ?? null,
      license_note: input.license_note ?? null,
      tags: input.tags ?? [],
      memo: input.memo ?? null,
      smcc_use_case: input.smcc_use_case ?? null,
      verification_status: input.verification_status ?? 'unchecked',
    })
    .select('*')
    .single()

  if (error) throw error
  return data as CreatorResource
}

export async function updateResource(
  id: string,
  input: UpdateResourceInput
): Promise<CreatorResource> {
  const { data, error } = await supabase
    .from('creator_resources')
    .update(input)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as CreatorResource
}

export async function deleteResource(id: string): Promise<void> {
  const { error } = await supabase
    .from('creator_resources')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleResourceFavorite(
  id: string,
  current: boolean
): Promise<void> {
  const { error } = await supabase
    .from('creator_resources')
    .update({ is_favorite: !current })
    .eq('id', id)

  if (error) throw error
}
