// ─── 공통 열거형 ────────────────────────────────────────────────

export type ContentFormat =
  | 'instagram_reels'
  | 'tiktok'
  | 'instagram_carousel'
  | 'instagram_feed'
  | 'instagram_story'
  | 'youtube_shorts'
  | 'article'
  | 'design_reference'

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

// ─── 유저 ────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  name: string | null
  avatar_url: string | null
  current_followers: number
  target_followers: number
  created_at: string
  updated_at: string
}

// ─── 컬렉션 ──────────────────────────────────────────────────────

export interface Collection {
  id: string
  user_id: string
  name: string
  description: string | null
  color: string
  created_at: string
  updated_at: string
}

// ─── 태그 ────────────────────────────────────────────────────────

export interface Tag {
  id: string
  user_id: string
  name: string
  created_at: string
}

// ─── 레퍼런스 ────────────────────────────────────────────────────

export interface Reference {
  id: string
  user_id: string
  collection_id: string | null
  url: string
  title: string
  platform: ContentFormat
  thumbnail_url: string | null
  status: ReferenceStatus
  is_favorite: boolean
  memo: string | null
  why_saved: string | null
  good_points: string | null
  smcc_apply: string | null
  brand_fit_score: number | null
  cringe_risk_score: number | null
  growth_potential_score: number | null
  created_at: string
  updated_at: string
  tags?: Tag[]
  collection?: Collection | null
}

// ─── 콘텐츠 아이디어 ──────────────────────────────────────────────

export interface ContentIdea {
  id: string
  user_id: string
  reference_id: string | null
  title: string
  format: ContentFormat | null
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

// ─── 콘텐츠 캘린더 ────────────────────────────────────────────────

export interface CalendarContent {
  id: string
  user_id: string
  idea_id: string | null
  title: string
  format: ContentFormat | null
  status: ContentStatus
  scheduled_date: string
  brand_fit_score: number | null
  cringe_risk_score: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── 성과 데이터 ──────────────────────────────────────────────────

export interface PerformanceMetric {
  id: string
  user_id: string
  calendar_id: string | null
  title: string
  format: ContentFormat | null
  published_date: string
  reach: number | null
  impressions: number | null
  likes: number | null
  comments: number | null
  saves: number | null
  shares: number | null
  profile_visits: number | null
  follows_from_content: number | null
  engagement_rate: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── 팔로워 기록 ──────────────────────────────────────────────────

export interface FollowerRecord {
  id: string
  user_id: string
  recorded_date: string
  follower_count: number
  note: string | null
  created_at: string
}

// ─── UI 유틸 타입 ─────────────────────────────────────────────────

export interface ScoreSet {
  brand_fit_score: number | null
  cringe_risk_score: number | null
  growth_potential_score: number | null
}

export const CONTENT_FORMAT_LABELS: Record<ContentFormat, string> = {
  instagram_reels: 'Instagram Reels',
  tiktok: 'TikTok',
  instagram_carousel: 'Instagram Carousel',
  instagram_feed: 'Instagram Feed',
  instagram_story: 'Instagram Story',
  youtube_shorts: 'YouTube Shorts',
  article: 'Article / Website',
  design_reference: 'Design Reference',
}

export const REFERENCE_STATUS_LIST: ReferenceStatus[] = [
  'Saved',
  'Need Review',
  'Good Reference',
  'Adaptable',
  'Converted',
  'Used',
  'Archived',
  'Rejected',
]

export const CONTENT_STATUS_LIST: ContentStatus[] = [
  'Draft',
  'Review',
  'Approved',
  'Scheduled',
  'Published',
  'Need Metrics',
  'Analyzed',
  'Archived',
]
