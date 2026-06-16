import type { YouTubeVideo } from '@/lib/youtube'

// ─── Program Configs ──────────────────────────────────────────────

interface ProgramConfig {
  searchQueries: string[]
  searchChips: Array<{ label: string; query: string }>
  goodSignals: string[]
  badSignals: string[]
  pexelsQuery: string
}

export const PROGRAM_CONFIGS: Record<string, ProgramConfig> = {
  daily_coffee_chat: {
    searchQueries: [
      '"morning coffee chat" community strangers',
      '"before work meetup" coffee local',
      'coffee chat strangers morning community meetup',
    ],
    searchChips: [
      { label: 'morning coffee chat', query: '"morning coffee chat" strangers community' },
      { label: 'before work meetup', query: '"before work meetup" coffee' },
      { label: 'strangers coffee morning', query: 'strangers coffee morning community meetup' },
      { label: 'local cafe meetup', query: 'local cafe morning community gathering' },
    ],
    goodSignals: ['morning meetup','coffee chat','strangers','small group','before work','community','local cafe','morning coffee','conversation','connect','people gathering'],
    badSignals: ['business networking sales','lead generation','dating meetup','coffee product review','cafe tour only','barista tutorial','brewing method only'],
    pexelsQuery: 'morning coffee people conversation community',
  },
  espresso_run: {
    searchQueries: [
      '"run club" "coffee after run" morning',
      '"easy pace" run club community social morning',
      '"morning run" club coffee community local',
    ],
    searchChips: [
      { label: 'run club coffee', query: '"run club" "coffee after run"' },
      { label: 'easy pace social run', query: '"easy pace" run club social community' },
      { label: 'morning run community', query: 'morning run club community local' },
      { label: 'coffee run meetup', query: 'coffee run morning group meetup' },
    ],
    goodSignals: ['run club','easy pace','social run','coffee after run','morning run','community run','local route','running group','casual run','fun run'],
    badSignals: ['marathon training only','race record PR','personal record','intense workout','shoes review','body transformation','weight loss run','competition','ultramarathon'],
    pexelsQuery: 'morning run group outdoor community',
  },
  book_dive: {
    searchQueries: [
      '"silent book club" morning community',
      '"silent reading party" café community',
      '"book club" morning coffee community',
    ],
    searchChips: [
      { label: 'silent book club', query: '"silent book club" community' },
      { label: 'silent reading party', query: '"silent reading party" cafe morning' },
      { label: 'morning book club', query: 'morning book club coffee community' },
      { label: 'reading together', query: 'reading together community morning aesthetic' },
    ],
    goodSignals: ['silent book club','reading party','morning book','community reading','book club','reading together','cafe reading','quiet morning','book meetup','shared reading'],
    badSignals: ['book review only ranking','book haul unboxing','book collection tour','speed reading challenge','bestseller list only','commercial bookstore ad'],
    pexelsQuery: 'book reading morning cafe aesthetic people',
  },
  morning_rave: {
    searchQueries: [
      '"morning rave" coffee dance community',
      '"sober rave" morning party dance',
      '"daybreaker" morning dance wellness',
      '"coffee rave" morning dance community',
    ],
    searchChips: [
      { label: 'morning rave', query: '"morning rave" coffee dance' },
      { label: 'sober rave', query: '"sober rave" morning dance party' },
      { label: 'daybreaker', query: 'daybreaker morning dance wellness community' },
      { label: 'coffee rave', query: '"coffee rave" morning party' },
    ],
    goodSignals: ['morning rave','coffee rave','sober party','sober rave','dance morning','non alcoholic','wellness party','daybreaker','sunrise dance','morning energy dance'],
    badSignals: ['nightclub','alcohol','drinking bar','afterparty hookup','pickup bar','sexy club night','drunk','shots bar','night drinking'],
    pexelsQuery: 'morning dance party energy people crowd',
  },
  smcc_talk: {
    searchQueries: [
      '"conversation salon" morning community',
      '"strangers talking" morning community event',
      '"morning talk" community gathering local',
    ],
    searchChips: [
      { label: 'conversation salon', query: '"conversation salon" morning community' },
      { label: 'strangers talking', query: 'strangers talking morning community event' },
      { label: 'morning talk event', query: 'morning talk community gathering local' },
      { label: 'deep conversation', query: 'deep conversation morning community cafe' },
    ],
    goodSignals: ['conversation salon','morning talk','strangers conversation','community discussion','open dialogue','morning panel','local talk','gathering','participate','dialogue community'],
    badSignals: ['debate competition','public speaking sales pitch','ted talk performance only','political debate','argument competition','pitching investors'],
    pexelsQuery: 'people conversation discussion community morning',
  },
  smcc_cinema: {
    searchQueries: [
      '"morning cinema" breakfast film community',
      '"outdoor cinema" morning community gathering',
      '"film club" morning coffee discussion',
    ],
    searchChips: [
      { label: 'morning cinema', query: '"morning cinema" breakfast film community' },
      { label: 'breakfast screening', query: 'breakfast film screening community morning' },
      { label: 'film club morning', query: '"film club" morning coffee discussion' },
      { label: 'outdoor cinema', query: 'outdoor cinema morning community gathering' },
    ],
    goodSignals: ['morning cinema','breakfast film','film club','movie morning','outdoor cinema','community screening','film discussion','sunrise cinema','movie club'],
    badSignals: ['movie review box office','streaming ranking only','film critic award only','popcorn commercial','cinema ad commercial'],
    pexelsQuery: 'outdoor cinema morning people community',
  },
  breakfast: {
    searchQueries: [
      '"breakfast meetup" community strangers morning',
      '"breakfast with strangers" community',
      '"breakfast club" morning local community',
    ],
    searchChips: [
      { label: 'breakfast meetup', query: '"breakfast meetup" community strangers morning' },
      { label: 'breakfast with strangers', query: '"breakfast with strangers" community' },
      { label: 'breakfast club', query: '"breakfast club" morning local community' },
      { label: 'brunch community', query: 'brunch community morning gathering local' },
    ],
    goodSignals: ['breakfast meetup','breakfast with strangers','morning brunch community','breakfast club','community breakfast','morning gathering','share meal morning','local breakfast'],
    badSignals: ['breakfast recipe only','food review restaurant commercial','diet breakfast calories','meal prep only','fast food commercial'],
    pexelsQuery: 'breakfast morning people community table food',
  },
  sunrise_meetup: {
    searchQueries: [
      '"sunrise meetup" outdoor community morning',
      '"dawn gathering" outdoor morning people',
      '"watch sunrise" together community',
    ],
    searchChips: [
      { label: 'sunrise meetup', query: '"sunrise meetup" outdoor community' },
      { label: 'dawn gathering', query: 'dawn gathering outdoor morning people' },
      { label: 'watch sunrise together', query: '"watch sunrise" together community' },
      { label: 'early morning outdoor', query: 'early morning outdoor community gathering' },
    ],
    goodSignals: ['sunrise meetup','dawn gathering','watch sunrise','morning walk community','outdoor morning','early morning gathering','sunrise community','first light morning'],
    badSignals: ['sunrise photography solo only','time lapse landscape only','solo sunrise camping','sunrise drone only'],
    pexelsQuery: 'sunrise outdoor people morning community dawn',
  },
  travel_trip: {
    searchQueries: [
      '"community travel" wellness group trip',
      '"group trip" strangers community travel',
      '"travel with strangers" community adventure',
    ],
    searchChips: [
      { label: 'community travel', query: '"community travel" wellness group trip' },
      { label: 'group trip strangers', query: '"group trip" strangers community travel' },
      { label: 'travel together', query: 'travel together community wellness morning' },
      { label: 'wellness trip', query: 'wellness retreat travel community group' },
    ],
    goodSignals: ['community travel','group trip','travel together','wellness travel','social trip','travel strangers','community adventure','group retreat','travel community'],
    badSignals: ['solo travel budget hacks only','luxury hotel review','flight deals only','travel influencer haul','travel agency commercial','travel shopping guide'],
    pexelsQuery: 'group travel community adventure people',
  },
  wellness_class: {
    searchQueries: [
      '"morning yoga" community outdoor sunrise',
      '"breathwork" morning class community wellness',
      '"sunrise stretch" community morning outdoor',
    ],
    searchChips: [
      { label: 'morning yoga community', query: '"morning yoga" community outdoor sunrise' },
      { label: 'breathwork morning', query: '"breathwork" morning class community wellness' },
      { label: 'sunrise stretch', query: '"sunrise stretch" community morning outdoor' },
      { label: 'wellness class morning', query: 'wellness class morning community together' },
    ],
    goodSignals: ['morning yoga','sunrise yoga','breathwork','morning stretch','wellness class','community workout','outdoor yoga','morning meditation','group wellness','morning movement'],
    badSignals: ['intense gym workout','body transformation weight loss challenge','six pack abs','calorie burn only','fitness influencer supplement','muscle building competition'],
    pexelsQuery: 'morning yoga outdoor wellness community sunrise',
  },
  global_meetup: {
    searchQueries: [
      'foreigners Seoul morning coffee meetup community',
      '"international meetup" Seoul morning community',
      '"language exchange" cafe morning community Seoul',
    ],
    searchChips: [
      { label: 'foreigners Seoul meetup', query: 'foreigners Seoul morning coffee meetup' },
      { label: 'international community', query: '"international meetup" morning coffee Seoul community' },
      { label: 'language exchange cafe', query: '"language exchange" cafe morning community' },
      { label: 'expat morning meetup', query: 'expat morning meetup community Seoul coffee' },
    ],
    goodSignals: ['foreigners meetup','international community','language exchange','expat community','cultural exchange','morning coffee international','Seoul meetup','multicultural morning'],
    badSignals: ['english tutoring commercial','visa consulting ad','immigration guide commercial','shopping guide foreigner','dating foreigners app','international school ad'],
    pexelsQuery: 'diverse people community morning coffee international',
  },
  brand_collaboration: {
    searchQueries: [
      '"brand activation" wellness community experiential',
      '"experiential marketing" wellness morning community',
      '"brand event" community morning wellness lifestyle',
    ],
    searchChips: [
      { label: 'brand wellness event', query: '"brand activation" wellness community experiential' },
      { label: 'experiential marketing', query: '"experiential marketing" wellness morning community' },
      { label: 'brand community event', query: '"brand event" community morning wellness' },
      { label: 'wellness brand collab', query: 'wellness brand collaboration community event morning' },
    ],
    goodSignals: ['brand activation','experiential marketing','brand event community','wellness brand','lifestyle brand collaboration','brand experience morning','community brand'],
    badSignals: ['unboxing haul','product discount code','affiliate marketing only','sponsored review only','sales funnel ad','commercial only'],
    pexelsQuery: 'brand event community morning lifestyle experience',
  },
  community_event: {
    searchQueries: [
      '"community party" morning celebration gathering local',
      '"homecoming event" community morning gathering',
      '"community celebration" morning together',
    ],
    searchChips: [
      { label: 'community party morning', query: '"community party" morning celebration gathering' },
      { label: 'homecoming event', query: '"homecoming" community morning gathering' },
      { label: 'community celebration', query: '"community celebration" morning together local' },
      { label: 'gathering community', query: 'gathering community morning celebration local' },
    ],
    goodSignals: ['community party','homecoming community','community celebration','gathering morning','community festival','local event morning','neighborhood community','community meetup celebration'],
    badSignals: ['nightclub event alcohol','bar party night','adult night event','vip exclusive bar','corporate gala commercial only'],
    pexelsQuery: 'community celebration gathering people morning outdoor',
  },
  corporate_wellness: {
    searchQueries: [
      '"workplace wellness" morning community employee',
      '"employee morning" routine wellness program',
      '"corporate wellness" morning program community',
    ],
    searchChips: [
      { label: 'workplace wellness morning', query: '"workplace wellness" morning community employee' },
      { label: 'employee morning routine', query: '"employee morning" routine wellness program' },
      { label: 'corporate wellness program', query: '"corporate wellness" morning program community' },
      { label: 'office morning culture', query: 'office morning culture wellness community employee' },
    ],
    goodSignals: ['workplace wellness','employee wellness','corporate morning','office routine wellness','team wellness','morning program company','employee community','work life balance morning'],
    badSignals: ['hustle culture grind','overwork productivity hack only','side hustle money','career ladder hustle','toxic productivity'],
    pexelsQuery: 'office morning wellness employee community',
  },
  other: {
    searchQueries: [
      '"sober lifestyle" morning community wellness',
      '"third place" community morning local',
      '"morning culture" wellness community urban',
    ],
    searchChips: [
      { label: 'sober lifestyle morning', query: '"sober lifestyle" morning community wellness' },
      { label: 'third place community', query: '"third place" community morning local' },
      { label: 'morning culture wellness', query: '"morning culture" wellness community urban' },
      { label: 'wellness community urban', query: 'wellness community morning lifestyle urban' },
    ],
    goodSignals: ['sober lifestyle','third place','morning culture','wellness community','conscious lifestyle','mindful morning','urban wellness','slow morning','intentional living morning'],
    badSignals: ['alcohol nightlife','hustle grind money obsession','fame followers viral hack only','fast life toxic'],
    pexelsQuery: 'morning wellness lifestyle urban community aesthetic',
  },
}

// ─── Korean Labels ────────────────────────────────────────────────

export const PROGRAM_LABEL_KO: Record<string, string> = {
  daily_coffee_chat: '커피챗',
  espresso_run: '에스프레소런',
  book_dive: '북다이브',
  morning_rave: '모닝레이브',
  smcc_talk: 'SMCC 토크',
  smcc_cinema: '시네마',
  breakfast: '브렉퍼스트',
  sunrise_meetup: '선라이즈 밋업',
  travel_trip: '트립',
  wellness_class: '웰니스 클래스',
  global_meetup: '글로벌 밋업',
  brand_collaboration: '브랜드 협업',
  community_event: '커뮤니티 이벤트',
  corporate_wellness: '기업 웰니스',
  other: '웰니스 라이프',
}

// ─── SMCC Mood Keywords ───────────────────────────────────────────

const MOOD_POSITIVE = [
  'morning','community','together','meetup','gathering','people','local','wellness',
  'routine','ritual','connection','offline','café','cafe','outdoor','sunrise','early',
  'mindful','아침','커뮤니티','모임','함께','루틴','웰니스','소버','sober',
]

const MOOD_NEGATIVE = [
  'nightlife','nightclub','alcohol','bar ','hustle','grind','make money','investment',
  'crypto','income tips','sales conversion','viral hack','sexy','pickup','dating tips',
]

const GLOBAL_BAD = [
  'clickbait','인생이바뀐','무조건','상위1%','make money fast','get rich quick',
  '살빠지는','before and after body only','nightclub','alcohol party','hookup tips',
  'shocking transformation',
]

// ─── Scoring Functions ────────────────────────────────────────────

export function calcProgramFitScore(
  title: string,
  description: string,
  tags: string[],
  programType: string
): number {
  const config = PROGRAM_CONFIGS[programType] ?? PROGRAM_CONFIGS['other']
  const text = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase()

  const badMatches = config.badSignals.filter((s) => text.includes(s.toLowerCase())).length
  if (badMatches >= 2) return 0

  const goodMatches = config.goodSignals.filter((s) => text.includes(s.toLowerCase())).length
  const goodScore = Math.min(85, Math.round((goodMatches / Math.max(config.goodSignals.length * 0.25, 1)) * 85))
  const badPenalty = badMatches * 25

  return Math.max(0, goodScore - badPenalty)
}

export function calcSmccMoodScore(
  title: string,
  description: string,
  tags: string[]
): number {
  const text = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase()

  const posMatches = MOOD_POSITIVE.filter((k) => text.includes(k)).length
  const negMatches = MOOD_NEGATIVE.filter((k) => text.includes(k)).length

  const base = Math.min(80, Math.round((posMatches / 3) * 100))
  const penalty = negMatches * 30

  return Math.max(0, Math.min(100, base - penalty + 20))
}

export function calcContentStructureScore(
  title: string,
  description: string,
  likeCount: number,
  viewCount: number
): number {
  let score = 30

  if (description.length > 100) score += 15

  const engagementRate = viewCount > 0 ? likeCount / viewCount : 0
  if (engagementRate > 0.05) score += 25
  else if (engagementRate > 0.02) score += 15
  else if (engagementRate > 0.005) score += 5

  if (title !== title.toUpperCase()) score += 5
  if (title.length >= 20 && title.length <= 100) score += 10
  const exclamationCount = (title.match(/!/g) ?? []).length
  if (exclamationCount <= 2) score += 5

  return Math.max(0, Math.min(100, score))
}

export function calcGrowthPotentialNew(
  viewCount: number,
  subscriberCount: number,
  publishedAt: string
): number {
  const ratio = subscriberCount > 0 ? viewCount / subscriberCount : 0
  const ratioScore = Math.min(40, Math.round(ratio * 20))

  const daysSince = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24)
  const recencyScore = daysSince < 14 ? 30 : daysSince < 60 ? 20 : daysSince < 180 ? 10 : 5

  const viewBonus = viewCount > 100000 ? 15 : viewCount > 10000 ? 8 : 3

  return Math.min(100, ratioScore + recencyScore + viewBonus)
}

export function calcCringeRiskNew(
  title: string,
  description: string,
  programType: string
): number {
  const text = (title + ' ' + description).toLowerCase()
  const config = PROGRAM_CONFIGS[programType] ?? PROGRAM_CONFIGS['other']

  const globalMatches = GLOBAL_BAD.filter((k) => text.includes(k.toLowerCase())).length
  const programBadMatches = config.badSignals.filter((s) => text.includes(s.toLowerCase())).length

  return Math.min(100, globalMatches * 30 + programBadMatches * 15)
}

export function calcFinalScore(scores: {
  programFitScore: number
  smccMoodScore: number
  contentStructureScore: number
  growthPotentialScore: number
  cringeRiskScore: number
}): number {
  return (
    scores.programFitScore * 0.45 +
    scores.smccMoodScore * 0.25 +
    scores.contentStructureScore * 0.15 +
    scores.growthPotentialScore * 0.10 -
    scores.cringeRiskScore * 0.20
  )
}

export function shouldFilter(scores: {
  programFitScore: number
  smccMoodScore: number
  cringeRiskScore: number
  finalScore: number
}): boolean {
  return (
    scores.programFitScore < 50 ||
    scores.smccMoodScore < 50 ||
    scores.cringeRiskScore > 60 ||
    scores.finalScore < 25
  )
}

// ─── Result Status Classification ─────────────────────────────────

export type ResultStatus = 'good_reference' | 'adaptable' | 'weak_match' | 'rejected' | 'visual_mood_reference'

export const STATUS_LABELS: Record<ResultStatus, string> = {
  good_reference: 'Good Reference',
  adaptable: 'Adaptable',
  weak_match: 'Weak Match',
  rejected: 'Rejected',
  visual_mood_reference: 'Visual Mood Reference',
}

export const STATUS_COLORS: Record<ResultStatus, string> = {
  good_reference: '#00b1cd',
  adaptable: '#7C3AED',
  weak_match: '#FDB334',
  rejected: '#9ca3af',
  visual_mood_reference: '#3D7060',
}

// 명확히 부적합한 경우만 강제 Rejected 처리 (술/나이트클럽, 헌팅/소개팅, 돈벌기/투자/강의팔이, 제품 리뷰만, 운동 기록 경쟁만)
const HARD_REJECT_SIGNALS = [
  'nightclub', 'alcohol party', 'bar crawl', 'drinking game', 'club night', 'shots bar', 'afterparty hookup', 'drunk night',
  'pickup line', 'speed dating', 'tinder', 'hookup', 'dating meetup only',
  'make money fast', 'get rich quick', 'investment tips', 'crypto trading', 'side hustle income', 'sell course', '강의 판매', '투자 추천', '돈버는법',
  'unboxing review only', 'product review only', 'haul review only',
  'personal record PR only', 'race time ranking', 'marathon record only', 'competition ranking only',
]

export function isHardRejected(title: string, description: string): boolean {
  const text = (title + ' ' + description).toLowerCase()
  return HARD_REJECT_SIGNALS.some((s) => text.includes(s.toLowerCase()))
}

export function classifyStatus(
  scores: { finalScore: number; cringeRiskScore: number },
  hardRejected: boolean
): ResultStatus {
  if (hardRejected) return 'rejected'
  if (scores.finalScore >= 70 && scores.cringeRiskScore <= 45) return 'good_reference'
  if (scores.finalScore >= 45 && scores.cringeRiskScore <= 70) return 'adaptable'
  if (scores.finalScore >= 25) return 'weak_match'
  return 'rejected'
}

// ─── Cringe Risk Level (경고 기준, 숨김 기준 아님) ──────────────────

export type CringeLevel = 'safe' | 'caution' | 'danger'

export const CRINGE_LABELS: Record<CringeLevel, string> = {
  safe: '안전',
  caution: '주의',
  danger: '위험',
}

export function cringeLevel(score: number): CringeLevel {
  if (score <= 40) return 'safe'
  if (score <= 70) return 'caution'
  return 'danger'
}

// ─── Low Score Reason ──────────────────────────────────────────────

export function generateLowScoreReason(scores: {
  programFitScore: number
  smccMoodScore: number
  cringeRiskScore: number
}): string {
  const reasons: string[] = []
  if (scores.programFitScore < 50) reasons.push('프로그램 핵심 키워드와의 일치도가 낮아요')
  if (scores.smccMoodScore < 50) reasons.push('아침·커뮤니티 무드 신호가 부족해요')
  if (scores.cringeRiskScore > 60) reasons.push('자극적이거나 부적합할 수 있는 표현이 감지됐어요')
  return reasons.join(' · ')
}

// ─── Reason Text Generator ────────────────────────────────────────

const SMCC_APPLY_BY_PROGRAM: Record<string, string> = {
  daily_coffee_chat: '커피챗 프로그램의 아침 만남 콘셉트에 바로 적용할 수 있어요.',
  espresso_run: '에스프레소런의 소셜 러닝 분위기를 표현하는 데 참고하세요.',
  book_dive: '북다이브의 조용한 아침 독서 모임 감성을 담아낼 수 있어요.',
  morning_rave: '모닝레이브의 소버 댄스 파티 에너지를 보여줄 수 있어요.',
  smcc_talk: 'SMCC 토크의 대화 살롱 분위기를 콘텐츠에 녹여보세요.',
  smcc_cinema: '시네마 프로그램의 아침 영화 커뮤니티 감성을 참고하세요.',
  breakfast: '브렉퍼스트 밋업의 낯선 사람들과의 아침 식사 콘셉트에 활용하세요.',
  sunrise_meetup: '선라이즈 밋업의 새벽 야외 모임 분위기를 담을 수 있어요.',
  travel_trip: '트립 프로그램의 커뮤니티 여행 감성을 보여줄 수 있어요.',
  wellness_class: '웰니스 클래스의 아침 야외 수련 분위기를 참고하세요.',
  global_meetup: '글로벌 밋업의 다국적 아침 커뮤니티 감성을 표현해보세요.',
  brand_collaboration: '브랜드 협업의 웰니스 체험 이벤트 참고자료로 활용하세요.',
  community_event: '커뮤니티 이벤트의 아침 축제 분위기를 콘텐츠에 녹여보세요.',
  corporate_wellness: '기업 웰니스 프로그램의 직장 아침 루틴 콘텐츠에 활용하세요.',
  other: 'SMCC의 도시 웰니스 라이프 감성을 담아내는 데 참고하세요.',
}

export function generateReasonTexts(
  video: YouTubeVideo,
  programType: string,
  scores: { programFitScore: number; smccMoodScore: number }
): { whyRecommended: string; smccApplyPoint: string } {
  const config = PROGRAM_CONFIGS[programType] ?? PROGRAM_CONFIGS['other']
  const text = (video.title + ' ' + video.description + ' ' + video.tags.join(' ')).toLowerCase()

  const matchedSignals = config.goodSignals.filter((s) => text.includes(s.toLowerCase())).slice(0, 2)
  const moodSignals = MOOD_POSITIVE.filter((k) => text.includes(k)).slice(0, 2)

  let whyRecommended = ''
  if (matchedSignals.length >= 2) {
    whyRecommended = `"${matchedSignals[0]}", "${matchedSignals[1]}" 등 프로그램 핵심 키워드가 포함된 콘텐츠예요.`
  } else if (matchedSignals.length === 1 && moodSignals.length >= 1) {
    whyRecommended = `"${matchedSignals[0]}" 시그널과 SMCC 아침 커뮤니티 감성이 잘 맞아요.`
  } else if (scores.smccMoodScore >= 70) {
    whyRecommended = '아침 커뮤니티 무드와 잘 맞는 콘텐츠로 참고 가치가 높아요.'
  } else if (scores.programFitScore >= 60) {
    whyRecommended = '이 프로그램 유형에 적합한 주제와 분위기를 가진 콘텐츠예요.'
  } else {
    whyRecommended = '브랜드 무드와 유사한 감성의 콘텐츠예요.'
  }

  const smccApplyPoint = SMCC_APPLY_BY_PROGRAM[programType] ?? SMCC_APPLY_BY_PROGRAM['other']

  return { whyRecommended, smccApplyPoint }
}

export type { YouTubeVideo }
