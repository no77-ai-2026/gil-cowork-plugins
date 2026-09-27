# 숙박·여행 플레이북 (hospitality-travel)

호텔·리조트·호스텔·휴가용 렌탈·숙박 브랜드·목적지 조직·관광 캠페인·예약 가능한 로컬 경험을 영감 → 비교 → 예약 → 도착 → 경험 → 재방문에 걸쳐 신뢰할 수 있는 약속으로 만드는 `industry_direction` 패킷을 만든다. 현행 매물 데이터와 목적지 공동체 의견이 일반 모범 사례보다 우선한다. 법률 자문이 아니다.

경계: 매물 매매·임대는 `space-real-estate`. 식당이 주 목적지이고 예약이 행동이면 `food-dining`, 호텔 부대시설이면 이 플레이북이 여정 소유. 객실 크기·조망·침대·접근·편의시설·운영 상태·요금·거리·가용성·지속가능성·문화적 의미를 외관만으로 추론하지 않는다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 현행 객실·편의시설·목적지·요금·정책·접근·가용성 증거는 `proof_objects`와 `claim_ledger`, 캡처 라이브러리는 `must_capture`, 공간·문화 통제는 `directing_rules`, 게시 통제는 `required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에.

```yaml
mode_or_subtype: "hotel | resort | hostel | vacation-rental | destination | experience"
reference_route: {domain_id: "hospitality-travel", l1: "Hospitality Photography", l2: "", query_count: 1}
```

`domain_extensions` 권장 키: `trip_purpose`, `party_context`, `booking_horizon`, `stay_truth_ledger`, `total_price_basis`, `cultural_authority`.

## Strategic job

| 잡 | 풀어야 할 결정 | 주 증거 | 행동 |
|---|---|---|---|
| destination inspiration | 왜 이 장소, 지금, 이 여행에 | 독특한 장소, 계절, 경험, 책임 있는 행동 | 탐색, 저장 |
| property fit | 내 목적과 일행에 맞나 | 객실, 배치, 편의시설, 접근, 위치 맥락 | 객실 보기, 비교 |
| booking conversion | 오퍼를 믿고 예약을 완료할 수 있나 | 현행 객실, 가용성, 정책, 총액 사실 | 예약 |
| upgrade or ancillary spend | 상위 등급·추가가 값어치 있나 | 구별되는 객실 특징, 조망, 스파, 다이닝, 액티비티 | 업그레이드, 추가 |
| direct booking | 왜 자사 채널인가 | 승인된 직접 예약 혜택, 서비스, 유연성 | 직접 예약 |
| pre-arrival confidence | 도착과 이용은 어떨까 | 접근, 체크인, 교통, 실무 안내 | 계획, 체크인 완료 |
| loyalty and advocacy | 무엇이 재방문·추천할 가치가 있나 | 기억되는 서비스, 로컬 연결, 반복 가치 | 리뷰, 재방문 |

여행자를 연령·국적·장애·가족 상태 등 보호·민감 특성만으로 정의하지 않는다. 여행 목적, 명시적으로 제공된 일행 니즈, 예약 시점, 친숙도, 원하는 경험, 운영 제약으로 세분화한다.

## Audience and journey

Dream → Research → Compare(객실 유형·침대·욕실·조망·편의시설·리뷰·접근·정책·총비용) → Book(가용성·정확한 오퍼·필수 요금·취소·결제) → Prepare → Stay or visit → Remember(리뷰·공유·멤버십·재방문, 허락받은 CRM).

주 마찰: 공간 불확실, 숨은 비용, 위치, 소음, 접근성, 날씨, 문화적 행동, 아동·업무 적합성, 서비스 가용성, 객실 등급 차이.

## Proof architecture

- **매물 정체**: 검증된 이름, 카테고리, 주소 또는 승인된 위치 설명, 외관, 도착, 현행 브랜드 자산
- **객실 진실**: 정확한 객실 유형, 침대 구성, 욕실, 조망, 층·접근(승인 시), 정원, 주방, 의미 있는 공간 관계
- **편의시설 진실**: 홍보하는 각 시설의 현재 상태와 운영시간, 자격, 계절, 예약 필요, 폐쇄 여부
- **경험 증거**: 신뢰할 수 있는 투숙객 스케일 사용, 실제 서비스 접점, 도착에서 휴식·업무·다이닝·웰니스·탐험까지의 시퀀스
- **장소 증거**: 주변·경관·문화·교통·명소와의 진실한 관계. 없는 소유·근접·배타성을 암시하지 않음
- **거래 증거**: 현행 요금 또는 승인 오퍼, 필수 요금, 조건, 날짜, 가용성 논리, 취소, CTA
- **책임 증거**: 측정 가능한 지속가능성·지역사회 클레임, 방문자 행동 안내, 입증된 로컬 혜택

입력을 `verified property fact | visible source fact | approved substantiated claim | host-community guidance | creative proposal | unresolved`로 분류한다.

## Visual narrative

연결 없는 뷰티 갤러리가 아니라 도착-투숙 시퀀스: 경관·거리·외관(장소감과 접근) → 입구·로비·리셉션(환영과 방향) → 객실 와이드·특징·욕실·조망·디테일(적합성) → 편의시설·서비스(선택·업그레이드 이유) → 투숙객 스케일 행동(모든 프레임을 스톡 라이프스타일로 만들지 않음) → 주변·문화·음식·자연(책임 있는 확장) → 접근·실무 프레임 → 클로징 히어로 또는 기억 단서.

로컬 사람과 문화는 자기 현재 장소의 참여자이지 이국적 장식이 아니다. 유산·공동체 의미가 걸리면 내러티브 고정 전에 적절한 해석과 동의를 받는다.

## Directing and capture

- 눈높이, 수평 카메라, 곧은 수직선, 자연스러운 스케일. 와이드 렌즈로 벽·침대·수영장·조망을 늘리지 않는다
- 리스팅 이해용 가로 와이드 다음 캐릭터용 미드·클로즈. 거의 같은 모서리를 반복하지 않는다
- 자연광 또는 그럴듯한 실용광. 창 조망, 외부 빛, 날씨, 시간대를 내부적으로 일관되게
- 하우스키핑·운영 준비 후, 투숙객 사용 전에 촬영. 잡동사니는 제거하되 영구 제약은 유지
- 일반 투숙객이 받지 못하는 웰컴 기프트·꽃·장식·서비스 세팅은 별도 오퍼로 명확히 프레이밍하지 않는 한 추가하지 않는다

기준 캡처 라이브러리(`must_capture`): exterior and context(매물과 주변의 진실한 관계) / entrance and welcome(입구·로비·리셉션·셀프 체크인 경로) / each promoted room type(객실 뷰 3개 + 욕실 1개, 해당 시 조망·주방) / each key amenity(식별 프레임 + 선택을 이끄는 경우 사용·디테일) / service(약속 중심 서비스마다 접점 하나) / guest experience(초상권 확보된 목적 있는 행동) / destination(실제 로컬 맥락과 관계 설명) / accessibility(경로·입구·객실·욕실·주차·측정·한계) / motion and flow(안정적 도착·객실·편의시설 시퀀스). 객실 수량 기준은 Expedia 유래 리스팅 기준이지 보편 법칙이 아니다.

## Channel deliverables

OTA 리스팅(야놀자·여기어때·Booking·Agoda 등: 완전한 객실 유형 갤러리·욕실·조망·편의시설·외관·로비·접근·캡션·정책·요금·가용성 메타데이터) / 직접 예약(차별화 스토리·객실 비교·예약 이유·신뢰 증거·FAQ·승인 오퍼·결제 경로 하나, gil-commerce:detail-page-planner 해당 번들 설치 시) / 목적지 캠페인(장소감·일정·계절·접근·방문자 행동·지역 혜택) / 유료 매체(여행 맥락·차별점·증거·예약 액션 각 하나) / 숏폼 영상(즉각적 위치·객실 정체, 일관된 워크스루, 승인 호스트 경험, 대가 고지, 실무 CTA) / 도착 전·투숙 후(접근·체크인·날씨·행동 안내, 리뷰·재방문·멤버십은 동의된 CRM).

## Prompt kernel

```text
[전략 잡] [여행 목적과 여행자 맥락]의 [여정 단계]에서 [행동 하나]로 이어지는 [자산 역할].
[숙박·목적지 진실] 매물/목적지와 홍보 단위: [검증된 정체]. [현행 객실·침대·욕실·조망·편의시설·서비스·접근·위치·오퍼·정책 사실]만 묘사. 프레임은 [적합·업그레이드·경험·거래·책임 클레임 하나]를 증명. 미지·시한부 사실: [목록].
[시각 내러티브] 시퀀스 역할: [place / arrival / room / bath / view / amenity / service / local experience / access / memory]. 뷰와 스케일, 빛·시간 연속성, 투숙객 행동, 장소감 요소와 실제 관계: [값].
[채널] 배치, 비율·길이, 세이프 에어리어, 캡션 사실, 승인 메시지, 정확한 CTA: [값].
[가드레일] 객실 치수·동선·영구 특징·조망·편의시설 상태·문화적 의미·접근 한계·가격/정책 진실 보존. 근접·배타·희소·서비스·지속가능성·접근성·보증·평점·요금·가용성 발명 금지. [권리, 프라이버시, 문화, 드론, 환경 클레임, 접근성, 총액, 플랫폼, 관할 게이트] 적용.
```

## Claims and safety gates

보류 조건: 초광각 왜곡·강제 원근·조망 교체·생성 편집이 객실·수영장·해변·경관·거리를 오도; 객실 유형·침대·욕실·조망·편의시설·서비스·정책·요금·수수료·가용성·개장 상태·교통·접근 특징이 현행 검증되지 않음; 필수 요금이 관할·플랫폼이 금지하는 방식으로 분리·지연됨; 접근성이 필요한 경로·측정·특징·한계·검토 증거 없이 주장됨; 환경·문화·지역 혜택·유산·안전·인기·순위·리뷰 클레임에 근거 없음; 주민·투숙객·직원·크리에이터·가이드·예술가·미성년자·사유지·예술품·음악에 필요한 허가 없음; 항공·제한 구역 촬영에 소유자·현지 승인 없음; 목적지 마케팅이 현재의 사회·문화·환경 현실을 지우거나 해로운 행동을 조장하거나 공동체 정체성을 의미 있는 참여 없이 사용; 증정 숙박·제휴 링크·직원 관계 등 대가 관계 미고지.

한국은 관광진흥법상 숙박업 등록·등급 표시, 총액 표시(부가세·봉사료 포함) 관행을 확인한다. 규제된 가격·접근·환경·문화·안전·권리 질문은 적절한 검토로 넘기고 법적 판단을 내리지 않는다.

## Reference handoff

| L1 | 직접 L2 옵션 |
|---|---|
| Hospitality Photography | Hotel Photography; Resort Photography; Guest Room Photography; Hotel Amenity Photography |
| Travel Campaign Design | Destination Campaign Design; Tourism Campaign Design; Travel Experience Campaign Design |

허용: `Hospitality Photography` 다음 `Guest Room Photography`; `Travel Campaign Design` 다음 `Destination Campaign Design`. L2 결합, 스타일·렌즈·조명·장소·색·감정·품질·레이아웃·플랫폼·브랜드·크리에이터·캠페인 수식어 금지. `Luxury Bali boutique hotel infinity pool sunset drone honeymoon`은 무효. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 플랫폼·시장·관할 한계가 있다.

- Expedia Group, Photo Toolkit: Quality Guidelines: https://partner.expediagroup.com/content/dam/unified/partner/documents/photo-toolkit/expedia-group-photo-toolkit-guidelines_en-us.pdf
- Expedia Group, 6 tips to improve your hotel property listing: https://partner.expediagroup.com/en-gb/resources/blog/hotel-booking-success-guide-expedia-partner-central
- Airbnb, How to take great photos for your listing (2024-11-08 갱신): https://www.airbnb.com/resources/hosting-homes/a/how-to-take-great-photos-for-your-listing-687
- Airbnb, How to photograph accessibility features (2024-12-02 갱신): https://www.airbnb.com/resources/hosting-homes/a/how-to-photograph-accessibility-features-30
- UNESCO World Heritage Centre, Guide 5: Communicating with visitors: https://whc.unesco.org/en/sustainabletourismtoolkit/guide5/
- U.S. FTC, Rule on Unfair or Deceptive Fees FAQ (2025): https://search.ftc.gov/business-guidance/resources/rule-unfair-or-deceptive-fees-frequently-asked-questions

## UZ 듀얼 주석

- 숙박업 등록·등급: 우즈베키스탄 호텔·게스트하우스는 관광 당국(관광위원회 계열)의 등록·분류 대상이며 별 등급은 공식 분류 결과만 표기한다. "5성급" 클레임은 분류 증명서 없이는 `missing`. 소규모 게스트하우스(mehmonxona)·홈스테이 등록 제도의 세부는 현지 확인 필요.
- 외국인 투숙 등록: 외국인 투숙객의 체류 등록(registratsiya)은 숙박업소 의무다. 한국 여행자 대상 콘텐츠의 "실무 안내" 프레임에 이 절차를 포함한다.
- 총액 표기: 관광세·부가세 포함 여부를 `total_price_basis`에 명시. 달러 호가 관행이 있으나 결제·표시 통화 규정은 현지 확인 필요.
- 문화 유산: 사마르칸트·부하라·히바 등 유네스코 유산 지역 촬영은 문화재 당국 허가와 UNESCO 가이드(위 출처) 원칙을 함께 적용한다. 종교 시설(마스지드·마드라사) 내부 촬영은 `human_review_gate: before generation`.
- 장면: 초이호나, 마할라 손님 접대(mehmondo'stlik), 실크로드 관광, 타슈켄트 지하철 역사 등은 강한 장소 증거다. 드론 촬영은 허가 대상이므로 항공 샷은 사전 승인.
- 채널: Booking.com, Ostrovok 등 OTA와 Telegram 예약 채널, Yandex Travel. 한국 여행자 대상은 KR 채널과 병행.
- 언어: 안내는 UZ·RU·EN 병기, 한국 여행자 대상은 KR 추가. 할랄 식사 제공 여부, 기도 공간은 편의시설 진실로 표기.
- 접근성: 유산 지역 계단·비포장 구간이 많아 접근성 클레임은 실측 증거 없이는 `draft`.
- 한국 여행자 세그먼트: 비자 면제(단기) 조건과 항공 노선(인천-타슈켄트)을 `pre-arrival confidence` 단계 실무 안내에 포함. 비자 조건은 현행 확인 필요.
- 지속가능성·지역 혜택: 아랄해 등 환경 이슈를 목적지 스토리에 쓸 때 "환경 보호 기여" 클레임은 측정 방법 없이는 `missing`.
- 트리거(UZ): "mehmonxona reklamasi"(호텔 광고), "sayohat kampaniyasi"(여행 캠페인). 여행 일정은 gil:travel-planner(해당 번들 설치 시).
