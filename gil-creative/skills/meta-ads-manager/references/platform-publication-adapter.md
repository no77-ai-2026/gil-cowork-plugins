# 플랫폼 게시 어댑터 (Platform Publication Adapter)

자산이 이름이 명시된 플랫폼·지면·스토어프런트·아웃바운드 채널·라이브 게시 운영을 대상으로 할 때 이 어댑터를 사용합니다. 현재 1차 출처 요건을 자산 단위 통제로 변환하는 도구이지, 시간과 무관한 플랫폼 사양 카탈로그가 아니며 릴리스 승인을 부여하지도 않습니다. 이 파일은 `gil-creative:meta-ads-manager`가 소유하지만 Meta에 한정되지 않으며, `gil-commerce:marketplace-naver-ads`·`gil-commerce:marketplace-coupang-ads`·`gil-commerce:marketplace-uzum`·`gil-commerce:yandex-market`·`gil-commerce:telegram-commerce` 등 모든 라이브 집행 스킬이 공유합니다.

## 런타임 식별

자산을 검토하기 전에 게시 맥락을 해결합니다.

- 정확한 플랫폼, 제품 표면, 지면, 관련 시 계정 또는 스토어프런트
- 랜딩 URL, 앱 목적지, 리드 폼, 예약 경로, 상품 리스팅, 메시지 채널
- 광고주·오퍼·대상·게시를 규율하는 관할
- 대상 연령 범위와 플랫폼이 선언한 제한·민감 카테고리. 보호 속성·건강 속성을 추론하지 않는다
- 오퍼·서비스 하위 유형, 캠페인 목표, 로케일, 게시 예정 일시
- 자산 ID, 카피 버전, 크롭·비율 변형, 고지, 연결된 랜딩

지정되지 않은 플랫폼·지면·관할·연령 규칙·게시일은 `unknown`으로 남깁니다. 그것이 hard requirement를 바꿀 수 있다면 초안 작업은 계속하되 게시는 막아 둡니다.

## 현재 출처 조회

검토 시점에 적용 가능한 최신 1차 출처를 조회합니다.

1. 공식 플랫폼 정책, 광고 기준, 지면 사양, 커머스 규칙, 개발자 문서
2. 해당 관할·오퍼 하위 유형에 대한 공식 정부·규제기관·법령·공인 심의기관 자료
3. 인증 후에만 보이는 요건은 공식 계정·게시 인터페이스

홈페이지·검색 결과·대행사 요약·커뮤니티 게시물·기억된 규칙보다 실제 요건을 명시한 페이지를 우선합니다. 출처 제목·발행처·직접 URL·조회 시각·명시된 시행일·만료/재확인 트리거를 기록합니다. 접근 실패, 공식 출처 간 충돌, 유효 규칙 미해결 시 기억으로 채우지 말고 격차를 기록합니다.

**기억한 수치를 영구 사실로 쓰지 않습니다 — 출처와 검토일에 결속합니다.** 픽셀 크기·파일 한도·알고리즘 가중치·벤치마크 상승률·게시 시간·해시태그 수·입찰 임계값·심의 임계값·법적 임계값을 시간과 무관한 사실로 적어 넣지 않습니다. 값은 적용 가능한 1차 출처와 검토일에 묶인 런타임 발견 사항으로만 사용할 수 있습니다. 근거 없는 성과 조언은 마케팅 가설이지 플랫폼 요건이 아닙니다.

## 발견사항 3분류

적용 전에 모든 발견 사항을 분류합니다.

- `hard_requirement`: 현재의 법적·규제·계약·자격·포맷·고지·타게팅·랜딩·플랫폼 집행 조건. 실패 또는 불확실은 게시를 막는다.
- `platform_recommendation`: 공식이지만 의무가 아닌 지침 또는 문서화된 최적화 제안. 제작에 참고할 수 있지만 필수이거나 성과 향상이 보장된 것처럼 제시할 수 없다.
- `marketing_hypothesis`: 검증 가능한 크리에이티브·시점·카피·대상·전환 아이디어. 증거와 테스트 방법을 명시하고, 1차 출처 없이 플랫폼 탓으로 돌리거나 결과를 약속하지 않는다.

같은 자산에 영향을 주더라도 법적 요건과 플랫폼 요건을 따로 귀속합니다. 충돌하는 공식 출처 중 하나를 조용히 고르지 않습니다. 충돌을 기록하고 담당자에게 넘깁니다.

## 자산 단위 적용

적용 가능한 요건마다 그것이 규율하는 정확한 객체에 매핑합니다.

- `asset`: 파일 유형, 길이, 크기·비율, 콘텐츠 자격, 권리, 정체성, 접근성
- `crop`: 세이프 에어리어, 초점 생존, 고지 생존, 로고 처리, 지면별 재구성
- `copy`: 정확한 단어, 숫자, 오퍼 조건, 명시·암시 주장, 한정, 금지 문구, 카피 상태
- `disclosure`: 정확한 텍스트, 위치, 주장과의 근접성, 지속성, 대비, 예상 표시 크기에서의 가독성, 관련 시 오디오 처리
- `destination`: 최종 URL 또는 인앱 목적지, 광고와의 일관성, 필수 사업자·오퍼 정보, 리다이렉트, 개인정보·동의 표면, 기능 검증

이름이 명시된 지면과 크롭마다 독립적으로 평가합니다. 통과한 변형 하나가 실패한 변형을 덮지 않습니다. 자산·카피·오퍼·대상·랜딩·관할·지면·예정일의 실질 변경은 영향 받은 검토를 무효화하고 새 어댑터 패스를 요구합니다.

미해결 hard requirement는 해당 항목을 `draft_only` 또는 `blocked`로 둡니다. 초안 브리프·클린 플레이트·프롬프트·내부 검토 자산은 계속 진행할 수 있지만, 어떤 것도 플랫폼 승인·법적 준수·게시 안전으로 설명할 수 없습니다. 이 어댑터는 `ready_for_review`까지 반환할 수 있으며, 최종 릴리스 상태는 오직 `gil-creative:publication-review`에 속합니다.

## 라이브 쓰기 6단계

커넥터가 라이브 플랫폼 리소스를 만들거나 바꿀 수 있는 경우:

1. **읽기 전용으로 시작**한다. 정확한 계정·캠페인·지면·자산·현재 상태를 해결한다.
2. **변경안 표**를 보여 준다. 대상 ID, 변경 전 상태, 변경 후 상태, 예산 영향, 활성화 영향, 롤백 또는 일시정지 경로를 담는다.
3. 새 리소스는 플랫폼이 지원하면 **`PAUSED`** 또는 가장 가까운 비지출 초안 상태로 만든다.
4. **쓰기 작업, 예산·청구 변경, 활성화·지출 시작에 대해 각각 별도의 명시적 승인**을 받는다. 하나의 승인은 다른 둘을 허가하지 않는다.
5. 승인된 행만 실행한 뒤, 반환된 리소스 ID·소유권·유효 설정·예산·상태를 **읽어서 다시 검증**한다.
6. **부분 실패는 그대로 보고**한다. 미승인 변경을 재시도하거나 대체 리소스를 활성화하지 않는다.

### 쓰기·예산·활성화 승인 3분리 (HARD)

| 승인 | 허가 범위 | 허가하지 않는 것 |
|---|---|---|
| `write_approval` | 리소스 생성·수정 (PAUSED 상태) | 예산 변경, 활성화 |
| `budget_approval` | 일예산·총예산·청구 변경 | 리소스 생성, 활성화 |
| `activation_approval` | 상태 ACTIVE 전환, 지출 시작 | 리소스 생성, 예산 변경 |

**하나의 승인은 다른 둘을 허가하지 않습니다.** "만들어줘"는 켜라는 뜻이 아니고, "예산 올려줘"는 새로 만들라는 뜻이 아닙니다.

액세스 토큰·리프레시 토큰·인증 헤더·비밀값·임시 자격 증명 URL을 절대 노출·출력·프로젝트 파일에 저장·반환하지 않습니다. 로그와 사용자 표시 결과에서 비밀값을 마스킹합니다.

## 압축 어댑터 레코드

```yaml
platform_publication_adapter:
  context:
    platform: ""
    surface: ""
    placement: ""
    account_or_storefront: ""
    jurisdiction: "unknown"
    audience_age_and_restrictions: []
    offer_or_service_subtype: ""
    locale: ""
    planned_publication_at: "unknown"
    destination: ""
  sources:
    - source_id: ""
      source_class: "platform | regulator | statute | review_body | authenticated_interface"
      title: ""
      publisher: ""
      direct_url: ""
      checked_at: ""
      effective_date: "unknown"
      expires_or_recheck: "before publication"
      applicable_scope: ""
  findings:
    - finding_id: ""
      class: "hard_requirement | platform_recommendation | marketing_hypothesis"
      authority_source_ids: []
      requirement_or_hypothesis: ""
      applies_to:
        asset_ids: []
        crops_or_placements: []
        copy_version: ""
        disclosure: ""
        destination: ""
      verification: "pass | fail | unknown | not_applicable"
      evidence_or_test_plan: ""
      remediation: ""
      review_owner: ""
  asset_reviews:
    - asset_id: ""
      placement_and_crop: ""
      copy_version: ""
      disclosure_status: ""
      destination_status: ""
      unresolved_hard_requirement_ids: []
      adapter_status: "draft_only | blocked | ready_for_review"
  live_change_plan:
    read_only_discovery_complete: false
    proposed_changes: []
    write_approval: "not_requested | pending | granted"
    budget_approval: "not_applicable | not_requested | pending | granted"
    activation_approval: "not_applicable | not_requested | pending | granted"
    created_state: "not_created | paused | draft | unknown"
    verified_resource_ids: []
    verified_statuses: []
  unresolved_conflicts_or_gaps: []
  next_gate: "gil-creative:publication-review"
  release_status: "pending_publication_review"
```

미지 값은 빈 문자열 또는 `"unknown"`으로 두고 추정으로 채우지 않습니다. 이후 릴리스에 옛 어댑터 레코드를 재사용하려면 만료 트리거와 현재 공식 출처를 다시 확인해야 합니다.

## 관련 스킬

- `gil-creative:publication-review` — 어댑터 이후 최종 게이트(4상태·담당자 결정)
- `gil-creative:meta-ads-manager` — Meta 라이브 운영 (본 파일 소유)
- `gil-commerce:marketplace-naver-ads`, `gil-commerce:marketplace-coupang-ads` — 한국 검색·마켓 광고 (해당 번들 설치 시 본 파일 원칙 공유)
- `gil-commerce:marketplace-uzum`, `gil-commerce:yandex-market`, `gil-commerce:telegram-commerce` — UZ/CIS 채널 (해당 번들 설치 시)
