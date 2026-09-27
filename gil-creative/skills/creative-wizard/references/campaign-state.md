# 캠페인 상태와 인계 (Campaign State and Handoffs)

멀티 스킬 캠페인마다 하나의 압축된 상태 레코드를 유지합니다. 미지 값은 빈 문자열 또는 명시적 `unknown`으로 두고, 절대 추정으로 채우지 않습니다. 필드명은 영문 그대로 보존하고, 도메인 고유 항목은 `domain_extensions:` 아래에 둡니다.

영상 조립 상태는 범위 밖(`video_reference_packets`·`assembly_manifests` 섹션 없음).

```yaml
campaign_id: ""
industry_direction:
  primary_skill: ""
  mode_or_subtype: ""
  jurisdiction: ""
  last_policy_check: ""
  objective_and_kpi: ""
  audience_and_decision_unit: []
  journey_stage: ""
  desired_action: ""
  message_job: ""
  proof_objects: []
  claim_ledger: []
  visual_narrative: ""
  must_capture: []
  directing_rules: []
  channel_deliverables: []
  reference_route:
    domain_id: ""
    l1: ""
    l2: ""
    query_count: 1
  required_disclosures: []
  prohibited_or_high_risk: []
  human_review_gate: ""
  unresolved_decisions: []
  domain_extensions: {}
objective: "awareness | consideration | conversion | retargeting"
audience_and_context: ""
channels: []
authoritative_inputs: []
brand_authority:
  source_paths: []
  voice_do: []
  voice_dont: []
  controlled_terms: []
  palette_or_tokens: []
  allowed_variation: []
  status: "missing | proposed | approved"
subject_lock: []
copy_lock:
  product_name: ""
  headline: ""
  offer_or_event: ""
  supporting_copy: []
  price: ""
  period: ""
  claims: []
  cta: ""
  legal_copy: ""
  provenance:
    - anchor: ""
      source_locator: ""
      checked_at: ""
      status: "draft | verified | approved"
  status: "missing | draft | approved"
model_authority: ""
model_lock: []
garment_authorities: []
garment_locks: []
identity_authorities:
  - identity_authority_id: ""
    subject_authority_ref: ""
    identity_route: "one-use-reference | persistent-identity | not-applicable"
    consent_record_id: ""
    face_use_consent_status: "unknown | confirmed | not-applicable"
    authorized_purpose_and_term: ""
    existing_identity_check: "not-run | none-authorized | authorized-match-found | not-applicable"
    duplicate_training_status: "not-checked | blocked | not-a-duplicate | not-applicable"
    paid_approval_id: ""
    status: "missing | draft | confirmed | invalidated | not-applicable"
campaign_video_manifests:
  - manifest_id: ""
    concept_version_id: ""
    approved_copy_version_id: ""
    authority_asset_version_ids: []
    reference_packet_id: ""
    reference_teardown_id: ""
    continuity_strategy: ""
    paid_approval_id: ""
    scene_bindings:
      - scene_id: "s01"
        usp_role: ""
        message_rank: 0
        motion_route: "generated-motion | deterministic-still-move | authorized-footage"
        governing_still_version_id: ""
        resolved_first_frame_role: ""
        accepted_output_clip_version_id: ""
    status: "draft | approved | invalidated | not-applicable"
media_jobs:
  - media_job_id: ""
    output_index: 1
    owner_skill: ""
    asset_type: "still-image | campaign-video"
    asset_version_id: ""
    specification_version_id: ""
    prompt_version_id: ""
    authority_input_version_ids: []
    paid_approval_id: ""
    provider_job_ref: "internal only"
    status: "planned | quoted | approved | submitted | processing | retrieved | inspected | accepted | stopped | failed"
    result_version_id: ""
    actual_cost: "unavailable"
    attempt_count: 0
    unresolved_defects: []
performance_reviews:
  - review_id: ""
    campaign_id: ""
    variant_set_id: ""
    source_master_content_hash: ""
    copy_version_id: ""
    decision: "winner | inconclusive | invalid"
    diagnosis_hypothesis: ""
    next_single_variable: ""
    status: "draft | reviewed"
conversion_brief:
  version_id: ""
  insight_version_id: ""
  reference_packet_ids: []
  claim_ledger_version_id: ""
  creative_direction_version_id: ""
  copy_version_id: ""
  business_goal: ""
  conversion_event: ""
  primary_metric: ""
  destination_check: "unverified | matched | mismatch"
  ad_unit_ids: []
  status: "draft | approved | invalidated | not-applicable"
ad_reference_packets: []
customer_insight_packets: []
ad_copy_packets: []
carousel_manifests: []
reference_board:
  source_lane: "pinterest | commercial-photo | award-ad | ai-prompt"
  target_count: 6
  count_source: "default | user"
  visible_count: 0
  shortfall: 0
  status: "not-requested | collecting | incomplete | complete"
selected_reference:
  provider: "Pinterest | Production Paradise | Ads of the World | D&AD | The One Show | MeiGen"
  source_url: ""
  visual_dna: {}
creative_direction:
  version_id: ""
  selected_territory: ""
  concept: ""
  signature_device: ""
  composition: ""
  palette: []
  lighting: ""
  materials: []
  typography: {}
  copy_zone: ""
  motion: ""
  sensuality_level: 0   # 0 기본·UZ 시장 0 고정·1 이상은 publication-review 통과 필수
  trend_fit:
    signal: ""
    reason: ""
    translation: ""
    reject_if: ""
  preservation_locks: []
  exclusions: []
  channel_adaptations: []
  acceptance: []
  status: "missing | proposed | approved | invalidated"
campaign_master: ""
campaign_lock:
  idea: ""
  palette: []
  lighting: ""
  material_and_props: ""
  typography_plan: ""
  copy_zones: []
  crop_safe_area: ""
asset_matrix: []
accepted_assets: []
remaining_uncertainties: []
still_image_model:                      # 정본: gil-creative:image-bridge references/image-generation-runtime.md §4
  requested_default: "gpt-image-2"
  resolved_model: ""
  provider: ""
  selection_status: "exact-default | provider-confirmed-default | override-approved | unavailable"
  override_reason: ""
  override_scope: []
specialist_handoffs:
  - producer: ""
    producer_source: ""
    package_version: "unknown | installed version"
    producer_checked_at: ""
    reviewed_object:
      type: "claim | message | offer | endorsement | law | safety | plan | design | runtime | media-execution | identity | asset-operation | coded-experience"
      version_id: ""
    findings: []
    required_changes: []
    sources:
      - title: ""
        url: ""
        publisher: ""
        checked_at: ""
        effective_date: ""
    specialist_status: ""
    downstream_owner: ""
paid_generation_approvals:
  - paid_approval_id: ""
    approved_version_id: ""
    approver: ""
    approved_at: ""
    approved_scope: []
    status: "pending | approved | invalidated | consumed"
publication_reviews:
  - review_id: ""
    copy_version_id: ""
    offer_version_id: ""
    landing_destination_version_id: ""
    asset_version_ids: []
    final_render_version_ids: []
    jurisdictions: []
    channels_and_placements: []
    intended_publication_date: ""
    official_policy_sources: []
    checked_at: ""
    recheck_by: ""
    named_review_owner: ""
    status: "blocked | draft-only | ready-for-named-human-review | reviewed-by-named-owner"
    owner_decision: "pending | approved-within-scope | changes-required | rejected"
    decided_at: ""
    unresolved_blockers: []
domain_extensions: {}
```

## specialist_handoffs[] 규칙

- **타 번들 스킬 결과는 이 레코드로만 흡수하고 출처를 귀속합니다.** `gil-commerce:*`·`gil:*` 등 다른 번들의 스킬(해당 번들 설치 시)이 반환한 발견 사항은 보이지 않는 공유 문맥에 기대지 않고 항목 하나로 변환합니다.
- `producer`는 실제 설치·호출된 정확한 스킬명, `producer_source`는 설치된 플러그인 식별자, `package_version`은 확인 불가 시 `unknown`.
- 사실·제안·결론을 눈에 띄게 구분하고, 전문 스킬의 주의 문구와 출처 날짜를 보존합니다. 좁은 검토를 캠페인 전체의 승인으로 재해석하지 않습니다.
- 붙여넣은 결과는 재사용 가능한 귀속 입력이지 현재 호출의 증거가 아닙니다. 미설치·미호출 스킬을 실행됐다고 표시하지 않습니다.
- 주장 검토는 발송 동의를, 발송 검토는 제품 주장을, 보증·권리 검토는 광고 효과를 각각 증명하지 않습니다.
- 카피·크롭·고지 위치·오퍼·출처 증거·채널·관할·자산 버전이 바뀌면 영향 받은 handoff는 무효가 되고 해당 레인으로 되돌아갑니다.

## 인계 규칙

- 승인된 산업 지침 패킷을 먼저 넘기고, 그 다음 산출물에 관련된 필드만 넘긴다.
- 정체성이 바뀔 수 있는 경우에는 원본 권위 이미지를 넘긴다. 이전에 생성한 근사물만 넘기지 않는다.
- 승인된 카피만 잠긴 카피로 넘긴다. 초안 카피는 눈에 띄게 표시한다.
- 정적 레퍼런스 인계는 각 레인의 정본 페이지와 이전 가능한 Visual DNA만 보존한다. 아웃바운드 목적지·재사용 픽셀·암시된 권리는 넘기지 않는다. Pinterest는 Pin 전용. Meta `ad_reference_packets`는 검사한 크리에이티브·카피·증거 한계·적응 맵을 담은 별도 레코드이며, 사진 레퍼런스나 검증된 캠페인 결과가 되지 않는다.
- 전환 작업은 압축 브리프·고객 인사이트·광고 레퍼런스 패킷·정본 claim ledger·카피·방향 버전을 결속한다. 캐러셀 매니페스트는 전체 카드 순서·수, 카드별 주장, 수락된 자산 버전, 동반 광고 카피, 랜딩 상태를 결속한다. 오퍼·인사이트·선택 레퍼런스·카피가 바뀌면 영향 받은 하위 산출물과 검수만 무효가 되고, 무관한 수락 자산은 유지한다. 병렬 스키마를 발명하지 않는다.
- 크리에이티브 방향 인계에는 선택 영역·지속 콘셉트 장치·명시적 시각 결정·트렌드 적합 근거·보존 잠금·제외·채널 적응·측정 가능한 수락 기준이 담긴다. 하위 스킬은 포맷을 적응할 수 있지만 새 트렌드나 일반 스타일로 조용히 대체할 수 없다.
- 캠페인 비주얼 인계에는 수락된 마스터와 명시적 캠페인 규칙이 담긴다. 하위 스킬은 포맷에 맞춰 재구성할 수 있지만 새 캠페인 방향을 발명할 수 없다.
- 카피 출처·실패한 제작 시도·관찰된 성과는 안정 버전에 붙여 둔다. 파일명만으로는 자산 정체성이 아니며, 실패한 시도는 학습 증거이지 수락된 산출물이 아니다.
- 제작된 자산마다 유효 비율 또는 길이, 출처·카피 검증 상태, 관찰된 미해결 결함을 돌려준다.
- 타 번들 전문 스킬 결과는 `specialist_handoffs[]`로만 귀속한다. 추적 불가능한 캠페인 진실로 뭉개지 않는다.
- 정체성 권위·동의·캠페인 영상 매니페스트·미디어 잡·정지 이미지 모델 선택·유료 생성 승인·성과 검토·게시 검수를 안정 콘텐츠·자산 버전에 결속한다. 피사체·권위 입력·동의 범위·스크립트·프롬프트·입력 역할·정체성·모델·워크플로우·과금 옵션·수락 클립·전달 대상·카피·크롭·고지·오퍼·랜딩·최종 렌더가 바뀌면 영향 받은 모든 레코드가 무효가 되고 승인·검수가 다시 열린다.
- 임시 미디어 핸들·내부 잡 ID·업로드 URL을 사용자에게 노출하지 않는다.
- `sensuality_level`이 1 이상이면 `publication_reviews[]`에 결속된 `gil-creative:publication-review` 통과 없이는 어떤 자산도 수락하지 않는다. UZ 시장은 0 고정.

## 체크포인트

빠진 결정이 비용이나 사업적 의미에 실질적으로 영향을 줄 때만 멈춥니다.

- 정확한 오퍼·가격·기간·CTA·필수 법적 문구, 또는 미승인 주장
- 레이아웃을 안전하게 추론할 수 없을 때의 대상 지면
- 상세페이지 모듈 목록 또는 다중 자산 수
- 제공된 인물 사용 vs 가상 성인 크리에이터·모델 사용
- `semi-auto`에서의 레퍼런스 선택
- 다중 캠페인 영상 변형·로케일·유료 생성 단계
- 연결된 제공자가 크레딧을 소모할 수 있을 때의 라이브 유료 견적·서버 조정·배치 상한
- `sensuality_level`을 1 이상으로 올리는 요청

사용자가 이름이 명시된 범위 안에서 자동 선택을 명시적으로 허용하면, 그 범위 안의 되돌릴 수 있는 크리에이티브 선택에만 적용합니다. 자동 선택은 주장 입증·증거·필수 법적 문구 점검, 권리·업로드 권한, 담당자 게시 검수, 버전별 유료 견적·승인, 플랫폼 쓰기·예산 변경·활성화·지출 시작의 각 개별 승인을 절대 면제하지 않습니다.

## 가족 QA와 전달

각 전문 스킬은 자기 자산의 QA를 수행합니다. 그 다음 코디네이터(`gil-creative:creative-wizard`)가 가족 단위로 확인합니다.

- 산업 여정·증거·제품·공간·UI·차량·이벤트·모델·의상·오퍼·CTA·법적 문구의 일관성
- 하나의 알아볼 수 있는 팔레트·조명·재질·타이포그래피 체계
- 올바른 채널 포맷과 의도적 재구성
- 빠지거나 중복되거나 요청되지 않은 산출물 없음
- 치명적 전문 스킬 실패가 있는 구성원 없음
- 산업·주장·거래·보증·권리·고지·채널 규칙상 검수가 필요한 모든 자산에 버전 결속 게시 상태(`gil-creative:publication-review`)

요청된 자산만 전달하고, 이어서 압축 노트를 붙입니다.

```text
보존: [확인한 권위 정체성]
캠페인: [마스터 방향과 상속된 잠금]
출력: [자산, 채널, 유효 크기 또는 길이]
문구: [승인 통과 / 초안 / 조판 대기 / 해당 없음]
검수: [통과 또는 관찰된 미해결 결함 + publication_reviews 상태]
레퍼런스: [사용 시 출처 페이지 링크]
```
