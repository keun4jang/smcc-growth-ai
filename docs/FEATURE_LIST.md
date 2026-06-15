# FEATURE_LIST.md — 기능 목록

---

## MVP 기능 목록

우선순위: P0 (필수) > P1 (중요) > P2 (있으면 좋음)

---

### 인증

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 이메일/비밀번호 로그인 | P0 | Login | Supabase Auth 기반 |
| 로그아웃 | P0 | Settings | |
| 로그인 상태 유지 | P0 | 전체 | 세션 유지 |
| 비밀번호 재설정 | P1 | Login | 이메일 발송 방식 |

---

### 레퍼런스 라이브러리 (Reference Library)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 레퍼런스 추가 | P0 | Reference Library | URL + 기본 정보 입력 |
| 레퍼런스 목록 조회 | P0 | Reference Library | Grid/List 뷰 |
| 레퍼런스 상세 조회 | P0 | Reference Detail | 전체 정보 확인 |
| 레퍼런스 편집 | P0 | Reference Detail | 필드 수정 |
| 레퍼런스 삭제 | P0 | Reference Detail | 확인 후 삭제 |
| 상태 변경 | P0 | Reference Library/Detail | 드롭다운으로 상태 변경 |
| 즐겨찾기 토글 | P0 | Reference Library | 별표 버튼 |
| 태그 추가/삭제 | P0 | Reference Detail | 자유 입력 + 자동완성 |
| 컬렉션 관리 | P1 | Reference Library | 컬렉션 생성/편집/삭제 |
| 컬렉션 할당 | P1 | Reference Detail | 레퍼런스를 컬렉션에 배치 |
| 점수 입력 | P0 | Reference Detail | 슬라이더로 1~10 입력 |
| 분석 메모 작성 | P0 | Reference Detail | why_saved, good_points, smcc_apply |
| 검색 | P0 | Reference Library | 텍스트 검색 |
| 필터 | P0 | Reference Library | 플랫폼/상태/컬렉션/점수 필터 |
| 정렬 | P1 | Reference Library | 최신순/점수순 등 |
| 뷰 전환 | P1 | Reference Library | Grid/List 전환 |

---

### 콘텐츠 아이디어 (AI Content Ideas)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 레퍼런스 → 아이디어 전환 | P0 | Reference Detail | Claude AI 기반 아이디어 생성 |
| 아이디어 목록 조회 | P0 | AI Content Ideas | 생성된 아이디어 목록 |
| 아이디어 상세 조회 | P0 | AI Content Ideas | 아이디어 내용 확인 |
| 아이디어 편집 | P0 | AI Content Ideas | 제목, 내용, 포맷 수정 |
| 아이디어 삭제 | P1 | AI Content Ideas | |
| 아이디어 → 캘린더 배치 | P1 | AI Content Ideas | 날짜 선택 후 캘린더에 추가 |
| 아이디어 직접 작성 | P1 | AI Content Ideas | AI 없이 직접 아이디어 작성 |

---

### 콘텐츠 분석 (Content Analysis)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 성과 데이터 수동 입력 | P0 | Content Analysis | 도달, 좋아요, 저장, 댓글, 팔로워 입력 |
| 성과 목록 조회 | P0 | Content Analysis | 기간별 성과 목록 |
| 콘텐츠 포맷별 성과 비교 | P1 | Content Analysis | 릴스 vs 캐러셀 등 |
| 팔로워 증가 추이 그래프 | P1 | Content Analysis | 기간별 팔로워 변화 |
| Brand Fit 평균 점수 | P1 | Content Analysis | 발행 콘텐츠 평균 |

---

### 콘텐츠 캘린더 (Content Calendar)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 주간 캘린더 뷰 | P0 | Content Calendar | 7일 캘린더 |
| 콘텐츠 캘린더 추가 | P0 | Content Calendar | 날짜 + 제목 + 포맷 + 상태 |
| 콘텐츠 상태 변경 | P0 | Content Calendar | 드롭다운으로 상태 변경 |
| 콘텐츠 편집/삭제 | P0 | Content Calendar | |
| 월간 캘린더 뷰 | P2 | Content Calendar | 월 전체 보기 |

---

### 대시보드 (Dashboard)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 팔로워 현황 요약 | P0 | Dashboard | 현재 팔로워 수, 이번 달 증가 |
| 이번 주 캘린더 미리보기 | P0 | Dashboard | 이번 주 콘텐츠 목록 |
| 최근 레퍼런스 | P0 | Dashboard | 최근 저장된 레퍼런스 |
| Brand Fit 평균 점수 | P1 | Dashboard | 최근 콘텐츠 평균 |
| 미완료 콘텐츠 알림 | P2 | Dashboard | Need Metrics 상태 콘텐츠 |

---

### 브랜드 가이드 (Brand Guide)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 브랜드 철학 문장 표시 | P0 | Brand Guide | 에디토리얼 레이아웃 |
| 컬러 팔레트 표시 | P0 | Brand Guide | 시각적 컬러 블록 |
| 금지/권장 표현 목록 | P0 | Brand Guide | 대비 레이아웃 |
| 점수 기준 설명 | P0 | Brand Guide | Brand Fit / Cringe Risk / Growth 설명 |
| 콘텐츠 포맷 가이드 | P1 | Brand Guide | 포맷별 SMCC 스타일 가이드 |

---

### 설정 (Settings)

| 기능 | 우선순위 | 화면 | 설명 |
|------|---------|------|------|
| 계정 정보 확인 | P0 | Settings | 이름, 이메일 |
| 팔로워 기준 데이터 입력 | P0 | Settings | 초기 팔로워 수, 목표 팔로워 수 |
| 로그아웃 | P0 | Settings | |

---

## Phase 2 기능 (MVP 이후)

| 기능 | 설명 |
|------|------|
| Instagram API 자동 연동 | Meta Business Suite API 연동 자동 성과 수집 |
| 팀 협업 기능 | 다중 사용자, 코멘트, 승인 워크플로우 |
| 자동 썸네일 크롤링 | URL 입력 시 Open Graph 이미지 자동 수집 |
| 모바일 최적화 | 반응형 또는 PWA |
| 알림 기능 | Need Metrics 상태 콘텐츠 알림 |
| 월간 리포트 | 월별 성과 요약 리포트 |
| 브랜드 점수 자동 분석 | AI가 URL 내용을 분석해 점수 자동 입력 |
| 다크 모드 | 라이트/다크 모드 전환 |
| 외부 공유 | 콘텐츠 아이디어 공유 링크 |
