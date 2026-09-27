---
name: higgsfield-core
description: |
  Higgsfield MCP 이미지·영상 생성의 공유 코어.
  [역할 경계] higgsfield-core=모델 카탈로그·파라미터·비용 공통 정본(직접 트리거 아님). 이미지 생성 요청은 higgsfield-image, 영상 생성 요청은 higgsfield-video가 담당하며 이 스킬을 내부 참조합니다.
version: "2.4.0"
uz: n/a
origin: moai-cowork@61fac40 (v1.2.4, 2026-09-02 동기화)
---

# Higgsfield 코어 (higgsfield-core)

## 스킬 개요(상세)

Higgsfield MCP 이미지·영상 생성의 공유 코어. higgsfield-image / higgsfield-video가
로드하는 SSOT(single source of truth)로, 호출 스키마·라이브 카탈로그 조회 프로토콜·공통 크래프트
규칙(R1–R5)·인터뷰 슬롯·잡 수명주기를 정의합니다.
다음과 같은 상황에서 로드됩니다:
- higgsfield-image 또는 higgsfield-video가 호출 계약을 참조할 때
- Higgsfield 모델의 파라미터를 하드코딩하지 않고 런타임 조회해야 할 때
- namespace(mcp__higgsfield__ vs mcp__claude_ai_higgsfield__)를 런타임 해석해야 할 때
이 스킬은 단독 실행 스킬이 아니라 두 소비 스킬이 참조하는 공유 코어입니다.


> `gil-creative` | 이미지·영상 스킬의 공유 SSOT (참조 전용 코어)

## 개요

이 스킬은 `higgsfield-image`와 `higgsfield-video`가 공통으로 참조하는 코어다. 두 소비 스킬은 호출 계약·조회 순서·공통 규칙을 여기서 가져온다. **핵심 설계 원칙: 파라미터(모델 id·enum·aspect·duration·media role·비용)는 절대 하드코딩하지 않고 런타임에 `models_explore`로 조회한다. 프롬프트 크래프트만 정적으로 큐레이션하고 출처를 단다.**

이 설계가 필요한 이유는 두 축이 서로 다른 진실원을 갖기 때문이다:

| 축 | 진실원 | 스킬이 얻는 방법 |
|---|---|---|
| 파라미터 | 라이브 MCP | `models_explore` / `show_marketing_studio` / `presets_show` / `get_cost` (호출 시점) |
| 프롬프트 크래프트 | 모델 벤더 공식 문서 | 계열별 `prompt-craft/*.md` (저술 시점 고정, 출처·Evidence tier 표기) |

## 코어 참조 파일

| 파일 | 역할 |
|---|---|
| `references/call-schema.md` | 중첩 `params{}` 형태 계약, `medias[].role/.value` 규칙, namespace 런타임 해석, 존재하지 않는 파라미터 안티패턴 |
| `references/catalog-protocol.md` | `models_explore` 등 라이브 조회 도구와 표준 순서(REQ-010), 범위 밖 모델 폴백 |
| `references/universal-rules.md` | R1–R5 벤더 교차 공통 규칙 |
| `references/interview-schema.md` | 크래프트 파일이 소비하는 수집 슬롯 |
| `references/job-lifecycle.md` | `get_cost` 프리플라이트, `credits` 규칙, `adjustments` 리드백, 폴링·오류 분류, 잔액 정지 |
| `references/media-job-ledger.md` | 산출물 1개당 `media_job` 원장 레코드, 상태 전이 규칙(ID 안정·미확인 응답 재제출 금지·accepted는 검수만), technical/creative 게이트 분리 |
| `references/creative-quality-loop.md` | `creative_acceptance` 계약, 기본 시도 상한 2회, 5단계 검수 순서, 결함 1종 교정·동결, 중단·에스컬레이션 조건 6개 |

## 오케스트레이션 계약 (REQ-010 흐름)

소비 스킬은 다음 순서를 따른다:

1. **의도 → 후보 좁히기** — 사용자 요청에서 계열 후보를 추린다(크래프트 노트 참조). 후보를 좁힐 뿐 파라미터를 단정하지 않는다.
2. **라이브 조회** — `models_explore(action:'get')`로 실제 제약을 가져온다. Marketing Studio 계열이면 `show_marketing_studio`.
3. **비용 프리플라이트** — `get_cost: true`로 `credits` 확인(크레딧 0). `adjustments` 확보.
4. **승인 게이트** — 크레딧이 나가기 전 마지막 정지선. 아래 §유료 생성 승인 게이트.
5. **생성** — 승인된 값으로만 호출.
6. **폴링·리드백** — `job_status`로 `completed`까지, `adjustments`를 사용자에게 보고.

## 유료 생성 승인 게이트

3단계에서 비용을 확인해놓고 곧바로 4단계로 넘어가면, 사용자는 **얼마가 나갔는지 청구된 뒤에 안다.** 프리플라이트는 비용을 *조회*할 뿐 승인을 받지 않는다. 이 게이트가 그 사이를 메운다.

- **[HARD] 크레딧이 소진되는 호출 전에는 반드시 승인을 받는다.** 프리플라이트(`get_cost: true`, 크레딧 0)와 조회 계열 도구는 게이트 대상이 아니다 — 돈이 나가는 호출만이다.
- **[HARD] 승인은 §승인 요청 계약의 경로로 받는다.** 이 스킬과 소비 스킬은 사용자에게 직접 묻지 않으므로(§인터뷰 경계), 게이트에 도달하면 blocker로 반환하고 **오케스트레이터가 대신 묻는다.** 슬롯 수집과 같은 경로다.
- **[HARD] 요약하지 말고 실제로 넘어가는 것을 그대로 보여준다:**

| 보여줄 것 | 왜 필요한가 |
|---|---|
| 프롬프트 **전문** | 사용자가 돈을 내는 대상이 이 문장이다 |
| 모델 id와 계열 | 같은 요청도 모델에 따라 비용·결과가 다르다 |
| 입력 미디어 (`media_id` / `job_id` 목록과 role) | 어떤 이미지가 재료로 들어가는지 |
| 조회로 확정된 옵션 (비율·해상도·길이 등) | 하드코딩이 아니라 조회값임을 확인 |
| 생성 개수 | 개수가 곧 배수 비용이다 |
| `adjustments` — 서버가 조용히 바꾼 값 | 사용자가 요청한 것과 실제 실행될 것의 차이 |
| `get_cost`가 돌려준 **견적 크레딧**과 현재 잔액 | 얼마가 나가고 얼마가 남는지 |

승인 선택지는 이렇게 구성한다:

| 선택지 | 뜻 |
|---|---|
| 이대로 생성 (권장) | 보여준 값 그대로 호출 |
| 고쳐서 다시 견적 | 프롬프트·모델·개수를 바꿔 3단계부터 다시 |
| 취소 | 호출하지 않고 종료. 크레딧 소진 없음 |

- **[HARD] `adjustments`는 승인 전에 보여준다.** 생성이 끝난 뒤 리드백으로 보고하는 것(6단계)은 그 자체로 옳지만, 서버가 요청을 바꿨다는 사실은 **돈이 나가기 전에** 알아야 취소할 수 있다. 6단계 보고가 있다고 해서 이 항목을 생략하지 않는다.
- **[HARD] 실패해도 새 잡을 만들지 않는다.** 생성 호출이 애매하게 실패하면(타임아웃·응답 없음) 재호출하지 않는다. 성공 신호가 없다는 것은 잡이 만들어지지 않았다는 증거가 아니며, 블라인드 재시도는 크레딧을 두 번 쓴다. 반환된 job/request ID가 있으면 `job_status`로 그 잡의 상태를 먼저 확인하고, ID조차 없으면 **생성 이력을 조회할 도구가 실제로 노출돼 있는지 먼저 확인한다** — 코어 `catalog-protocol.md`가 계약으로 두는 것은 `job_status`·`job_display`뿐이고, 이력 조회 도구는 그 목록에 없다. 노출돼 있으면 그것으로 확인하고, **없으면 사용자에게 Higgsfield 대시보드에서 직접 확인해 달라고 요청한다.** **재시도는 언제나 기존 잡 ID에 묶인다** — 없다는 것이 확인된 뒤에만 새로 만든다.
- **[HARD] 대량 배치는 배치 단위로 승인한다.** 한 요청이 여러 잡을 만들면(다중 변형·블록 조립 등) 잡마다 묻지 않고 **전체 계획 + 최대 총 크레딧**을 한 번에 승인받는다. 승인된 계획을 넘는 추가 생성은 새 승인을 받는다.

## namespace 런타임 해석

Higgsfield 도구의 namespace 접두사는 등록 방식에 따라 `mcp__higgsfield__` 또는 `mcp__claude_ai_higgsfield__`다. 스킬은 호출 직전 실제 노출된 namespace를 런타임에 확인하고 그 접두사를 쓴다. 어느 하나를 유일 정답으로 하드코딩하지 않는다. 상세는 `references/call-schema.md` §3.

## 인터뷰 경계

이 스킬(및 서브에이전트)은 사용자에게 직접 질문하지 않는다. 수집할 슬롯을 문서화할 뿐이며, 실제 질문은 오케스트레이터가 진행한다. 슬롯이 비면 구조화된 blocker 보고를 반환한다. 상세는 `references/interview-schema.md`.

## 승인 요청 계약 (런타임 중립)

[HARD] 이 스킬의 게이트는 **특정 도구 이름에 묶이지 않는다.** `AskUserQuestion`은 Claude 런타임의 수단일 뿐이고, Codex를 비롯한 다른 런타임에는 그 도구가 없다. 도구 이름으로 계약을 쓰면 그 도구가 없는 런타임에서 게이트가 **영구 blocker**가 되어, 승인이 필요한 모든 작업이 그냥 멈춘다. 그건 안전이 아니라 고장이다.

승인은 아래 순서로 구한다. 위에서부터 **실제로 가능한 첫 번째**를 쓴다.

**승인의 정의는 수단이 아니라 결과다: 승인서를 사용자에게 그대로 보여주고, 그에 대한 명시적 응답을 받는 것.** 아래는 그 결과를 만드는 경로들이며, 위에서부터 가능한 첫 번째를 쓴다.

| 순위 | 경로 | 조건 |
|---|---|---|
| 1 | 런타임의 구조화 질문 도구 (`AskUserQuestion` 등) | 그 도구가 현재 세션에 노출돼 있을 때 |
| 2 | **일반 대화로 승인서를 제시하고 다음 턴에서 응답을 받는다** | 사용자와 직접 대화 중일 때. 도구가 없어도 이 경로는 언제나 열려 있다 |
| 3 | 구조화 blocker 반환 → 상위 오케스트레이터가 물어봄 | 서브에이전트로 실행 중일 때 |

**[HARD] 런타임의 도구 실행 권한 프롬프트는 승인이 아니다.** 그 프롬프트는 "이 도구를 호출해도 되는가"를 물을 뿐, 게이트가 보여주기로 한 인자·견적·동의 문항을 표시하지 않는다. 승인서 전체와 선택지를 실제로 표시하는 경우에만 2번 경로로 인정한다.

**[HARD] 2번 경로가 있으므로 "물을 수단이 없다"는 상황은 사실상 없다.** 대화가 가능한 곳에서는 언제나 승인서를 글로 제시할 수 있다. fail-closed는 **대화도 blocker 반환도 불가능한 완전 무인 실행**에만 해당한다 — 그 경우에만 실행하지 않고 멈춘다.

**[HARD] 3번을 쓸 때 blocker는 그 자체로 승인 요청서여야 한다.** 상위가 무엇을 물어야 할지 모르면 되물을 수 없고, 그러면 교착된다. 다음을 모두 담는다:

- 승인받을 **행위** 한 줄 (무엇이 되돌릴 수 없는지 / 얼마가 나가는지)
- 게이트가 요구하는 **인자 전부** (요약하지 않은 값)
- **선택지 목록** — 상위가 그대로 사용자에게 제시할 수 있는 형태
- **재개 방법** — 어떤 답을 받으면 무엇을 이어서 실행하는지

**[HARD] 세 경로가 모두 불가능한 무인 실행에서는 실행하지 않는다(fail-closed).** 물을 수단이 없다는 것은 승인을 받았다는 뜻이 아니다. 이때는 "승인 수단이 없어 진행하지 못했다"고 기록하고 멈춘다 — 조용히 진행하지 않는다. 반대로 **대화가 가능한데 도구가 없다는 이유로 멈추는 것도 잘못**이다. 2번 경로를 쓴다.

> 이 계약은 GIL 공통 규칙(`gil:project` `references/core/common-rules.md`)의 승인형 원칙을 게이트 쪽에 적용한 것이다. AskUserQuestion 유무·서브에이전트 여부와 무관하게 같은 승인서·같은 선택지로 동작해야 한다.

## 유료 생성 원장·품질 루프 (v2.4.0 HARD)

모든 유료 생성 소비 스킬(image·video·product·assets·identity)은 다음을 따른다. `higgsfield-explainer`는 설명 전용이라 유료 생성을 실행하지 않으므로 대상이 아니다. 상세는 `references/media-job-ledger.md`와 `references/creative-quality-loop.md`가 정본이다.

- **[HARD] 요청 산출물 1개당 `media_job` 레코드 1개.** `media_job_id`·`output_index`는 생애 동안 불변이며 배치 재시도에도 번호를 다시 매기지 않는다.
- **[HARD] 기본 시도 상한 2회** — 초기 생성 1회 + 결함 1종 교정 1회. 확대는 명시 승인 + 새 `get_cost` 체크포인트가 함께 있어야 한다.
- **[HARD] 미확인 응답(타임아웃·끊김·과금 불명)은 재제출 권한이 아니다.** `submitted`·`processing`은 같은 잡의 조회·취소·회수로만 전이한다. 실패한 인덱스만, 과금 잡이 없음을 증명한 뒤 또는 새 승인 뒤에 재시도한다.
- **[HARD] `accepted`는 검수 후에만.** 제공자 완료 플래그는 `retrieved`까지다. technical/creative 게이트가 둘 다 `pass`여야 하며, must-pass 실패는 평균 점수로 덮지 못한다.
- **[HARD] 승인 전 표시 항목:** 요청 기본 모델 + 실제 해석 모델, 입력과 역할, 프롬프트 전문, 조회 확정 옵션과 `adjustments`, 개수, 제공자 보고 비용·잔액(없으면 `unavailable`), 배치 상한. 프롬프트·입력·모델·옵션·개수 변경은 새 승인 버전이다.
- 모델을 조용히 교체하지 않는다. 정지 이미지 기본 모델·오버라이드 규칙은 `gil-creative:image-bridge/references/image-generation-runtime.md`.
- 영수증·토큰·임시 핸들은 원장 내부에만 두고 사용자 대면 출력에 노출하지 않는다. 수락 결과는 한 번만 표시한다.

---

## 관련 스킬

| 스킬 | 관계 |
|---|---|
| `gil-creative:higgsfield-image` | 소비: 이미지 생성 |
| `gil-creative:higgsfield-video` | 소비: 영상 생성 |
| `gil-creative:higgsfield-identity` | 소비: Soul·Element 일관성 참조 |
| `gil-creative:higgsfield-assets` | 소비: 3D·오디오·영상 분석·후처리 |
| `gil-creative:higgsfield-explainer` | 소비: 블록 조립형 설명 영상 |
| `gil-creative:higgsfield-product` | 소비: 제품 촬영 10모드 |
| `gil-creative:design-brand-visual` | 소비(교차 플러그인): 브랜드 정합 비주얼 |
| `gil-creative:story-webtoon-art` · `story-conti` · `story-cover-art` · `story-character-sheet` | 소비: 작화·콘티·표지·캐릭터 |

## 출처

- [Higgsfield Skills (공식 agent 문서)](https://github.com/higgsfield-ai/skills)
- [Higgsfield MCP](https://higgsfield.ai/mcp)
- 라이브 카탈로그 스냅샷: `.moai/specs/SPEC-MOC-HIGGSFIELD-PROMPT-001/mcp-catalog-snapshot.md` (plan 단계 증거 기준선, 런타임 계약 아님)
