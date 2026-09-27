---
name: problem-solving
description: |
  [책임 경계] 문제 정의·구조화 전담 — SCQ로 Key Question을 도출하고 3-Test로 이슈화, 로직트리(5유형)로 분해해 가설·Work Plan까지 산출하는 PSA(Problem Solving Approach) 스킬. 리서치 실행·사실검증은 gil:research-verify가 담당 트리거: "문제 정의해줘", "이슈 정리해줘", "로직트리 짜줘"
version: "2.5.0"
---

# problem-solving — PSA 기반 문제 구조화 스킬

## 스킬 개요(상세)

모호한 비즈니스 문제를 받아 전략 컨설팅의 PSA(Problem Solving Approach) 방법론으로 **문제 정의 → 이슈화 → 로직트리 분해 → 가설·필요근거 → Work Plan**까지 구조화한다. 이 스킬은 "무엇을 생각할지"(Framing·Designing)를 담당하고, "증거를 어떻게 모으고 검증할지"(Gathering·Interpreting)는 `gil:research-verify`로 위임한다.

추가 트리거 예시: "Key Question 뽑아줘", "이슈트리 만들어줘", "가설이랑 검증 계획 세워줘", "Work Plan 짜줘", "이 문제 구조화해줘", "muammoni tuzilmalash" (문제 구조화, UZ)

## 책임 경계

| 담당 | 위임 |
|---|---|
| SCQ·Key Question 도출 | 웹 리서치·출처 검증 → `gil:research-verify` |
| 이슈화(3-Test)·로직트리·가설·QDT | 반론 심층 검증 → `gil:devil-review` |
| Work Plan(WBS) 설계 | 데이터 분석 QA → `gil:validate-data` |
| 스토리라인 종합 | 문서화 → `gil:docx-generator`·`gil:pptx-designer`·`gil:html-report` |

## 산출물 등급(모드)

| 모드 | 산출물 | 범위 |
|---|---|---|
| ⚡초안 (기본) | 1페이지 문제정의서 | SCQ + Key Question + 이슈 후보 3안(3-Test 판정표 포함) |
| ◐작업본 | + 구조화 패키지 | 로직트리(유형 명시) + 가설·QDT + Evidence 목록 |
| ◆최종본 | + 실행 패키지 | Work Plan 6컬럼 + 스토리라인 + QA 체인(`gil:ai-slop-reviewer` → `gil:korean-spell-check`(민감도 public 시) → `gil:humanize-korean`(마지막, Phase 6 최종 검수)) |

사용자가 등급을 지정하지 않으면 ⚡초안으로 시작하고, 완료 시 상위 등급 승격을 1줄로 제안한다.

## 워크플로

### 0단계. 문제 유형 라우팅 (Cynefin 참조)

착수 전 문제의 성격을 판정해 트랙을 정한다.

- **Clear/Complicated**(인과가 분석 가능): 본 스킬 표준 트랙 진행
- **원인불명 진단형**("왜 이런 일이?"): Why Tree 트랙 + `references/tree-patterns.md`의 원인규명 도구(5 Whys·피시본·IS/IS-NOT) 우선
- **Complex**(실험이 필요한 창발적 문제): 구조화는 하되 "분석으로 답이 나오는 문제가 아님"을 명시하고 가설-실험 설계로 전환 제안
- **의사결정 준비 완료형**: Decision Tree 트랙으로 단축

### 1단계. Key Question 도출 (SCQ)

`references/templates.md`의 SCQ 표를 채운다.

- **Situation**: 논란의 여지가 없는 검증 가능한 사실만 (배경)
- **Complication**: 안정 상태를 깨는 문제·GAP (프로젝트가 생긴 이유)
- **Question**: Complication에서 자연스럽게 파생되는 질문 (What should we do? / What we need to know?)

게이트: S에 주장·추정이 섞이면 안 됨. Q가 C 없이 튀어나오면 논리 비약. **문제를 재정의할 여지("옳은 문제인가?")를 1회 점검**하고, 더 나은 프레임이 보이면 대안 Q를 병기한다.

### 2단계. 이슈화 (Key Issues 도출)

Key Question을 이슈 표준 문형으로 변환한다.

> **"[문제적 사실]인 상황에서, [대안 A를 해야 하는가 / A와 B 중 무엇을 택해야 하는가]?"**

- Issue = Problematic Fact("그래서 뭐가 문제인데?") + Actionable Direction("그래서 뭐 할 건데?")
- 서로 다른 각도의 **3안**을 만들고 각 안에 **3-Test 판정표**를 붙인다 (`references/issue-gates.md`):
  - **Fact Test**: 검증 가능한 문제적 사실이 문장에 들어 있는가
  - **Fork Test**: 답이 대안 간 선택으로 떨어지는가
  - **Action Test**: 답이 나오면 곧바로 무엇을 할지 결정되는가
- 추정형 질문(가치·규모·전망)은 이슈가 아니라 분석 과제 — 의사결정 기준(hurdle)과 결합해 이슈화한다
- Problematic Fact가 미확인 상태면 [추정] 표기하고, 검증 항목으로 `gil:research-verify`에 넘길 목록을 만든다

### 3단계. Issue Break-down (로직트리)

- 먼저 **트리 유형을 선택·명시**한다 (`references/tree-patterns.md`의 5유형 표: What/Why/Issue/Hypothesis/How). 유형 혼용은 초기 혼선의 최다 원인 — 한 트리에 한 유형
- 분해 게이트 4종을 매 레벨 적용:
  1. **MECE** — 중복·누락 검사 (수직 완전성)
  2. **Actionable** — 데이터로 답할 수 있고, 답이 행동을 결정하는가
  3. **Relevant** — 하위의 답이 상위의 답에 직접 기여하는가 (So what 다리)
  4. **개수** — 레벨당 sub-issue 7개 이하, 권장 3~5개
- 절단면(1·2레벨 구분)이 비즈니스의 실제 동인(원가구조·시장동학·의사결정 로직)을 포착하는지 확인 (Force at Work). 필요 시 검증된 프레임워크(5 Forces·7S 등)를 분기에 적용하되, "칸 채우기"가 아니라 도출할 결론을 염두에 둔다
- 레벨 간 논리는 **So What?(하향) / Why So?(상향)**로 검증
- 우선순위화: 트리 완성 후 임팩트가 작거나 분석 불가능한 가지는 **가지치기(prune)**하고 사유를 1줄 기록

### 4단계. 가설 수립 + QDT + Evidence 목록

- 말단 sub-issue별로 가설(Yes/No + because)을 상정
- **QDT(Quick and Dirty Test)** 2질문으로 가설 품질 검사: ① 이 가설이 참이 되려면 어떤 전제가 필요한가? ② 이 가설을 틀리게 할 요인은 무엇인가? — 전제가 약하면 가설 재작성
- 가설별로 입증/반증에 필요한 **Evidence 목록**을 작성 (80:20 — 결과에 막대한 영향을 미치는 핵심요소 위주)

### 5단계. Work Plan (◆최종본)

`references/templates.md`의 6컬럼 표(Issue / 가설 / 분석 / Source / 책임자·일정 / 결과물)를 작성한다. Evidence 수집·검증 실행은 `gil:research-verify`를 호출한다:

> 체이닝 예시: "Work Plan의 Evidence 목록을 gil:research-verify로 넘겨 출처 병기·[미검증] 태그 규율로 수집·검증한 뒤, 결과를 받아 가설 판정과 스토리라인(피라미드 구조)을 갱신한다."

최종 산출물 상단에는 핵심 메시지 1문장(피라미드 구조)을 배치한다.

## 검증 3원칙 (산출물 말미에 명시)

1. 본 산출물의 Problematic Fact 중 [추정] 항목은 검증 전 문서다 — 실제 프로젝트에서는 검증된 사실로 대체해야 한다
2. 가설 판정은 Evidence 수집·검증(`gil:research-verify`) 이후에만 한다
3. 이슈 선택·가지치기·최종 판단은 사람의 일이다 — 스킬은 판단의 재료를 구조화할 뿐이다

## References

| 파일 | 내용 |
|---|---|
| `references/psa-core.md` | PSA 4단계·세부 5단계 정본 (방법론 전문) |
| `references/issue-gates.md` | 이슈 문형·3-Test·추정형 처리·QDT·판정 예시 |
| `references/tree-patterns.md` | 트리 5유형·MECE 실패 유형·Actionable/Relevant 판정·프레임워크 카탈로그·예시 트리 |
| `references/templates.md` | SCQ·문제정의서·Issue 4행·Work Plan 6컬럼 양식 |
| `references/uz-problem-solving.md` | UZ 듀얼 컨텍스트 |

## 출처

사내 PSA 교육자료(전정우, IQVIA Strategy Consulting, 2026-08) 방법론 재구성 — 개인 로컬 전용. 보강: Barbara Minto 《The Pyramid Principle》, Charles Conn & Robert McLean 《Bulletproof Problem Solving》, Ethan Rasiel & Paul Friga 《The McKinsey Mind》, 아타카 카즈토 《이슈에서 시작하라》, 우치다 카즈나리 《가설사고》·《논점사고》, Dave Snowden(Cynefin), Kepner-Tregoe, 테루야 하나코 《로지컬 씽킹》 — 모두 방법론 개념의 clean-room 재구성이며 원문 복제 없음.
