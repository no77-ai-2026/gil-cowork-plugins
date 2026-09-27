# industry_direction 패킷 스키마

업종 오버레이가 제작 스킬에 넘기는 유일한 계약이다. 루트 키 `industry_direction`과 아래 필드명은 규범(normative)이며 이름을 바꾸거나 빼지 않는다. 값이 없어도 필드는 남기고 빈 문자열·빈 리스트·`unknown`으로 둔다. **미지 값을 추정으로 채우지 않는다.**

## 정본 YAML

```yaml
industry_direction:
  primary_skill: "gil-creative:industry-overlay#<domain-id>"
  mode_or_subtype: ""
  jurisdiction: "unknown | named"
  last_policy_check: "not checked | ISO-8601 timestamp"
  objective_and_kpi: ""
  audience_and_decision_unit: []
  journey_stage: ""
  desired_action: ""
  message_job: ""
  proof_objects: []
  claim_ledger:
    - claim: ""
      expression_mode: "express | implied | visual | demonstration | testimonial"
      placements: []
      evidence: ""
      evidence_scope:
        method: ""
        population_or_subject: ""
        conditions: ""
        period: ""
      limitation: ""
      required_qualification: ""
      disclosure_location_and_proximity: ""
      review_owner: ""
      expiry_or_recheck: ""
      status: "missing | draft | verified | approved"
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
  human_review_gate: "none | before generation | before publication"
  unresolved_decisions: []
  domain_extensions: {}
```

## 필드별 설명

### 식별·맥락

| 필드 | 타입 | 설명 |
|---|---|---|
| `primary_skill` | string | `gil-creative:industry-overlay#<domain-id>`. domain-id는 taxonomy의 11개 중 하나(`professional-services`, `education`, `healthcare`, `food-dining`, `hospitality-travel`, `space-real-estate`, `digital-product`, `live-culture-events`, `automotive`, `consumer-tech`, `corporate-employer`). 보조 업종이 있으면 `unresolved_decisions` 또는 `domain_extensions.secondary_domain`에 경계와 함께 기록 |
| `mode_or_subtype` | string | 플레이북이 정한 모드. 예: `general-service | licensed-professional`, `corporate-brand | employer-brand`, `architecture-portfolio | commercial-place | real-estate-listing`, `consumer-app | two-sided-platform | b2b-saas`, `car | electric-vehicle | motorcycle | commercial-vehicle`, `restaurant | cafe | bakery | bar | takeaway | delivery`, 교육은 `university | academy | online-course | edtech` 등. 모드가 클레임을 바꾸는데 추론 불가면 질문 1개 |

> **모드 필드는 하나다.** 플레이북이 같은 개념을 `domain_extensions` 안에서 다른 이름으로도 부르면(교육의 `education_type`, 의료의 `provider_and_service` 등) 값을 두 번 적지 말고 `mode_or_subtype`를 정본으로 삼은 뒤, `domain_extensions` 쪽에는 `education_type: "= mode_or_subtype"`처럼 참조만 남깁니다.
| `jurisdiction` | string | `unknown` 또는 국가/지역 코드(`KR`, `UZ`, `KR+UZ`). 관할이 클레임 규칙을 결정하므로 반드시 명시 |
| `last_policy_check` | string | `not checked` 또는 현행 규정을 확인한 ISO-8601 시각. 확인하지 않았으면 게시 상태는 `draft-only` |

### 전략

| 필드 | 타입 | 설명 |
|---|---|---|
| `objective_and_kpi` | string | 상업 목표 하나와 측정 지표. 클릭·지원 수만 최적화하지 않도록 사후 지표(정보 확인 후 전환, 환불 사유, 클레임 재작업 등) 포함 |
| `audience_and_decision_unit` | list | 의사결정 단위를 역할별로 분리(사용자/결제자/승인자/리스크 검토자, 학습자/학부모, 환자/보호자, 운전자/구매자 등). 하나의 페르소나로 뭉개지 않음 |
| `journey_stage` | string | 플레이북의 여정 단계 중 하나. 한 자산이 퍼널 전체를 지지 않도록 하나만 |
| `desired_action` | string | 자산이 유도하는 행동 하나(예약, 설치, 시승 신청, 레벨테스트 신청, 문의) |
| `message_job` | string | 플레이북의 전략 잡 어휘 중 하나(`clarify fit`, `reduce risk`, `booking conversion`, `prove capability` 등). 영문 유지 |
| `proof_objects` | list | **지금 보유가 확인된** 증거 객체만(등록증, 커리큘럼 맵, 메뉴 원본, 평면도, 라이브 UI 상태, 시험 조건표 등). 사용자가 제시하지 않았으면 빈 리스트로 둡니다 |

> **보유와 요구를 섞지 않습니다.** 아직 없는데 **필요한** 증거는 `proof_objects`가 아니라 `domain_extensions.proof_priority`(업종별 증거 우선순위)와 `unresolved_decisions`에 적고, 해당 클레임의 `status`는 `missing`으로 둡니다. 촬영·수집이 필요한 장면은 `must_capture`에 적습니다.

### 클레임 원장 (`claim_ledger`, 항목당 11필드)

| 필드 | 설명 |
|---|---|
| `claim` | 명시·암시 클레임 원문. 암시 클레임(시각·연출로 전달되는 것)도 항목화 |
| `expression_mode` | `express`(문구) / `implied`(맥락) / `visual`(이미지) / `demonstration`(시연) / `testimonial`(후기) |
| `placements` | 클레임이 놓이는 자산·위치 목록 |
| `evidence` | 증거 출처(파일·URL·문서명). 없으면 빈 문자열 |
| `evidence_scope` | 4필드. `method`(측정·검증 방법), `population_or_subject`(모집단·대상 모델·코호트), `conditions`(시험·이용 조건), `period`(기간) |
| `limitation` | 증거가 못 미치는 범위, 예외, 불확실성 |
| `required_qualification` | 클레임 옆에 반드시 붙어야 하는 한정 문구(대표 예시, 조건, 별매 등) |
| `disclosure_location_and_proximity` | 고지의 위치와 클레임과의 근접성(같은 카드·바로 아래·화면 내 등) |
| `review_owner` | 이 클레임을 검토·책임지는 사람 또는 역할 |
| `expiry_or_recheck` | 만료일 또는 재확인일 |
| `status` | `missing`(증거 없음) → `draft`(증거 후보) → `verified`(이름 있는 현행 출처로 확인) → `approved`(사용자 또는 지정 리뷰어 승인). `verified`는 게시 승인이 아님 |

증거나 필요한 한정이 없으면 클레임을 지우거나 뒷받침 가능한 과정·기능·철학·초대로 낮춘다. 부드러운 표현으로 바꿔 통과시키지 않는다.

### 시각·연출·채널

| 필드 | 타입 | 설명 |
|---|---|---|
| `visual_narrative` | string | 플레이북의 시퀀스(예: `goal → active learning → feedback → progress artifact → next step`) |
| `must_capture` | list | 최소 샷 시스템. 실제로 촬영·생성해야 할 증거 프레임 |
| `directing_rules` | list | 연출·캡처 통제(동의, 마스킹, 재연 표기, 안전, 카메라 논리) |
| `channel_deliverables` | list | 채널별 산출물. 규격은 제작 시점에 현행 확인 |

### 레퍼런스 경로 (`reference_route`)

| 필드 | 설명 |
|---|---|
| `domain_id` | taxonomy의 도메인 id와 정확히 일치 |
| `l1` | taxonomy 브랜치의 L1 문자열 그대로 |
| `l2` | 직접 서브타입 0~1개. 확실하지 않으면 빈 문자열(또는 null) |
| `query_count` | L1만이면 `1`, L2를 쓰면 `2`. 그 이상 금지 |

쿼리에 대상·퍼널·장소·채널·색·스타일·무드·카메라·렌즈·조명·비율·브랜드·연도·품질 형용사를 붙이지 않는다.

### 게이트

| 필드 | 타입 | 설명 |
|---|---|---|
| `required_disclosures` | list | 반드시 노출할 고지(등록번호, 금융 조건, 총액 요금, 시뮬레이션 UI 표기, 가상 스테이징 표기 등) |
| `prohibited_or_high_risk` | list | 금지·고위험 표현과 연출 |
| `human_review_gate` | string | `none` / `before generation`(위험 촬영·미성년·미공개 제품·민감 데이터 등) / `before publication`. 앞선 게이트가 있어도 게시 전 재확인은 유지 |
| `unresolved_decisions` | list | 사용자나 리뷰어가 정해야 할 것. 리뷰어 미지정도 여기에 |

## domain_extensions 규칙

1. 업종 고유 정보는 모두 `domain_extensions` 아래에 둔다. canonical 필드와 같은 층위에 새 키를 만들지 않는다.
2. `domain_extensions.domain`에 domain-id를 넣는다.
3. canonical 필드를 `domain_extensions` 안으로 옮기거나 이름을 바꿔 복제하지 않는다. 업종 고유 클레임 타입(예: `efficacy`, `employment`, `range`)이 필요하면 `claim_ledger` 항목의 `claim` 문자열에 접두로 쓰거나 `domain_extensions`의 보조 목록에 매핑을 둔다.
4. 제작 스킬은 canonical 필드만 소비한다. `domain_extensions`는 업종 스킬 내부 체크리스트와 리뷰용이다.
5. 각 플레이북의 Canonical handoff 절에 그 업종의 권장 `domain_extensions` 키가 있다(예: education의 `learner_age_group`, `compliance_review`; automotive의 `vehicle_identity_lock`, `approved_fact_ledger`).

## 상태 어휘 (영문 유지)

- 클레임: `missing | draft | verified | approved`
- 게시: `blocked | draft-only | ready-for-named-human-review | reviewed-by-named-owner` (정본: gil-creative:publication-review `references/publication-gate.md`)
- 게이트: `none | before generation | before publication`
- 입력 분류: `verified business fact | visible source fact | approved substantiated claim | creative proposal | unresolved`
