# 소비자 테크 플레이북 (consumer-tech)

소비자 가전, 커넥티드 디바이스, 웨어러블, 컴퓨팅, 오디오, 게이밍 하드웨어, 스마트홈 제품에 특화된 판단 틀이다. 증거와 방향의 체계이지 엔지니어링·시험소·인증·프라이버시·건강·제품안전·유통사·환경·법무 검토를 대신하지 않는다. 법률 자문이 아니다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 유지한다. 유용한 제품 세부는 `domain_extensions` 아래에 둔다.

```yaml
mode_or_subtype: "smartphone | laptop | audio | wearable | smart-home | other-consumer-tech"
reference_route: {domain_id: "consumer-tech", l1: "Consumer Electronics Photography", l2: "", query_count: 1}
domain_extensions:
  domain: "consumer-tech"
  product_identity_lock: {}       # 제조사·모델·리비전·시장·마감·치수·포트·구성품·펌웨어 의존
  campaign_type: ""                # launch | consideration | retail | setup | ecosystem | lifecycle
  approved_fact_ledger: []
  proof_plan: []
  prompt_kernel: ""
  risk_and_approvals: []
```

`required_disclosures`에 매핑: 정확한 모델·SKU·리비전·시장, 시뮬레이션 화면·예시 CGI, 시험 방법·조건, 호환성, 필수 액세서리·허브·계정·네트워크·구독, 구성품, 인증 범위, 안전 한계, 가격·재고·판매자·보증·반품·갱신·배송·프로모션 조건.
`prohibited_or_high_risk`에 매핑: 지어낸 하드웨어·UI, 거짓 상호운용성, 불평등 비교, 안전하지 않은 사용, 미검증 인증, 누락된 의존성·구성품 모호성, 뒷받침 없는 성능·내구·건강·프라이버시·보안·AI·환경 클레임.
`human_review_gate`: 위험 시연, 아동, 의료·웰니스 함의, 민감 데이터, 미공개 제품, 통제된 시험·인증 자료면 `before generation`; 그 외 제품·호환·성능·인증·안전·가격·리뷰·프라이버시·보안·AI·환경 클레임은 최소 `before publication`. 앞선 게이트가 게시 전 재확인을 없애지 않는다.

정확한 제품 정체·구성품·호환성·중요 클레임을 검증할 수 없으면 해당 자산을 `blocked`로 표시하거나 검증된 증거 중심으로 재설계한다. 비슷하게 생긴 모델로 대체하거나 뒷받침 없는 기술 클레임을 라이프스타일 암시로 바꾸지 않는다.

## Strategic job

주 캠페인 잡 하나:

- category or brand entry: 적극 비교 전에 제품을 알아볼 수 있고 관련 있게 만든다
- launch: 제품의 차이를 세우고 그 뒤의 메커니즘을 시연한다
- consideration or comparison: 적합성·성능·호환성·내구성·프라이버시·총비용의 불확실성을 줄인다
- retail conversion: 정확한 모델·구성품·가격·재고·배송·보증·반품을 구매에 연결한다
- setup and adoption: 소유자가 안전하고 올바르게 첫 가치에 도달하게 한다
- ecosystem: 검증된 여러 기기·서비스가 함께 작동하는 모습을 미지원 상호운용성 암시 없이 보여준다
- lifecycle: 기능 발견, 액세서리, 수리, 보상판매, 업그레이드, 구독, 유지, 옹호

잡은 "미래적으로 보이게"가 아니다. 콘텐츠가 어떤 구매 리스크를 해소하고 어떤 증거가 행동 허가를 주는지 정의한다.

## Audience and journey

`trigger → discovery → review and exploration → specification and alternative comparison → compatibility and risk validation → retailer and price evaluation → purchase → setup and learning → continued use → review, referral, repair, or upgrade`

사용자·결제자·구매자·선물자·설치자·가구 구성원·보호자·계정 소유자·에코시스템 소유자·신뢰하는 리뷰어가 다르면 구분한다. 고관여 기기는 여러 리스크가 동시에 걸린다:

- functional: 약속한 일을 해내는가
- compatibility: 보유 기기·네트워크·소프트웨어·액세서리·서비스와 작동하는가
- financial: 무엇이 포함되고 어떤 반복·액세서리·수리·교체 비용이 남는가
- safety and privacy: 안전하게 충전·착용·설치·연결·신뢰할 수 있는가
- physical: 크기·핏·무게·포트 위치·조작 거리·내구성·재질이 사용자에 맞는가
- social and temporal: 충분히 오래 지원·수리·수용·유용할 것인가

모든 리스크를 "혁신" 메시지 하나로 압축하지 않는다. 주 마찰 하나를 고르고 나머지는 보조 자산에 분배한다.

## Proof architecture

### 제품 정체 증거

출처 기반 정체 시트를 유지한다:

- 제조사, 제품명, 모델·SKU, 하드웨어 리비전, 대상 시장, 생산 상태
- 치수, 무게, 마감, 재질, 색, 이음새, 체결부, 개구부, 포트, 버튼, 다이얼, 카메라, 마이크, 센서, 통풍구, 받침, 라벨
- 화면 크기와 베젤, 표시 상태, 인디케이터, 동반 앱, 펌웨어, OS, 계정 의존성
- 박스, 표준 구성품, 옵션 액세서리, 소모품, 교체 부품, 케이블, 어댑터, 전원

별개 지역 모델·세대·저장 용량·번들·프로토타입의 물리 세부나 기능을 합치지 않는다.

### 사용·메커니즘 증거

- 실제 인체 스케일과 그럴듯한 그립·핏·배치·설치·청취 위치로 보여준다
- 사용 편의성을 주장하면 설정과 상호작용을 연속 시퀀스로 보여준다
- 기기 능력과 동반 앱·클라우드·구독·폰·네트워크·액세서리·서드파티 능력을 구분한다
- 다이어그램·컷어웨이·분해도·신호 경로·애니메이션은 설명 그래픽이지 사진이 아니다
- 시뮬레이션 화면, 단축 시퀀스, 예시 효과는 중요하면 표기한다

### 성능 증거

다음 클레임에는 모델·펌웨어·시험 방법·장비·환경·표본·기준선·비교군·단위·작동 상태·불확실성을 기록한다:

- 배터리, 충전, 전력, 런타임, 대기, 에너지, 열
- 프로세서, 저장, 메모리, 지연, 전송, 네트워크, AI 성능
- 디스플레이 밝기, 색, 대비, 주사율, 응답, 내구
- 오디오 응답, 음량, 차음, 노이즈 캔슬링, 마이크, 음성 수음
- 카메라, 센서, 트래킹, 위치, 감지, 인식
- 방수, 방진, 낙하, 충격, 온도, 마모, 세척, 재질 내성

나란히 비교는 동일한 실질 조건이 필요하다. 공학적 최대치, 피크, 실험실 결과, 선별 표본을 일반적 결과로 제시하지 않는다.

### 호환·소유 증거

- 지원 기기·버전·표준·커넥터·국가·언어·계정·구독·네트워크·서드파티 의존성을 명시한다
- 하위 호환, 베타, 예정, 어댑터, 옵션 허브, 유료 티어를 구분한다
- 보증, 배터리·소모품 교체, 수리, 반품, 업데이트 지원, 재활용, 보상판매 조건은 승인된 현행 출처에서만
- 스마트홈: 권한, 가구 접근, 원격 접근, 데이터 흐름, 정전 시 동작, 수동 오버라이드, 안전 실패
- 웨어러블·웰니스: 측정 신호, 추정치, 웰니스 인사이트, 규제 의료 기능을 구분

### 인증·안전 증거

- KC, FCC, UL, ENERGY STAR, Bluetooth, Wi-Fi, 방진방수 등급, 시험소 마크는 정확한 모델과 범위를 먼저 확인한다
- 부품 인증이 완제품을 자동으로 인증하지 않는다
- 한 조건의 시험 통과가 "모든 조건에서 안전", "파괴 불가", "완전 방수"를 뒷받침하지 않는다
- 과열, 화재, 감전, 열화상, 배터리 분출, 충전기 오용, 작은 부품, 자석, 청력, 피부 접촉, 거치, 전도를 제품별 위험으로 다룬다

### 거래·리뷰 증거

정확한 모델, 판매자, 시장, 가격, 통화, 재고, 프로모션, 번들, 배송, 보증, 반품, 구독, 갱신, 타임스탬프를 기록한다. 사진 속 어떤 물건이 포함인지 명확히 한다. 리뷰와 크리에이터 클레임은 실제 경험이어야 하고 대가 관계를 고지하며 광고주가 직접 합법적으로 할 수 있는 증거 범위 안에 머문다.

## Visual narrative

증거가 풍부한 시퀀스:

1. 알아볼 수 있는 사용자의 긴장 또는 열망
2. 제품과 브랜드가 초반에 식별 가능한 뷰로 등장
3. 물리적 디자인 또는 상호작용 메커니즘
4. 실제 인체·환경 스케일 속 제품
5. 보이는 결과 또는 통제된 측정
6. 호환·안전·패키지·소유 안심
7. 정확한 모델, 오퍼, 다음 행동

욕망과 검사 가능성의 균형. 히어로 이미지는 기억을 만들고, 정사영·매크로·손에 든·연결·화면·패키지·비교 뷰는 구매 리스크를 줄인다. 분위기 효과로 포트·조작부·두께·표면 결함·케이블 요구·액세서리를 숨기지 않는다.

## Directing and capture

### 스틸라이프 시스템

- 표현적 캠페인 작업 전에 정확한 중립 팩샷을 만든다
- 정면, 후면, 측면, 3/4, 상단·하단, 포트, 조작부, 인디케이터, 센서, 재질 전환, 패키지, 구성품을 커버한다
- 그레이징·그라디언트 광으로 금속·유리·플라스틱·패브릭·세라믹·고무·코팅을 마감·색 변경 없이 설명한다
- 가장자리 기하, 이음새 폭, 버튼 높이, 커넥터 형상, 각인, 로고, 베젤, 스케일을 캡처와 리터칭에서 보존한다
- 먼지·지문 정리는 보수적으로. 질감, 제조 라인, 규제 라벨, 기능 개구부를 지우지 않는다

### 인체 스케일·시나리오

- 실제 핏과 사용에 맞는 손·몸·집·책상·이동성·피부톤·환경을 캐스팅한다
- 그립, 케이블 굽힘, 웨어러블 위치, 음향 밀착, 시선, 도달 거리, 통풍, 여유 공간, 설치, 페어링이 그럴듯해야 한다
- 제품에 맞는 안전 장비, 경고, 성인 감독, 설치 관행을 보여준다
- 웨어러블·웰니스 제품이 진단·치료·예방·건강 결과 보장을 암시하지 않는다(별도 승인과 근거 없이는)

### 화면·인디케이터·커넥티드 동작

- 필요하면 네이티브 화면을 별도 캡처해 올바른 원근·밝기·블랙 레벨·주사율·반사·가림으로 합성한다
- 아이콘, 언어, 데이터, 알림, 배터리 상태, 시간, 연결, 제품 반응을 샷 간에 일관되게 유지한다
- 시뮬레이션 화면은 표기하고 기능·결과·서드파티 서비스·프라이버시 상태를 지어내지 않는다
- 이름, 메시지, 건강 데이터, 집 위치, Wi-Fi 정보, 계정 ID, 얼굴 등 개인정보를 제거한다

### 모션·사운드

- 6~15초: 즉각적 제품 인지와 감각 상호작용 또는 기능 하나
- 20~30초: 믿을 이유 하나가 있는 런칭 내러티브
- 45~90초: 설정, 기능, 언박싱, 일상 사용, 비교 증거
- 롱폼: 리뷰, 튜토리얼, 접근성, 수리, 에코시스템, 방법이 보이는 통제 시험
- 매크로 모션, 조립, 인디케이터, 화면 반응, 인간 반응으로 인과를 설명한다
- 사운드는 재질과 피드백을 강화할 수 있지만 없는 파워·정숙·차음·속도·촉감을 암시하지 않는다

### CGI·생성 이미지·다이어그램

- 승인된 사진·CAD·치수·재질·포트·조작부 위치·라벨·디스플레이·액세서리와 일치시킨다
- 힌지, 케이블, 패브릭, 유리, 액체, 입자, 열, 음향, 신호, 물리가 그럴듯해야 한다
- 프로토타입, 컨셉, 시뮬레이션 화면, 연출, 확대 구조, 예시 신호는 생략 시 제품 이해가 바뀌면 표기한다
- 인디케이터 밝기, 표시 면적, 얇기, 카메라 출력, 내부 구조, 내구성, 구성품을 증거 이상으로 미화하지 않는다

## Channel deliverables

| 표면 | 증거 기반 산출물 | 적응 원칙 |
|---|---|---|
| 런칭·PR | 키비주얼, 히어로 필름, 디자인·메커니즘 스토리, 프레스 이미지, 팩트시트, 데모 | 정확한 모델과 생산 상태를 보이게. 열망과 사양 분리 |
| 상세페이지 | 팩샷, 갤러리, 치수, 기능, 사양표, 호환성, 구성품, FAQ, 가격·CTA | 모든 이미지·클레임이 선택 SKU와 시장에 일치. gil-commerce:detail-page-planner·detail-page-copy·detail-page-image(해당 번들 설치 시) |
| 쇼핑·유통 피드 | 규격 메인 이미지, 추가 뷰, 라이프스타일, 제목, 속성, 가격, 가용성 | 현행 피드 규칙. 오도하는 오버레이·번들·변형·랜딩 불일치 금지 |
| 소셜·크리에이터 | 세로 기능 루프, 언박싱, 설정, 리뷰, 비교, 일상, 접근성 | 자산당 클레임 하나. 협찬과 비정형 시험·접근 조건 고지 |
| 유튜브·롱폼 | 런칭, 리뷰, 메커니즘, 시험, 튜토리얼, 에코시스템, 유지, 수리 | 방법과 한계를 보여줌. 시연과 보증 구분 |
| 리테일·패키징 | POS, 선반 이미지, 비교 카드, QR 여정, 패키지 패널, 전시 데모 | 구성품·호환·인증·반복 비용·모델 차이 명확 |
| CRM·라이프사이클 | 런칭 메일, 설정, 온보딩, 펌웨어·기능 교육, 액세서리, 갱신, 수리, 보상판매 | 동의 보존. 무료·포함·옵션·유료 구분 |
| 지원·안전 | 설정 가이드, 경고, 배터리·충전 교육, 문제 해결, 서비스·리콜 자산 | 이해와 안전 행동이 홍보 스타일보다 우선 |

제작·게시 직전에 현행 채널 규격, 이미지 규칙, 클레임 배치, 고지, 접근성을 확인한다.

## Prompt kernel

```text
제품 진실:
- 제조사, 제품, 정확한 모델/SKU, 하드웨어·펌웨어 리비전, 시장, 치수, 재질, 마감, 색, 포트, 조작부, 센서, 디스플레이, 구성품, 액세서리, 생산 상태
- 권위 출처와 미해결 세부

전략 잡:
- 캠페인 유형, 대상·결정 역할, 여정 단계, 마찰, 원하는 믿음, 원하는 행동, KPI

증거 객체:
- 정확한 사용·메커니즘·성능·호환·안전·인증·소유·가격·패키지 증거
- 방법, 조건, 범위, 한정

방향:
- 내러티브 비트, 스틸라이프 커버리지, 인체 스케일 맥락, 카메라·조명 논리, 화면 상태, 모션·사운드, 브랜드 단서, 카피 위계, CTA

필수 한정:
- 시험 방법, 대표 결과, 호환성, 필수 액세서리·서비스, 구독, 구성품, 인증 범위, 안전 한계

네거티브 제약:
- 모델·기하·재질·색·포트·조작부·인디케이터·화면·기능·출력·호환·성능·인증·액세서리·가격·오퍼·리뷰·환경 발명 금지
- 안전하지 않은 사용, 불가능한 물리, 미고지 시뮬레이션, 증거 이상의 시각 암시 금지

출력:
- 채널, 치수, 길이, 시장, 언어, 자막, 변형, 유통사 요건, 검토 상태
```

## Claims and safety gates

아래 조건이 미해결이면 게시를 차단한다:

- 묘사된 모델·리비전·색·포트·조작부·화면·액세서리·패키지를 승인 출처와 대조할 수 없음
- 프로토타입·CGI·생성·시뮬레이션·확대·예시 콘텐츠가 양산 제품의 문자 그대로의 증거로 이해될 가능성
- 배터리·충전·성능·내구·방수·방진·열·오디오·디스플레이·카메라·네트워크·AI 클레임에 적용 가능한 방법과 조건이 없음
- 비교가 불평등한 구성·시험 환경·기준선·가격·소프트웨어 버전을 씀
- 호환성, 포함 액세서리, 구독, 필수 허브·폰·네트워크·계정·유료 서비스 누락
- 인증·마크가 무효·만료·미승인·부품 한정·다른 모델·다른 시장이거나 범위를 넘어 제시됨
- 알려진 결함·리콜·과열·화재·감전·화상·배터리·거치·청력·아동 등 중대 위험이 평가·해소되지 않음
- 건강·안전·프라이버시·보안·생체·아동 대상·AI 클레임이 결과에 걸맞은 증거·검토 수준이 아님
- "친환경", "탄소중립", 재활용, 재생, 수리 가능, 에너지 클레임에 정의된 경계와 근거가 없음
- 가격·재고·판매자·번들·보증·반품·갱신·체험·배송·프로모션 등 중요 조건이 누락·불일치
- 리뷰·평점·수상·전문가 발언·크리에이터 관계·일반적 결과 암시가 조작·미승인·오래됨·미고지
- 메인 이미지의 액세서리·수량·화면·결과가 구매자가 받는 것으로 오인될 수 있음

게시 전 정확한 관할·플랫폼·제품 카테고리·모델·오퍼·클레임 유형을 식별한다. 현행 전기·배터리·RF·제품안전·환경·프라이버시·건강·접근성·추천보증·쇼핑 피드·유통사·플랫폼 규칙을 확인하고 URL과 확인일을 기록한다. 신뢰할 만한 신고 대상 위험·리콜 정보가 미해결이면 홍보를 중단하고 에스컬레이션한다. 한국 KC 인증·전파 적합성은 아래 출처에서 모델별 확인.

## Reference handoff

```text
domain: consumer-tech
L1: Consumer Electronics Photography
L2: 0~1개
  - Smartphone Photography
  - Laptop Photography
  - Audio Product Photography
  - Wearable Technology Photography
  - Smart Home Product Photography
```

L1 먼저. 두 번째 검색은 직접 L2 하나만. 에코시스템·번들·다중 제품 자산을 위해 형제 L2를 따로 검색하지 않는다. 스타일·렌즈·카메라·앵글·조명·색·무드·감정·환경·장소·대상·브랜드·모델·캠페인·크리에이터·에이전시·플랫폼·채널·포맷·레이아웃·비율·품질 형용사 금지.

인계에는 이전 가능한 것(구도, 물체 스케일, 표면 가독성, 반사 구조, 여백, 정보 위계, 상호작용 프레이밍, 모션 인과)과 이전 불가한 것(레퍼런스 제품 기하·포트·조작부·화면·로고·카피·액세서리·인물·브랜드 환경·미지원 효과)을 명시한다. 탐색은 gil-creative:reference-board.

## Authority sources

유지되는 결정 기준점으로 쓰고 게시 전 라이브 공식 페이지를 확인한다. 최종 확인 2026-09-04(원문 기준).

- Google & The Behavioural Architects, Decoding Decisions: The Messy Middle (2020): https://www.thinkwithgoogle.com/_qs/documents/9998/Decoding_Decisions_The_Messy_Middle_of_Purchase_Behavior.pdf
- Google Merchant Center, Image Link Requirements: https://support.google.com/merchants/answer/6324350
- Google Merchant Center, Create Rich Product Description Pages: https://support.google.com/merchants/answer/9479464
- FTC, Advertising FAQs: A Guide for Small Business: https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business
- FTC, Consumer Reviews and Testimonials Rule Q&A (2024): https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- FTC, Environmental Claims: Summary of the Green Guides (2012): https://www.ftc.gov/business-guidance/resources/environmental-claims-summary-green-guides
- FTC, Start with Security (2015): https://www.ftc.gov/business-guidance/resources/start-security-guide-business
- US CPSC, Batteries: https://www.cpsc.gov/Regulations-Laws--Standards/Voluntary-Standards/Topics/Batteries
- US CPSC, Duty to Report to CPSC: https://www.cpsc.gov/Business--Manufacturing/Recall-Guidance/Duty-to-Report-to-CPSC-Rights-and-Responsibilities-of-Businesses
- US FCC, Equipment Authorization System Registrations: https://opendata.fcc.gov/Engineering-Technology/EAS-Equipment-Authorization-Grantee-Registrations/3b3k-34jp
- 한국 Safety Korea, 제품안전 인증정보 검색: https://www.safetykorea.kr/release/itemSearch
- 한국 Safety Korea, 전기용품 및 생활용품 안전관리 대상품목: https://www.safetykorea.kr/policy/targetsSafetyCert2
- 한국 국립전파연구원, 방송통신기자재 적합성평가 제도: https://www.rra.go.kr/ko/license/A_a_about.do
- 한국 공정거래위원회, 추천·보증 등에 관한 표시·광고 심사지침(현행 판 확인): https://www.law.go.kr/LSW/admRulSc.do?eventGubun=060103&menuId=5&query=%EC%B6%94%EC%B2%9C%E3%86%8D%EB%B3%B4%EC%A6%9D+%EB%93%B1%EC%97%90+%EA%B4%80%ED%95%9C+%ED%91%9C%EC%8B%9C%E3%86%8D%EA%B4%91%EA%B3%A0+%EC%8B%AC%EC%82%AC%EC%A7%80%EC%B9%A8&subMenuId=45&tabMenuId=183
- UL Solutions, UL Verify: https://verify.ul.com/

쇼핑·플랫폼 출처는 채널별이고 시험소·인증·법적 요건은 제품과 관할별이다. 권위 로고·부품 기록·자율 표준을 더 넓은 안전 보증으로 바꾸지 않는다.

## UZ 듀얼 주석

- 인증: 우즈베키스탄은 자체 적합성 인증 체계(O'zbekiston sertifikatlash, 통칭 UzStandard 계열)와 EAEU 회원국이 아니어서 EAC 마크가 자동 적용되지 않는다. 광고에 인증 마크를 쓰려면 UZ 인증서와 모델 범위를 확인해야 한다. 세부 제도는 현지 확인 필요.
- 전파·통신 기기: 스마트폰·라우터 등은 UZ 통신 규제기관의 승인·IMEI 등록 제도(수입 단말 등록)가 있다. "정식 수입/등록 단말" 표기가 소비자 신뢰 증거가 되며, 병행수입 여부는 `required_disclosures`에 넣는다. 세부는 현지 확인 필요.
- 전압·플러그: 220V/C·F형 플러그. 구성품에 어댑터 포함 여부를 명시한다.
- 보증·A/S: 현지 공식 서비스센터 유무와 보증 기간을 `proof_objects`에 넣는다. "공식 보증" 클레임은 유통사 계약 증빙 없이는 `draft`.
- 가격·할부: 숨(UZS) 표기, 할부(muddatli to'lov)·BNPL(Uzum Nasiya 등) 조건은 금융 조건으로 원장에 기록. 총액 표기는 현지 확인 필요.
- 채널: Uzum Market, OLX.uz, Yandex Market, Telegram 채널이 주 채널. 각 마켓의 이미지 규격은 gil-commerce:marketplace-uzum, marketplace-olx, yandex-market(해당 번들 설치 시).
- 언어: 사양·안전 경고는 UZ·RU 병기. 국가어 표기 의무는 광고법상 확인 필요.
- 장면: 타슈켄트 아파트 거실, 가족 단위 사용(다세대 동거), 초르수·말리카 전자상가 같은 로컬 장면은 `must_capture`에 쓸 수 있으나 "UZ 1위 판매" 류 순위 클레임은 출처 없이는 `missing`.
- 병행수입·비공식 유통: OLX·바자르 유통 제품은 정품·보증 여부가 핵심 마찰이다. `audience_and_decision_unit`에 "정품 확인자"를 두고 정품 인증 방법을 `proof_objects`에 포함.
- 소비자 보호: 우즈베키스탄 소비자권리보호법상 반품·교환 기간과 조건은 현지 확인 필요. "무조건 환불" 표현은 규정 확인 전 `draft`.
- 트리거(UZ): "telefon reklamasi"(휴대폰 광고), "kafolat muddati"(보증 기간).
