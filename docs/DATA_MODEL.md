# DATA_MODEL.md — 데이터 모델

---

## 개요

Supabase (PostgreSQL) 기반 데이터 모델.
Free Plan 제약 안에서 설계한다.

---

## 테이블 목록

| 테이블 | 설명 |
|-------|------|
| `users` | Supabase Auth 확장 프로필 |
| `collections` | 레퍼런스 컬렉션 |
| `references` | 레퍼런스 (핵심 테이블) |
| `tags` | 태그 목록 |
| `reference_tags` | 레퍼런스-태그 연결 |
| `content_ideas` | 콘텐츠 아이디어 |
| `content_calendar` | 콘텐츠 캘린더 항목 |
| `performance_metrics` | 콘텐츠 성과 데이터 |
| `follower_records` | 팔로워 수 기록 |

---

## 1. users

Supabase Auth의 `auth.users`를 확장하는 프로필 테이블.

```sql
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  current_followers INTEGER DEFAULT 0,
  target_followers INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 2. collections

```sql
CREATE TABLE public.collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#9FC6C8',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 3. references (핵심 테이블)

```sql
CREATE TYPE reference_status AS ENUM (
  'Saved',
  'Need Review',
  'Good Reference',
  'Adaptable',
  'Converted',
  'Used',
  'Archived',
  'Rejected'
);

CREATE TYPE content_format AS ENUM (
  'instagram_reels',
  'tiktok',
  'instagram_carousel',
  'instagram_feed',
  'instagram_story',
  'youtube_shorts',
  'article',
  'design_reference'
);

CREATE TABLE public.references (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,

  -- 기본 정보
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  platform content_format NOT NULL,
  thumbnail_url TEXT,
  status reference_status DEFAULT 'Saved' NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,

  -- 분석 메모
  memo TEXT,
  why_saved TEXT,
  good_points TEXT,
  smcc_apply TEXT,

  -- 점수 (1~10)
  brand_fit_score INTEGER CHECK (brand_fit_score BETWEEN 1 AND 10),
  cringe_risk_score INTEGER CHECK (cringe_risk_score BETWEEN 1 AND 10),
  growth_potential_score INTEGER CHECK (growth_potential_score BETWEEN 1 AND 10),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. tags

```sql
CREATE TABLE public.tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);
```

---

## 5. reference_tags

```sql
CREATE TABLE public.reference_tags (
  reference_id UUID REFERENCES public.references(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (reference_id, tag_id)
);
```

---

## 6. content_ideas

```sql
CREATE TYPE content_idea_format AS ENUM (
  'instagram_reels',
  'tiktok',
  'instagram_carousel',
  'instagram_feed',
  'instagram_story',
  'youtube_shorts'
);

CREATE TYPE idea_status AS ENUM (
  'Draft',
  'Approved',
  'Scheduled',
  'Used',
  'Archived'
);

CREATE TABLE public.content_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  reference_id UUID REFERENCES public.references(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  format content_idea_format,
  status idea_status DEFAULT 'Draft' NOT NULL,

  -- 아이디어 내용
  concept TEXT,           -- 핵심 콘셉트
  hook TEXT,              -- 첫 3초 훅
  structure TEXT,         -- 콘텐츠 구성
  caption TEXT,           -- 캡션 아이디어
  hashtags TEXT,          -- 해시태그 제안
  smcc_voice TEXT,        -- SMCC 말투/톤 제안

  -- AI 생성 여부
  is_ai_generated BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 7. content_calendar

```sql
CREATE TYPE calendar_content_status AS ENUM (
  'Draft',
  'Review',
  'Approved',
  'Scheduled',
  'Published',
  'Need Metrics',
  'Analyzed',
  'Archived'
);

CREATE TABLE public.content_calendar (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  idea_id UUID REFERENCES public.content_ideas(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  format content_idea_format,
  status calendar_content_status DEFAULT 'Draft' NOT NULL,
  scheduled_date DATE NOT NULL,

  -- 브랜드 점수 (발행 전 예상)
  brand_fit_score INTEGER CHECK (brand_fit_score BETWEEN 1 AND 10),
  cringe_risk_score INTEGER CHECK (cringe_risk_score BETWEEN 1 AND 10),

  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 8. performance_metrics

```sql
CREATE TABLE public.performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  calendar_id UUID REFERENCES public.content_calendar(id) ON DELETE SET NULL,

  title TEXT NOT NULL,               -- 콘텐츠 제목 (캘린더 연결 없을 때 수동 입력)
  format content_idea_format,
  published_date DATE NOT NULL,

  -- Meta Business Suite에서 수동 입력하는 지표
  reach INTEGER,                     -- 도달
  impressions INTEGER,               -- 노출
  likes INTEGER,                     -- 좋아요
  comments INTEGER,                  -- 댓글
  saves INTEGER,                     -- 저장
  shares INTEGER,                    -- 공유
  profile_visits INTEGER,            -- 프로필 방문
  follows_from_content INTEGER,      -- 이 콘텐츠로 인한 팔로워 증가

  -- 계산 지표 (앱에서 자동 계산)
  engagement_rate NUMERIC(5,2),      -- (좋아요+댓글+저장) / 도달 * 100

  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 9. follower_records

```sql
CREATE TABLE public.follower_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  recorded_date DATE NOT NULL,
  follower_count INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recorded_date)
);
```

---

## RLS (Row Level Security) 정책

모든 테이블에 RLS를 활성화한다.
기본 정책: 사용자는 본인 데이터만 조회/수정/삭제 가능.

```sql
-- 예시: references 테이블 RLS
ALTER TABLE public.references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own references"
  ON public.references
  FOR ALL
  USING (auth.uid() = user_id);
```

모든 테이블에 동일한 패턴으로 적용.

---

## 인덱스

```sql
-- 자주 사용되는 조회 최적화
CREATE INDEX idx_references_user_id ON public.references(user_id);
CREATE INDEX idx_references_status ON public.references(status);
CREATE INDEX idx_references_platform ON public.references(platform);
CREATE INDEX idx_references_collection_id ON public.references(collection_id);
CREATE INDEX idx_references_is_favorite ON public.references(is_favorite);
CREATE INDEX idx_content_calendar_scheduled_date ON public.content_calendar(scheduled_date);
CREATE INDEX idx_performance_metrics_published_date ON public.performance_metrics(published_date);
CREATE INDEX idx_follower_records_recorded_date ON public.follower_records(recorded_date);
```

---

## TypeScript 타입 정의 예시

```typescript
// src/types/index.ts

export type ContentFormat =
  | 'instagram_reels'
  | 'tiktok'
  | 'instagram_carousel'
  | 'instagram_feed'
  | 'instagram_story'
  | 'youtube_shorts'
  | 'article'
  | 'design_reference';

export type ReferenceStatus =
  | 'Saved'
  | 'Need Review'
  | 'Good Reference'
  | 'Adaptable'
  | 'Converted'
  | 'Used'
  | 'Archived'
  | 'Rejected';

export type ContentStatus =
  | 'Draft'
  | 'Review'
  | 'Approved'
  | 'Scheduled'
  | 'Published'
  | 'Need Metrics'
  | 'Analyzed'
  | 'Archived';

export interface Reference {
  id: string;
  user_id: string;
  collection_id?: string;
  url: string;
  title: string;
  platform: ContentFormat;
  thumbnail_url?: string;
  status: ReferenceStatus;
  is_favorite: boolean;
  memo?: string;
  why_saved?: string;
  good_points?: string;
  smcc_apply?: string;
  brand_fit_score?: number;
  cringe_risk_score?: number;
  growth_potential_score?: number;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  collection?: Collection;
}
```
