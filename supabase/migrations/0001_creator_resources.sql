-- Creator Resources (Resource Hub)
-- 제작 리소스(효과음/BGM/플러그인/템플릿/스톡/폰트/아이콘 등) 저장용 신규 테이블.
-- 기존 saved_references(Reference Library)와 분리해서 운영한다.

CREATE TYPE resource_category AS ENUM (
  'sound_effects',
  'music_bgm',
  'video_plugins',
  'video_templates',
  'stock_video',
  'stock_photo',
  'design_resources',
  'fonts',
  'icons',
  'mockups',
  'textures',
  'sns_templates',
  'editing_tools',
  'ai_tools',
  'production_checklist',
  'platform_specs',
  'inspiration_reference',
  'legal_license',
  'other'
);

CREATE TYPE resource_verification_status AS ENUM (
  'unchecked',
  'usable',
  'license_caution',
  'not_recommended'
);

CREATE TABLE public.creator_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category resource_category NOT NULL DEFAULT 'other',
  description TEXT,
  platform_or_tool TEXT,
  use_case TEXT,

  is_free BOOLEAN DEFAULT TRUE NOT NULL,
  is_commercial_use_allowed BOOLEAN,
  attribution_required BOOLEAN,
  license_note TEXT,

  tags TEXT[] DEFAULT '{}' NOT NULL,
  memo TEXT,
  smcc_use_case TEXT,
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,

  verification_status resource_verification_status DEFAULT 'unchecked' NOT NULL,
  last_checked_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX creator_resources_user_id_idx ON public.creator_resources(user_id);
CREATE INDEX creator_resources_category_idx ON public.creator_resources(category);

-- updated_at 자동 갱신
CREATE OR REPLACE FUNCTION public.set_creator_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER creator_resources_set_updated_at
  BEFORE UPDATE ON public.creator_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.set_creator_resources_updated_at();

-- RLS: 본인 데이터만 접근 가능
ALTER TABLE public.creator_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "creator_resources_select_own"
  ON public.creator_resources FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "creator_resources_insert_own"
  ON public.creator_resources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "creator_resources_update_own"
  ON public.creator_resources FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "creator_resources_delete_own"
  ON public.creator_resources FOR DELETE
  USING (auth.uid() = user_id);
