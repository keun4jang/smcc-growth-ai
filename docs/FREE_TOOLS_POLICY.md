# FREE_TOOLS_POLICY.md — 무료 도구 정책

---

## 원칙

이 프로젝트는 모든 도구, 라이브러리, 서비스를 **무료 플랜 기준**으로만 사용한다.
새 도구를 추가할 때 반드시 이 문서를 확인하고, 무료 여부를 먼저 검증한다.

---

## 사용 가능한 도구 목록

### 프론트엔드

| 도구 | 라이선스/플랜 | 비고 |
|------|-------------|------|
| React | MIT | 무료 오픈소스 |
| TypeScript | Apache 2.0 | 무료 오픈소스 |
| Vite | MIT | 무료 오픈소스 |
| Tailwind CSS | MIT | 무료 오픈소스 |
| shadcn/ui | MIT | 무료 오픈소스, 컴포넌트 복사 방식 |
| Lucide Icons | ISC | 무료 오픈소스 |
| React Router | MIT | 무료 오픈소스 |
| Zustand / Jotai | MIT | 무료 오픈소스 상태관리 |
| React Query (TanStack) | MIT | 무료 오픈소스 |
| date-fns | MIT | 무료 날짜 라이브러리 |

### 백엔드/데이터베이스

| 도구 | 플랜 | 제약 |
|------|------|------|
| Supabase | Free Plan | 아래 제약 참고 |

### AI

| 도구 | 플랜 | 비고 |
|------|------|------|
| Claude API | Pay-as-you-go | 사용량 기반 과금 — 사용 시 사용자 확인 필요 |

> Claude API는 완전 무료가 아니나 사용량이 매우 적으면 실질 비용이 낮다.
> MVP에서는 AI 기능 호출 횟수를 최소화하는 방식으로 설계한다.

### 폰트

| 도구 | 라이선스 | 비고 |
|------|---------|------|
| Pretendard | SIL OFL | 무료, 한국어 지원 |
| Plus Jakarta Sans | SIL OFL | 무료, Google Fonts |
| Inter | SIL OFL | 무료, Google Fonts |
| DM Serif Display | SIL OFL | 무료, Google Fonts |

### 배포

| 도구 | 플랜 | 제약 |
|------|------|------|
| Vercel | Hobby (무료) | 개인/소규모 프로젝트 무료 |
| Netlify | Free | 빌드 시간 300분/월 |

---

## Supabase Free Plan 제약

| 항목 | Free Plan 한도 |
|------|--------------|
| 데이터베이스 크기 | 500 MB |
| 파일 스토리지 | 1 GB |
| 월간 활성 사용자 | 50,000 |
| API 요청 | 무제한 (합리적 사용) |
| Edge Functions 실행 | 500,000 / 월 |
| 프로젝트 수 | 2개 |
| 비활성 프로젝트 일시 중지 | 7일 비활성 시 자동 일시 중지 |

### Free Plan 대응 설계 원칙

- 이미지/썸네일은 URL 링크로만 저장하고 직접 업로드를 최소화한다
- 불필요한 대용량 데이터 저장을 피한다
- 정기적으로 사용해 7일 비활성 일시 중지를 방지한다
- 향후 사용자 수가 늘면 Pro Plan 전환을 검토한다

---

## 사용 금지 도구

| 도구 | 이유 |
|------|------|
| Adobe Fonts | 유료 구독 필요 |
| Getty Images / Shutterstock | 유료 이미지 |
| Figma (유료 플랜) | 협업 기능 유료 |
| Webflow | 유료 SaaS |
| Framer | 유료 플랜 필요 |
| OpenAI API (GPT-4) | 유료 API |
| Amplitude / Mixpanel | 유료 분석 도구 |
| Airtable (유료) | 유료 플랜 필요 |

---

## 새 도구 추가 절차

1. 해당 도구의 무료 플랜 존재 여부 확인
2. 무료 플랜의 제약 사항 문서화
3. 사용자에게 보고 후 승인받기
4. 이 문서에 추가 후 진행

---

## 유료 전환 고려 시점

아래 조건 중 하나가 충족되면 유료 플랜 전환을 검토한다:

- Supabase DB 사용량이 400MB 초과
- 팀원이 3명 초과
- 월간 AI API 비용이 10만원 초과
- 배포 빌드 시간이 월 250분 초과
