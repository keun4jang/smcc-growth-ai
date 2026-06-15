# SMCC Growth Coach

SMCC 콘텐츠 팀을 위한 내부용 콘텐츠 성장 작업실.
인스타그램/SNS 레퍼런스를 모으고, 분석하고, SMCC다운 콘텐츠 아이디어로 전환하고, 캘린더에 배치하고, 성과를 기록한다.

---

## 프로젝트 목적

SMCC는 커피 브랜드가 아니다. 커피는 사람들을 모이게 하는 매개체일 뿐이다.
SMCC의 핵심은 아침 시간에 개인이 스스로 건강한 변화를 시작하고, 그 변화를 지속할 수 있도록 돕는 커뮤니티다.

이 앱은 그 철학을 담은 콘텐츠를 만들기 위한 팀 작업실이다.

---

## 기술 스택

| 분류 | 도구 |
|------|------|
| 프레임워크 | React + TypeScript |
| 빌드 도구 | Vite |
| 스타일 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui |
| 아이콘 | Lucide Icons |
| 백엔드/DB | Supabase Free Plan |
| AI | Claude API |
| 배포 | Vercel / Netlify (무료 플랜) |

모든 도구는 무료 플랜 기준으로 운영한다. → [FREE_TOOLS_POLICY.md](docs/FREE_TOOLS_POLICY.md)

---

## 핵심 기능

1. 레퍼런스 저장 및 관리 (Reference Library)
2. 레퍼런스 → 콘텐츠 아이디어 전환
3. 콘텐츠 성과 수동 입력 및 분석
4. 주간 콘텐츠 캘린더
5. Brand Fit / Cringe Risk / Growth Potential 점수 관리
6. 브랜드 가이드 화면

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase 키 입력

# 개발 서버 실행
npm run dev
```

---

## 문서

| 문서 | 설명 |
|------|------|
| [PRODUCT_PLAN.md](docs/PRODUCT_PLAN.md) | 전체 제품 기획 |
| [BRAND_GUIDE.md](docs/BRAND_GUIDE.md) | SMCC 브랜드 가이드 |
| [FREE_TOOLS_POLICY.md](docs/FREE_TOOLS_POLICY.md) | 무료 도구 정책 |
| [COMPETITOR_RESEARCH.md](docs/COMPETITOR_RESEARCH.md) | 경쟁 앱 분석 |
| [DESIGN_REFERENCE.md](docs/DESIGN_REFERENCE.md) | 디자인 레퍼런스 |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | 디자인 시스템 |
| [UI_COMPONENT_GUIDE.md](docs/UI_COMPONENT_GUIDE.md) | UI 컴포넌트 가이드 |
| [REFERENCE_LIBRARY_SPEC.md](docs/REFERENCE_LIBRARY_SPEC.md) | 레퍼런스 라이브러리 스펙 |
| [FEATURE_LIST.md](docs/FEATURE_LIST.md) | 기능 목록 |
| [SCREEN_FLOW.md](docs/SCREEN_FLOW.md) | 화면 흐름 |
| [DATA_MODEL.md](docs/DATA_MODEL.md) | 데이터 모델 |
| [AI_RECOMMENDATION_RULES.md](docs/AI_RECOMMENDATION_RULES.md) | AI 추천 규칙 |
| [MVP_ROADMAP.md](docs/MVP_ROADMAP.md) | MVP 로드맵 |

---

## 브랜드 키컬러

`#00b1cd` — SMCC 아침, 변화, 커뮤니티

---

## 중요 규칙

- 이 프로젝트는 `smcc-growth-ai` 폴더 안에서만 작업한다.
- 다른 프로젝트(modeun-motors 등)는 절대 건드리지 않는다.
- Claude Code 작업 규칙 전문 → [CLAUDE.md](CLAUDE.md)
