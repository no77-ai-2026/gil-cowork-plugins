# 공간·부동산 플레이북 (space-real-estate)

건축 포트폴리오, 인테리어, 상업 공간, 부동산 리스팅을 특정 비즈니스 결정을 위해 읽히고, 매력적이고, 진실하게 만드는 `industry_direction` 패킷을 만든다. 현행 현장·승인 도면·소유자 데이터·리스팅 고지가 일반 크리에이티브 방향보다 우선한다. 법률 자문이 아니다.

경계:
- 단기 숙박·객실 예약은 `hospitality-travel`로. 호텔 건축 사례 연구는 예약이 아닌 전문 디자인 평가가 주 행동일 때만 이 플레이북.
- 원하는 행동: 포트폴리오 평가, 장소 방문, 매매, 임대, 임장, 문의.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 도면·치수·리스팅 사실·재질·접근·원본 이미지는 `proof_objects`와 `claim_ledger`, 최소 공간 샷 시스템은 `must_capture`, 공간 진실 통제는 `directing_rules`, 게시 통제는 `required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

```yaml
mode_or_subtype: "architecture-portfolio | commercial-place | real-estate-listing"
reference_route: {domain_id: "space-real-estate", l1: "Architecture Photography", l2: "", query_count: 1}
```

`domain_extensions` 권장 키: `property_status`(current | under-construction | proposed), `representation_status`(current photograph | documentary edit | virtual staging | rendering | future state), `spatial_truth_ledger`, `transaction_mode`, `disclosure_owner`.

### 모드 하나 선택

- `architecture-portfolio`: 디자인 의도, 기능, 맥락, 재질, 전문 역량 증명
- `commercial-place`: 방문, 임대, 입점 관심, 브랜드 경험, 장소 문의 유도
- `real-estate-listing`: 정확한 비교, 임장, 매매, 임대 지원

## Strategic job

아름다움, 디자인 증명, 거래 진실은 서로 바꿔 쓸 수 없으므로 모드를 먼저 정한다.

| 모드·잡 | 풀어야 할 결정 | 주 증거 | 행동 |
|---|---|---|---|
| architecture portfolio | 이 팀이 내 프로젝트 같은 걸 풀 수 있나 | 디자인 의도, 맥락, 기능, 재질, 지원 공간, 성과 | 사례 보기, 문의 |
| commercial place awareness | 관련 있고 방문할 가치가 있나 | 도착, 분위기, 서비스 기능, 인체 스케일 사용 | 방문, 예약, 문의 |
| tenant or leasing marketing | 내 운영을 지원할 공간인가 | 치수, 배치, 접근, 인프라, 주변, 조건 | 상세 요청, 투어 |
| residential sale or lease | 실제 매물이 내 필요와 가치 판단에 맞나 | 정확한 방, 동선, 외관, 조망, 상태, 리스팅 사실 | 저장, 임장, 연락 |
| development marketing | 지금 뭐가 있고 뭐가 제안이며 인도 기준은 | 상태 표기 사진, 승인 도면·렌더링, 사양 | 등록, 문의 |
| placemaking or reputation | 사용자·지역사회에 어떤 역할인가 | 실제 사용, 접근성, 맥락, 프로그램, 측정 성과 | 참여, 방문, 파트너 |

대상은 결정 역할과 용도로 정의한다: 예비 고객, 심사위원·에디터, 방문자, 임차 대리인, 매수자, 임차인, 투자자, 운영자, 중개사, 지역 이해관계자. 타게팅이나 표현에 보호·민감 특성을 추론하지 않는다.

## Audience and journey

1. **Discover**: 리스팅, 포트폴리오, 소셜, 출판, 사이니지, 소개, 로컬 검색
2. **Orient**: 매물 정체, 상태, 맥락, 접근, 주 용도 이해
3. **Evaluate**: 배치, 비례, 빛, 동선, 재질, 기능, 접근, 조망, 상태, 위치, 승인된 상업 사실 검토
4. **Immerse**: 평면도, 시퀀스, 영상, 3D 투어로 공간 적합성 시험
5. **Act**: 저장, 상세 요청, 임장 예약, 방문, 제출, 문의
6. **Verify**: 미디어를 현장·문서·중개사·소유자·설계팀과 대조
7. **Decide and advocate**: 거래, 선임, 임대, 출판, 수상, 재방문, 추천

주 마찰을 명명한다: 왜곡된 스케일, 불분명한 동선, 빠진 지원 공간, 불확실한 상태, 일반적 디자인 스토리, 위치 모호, 접근, 프라이버시, 보안, 현재/제안 상태 혼동.

## Proof architecture

- **정체·상태**: 검증된 프로젝트·매물 이름, 주소 처리, 준공·가용 상태, 거래 모드, 현재 날짜
- **공간 진실**: 외피, 방 경계, 개구부, 천장·바닥 관계, 영구 요소, 실제 조망, 동선, 인접
- **기능 증거**: 사용자가 무엇을 하고 평면이 어떻게 지원하는지, 뷰티 뷰가 아닌 백오브하우스·지원 공간
- **디자인 증거**: 보이는 형태·재질·디테일·채광·조경·시스템·제약과 연결된 승인된 의도. 디자인 수사를 확인 없이 사실로 바꾸지 않음
- **거래 증거**: 승인된 치수, 편의시설, 상태, 가격·조건, 용도지역·성능 클레임, 책임 당사자가 제공한 필수 고지
- **성과 증거**: 점유율, 에너지, 웰빙, 매출, 생산성, 유동인구, 지역사회, 수상, 지속가능성 클레임은 이름 있는 증거로
- **표현 증거**: 현재 사진, 다큐멘터리 편집, 가상 스테이징, 컨셉 렌더링, 미래 상태 시각화는 구분 가능해야 함

모든 입력을 `observable current condition | approved plan or listing fact | substantiated outcome | creative interpretation | future-state visualization | unresolved`로 분류한다.

## Visual narrative

어디·어떻게·왜에 답하는 공간 시퀀스:

1. 맥락과 접근이 프로젝트·매물의 위치를 잡는다
2. 외관 또는 스토어프론트가 정체, 매스, 문턱, 첫인상을 세운다
3. 진입과 전이가 도착을 설명한다
4. 주 공간 와이드 프레임이 비례와 위계를 세운다
5. 연결 프레임이 인접, 동선, 시선을 보여준다
6. 미드 프레임이 기능, 가구, 시스템, 인체 스케일 사용을 보여준다
7. 클로즈 디테일이 재질, 장인성, 설비, 디자인 결정을 증명한다
8. 조망, 채광, 조경, 시간 프레임이 환경 관계를 보여준다
9. 지원·접근성 프레임이 실무 불확실성을 없앤다
10. 평면도, 3D, 워크스루, 승인 다이어그램이 시퀀스를 조정한다

포트폴리오는 뷰티 프레임마다 디자인·기능 이유를 짝짓는다. 리스팅은 분위기보다 이해와 정확성을 우선한다. 상업 공간은 진실한 공간 증거와 신뢰할 수 있는 점유·서비스 행동을 결합한다.

## Directing and capture

### 계획

- 현행 평면도·배치도에 실내외 카메라 위치를 표시한다
- 사전 답사로 태양, 접근, 보안, 반사, 운영, 점유, 스테이징, 조망 장애물, 제한 구역을 확인한다
- 필수·금지 샷, 소유자·임차인 제한, 인물 초상권, 예술품·브랜드 허가, 라이선스 범위를 기록한다
- 파사드 방향, 채광 거동, 운영 상태, 실제 스토리로 시간을 고른다. 양립 불가한 조건을 합성하지 않는다

### 공간 카메라·조명 논리

- 카메라를 수평으로 유지하고 수직선을 통제한다. 공간에 맞는 서 있거나 앉은 시점을 쓴다
- 축 뷰로 질서·대칭을, 대각·문턱 뷰로 깊이·연결을 설명한다
- 와이드로 방을 세우고 미드로 기능을 증명하고 디테일로 재질·장인성을 증명한다. 디테일은 빠진 공간 맥락을 대신하지 못한다
- 창 크기, 조망 방향, 방 경계, 천장 높이, 영구 요소를 보존한다. 노출 균형은 잡되 실내외를 양립 불가한 현실로 만들지 않는다
- 인물은 스케일·동선·점유·접근성·의도된 행동 증명에만. 자연스러운 행동을 연출하고 초상권을 확보한다
- 임시 잡동사니와 개인 식별자는 제거하되 영구 제약을 디지털로 지우거나 매물을 실질적으로 바꾸지 않는다

### 최소 샷 시스템

| 샷 패밀리 | 필요한 증거 |
|---|---|
| context and approach | 주변·부지 관계와 알아볼 수 있는 도착 |
| exterior | 주 파사드·스토어프론트, 깊이, 접근, 현재 상태 |
| threshold | 진입, 로비, 리셉션, 현관, 전이 |
| primary spaces | 결정을 이끄는 공간의 완전하고 수평이며 진실한 와이드 뷰 |
| spatial connections | 문, 복도, 계단, 개구부, 방 관계 |
| function | 가구, 장비, 백오브하우스, 지원, 실제 사용자 활동 |
| material and detail | 승인된 특징, 접합부, 설비, 장인성, 상태 |
| environment | 조망, 채광, 조경, 외부 조명, 시간 관계 |
| scale and access | 인체 스케일과 사실 기반 접근 경로·측정 |
| immersive proof | 평면도, 안정적 워크스루, 3D 투어, 현행 공간과 정렬된 다이어그램 |
| representation pair | 실질 변경·미래 상태 시각화 옆에 현재 원본 이미지 |

부동산 포털은 활성 플랫폼의 수량·순서 규칙을 따른다. "22~27장" 같은 과거 제안은 채널 휴리스틱이지 보편 요건이 아니다.

## Channel deliverables

- **건축·디자인 포트폴리오**: 사례 히어로, 맥락, 시퀀스, 기능, 디테일, 다이어그램, 팀 역할, 제약, 입증된 성과
- **부동산 리스팅(네이버 부동산·직방·다방 등)**: 순서 있는 갤러리, 평면도, 3D·영상, 사실 캡션, 매물 데이터, 고지, 문의·임장 경로
- **상업 임대**: 용도 증거, 소유자가 제공한 치수·시스템, 접근, 위치, 도면, 조건, 투어 CTA
- **장소 마케팅**: 도착, 분위기, 실제 점유, 서비스 접점, 실무 접근, 행사·예약 경로, 로컬 검색 자산
- **유료 소셜·디스플레이·OOH**: 공간 약속 하나, 보이는 증거 하나, 승인 사실 하나, 행동 하나. gil-creative:poster-ad-builder
- **브로슈어·롱폼 페이지**: 스토리, 증거 위계, 도면·지도, 사양, FAQ, 연락처, 표현 라벨. gil-creative:print-creative-builder, gil-commerce:detail-page-planner(해당 번들 설치 시)
- **가이드 숏폼 영상**: 안정적 경로, 방향 단서, 진실한 공간, 진행자 권위, 고지, 문의·방문 액션

채널마다 현행 비율·길이·리스팅 순서·라벨·접근성 요건을 확인한다.

## Prompt kernel

```text
[모드와 전략 잡]
[결정 역할]의 [여정 단계]에서 [행동 하나]로 이어지는 [architecture portfolio / commercial place / listing] 모드의 [자산 역할]을 만든다.

[공간 진실]
현행 권위: [원본 사진, 도면, 부지 데이터, 승인 사실, 날짜].
[경계, 개구부, 제공된 치수, 천장, 영구 요소, 조망, 재질, 상태, 접근, 브랜드 특징]을 보존한다.
[디자인·기능·장소·거래 명제 하나]를 [이름 있는 증거]로 증명한다.
표현 상태: [current photograph / documentary edit / virtual staging / rendering / future state].

[시각 내러티브]
시퀀스 역할: [context / exterior / threshold / wide / connection / function / detail / environment / access / immersive proof].
카메라 축, 높이, 프레임 역할, 수직 통제, 빛 연속성, 인체 스케일 행동: [값].

[채널]
배치, 비율 또는 길이, 순서, 세이프 에어리어, 승인 메시지, 사실 캡션, 정확한 CTA: [값].

[가드레일]
영구 매물 특징, 조망, 접근, 결함, 주변, 서비스를 추가·제거·확대·은폐·이동하지 않는다.
실질 변경이나 미래 상태는 표기하고 필요 시 현재 원본과 짝짓는다.
[소유자, 점유자, 설계자, 사진가, 예술품, 드론, 프라이버시, 보안, 접근성, 공정 광고, 플랫폼, 관할 게이트]를 적용한다.
```

## Claims and safety gates

다음이면 게시를 거부하거나 보류한다:

- 카메라, 크롭, 스티칭, 하늘·조망 교체, 재조명, 객체 제거, 생성 편집이 스케일·동선·상태·전망·접근·주변·영구 특징을 실질적으로 오도
- 가상 스테이징·미래 렌더링이 미표기이거나 짝지어야 하는데 현재 원본이 없음
- 방 치수, 가격, 조건, 가용성, 용도지역, 마감, 편의시설, 준공, 에너지, 지속가능성, 웰빙, 유동인구, 수상, 상업 성과에 책임 당사자 승인과 근거가 없음
- 리스팅, 카피, 타게팅, 전달, 이미지가 불법적 선호나 배제를 명시·암시
- 개인 문서, 얼굴, 가족사진, 차량 번호판, 출입 코드, 보안 시스템, 보호 위치, 기밀 도면, 임차인 운영이 프라이버시·보안 리스크를 만듦
- 사진가, 건축가, 디자이너, 예술가, 소유자, 임차인, 스폰서, 모델 등 권리자가 필요한 사용을 허가하지 않음
- 항공·제한 구역 촬영에 소유자와 현지 승인이 없음
- 크루, 조명, 삼각대, 케이블, 스테이징이 출구, 공공 동선, 작업, 안전한 현장 운영을 막음
- 접근성이 검증된 특징·경로·치수·한계·현재 상태 없이 외관으로 주장됨

한국은 공인중개사법상 표시·광고 명시 사항(소재지·면적·가격·중개사무소 정보 등)과 분양 광고의 허위·과장 규제를 확인한다. 게시 전 현행 관할·플랫폼 규칙을 확인한다. 이 게이트는 검토·에스컬레이션 지원이지 법률 자문이나 필수 매물 고지의 대체가 아니다. 등기·경매 조회는 gil:real-estate-search, gil:iros-registry-automation(해당 번들 설치 시).

## Reference handoff

| L1 | 직접 L2 옵션 |
|---|---|
| Architecture Photography | Interior Photography; Exterior Photography; Residential Architecture Photography; Commercial Architecture Photography |
| Real Estate Marketing Design | Residential Real Estate Marketing Design; Commercial Real Estate Marketing Design; Property Listing Marketing Design |

L1 하나 먼저, 직접 L2 최대 하나 두 번째. 허용: `Architecture Photography` 다음 `Exterior Photography`; `Real Estate Marketing Design` 다음 `Property Listing Marketing Design`. L2 결합, 스타일·렌즈·조명·장소·색·감정·품질·레이아웃·플랫폼·브랜드·건축가·사진가·캠페인 용어 금지. `Minimal concrete cafe interior brutalist 24mm blue hour`는 무효. 그런 요구는 랭킹과 제작 방향에만. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 각 출처는 자기 영역에서 권위 있으나 한국·기타 현지 부동산·프라이버시·드론·광고·접근성·IP 의무를 해결하지 않는다.

- American Institute of Architects, Project photography: a reference guide (2025): https://www.aia.org/sites/default/files/2025-12/AIA_BestPractices_Projectphotographyareferenceguide.pdf
- Zillow, Real Estate Photography Tips for Home Sellers (2019-11-26): https://www.zillow.com/learn/real-estate-photography-tips/
- National Association of REALTORS, 2026 Code of Ethics and Standards of Practice: https://www.nar.realtor/about-nar/governing-documents/code-of-ethics/2026-code-of-ethics-standards-of-practice
- Zillow, AI-generated listing photos and why transparency matters (2026-07-22): https://www.zillow.com/news/ai-generated-listing-photos-and-why-transparency-matters/
- U.S. HUD, Guidance on Advertising through Digital Platforms (2024): https://archives.hud.gov/news/2024/FHEO_Guidance_on_Advertising_through_Digital_Platforms.pdf
- U.S. Copyright Office, What Photographers Should Know about Copyright: https://copyright.gov/engage/photographers/

## UZ 듀얼 주석

- 카다스터: 우즈베키스탄 부동산은 국가 카다스터(kadastr) 등록이 소유권 증거다. 리스팅에 카다스터 번호 또는 등록 확인 여부를 `proof_objects`에 넣고, 신축 분양(novostroyka)은 시공사 허가·준공 상태를 `property_status`로 표기한다. 표기 의무 범위는 현지 확인 필요.
- 신축 분양 관행: 타슈켄트 신도시·대규모 아파트 단지 분양 광고는 렌더링 비중이 높다. `representation_status: rendering | future state`를 반드시 표기하고 인도 시점·마감 사양을 `required_disclosures`에 넣는다.
- 가격 표기: 달러 기준 호가 관행이 있으나 법적 결제·표시 통화는 숨(UZS)이다. 외화 표기 허용 범위는 현지 확인 필요. 할부(muddatli to'lov)·모기지(ipoteka) 조건은 금융 조건으로 원장 기록.
- 채널: OLX.uz(중고·임대·매매 최대), Uybor.uz 등 부동산 포털, Telegram 중개 채널이 주 채널. 규격은 gil-commerce:marketplace-olx(해당 번들 설치 시).
- 중개사: 리얼터(rieltor) 면허·등록 제도가 있으며 광고에 중개사 정보 표기 의무 범위는 현지 확인 필요.
- 드론: 도심 드론 촬영은 허가 대상이다. 항공 샷은 `human_review_gate: before generation`으로 두고 현지 허가 확인.
- 장면: 마할라 골목, 전통 하블리(hovli, 마당집), 지하철 역세권, 초르수 인근 상가 등은 위치 증거가 되지만 "역 도보 5분" 류 거리 클레임은 실측 없이는 `draft`.
- 차별: 민족·종교·가족 구성 기준 임차인 선호 표현은 `prohibited_or_high_risk`.
- 외국인 취득: 외국인의 부동산 취득 조건(신축 아파트 한정 등)이 별도로 규정된다. 한국인 투자자 대상 분양 광고는 취득 자격 조건을 `required_disclosures`에 넣고 현행 규정을 현지 확인.
- 면적 표기: 제곱미터 기준이 표준이다. 한국식 평 표기는 병기만 하고 공용면적 포함 여부를 명시.
- 트리거(UZ): "kvartira sotiladi"(아파트 매매), "novostroyka reklamasi"(신축 분양 광고). 매물 조회는 gil-commerce:marketplace-olx(해당 번들 설치 시).
