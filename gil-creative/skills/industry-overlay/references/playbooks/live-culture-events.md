# 공연·문화·행사 플레이북 (live-culture-events)

콘서트·연극·무용·전시·박물관·갤러리·컨퍼런스·체험형 활성화·공공 행사·페어·지역·문화 축제의 프로그램 진실, 관객 기대, 라이브 경험, 안전한 참여, 문화적 정당성, 사후 가치를 연결하는 `industry_direction` 패킷을 만든다. 승인된 프로그램 데이터, 문화 권위, 아티스트 계약, 공연장 운영, 라이브 안전 계획이 크리에이티브 야심보다 우선한다. 법률 자문도 안전 인증도 아니다.

경계: 상설 목적지·일정이 주이고 행사가 한 명소일 뿐이면 `hospitality-travel`. 날짜 있는 프로그램·입장·참석·등록·참여·스폰서 성과·행사 주기 관계가 중심이면 이 플레이북. 라인업·일정·장소·티켓 재고·수용 인원·접근·문화적 의미·안전·스폰서 권리·허가를 홍보 이미지에서 추론하지 않는다. 행사 기획 자체는 gil:event-planner(해당 번들 설치 시).

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 승인된 프로그램·아티스트·장소·접근·가격·스폰서·문화·운영 증거는 `proof_objects`와 `claim_ledger`, 최소 라이브 샷 시스템은 `must_capture`, 캡처·문화 통제는 `directing_rules`, 게시 통제는 `required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에.

```yaml
mode_or_subtype: "concert | performance | exhibition | conference | festival | activation"
reference_route: {domain_id: "live-culture-events", l1: "Event Photography", l2: "", query_count: 1}
```

`domain_extensions` 권장 키: `event_phase`, `program_truth_ledger`, `rights_matrix`, `cultural_authority`, `attendee_release_model`, `operational_safety_owner`.

## Strategic job

행사 단계 잡 하나. 한 배치에 발표·일정·스폰서 회고·비상 소통을 합치지 않는다.

| 단계·잡 | 풀어야 할 결정 | 주 증거 | 행동 |
|---|---|---|---|
| identity and save-the-date | 기억할 만큼 관련 있나 | 명확한 컨셉, 주최, 행사 정체, 날짜 근거 | 저장, 팔로우 |
| launch and early commitment | 프로그램이 믿을 만하고 약속할 가치가 있나 | 승인된 헤드라이너·작품·연사·주제·장소·조기 조건 | 등록, 구매 |
| program proof | 실제로 무엇을 보고 배우고 하나 | 라인업, 일정, 형식, 이전 실제 경험, 큐레이터·공동체 목소리 | 프로그램 보기 |
| conversion and reminder | 지금 확신 갖고 참석할 수 있나 | 날짜, 장소, 총액, 재고 진실, 접근, 교통, 정책 | 구매, 등록 |
| arrival and participation | 어떻게 입장·이동·안전 참여하나 | 지도, 게이트, 시간, 경로, 접근, 규칙, 날씨·변경 공지 | 길찾기, 체크인 |
| live amplification | 무슨 일이 일어나고 왜 중요한가 | 승인된 실시간 순간, 맥락, 참가자 목소리 | 시청, 공유, 남은 프로그램 참석 |
| recap and continuity | 가치가 전달됐고 다음은 | 실제 참석 맥락, 성과, 공동체·스폰서 증거 | 리뷰, 구독, 재방문 |

시민·문화 행사는 참석 성장, 참여 질, 문화 연속성, 지역 혜택, 교육, 모금, 방문자 분산을 구분한다. 모든 행사를 티켓 수로 환원하지 않는다.

## Audience and journey

Discover → Relate → Verify(라인업·작품·일정·장소·가격·접근·연령·언어·형식·안전) → Commit(티켓·등록·캘린더·여행 계획·RSVP) → Anticipate → Arrive and participate → Share and remember → Return and support.

주 마찰: 낯선 형식, 약한 프로그램 증거, 가격 불확실, 여행, 일정 복잡성, 접근성, 연령·입장 규칙, 문화적 낯섦, 안전, 날씨, 홍보 이미지가 대표적이지 않다는 두려움.

## Proof architecture

- **프로그램 진실**: 승인된 제목, 주최, 유형, 참여 아티스트·연사, 작품, 일정, 날짜, 장소, 길이, 언어, 형식, 변경 상태
- **경험 증거**: 실제 장소, 무대·설치, 관객 시점, 프로그램 행동, 분위기, 참여 방식, 실제 스케일
- **권위 증거**: 주최·큐레이터·아티스트·문화 실천자·공동체 파트너·기관·전문가 역할의 정확한 제시
- **접근·운영 증거**: 입구, 경로, 좌석, 자막·통역, 음성 해설, 화장실, 주차·대중교통, 연령 정책, 반입 금지 품목, 날씨·취소 절차
- **거래 증거**: 티켓 등급, 재고 상태, 총 필수 가격, 마감, 환불·양도 정책, 등록 요건, CTA
- **문화적 정당성**: 공동체 참여, 동의, 의미, 귀속, 혜택, 신성·사적 콘텐츠 경계, 관광객용 왜곡 회피
- **임팩트 증거**: 참석·도달·경제·사회·환경·교육·스폰서·문화 클레임은 이름 있는 방법과 보고 기간에

자료를 `approved current program fact | authorized documentary evidence | substantiated impact | cultural authority guidance | creative proposal | unresolved`로 분류한다.

## Visual narrative

스펙터클 전에 경험: 행사 히어로 하나(정체와 약속) → 장소·외관·입구·무대·방·설치(어디서) → 공연자·연사·아티스트·작품·의식·프로그램 행동(무엇이) → 관객 시점 프레임(시선과 참여 예측) → 와이드 군중·미드 상호작용·클로즈 감정(참석 조작 없는 스케일) → 공동체·제작자·자원봉사·스태프·백스테이지(정당한 인간 인프라) → 접근·지도·사이니지·편의·날씨·입장 프레임 → 스폰서·파트너·임팩트 프레임(행사를 압도하지 않게) → 회고 프레임(구체적 기억과 다음 관계).

전시는 작품 디테일·설치 맥락·해석·방문자 상호작용을 분리. 공연은 전체 무대 지리·공연자 관계·결정적 행동·관객 시점·분위기를 분리. 지역 축제는 장소·생산자·주민·실천·음식·공예·동시대 공동체 목소리를 함께.

## Directing and capture

- 사전: 아티스트·작품·연사·스폰서·로고·음악·장소 구역·관객 구역·사용 채널별 프로그램·권리 매트릭스. 공연장 지휘·무대 관리·큐레이션·아티스트·보안·접근·군중·날씨·비상 계획과 샷 계획 정렬. 허용 위치·이동 시간·플래시·녹화 금지 작품·제한된 의식·케이블·장비 경로·비상 접근·안전 대피 위치 지도. 참석자 고지·동의·초상권 방법, 식별 가능 참가자와 미성년자 별도 접근, 삭제·제외 요청 절차
- 라이브: 피크 전 클린 설정 뷰 후 사람을 복제·증식하지 않은 실제 점유 상태. 관객 시선과 시야로 경험을 상상 가능하게. 이미지를 위해 경험을 막지 않음. 공연·전시 조명 의도 보존. 와이드 지리·미드 관계·클로즈 결정적 순간. 포즈 초상·스폰서 순간은 통제된 구역·시간에서만. 문화 실천은 실천자의 규칙(누가 연출·공연·촬영·게시·캡션·혜택을 받는지)을 따름

최소 샷 시스템(`must_capture`): event identity(크롭 안전 영역이 있는 히어로) / venue and arrival(외관·입구·체크인·경로) / program geography(전체 무대·방·전시·축제 구역) / authority and action(승인된 공연자·작품·의식·활동) / attendee viewpoint(시야와 참여 관점) / real community(와이드 군중·미드 상호작용·클로즈 감정·자원봉사) / signature moment(승인된 행사 정의 행동 하나) / access and practical(접근 경로·좌석·자막·지도·핵심 규칙) / partner and sponsor(승인된 활성화·귀속·성과) / backstage and process(승인 시 준비·크루·리허설·설치) / vertical live sequence(정체·행동·맥락·CTA) / recap and impact(전달된 경험·공동체 가치·측정 결과·다음 행동). 규격은 검토 시점 플랫폼 공식 출처에서 확인하고 픽셀·길이 프리셋을 플레이북에 두지 않는다.

## Channel deliverables

행사 리스팅·티켓 페이지(인터파크·예스24·멜론티켓 등: 히어로·가치 요약·승인된 날짜·장소·프로그램·총액·접근·FAQ·정책·주최 신뢰·CTA) / 런칭·라인업(세이브 더 데이트·공개 시퀀스·아티스트 카드·조기 조건; gil-creative:poster-ad-builder, card-news) / 유료 소셜·디스플레이·OOH(약속·프로그램 증거·실무 사실·행동 각 하나) / 이메일·CRM(발표·리마인더·변경 공지·사후 감사를 별도 메시지로) / 오가닉·숏폼(승인된 초대·리허설 프리뷰·참석자 가이드·라이브 순간·투명한 회고) / 현장(지도·대기열·입구·접근·변경·날씨·비상 승인 커뮤니케이션) / 프레스·파트너 키트(승인 사실·캡션·크레딧·권리 상태·키 이미지·로고) / 스폰서 회고·임팩트 보고(계약 산출물·실제 노출·측정 결과·방법론). 운영·비상 메시지는 미적 변형이 아니라 책임 있는 행사 당국 승인과 채널 간 일관성이 필요하다.

## Prompt kernel

```text
[행사 단계와 전략 잡] [행사 유형과 관객 맥락]의 [단계와 여정 단계]에서 [행동 하나]로 이어지는 [자산 역할].
[프로그램 진실과 증거] 승인된 [주최, 제목, 참가자, 작품, 날짜, 시간, 장소, 형식, 언어, 티켓, 요금, 접근, 연령, 스폰서, 정책 사실]만 사용. 자산은 [프로그램·경험·권위·접근·거래·문화·임팩트 명제 하나]를 증명. 변경, 미지, 매진 상태, 시한부 사실: [목록].
[경험 내러티브] 샷 역할: [identity / venue / geography / authority and action / attendee POV / community / signature / access / sponsor / process / recap]. 실제 행동, 시점, 군중 맥락, 빛, 모션, 사운드-시각 단서, 크롭: [값]. 문화 권위, 캡션, 귀속, 경계: [값].
[채널] 배치, 비율·길이, 세이프 에어리어, 승인 메시지, 실무 사실, 고지, 정확한 CTA: [값].
[가드레일] 라인업, 작품, 군중 규모, 가용성, 희소성, 일정, 접근, 보증, 스폰서 관계, 문화적 의미, 가격, 안전, 임팩트를 발명·암시하지 않음. 촬영을 위해 출구·시야·운영·비상 소통을 막지 않음. [아티스트, 예술품, 음악, 장소, 관객, 미성년, 스폰서, 문화, 접근, 총액, 안전, 플랫폼, 관할 게이트] 적용.
```

## Claims and safety gates

게시·캡처 보류 조건: 제목·주최·아티스트·연사·작품·라인업·날짜·시간·장소·형식·언어·길이·연령·수용·가용성·티켓 등급·총 필수 가격·환불·접근·스폰서·취소 정보가 미승인·오래됨; 스톡·아카이브·합성·생성 이미지가 현재 행사·프로그램·장소·아티스트·작품·실제 군중으로 오인될 가능성; 아티스트 초상·승인 작품·공연·음악·녹화·상표·아카이브 이미지·참석자·인터뷰·스폰서 사용 허가 없음; 식별 가능 참석자·미성년자가 유효한 고지·동의·초상권·용도 범위 밖에서 사용; 프로젝트가 요구하는 캡션·대체 텍스트·자막·수어·음성 해설·대비·접근 경로·좌석·편의 정보 부재·부정확; 촬영·조명·케이블·리깅·드론·운영자 이동·포즈가 출구·대기열·공공 경로·무대 운영·시야·접근 경로·비상 대응 방해; 공개 소통이 승인된 군중·날씨·교통·취소·비상 계획과 충돌; 문화 실천·신성·사적 순간·공동체 정체성·의상·언어·유산이 적절한 권위·동의·귀속·경계·공동체 혜택 없이 상업화; 긴급성·인기·희소성·참석·임팩트·스폰서 가치 클레임에 현행 증거 없음; 유료·증정·직원·제휴·스폰서·크리에이터 관계 미고지.

한국은 공연법상 공연장 등록, 티켓 재판매 규제, 총액 표시(예매 수수료 포함) 관행을 확인한다. 현행 관할·장소·플랫폼·티켓 서비스·계약·문화·접근·운영 요건을 확인한다.

## Reference handoff

| L1 | 직접 L2 옵션 |
|---|---|
| Event Photography | Concert Photography; Festival Photography; Conference Photography |
| Cultural Campaign Design | Exhibition Campaign Design; Museum Campaign Design; Performing Arts Campaign Design; Local Festival Campaign Design |

허용: `Event Photography` 다음 `Festival Photography`; `Cultural Campaign Design` 다음 `Local Festival Campaign Design`. L2 결합, 스타일·렌즈·조명·장소·색·감정·품질·레이아웃·플랫폼·아티스트·장소명·브랜드·크리에이터·캠페인 용어 금지. `Korean night festival crowd fireworks cinematic vertical reel`은 무효. 인계에 문화·권리 주의를 포함. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 각 영역 내 권위 있는 원칙이지 보편적 법적·운영 클리어가 아니다.

- Eventbrite, Tips and Tools for Listing and Marketing Your Event (2025-08-26): https://www.eventbrite.com/blog/eventbrite-listing-marketing-tools-tips/
- Eventbrite, 4 Event Photography Tips (2017-03-09): https://www.eventbrite.com/blog/event-photography-tips-techniques-ds00/
- Eventbrite Help Center, Add images and video to your event: https://www.eventbrite.com/help/en-us/articles/682424/
- UK HSE, Put crowd controls in place (2025-04-04 갱신): https://www.hse.gov.uk/event-safety/crowd-management-controls.htm
- NEA, Accessibility Planning and Resource Guide for Cultural Administrators: https://www.arts.gov/accessibility-planning-and-resource-guide-cultural-administrators
- UNESCO, Festival Statistics: Key Concepts and Current Practices (2023-04-20 갱신): https://www.unesco.org/en/articles/festival-statistics-key-concepts-and-current-practices
- UNESCO ICH, Decision 4.COM 6 (2009): https://ich.unesco.org/en/Decisions/4.COM/6
- U.S. FTC, Rule on Unfair or Deceptive Fees (2025-05-12 시행): https://www.ftc.gov/news-events/news/press-releases/2025/05/ftc-rule-unfair-or-deceptive-fees-take-effect-may-12-2025

## UZ 듀얼 주석

- 공공 행사 허가: 우즈베키스탄에서 대중 행사(ommaviy tadbir)는 지방 당국(hokimiyat)과 내무 당국의 허가·통보 대상이다. 허가 상태를 `operational_safety_owner`와 함께 `proof_objects`에 기록. 절차 세부는 현지 확인 필요.
- 문화 유산: 나브루즈(Navro'z), 라마단·하이트 명절, 전통 공연(마콤, 라파르)은 무형유산 맥락이 강하다. UNESCO ICH Decision 4.COM 6 원칙(공동체 주 수혜자)을 `cultural_authority`로 적용하고 종교 의식 촬영은 `human_review_gate: before generation`.
- 티켓 채널: iTicket.uz, Afisha.uz, Telegram 채널 판매가 흔하다. 총액 표시(수수료 포함) 의무는 현지 확인 필요. 가격은 숨(UZS).
- 언어: 포스터·안내는 UZ·RU 병기. 국제 행사는 EN 추가. 국가어 표기 의무 범위는 광고법상 현지 확인 필요.
- 장면: 타슈켄트 콩그레스홀, 나보이 극장, 사마르칸트 레기스탄 광장 행사, 마할라 단위 축제(sayil) 등은 장소 증거가 되지만 유산 지역 촬영은 문화재 당국 허가 필요.
- 미성년·군중: 학교 단체 참석이 많아 미성년 초상권 처리를 `attendee_release_model`에 별도 기록.
- 스폰서: 국영 기업·정부 기관 후원 표기는 공식 계약 없이는 `missing`. 주류 스폰서 노출은 주류 광고 제한과 함께 검토(현지 확인 필요).
- 비상·날씨: 여름 고온(40도 이상)과 겨울 한파가 야외 행사 안전 계획의 핵심이다. `directing_rules`에 시간대·그늘·급수 통제를 두고 비상 메시지 승인자를 지정.
- 문화 콘텐츠 검열: 공연·전시 콘텐츠의 사전 검토(문화 당국) 관행이 있을 수 있다. 라인업·작품 공개 전 승인 상태를 `program_truth_ledger`에 기록. 세부는 현지 확인 필요.
- 트리거(UZ): "konsert reklamasi"(콘서트 광고), "festival kampaniyasi"(축제 캠페인). 행사 운영은 gil:event-planner(해당 번들 설치 시).
