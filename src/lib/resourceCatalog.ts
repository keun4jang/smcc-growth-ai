import type { ResourceCategory } from '@/types'

export interface CatalogResource {
  title: string
  url: string
  category: ResourceCategory
  description: string
  is_free: boolean
  tags: string[]
}

// 큐레이션된 무료/프리미엄 제작 리소스 카탈로그.
// 실제 라이선스 조건은 카드와 저장 시 항상 "사이트에서 최종 확인 필요"로 표시한다.
export const RESOURCE_CATALOG: CatalogResource[] = [
  // ─── sound_effects ───
  { title: 'Pixabay Sound Effects', url: 'https://pixabay.com/sound-effects/', category: 'sound_effects', description: '무료 효과음 라이브러리.', is_free: true, tags: ['효과음'] },
  { title: 'Freesound', url: 'https://freesound.org/', category: 'sound_effects', description: '커뮤니티 기반 무료 효과음 아카이브.', is_free: true, tags: ['효과음'] },
  { title: 'Zapsplat', url: 'https://www.zapsplat.com/', category: 'sound_effects', description: '무료/유료 효과음 및 음악, 가입 후 다운로드.', is_free: true, tags: ['효과음'] },
  { title: 'Mixkit Sound Effects', url: 'https://mixkit.co/free-sound-effects/', category: 'sound_effects', description: '무료 효과음 모음.', is_free: true, tags: ['효과음'] },
  { title: 'BBC Sound Effects', url: 'https://sound-effects.bbcrewind.co.uk/', category: 'sound_effects', description: 'BBC 아카이브의 방대한 효과음 라이브러리.', is_free: true, tags: ['효과음'] },
  { title: 'SoundBible', url: 'https://soundbible.com/', category: 'sound_effects', description: '무료 효과음 다운로드 사이트.', is_free: true, tags: ['효과음'] },
  { title: '99Sounds', url: 'https://99sounds.org/', category: 'sound_effects', description: '무료 샘플팩/효과음 모음.', is_free: true, tags: ['효과음'] },

  // ─── music_bgm ───
  { title: 'Uppbeat', url: 'https://uppbeat.io/', category: 'music_bgm', description: '크리에이터용 무료/구독형 BGM.', is_free: true, tags: ['BGM'] },
  { title: 'Pixabay Music', url: 'https://pixabay.com/music/', category: 'music_bgm', description: '무료 음악 라이브러리.', is_free: true, tags: ['BGM'] },
  { title: 'YouTube Audio Library', url: 'https://www.youtube.com/audiolibrary', category: 'music_bgm', description: '유튜브 제공 무료 음악/효과음.', is_free: true, tags: ['BGM'] },
  { title: 'Free Music Archive', url: 'https://freemusicarchive.org/', category: 'music_bgm', description: '다양한 라이선스의 무료 음악 아카이브.', is_free: true, tags: ['BGM'] },
  { title: 'Bensound', url: 'https://www.bensound.com/', category: 'music_bgm', description: '무료/유료 로열티프리 음악.', is_free: true, tags: ['BGM'] },
  { title: 'Incompetech', url: 'https://incompetech.com/music/royalty-free/', category: 'music_bgm', description: 'Kevin MacLeod의 로열티프리 음악.', is_free: true, tags: ['BGM'] },
  { title: 'Chosic', url: 'https://www.chosic.com/free-music/all/', category: 'music_bgm', description: '무료 배경음악 다운로드.', is_free: true, tags: ['BGM'] },

  // ─── video_plugins ───
  { title: 'AEJuice Free Plugins', url: 'https://aejuice.com/free-plugins/', category: 'video_plugins', description: 'After Effects용 무료 플러그인 모음.', is_free: true, tags: ['플러그인', 'AE'] },
  { title: 'Mister Horse Animation Composer', url: 'https://misterhorse.com/animation-composer', category: 'video_plugins', description: '무료 애니메이션 프리셋 플러그인(AE).', is_free: true, tags: ['플러그인', 'AE'] },
  { title: 'ProductionCrate', url: 'https://www.productioncrate.com/', category: 'video_plugins', description: 'VFX/SFX 에셋 및 플러그인.', is_free: false, tags: ['플러그인', 'VFX'] },
  { title: 'RocketStock Free', url: 'https://www.rocketstock.com/free-after-effects-templates/', category: 'video_plugins', description: '무료 AE 템플릿/플러그인 모음.', is_free: true, tags: ['플러그인', 'AE'] },
  { title: 'Motion Array Free', url: 'https://motionarray.com/browse/free-assets/', category: 'video_plugins', description: '무료 영상 에셋/플러그인 카테고리.', is_free: true, tags: ['플러그인'] },

  // ─── video_templates ───
  { title: 'Mixkit Templates', url: 'https://mixkit.co/free-premiere-pro-templates/', category: 'video_templates', description: '무료 프리미어 프로 템플릿.', is_free: true, tags: ['영상템플릿'] },
  { title: 'Videvo Templates', url: 'https://www.videvo.net/free-after-effects-templates/', category: 'video_templates', description: '무료 AE/프리미어 템플릿.', is_free: true, tags: ['영상템플릿'] },
  { title: 'Canva Video Templates', url: 'https://www.canva.com/video-editor/templates/', category: 'video_templates', description: '무료/프로 영상 템플릿.', is_free: true, tags: ['영상템플릿'] },
  { title: 'CapCut Templates', url: 'https://www.capcut.com/templates', category: 'video_templates', description: '숏폼 영상 템플릿 모음.', is_free: true, tags: ['영상템플릿', '숏폼'] },
  { title: 'Motion Array Free Templates', url: 'https://motionarray.com/browse/free-templates/', category: 'video_templates', description: '무료 영상 템플릿 카테고리.', is_free: true, tags: ['영상템플릿'] },

  // ─── stock_video ───
  { title: 'Pexels Videos', url: 'https://www.pexels.com/videos/', category: 'stock_video', description: '무료 스톡 영상.', is_free: true, tags: ['스톡영상'] },
  { title: 'Pixabay Videos', url: 'https://pixabay.com/videos/', category: 'stock_video', description: '무료 스톡 영상 라이브러리.', is_free: true, tags: ['스톡영상'] },
  { title: 'Mixkit Videos', url: 'https://mixkit.co/free-stock-video/', category: 'stock_video', description: '무료 스톡 영상 클립.', is_free: true, tags: ['스톡영상'] },
  { title: 'Coverr', url: 'https://coverr.co/', category: 'stock_video', description: '무료 배경 영상 클립.', is_free: true, tags: ['스톡영상'] },
  { title: 'Videvo', url: 'https://www.videvo.net/', category: 'stock_video', description: '무료/유료 스톡 영상.', is_free: true, tags: ['스톡영상'] },

  // ─── stock_photo ───
  { title: 'Pexels', url: 'https://www.pexels.com/', category: 'stock_photo', description: '무료 스톡 사진.', is_free: true, tags: ['스톡사진'] },
  { title: 'Pixabay', url: 'https://pixabay.com/', category: 'stock_photo', description: '무료 이미지/일러스트/영상.', is_free: true, tags: ['스톡사진'] },
  { title: 'Unsplash', url: 'https://unsplash.com/', category: 'stock_photo', description: '고품질 무료 사진 라이브러리.', is_free: true, tags: ['스톡사진'] },
  { title: 'Burst by Shopify', url: 'https://burst.shopify.com/', category: 'stock_photo', description: '무료 비즈니스용 스톡 사진.', is_free: true, tags: ['스톡사진'] },
  { title: 'StockSnap', url: 'https://stocksnap.io/', category: 'stock_photo', description: '무료 고해상도 스톡 사진.', is_free: true, tags: ['스톡사진'] },

  // ─── design_resources ───
  { title: 'Free Design Resources', url: 'https://freedesignresources.net/', category: 'design_resources', description: '무료 디자인 리소스 모음.', is_free: true, tags: ['디자인'] },
  { title: 'Freepik', url: 'https://www.freepik.com/', category: 'design_resources', description: '벡터/PSD/일러스트 등 디자인 리소스(프리미엄 혼합).', is_free: true, tags: ['디자인'] },
  { title: 'Figma Community', url: 'https://www.figma.com/community', category: 'design_resources', description: '무료 Figma 템플릿/UI 키트.', is_free: true, tags: ['디자인'] },
  { title: 'Canva Templates', url: 'https://www.canva.com/templates/', category: 'design_resources', description: '다양한 무료 디자인 템플릿.', is_free: true, tags: ['디자인'] },

  // ─── fonts ───
  { title: 'Google Fonts', url: 'https://fonts.google.com/', category: 'fonts', description: '무료 오픈소스 폰트 라이브러리.', is_free: true, tags: ['폰트'] },
  { title: 'Noonnu (눈누)', url: 'https://noonnu.cc/', category: 'fonts', description: '한글 무료 폰트 모음 사이트.', is_free: true, tags: ['폰트', '한글'] },
  { title: 'DaFont', url: 'https://www.dafont.com/', category: 'fonts', description: '무료 폰트 다운로드 사이트.', is_free: true, tags: ['폰트'] },
  { title: 'Font Squirrel', url: 'https://www.fontsquirrel.com/', category: 'fonts', description: '상업적 사용 가능 무료 폰트 큐레이션.', is_free: true, tags: ['폰트'] },
  { title: '1001 Fonts', url: 'https://www.1001fonts.com/', category: 'fonts', description: '무료 폰트 모음.', is_free: true, tags: ['폰트'] },

  // ─── icons ───
  { title: 'Flaticon', url: 'https://www.flaticon.com/', category: 'icons', description: '무료/프리미엄 아이콘 라이브러리.', is_free: true, tags: ['아이콘'] },
  { title: 'Icons8', url: 'https://icons8.com/icons', category: 'icons', description: '무료 아이콘/일러스트.', is_free: true, tags: ['아이콘'] },
  { title: 'The Noun Project', url: 'https://thenounproject.com/', category: 'icons', description: '심플한 아이콘 라이브러리.', is_free: true, tags: ['아이콘'] },
  { title: 'Feather Icons', url: 'https://feathericons.com/', category: 'icons', description: '오픈소스 라인 아이콘 세트.', is_free: true, tags: ['아이콘'] },
  { title: 'Font Awesome', url: 'https://fontawesome.com/icons', category: 'icons', description: '무료/프로 아이콘 폰트 세트.', is_free: true, tags: ['아이콘'] },

  // ─── mockups ───
  { title: 'Pixelbuddha', url: 'https://pixelbuddha.net/', category: 'mockups', description: '무료 목업/디자인 자료.', is_free: true, tags: ['목업'] },
  { title: 'Mockup World', url: 'https://www.mockupworld.co/', category: 'mockups', description: '무료 목업 PSD 모음.', is_free: true, tags: ['목업'] },
  { title: 'Smartmockups', url: 'https://smartmockups.com/', category: 'mockups', description: '온라인 목업 생성 도구(무료 플랜 있음).', is_free: true, tags: ['목업'] },
  { title: 'Graphic Burger', url: 'https://graphicburger.com/', category: 'mockups', description: '무료 목업/UI 리소스.', is_free: true, tags: ['목업'] },

  // ─── textures ───
  { title: 'Textures.com', url: 'https://www.textures.com/', category: 'textures', description: '텍스처 라이브러리(무료 가입 다운로드 제한 있음).', is_free: true, tags: ['텍스처'] },
  { title: 'Lost and Taken', url: 'https://www.lostandtaken.com/', category: 'textures', description: '무료 고해상도 텍스처.', is_free: true, tags: ['텍스처'] },
  { title: 'Subtle Patterns (via ToptalDesigner)', url: 'https://www.toptal.com/designers/subtlepatterns/', category: 'textures', description: '무료 배경 패턴/텍스처.', is_free: true, tags: ['텍스처', '패턴'] },
  { title: 'Pixabay Textures', url: 'https://pixabay.com/images/search/texture/', category: 'textures', description: '무료 텍스처 이미지 검색.', is_free: true, tags: ['텍스처'] },

  // ─── sns_templates ───
  { title: 'Canva SNS Templates', url: 'https://www.canva.com/social-media/templates/', category: 'sns_templates', description: 'Instagram/Reels 등 SNS 템플릿.', is_free: true, tags: ['SNS템플릿'] },
  { title: 'VistaCreate', url: 'https://create.vista.com/', category: 'sns_templates', description: '무료 SNS 콘텐츠 템플릿 도구.', is_free: true, tags: ['SNS템플릿'] },
  { title: 'Adobe Express Templates', url: 'https://www.adobe.com/express/templates', category: 'sns_templates', description: 'Adobe의 무료 SNS 템플릿.', is_free: true, tags: ['SNS템플릿'] },
  { title: 'Mojo App', url: 'https://mojo.video/', category: 'sns_templates', description: 'Stories/Reels 애니메이션 템플릿 앱.', is_free: true, tags: ['SNS템플릿', 'Stories'] },

  // ─── editing_tools ───
  { title: 'CapCut', url: 'https://www.capcut.com/', category: 'editing_tools', description: '무료 숏폼 영상 편집 도구.', is_free: true, tags: ['편집도구'] },
  { title: 'DaVinci Resolve', url: 'https://www.blackmagicdesign.com/products/davinciresolve', category: 'editing_tools', description: '무료 프로급 영상 편집 소프트웨어.', is_free: true, tags: ['편집도구'] },
  { title: 'VN Video Editor', url: 'https://vn.video/', category: 'editing_tools', description: '모바일 무료 영상 편집 앱.', is_free: true, tags: ['편집도구', '모바일'] },
  { title: 'Photopea', url: 'https://www.photopea.com/', category: 'editing_tools', description: '브라우저 기반 무료 포토샵 대체 도구.', is_free: true, tags: ['편집도구', '이미지'] },

  // ─── ai_tools ───
  { title: 'ChatGPT', url: 'https://chat.openai.com/', category: 'ai_tools', description: '카피/스크립트 작성용 AI 어시스턴트(무료 플랜 있음).', is_free: true, tags: ['AI도구'] },
  { title: 'Canva AI 도구', url: 'https://www.canva.com/ai-image-generator/', category: 'ai_tools', description: 'Canva 내 AI 이미지/디자인 생성 기능.', is_free: true, tags: ['AI도구'] },
  { title: 'CapCut AI 기능', url: 'https://www.capcut.com/tools', category: 'ai_tools', description: 'CapCut의 AI 자막/배경제거 등 기능.', is_free: true, tags: ['AI도구'] },
  { title: 'ElevenLabs', url: 'https://elevenlabs.io/', category: 'ai_tools', description: 'AI 음성합성 도구(무료 크레딧 제공).', is_free: true, tags: ['AI도구', '음성'] },

  // ─── production_checklist ───
  { title: 'Notion Content Calendar Template', url: 'https://www.notion.so/templates/category/content-creation', category: 'production_checklist', description: '콘텐츠 제작/체크리스트 노션 템플릿 모음.', is_free: true, tags: ['체크리스트'] },
  { title: 'Trello Content Templates', url: 'https://trello.com/templates/marketing', category: 'production_checklist', description: '제작 워크플로우 트렐로 템플릿.', is_free: true, tags: ['체크리스트'] },
  { title: 'Asana Templates', url: 'https://asana.com/templates', category: 'production_checklist', description: '프로젝트/콘텐츠 제작 체크리스트 템플릿.', is_free: true, tags: ['체크리스트'] },

  // ─── platform_specs ───
  { title: 'Instagram 도움말: Reels 사양', url: 'https://help.instagram.com/270963803047681', category: 'platform_specs', description: 'Instagram Reels 권장 해상도/길이 가이드.', is_free: true, tags: ['플랫폼규격', 'Instagram'] },
  { title: 'TikTok 비즈니스: 영상 사양 가이드', url: 'https://www.tiktok.com/business/en/blog/video-specs-best-practices', category: 'platform_specs', description: 'TikTok 영상 규격/베스트 프랙티스.', is_free: true, tags: ['플랫폼규격', 'TikTok'] },
  { title: 'YouTube 고객센터: Shorts 가이드', url: 'https://support.google.com/youtube/answer/10059070', category: 'platform_specs', description: 'YouTube Shorts 규격 가이드.', is_free: true, tags: ['플랫폼규격', 'YouTube'] },

  // ─── inspiration_reference ───
  { title: 'Pinterest', url: 'https://www.pinterest.com/', category: 'inspiration_reference', description: '무드보드/비주얼 레퍼런스 수집.', is_free: true, tags: ['영감'] },
  { title: 'Behance', url: 'https://www.behance.net/', category: 'inspiration_reference', description: '디자인/영상 포트폴리오 레퍼런스.', is_free: true, tags: ['영감'] },
  { title: 'Dribbble', url: 'https://dribbble.com/', category: 'inspiration_reference', description: 'UI/그래픽 디자인 레퍼런스.', is_free: true, tags: ['영감'] },

  // ─── legal_license ───
  { title: 'Creative Commons', url: 'https://creativecommons.org/licenses/', category: 'legal_license', description: 'CC 라이선스 종류 설명.', is_free: true, tags: ['라이선스'] },
  { title: 'Pixabay 라이선스 안내', url: 'https://pixabay.com/service/license-summary/', category: 'legal_license', description: 'Pixabay 콘텐츠 사용 범위 안내.', is_free: true, tags: ['라이선스'] },
  { title: 'Unsplash 라이선스 안내', url: 'https://unsplash.com/license', category: 'legal_license', description: 'Unsplash 사진 사용 범위 안내.', is_free: true, tags: ['라이선스'] },

  // ─── other ───
  { title: 'Are.na', url: 'https://www.are.na/', category: 'other', description: '리서치/무드보드 아카이빙 플랫폼.', is_free: true, tags: ['기타'] },
]

export function getCatalogByCategory(category: ResourceCategory | ''): CatalogResource[] {
  if (!category) return RESOURCE_CATALOG
  return RESOURCE_CATALOG.filter((r) => r.category === category)
}
