# DESIGN_REFERENCE.md — 디자인 레퍼런스

---

## 전체 디자인 방향

아침 감성의 웰니스 커뮤니티가 쓰는 **따뜻하고 정돈된 콘텐츠 성장 작업실**.

피해야 할 방향:
- 차가운 SaaS 분석 툴 (Tableau, Google Analytics 스타일)
- 커피 브랜드 (브라운/라떼/원두 중심 디자인)
- 헬스 기록 앱 (딱딱한 데이터 중심)

---

## 1. Linear — 정돈된 레이아웃

**적용 화면:** 전체 앱 레이아웃, 사이드바, 리스트 뷰

### 참고 특징
- 낮은 시각 소음 (최소한의 컬러, 아이콘, 장식)
- 명확한 계층 구조 (사이드바 → 메인 영역 → 상세 패널)
- 좁은 사이드바와 넓은 콘텐츠 영역
- 호버 상태가 부드럽고 절제됨
- 텍스트 중심의 네비게이션

### SMCC 적용 방식
- Linear의 구조를 베이스로 하되 SMCC 팔레트와 따뜻한 배경색 적용
- 차가운 다크 모드 대신 밝고 따뜻한 라이트 모드 기본

---

## 2. Milanote — 레퍼런스 수집 UX

**적용 화면:** Reference Library, Reference Detail

### 참고 특징
- 카드형 콘텐츠 배치
- 여유 있는 카드 간격
- 이미지 중심 카드 레이아웃
- 카드 호버 시 빠른 액션(즐겨찾기, 상태 변경) 노출

### SMCC 적용 방식
- Grid 카드 레이아웃으로 레퍼런스 표시
- 썸네일 이미지 + 제목 + 플랫폼 배지 + 점수 표시
- 호버 시 "아이디어로 전환" 버튼 노출

---

## 3. Buffer — 캘린더 명확성

**적용 화면:** Content Calendar

### 참고 특징
- 주간 캘린더 뷰가 기본
- 날짜별 슬롯에 콘텐츠 카드 배치
- 콘텐츠 상태(Draft/Scheduled/Published)를 컬러로 구분
- 빈 날짜 슬롯이 명확하게 비어 보임

### SMCC 적용 방식
- 주간 7열 캘린더 기본
- 콘텐츠 상태별 컬러 배지 적용
- 빈 날짜에 "+ 추가" 버튼 표시

---

## 4. Webflow / Readymag — 에디토리얼 브랜드 화면

**적용 화면:** Brand Guide

### 참고 특징
- 타이포그래피가 디자인 요소 역할
- 큰 텍스트 블록과 여백의 대비
- 컬러 스워치와 폰트 샘플이 시각적으로 정렬됨
- 브랜드 문장이 인쇄물처럼 레이아웃됨

### SMCC 적용 방식
- Brand Guide 화면은 문서가 아니라 에디토리얼 페이지처럼 디자인
- 브랜드 핵심 문장을 크게 타이포그래피로 표현
- 컬러 팔레트를 시각적 블록으로 표시
- 금지 표현/권장 표현을 대비 레이아웃으로 정리

---

## 5. Awwwards Clean / Siteinspire Minimal — 여백과 절제

**적용 화면:** Dashboard, 전체 공통

### 참고 특징
- 넉넉한 패딩과 마진
- 정보 밀도를 낮게 유지
- 그리드 기반 정렬
- 필요한 것만 표시

### SMCC 적용 방식
- Dashboard에 과도한 위젯 배치 금지
- 핵심 지표 3~5개만 상단에 표시
- 카드와 섹션 사이 충분한 여백

---

## 화면별 디자인 방향 매핑

| 화면 | 주요 참고 |
|------|----------|
| Dashboard | Metricool 지표 카드 + Awwwards 여백 |
| Reference Library | Milanote 카드 + Raindrop 필터/검색 |
| Reference Detail | Linear 상세 패널 + 자체 점수 UI |
| Content Analysis | Metricool 분석 뷰 |
| AI Content Ideas | 자체 설계 (레퍼런스 없음) |
| Content Calendar | Buffer 캘린더 |
| Brand Guide | Webflow/Readymag 에디토리얼 |
| Settings | Linear 설정 화면 |
