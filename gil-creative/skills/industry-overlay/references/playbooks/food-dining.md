# 식음·다이닝 플레이북 (food-dining)

식당·카페·베이커리·바·푸드홀·다이닝 경험·포장·배달 메뉴·시즌 메뉴·식당 주도 음료 프로그램의 오퍼를 식욕·선택·신뢰·행동이 함께 작동하는 `industry_direction` 패킷으로 바꾼다. 현행 메뉴 데이터·현지 규정·플랫폼 심의를 대체하지 않는다. 법률 자문이 아니다.

경계:
- 이커머스 구매가 주 행동인 포장식품은 일반 제품 워크플로우(오버레이 없음)로 보낸다.
- 다이닝이 호텔 부대시설 중 하나면 `hospitality-travel`이 여정을 소유하고 이 플레이북은 다이닝 모듈만 맡는다.
- 매력적인 이미지에서 성분·양·가격·식이 적합성·원산지·가용성·건강 효능을 추론하지 않는다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 실제 메뉴·운영 증거는 `proof_objects`와 `claim_ledger`, 최소 샷 시스템은 `must_capture`, 캡처 통제는 `directing_rules`, 게시 통제는 `required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

`mode_or_subtype`: `restaurant | cafe | bakery | bar | takeaway | delivery | other-food-dining`
`reference_route`: `domain_id: food-dining`, `l1: Food Photography` 또는 `Beverage Photography`

`domain_extensions` 권장 키: `occasion`, `daypart`, `fulfillment_mode`, `menu_truth_ledger`, `alcohol_involved`, `allergen_info_status`.

## Strategic job

주 잡 하나와 측정 가능한 행동 하나를 고른다. 한 자산이 퍼널 전체를 지게 하지 않는다.

| 잡 | 풀어야 할 결정 | 주 증거 | 유용한 행동 |
|---|---|---|---|
| local discovery | 지금 이 가게가 관련 있고 갈 수 있나 | 알아볼 수 있는 외관, 카테고리, 분위기, 영업시간 | 길찾기, 전화, 방문 |
| reservation or footfall | 이 상황에 맞는 경험인가 | 시그니처 메뉴, 홀 에너지, 서비스, 좌석 맥락 | 예약, 대기 등록 |
| ordering conversion | 정확히 무엇이 오고 값어치가 있나 | 진실한 품목, 양, 재료, 포장 | 담기, 주문 |
| menu or seasonal launch | 무엇이 새롭고 언제까지인가 | 이름 있는 품목, 차별점, 판매 기간 | 메뉴 보기, 지금 시도 |
| average-order-value growth | 무엇이 함께 어울리나 | 실제 세트, 곁들임, 서빙 맥락 | 사이드 추가, 세트 선택 |
| retention or reputation | 다음 경험도 믿을 만한가 | 과정, 일관성, 환대, 검증된 변화 | 재방문, 멤버십 |

세분화는 상황(occasion)·시간대(daypart)·수령 방식·친숙도·구체적 반대 이유로 한다. 출근길 커피, 기념일 저녁, 빠른 점심, 모임, 배달 야식은 각기 다른 증거가 필요하다. 인구통계 고정관념으로 나누지 않는다.

## Audience and journey

범위 안의 단계만 매핑한다.

1. **Discover**: 로컬 검색, 소셜 발견, 추천, 매장 인지
2. **Desire**: 식욕과 상황 적합성이 몇 초 안에 형성
3. **Evaluate**: 메뉴 폭, 가격, 양, 식이 요구, 위치, 대기, 분위기, 사회적 증거가 불확실성을 줄임
4. **Act**: 예약, 주문, 전화, 길찾기, 저장
5. **Experience**: 음식·포장·서비스·공간이 약속과 일치
6. **Return and advocate**: 리뷰, 멤버십, 시즌 재방문, 공유

지배적 마찰을 기록한다: 불분명한 양, 낯선 메뉴, 프리미엄 가격 정당화, 배달 생존성, 식이 불확실성, 주차, 대기 시간, 분위기 불일치. 크리에이티브는 마찰 하나에 관찰 가능한 증거 하나로 답한다.

## Proof architecture

층으로 쌓는다.

- **오퍼 진실**: 현행 품목명, 재료, 양·개수, 가격, 가용성, 수령 방식, 조건
- **감각 증거**: 보이는 질감, 익힘 정도, 온도 단서, 신선도 단서, 색 분리, 스케일. 없는 재료를 지어내지 않음
- **장인 증거**: 조리, 도구, 기법, 재료 출처, 직원 전문성 중 실제로 보여줄 수 있는 것
- **환대 증거**: 도착, 서비스 행동, 좌석, 속도, 소리·에너지의 시각 번역, 상황 적합성
- **거래 증거**: 주문 경로, 예약 조건, 픽업 포장, 세트 구성, 정확한 CTA
- **연속성 증거**: 리스팅·메뉴·광고·배달·매장에서 품목 외형이 일관

증거를 `verified business fact | visible source fact | approved substantiated claim | creative proposal | unresolved`로 분류한다. 앞의 셋만 사실 광고 카피에 쓸 수 있다.

## Visual narrative

식욕 → 확신 → 행동으로 움직이는 시퀀스:

1. 카테고리 또는 테이블 히어로가 즉각적 식욕과 브랜드 세계를 세운다
2. 시그니처 품목이 알아볼 수 있는 형태와 실제 서빙 스케일을 드러낸다
3. 질감, 단면, 붓기, 자르기, 김, 조립이 감각 증거를 준다
4. 재료·조리 프레임이 장인성 또는 출처를 세운다
5. 서비스, 손, 다이닝 맥락이 의도한 상황을 보여준다
6. 외관, 입구, 홀, 포장, 주문 프레임이 실무적 마찰을 없앤다
7. 마지막 프레임은 메시지 하나와 CTA 하나를 위한 여백을 남긴다

식욕을 돋우는 불완전함(부스러기, 물방울, 소스 흐름, 그을림, 김)은 실제 요리에 속할 때만 즉시성 신호로 쓴다. 음식과 경쟁하거나 없는 재료를 암시하는 장식 잡동사니는 피한다.

## Directing and capture

### 카메라·조명 논리

- 쌓인 음식, 층진 디저트, 유리잔, 높이는 낮거나 눈높이 뷰
- 접시 볼륨과 다가가기 쉬운 서빙 시점은 식사자의 3/4 뷰
- 세트, 나눠 먹는 요리, 재료 시스템, 그래픽 배치는 오버헤드
- 클로즈 디테일은 품목을 식별하는 전체 프레임 뒤에만. 정체 없는 질감은 약한 거래 증거
- 사이드·백라이트로 반투명, 광택, 김, 바삭한 가장자리, 음료 색을 드러냄. 스펙큘러는 통제, 음식 색은 그럴듯하게
- 실제 레시피나 그릇을 바꾸지 않고 톤·색·심도 대비로 음식과 배경 분리

### 준비·연속성

- 히어로 표본을 승인하고 양, 개수, 가니시, 그릇, 포장, 방향을 기록
- 열에 민감한 요소는 마지막에 스테이징. 붓기·자르기·늘어남·거품·얼음·김은 타이밍 계획으로 캡처
- 손은 깨끗하고 자연스럽고 운영상 그럴듯하게. 촬영한 음식이 실제 제공된다면 식품 접촉 소품은 안전해야 함
- 낯선 양에는 스케일 단서. 작은 접시, 강제 원근, 크롭으로 요리를 키우지 않음
- 스틸과 영상에 걸쳐 연속성 기록을 유지해 메뉴가 배치 간에 바뀌지 않게 함

### 최소 샷 시스템

| 샷 패밀리 | 필요한 증거 |
|---|---|
| category cover | 가용 품목과 알아볼 수 있는 업종 |
| signature hero | 완전한 실제 품목, 그릇, 양, 가장 강한 차별점 |
| transaction singles | 홍보 품목·실제 세트마다 진실한 프레임 하나 |
| sensory detail | 질감, 단면, 붓기, 자르기, 조립, 온도 단서 |
| ingredient and craft | 실제 재료, 조리, 만드는 사람, 과정 |
| service and occasion | 초상권 확보된 서비스 행동 또는 식사 장면 |
| place | 외관, 접근, 내부, 좌석, 분위기 |
| fulfillment | 매장 제공, 포장 상태, 배달 도착 상태 |
| practical proof | 메뉴, 접근, 식이 정보, 가용성, 주문 경로 |
| adaptable motion | 9:16 클린 액션, 오프닝 아이덴티티와 클로징 CTA 여백 |

## Channel deliverables

- **구글 비즈니스 프로필·네이버 플레이스·로컬 검색**: 알아볼 수 있는 외관, 진실한 내부, 인기 음식·음료, 현행 메뉴, 길찾기·예약 액션
- **배달 마켓플레이스(배민·쿠팡이츠·요기요 등)**: 카테고리 커버, 중앙 배치 단일 품목 이미지, 실제 세트 구성, 읽히는 스케일, 포장, 간결한 설명, 담기 액션
- **자사 사이트·예약·주문 페이지**: 상황 히어로, 시그니처 메뉴, 실무 사실, 증거, FAQ, 전환 경로 하나. 모듈은 gil-commerce:detail-page-planner(해당 번들 설치 시)
- **유료 소셜·디스플레이**: 식욕 트리거 하나, 뒷받침된 이유 하나, 승인된 정확한 오퍼 하나, 배치당 CTA 하나. gil-creative:poster-ad-builder
- **오가닉 숏폼**: 즉각적 품목 정체, 그럴듯한 조리·시식, 정직하고 승인된 반응, 대가 고지, 액션
- **CRM·멤버십**: 재방문 이유, 지정 기간, 실제 혜택, 조건, 딥링크
- **인쇄·메뉴·OOH**: 거리에서 읽히는 품목, 사용 시 정확한 가격·조건, 최소 카피, 위치·액션 단서. gil-creative:print-creative-builder

현행 플랫폼 규격을 제작 시점에 확인한다. 오래된 비율이나 파일 제한을 보편 규칙으로 만들지 않는다.

## Prompt kernel

```text
[전략 잡]
[상황/시간대/수령 방식]의 [여정 단계]에서 [행동 하나]로 이어지는 [자산 역할]을 만든다.

[진실과 증거]
[검증된 품목, 양, 재료, 그릇, 포장, 가격/오퍼 사실]만 묘사한다.
프레임은 [감각·장인·환대·거래 클레임 하나]를 증명해야 한다.
미지 또는 초안 사실: [목록].

[시각 내러티브]
샷 역할: [hero / transaction single / sensory detail / craft / service / place / fulfillment].
피사체와 행동: [실제 요리·음료와 그럴듯한 행동].
뷰와 위계: [level / three-quarter / overhead / 식별 프레임 뒤 클로즈 디테일].
빛과 재질 반응: [방향, 부드러움, 대비, 질감 거동].
환경과 소품: [실제 서비스 맥락에 속하는 것만].

[채널]
배치, 비율 또는 길이, 세이프 에어리어, 메시지, 승인 증거, 정확한 CTA: [값].

[가드레일]
실제 양, 레시피에서 보이는 특징, 색, 가니시, 그릇, 포장, 위생, 브랜드 마크를 보존한다.
재료, 효능, 희소성, 인기, 가격, 오퍼, 고객 증언, 서비스 조건을 지어내지 않는다.
[권리, 고지, 식이, 주류, 접근성, 관할 게이트]를 적용한다.
```

## Claims and safety gates

다음이면 게시를 거부하거나 보류한다.

- 촬영 품목이 고객이 받는 것과 실질적으로 다름
- 가격·오퍼·가용성·양·세트·재료·원산지·식이·알레르기·영양·지속가능성·인기·건강 클레임에 현행 승인과 근거가 없음. 한국에서 "건강에 좋은", "다이어트" 류 표현은 식품표시광고법·건강기능식품 오인 여부를 확인한다
- 생성·과편집 이미지가 채널에 맞는 눈에 띄는 표기 없이 음식·포장·매장·서비스 약속을 바꿈
- 비위생적 표면, 안전하지 않은 취급, 미승인 식품 접촉 소품, 불가능한 조리가 보임
- 주류 콘텐츠가 현행 연령 타게팅·묘사·경고·플랫폼 요건과 충돌
- 고객·직원·크리에이터·로고·예술품·음악·인테리어에 필요한 초상권·사용권이 없음
- 유료·증정·직원·제휴 등 대가 관계가 후기와 함께 명확히 고지되지 않음(한국: 추천·보증 심사지침)
- 접근·메뉴·영업시간·주문·예약·수령 정보가 오래됨

게시 전 관할과 플랫폼을 확인한다. 알레르기·건강·주류·가격·규제 클레임은 적절한 검토로 에스컬레이션하고 법적 결론을 내리지 않는다. 문구 점검은 gil-commerce:commerce-ad-claim-compliance-kr(해당 번들 설치 시).

## Reference handoff

| L1 | 직접 L2 옵션 |
|---|---|
| Food Photography | Restaurant Photography; Menu Photography; Dessert Photography; Hotdog Photography; Burger Photography; Bakery Photography |
| Beverage Photography | Cafe Photography; Coffee Photography; Cocktail Photography; Tea Photography |

허용: `Food Photography` 다음 `Menu Photography`. 금지: 여러 서브타입 결합, 요리명·스타일·렌즈·조명·장소·색·감정·품질·레이아웃·플랫폼·브랜드·크리에이터·캠페인 용어 추가. `Moody Seoul omakase tuna macro 85mm Instagram ad photography`는 무효. 요리·품목·무드·카메라·채널 요구는 검색 후 랭킹 브리프에 넣는다. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 조직 내에서는 권위 있으나 플랫폼·관할 한계가 있다. 실제 시장과 배치의 현행 요건을 재확인한다.

- Google Business Profile Help, Tips for business-specific photos on your Business Profile: https://support.google.com/business/answer/6123536?hl=en
- Google Business Profile Help, Get started with a Business Profile for your restaurant: https://support.google.com/business/answer/14189260?hl=en-GB
- Uber Help, Merchant submitted menu catalog photo guidelines: https://help.uber.com/en/merchants-and-restaurants/article/merchant-submitted-menu-catalog-photo-guidelines?nodeId=6985355b-0426-4523-94f2-89bb9b0566e9
- National Restaurant Association, State of the Restaurant Industry 2025: https://go.restaurant.org/rs/078-ZLA-461/images/SOI-2025-Report.pdf
- U.S. FTC, Updated Endorsement Guides (2023-06-29): https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements

## UZ 듀얼 주석

- 할랄 표기: 우즈베키스탄 소비자 다수가 무슬림이므로 할랄(halol) 여부는 핵심 식이 정보다. 할랄 인증 마크 사용은 인증기관 확인 없이는 `missing`. "할랄" 문구 자체도 `claim_ledger`에 올리고 증거(인증서·공급처)를 붙인다. 인증 제도 세부는 현지 확인 필요.
- 주류: 이슬람 문화 맥락과 우즈벡 광고법의 주류 광고 제한이 함께 작용한다. 바·주류 메뉴 홍보는 `prohibited_or_high_risk`에 기본 등재하고 채널별 허용 여부는 현지 확인 필요.
- 라마단: 라마단(Ramazon) 기간 낮 시간 식사 장면 광고는 문화적 민감성이 있다. `directing_rules`에 기간별 연출 통제를 둔다.
- 배달·주문 채널: Yandex Eats, Uzum Tezkor, Express24 등 현지 배달앱과 Telegram 주문 봇이 주 채널이다. 각 앱의 사진 규격은 제작 시점에 확인.
- 장면: 초이호나(choyxona)의 차와 논(non, 빵), 플로프(osh/plov) 대형 카잔, 초르수 바자르 재료 장면은 강한 로컬 증거가 되지만 원산지 클레임("사마르칸트산")은 공급 증빙 없이는 `draft`.
- 언어: 메뉴·가격 고지는 UZ·RU 병기. 가격은 숨(UZS).
- 위생·표시: 식품 표시 규정과 알레르기 표시 의무는 lex.uz에서 현지 확인 필요.
- 후기·인플루언서: Instagram·Telegram 푸드 블로거 협찬이 흔하다. 대가 관계 고지(reklama 표기) 관행과 의무 범위는 현지 확인 필요. `expression_mode: testimonial` 항목마다 고지 위치 기록.
- 가격 변동: 환율·원가 변동으로 메뉴 가격이 자주 바뀐다. 가격 클레임의 `expiry_or_recheck`를 짧게(30일 이내) 두고 광고 게시 시점에 재확인.
- 트리거(UZ): "restoran reklamasi"(식당 광고), "halol belgisi"(할랄 표기). 마켓플레이스 규격은 gil-commerce:marketplace-uzum(해당 번들 설치 시).
