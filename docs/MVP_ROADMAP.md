# MVP_ROADMAP.md — MVP 로드맵

---

## 전체 Phase 구조

| Phase | 이름 | 주요 작업 | 상태 |
|-------|------|----------|------|
| Phase 0 | 기획/문서 | 기획 문서 작성 | ✅ 완료 |
| Phase 1 | 기초 인프라 | Vite 초기화, Supabase, Auth, 라우팅 | ⬜ 대기 |
| Phase 2 | Reference Library | 레퍼런스 저장/조회/편집/삭제 | ⬜ 대기 |
| Phase 3 | Ideas + Calendar | AI 아이디어 전환, 콘텐츠 캘린더 | ⬜ 대기 |
| Phase 4 | Analytics | 성과 수동 입력, 분석, 점수 | ⬜ 대기 |
| Phase 5 | Brand Guide + 완성 | 브랜드 가이드, Dashboard, 마무리 | ⬜ 대기 |

---

## Phase 0 — 기획/문서

**목표:** 개발 전 모든 기준 문서 완성

### 완료 기준
- [x] README.md
- [x] CLAUDE.md
- [x] .env.example
- [x] .gitignore
- [x] docs/PRODUCT_PLAN.md
- [x] docs/BRAND_GUIDE.md
- [x] docs/FREE_TOOLS_POLICY.md
- [x] docs/COMPETITOR_RESEARCH.md
- [x] docs/DESIGN_REFERENCE.md
- [x] docs/DESIGN_SYSTEM.md
- [x] docs/UI_COMPONENT_GUIDE.md
- [x] docs/REFERENCE_LIBRARY_SPEC.md
- [x] docs/FEATURE_LIST.md
- [x] docs/SCREEN_FLOW.md
- [x] docs/DATA_MODEL.md
- [x] docs/AI_RECOMMENDATION_RULES.md
- [x] docs/MVP_ROADMAP.md

---

## Phase 1 — 기초 인프라

**목표:** 앱이 열리고, 로그인이 되고, 페이지 이동이 된다.

### 작업 목록

1. **프로젝트 초기화**
   - Vite + React + TypeScript 설정
   - Tailwind CSS 설정
   - shadcn/ui 초기화
   - 폴더 구조 생성 (`src/components`, `src/pages`, `src/lib`, `src/types`, `src/hooks`)

2. **Supabase 연동**
   - Supabase 프로젝트 생성
   - 환경변수 설정
   - Supabase 클라이언트 초기화 (`src/lib/supabase.ts`)
   - 데이터베이스 테이블 생성 (DATA_MODEL.md 기준)
   - RLS 정책 설정

3. **인증 구현**
   - 로그인 페이지 (S01)
   - 이메일/비밀번호 로그인
   - 로그아웃
   - 인증 상태 관리 (Context 또는 Zustand)
   - 비로그인 시 리다이렉트

4. **레이아웃 구현**
   - AppLayout 컴포넌트 (사이드바 + 메인)
   - Sidebar 컴포넌트 (네비게이션)
   - React Router 설정 (전체 경로)

5. **디자인 시스템 적용**
   - Tailwind 커스텀 색상 토큰 설정
   - 폰트 설정 (Pretendard)
   - shadcn/ui 기본 설정

### 완료 기준
- [ ] `npm run dev`로 앱이 로컬에서 열림
- [ ] 로그인/로그아웃 동작
- [ ] 모든 페이지 경로 접근 가능 (빈 화면이어도 됨)
- [ ] 사이드바 네비게이션 동작
- [ ] Supabase DB 연결 확인

---

## Phase 2 — Reference Library

**목표:** 레퍼런스를 저장하고, 보고, 관리할 수 있다.

### 작업 목록

1. **레퍼런스 추가**
   - 추가 다이얼로그/폼
   - URL, 제목, 플랫폼 입력
   - Supabase INSERT

2. **레퍼런스 목록**
   - Grid 뷰 (ReferenceCard 컴포넌트)
   - List 뷰
   - 뷰 전환 버튼
   - 빈 상태 (EmptyState)

3. **레퍼런스 상세**
   - 상세 페이지 (S04)
   - 전체 필드 표시
   - 분석 메모 편집
   - 점수 슬라이더 입력
   - 상태 변경

4. **검색/필터**
   - 텍스트 검색
   - 플랫폼/상태/즐겨찾기 필터

5. **컬렉션**
   - 컬렉션 생성/편집/삭제
   - 레퍼런스에 컬렉션 할당

6. **태그**
   - 태그 추가/삭제
   - 자동완성

### 완료 기준
- [ ] 레퍼런스 CRUD 완성
- [ ] 검색/필터 동작
- [ ] 점수 입력 및 저장
- [ ] 컬렉션/태그 동작
- [ ] 상태 변경 동작

---

## Phase 3 — Ideas + Calendar

**목표:** 레퍼런스를 아이디어로 전환하고, 캘린더에 배치할 수 있다.

### 작업 목록

1. **AI 아이디어 전환**
   - "아이디어로 전환" 버튼 (레퍼런스 상세)
   - Claude API 호출
   - 아이디어 3개 생성/표시
   - 아이디어 선택/저장

2. **Content Ideas 화면**
   - 아이디어 목록 (S06)
   - 아이디어 편집
   - 직접 아이디어 작성 기능

3. **Content Calendar**
   - 주간 캘린더 뷰 (S07)
   - 날짜에 콘텐츠 추가
   - 콘텐츠 상태 변경
   - 날짜 이동 (이전/다음 주)

### 완료 기준
- [ ] AI 아이디어 생성 동작
- [ ] 아이디어 → 캘린더 배치 동작
- [ ] 주간 캘린더 뷰 동작
- [ ] 콘텐츠 상태 변경 동작

---

## Phase 4 — Analytics

**목표:** 콘텐츠 성과를 기록하고 분석할 수 있다.

### 작업 목록

1. **성과 수동 입력**
   - 성과 입력 폼
   - 도달, 좋아요, 저장, 댓글, 팔로워 유입 입력

2. **Content Analysis 화면**
   - 성과 목록 테이블 (S05)
   - 팔로워 추이 그래프
   - 포맷별 평균 성과

3. **팔로워 기록**
   - Settings에서 현재 팔로워 수 입력
   - 팔로워 기록 저장

### 완료 기준
- [ ] 성과 데이터 입력/저장
- [ ] 성과 목록 표시
- [ ] 팔로워 추이 그래프 동작

---

## Phase 5 — Brand Guide + 완성

**목표:** 앱이 MVP 기준으로 완성된다.

### 작업 목록

1. **Brand Guide 화면**
   - 에디토리얼 레이아웃 (S08)
   - 브랜드 철학 문장
   - 컬러 팔레트 표시
   - 권장/금지 표현 표
   - 점수 기준 설명

2. **Dashboard 완성**
   - 팔로워 현황 카드
   - 이번 주 캘린더 미리보기
   - 최근 레퍼런스

3. **Settings**
   - 계정 정보
   - 팔로워 목표 설정

4. **마무리**
   - 전체 UI 디테일 정리
   - 빈 상태/로딩/에러 처리
   - Vercel 배포 설정

### 완료 기준
- [ ] 모든 MVP 화면 완성
- [ ] 브랜드 가이드 에디토리얼 화면 동작
- [ ] Vercel 배포 완료
- [ ] 기본 반응형 (태블릿/데스크톱)

---

## Phase 2+ (향후)

- Instagram API 자동 연동
- 팀 협업 기능
- 자동 썸네일 크롤링
- 모바일 최적화
- 다크 모드
- 월간 리포트
