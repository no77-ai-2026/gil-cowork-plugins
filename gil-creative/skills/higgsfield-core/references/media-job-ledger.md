# media-job-ledger.md — 유료 미디어 생성 원장

> `higgsfield-core` | 요청 산출물 1개당 append-only 논리 레코드 1개. 제출·복구·검수·수락 상태의 단일 진실원.
> origin: chany-studio/chany-studio@v2.8.1 (MIT) `media-job-ledger.md` 이식.

**Evidence tier:** 계약 문서 (원장 구조는 GIL 정책, 비용·잡 상태 값은 라이브 MCP 응답이 유일한 진실원)

---

## 1. 목적과 저장 위치

- 요청된 산출물 **하나마다** `media_job` 레코드 **하나**를 만든다. 배치 5장이면 레코드 5개다.
- 레코드는 append-only다. 값을 덮어쓰지 않고 `attempts[]`와 상태 타임스탬프를 덧붙인다.
- 저장 위치: 캠페인·프로젝트 공유 상태(`gil:project` 상태 파일이 있으면 그곳). 영속 프로젝트 상태가 현재 범위 밖이면 핸드오프 보고에 레코드를 그대로 실어 반환한다.
- 이 원장은 `references/job-lifecycle.md`(get_cost·폴링·오류 분류)와 짝이다. job-lifecycle이 "호출 한 번의 절차"라면, 원장은 "산출물 하나의 생애"다.

## 2. 원장 스키마 (필드명 변경 금지)

미지 값은 빈 문자열 또는 `"unavailable"`로 둔다. **추정으로 채우지 않는다.**

```yaml
media_job:
  media_job_id: ""
  output_index: 1
  owner_skill: ""                       # 예: gil-creative:higgsfield-image
  asset_type: "still-image | campaign-video"
  asset_version_id: ""
  specification_version_id: ""
  prompt_version_id: ""
  final_prompt: ""
  authority_inputs:
    - asset_version_id: ""
      role: "authority | conditioning-first-frame | direction-only"
      reusable_input_ref: "internal only"
  requested_default: ""                 # 스킬이 요청한 기본 모델 (예: gpt-image-2)
  provider: ""                          # higgsfield | openai | gemini | codex ...
  resolved_operation: ""
  resolved_model_or_workflow: ""
  resolved_options: {}
  server_adjustments: []                # job-lifecycle §3 `adjustments` 원문
  quote:
    credits_or_cost: "unavailable"      # job-lifecycle §2: credits(청구값)만, credits_exact 금지
    balance: "unavailable"
    quoted_at: ""
  approval:
    paid_approval_id: ""
    approved_version_id: ""
    batch_credit_ceiling: ""
    status: "not-required | pending | approved | invalidated | consumed"
  execution:
    idempotency_key: "internal only"
    provider_job_ref: "internal only"
    submitted_at: ""
    status: "planned | quoted | approved | submitted | processing | retrieved | inspected | accepted | stopped | failed"
    last_status_at: ""
    retry_after: ""
    actual_cost: "unavailable"
  attempts:
    - attempt: 1
      result_version_id: ""
      observed_defect: ""
      region_or_timestamp: ""
      change_made: ""
      frozen_properties: []
      decision: "accepted | rejected | stopped"   # rejected=결함으로 거부하고 교정 여지 있음 / stopped=이 시도로 루프가 끝남(중단 조건 발동). 한 레코드에 stopped는 최대 1개이며 execution.status도 stopped다
  result:
    disposition: "accepted | draft | discarded"
    stable_location: ""
    inline_preview_status: "shown | unavailable | failed"
    technical_gate: "pass | fail | unavailable"
    creative_gate: "pass | fail | unavailable"
    unresolved_defects: []
```

`domain_extensions:` 아래에만 스킬 고유 필드를 추가한다(예: higgsfield-video의 `shot_contract_id`, higgsfield-product의 `mode`).

## 3. 상태 규칙 (HARD)

1. **ID 안정.** `media_job_id`와 `output_index`는 그 산출물이 살아 있는 동안 바뀌지 않는다. 배치 재시도는 살아남은 항목의 번호를 절대 다시 매기지 않는다.
2. **submitted / processing은 같은 잡의 조회·취소·회수로만 전이한다.** `job_status` 확인, 취소, 결과 회수 — 이 세 가지 외의 경로로 `submitted`·`processing`을 벗어날 수 없다. 새 제출은 전이가 아니라 새 레코드다.
3. **미확인 응답은 재제출 권한이 아니다.** 타임아웃·끊긴 응답·과금 여부 불명은 "잡이 없다"는 증거가 아니다. `provider_job_ref`로 상태·이력·잡 목록을 먼저 조회하고, 있으면 그 잡을 재개·회수한다. 이력 조회 도구가 노출되지 않으면 사용자에게 대시보드 확인을 요청한다(SKILL.md §유료 생성 승인 게이트와 동일).
4. **변경은 새 승인 버전을 만든다 — 단, 승인된 상한 안의 결함 교정 1회는 예외다.** 프롬프트 의미, authority 입력이나 역할, 모델·워크플로우, 과금 옵션, 개수, 길이, 비율 중 하나라도 바뀌면 제출 전에 새 `approved_version_id`가 필요하고 기존 `approval.status`는 `invalidated`로 전이한다. **예외**: `creative-quality-loop.md` §2.1의 기본 상한(초기 1 + 교정 1) 안에서, 승인 시 합의된 결함 교정만을 목적으로 한 2차 시도는 같은 `paid_approval_id`·`batch_credit_ceiling`을 그대로 쓴다(개념·오퍼·모델은 동결). 상한을 넘거나 동결 대상이 바뀌면 그 순간 이 예외는 사라지고 새 견적·새 승인이 필요하다. 표시 형식만 바뀐 것은 해당 없다.
5. **실패한 인덱스만 재시도한다.** 그것도 (a) 이전 요청이 과금 잡을 만들지 않았음을 증명한 뒤, 또는 (b) 새 견적·새 승인을 받은 뒤에만. 수락된 형제 산출물은 절대 다시 생성하지 않는다. 한 항목 실패로 배치 전체를 재실행하지 않는다.
6. **영수증은 내부 보관.** `provider_job_ref`·`idempotency_key`·`reusable_input_ref`는 원장 내부에만 둔다. 서명 URL, 토큰, 임시 업로드 핸들, 비밀값은 사용자 대면 레코드·보고·로그에 노출하지 않는다.
7. **accepted는 검수만 설정한다.** 제공자의 완료 플래그(`completed`)는 `retrieved`까지만 올릴 수 있다. `inspected` → `accepted`는 실제 최종 해상도 결과를 사람이 보거나 명시된 게이트를 통과한 검수만이 설정한다. 수락 결과는 대화에 **한 번만** 표시한다.
8. `stopped`·`failed`로 끝난 레코드는 최종 시도의 `observed_defect`와 `unresolved_defects[]`를 남긴다. 결함 없이 "실패"라고만 적지 않는다.
9. **중단 시 처분을 적는다.** 루프가 수락 없이 끝나면 `result.disposition: "draft"`(라벨 붙은 초안으로 반환) 또는 `"discarded"`를 기록하고, 소진된 승인은 `approval.status: "consumed"`로 닫는다. 남은 크레딧이 있어도 같은 승인으로 재개하지 않는다.

## 4. 게이트 분리

`result.technical_gate`와 `result.creative_gate`는 별개다. 하나가 `pass`여도 다른 하나는 `unavailable`일 수 있으며, 둘 다 `pass`여야 `accepted`가 가능하다. 검수 순서와 시도 상한은 `creative-quality-loop.md`가 소유한다.

### 4.1 정지 이미지 (still-image)

| 게이트 | 점검 항목 |
|---|---|
| technical | 치수·비율, 파일 형식, (요구 시) 투명 배경, 텍스트 가독성, 출력 무결성(깨짐·잘림·아티팩트) |
| creative | 원본 충실도(authority 대비), 제품·인물 identity 안정성, 구도, 근거·증빙 요소 포착, 카피 정확성, 고지 문구, 세이프 에어리어, 캠페인 패밀리 일관성 |

### 4.2 캠페인 영상 (campaign-video)

| 게이트 | 점검 항목 |
|---|---|
| technical | 길이, 치수, 프레임레이트, 코덱, 오디오 유무(`generate_audio` 치환 확인), 재생 가능 여부 |
| creative | 승인된 첫 프레임 준수, 시간적 연속성, 제품·인물 identity 안정성, 물리적 개연성, 카피·고지 노출 타이밍, 메시지 순서, 장면별 수락 |

## 5. 보고 시 최소 표시 항목

원장에서 사용자에게 보여주는 것은 다음이다: `output_index`, `resolved_model_or_workflow`, `resolved_options`, `server_adjustments`, `quote.credits_or_cost`, `execution.status`, `execution.actual_cost`, `result.stable_location` 또는 인라인 미리보기, `result.unresolved_defects`. "internal only" 표기 필드는 보여주지 않는다.

## 6. 관련 파일

- `references/job-lifecycle.md` — get_cost·credits·adjustments·폴링·오류 분류
- `references/creative-quality-loop.md` — `creative_acceptance` 계약, 시도 상한, 검수 순서, 중단 조건
- `gil-creative:image-bridge/references/image-generation-runtime.md` — 정지 이미지 기본 모델·오버라이드 규칙
