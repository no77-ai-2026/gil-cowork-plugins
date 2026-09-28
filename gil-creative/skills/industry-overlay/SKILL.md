---
name: industry-overlay
description: |
  [한·UZ 듀얼] 업종(전문서비스·교육·의료·식음·숙박여행·공간부동산·디지털제품·공연행사·자동차·소비자테크·기업고용브랜드 11종)을 판별해 canonical `industry_direction` 패킷(증거·금지표현·고지·리뷰 게이트)을 만들고 제작 스킬로 인계하는 업종 오버레이 트리거: "업종 체크리스트 먼저", "학원/병원/식당/부동산/자동차/앱 광고 주의사항", "업종별 증거·금지표현", "industry packet", "soha bo'yicha reklama qoidalari" (UZ)
version: "2.6.0"
origin: chany-studio/chany-studio@v2.8.1 (MIT, 2026-09-15 반영)
---

# 업종 오버레이 (industry-overlay)

## 스킬 개요(상세)

광고·콘텐츠 제작에는 서로 독립적인 두 축이 있다. **업종 축**은 시장 논리·의사결정 여정·증거·업종 고유 시각 언어·클레임 리스크·레퍼런스 경로(L1→L2)를 정하고, **제작 축**은 브리프·레퍼런스 보드·이미지·상세페이지·광고·편집·영상을 실제로 만들고 검증한다. 이 스킬은 업종 축 전담이다. 11개 업종 플레이북을 하나의 스킬 아래 두고, 요청을 판별해 하나의 정본 패킷(`industry_direction`)을 만든 뒤, 제작 스킬(gil-creative:creative-wizard / creative-architect, gil-commerce:detail-page-planner·detail-page-copy·detail-page-image, gil-creative:card-news / poster-ad-builder / print-creative-builder, gil-creative:design-brand-visual, gil-creative:higgsfield-video 등)로 인계한다.

업종 오버레이는 제작 파이프라인의 대체물이 아니라 덧씌우는 층이다. 제작 매뉴얼을 이 안에 복제하지 않고, 오버레이가 있는데 범용 제작 스킬이 업종 전문성을 지어내게 두지도 않는다.

다음과 같은 요청 시 사용하세요:
- "업종 체크리스트 먼저 보고 시작하자"
- "학원 광고 만들 때 주의사항이 뭐야" / "병원 광고 금지표현 정리해줘"
- "식당 배달앱 사진에 넣으면 안 되는 것"
- "부동산 분양 광고 필수 고지 뭐 있어"
- "자동차 딜러 할부 광고 표기 규칙"
- "앱 설치 광고에 쓸 수 있는 증거가 뭐야"
- "industry packet 만들어서 상세페이지로 넘겨줘"
- "soha bo'yicha reklama qoidalari" (업종별 광고 규칙, UZ)

책임 경계:
- 이 스킬은 **제작 자산을 직접 만들지 않는다.** 산출물은 `industry_direction` 패킷 하나와 그 근거 설명뿐이다. 이미지·카피·페이지·영상은 제작 스킬이 만든다.
- 이 스킬은 **법률 자문이 아니다.** 규제 관찰은 리뷰 게이트로 제시하며, "법적으로 문제없음", "플랫폼 승인됨", "게시 가능"이라는 판정을 스킬 수행만으로 내리지 않는다. 문구 법규 검증은 gil-commerce:commerce-ad-claim-compliance-kr(해당 번들 설치 시), 최종 게시 검토는 gil-creative:publication-review로 넘긴다.
- 업종 고유 정보는 canonical 필드를 바꾸지 않고 `domain_extensions` 아래에만 둔다.

## 개요

| 항목 | 내용 |
|---|---|
| 입력 | 오퍼(무엇을 파는가)·원하는 행동·대상·관할(국가/플랫폼)·보유 증거·요청 산출물 |
| 처리 | 업종 판별 → 플레이북 로드 → 클레임 원장 작성 → 패킷 조립 → 인계 |
| 출력 | `industry_direction` YAML 1개 + 미해결 결정 목록 + 인계 대상 스킬 지정 |
| 참조 | `references/packet-schema.md`, `references/playbooks/<domain>.md` ×11, `references/industry-taxonomy.json`, `references/uz-industry-overlay.md` |

## 트리거 키워드

"업종 체크리스트 먼저", "업종별 증거·금지표현", "industry packet", "학원 광고 주의사항", "병원 광고 금지", "식당 광고", "호텔 예약 광고", "부동산 광고 고지", "앱 광고 증거", "공연 티켓 광고", "자동차 할부 광고", "가전 성능 표기", "채용 브랜드 광고", "soha bo'yicha reklama qoidalari" (UZ), "reklama uchun dalil" (UZ)

## 업종 라우팅 표

오퍼와 원하는 행동으로 업종을 고른다. 첨부 이미지에 보이는 사물만으로 고르지 않는다.

| 상업 도메인 또는 원하는 행동 | domain-id | 플레이북 | 필수 전문화 포인트 |
|---|---|---|---|
| 컨설팅·에이전시·법률·회계·자문 등 전문성 기반 서비스 | `professional-services` | `references/playbooks/professional-services.md` | 일반 서비스 vs 면허 전문직 구분, 신뢰 증거, 방법·범위 |
| 학교·학원·강좌·학습 플랫폼·모집·등록 | `education` | `references/playbooks/education.md` | 학습자/결제자 분리, 학습 과정, 성과 증거, 미성년·수강료 |
| 병원·의원·치과·재활·웰니스·진료 접근 | `healthcare` | `references/playbooks/healthcare.md` | 이익-위험 균형, 프라이버시, 의료광고 심의, 인간 게시 게이트 |
| 식당·카페·다이닝·예약·메뉴·포장·배달 | `food-dining` | `references/playbooks/food-dining.md` | 상황(occasion), 식욕, 실제 양·메뉴 진실, 주문/방문 경로 |
| 호텔·리조트·숙박·목적지·예약 | `hospitality-travel` | `references/playbooks/hospitality-travel.md` | 숙박 예측, 객실/편의시설 진실, 요금/접근성 증거 |
| 건축 포트폴리오·인테리어·상업 공간·매매·임대 | `space-real-estate` | `references/playbooks/space-real-estate.md` | 목적 모드, 기하 진실, 동선, 가상 스테이징 고지 |
| 소비자 앱·양면 마켓플레이스·B2B SaaS | `digital-product` | `references/playbooks/digital-product.md` | 제품 모드, 실제 UI, 채택 또는 구매 그룹, 보안·ROI 증거 |
| 공연·전시·컨퍼런스·축제·티켓·참석 | `live-culture-events` | `references/playbooks/live-culture-events.md` | 사전/현장/사후 단계, 권리, 접근성, 안전·문화 맥락 |
| 차량 출시·모델 페이지·딜러·시승·EV·플릿 | `automotive` | `references/playbooks/automotive.md` | 트림/시장 고정, 안전·ADAS, 주행 행위, 주행거리·금융 증거 |
| 가전·디바이스·웨어러블·오디오·컴퓨팅·스마트홈 | `consumer-tech` | `references/playbooks/consumer-tech.md` | 모델/포트/UI 고정, 시험 조건, 호환성·구성품 |
| 기업 평판·역량·문화·EVP·채용·고용주 브랜드 | `corporate-employer` | `references/playbooks/corporate-employer.md` | 기업 vs 고용주 모드, 정책 기반 EVP, 직무 진실·차별 금지 |

### 판별 규칙 7개

1. 오퍼와 원하는 행동에서 상업 도메인을 추론한다. 첨부물에 보이는 물체만으로 정하지 않는다.
2. 도메인이 확실하면 **주 업종 하나만** 고른다.
3. 별도로 규제되거나 행동이 확연히 다른 오퍼가 두 개일 때만 보조 업종을 추가한다. 경계와 각 오버레이가 담당하는 산출물을 기록한다.
4. 물건으로 팔리는 포장식품은 일반 제품 마케팅(오버레이 없음)이다. 식당·카페·예약·배달 경험은 `food-dining`이다.
5. 예약이 행동인 호텔은 `hospitality-travel`, 건축 포트폴리오나 매매·임대는 `space-real-estate`다.
6. 소비자 디바이스에 내장된 제품 UI는 소프트웨어 구독 자체가 오퍼가 아닌 한 `consumer-tech`가 주 업종이다.
7. 호텔에서 열리는 행사는 티켓·참석 자산은 `live-culture-events`, 숙박 예약 자산만 `hospitality-travel`이다.

도메인이 진짜로 모호하고 그 선택이 클레임이나 산출물을 실질적으로 바꾼다면 간결한 질문 하나만 한다. 그렇지 않으면 가장 좁은 합리적 도메인을 고르고 추론했음을 표시한다. 일반 포장 제품은 오버레이 없이 제작 코어(gil-creative:creative-wizard)로 직행하고, 패션 스틸은 gil-creative:higgsfield-identity가 맡는다.

## Canonical 패킷 (industry_direction)

루트 키와 필드명은 규범이다. `industry_direction`을 그대로 쓰고, 값이 비어 있거나 `unknown`이어도 모든 필드를 포함한다. 업종 고유 필드는 `domain_extensions` 아래에만 추가하며, canonical 필드를 대체·개명·중첩하지 않는다. 제작 스킬은 이 계약만 소비한다. 필드별 설명은 `references/packet-schema.md`.

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

사실과 제안을 분리한다. `verified`는 이름 있는 현행 출처로 확인했다는 뜻이지 사용자가 게시를 승인했다는 뜻이 아니다. `approved`는 사용자 또는 지정 리뷰어의 승인이 필요하다. 클레임에 증거나 필요한 한정이 없으면 메시지를 뒷받침 가능한 과정·기능·철학·초대 수준으로 낮춘다. **미지 값은 빈 문자열 또는 `unknown`으로 두고 절대 추정으로 채우지 않는다.**

## 워크플로우 (6단계)

1. **업종 판별**: 오퍼·원하는 행동·대상·관할·채널을 확인하고 라우팅 표와 판별 규칙 7개로 domain-id 하나(필요 시 보조 하나)를 정한다. 모호하면 질문 1개.
2. **플레이북 로드**: `references/playbooks/<domain>.md`를 읽는다. 모드/서브타입(예: `licensed-professional`, `employer-brand`, `real-estate-listing`)을 먼저 고정한다.
3. **진실 원장 작성**: 사용자가 준 사실(메뉴·가격·모델·트림·객실·자격·정책·UI 상태 등)을 `verified business fact | visible source fact | approved substantiated claim | creative proposal | unresolved`로 분류한다. 이미지에서 성분·가격·크기·자격을 추론하지 않는다.
4. **클레임 원장 + 게이트**: 제안된 모든 명시·암시 클레임을 `claim_ledger` 11필드로 기록하고, 플레이북의 Claims and safety gates를 `required_disclosures`, `prohibited_or_high_risk`, `human_review_gate`로 옮긴다. 증거 없는 클레임은 `missing`으로 두고 게시 가능한 카피로 부드럽게 바꾸지 않는다.
5. **패킷 조립**: canonical 필드를 모두 채우고 업종 고유 항목은 `domain_extensions`에 넣는다. `reference_route`는 `references/industry-taxonomy.json`의 L1과 직접 L2 하나만 쓰고, L2를 쓸 때만 `query_count: 2`.
6. **인계**: 요청된 산출물별 제작 스킬을 지정하고 패킷을 통째로 넘긴다. 돌아온 결과물은 실제 오퍼·현행 사실·권리·플랫폼 규칙·패킷과 대조하고, 미적으로 좋아도 실질 불일치는 반려한다. 게시 전 gil-creative:publication-review로 정확히 고정된 버전을 보낸다.

### 인계 대상

| 산출물 | 제작 스킬 |
|---|---|
| 캠페인 브리프·자산 매트릭스 | gil-creative:campaign-planner |
| 크리에이티브 설계(감정 여정·카피 방법론) | gil-creative:creative-wizard → gil-creative:creative-architect |
| 시각 레퍼런스 탐색(L1→L2) | gil-creative:reference-board |
| 마스터 키비주얼 | gil-creative:design-brand-visual |
| 정적 광고·카드뉴스·포스터·인쇄물 | gil-creative:poster-ad-builder, gil-creative:card-news, gil-creative:print-creative-builder |
| 상세페이지·랜딩 모듈 | gil-commerce:detail-page-planner → detail-page-copy → detail-page-image (해당 번들 설치 시) |
| 제품 소스 정리 | gil-commerce:product-photo-brief (해당 번들 설치 시) |
| 부분 수정 | gil-creative:higgsfield-image (부분 수정 모드) |
| 캠페인 영상 | gil-creative:higgsfield-video (원장·품질 루프는 gil-creative:higgsfield-core) |
| 게시 전 최종 검토 | gil-creative:publication-review |
| 문구 법규 검증(한국) | gil-commerce:commerce-ad-claim-compliance-kr (해당 번들 설치 시) |

영상 조립(컷 편집·변형 생성)은 범위 밖이다.

## 프롬프트 컴파일 순서 (제작 스킬용, 7단계)

제작 스킬은 자신의 크리에이티브 방향 체계를 먼저 적용한 뒤, 최종 프롬프트를 이 순서로 조립한다.

1. 상업 목표·KPI·대상·의사결정 역할·여정 단계
2. 원하는 행동, 메시지 잡(job) 하나, CTA 하나, 승인된 증거 객체
3. 권위 있는 피사체·아이덴티티·UI·공간·인물·행사 고정(lock)
4. 업종 고유 장면·샷 역할·행동·카메라·조명·사운드·환경
5. 채널·포맷·길이·세이프 에어리어·접근성·고지·로케일
6. 한계·권리·동의·규제 불확실성·네거티브 제약
7. 요청 산출 수량과 QA 임계값

플레이북 전체를 생성 프롬프트에 붙여 넣지 않는다. 해당 자산에 영향을 주는 패킷 필드만 전달한다.

## 레퍼런스 탐색 인계

업종 스킬은 `references/industry-taxonomy.json`에서 도메인 브랜치 하나와 직접 서브타입 하나까지만 고른다. L1을 먼저 검색하고, L2 직접 서브타입은 0~1개만 두 번째로 검색한다. 어느 쿼리에도 대상·퍼널 단계·장소·채널·색·스타일·무드·카메라·렌즈·조명·비율·브랜드·연도·품질 형용사를 붙이지 않는다. L2가 불확실하면 L1에 머문다. L3로 내려가지 않는다. 시각적 세부는 검색 후 랭킹·Visual DNA·제작 프롬프트에서 다룬다. 레퍼런스 소스 격리(Pinterest / Production Paradise / 수상작 아카이브)는 gil-creative:reference-board가 담당한다.

## Stop conditions

- 결과·순위·자격·비교·후기·가격·제휴·성과율 클레임에 증거와 범위가 없으면 게시용 산출을 중단한다.
- 식별 가능한 미성년자·환자·학습자·직원·고객의 기록·화면·음성·작업물은 동의와 공개 범위가 확인될 때까지 중단한다.
- 배우나 합성 인물을 실제 고객·환자·학생·직원·전문가·후기 제공자로 표현하지 않는다.
- 현행 관할·플랫폼 규칙을 확인하지 못했으면 `draft-only`로 표시한다.
- 의료 도메인은 지정 리뷰어가 정확히 그 버전을 승인하기 전까지 항상 `draft-only`다. 리뷰어가 없어도 초안 제작은 계속하되 게시는 하드 블록한다.
- 업종 판별이 클레임을 바꿀 만큼 모호하면 질문 1개 후 진행한다.

## 출력 형식

1. 판별 근거 3줄 이내(도메인·모드·적용한 판별 규칙 번호).
2. `industry_direction` YAML 전문.
3. 미해결 결정 목록(`unresolved_decisions`를 사람이 읽는 문장으로).
4. 인계 대상 스킬과 각각에 넘길 필드 목록.

## 사용 예시

요청: "중학생 대상 영어 학원 봄학기 모집 카드뉴스 만들 건데, 업종 체크리스트 먼저 보고 시작하자."

판별: 학원·모집·등록 → `education`. 판별 규칙 1·2 적용. 학습자(중학생, 미성년)와 결제자(학부모) 분리.

```yaml
industry_direction:
  primary_skill: "gil-creative:industry-overlay#education"
  mode_or_subtype: "academy"
  jurisdiction: "KR"
  last_policy_check: "not checked"
  objective_and_kpi: "봄학기 레벨테스트 신청 → 상담 후 등록. KPI: 정보 확인 후 등록률, 환불 사유"
  audience_and_decision_unit: ["학습자: 중학교 1~2학년(미성년)", "결제자: 학부모", "영향자: 담임·선배 학부모"]
  journey_stage: "fit discovery"
  desired_action: "무료 레벨테스트 신청"
  message_job: "clarify fit"
  proof_objects: ["학원 등록증(교육청 등록번호)", "커리큘럼 맵(4단계)", "강사 프로필(공개 동의)", "수강료·환불 규정 표"]
  claim_ledger:
    - claim: "3개월 만에 내신 1등급"
      expression_mode: "express"
      placements: ["카드 1 헤드라인"]
      evidence: ""
      evidence_scope: {method: "", population_or_subject: "", conditions: "", period: ""}
      limitation: "코호트·분모·기간 없음"
      required_qualification: ""
      disclosure_location_and_proximity: ""
      review_owner: ""
      expiry_or_recheck: ""
      status: "missing"
    - claim: "교육청 등록 학원"
      expression_mode: "express"
      placements: ["카드 4 하단"]
      evidence: "학원 등록증 사본"
      evidence_scope: {method: "등록증 대조", population_or_subject: "본 학원", conditions: "", period: "2026"}
      limitation: ""
      required_qualification: "등록번호 병기"
      disclosure_location_and_proximity: "카드 4, 학원명 바로 아래"
      review_owner: "원장"
      expiry_or_recheck: "2027-03-01"
      status: "verified"
  visual_narrative: "goal → active learning → feedback → progress artifact → next step"
  must_capture: ["질문하는 학생(동의 확보)", "첨삭 장면", "개인정보 제거한 학습 결과물", "레벨테스트 안내 화면"]
  directing_rules: ["미성년자 얼굴·이름·성적 노출 금지", "재연 장면은 재연으로 기록", "공포·불안 프레이밍 금지"]
  channel_deliverables: ["인스타그램 카드뉴스 4장", "네이버 검색광고 랜딩 연결"]
  reference_route: {domain_id: "education", l1: "Education Campaign Design", l2: "Academy Campaign Design", query_count: 2}
  required_disclosures: ["학원 등록번호", "수강료·교재비·환불 규정", "레벨테스트 무료 조건"]
  prohibited_or_high_risk: ["등급·합격 보장 표현", "미성년 대상 행동 맞춤 광고", "허위 제휴·인증"]
  human_review_gate: "before publication"
  unresolved_decisions: ["'내신 1등급' 클레임 증거 없음 → 삭제 또는 '학습 피드백 주 2회'로 하향", "학부모 동의서 회수 여부"]
  domain_extensions:
    domain: "education"
    education_type: "academy"
    learner_age_group: "minor"
    learner_payer_influencer: {learner: "중1~2", payer: "학부모", influencer: "담임"}
    learning_promise: "레벨에 맞는 4단계 커리큘럼과 주 2회 첨삭 피드백"
    proof_priority: ["등록", "강사·커리큘럼", "평가 방법", "대표 학습자 증거", "후기"]
    message_boundary: ["성적·합격 보장 금지", "타 학원 비방 금지"]
    compliance_review:
      tuition_and_registration_facts_cleared: true
      accreditation_and_outcomes_cleared: false
      minor_consent_and_privacy_cleared: false
      platform_rules_current: false
      human_review_owner: ""
```

인계: gil-creative:card-news에 `message_job`, `proof_objects`, `visual_narrative`, `must_capture`, `directing_rules`, `required_disclosures`, `prohibited_or_high_risk`, `channel_deliverables`를 전달. 게시 전 gil-creative:publication-review.

## 주의사항

- 이 스킬은 제작 자산을 직접 만들지 않는다. "카드뉴스 만들어줘"라는 요청에 카드뉴스를 직접 쓰지 않고 패킷을 만들어 gil-creative:card-news로 넘긴다.
- 법률 자문이 아니다. 출처 URL은 원문 기준 최종 확인 2026-09-04 시점이며, 게시 시점에 현행 규정을 다시 확인한다.
- 한 장면에 두 피사체가 보인다는 이유만으로 오버레이를 둘 추가하지 않는다.
- 플레이북의 채널 규격(픽셀·길이 등)은 참고값이다. 현행 플랫폼 규격을 제작 시점에 확인한다.
- UZ 시장은 `references/uz-industry-overlay.md`와 각 플레이북 말미의 UZ 듀얼 주석을 함께 적용한다. 확실하지 않은 현지 규정은 "현지 확인 필요"로 남긴다.

## 관련 스킬

- gil-creative:creative-wizard / gil-creative:creative-architect — 패킷을 받아 크리에이티브 설계
- gil-creative:reference-board — L1→L2 레퍼런스 탐색(4레인)
- gil-creative:campaign-planner — 캠페인 브리프
- gil-creative:card-news, gil-creative:poster-ad-builder, gil-creative:print-creative-builder, gil-creative:design-brand-visual — 정적 자산
- gil-creative:higgsfield-video, gil-creative:higgsfield-image, gil-creative:higgsfield-core — 영상·부분 수정·원장
- gil-creative:publication-review — 게시 전 검토
- gil-creative:market-profile-engine — UZ/CIS 시장 프로필
- gil-commerce:detail-page-planner·detail-page-copy·detail-page-image, gil-commerce:commerce-jtbd-persona, gil-commerce:commerce-ad-claim-compliance-kr, gil-commerce:product-photo-brief (해당 번들 설치 시)
- gil:project — 프로젝트 지침·상태 설정

## 출처

- Chany's Studio v2.8.1 (MIT): 11개 업종 스킬 및 `industry-overlay.md`, `routing.md`(업종 라우팅 표), `industry-taxonomy.json`을 한국어로 번역·재구성. 2026-09-15 반영.
- 각 플레이북 말미 Authority sources 참조. 원문 기준 최종 확인 2026-09-04.
