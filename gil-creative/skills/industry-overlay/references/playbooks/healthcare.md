# 의료 마케팅 플레이북 (healthcare)

병원·의원·치과·웰니스·재활·정신건강·원격의료의 안전 우선 `industry_direction` 패킷을 만든다. 의료 자문도 법률 자문도 아니며, 어떤 산출물도 지정된 인간 리뷰어 승인 없이는 게시할 수 없다. 개인 진단·치료 권고는 하지 않는다.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 전략 잡은 `message_job`, 책임 임상·과정·접근·시설·증거 산출물은 `proof_objects`, 환자 정보 장면은 `must_capture`, 의료 통제는 `directing_rules`·`required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

```yaml
reference_route: {domain_id: "healthcare", l1: "Healthcare Advertising Design", l2: "", query_count: 1}
human_review_gate: "before publication"        # 고정. 낮추지 않는다
domain_extensions:
  domain: "healthcare"
  provider_and_service: ""
  accountable_clinician_or_institution: ""
  patient_information_need: ""
  proof_priority: []
  benefit_risk_boundary: []
  compliance_review: {human_review_required: true, human_review_owner: "", jurisdiction_rules_current: false, medical_ad_review_status: "unknown", platform_rules_current: false, evidence_reviewed: false, patient_consent_and_privacy_cleared: false, publication_status: "draft-only"}
```

**인간 게시 게이트**: 모든 산출물은 지정된 권한 있는 리뷰어가 관할·제공자·클레임·매체·플랫폼의 현행 규칙을 확인할 때까지 `draft-only`다. 리뷰어가 미지정이어도 패킷과 초안 제작(카피·레이아웃·이미지·영상·랜딩)은 계속한다. 리뷰어를 `unresolved_decisions`에 올리고 게시만 하드 블록한다. 워크플로우가 끝났다는 이유로 "승인됨·준수함·의료 검토됨·게시 가능"이라 말하지 않는다.

## Strategic job

공포나 확신을 제조하지 않고 사람들이 선택지를 이해하고 적합성을 판단하고 적절한 치료에 접근하게 돕는다. 시술 건수나 클릭률이 아니라 정보에 근거한 선택과 연속성을 최적화한다.

낯선 서비스는 쉬운 말·안내·자격 요건·다음 단계, 선택적·고비용 서비스는 대안·중대 위험·변동성·비용 논리·회복 의무, 만성·민감 질환은 존엄·프라이버시·지속 지원·비개인화 도달, 기관 평판은 책임 있는 의료진·시스템·안전 과정·접근·후속(명성만이 아님)을 우선한다.

잡 하나: `improve understanding` | `reduce access friction` | `clarify suitability` | `build clinical trust` | `support continuity` | `promote public-health action`

## Audience and journey

`awareness`(일반 교육·악화 신호, 정확성) → `exploration`(서비스 범위·대안·의료진 프로필, 책임 있는 전문성) → `suitability`(적격·비적격·위험·변동성, 균형) → `consultation`(방문 흐름·가격 사실·프라이버시, 투명성·존엄) → `treatment`(동의·과정·안전, 공동 의사결정) → `follow-up`(사후 관리·경고 신호·연락 경로, 신뢰할 수 있는 치료).

환자·보호자·의뢰 전문가·지불자를 구분한다. 일반 콘텐츠를 개인 진단으로 프레이밍하지 않는다.

## Proof architecture

클레임 유형: `efficacy | safety | eligibility | comparison | exclusivity | credential | certification | experience | price`. `evidence_scope`에 증거 수준, 모집단, 개입·서비스, 결과·기간을 기록한다.

증거 우선순위: 적법한 제공자 정체성 → 권위 있는 임상·규제 증거 → 기관별 과정·역량 → 대표 서비스 데이터 → 승인된 인간 스토리. 증거의 모집단·개입·결과·기간을 정확한 클레임과 맞춘다. 면책 문구가 지배적 오도 인상을 고치지 못한다.

## Visual narrative

`orientation → accountable care team → understandable process → safety/support → next step`

입구·안내·접근성·준비 → 실제 책임 있는 전문가 → 상담·설명·장비 준비·조율 → 위생·점검·프라이버시·보호자 지원·후속 → 정보·상담·예약(약속된 결과가 아님).

직접 침습 시술 장면, 선정적 증상, 비인간적 신체 크롭, 기적적 변화, 뒷받침 없는 전후 비교, 임상 증거를 대신하는 럭셔리 이미지는 쓰지 않는다.

## Directing and capture

- 연출된 치료 클레임보다 설명·경청·점검·조율·준비하는 의료진을 선호한다. 한국 의료광고 초안에 수술·직접 시술 장면을 노출하지 않는다
- 식별 가능한 환자는 별도 허가와 게시 범위를 받는다(통상 진료 동의는 광고 사용 허가가 아님). 이름·날짜·식별자·기록·모니터·처방·라벨·반사를 제거한다
- 각 인물이 직원·승인 환자·배우·합성인지 기록하고 카피에서 역할을 흐리지 않는다. 쉬운 비경고성 도식·캡션, 접근성·자막·대체 텍스트·읽히는 위험 정보 보존

## Channel deliverables

진료과 사이트(환자 정보·적격성·위험·대안 FAQ·의료진 프로필), 검색·로컬(한정된 의도 광고, 위치·접근 랜딩), 영상(의료진 설명·방문 안내·사후 교육), 소셜(예방 교육·서비스 안내, 비개인화 도달), 인쇄·OOH(검토된 공공 정보·접근 메시지), 리뷰 패키지(클레임 원장·증거 링크·카피·비주얼 버전·매체 목록, 인간·광고 심의용).

측정: 유효 예약, 출석, 이해도, 적절한 의뢰, 연속성, 민원, 프라이버시 사고, 광고 거부, 심의 재작업. 공포 반응·취약 질환 타게팅·불필요한 시술 수요를 최적화하지 않는다.

## Prompt kernel

```text
[관할]의 [제공자/서비스]에 대한 의료 방향 초안을 만든다.
책임 리뷰어: [이름/역할 또는 미해결]. 대상과 여정 단계: [대상/단계].
전략 잡: [하나]. 환자 정보 니즈: [니즈].
정확한 모집단·서비스·결과·기간에 승인된 증거만 사용한다.
적합성, 이익, 중대 위험, 대안, 변동성, 프라이버시, 다음 단계를 쉬운 말로 설명한다.
진단, 보장, 비교, 배타성 암시, 환자 결과 후기, 자격·승인 발명을 하지 않는다.
승인된 인간 검토 대기 초안으로 표시한 canonical `industry_direction` 객체를 반환한다.
```

## Claims and safety gates

- 인간 게시 게이트: 지정 리뷰어가 정확한 카피·비주얼·타게팅·랜딩·매체·버전을 검토. 리뷰어 부재는 미해결 게시 결정이지 초안 중단 사유가 아님
- 의료광고 게이트: 광고 주체 자격, 금지 내용, 사전 심의(한국: 의료법 제57조 자율심의), 허용 매체, 심의본과 집행본 일치
- 증거·이익-위험 게이트: 명시·암시 클레임에 정확한 서비스·대상 증거 요구. 중대 위험·한계·변동성·대안·적격 조건 누락 금지
- 프라이버시·타게팅 게이트: 건강정보는 민감정보(한국: 개인정보보호법 제23조). 법적 근거·별도 동의·보안·게시 범위 확인. 민감 건강 신호로 광고주 지정 오디언스를 만들지 않음
- 후기·존엄 게이트: 한국 초안은 환자 치료 경험으로 효과를 암시하지 않음. 합성·재연 결과, 수치심·패닉·강압적 긴급성·노골적 노출·낙인 표현 거부
- 어느 게이트든 미해결이면 `draft-only`

식약처 관련 안전 정보는 gil:mfds-safety(해당 번들 설치 시), 문구 점검은 gil-commerce:commerce-ad-claim-compliance-kr(해당 번들 설치 시).

## Reference handoff

- domain: `healthcare`
- L1: `Healthcare Advertising Design`
- 선택 직접 L2: `Hospital Advertising Design` | `Clinic Advertising Design` | `Dental Advertising Design` | `Wellness Advertising Design`

L1 먼저, L2는 0~1개. 질환·스타일·렌즈·장소·색·감정·대상·플랫폼·브랜드·캠페인·레이아웃 수식어 금지. 탐색은 gil-creative:reference-board.

## Authority sources

최종 확인 2026-09-04(원문 기준). 통제 규칙은 제공자 유형·관할·매체·플랫폼·심의 상태·게시일에 따라 다르다.

- 한국, 의료법 제56조(의료광고의 금지 등, 2026-04-07 시행): https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1018923417
- 한국, 의료법 제57조(의료광고의 심의): https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1032064243
- 한국, 개인정보 보호법 제23조(민감정보): https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1027416043
- 한국, 의료법 제19조(정보 누설 금지): https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1016494729
- Google Ads, Healthcare and medicines 정책: https://support.google.com/adspolicy/answer/176031/healthcare-and-medicines
- Google Ads, Health in personalized advertising 정책: https://support.google.com/adspolicy/answer/16701855?hl=en-GB
- WHO, Principles for Effective Communications: https://www.who.int/about/communications/principles
- AMA Code of Medical Ethics, Advertising & Publicity: https://code-medical-ethics.ama-assn.org/ethics-opinions/advertising-publicity

## UZ 듀얼 주석

- 허가: 우즈베키스탄 의료기관·사설 클리닉은 보건부(Sog'liqni saqlash vazirligi) 라이선스 대상이며, 의료 서비스 광고에 라이선스 번호 표기가 관행이다. 표기 의무의 정확한 범위와 광고 사전 심의 여부는 현지 확인 필요. `required_disclosures`에 "보건부 라이선스 번호"를 기본 후보로 둔다.
- 의약품·시술 광고: 처방약 광고 제한, 특정 시술(미용·성형) 광고 규제는 우즈벡 광고법과 보건 관련 법령에 산재한다. 클레임별로 lex.uz에서 현지 확인 필요. 한국 의료법 기준을 UZ 규정으로 오인하지 않는다.
- 언어: 환자 정보는 UZ·RU 병기. 의료 용어는 RU가 여전히 우세하나 공식 안내는 UZ. 접근성(문해력) 고려해 쉬운 말 원칙 유지.
- 문화: 여성 환자 대상 진료(산부인과 등)는 성별 의료진·보호자 동반 관행이 강하다. `directing_rules`에 성별·가족 맥락 통제. 종교적 민감 시술 표현 주의.
- 의료 관광: 한국 의료기관의 UZ 환자 유치 광고는 한국 의료법(외국인 환자 유치 등록)과 UZ 광고법이 동시에 적용된다. `jurisdiction: KR+UZ`로 두고 두 리뷰어를 지정한다.
- 채널: Telegram 채널·봇 예약, Instagram이 주 채널. 후기 콘텐츠 유통이 활발하므로 환자 후기 사용 금지 원칙을 채널별로 명시.
- 리뷰어 미지정 시 UZ 자산도 `draft-only`.
- 의약품 판매 채널: 온라인 약국·Telegram 약품 판매 광고는 별도 규제 대상이다. 의약품·건강보조식품 클레임은 이 플레이북 범위 밖이며 현지 규정 확인 후 별도 리뷰어 지정.
- 가격 표기: 진료비·시술비를 숨(UZS)으로 표시하고 "무료 상담" 조건을 명시. 의료비 할부 조건은 금융 조건으로 원장 기록.
- 트리거(UZ): "klinika reklamasi"(클리닉 광고), "tibbiy reklama qoidalari"(의료 광고 규칙).
