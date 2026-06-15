import { supabase } from './supabase'
import type {
  SavedReference,
  CreateReferenceInput,
  UpdateReferenceInput,
  ReferenceFilters,
} from '@/types'

export async function getReferences(
  userId: string,
  filters: ReferenceFilters = {}
): Promise<SavedReference[]> {
  let query = supabase
    .from('saved_references')
    .select('*')
    .eq('user_id', userId)

  if (filters.platform) query = query.eq('platform', filters.platform)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.is_favorite) query = query.eq('is_favorite', true)
  if (filters.collection_id) query = query.eq('collection_id', filters.collection_id)
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,memo.ilike.%${filters.search}%,why_saved.ilike.%${filters.search}%,good_points.ilike.%${filters.search}%`
    )
  }

  switch (filters.sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    case 'brand_fit':
      query = query.order('brand_fit_score', { ascending: false })
      break
    case 'growth':
      query = query.order('growth_potential_score', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as SavedReference[]
}

export async function getReferenceById(id: string): Promise<SavedReference | null> {
  const { data, error } = await supabase
    .from('saved_references')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as SavedReference | null
}

export async function createReference(
  userId: string,
  input: CreateReferenceInput
): Promise<SavedReference> {
  const { data, error } = await supabase
    .from('saved_references')
    .insert({
      user_id: userId,
      url: input.url,
      title: input.title,
      platform: input.platform,
      content_format: input.content_format,
      collection_id: input.collection_id ?? null,
      tags: input.tags ?? [],
      thumbnail_url: input.thumbnail_url ?? null,
      brand_fit_score: input.brand_fit_score ?? 50,
      cringe_risk_score: input.cringe_risk_score ?? 50,
      growth_potential_score: input.growth_potential_score ?? 50,
    })
    .select('*')
    .single()

  if (error) throw error
  return data as SavedReference
}

export async function updateReference(
  id: string,
  input: UpdateReferenceInput
): Promise<SavedReference> {
  const { data, error } = await supabase
    .from('saved_references')
    .update(input)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data as SavedReference
}

export async function deleteReference(id: string): Promise<void> {
  const { error } = await supabase
    .from('saved_references')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleFavorite(
  id: string,
  current: boolean
): Promise<void> {
  const { error } = await supabase
    .from('saved_references')
    .update({ is_favorite: !current })
    .eq('id', id)

  if (error) throw error
}
