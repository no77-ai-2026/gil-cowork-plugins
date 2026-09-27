# creative-quality-loop.md — 크리에이티브 품질 루프

> `higgsfield-core` | 생성·대폭 수정된 모든 에셋에 적용하는 유한·증거 기반 검수 루프. 목표는 "승인 범위 안에서 게시 가능한 결과"이지 무제한 재생성이 아니다.
> origin: chany-studio/chany-studio@v2.8.1 (MIT) `creative-quality-loop.md` 이식.

**Evidence tier:** 계약 문서 (검수 판정 근거는 실제 최종 해상도 결과물만 인정)

---

## 1. 위치

이 루프의 수락 레코드는 `references/media-job-ledger.md`의 `media_job` 레코드에 결속된다(`asset_version_id`로 연결). 제출·복구·미리보기·재시도 상태는 원장이 소유하고, 이 문서는 **무엇을 어떤 순서로 검수하고 언제 멈추는가**만 소유한다. 컨셉·카피·identity·산출물 정의의 권한은 발주 스킬(higgsfield-image / higgsfield-video / higgsfield-product 등)에 남는다.

## 2. 수락 계약 (`creative_acceptance`)

**첫 유료 시도 전에** 다음을 기록한다. 미지 값은 빈 값으로 두고 추정으로 채우지 않는다.

```yaml
creative_acceptance:
  asset_version_id: ""
  business_job: ""
  one_primary_message: ""
  authority_inputs_and_roles: []
  required_evidence_or_must_capture: []
  exact_copy_and_disclosures: []
  output_format_and_safe_area: ""
  must_pass_gates: []
  scored_criteria: []
  default_attempt_limit: 2
  batch_credit_ceiling: ""
  named_publication_reviewer: ""
```

### 2.1 시도 상한 (HARD)

- **기본 시도 상한은 2회다: 초기 생성 1회 + 결함 교정 1회.**
- 상한 확대는 **사용자의 명시 승인**과 **새 비용 체크포인트**(새 `get_cost` 견적 + 새 `approved_version_id`)를 동시에 요구한다. "한 번만 더"를 묵시적으로 실행하지 않는다.
- **상한 안의 교정 1회는 새 승인을 만들지 않는다.** 초기 승인이 이미 시도 2회와 `batch_credit_ceiling`을 포함하므로, 결함 교정만을 목적으로 한 2차 시도는 같은 `paid_approval_id`로 제출한다(`media-job-ledger.md` §3 규칙 4의 예외). 개념·오퍼·authority 입력·모델·워크플로우·과금 옵션이 바뀌면 교정이 아니라 변경이므로 새 견적·새 승인으로 간다.
- `must_pass_gates` 하나라도 실패하면 `scored_criteria`의 수치 평균이 아무리 높아도 수락할 수 없다. 평균은 must-pass를 덮지 못한다.

## 3. 증거로 검수한다

썸네일이나 제공자의 성공 플래그가 아니라 **실제 최종 해상도 이미지 또는 시간 기반 결과물**을 본다. 발견마다 다음을 기록한다: 관측 위치(영역 또는 타임스탬프), 비교 기준(authority), 심각도, 하류 영향. 확인할 수 없는 증거는 `unavailable`로 표기하고 가정으로 점수를 주지 않는다.

### 3.1 검수 순서 (5단계, 순서 고정)

1. authority identity, 권리·초상·동의, 원본 충실도
2. 정확한 사실·오퍼·카피·자격 요건·고지 문구, 게시 게이트(`gil-creative:publication-review`가 있으면 그 기준)
3. 지정 산출물·형식·치수·길이·세이프 에어리어·가독성
4. 업종별 증빙, 메시지 위계, 물리적·시간적 사실감, 접근성
5. 캠페인 패밀리 일관성, 기술적 아티팩트

앞 단계에서 critical 결함이 나오면 뒤 단계 점수는 참고값일 뿐 수락 근거가 되지 않는다.

## 4. 결함은 한 번에 1종만 교정한다

교정이 허용된 시도에서는:

- 승인된 컨셉을 무효화하지 않고 바꿀 수 있는 **가장 영향이 큰 관측 결함 1종**을 고른다.
- 이미 수락된 속성은 전부 **동결**하고 `attempts[].frozen_properties[]`에 적는다. 대상 영역 또는 타임스탬프를 `region_or_timestamp`에 명시한다.
- 시도당 결함 1종만 바꾼다. 두 가지를 한꺼번에 고치면 무엇이 결과를 바꿨는지 알 수 없다.
- identity·제품·의상·UI·장소·증빙·정확한 카피가 흔들릴 수 있으면 관련 authority 입력을 다시 첨부한다.
- 교정 후에는 must-pass 목록 **전체**를 다시 돌리고, authority 원본과 마지막 수락 버전 **둘 다**와 비교한다. 새 critical 결함을 만든 수정은 회귀이며 통과할 수 없다.

## 5. 중단·에스컬레이션 조건 (6개)

다음 중 하나라도 발생하면 멈춘다:

1. 모든 must-pass 게이트가 통과하고 발주 스킬의 수락 기준을 충족했다 (정상 종료).
2. 승인된 시도 상한 또는 크레딧 상한(`batch_credit_ceiling`)에 도달했다.
3. 같은 결함이 교정 시도 뒤에도 그대로 남았다.
4. 교정 뒤 **다른** critical 결함이 새로 나타났다.
5. 다음 수정이 컨셉·오퍼·authority 입력·모델 또는 워크플로우·승인된 게시 대상을 바꾸게 된다.
6. 필수 증빙, 권리, 고지, 정확한 카피, 지명된 사람의 검토 중 하나가 없다.

중단 시 통과하지 못한 최선의 버전은 **"초안(draft)"으로 명확히 표시**하고 관측된 결함 목록과 함께 반환한다. 컨셉 수준 변경은 발주 기획·제작 스킬로 되돌아가며, 새 수락 계약과 새 유료 생성 승인을 요구한다.

## 6. 금지 (HARD)

- **평균 점수로 실패를 은폐하지 않는다.** must-pass 실패는 어떤 수치로도 상쇄되지 않는다.
- **모델을 조용히 교체하지 않는다.** 품질 결함·타임아웃·호출 실패는 모델 교체 사유가 아니다(`gil-creative:image-bridge/references/image-generation-runtime.md` §오버라이드). 교체는 명시 승인과 새 견적을 거친다.
- 추가 크레딧을 임의로 태우지 않는다. 투기적 변형(speculative variants) 제출 금지.
- 소스코드 진단 루프(테스트-수정 반복)를 크리에이티브 생성에 적용하지 않는다. 이 루프는 유한하고 증거 기반이다.

## 7. 관련 파일

- `references/media-job-ledger.md` — `media_job` 원장, 상태 규칙, technical/creative 게이트 분리
- `references/job-lifecycle.md` — 비용 프리플라이트·폴링·오류 분류
- `gil-creative:image-bridge/references/image-generation-runtime.md` — 정지 이미지 기본 모델·오버라이드
- `gil-creative:publication-review` — 게시 전 최종 검토(해당 스킬 설치 시)
