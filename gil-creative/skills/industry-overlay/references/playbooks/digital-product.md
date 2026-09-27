# 디지털 제품 플레이북 (digital-product)

소비자 앱, 양면 플랫폼, B2B SaaS의 증거 기반 `industry_direction` 패킷을 만든다. 일반 제품 광고와 다른 결정을 위한 증거·방향 체계이지 법무·프라이버시·보안·접근성·플랫폼 검토를 대신하지 않는다. 법률 자문이 아니다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 유지한다. 제품 세부는 `domain_extensions`에.

```yaml
mode_or_subtype: "consumer-app | two-sided-platform | b2b-saas"
reference_route: {domain_id: "digital-product", l1: "Digital Product Marketing Design", l2: "", query_count: 1}
domain_extensions:
  domain: "digital-product"
  business_model: ""
  product_identity_lock: {}       # 빌드·버전·플랜·역할·지역·캡처 날짜
  approved_fact_ledger: []
  proof_plan: []
  prompt_kernel: ""
  risk_and_approvals: []
```

`required_disclosures`: 플랜·버전·가용성, 프로토타입·시뮬레이션 UI, 시간 압축, 통합 상태, 측정 한계, 구독 조건, AI 한계, 보안 통제·감사 범위, 대가 관계. `prohibited_or_high_risk`: 지어낸 UI·데이터, 거짓 상태 전이, 뒷받침 없는 결과·절감, 노출된 민감 데이터, 과도한 프라이버시·보안 표현, 접근 불가·조작적 흐름, 누락된 결제 조건.
`human_review_gate`: 캡처가 민감·기밀 데이터, 미공개 기능, 통제된 보안 증거를 노출하면 `before generation`; 그 외 UI·구독·보안·프라이버시·AI·후기·성능 클레임은 최소 `before publication`.

모드 하나 먼저: `consumer-app`(한 사람 또는 가구가 평가·설치·활성화·유지·구독) / `two-sided-platform`(수요·공급 오디언스가 유동성·신뢰·거래 규칙으로 연결된 별개 획득 여정) / `b2b-saas`(다중 역할 구매 그룹이 적합성·리스크·구현·상업 조건을 평가). 요청이 명확할 때만 추론하고 아니면 질문 하나. 오디언스가 둘이라는 이유로 모드를 섞지 않는다.

## Strategic job

| 모드 | 전략 잡 | 주 전환 | 주 리스크 |
|---|---|---|---|
| consumer-app | 니즈·트리거를 신뢰할 수 있는 첫 가치 경험으로 | 스토어 방문, 설치, 활성화, 체험, 유료 전환, 유지 | 약속이 실제 경험보다 명확하거나 빠름 |
| two-sided-platform | 유동성·신뢰·규칙·가치 교환을 증명하며 양쪽 구축 | 구매자 거래와 공급자 활성화 | 한쪽만 광고하고 공급·수요·안전장치·투명 경제성 부족 |
| b2b-saas | 구매 그룹이 합의할 공유 선호와 충분한 증거 | 데모, 평가, POC, 상업 검증, 계약, 채택 | 제품 열정이 보안·재무·법무·조달·구현 검토를 통과 못 함 |

기능 홍보를 기본값으로 하지 않는다. 잡을 구매자 확신의 변화로 정의한다: 이해, 믿음, 숏리스트, 검증, 채택, 확장, 갱신.

## Audience and journey

- consumer-app: `trigger → discovery → store evaluation → install → permission/onboarding → first value → repeat use → pay/renew → referral`. 실제 이탈 지점을 찾는다. 구독 캠페인은 가격·갱신·해지·기대 가치 명료성도 필요
- two-sided-platform: 수요측(니즈·발견·재고/제공자 신뢰·거래·이행·분쟁/재사용)과 공급측(기회·자격·온보딩·가용성·매칭·수익/가동·정산·유지) 두 지도. 어느 쪽이 제약인지 명명. 실행 가능한 문제가 로컬 유동성·품질·신뢰·이행·단위 경제일 때 일반 네트워크 효과를 광고하지 않음
- b2b-saas: `category memory → longlist → technical shortlist → cross-functional validation → business case/POC → procurement and contract → implementation → adoption → expansion`. 역할별로: 사용자(워크플로우 적합·노력·학습·접근성), 챔피언(내부 스토리·채택 계획·증거 이동성), 경제적 구매자(성과·TCO·회수·기회비용), 임원(전략·리스크·변화관리), IT/보안(아키텍처·접근·데이터 흐름·복원력·증거 범위), 프라이버시/법무(데이터 범주·목적·보존·삭제·수탁자·권리·조건), 재무/조달(가격 기준·총비용·벤더 안정성·비교성), 구현 책임자(전제·마이그레이션·통합·일정·지원)

구매 그룹 규모·여정 길이에 대한 설문 수치는 방향성 조사이지 특정 고객 프로세스의 사실이 아니다.

## Proof architecture

클레임-증거 사다리: `observable`(정확한 인터페이스 상태·워크플로우·출력) → `measured`(지표 정의·기준선·기간·표본·조건·소유자) → `independently supported`(승인 고객 증거·감사 보고서·인증·시험소·권위 기록, 범위와 날짜) → `qualified projection`(가정이 노출·편집 가능한 ROI 모델).

UI·데모 증거: 영상은 `live product | prototype | concept | simulation`으로 표기. 빌드·OS·기기·계정 역할·데이터 유형·캡처 날짜 기록. `context → input → user action → system response → result → limitation` 시퀀스, 불가능한 상태 변화 없이. 기본은 합성·비식별 데이터의 격리 테스트 테넌트. 실제 소스가 필요하면 제작 워크플로우 진입 전에 마스킹된 사전 승인 캡처만. 자격증명·비밀·토큰·세션 값·계정 ID·기밀 기록은 캡처·프롬프트·업로드 어디에도 넣지 않는다. 캡처 승인과 외부 업로드 승인은 별개 게이트. 실제 처리 시간을 보존하고 단축했으면 `time compressed` 고지. 읽히지 않는 UI를 지어낸 텍스트로 채우지 않는다. AI 출력은 입력·시스템 버전·샘플링 조건·실패 사례·인간 검토·대표 시험 결과를 보존.

비즈니스·신뢰 증거: ROI는 가정·기준선·기간·인건비·구현 비용·채택률·민감도 노출. 고객 결과는 이름·로고·인용·지표·기간·인과 표현 승인. 가용성·신뢰성은 서비스·지역·측정 창·제외·출처 명시, 과거 수치를 영구 보증으로 바꾸지 않음. 보안: SOC 2는 인증 보고서이지 제품 인증이 아님. ISO/IEC 27001은 인증 주체·범위·판·상태·인증기관 확인. 통합은 GA·베타·커스텀·파트너 구축·계획·기술적 가능을 구분.

## Visual narrative

기능 몽타주가 아니라 결정 하나: 알아볼 수 있는 업무·생활 마찰 → 브랜드 제품 조기 등장 → 읽히는 상호작용·메커니즘 하나 → 사용자 맥락 속 보이는 결과 → 보강 증거 또는 신뢰하는 목소리 → 한정과 다음 행동.

소비자 앱은 권한·온보딩·결제·학습을 숨기지 않고 첫 가치를 구체화. 플랫폼은 교환의 양쪽과 신뢰 메커니즘. B2B는 챔피언이 다른 역할에 전달하기 쉬운 증거. 인간 맥락은 이해관계 설명용이지 장식 스톡이 아니다. 제품 진실과 예시 은유를 구분한다.

## Directing and capture

- 네이티브 제품을 먼저 캡처하고 기기 프레임·콜아웃·합성은 나중에. 레이아웃·정보 위계가 충실할 때만 클로즈·확대
- 무음 시청을 위해 읽히는 자막 설계. 숏 자산당 상호작용 하나·약속 하나. 전환이 제품에 없는 자동화·상호운용·속도를 암시하지 않음
- 자격증명·토큰·개인 메시지·얼굴·계정 ID·고객 데이터·기밀 분석 숨김. 고객 인력·로고·후기·직장·녹화의 초상권·허가
- 접근성 상태 캡처: 키보드 포커스, 스크린리더 라벨, 자막, 대비, 텍스트 확대, 모션 감소, 오류 복구

## Channel deliverables

앱 스토어(아이콘·스크린샷·프리뷰·설명·현지화 변형; 현행 스토어 규칙, 실제 경험, 첫 노출 자산 우선) / 웹사이트(히어로·용도·기능 증거·가격·비교·FAQ·트러스트 센터·데모 CTA; 획득 약속이 랜딩 상태·가용 플랜과 일치, gil-creative:landing-page) / 유료 소셜·영상(6~15초 훅, 20~30초 증거 스토리; 문제·증거·행동 각 하나) / LinkedIn·B2B(역할별 영상·문서 광고·임원 관점·고객 스토리; 구매자와 숨은 리스크 검토자에게 다른 증거) / 검색(문제·카테고리·비교·통합·대안·가격 페이지; 클릭 뒤에 자격 정보 숨기지 않음) / 세일즈·평가(데모 스크립트·챔피언 덱·ROI 모델·POC 계획; 이동 가능·출처 있는·역할별) / 신뢰·조달(아키텍처·데이터 흐름·통제·감사 범위·DPA 경로; 출처 이상의 인증·법적 결론 암시 금지) / 라이프사이클(온보딩·활성화·갱신·해지 안내; 동의 보존, 결제·갱신·해지 명확). 규격은 제작·게시 직전 공식 출처 확인.

## Prompt kernel

```text
모드와 제품 진실: [consumer-app | two-sided-platform | b2b-saas]; 승인된 제품/빌드/플랜/역할/지역/날짜
전략 잡: 대상 역할, 여정 단계, 마찰, 원하는 믿음, 원하는 행동, KPI
증거 객체: 정확한 라이브 UI 상태·워크플로우·지표·고객 산출물·통제·한정 모델; 출처와 적용 조건
방향: 내러티브 비트, 인간 맥락, 인터페이스 프레이밍, 모션 타이밍, 브랜드 단서, 카피 위계, CTA
필수 한정: 가용성, 시험 방법, 대표 결과 표현, 가격·구독 조건, 프라이버시·보안 범위
네거티브 제약: UI·데이터·고객·통합·결과·인증·가격·가용성·속도·자율성·보증 발명 금지; 거짓 제품 클레임을 만드는 상태 전이·시각 은유 금지
출력: 채널, 치수, 길이, 언어, 현지화, 자막, 변형, 검토 상태
```

## Claims and safety gates

차단 조건: 보여준 기능·통합·플랜·지역·언어가 대상 오디언스에 현재 가용하지 않음; 프로토타입·시뮬레이션·미래 기능이 라이브로 이해될 가능성; 성능·절감·AI·정확도·생산성·신뢰성·보안·시장 선도 클레임에 충분한 사전 증거 없음; 편집·애니메이션·합성이 증거가 뒷받침 않는 암시 클레임 생성; 프라이버시·보안 약속이 구현된 관행이나 감사·인증 범위 초과; 개인·고객·기밀·생체·건강·금융·아동 데이터가 승인 근거·안전 처리 없이 등장; 가격·수수료·갱신·체험 전환·해지·자격·중대 한계가 누락되거나 트리거 클레임과 분리; 플랫폼 재고·매칭·대기·수요·제공자 수익·절감이 명시 지역·기간에 대표성 없음; 리뷰·후기·고객 로고·전문가·크리에이터 관계가 조작·미승인·비정형 무한정·대가 미고지; AI 성능이 대표 시나리오로 평가되지 않았거나 보편적으로 정확·공정·안전·비공개·자율이라 주장; 랜딩·스토어 리스팅·제품 경험이 획득 크리에이티브와 모순.

게시 전 모든 대상 관할·플랫폼의 현행 광고·프라이버시·구독·접근성·앱 심사·AI 규칙 확인, URL·확인일 기록. 규제된 건강·금융·고용·주거·교육·아동·생체 용도는 자격 있는 검토로 에스컬레이션. 한국 정통망법 메시지 발송은 gil-commerce:commerce-marketing-compliance-kr(해당 번들 설치 시).

## Reference handoff

```text
domain: digital-product
L1: Digital Product Marketing Design
L2: 0~1개 — Consumer App Marketing Design | Marketplace Marketing Design | B2B SaaS Marketing Design | Fintech App Marketing Design
```

L1 먼저, 두 번째는 직접 L2 하나만. 여러 오디언스·자산을 위해 형제 L2를 따로 검색하지 않는다. 모드 세부·업종·스타일·렌즈·카메라·조명·색·무드·감정·장소·대상·브랜드·캠페인·크리에이터·에이전시·플랫폼·채널·포맷·레이아웃·비율·품질 형용사 금지. 이전 가능: 구도, 정보 위계, 페이싱, 인터페이스 프레이밍, 증거 시퀀스, 타이포 거동. 이전 불가: 외부 UI, 로고, 카피, 고객 데이터, 브랜드 기기, 미지원 제품 상태. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 플랫폼·벤더 조사는 방향에 유용하나 중립적 시장 진실이 아니다. 표본·지역·날짜·후원자를 보존한다.

- 6sense, 2024 B2B Buyer Experience Report: https://6sense.com/science-of-b2b/2024-buyer-experience-report/ · LinkedIn B2B Institute/Bain/NewtonX, The Hidden Buyer Gap (2024): https://business.linkedin.com/advertise/resources/b2b-institute/b2b-research/trends/the-hidden-buyer-gap
- Apple Developer, Creating Your Product Page: https://developer.apple.com/app-store/product-page/ · App Previews: https://developer.apple.com/app-store/app-previews/
- Google Play Console Help, Add Preview Assets: https://support.google.com/googleplay/android-developer/answer/9866151 · Run A/B Tests: https://support.google.com/googleplay/android-developer/answer/12053285
- FTC, Start with Security (2015): https://www.ftc.gov/business-guidance/resources/start-security-guide-business · Bringing Dark Patterns to Light (2022): https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf · Gig Work Policy Statement (2022): https://www.ftc.gov/system/files/ftc_gov/pdf/Matter%20No.%20P227600%20Gig%20Policy%20Statement.pdf
- NIST, AI RMF Generative AI Profile (2024): https://doi.org/10.6028/NIST.AI.600-1 · AICPA & CIMA, Trust Services Criteria (2022 개정): https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022 · ISO/IEC 27001:2022: https://www.iso.org/standard/27001 · W3C WCAG: https://www.w3.org/WAI/standards-guidelines/wcag/
- 한국 공정거래위원회, 추천·보증 등에 관한 표시·광고 심사지침(현행 판 확인): https://www.law.go.kr/LSW/admRulSc.do?eventGubun=060103&menuId=5&query=%EC%B6%94%EC%B2%9C%E3%86%8D%EB%B3%B4%EC%A6%9D+%EB%93%B1%EC%97%90+%EA%B4%80%ED%95%9C+%ED%91%9C%EC%8B%9C%E3%86%8D%EA%B4%91%EA%B3%A0+%EC%8B%AC%EC%82%AC%EC%A7%80%EC%B9%A8&subMenuId=45&tabMenuId=183

## UZ 듀얼 주석

- 핀테크·결제: 우즈베키스탄 결제 앱(Payme, Click, Uzum Bank 등)과 연동 클레임은 파트너 계약 증빙 없이는 `missing`. 금융 서비스 광고는 중앙은행 라이선스 표기 관행이 있으며 범위는 현지 확인 필요.
- 개인정보: 우즈베키스탄 개인정보보호법은 UZ 시민 개인정보의 현지 서버 저장(로컬라이제이션) 요건을 두고 있다. "데이터는 안전하게 보관" 류 클레임은 저장 위치·근거를 `evidence_scope`에 넣고, 요건 세부는 현지 확인 필요.
- 채널: Telegram Mini App·봇이 소비자 앱의 주 유통 경로일 수 있다. 앱 스토어 규칙과 별도로 Telegram 플랫폼 정책을 `last_policy_check` 대상에 포함. 상세는 gil-commerce:telegram-commerce(해당 번들 설치 시).
- 양면 플랫폼: 택시(Yandex Go 등)·배달·프리랜서 플랫폼의 공급자 수익 클레임은 지역·기간 대표성을 요구한다. "월 N 숨 수입" 표현은 `measured` 이상 증거 없이는 `draft`.
- 언어·UI: 앱 UI가 UZ(라틴)·RU를 모두 지원하는지 `product_identity_lock`에 기록. 스크린샷 언어와 광고 언어 일치.
- 구독·결제 조건: 숨(UZS) 표기, 자동 갱신·해지 안내는 한국 기준과 같이 클레임 옆에. 현지 전자상거래법상 고지 의무는 현지 확인 필요.
- B2B SaaS: 정부·국영 기업 대상 판매는 인증·현지 파트너 요건이 있을 수 있다. "정부 승인 솔루션" 표현은 공식 근거 없이는 `prohibited_or_high_risk`.
- 앱 스토어·결제: Google Play 결제 제약과 현지 카드(UzCard·Humo) 결제 지원 여부가 설치 후 이탈 요인이다. `product_identity_lock`에 지원 결제 수단을 기록.
- 정부 디지털 서비스 연동(my.gov.uz, 전자서명 등) 클레임은 공식 연동 승인 없이는 `prohibited_or_high_risk`.
- 트리거(UZ): "ilova reklamasi"(앱 광고), "SaaS reklama dalili"(SaaS 광고 증거).
