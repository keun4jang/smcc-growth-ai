# DESIGN_SYSTEM.md — 디자인 시스템

---

## 1. 디자인 원칙

1. **낮은 시각 소음** — 불필요한 장식, 그라디언트, 과도한 컬러 사용 금지
2. **따뜻한 정돈** — 차갑거나 딱딱하지 않고, 따뜻하면서도 정리된 느낌
3. **여백 중심** — 정보를 빽빽하게 채우지 않고 충분한 여백 유지
4. **계층 명확성** — 중요한 것이 먼저 눈에 들어오는 정보 계층
5. **브랜드 무드 일관성** — 모든 화면이 SMCC 아침 커뮤니티 감성을 유지

---

## 2. 컬러 토큰

### 기본 토큰

```css
/* Primary */
--color-primary: #00b1cd;
--color-primary-light: #33c4d8;
--color-primary-lighter: #e6f7fa;
--color-primary-dark: #008fa6;

/* Surface */
--color-surface-base: #ffffff;
--color-surface-soft: #f9fafb;
--color-surface-warm: #fdf8f4;    /* 따뜻한 배경 */
--color-surface-muted: #f3f4f6;

/* Border */
--color-border-default: #e5e7eb;
--color-border-strong: #d1d5db;
--color-border-mist: #9FC6C8;

/* Text */
--color-text-primary: #0B3558;    /* Navy — 주요 텍스트 */
--color-text-secondary: #4D7F95;  /* Steel Blue — 보조 텍스트 */
--color-text-muted: #9ca3af;      /* 비활성 텍스트 */
--color-text-inverse: #ffffff;

/* Semantic */
--color-success: #10b981;
--color-warning: #FDB334;
--color-danger: #F43F55;
--color-info: #00b1cd;

/* Brand Extended */
--color-morning-peach: #F8DEC2;
--color-warm-sand: #FFC982;
--color-golden-hour: #FDB334;
--color-sunrise: #FF7048;
--color-deep-plum: #51334F;
--color-navy: #0B3558;
--color-steel-blue: #4D7F95;
--color-mist: #9FC6C8;
--color-sage: #C7D8D2;
```

### 점수 컬러 매핑

```css
/* Brand Fit Score */
--score-brand-high: #00b1cd;      /* 8~10 */
--score-brand-mid: #FDB334;       /* 5~7 */
--score-brand-low: #9ca3af;       /* 1~4 */

/* Cringe Risk Score */
--score-cringe-low: #10b981;      /* 1~3 (안전) */
--score-cringe-mid: #FDB334;      /* 4~6 (주의) */
--score-cringe-high: #F43F55;     /* 7~10 (위험) */

/* Growth Potential Score */
--score-growth-high: #00b1cd;     /* 8~10 */
--score-growth-mid: #FDB334;      /* 5~7 */
--score-growth-low: #9ca3af;      /* 1~4 */
```

---

## 3. 타이포그래피

### 폰트 스택

```css
/* 한국어 우선 */
font-family: 'Pretendard', 'Plus Jakarta Sans', -apple-system, sans-serif;

/* 에디토리얼 (Brand Guide 화면) */
font-family: 'DM Serif Display', serif;

/* 숫자/데이터 (tabular nums) */
font-variant-numeric: tabular-nums;
```

### 타입 스케일

| 토큰 | 크기 | 행간 | 용도 |
|------|------|------|------|
| `text-xs` | 12px | 16px | 배지, 레이블 |
| `text-sm` | 14px | 20px | 보조 텍스트, 메타 정보 |
| `text-base` | 16px | 24px | 기본 본문 |
| `text-lg` | 18px | 28px | 카드 제목, 섹션 소제목 |
| `text-xl` | 20px | 28px | 페이지 소제목 |
| `text-2xl` | 24px | 32px | 페이지 제목 |
| `text-3xl` | 30px | 36px | 대시보드 숫자 |
| `text-4xl` | 36px | 40px | 에디토리얼 헤더 |
| `text-5xl` | 48px | 56px | Brand Guide 대형 텍스트 |

### 폰트 굵기

```css
font-weight: 400;  /* 본문 */
font-weight: 500;  /* 약한 강조 */
font-weight: 600;  /* 소제목, 버튼 */
font-weight: 700;  /* 제목, 강한 강조 */
```

---

## 4. 스페이싱

Tailwind 기본 스페이싱 시스템 사용 (4px 단위).

| 토큰 | 크기 | 주요 용도 |
|------|------|----------|
| `space-1` | 4px | 아이콘-텍스트 간격 |
| `space-2` | 8px | 인라인 요소 간격 |
| `space-3` | 12px | 소형 컴포넌트 패딩 |
| `space-4` | 16px | 기본 패딩 |
| `space-5` | 20px | 카드 내부 패딩 |
| `space-6` | 24px | 섹션 내 요소 간격 |
| `space-8` | 32px | 카드 간격, 섹션 패딩 |
| `space-10` | 40px | 섹션 간격 |
| `space-12` | 48px | 페이지 상단 여백 |
| `space-16` | 64px | 대형 섹션 간격 |

---

## 5. 보더 및 라디우스

```css
/* Border */
border-width: 1px;
border-color: var(--color-border-default);

/* Radius */
--radius-sm: 6px;    /* 배지, 인풋 */
--radius-md: 8px;    /* 버튼 */
--radius-lg: 12px;   /* 카드 */
--radius-xl: 16px;   /* 모달, 대형 카드 */
--radius-full: 9999px; /* 태그, 아바타 */
```

---

## 6. 그림자

```css
/* 카드 기본 */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);

/* 카드 호버 */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);

/* 모달 */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);

/* 드롭다운 */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
```

---

## 7. 레이아웃 구조

```
┌─────────────────────────────────────────┐
│  사이드바 (240px 고정)  │  메인 영역      │
│                        │                │
│  로고                  │  페이지 헤더    │
│  네비게이션 메뉴        │                │
│  - Dashboard          │  콘텐츠 영역    │
│  - References         │                │
│  - Ideas              │                │
│  - Calendar           │                │
│  - Brand Guide        │                │
│  - Settings           │                │
│                        │                │
│  하단: 유저 정보        │                │
└─────────────────────────────────────────┘
```

---

## 8. 모드

- **기본: 라이트 모드**
- 다크 모드는 Phase 2 이후 고려
- 배경색은 흰색(`#ffffff`) 또는 따뜻한 크림(`#fdf8f4`)

---

## 9. 애니메이션 원칙

- 전환 시간: 150ms ~ 200ms
- 이징: `ease-out` 기본
- 과도한 애니메이션 금지 (정보 전달 방해)
- 호버/포커스 상태는 명확하게 구분

```css
transition: all 150ms ease-out;
```
