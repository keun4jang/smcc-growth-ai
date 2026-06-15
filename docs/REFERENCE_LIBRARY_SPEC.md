# REFERENCE_LIBRARY_SPEC.md — 레퍼런스 라이브러리 스펙

---

## 1. 개요

레퍼런스 라이브러리는 SMCC Growth Coach의 핵심 기능이다.
콘텐츠 팀이 좋은 SNS 콘텐츠를 발견했을 때 URL을 저장하고,
분석 메모를 남기고, 점수를 기록하고, 필요할 때 꺼내 쓰는 작업실이다.

---

## 2. 저장 대상 플랫폼 및 포맷

| 포맷 ID | 표시명 | 설명 |
|--------|-------|------|
| `instagram_reels` | Instagram Reels | 인스타그램 릴스 |
| `tiktok` | TikTok | 틱톡 영상 |
| `instagram_carousel` | Instagram Carousel | 인스타그램 캐러셀 |
| `instagram_feed` | Instagram Feed | 인스타그램 피드 이미지 |
| `instagram_story` | Instagram Story | 인스타그램 스토리 |
| `youtube_shorts` | YouTube Shorts | 유튜브 쇼츠 |
| `article` | Article / Website | 기사, 블로그, 웹사이트 |
| `design_reference` | Design Reference | 디자인 레퍼런스 (Behance, Dribbble 등) |

---

## 3. 레퍼런스 필드 정의

### 기본 정보

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | UUID | ✅ | 자동 생성 |
| `user_id` | UUID | ✅ | 저장한 사용자 |
| `url` | TEXT | ✅ | 원본 URL |
| `title` | TEXT | ✅ | 레퍼런스 제목 (자동 입력 또는 수동) |
| `platform` | ENUM | ✅ | 플랫폼/포맷 (위 표 참고) |
| `thumbnail_url` | TEXT | - | 썸네일 이미지 URL |
| `status` | ENUM | ✅ | 레퍼런스 상태 (기본: Saved) |
| `is_favorite` | BOOLEAN | ✅ | 즐겨찾기 여부 (기본: false) |
| `created_at` | TIMESTAMP | ✅ | 저장 시각 |
| `updated_at` | TIMESTAMP | ✅ | 수정 시각 |

### 분류 정보

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `collection_id` | UUID | - | 소속 컬렉션 (없으면 미분류) |
| `tags` | TEXT[] | - | 태그 목록 |

### 분석 메모

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `memo` | TEXT | - | 자유 형식 메모 |
| `why_saved` | TEXT | - | 왜 저장했는지 |
| `good_points` | TEXT | - | 좋은 포인트 |
| `smcc_apply` | TEXT | - | SMCC에 적용할 점 |

### 점수

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `brand_fit_score` | INTEGER (1~10) | - | 브랜드 무드 점수 |
| `cringe_risk_score` | INTEGER (1~10) | - | 짜침 위험도 점수 |
| `growth_potential_score` | INTEGER (1~10) | - | 팔로워 증가 가능성 점수 |

---

## 4. 레퍼런스 상태값

상태는 순차적이지 않고 자유롭게 변경 가능하다.

| 상태 | 설명 | 컬러 |
|------|------|------|
| `Saved` | 저장만 된 상태. 아직 검토 전 | Mist |
| `Need Review` | 검토가 필요한 상태 | Warm Sand |
| `Good Reference` | 좋은 레퍼런스로 확정 | Primary Blue |
| `Adaptable` | SMCC에 맞게 변형 가능한 레퍼런스 | Steel Blue |
| `Converted` | 콘텐츠 아이디어로 전환됨 | Deep Plum |
| `Used` | 실제 콘텐츠에 활용됨 | Sage |
| `Archived` | 보관 처리 (더 이상 사용 안 함) | Gray |
| `Rejected` | 부적합 판정 | Deep Rose |

---

## 5. 컬렉션 기능

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | UUID | 자동 생성 |
| `user_id` | UUID | 소유 사용자 |
| `name` | TEXT | 컬렉션 이름 |
| `description` | TEXT | 컬렉션 설명 |
| `color` | TEXT | 컬렉션 표시 컬러 (HEX) |
| `created_at` | TIMESTAMP | 생성 시각 |

컬렉션 예시:
- "아침 루틴 콘텐츠"
- "커뮤니티 강조 콘텐츠"
- "릴스 포맷 연구"
- "경쟁 브랜드 레퍼런스"
- "짜침 위험 사례"

---

## 6. 태그 시스템

- 태그는 자유 입력 방식 (자동완성 지원)
- 태그에 공백 허용, 특수문자 금지
- 태그는 소문자 통일
- 사용자별 태그 풀 관리

예시 태그:
`아침루틴`, `커뮤니티`, `릴스`, `브이로그`, `미니멀`, `웰니스`, `참여유도`, `저장유도`

---

## 7. 검색 및 필터 스펙

### 검색

- 검색 대상: 제목, URL, 메모, why_saved, good_points, smcc_apply
- 실시간 검색 (입력 즉시 결과 갱신)
- 최소 2글자 이상 입력 시 검색 시작

### 필터

| 필터 | 선택지 |
|------|-------|
| 플랫폼/포맷 | 전체 + 8개 포맷 |
| 상태 | 전체 + 8개 상태 |
| 컬렉션 | 전체 + 사용자 컬렉션 목록 |
| 즐겨찾기 | 전체 / 즐겨찾기만 |
| Brand Fit Score | 전체 / 7점 이상 / 5점 이상 |
| Cringe Risk Score | 전체 / 3점 이하 (안전) / 6점 이하 |

### 정렬

- 최신순 (기본)
- 오래된 순
- Brand Fit 점수 높은 순
- Growth Potential 높은 순
- 즐겨찾기 먼저

---

## 8. 레퍼런스 → 콘텐츠 아이디어 전환

레퍼런스 상세 화면에서 "아이디어로 전환" 버튼 클릭 시:

1. AI가 레퍼런스 정보(URL, 제목, good_points, smcc_apply)를 읽음
2. SMCC 브랜드 맥락(브랜드 가이드)을 프롬프트에 포함
3. SMCC다운 콘텐츠 아이디어 3개 생성
4. 사용자가 아이디어 선택 → Content Ideas 화면에 저장
5. 레퍼런스 상태 → `Converted`로 변경

---

## 9. 뷰 모드

| 뷰 | 설명 |
|----|------|
| Grid (기본) | 3열 카드 그리드 |
| List | 행 형태 리스트 |

---

## 10. 빈 상태 처리

레퍼런스가 없을 때:
- 중앙에 Library 아이콘 + "첫 레퍼런스를 저장해보세요" 메시지
- "+ 레퍼런스 추가" 버튼

필터 결과 없을 때:
- "조건에 맞는 레퍼런스가 없어요" 메시지
- "필터 초기화" 버튼
