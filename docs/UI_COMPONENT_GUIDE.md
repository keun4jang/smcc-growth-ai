# UI_COMPONENT_GUIDE.md — UI 컴포넌트 가이드

---

## 1. shadcn/ui 사용 컴포넌트 목록

shadcn/ui는 컴포넌트를 복사해서 쓰는 방식이므로 필요한 것만 추가한다.

| 컴포넌트 | 용도 |
|---------|------|
| Button | 기본 버튼 (Primary, Secondary, Ghost, Destructive) |
| Input | 텍스트 입력 |
| Textarea | 메모, 설명 입력 |
| Select | 플랫폼, 포맷, 상태 선택 |
| Badge | 상태 배지, 태그 표시 |
| Card | 레퍼런스 카드, 대시보드 카드 |
| Dialog | 모달 (레퍼런스 추가, 삭제 확인) |
| Sheet | 사이드 패널 (레퍼런스 상세) |
| Tabs | 뷰 전환 (Grid/List, 주간/월간) |
| DropdownMenu | 더보기 메뉴, 필터 메뉴 |
| Popover | 날짜 선택, 컬러 선택 |
| Calendar | 콘텐츠 캘린더 날짜 선택 |
| Tooltip | 아이콘 설명, 점수 설명 |
| Toast | 저장 완료, 에러 알림 |
| Avatar | 유저 프로필 아바타 |
| Separator | 섹션 구분선 |
| Skeleton | 로딩 상태 |
| ScrollArea | 스크롤 영역 |
| Command | 검색/커맨드 팔레트 |
| Label | 폼 레이블 |
| Switch | 토글 설정 |
| Slider | 점수 입력 슬라이더 |

---

## 2. Lucide Icons 사용 기준

### 주요 아이콘 매핑

| 기능 | 아이콘 |
|------|-------|
| 대시보드 | `LayoutDashboard` |
| 레퍼런스 라이브러리 | `Library` |
| 콘텐츠 아이디어 | `Lightbulb` |
| 콘텐츠 캘린더 | `CalendarDays` |
| 브랜드 가이드 | `Sparkles` |
| 설정 | `Settings` |
| 추가 | `Plus` |
| 삭제 | `Trash2` |
| 편집 | `Pencil` |
| 검색 | `Search` |
| 필터 | `Filter` |
| 즐겨찾기 | `Star` / `StarOff` |
| 링크 | `Link` |
| 외부 링크 | `ExternalLink` |
| 태그 | `Tag` |
| 컬렉션 | `FolderOpen` |
| 상태 변경 | `ArrowRight` |
| 아이디어 전환 | `Wand2` |
| Instagram | `Instagram` |
| 더보기 | `MoreHorizontal` |
| 닫기 | `X` |
| 뒤로 | `ChevronLeft` |
| 복사 | `Copy` |
| 저장 | `Save` |
| 업로드 | `Upload` |
| 브랜드 점수 | `Heart` |
| 위험 점수 | `AlertTriangle` |
| 성장 점수 | `TrendingUp` |
| 팔로워 | `Users` |

### 아이콘 크기 기준

```tsx
// 인라인 아이콘 (텍스트 옆)
<Icon size={16} />

// 버튼 내 아이콘
<Icon size={16} />

// 네비게이션 아이콘
<Icon size={20} />

// 강조 아이콘 (빈 상태, 큰 UI)
<Icon size={40} />
```

---

## 3. 커스텀 컴포넌트 계획

### ReferenceCard

레퍼런스 라이브러리의 핵심 카드 컴포넌트.

```tsx
interface ReferenceCardProps {
  reference: Reference;
  view: 'grid' | 'list';
  onFavorite: () => void;
  onStatusChange: () => void;
  onConvert: () => void;
}
```

표시 요소:
- 썸네일 이미지 (없으면 플랫폼 아이콘)
- 플랫폼 배지 (Instagram, TikTok 등)
- 콘텐츠 포맷 배지 (Reels, Carousel 등)
- 제목
- 태그 목록
- Brand Fit / Cringe Risk / Growth 점수 미니 표시
- 상태 배지
- 즐겨찾기 버튼
- 호버 시 "아이디어로 전환" 버튼

---

### ScoreDisplay

3가지 점수를 시각화하는 컴포넌트.

```tsx
interface ScoreDisplayProps {
  brandFit: number;       // 1~10
  cringeRisk: number;     // 1~10
  growthPotential: number; // 1~10
  size: 'sm' | 'md' | 'lg';
}
```

- sm: 숫자만 표시 (카드 내)
- md: 숫자 + 레이블 + 컬러 바
- lg: 전체 설명 포함 (상세 화면)

---

### StatusBadge

콘텐츠/레퍼런스 상태를 시각화하는 배지.

```tsx
interface StatusBadgeProps {
  status: ReferenceStatus | ContentStatus;
  size?: 'sm' | 'md';
}
```

레퍼런스 상태 컬러 매핑:
- `Saved` → Mist (#9FC6C8)
- `Need Review` → Warm Sand (#FFC982)
- `Good Reference` → Primary (#00b1cd)
- `Adaptable` → Steel Blue (#4D7F95)
- `Converted` → Deep Plum (#51334F)
- `Used` → Sage (#C7D8D2)
- `Archived` → Gray
- `Rejected` → Deep Rose (#F43F55)

콘텐츠 상태 컬러 매핑:
- `Draft` → Gray
- `Review` → Warm Sand (#FFC982)
- `Approved` → Primary (#00b1cd)
- `Scheduled` → Steel Blue (#4D7F95)
- `Published` → Success (#10b981)
- `Need Metrics` → Golden Hour (#FDB334)
- `Analyzed` → Deep Plum (#51334F)
- `Archived` → Mist (#9FC6C8)

---

### PlatformBadge

플랫폼을 나타내는 배지 컴포넌트.

```tsx
type Platform = 
  | 'instagram_reels'
  | 'tiktok'
  | 'instagram_carousel'
  | 'instagram_feed'
  | 'instagram_story'
  | 'youtube_shorts'
  | 'article'
  | 'design_reference';
```

---

### EmptyState

빈 목록 상태 표시 컴포넌트.

```tsx
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### CalendarSlot

콘텐츠 캘린더의 날짜 슬롯 컴포넌트.

```tsx
interface CalendarSlotProps {
  date: Date;
  contents: ContentItem[];
  onAddContent: (date: Date) => void;
}
```

---

## 4. 컴포넌트 작성 원칙

- 컴포넌트는 `src/components/` 아래에 기능별 폴더로 구성
- 커스텀 컴포넌트는 shadcn/ui 스타일 변수를 기반으로 작성
- Props는 TypeScript 인터페이스로 명확히 정의
- 스토리/테스트는 MVP에서 제외, Phase 2에서 추가
- 컴포넌트 파일명은 PascalCase (`ReferenceCard.tsx`)
- 인덱스 파일로 내보내기 (`components/index.ts`)

---

## 5. 파일 구조

```
src/components/
├── ui/                    # shadcn/ui 컴포넌트 (자동 생성)
├── reference/
│   ├── ReferenceCard.tsx
│   ├── ReferenceGrid.tsx
│   ├── ReferenceList.tsx
│   └── ReferenceFilter.tsx
├── score/
│   ├── ScoreDisplay.tsx
│   └── ScoreSlider.tsx
├── calendar/
│   ├── ContentCalendar.tsx
│   └── CalendarSlot.tsx
├── common/
│   ├── StatusBadge.tsx
│   ├── PlatformBadge.tsx
│   ├── EmptyState.tsx
│   └── PageHeader.tsx
└── layout/
    ├── Sidebar.tsx
    ├── AppLayout.tsx
    └── NavItem.tsx
```
