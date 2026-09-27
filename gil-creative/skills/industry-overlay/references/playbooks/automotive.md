# 자동차 마케팅 플레이북 (automotive)

승용차·EV·모터사이클·상용차의 고관여 마케팅에 특화된 `industry_direction` 패킷을 만든다. 증거·방향 체계이지 법무·도로안전·엔지니어링·형식승인·금융·환경·로케이션·제작 검토를 대신하지 않는다. 법률 자문이 아니다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 유지한다. 차량 세부는 `domain_extensions`에.

```yaml
mode_or_subtype: "car | electric-vehicle | motorcycle | commercial-vehicle"
reference_route: {domain_id: "automotive", l1: "Automotive Photography", l2: "", query_count: 1}
domain_extensions:
  domain: "automotive"
  vehicle_identity_lock: {}       # 제조사·모델·연식·시장·파워트레인·차체·트림·옵션·색·휠·인테리어·배지·생산 상태
  campaign_type: ""                # brand | launch | consideration | retail | fleet | ownership
  approved_fact_ledger: []
  proof_plan: []
  prompt_kernel: ""
  risk_and_approvals: []
```

`required_disclosures`: 정확한 모델·연식·트림·시장·옵션, CGI·시뮬레이션, 시험 조건, 주행거리·충전 조건, ADAS 한계와 운전자 책임, 환경 방법론, 오퍼 가용성, 모든 중요 금융 조건(현금가, 계약금, 할부 원금, 금리(APR 상당), 기간, 회차·월 납입액, 잔가·풍선, 수수료, 자격, 만료, 대표 예시).
`prohibited_or_high_risk`: 대체 트림, 불가능·불안전 주행, 뒷받침 없는 자율주행·안전·성능·주행거리·충전·환경 클레임, 오도하는 시험 편집, 누락·모순된 금융 조건.
`human_review_gate`: 공도 동적 촬영, 리깅, 드론, 스턴트, 위험 행동, 미공개 차량, 안전 시스템 시연은 `before generation`; 그 외 차량·시험·EV·환경·가격·금융·딜러·가용성 클레임은 최소 `before publication`.

정확한 차량 정체나 중요 클레임을 검증할 수 없으면 `blocked` 또는 검증 증거 중심 재설계. 비슷한 트림으로 대체하거나 뒷받침 없는 성능 표현을 부드럽게 바꿔 게시하지 않는다.

## Strategic job

잡 하나: brand or category entry(인지와 고려 이유) | model or powertrain launch(독특한 약속과 차이 증명) | consideration(적합·유틸리티·성능·기술·안전·주행거리·소유 불확실성 해소) | retail and dealer(검증된 재고와 투명한 조건을 방문·문의·예약·주문에 연결) | fleet(듀티 사이클 적합, 가동률, TCO, 안전, 운전자 수용, 충전·연료 운영, 지원) | aftersales and ownership(기능 채택, 서비스, 액세서리, 충전, 관리, 갱신, 옹호).

잡은 "프리미엄하게 보이게"가 아니다. 어떤 구매자 불확실성을 줄이고 어떤 행동이 따르는지 정의한다.

## Audience and journey

`need or identity trigger → category and body-style consideration → household or duty-cycle fit → affordability and TCO → product and safety validation → test drive or dealer → finance/order → delivery and adoption → service/advocacy`

소비자 결정 단위: 운전자, 구매자, 배우자, 자녀, 동승자, 보호자, 충전·주차·보험·정비 담당자. 플릿: 운영, 운전자, 안전, 재무, 조달, 지속가능성, 시설, 충전·연료 인프라, 서비스, 임원 승인.

구매자가 실제로 푸는 질문: 어떤 차가 리스트에 오르나 / 내 사람·도로·화물·주차·업무·정체성에 맞나 / 성능·안전·주행거리·기술·소유 클레임을 믿을 수 있나 / 총 거래와 지속 소유를 감당하나 / 어디서 검사·시승·구성·금융·구매하나. 모터사이클은 라이더 경험, 면허·교육, 보호장비, 동승, 적재, 날씨, 안정성. 상용차는 적재량, 차체 구성, 경로, 가동률, 충전·주유, 서비스, 운전자 안전.

## Proof architecture

- **차량 정체**: 제조사, 모델, 연식, 시장, 차체, 휠베이스, 파워트레인, 트림, 생산 상태; 외장 색, 휠, 램프, 그릴, 센서, 미러, 핸들, 루프, 배기·충전구, 배지, 옵션 패키지; 내장 색, 시트 배치, 핸들 위치, 디스플레이, 조작부, 재질, 화물 시스템, 액세서리. 별개 트림·시장의 특징을 합치지 않음. 양산 전·프로토타입·컨셉·위장·CGI는 중요 시 눈에 띄게 표기
- **제품·유틸리티**: 탑승·화물·견인·적재·수납·주차·접근 클레임은 정확한 구성과 필수 장비로. 실제 치수와 물리적으로 그럴듯한 사람·짐·카시트·도구·상용 적재. 기본·옵션·액세서리·구독·딜러 장착 구분. 커넥티드 기능의 가용성·전제 하드웨어·소프트웨어·지역 제한 명시
- **성능**: 가속·제동·핸들링·소음·효율·주행거리·충전 클레임에 정확한 차량, 타이어, 노면, 날씨, 온도, 적재, 충전 상태·연료, 측정 방법, 시험 주체 기록. 비교는 동등 조건과 명명된 비교군. 최선의 엔지니어링 결과는 일반 소유자 결과가 아님
- **안전·ADAS**: 평가 기관, 시험 연도, 평가 변형, 범주, 점수, 출처. SAE 또는 관할 규제기관 용어. ADAS 시연 옆에 운전자 감시·통제 책임. 작동 설계 조건, 활성 상태, 경고, 인계, 한계, 불가 상황. 충돌 완화를 충돌 방지로, 보조를 자율주행으로 바꾸지 않음
- **EV·환경**: 주행거리는 EPA·WLTP·한국 인증 등 프로토콜, 모델·휠·배터리·조건 명시. 충전은 구간·충전기 유형·출력·배터리 온도·피크/경과 시간. 가정·목적지·공공 충전 구분, 보편 가용성·가격 암시 금지. 배출은 테일파이프·에너지원·제조·생애주기 경계 구분, 무한정 "제로 에미션·클린·그린" 회피. 배터리는 사용 가능·총 용량, 보증, 열화 기준
- **거래**: 가격·금융·리스·리베이트·보상판매·예약·세제·인도·재고 클레임에 정확한 시장, 표시 차량, 필수 비용, 계약금, 기간, 금리, 총 납입, 주행 제한, 자격, 마감, 재고, 타임스탬프. 중요 조건은 클레임 가까이, 배치에서 읽히게

## Visual narrative

알아볼 수 있는 인간·비즈니스·문화적 니즈 → 분명한 모델·브랜드 기억 → 비례·자세·재질·시그니처 디자인 → 의미 있는 사용·동적 능력 하나 → 보이는 메커니즘·측정 증거 → 인테리어·HMI·동승·화물·소유 안심 → 투명한 다음 단계(구성·비교·시승·문의·예약·구매).

브랜드 필름은 감정·은유를 쓸 수 있지만 제품 장면은 식별 가능하고 물리적으로 신뢰할 수 있어야 한다. 동적 영상은 일반적 공격성이 아니라 통제·편안함·지형 적합·효율·유틸리티를 전달한다. 리테일 자산은 시네마틱 모호함보다 정확한 차량·가용성·조건.

## Directing and capture

- 정적: 전·후·측·전후 3/4·캐빈·시트·HMI·수납·휠·재질·램프·포트·기능 디테일. 반사로 곡률을 설명하되 셧라인·센서·배지·질감을 지우지 않음. 도장 색상·메탈릭·유리 틴트·램프 시그니처·휠 마감·트림을 정체 고정과 일치. 중립 리스팅·컨피규레이터 뷰는 표현적 캠페인 프레임과 별도
- 동적: 허가된 장소, 승인 경로, 전문 드라이버·라이더, 보험된 리깅, 크루 통제, 문서화된 안전 계획. 핸들링·제동·가속·오프로드·ADAS 엣지 케이스는 폐쇄 코스. 속도·차선·차간·신호·보호장비·안전벨트·카시트·도로 이용자 행동은 합법·책임 있게. 카메라카·리그·드론·도로 폐쇄 작업을 자발적 공도 행동으로 프레이밍하지 않음. 생성·합성 이미지에서 휠 회전·서스펜션·반사·그림자·타이어 접지·물보라·모션 블러를 그럴듯하게
- 인테리어·HMI·ADAS: 설정과 상세 HMI 상호작용은 정차 중 캡처(검토된 통제 주행 프로토콜 제외). 실제 화면 위계·경고·운전자 감시 상태·내비·단위·언어·조작 피드백 보존. 시선 이탈·손 점유·폰 사용·엔터테인먼트 행동이 시스템·현지법과 충돌하면 금지. 내비 기록·연락처·메시지·번호판·얼굴·집 위치·개인 식별자 마스킹
- CGI·합성: 승인 CAD·사진, 트림, 조명 물리, 타이어 접지, 유리, 센서 가시성, 실제 스케일 일치. 컨셉·양산 전·시뮬레이션 UI·연출·CGI는 생략 시 클레임이 바뀌면 표기. VFX로 캐빈·화물 공간·지상고·조명 출력·화면·안전 범위를 키우지 않음

## Channel deliverables

브랜드·런칭(히어로 필름·키비주얼·디자인 스토리·컷다운; 감정 속에서도 식별 가능한 제품) / 소셜·크리에이터(세로 기능 루프·오너 스토리·워크어라운드·충전 시연; 자산당 클레임 하나, 접근·협찬·양산 전 조건 고지) / 유튜브·롱폼(POV·비교·주행거리·충전·견인·화물; 경험과 통제 시험 분리) / 모델 페이지·컨피규레이터(정확한 갤러리·트림·옵션·치수·가격·CTA; 시장·연식·빌드·가격 동기화) / 검색·재고·딜러(정확한 재고 크리에이티브·오퍼 카드·시승 흐름; 광고와 가용 차량·완전한 조건 일치, 변동 사실 타임스탬프) / 리테일·쇼룸(브로슈어·POS·QR·비교·시승 보조; 기본 vs 옵션 분명하게) / OOH·인쇄·TV(모델 인지 이미지·간결한 클레임·읽히는 한정·안전 주행 묘사) / 플릿(듀티 사이클·적재 증거·TCO·가동률·충전 계획; 가정과 제약 문서화) / 소유(온보딩·ADAS 교육·충전·서비스·리콜; 안전 운행과 이해 우선).

## Prompt kernel

```text
차량 진실: 제조사, 모델, 연식, 시장, 차체, 파워트레인, 트림, 옵션, 도장, 휠, 인테리어, 배지, 생산 상태; 권위 출처와 미해결 세부
전략 잡: 캠페인 유형, 대상·결정 역할, 여정 단계, 마찰, 원하는 믿음, 원하는 행동, KPI
증거 객체: 정확한 디자인·유틸리티·성능·안전·ADAS·주행거리·충전·소유·가격·재고 증거; 시험 방법, 조건, 범위, 한정
방향: 내러티브 비트, 배경 목적, 정적·동적 커버리지, 카메라 거동, 조명·반사 논리, 인간 행동, HMI 상태, 브랜드 단서, 카피 위계, CTA
안전·제작 통제: 공도·폐쇄 코스 상태, 드라이버·라이더, 안전벨트·보호장비, 리깅, 허가, 프라이버시, CGI·시뮬레이션 라벨
네거티브 제약: 모델·트림·기하·배지·휠·램프·센서·캐빈·기능·UI·능력·평가·주행거리·가격·금융·재고·환경 발명 금지; 불안전·불법·공격적·부주의·거짓 자율 주행 암시 금지
출력: 채널, 치수, 길이, 시장, 언어, 자막, 법적 영역, 변형, 검토 상태
```

## Claims and safety gates

차단 조건: 묘사된 모델·트림·옵션·색·연식·시장을 승인 출처와 대조 불가; 컨셉·양산 전·CGI·시뮬레이션 UI가 고객 인도 구성으로 읽힐 가능성; 성능·효율·주행거리·충전·적재·견인·안전·신뢰성·소유 클레임에 적용 가능한 방법·조건 없음; 안전 기능이 모든 충돌을 방지하거나 덜 주의 깊은·빠른·불안전 주행을 허용한다고 기술; 레벨 0~2 보조 시스템이 자율주행으로 표현되거나 운전자 책임이 시각적으로 모순; 공도 행동이 불법·무책임·모방 가능·보호장비·안전벨트 누락; "제로 에미션·그린·클린·재활용·탄소·생애주기" 표현이 측정 시스템 경계 초과; 가격·필수 비용·금리·계약금·기간·총 납입·주행·자격·재고·오퍼 만료가 숨겨지거나 불일치; 안전 수상·평가·시험·리뷰·고객 발언이 다른 변형·연식·지역·시험 범주에 해당; 크리에이터 접근·대가·대여 차량·환대 등 대가 관계 미고지; 장소·도로·드론·리깅·출연·재산·상표·음악·번호판·프라이버시 허가 미완.

한국은 자동차관리법 시행령 제13조의2(매매업자 금지 행위), 표시광고법, 할부거래법·여신전문금융업법상 금융 조건 표시, 환경부 인증 연비·전비 표기를 확인한다. URL과 확인일을 기록하고 법적 결론은 자격 있는 리뷰어로. 마진·ROAS 계산은 gil-commerce:commerce-margin-calculator(해당 번들 설치 시).

## Reference handoff

```text
domain: automotive
L1: Automotive Photography
L2: 0~1개 — Car Photography | Electric Vehicle Photography | Motorcycle Photography | Commercial Vehicle Photography
```

L1 먼저, 두 번째는 직접 L2 하나만. 파워트레인·용도·산출물 변형을 위해 형제를 따로 검색하지 않는다. 스타일·렌즈·카메라·앵글·조명·색·무드·감정·도로·지형·계절·장소·대상·브랜드·모델·캠페인·크리에이터·에이전시·플랫폼·채널·포맷·레이아웃·비율·품질 형용사 금지. 이전 가능: 프레임 속 차량 스케일, 여백, 표면 가독성, 반사 구조, 카메라 모션, 환경 관계, 기능 시퀀싱. 이전 불가: 레퍼런스 차량 기하·배지·휠·램프·인테리어·카피·번호판·인물·브랜드 장소·불안전 행동. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 벤더·플랫폼 여정 조사는 방향성이지 현지 구매자 데이터 대체가 아니다.

- Cox Automotive, 2024 Car Buyer Journey Study (2025): https://www.coxautoinc.com/insights/cox-automotives-car-buyer-journey-study-reveals-record-high-satisfaction-among-new-and-ev-buyers/ · Google & Luth Research, The Car-Buying Process (2015, 역사적 모델): https://www.thinkwithgoogle.com/_qs/documents/192/consumer-car-buying-process-reveals-auto-marketing-opportunities-c.pdf
- NHTSA, Automated Vehicle Safety: https://www.nhtsa.gov/vehicle-safety/automated-vehicle-safety · SAE J3016 (2021): https://saemobilus.sae.org/standards/j3016_202104-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles · NHTSA Driver Distraction Guidelines (2013/2014): https://www.nhtsa.gov/document/visual-manual-nhtsa-driver-distraction-guidelines-vehicle-electronic-devices-0
- FTC, Car Dealer Ads and Promotions (2022): https://consumer.ftc.gov/articles/car-dealer-ads-and-promotions-know-you-go · US EPA, Fuel Economy Label Examples: https://www.epa.gov/fueleconomy/fuel-economy-and-environment-label-examples
- UK ASA/CAP, Motoring Non-broadcast Section 19: https://www.asa.org.uk/type/non_broadcast/code_section/19.html · Broadcast Section 20: https://www.asa.org.uk/type/broadcast/code_section/20.html · Hybrid and EV Advertising: https://www.asa.org.uk/advice-online/motoring-electric-vehicles.html
- 한국, 자동차관리법 시행령 제13조의2 자동차매매업자의 금지 행위: https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=175773
- 한국 공정거래위원회, 부당한 표시·광고 시정: https://www.ftc.go.kr/www/contents.do?key=700
- 한국 공정거래위원회, 추천·보증 등에 관한 표시·광고 심사지침(현행 판 확인): https://www.law.go.kr/LSW/admRulSc.do?eventGubun=060103&menuId=5&query=%EC%B6%94%EC%B2%9C%E3%86%8D%EB%B3%B4%EC%A6%9D+%EB%93%B1%EC%97%90+%EA%B4%80%ED%95%9C+%ED%91%9C%EC%8B%9C%E3%86%8D%EA%B4%91%EA%B3%A0+%EC%8B%AC%EC%82%AC%EC%A7%80%EC%B9%A8&subMenuId=45&tabMenuId=183

## UZ 듀얼 주석

- 시장 특성: 우즈베키스탄 승용차 시장은 UzAuto Motors(GM 계열 모델 생산)의 점유율이 압도적이며, 최근 중국 브랜드(BYD 현지 조립 등)와 EV 수입이 급증했다. "국민차" "1위" 류 시장 지위 클레임은 공식 통계 출처 없이는 `missing`. 수치는 현지 확인 필요.
- 수입·관세: 수입차 가격은 관세·소비세·활용세에 크게 좌우된다. 가격 표시에 세금 포함 여부를 `required_disclosures`에 넣는다. EV 관세 감면 정책은 변동이 잦으므로 `last_policy_check` 필수.
- 금융: 은행 자동차 대출(avtokredit)과 딜러 할부가 흔하다. 금리·기간·계약금·총 납입액을 숨(UZS) 기준으로 표시. 대표 예시 의무 여부는 현지 확인 필요.
- 연료: CNG(메탄) 개조 차량 비중이 높다. 연비·주행거리 클레임에 연료 종류를 명시하고, 개조 안전 관련 표현은 `prohibited_or_high_risk`.
- EV 충전: 타슈켄트 중심으로 공공 충전 인프라가 확장 중이나 지방 가용성은 제한적이다. "어디서나 충전" 류 표현 금지. 충전 클레임에 지역·충전기 유형 명시.
- 안전 평가: 현지 공식 충돌 시험 체계가 제한적이므로 해외 평가(Euro NCAP 등)를 인용할 때 평가 변형·시장이 UZ 판매 사양과 같은지 확인.
- 채널: OLX.uz(중고차), Telegram 딜러 채널, Avtoelon.uz 등. 규격은 gil-commerce:marketplace-olx(해당 번들 설치 시).
- 언어: 카피·금융 조건은 UZ·RU 병기. 도로 장면은 현지 교통법(안전벨트·속도)을 준수하고 타슈켄트 시내·산악 도로(침간) 등은 허가·안전 계획 후 촬영.
- 딜러 채널: 공식 딜러(UzAuto 계열)와 비공식 수입 딜러의 보증 조건이 다르다. `audience_and_decision_unit`에 "보증 확인자"를 두고 공식 보증 여부를 `required_disclosures`에 포함.
- 중고차: 주행거리·사고 이력 클레임은 검사 기록 없이는 `missing`. OLX 리스팅의 "무사고" 표현은 증빙 필수.
- 트리거(UZ): "avtomobil reklamasi"(자동차 광고), "avtokredit shartlari"(자동차 대출 조건).
