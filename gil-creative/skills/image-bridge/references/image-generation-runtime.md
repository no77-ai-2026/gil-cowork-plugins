# image-generation-runtime.md — 정지 이미지 기본 모델·유료 실행 계약

> `image-bridge` | 생성형 정지 이미지의 기본 모델 선택, 오버라이드 조건, 유료 호출 전 표시 항목, 타임아웃 복구 규칙.
> origin: chany-studio/chany-studio@v2.8.1 (MIT) `image-generation-runtime.md` + `higgsfield-runtime-contract.md`의 범용 유료 실행 규칙 이식.

**Evidence tier:** 계약 문서. 모델 가용성·비용은 **라이브 스키마(연결된 제공자의 현재 도구 정의·카탈로그)만이 진실원**이다. 웹페이지, 기억 속 모델명, 예시, 이 문서 자체는 런타임 보증이 아니다.

---

## 1. 적용 범위

gil-creative가 소유하는 모든 **생성형 정지 이미지의 생성·편집**에 적용한다: 캠페인 비주얼, 생성형 제품 정리, 상세페이지 비주얼 플레이트, 정적 광고 플레이트, 부분 이미지 편집(`gil-creative:higgsfield-image` 부분 수정 모드), 모델·패션 스틸, 캠페인 영상 장면의 지배 스틸(governing still).

비생성형 누끼, 결정적 레이아웃, 로컬 합성, 영상, 오디오, 클립 조립은 각자의 도구를 쓰며 이미지 모델을 강제하지 않는다.

## 2. 기본 선택

GIL의 정지 이미지 기본은 **OpenAI gpt-image 계열**이며, 요청 기본 모델 ID는 `gpt-image-2`다. 이는 GIL의 의도적 기본값이지, 모든 호스트·제공자가 그 모델을 노출한다는 주장이 아니다.

| 경로 | 제공자 | 기본 모델 해석 |
|---|---|---|
| `image-bridge --provider openai` (기본) | openai | `gpt-image-2`를 정확 선택자로 지정 → `exact-default` |
| `gil-mcp-openai` (v2.5.0, GPT Image 2.5 명시 요청) | openai | `gpt-image-2.5-flare`(기본)·`gpt-image-2.5-sunburst` 정확 지정 → `override-approved`(사용자 명시) |
| `image-bridge --provider gemini` (토글) | gemini | 사용자 토글 = 명시 요청 → `override-approved`, `override_reason: "user-toggle --provider gemini"` |
| `gil-creative:higgsfield-image` (커넥터 폴백) | higgsfield | 라이브 카탈로그에 GPT Image 2 계열이 있으면 그 ID로 해석. 카탈로그에 없으면 `unavailable` |
| `gil-creative:codex-image` | codex(OpenAI OAuth) | codex `image_gen`이 실제 사용 모델을 보고하면 그 값, 아니면 `provider-confirmed-default`는 문서 확인 시에만 |

생성형 정지 이미지 호출 전 절차:

1. 현재 연결된 도구·제공자 스키마를 조회해 **모델 선택자가 노출되는지** 확인한다.
2. 정확한 선택자가 있으면 `gpt-image-2`(또는 제공자가 노출하는 GPT Image 2 계열의 정확한 ID)를 고른다.
3. 호스트가 모델 선택을 숨기면, 현재 도구 문서나 런타임 메타데이터가 GPT Image 2임을 **명시 확인**할 때만 해석된 것으로 본다. 아니면 `resolved_model`을 `unavailable`로 기록한다.
4. 발주 스킬의 authority 입력·입력 역할·요청 개수·형식·품질 설정·유료 생성 경계를 그대로 보존한다.
5. 유료 승인 패킷 또는 실행 요약에 **요청 기본 모델과 실제 해석된 모델을 둘 다** 표시한다.

- 정체 모를 제공자 기본값을 GPT Image 2라고 다시 이름 붙이지 않는다.
- 다른 모델이나 더 새 모델이 존재한다는 이유만으로 `gpt-image-2`를 대체하지 않는다.
- 공식 참조: https://developers.openai.com/api/docs/models/gpt-image-2 , https://developers.openai.com/api/docs/guides/image-generation

## 3. 통제된 오버라이드 (3조건)

다른 모델·제공자는 다음 중 **하나 이상**이 참일 때만 쓴다:

1. 사용자가 현재 에셋 또는 프로젝트에 대해 대체 모델·제공자를 **명시 요청**했다 (`--provider gemini` 토글 포함).
2. 승인된 프로젝트 브리프가 이미 그 대체 기본값을 기록하고 있다.
3. 라이브 가용성 검사가 `gpt-image-2`가 없거나, 요구되는 연산·입력 역할·형식·정책 제약 변환을 수행할 수 없음을 **증명**했다.

**[HARD] 품질 결함, 타임아웃, 호출 실패, 제공자가 고른 기본값의 존재는 그 자체로 모델 교체 사유가 아니다.** 먼저 원래 결과 또는 잡 상태를 §5 규칙으로 점검한다.

오버라이드가 필요하면 다음을 말하고 유료 대체 호출 전에 사용자 승인을 받는다: 정확한 대체 모델·워크플로우, 기본값을 쓸 수 없는 이유, 변경이 적용되는 에셋 범위, 비용·authority 입력 변화 여부. 오버라이드는 기록된 `override_scope[]`에만 적용되며, 그 밖에서는 `gpt-image-2`가 계속 기본이다(사용자가 프로젝트 정책을 명시 갱신하지 않는 한).

**[HARD] 모델·제공자를 바꾸면 해당 견적, 유료 생성 승인, `creative_acceptance` 레코드가 모두 무효화된다.** 조용히 폴백하지 말고 새 프리플라이트와 새 승인을 거친다.

### 3.1 Higgsfield의 GPT Image 2.5 옵션

GPT Image 2.5는 범위 한정 오버라이드이지 새 기본값이 아니다. 위 승인 규칙으로 선택했을 때만 라이브 Higgsfield 카탈로그를 조회한다(2026-09-15 관측: `gpt_image_2_5`, `variant`는 `flare`·`sunburst`). 하이픈 ID를 추측하거나 이 제공자 ID가 다른 호스트에서도 통한다고 가정하지 않는다. Flare=빠른 컨셉 탐색, Sunburst=정밀 편집이라는 것은 제공자 안내이지 검증된 품질 보증이 아니다. variant·옵션은 기존 `media_job` 레코드에 결속하고, 모델 변경이 참조 소스나 카피 변경을 허용하지 않는다. 모델이 없으면 `unavailable`로 표기하고 묻는다.

## 4. 상태 레코드 (필드명 변경 금지)

에셋 또는 유료 생성 계획과 함께 기록한다:

```yaml
still_image_model:
  requested_default: "gpt-image-2"
  resolved_model: ""
  provider: ""
  selection_status: "exact-default | provider-confirmed-default | override-approved | unavailable"
  override_reason: ""
  override_scope: []
```

| selection_status | 뜻 |
|---|---|
| `exact-default` | 정확 선택자로 `gpt-image-2`를 지정했다 |
| `provider-confirmed-default` | 선택자는 숨겨졌지만 문서·메타데이터가 GPT Image 2임을 확인했다 |
| `override-approved` | §3 조건을 충족하고 승인된 대체 모델을 쓴다 |
| `unavailable` | 기본도 승인된 오버라이드도 정직하게 해석할 수 없다 → **생성 전에 멈춘다** |

## 5. 유료 실행 규칙 (제공자 공통)

Higgsfield뿐 아니라 크레딧·과금 잡을 만들 수 있는 모든 연결 서비스(OpenAI BYOK, Gemini BYOK, codex 구독 한도 포함)에 적용한다.

### 5.1 라이브 연산 해석

- 실제 연결된 도구와 후보 연산의 **현재 스키마**를 먼저 조회한다. 연산·모델·지원 입력·입력 역할 의미·출력 형식·옵션·한도는 라이브 데이터로 해석한다.
- 모든 첨부에 `authority | conditioning-first-frame | direction-only` 역할을 명시한다.
- `gpt-image-2` 기본값을 제외하고, 모델 ID·템플릿·비율·길이·개수·옵션값·가격을 하드코딩하거나 조용히 치환하지 않는다. 서버가 고른 기본값은 "해석된 값"으로 보고하지, 사용자의 원래 선택이나 GPT Image 2로 표현하지 않는다.
- 웹 미디어 가져오기에서는 실제 HTTPS 미디어 파일 응답과 YouTube·Instagram 등 플랫폼 **페이지**를 구분한다. 게시물·watch·Reel·피드·로그인·리다이렉트 URL을 미디어 파일처럼 넘기지 않는다.

### 5.2 승인 전 표시 항목 (HARD)

무료 견적·비용 미리보기·드라이런·검증 연산이 있으면 유료 연산 전에 먼저 호출한다. 승인 패킷 하나에 다음을 **요약하지 않고** 담는다:

| 항목 | 내용 |
|---|---|
| `requested_default` + `resolved_model` | 요청 기본 모델과 실제 해석된 모델 (둘 다) |
| 입력 | 각 입력 미디어와 그 역할 |
| 프롬프트 전문 | `final_prompt` |
| 옵션 | 라이브 조회로 확정된 `resolved_options` + `server_adjustments` |
| 개수 | `output_count` |
| 제공자 보고 비용 | `total_credits` 또는 금액, 현재·이후 잔액. 옛 가격표로 추정하지 않고, 없으면 `unavailable`이라고 말하고 사용자의 크레딧 경계에서 멈춘다 |
| 배치 상한 | `batch_credit_ceiling`, `approved_version_id` |

승인 경로(구조화 질문 → 일반 대화 → blocker 반환)는 `gil-creative:higgsfield-core` SKILL.md §승인 요청 계약을 따른다. OS 권한 대화상자, 커넥터 인증, 로그인, 파일 선택, 업로드 확인은 **창작 내용·크레딧 사용·유료 요청의 승인이 아니다.**

승인 하나는 표시된 버전만 덮는다. 프롬프트 의미·authority 입력·모델·과금 옵션·개수·길이·비율·로케일·배치 상한이 바뀌면 새 프리플라이트와 새 승인이 필요하다. 표시 형식만의 변경은 해당 없다.

### 5.3 제출·복구

- 승인 버전과 제공자 영수증·잡 참조를 내부에 먼저 기록한다(`gil-creative:higgsfield-core/references/media-job-ledger.md`). 승인된 개수·총 크레딧 상한을 넘는 연산은 제출하지 않는다.
- **[HARD] 타임아웃·끊긴 응답·과금 상태 불명이면 다시 보내지 않는다.** 원래 영수증으로 상태·이력·잡 목록을 **먼저 조회**하고, 가능하면 그 잡을 재개·회수한다. 제공자 재시도 안내와 유한 폴링 주기를 따른다.
- 실패한 산출물 인덱스만, 이전 결과가 과금 잡을 만들지 않았음이 증명된 뒤 또는 새 견적 승인 뒤에 재시도한다. 수락된 형제 산출물은 재생성하지 않는다.
- `same request`(상태 확인·결과 회수·동일 승인 버전의 멱등 재개)와 `changed request`(창작·입력·모델·옵션·길이·개수·로케일 변경 → 재견적·재승인)를 구분한다.
- 임시 업로드 URL·토큰·비밀값·내부 핸들을 사용자 대면 출력에 노출하지 않는다.

### 5.4 결과 회계

완료 후 보고: 실제 연산 횟수, 제공자 보고 크레딧 사용량(있을 때), 유효 모델·워크플로우·옵션, 서버 치환, 결과 위치 또는 인라인 미리보기, 미해결 결함. 연결된 서비스가 확인하지 않은 생성·결제·검증·전달을 일어난 것처럼 말하지 않는다.

## 6. 관련 파일

- `gil-creative:higgsfield-core/references/media-job-ledger.md` — `media_job` 원장·상태 규칙
- `gil-creative:higgsfield-core/references/creative-quality-loop.md` — 시도 상한 2회·검수 순서·중단 조건
- `gil-creative:higgsfield-core/references/job-lifecycle.md` — Higgsfield `get_cost`·`adjustments`·폴링
- `gil-creative:gpt-image-prompt` / `gil-creative:gemini-3-image-prompt` — 제공자별 프롬프트 설계
- `references/uz-image-bridge.md` — UZ/CIS 후조판·채널 규격
