// ─── SMCC Program Type ───────────────────────────────────────────

export type ProgramType =
  | 'daily_coffee_chat'
  | 'espresso_run'
  | 'book_dive'
  | 'morning_rave'
  | 'smcc_talk'
  | 'smcc_cinema'
  | 'breakfast'
  | 'sunrise_meetup'
  | 'travel_trip'
  | 'wellness_class'
  | 'global_meetup'
  | 'brand_collaboration'
  | 'community_event'
  | 'corporate_wellness'
  | 'other'

export const PROGRAM_LABELS: Record<ProgramType, string> = {
  daily_coffee_chat: 'Daily Coffee Chat',
  espresso_run: 'Espresso Run',
  book_dive: 'Book Dive',
  morning_rave: 'Morning Rave',
  smcc_talk: 'SMCC Talk',
  smcc_cinema: 'SMCC Cinema',
  breakfast: 'Breakfast',
  sunrise_meetup: 'Sunrise Meetup',
  travel_trip: 'Travel Trip',
  wellness_class: 'Wellness Class',
  global_meetup: 'Global Meetup',
  brand_collaboration: 'Brand Collaboration',
  community_event: 'Community Event',
  corporate_wellness: 'Corporate Wellness',
  other: 'Other',
}

export const PROGRAM_LIST = Object.keys(PROGRAM_LABELS) as ProgramType[]

// ─── Platform / Format ───────────────────────────────────────────

export type PlatformType =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'pinterest'
  | 'website'
  | 'other'

export type ContentFormatType =
  | 'reels'
  | 'shorts'
  | 'carousel'
  | 'feed_image'
  | 'story'
  | 'video'
  | 'article'
  | 'design'

export type ReferenceStatus =
  | 'Saved'
  | 'Need Review'
  | 'Good Reference'
  | 'Adaptable'
  | 'Converted'
  | 'Used'
  | 'Archived'
  | 'Rejected'

export type ContentStatus =
  | 'Draft'
  | 'Review'
  | 'Approved'
  | 'Scheduled'
  | 'Published'
  | 'Need Metrics'
  | 'Analyzed'
  | 'Archived'

export type IdeaStatus = 'Draft' | 'Approved' | 'Scheduled' | 'Used' | 'Archived'

// ─── Profile ─────────────────────────────────────────────────────

export interface Profile {
  id: string
  name: string | null
  current_followers: number
  target_followers: number
  created_at: string
  updated_at: string
}

// ─── Collection ───────────────────────────────────────────────────

export interface ReferenceCollection {
  id: string
  user_id: string
  name: string
  description: string | null
  color: string
  created_at: string
  updated_at: string
}

// ─── SavedReference ───────────────────────────────────────────────

export interface SavedReference {
  id: string
  user_id: string
  collection_id: string | null
  url: string
  title: string
  platform: PlatformType
  content_format: ContentFormatType
  program_type: ProgramType
  thumbnail_url: string | null
  status: ReferenceStatus
  is_favorite: boolean
  tags: string[]
  memo: string | null
  why_saved: string | null
  good_points: string | null
  smcc_apply: string | null
  brand_fit_score: number
  cringe_risk_score: number
  growth_potential_score: number
  created_at: string
  updated_at: string
  collection?: ReferenceCollection | null
}

export interface CreateReferenceInput {
  url: string
  title: string
  platform: PlatformType
  content_format: ContentFormatType
  program_type?: ProgramType
  collection_id?: string | null
  tags?: string[]
  thumbnail_url?: string | null
  brand_fit_score?: number
  cringe_risk_score?: number
  growth_potential_score?: number
  memo?: string | null
  why_saved?: string | null
  good_points?: string | null
  smcc_apply?: string | null
}

export interface UpdateReferenceInput {
  title?: string
  platform?: PlatformType
  content_format?: ContentFormatType
  program_type?: ProgramType
  collection_id?: string | null
  thumbnail_url?: string | null
  status?: ReferenceStatus
  is_favorite?: boolean
  tags?: string[]
  memo?: string | null
  why_saved?: string | null
  good_points?: string | null
  smcc_apply?: string | null
  brand_fit_score?: number
  cringe_risk_score?: number
  growth_potential_score?: number
}

export interface ReferenceFilters {
  search?: string
  platform?: PlatformType | ''
  status?: ReferenceStatus | ''
  is_favorite?: boolean
  collection_id?: string | ''
  sort?: 'newest' | 'oldest' | 'brand_fit' | 'growth'
}

// ─── Content Idea ─────────────────────────────────────────────────

export interface ContentIdea {
  id: string
  user_id: string
  reference_id: string | null
  title: string
  format: ContentFormatType | null
  status: IdeaStatus
  concept: string | null
  hook: string | null
  structure: string | null
  caption: string | null
  hashtags: string | null
  smcc_voice: string | null
  is_ai_generated: boolean
  created_at: string
  updated_at: string
}

// ─── Calendar ─────────────────────────────────────────────────────

export interface CalendarContent {
  id: string
  user_id: string
  idea_id: string | null
  title: string
  format: ContentFormatType | null
  status: ContentStatus
  scheduled_date: string
  brand_fit_score: number | null
  cringe_risk_score: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── Label Maps ───────────────────────────────────────────────────

export const PLATFORM_LABELS: Record<PlatformType, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  pinterest: 'Pinterest',
  website: 'Website',
  other: 'Other',
}

export const FORMAT_LABELS: Record<ContentFormatType, string> = {
  reels: 'Reels',
  shorts: 'Shorts',
  carousel: 'Carousel',
  feed_image: 'Feed Image',
  story: 'Story',
  video: 'Video',
  article: 'Article',
  design: 'Design',
}

export const PLATFORM_FORMATS: Record<PlatformType, ContentFormatType[]> = {
  instagram: ['reels', 'carousel', 'feed_image', 'story'],
  tiktok: ['reels', 'video'],
  youtube: ['shorts', 'video'],
  pinterest: ['feed_image', 'design'],
  website: ['article'],
  other: ['video', 'article', 'design'],
}

export const REFERENCE_STATUS_LIST: ReferenceStatus[] = [
  'Saved', 'Need Review', 'Good Reference', 'Adaptable',
  'Converted', 'Used', 'Archived', 'Rejected',
]

export const CONTENT_STATUS_LIST: ContentStatus[] = [
  'Draft', 'Review', 'Approved', 'Scheduled',
  'Published', 'Need Metrics', 'Analyzed', 'Archived',
]
