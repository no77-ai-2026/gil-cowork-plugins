---
name: design-slop-check
description: |
  Claude Design에서 생성된 결과 카피(헤드라인·서브헤드·CTA·feature·푸터)를 AI 슬롭 패턴으로 검수합니다 트리거: "Claude Design 카피 검수", "AI 슬롭 점검", "AI 티 나는 카피 확인"
version: "2.4.0"
---
## 스킬 개요(상세)

Claude Design에서 생성된 결과 카피(헤드라인·서브헤드·CTA·feature·푸터)를 AI 슬롭 패턴으로 검수합니다.
영문(Reimagine your·Unleash your potential 등)과 한국어(혁신적인·차세대·재정의하는 등) 진부 표현을 검출하고 수정안을 제안합니다.
후속으로 gil:humanize-korean 체이닝을 권장합니다.

다음과 같은 요청 시 반드시 이 스킬을 사용하세요:
- "Claude Design 카피 검수"
- "AI 슬롭 점검"
- "AI 티 나는 카피 확인"
- "디자인 카피 후처리"
- "humanize 직전 검수"

# design-slop-check — Claude Design 카피 AI 슬롭 검수

## 개요

Claude Design은 카피도 생성합니다. 디자인 시스템에 voice가 잘 등록되어 있어도, 영문·한국어 모두에서 **AI 티가 나는 진부 표현**이 슬쩍 섞이는 경우가 많습니다. 이 스킬은 패턴 사전 + 컨텍스트 추론으로 그런 표현을 짚어내고, 자연스러운 대안을 제안합니다.

## 트리거 키워드

Claude Design 카피, AI 슬롭, AI 티, 진부 표현, humanize 직전, 디자인 카피 검수, slop check

## 검수 대상

다음 텍스트를 입력으로 받습니다.

| 입력 형태 | 예시 |
|---|---|
| 단일 카피 텍스트 | "Reimagine your workflow with AI" |
| 카피 모음 | Hero·Feature·CTA·Footer를 묶어 한 번에 |
| Claude Design 결과물 전체 | PDF·HTML에서 추출한 텍스트 일괄 |
| Claude Design 채팅 캡처 | 사용자가 카피만 골라 붙여넣은 것 |

## AI 슬롭 패턴 사전

### 영문 진부 표현 (Tier 1 — 거의 항상 슬롭)

- "Reimagine your [X]"
- "Unleash your [X]" / "Unleash the power of [X]"
- "Empower your team to [X]"
- "Transform the way you [X]"
- "Supercharge your [X]"
- "Revolutionize [X]"
- "Next-generation [X]"
- "Cutting-edge [X]"
- "Powered by AI"
- "Built for the future of [X]"
- "Where [X] meets [Y]" (특히 마케팅 헤드라인)

### 영문 의심 표현 (Tier 2 — 문맥에 따라)

- "Game-changing", "Best-in-class"
- "Seamlessly", "Effortlessly", "Intuitively"
- "Leverage", "Synergy"
- "World-class", "State-of-the-art"
- "[X], simplified" / "[X], reimagined" / "[X], unleashed"

### 한국어 진부 표현 (Tier 1)

- "혁신적인 [X]"
- "차세대 [X]"
- "재정의하는 [X]"
- "새로운 패러다임"
- "AI 기반의 [X]"
- "한 차원 높은 [X]"
- "지금까지 없던 [X]"
- "당신의 [X]를 변화시킬"
- "이제는 [X]의 시대"

### 한국어 의심 표현 (Tier 2)

- "원활하게", "손쉽게", "직관적으로"
- "최고의", "최첨단의"
- "강력한", "막강한"
- "한 번에", "단숨에"
- "더 이상 [X]에 시달리지 마세요"

### 카피 구조 안티패턴

- **A B C D**: "Faster. Smarter. Better. Simpler." 식 단어 나열
- **콜론 후 강조**: "[Headline]: The X that finally Y"
- **숫자 강조 없는 통계 주장**: "Trusted by thousands of customers"
- **불필요한 부정 → 긍정**: "No more [X]. Just [Y]."

## 워크플로우

### 1단계 — 카피 수집

사용자가 검수할 카피를 입력합니다.

```
입력 옵션:
- 단일 텍스트 붙여넣기
- 파일 경로 (HTML·PDF·Markdown·텍스트)
- Claude Design URL (Export 후 공유 URL이 있다면)
```

### 2단계 — 언어 감지

영문·한국어·혼합 중 자동 판별. 각 언어의 사전을 적용합니다.

### 3단계 — 패턴 매칭

| 처리 단계 | 결과 |
|---|---|
| Tier 1 정규식 매칭 | 거의 확실한 슬롭 — 자동 플래그 |
| Tier 2 정규식 매칭 | 문맥 확인 필요 — 후속 추론 |
| 카피 구조 분석 | A B C D 나열, 콜론 강조 패턴 검출 |
| 통계 주장 검출 | 숫자 근거 없는 "수천", "수만" 등 |
| 자가 칭찬 검출 | "혁신적", "최고의" 등 자기 주장 표현 |

### 4단계 — 컨텍스트 추론

Tier 2 표현은 **문맥**에 따라 슬롭 여부가 달라집니다. 다음을 고려합니다.

- 산업 맥락: 핀테크에서 "원활하게"는 평범, SaaS 마케팅에서는 슬롭일 수 있음
- 브랜드 톤: 진중한 브랜드에서 "강력한"은 어색, 활기찬 브랜드에서는 자연
- 사용자 페르소나: 임원 대상 카피에서 "손쉽게"는 부적합

가능하면 사용자에게 산업·브랜드 톤을 묻습니다 (AskUserQuestion).

### 5단계 — 수정 제안

각 검출 항목마다:

```
원본: "Reimagine your workflow with AI-powered automation"
이유: "Reimagine your"는 거의 모든 AI 도구가 쓰는 진부 표현
대안 3개:
  1. "[제품명]은 매일 반복하는 [구체적 작업]을 자동화합니다"
  2. "[구체적 작업]에 쓰는 시간을 [숫자] 줄이는 자동화 도구"
  3. "[페르소나]를 위한 [핵심 가치] 자동화"
선호: 1번 — 동사로 시작 + 구체적 작업 명시
```

### 6단계 — 검수 리포트 생성

```markdown
# Claude Design 카피 슬롭 검수

## 한눈에 보기

| 항목 | 결과 |
|---|---|
| 검수한 카피 수 | N |
| Tier 1 슬롭 발견 | N건 |
| Tier 2 의심 표현 | N건 |
| 구조 안티패턴 | N건 |
| 총 권장 수정 | N건 |

## Tier 1 슬롭 (필수 수정)

### Hero 헤드라인
- 원본: [원본 카피]
- 문제: [패턴]
- 대안: [3개]
- 추천: [1개]

### CTA
- 원본: ...

## Tier 2 의심 표현 (문맥 확인)

- 원본: ...
- 문제: ...
- 결정 요청: [컨텍스트 묻기]

## 구조 안티패턴

- 패턴: A B C D 나열
- 위치: Feature 섹션 3번째 카드
- 원본: "Faster. Smarter. Better. Simpler."
- 문제: 의미 없는 형용사 4개 나열
- 대안: 1개 구체적 결과로 — "고객 응답 시간을 12시간에서 30분으로 단축"

## 후속 처리 추천

1. 위 수정을 Claude Design 채팅에 다시 요청
2. 한국어 카피 자연화 → gil:humanize-korean → 최종 검수(◆최종본, humanize Phase 6)
3. 영문 카피 후속 검수 → 영문 카피 베스트 프랙티스 가이드
```

## 출력 형식

검수 결과는 위 마크다운 리포트로. 사용자가 그대로 Claude Design 채팅에 붙여 넣어 수정 요청할 수 있습니다.

## 사용 예시

### 예시 1 — Hero + CTA

```
입력:
- Hero: "Reimagine the way your team collaborates"
- CTA: "Get started for free"

결과:
- Hero: Tier 1 슬롭 — "Reimagine the way" 패턴
  대안:
  1. "팀이 매일 쓰는 N개 도구를 하나로 합칩니다"
  2. "회의를 [숫자] 줄이는 협업 도구"
  3. "[페르소나]를 위한 협업 워크플로우"
- CTA: 평범 — "Get started for free"는 슬롭 아님, 유지

권장 수정:
- Hero를 1번으로 교체 → 다시 Claude Design에서 시안 갱신
```

### 예시 2 — 한국어 마케팅 페이지

```
입력:
- Hero: "혁신적인 AI 기반의 차세대 마케팅 자동화"
- 서브: "당신의 마케팅을 한 차원 높여 줄 솔루션"
- Feature: ["빠르게", "쉽게", "정확하게", "강력하게"]

결과:
- Hero: Tier 1 슬롭 3개 ("혁신적인", "AI 기반의", "차세대") 동시 사용
  대안:
  1. "주간 보고서 자동 생성·발송 — 30분 작업이 0분"
  2. "[고객 사례] 처럼 채널 광고 운영 시간 [N시간 → M시간]"
  3. "마케팅 자동화로 [구체적 결과]"
- 서브: Tier 1 슬롭 ("한 차원 높여")
- Feature: 구조 안티패턴 — A B C D 부사 나열
  대안: 각각 구체적 결과·수치로 교체
```

### 예시 3 — 혼합 (영문+한국어)

```
입력:
- 영문 Hero + 한국어 서브
- 영문 CTA + 한국어 푸터

결과: 언어별 사전 적용, 각각 분석
```

## 주의사항

### Do

- Tier 1은 거의 항상 수정 권고 — 자가 검열로 사용 가능
- Tier 2는 문맥 확인 — 임의 판단 금지
- 대안 카피는 **구체적 결과·수치**를 포함하도록 — 진부 표현은 추상적이라 슬롭
- 후속으로 gil:humanize-korean 체이닝 권장 (한국어 결과)

### Don't

- "AI 슬롭"이라는 이유로 모든 영어 카피 비추 금지 — 일부 표현은 업계 표준
- 사용자 브랜드의 의도된 톤을 슬롭으로 오인하지 말 것 — 컨텍스트 확인 우선
- 자동 일괄 수정 금지 — 항상 사용자 검토를 거쳐 적용

## 관련 스킬

| 스킬 | 사용 시점 |
|---|---|
| `gil:humanize-korean` | 후속: 한국어 카피 자연화 (10대 카테고리 × 40+ AI 티 패턴 SSOT) |
| `gil:ai-slop-reviewer` | 후속: 모든 텍스트 산출물의 일반 AI 슬롭 검수 |
| `gil-creative:design-brief` | 선행: 더 좋은 카피가 나오도록 브리프 정돈 |
| `gil-creative:campaign-planner` | 보조: 캠페인 카피의 톤·메시지 일관성 검토 |
| `gil-creative:copywriting` | 대안: Claude Design 외부에서 카피 직접 생성 |

## 이미지 AI 티 체크리스트 (v2.4.0)

카피뿐 아니라 **생성 이미지**(실사 인물·제품·배경)도 같은 스킬로 검수한다. 기준 문법은 `gil-creative:image-bridge/references/photoreal-prompt-grammar.md`(8칸 문법·AI 티 제거 어휘집).

| # | 항목 | 검출 신호 | 교정 어휘 (재생성 프롬프트에 추가) |
|---|---|---|---|
| 1 | 플라스틱 피부 | 모공·솜털 없음, 왁스 같은 광택 | `visible pores, fine peach fuzz, subtle imperfections` |
| 2 | 완벽 대칭 | 얼굴 좌우 거울상, 눈 크기 동일 | `avoid perfect symmetry, natural asymmetry` |
| 3 | HDR 광택 | 그림자·하이라이트 모두 살아 있는 비현실 계조 | `no HDR, smooth highlight roll-off, exposed slightly under` |
| 4 | 과선명 | 머리카락 한 올씩 날카로움, 윤곽 헤일로 | `slightly lowered digital sharpness, no over-sharpening, film grain` |
| 5 | 불가능한 손가락 | 6개 손가락, 융합 관절, 뒤틀린 엄지 | 손을 소품 잡는 동작으로 고정 `hand wrapped around the cup` |
| 6 | 읽을 수 없는 글자 | 간판·라벨의 깨진 문자 | `no readable text, signage abstract and unreadable` 또는 `authorized_marks` 원본 주입 |
| 7 | 부유 로고 | 물체 표면과 원근이 맞지 않는 로고 | 로고는 텍스트로 그리지 않고 참조 이미지 재현으로 |
| 8 | 균일 조명 | 그림자 방향 없음, 소프트박스 티 | `mixed color temperatures, bounce from (surface)` |
| 9 | 무한 심도 | 전경·배경 모두 선명 | `f/1.8~2.8, shallow depth of field, creamy bokeh` |
| 10 | 과포화 | 피부 주황·하늘 청록 | `natural saturation, Kodak Portra 400 / Fujifilm Superia 400` |
| 11 | 복붙 배경 인물 | 같은 얼굴·자세의 행인 반복 | `patrons as soft bokeh silhouettes, no duplicated people` |
| 12 | 워터마크·서명 | 모서리의 흐릿한 글자·문양 | `no watermark, no signature` (SynthID 등 비가시 워터마크는 제외) |

**판정 방식**
- 항목당 `pass | minor | critical`. 5(손가락)·6(글자)·7(로고)·12(워터마크)는 발견 즉시 **critical** — 광고 게재 불가.
- critical 0개 + minor 2개 이하면 accepted 후보. minor 3개 이상이면 교정 1회(코어 `creative-quality-loop.md`의 초기 1 + 교정 1 상한).
- 교정 프롬프트는 관측된 결함 항목의 교정 어휘만 추가하고, 승인된 포즈·장소·조명은 유지한다.
- 결과는 `media_job.unresolved_defects[]`에 항목 번호로 기록한다. 실사 인물이면 `sensuality_level`과 성인 표기 유무도 함께 확인한다(문법 §5 HARD).
