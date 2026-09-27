# 교육 마케팅 플레이북 (education)

학교·학원·강좌·직업훈련·대학·에듀테크의 브리프를 증거 기반 `industry_direction` 패킷으로 바꾸는 판단 틀이다. 책임 있는 크리에이티브 결정을 돕는 것이지, 현행 교육·개인정보·광고 심의를 대신하지 않는다. 법률 자문이 아니다.

적용 범위: 학습자 모집, 등록, 강좌 런칭, 교육 캠페인. 일반 전문서비스·의료·고용·제품 판매는 각자의 플레이북으로.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 선택한 전략 잡은 `message_job`, 커리큘럼·강사·등록·평가·가격·대표 학습자 산출물은 `proof_objects`, 필수 학습 장면은 `must_capture`, 학습자 보호 통제는 `directing_rules`·`required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

`domain_extensions` 권장 키:

```yaml
domain_extensions:
  domain: "education"
  education_type: ""                 # school | academy | university | online-course | vocational | edtech
  learner_age_group: "adult | minor | mixed"
  learner_payer_influencer: {}
  learning_promise: ""
  proof_priority: []
  message_boundary: []
  compliance_review:
    tuition_and_registration_facts_cleared: false
    accreditation_and_outcomes_cleared: false
    minor_consent_and_privacy_cleared: false
    platform_rules_current: false
    human_review_owner: ""
```

`reference_route`는 `domain_id: education`, `l1: Education Campaign Design`, L2는 확실한 직접 서브타입 하나만. 기본 `human_review_gate`는 `before publication`.

## Strategic job

교육 마케팅은 학습자가 자기 적합성을 판단하고 성장 경로를 이해하도록 돕는 일이다. 보장된 지위나 뒤처짐의 공포가 아니라 학습 시스템·피드백·노력·지원·신뢰할 수 있는 증거를 판다.

- 새롭거나 낯선 프로그램: 대상 적합성, 커리큘럼, 강사, 샘플 경험, 인정 여부를 읽히게 만든다.
- 고관여 프로그램: 선수 조건, 학습량, 성과 측정 방법, 학생 지원, 총비용을 보여준다.
- 학부모 결제 프로그램: 학습자를 의사결정 참여자로 존중하고, 아이를 부끄럽게 만들지 않으면서 학부모의 리스크를 해소한다.
- 취업 연계 프로그램: 학습 성과와 취업·소득을 구분하고 모든 고용 관련 클레임에 한정을 붙인다.

전략 잡 하나 선택: `clarify fit` | `demonstrate learning` | `reduce enrollment risk` | `convert trial` | `support persistence` | `build institutional trust`

## Audience and journey

| 단계 | 학습자의 질문 | 결제자·영향자의 질문 | 신뢰 신호 |
|---|---|---|---|
| aspiration | 이 목표가 의미 있고 현실적인가 | 진짜 필요한가 | 구체적이고 공포 없는 프레이밍 |
| fit discovery | 내 수준과 상황에 맞나 | 적절하고 안전한가 | 선수 조건·대상 정의 |
| evidence | 어떻게 배우고 나아지나 | 기관이 믿을 만한가 | 커리큘럼·강사·샘플·평가 |
| trial/counsel | 방법을 체험할 수 있나 | 필요한 지원과 노력은 | 투명한 체험·상담 |
| enrollment | 무엇에 약속하는가 | 총비용과 환불 규정은 | 완전한 가격·정책 사실 |
| activation | 처음에 무엇이 일어나나 | 진도는 어떻게 알리나 | 온보딩·피드백 주기 |
| progress/outcome | 무엇이 바뀌었고 다음은 | 약속이 지켜졌나 | 맥락 있는 측정 진도 |

학생·학부모·고용주·진로 상담사·기관 구매자를 하나의 페르소나로 뭉개지 않는다. gil-commerce:commerce-jtbd-persona(해당 번들 설치 시)로 학습자/결제자 JTBD를 분리할 수 있다.

## Proof architecture

클레임 원장의 `claim` 문자열 앞에 유형을 적는다: `learning-outcome | admission | completion | employment | income | ranking | accreditation | affiliation | price | testimonial`.

증거 우선순위: 유효한 등록·인정 → 강사·커리큘럼 증거 → 평가 방법 → 대표 학습자 증거 → 후기. 모든 비율(합격률·수료율·취업률)에는 코호트·분모·기간·출처·제외 기준·검증 방법을 `evidence_scope`에 남긴다. 학습자 스토리는 경험을 보여줄 수 있어도 그것만으로 "일반적 결과"를 입증하지 못한다.

| 증거층 | 예시 | 상태 |
|---|---|---|
| 등록·인정 | 교육청 학원 등록번호, 평생교육시설 신고, 학위 인가 | `verified` 가능 |
| 강사·커리큘럼 | 강사 경력(공개 동의), 커리큘럼 맵, 교재 | `verified` 가능 |
| 평가 방법 | 레벨테스트 설계, 루브릭, 진도 리포트 양식 | `verified` 가능 |
| 대표 학습자 증거 | 개인정보 제거한 결과물, 코호트 통계 | `draft` → 검토 후 |
| 후기 | 동의·대가 고지된 실제 학습자 후기 | 경험 예시로만 |

## Visual narrative

시퀀스: `goal → active learning → feedback → progress artifact → next step`

- goal: 진짜 학습자의 맥락. 패닉이나 지위 불안이 아님
- active learning: 질문, 연습, 시연, 협업, 집중
- feedback: 강사의 관찰, 비평, 수정, 코칭
- progress artifact: 개인정보를 뺀 작업물, 프로토타입, 루브릭, 성찰
- next step: 샘플 수업, 레벨 체크, 오픈 데이, 등록 안내

학습을 "노력 + 지원"으로 보여준다. 수동적 강의 줄, 일반적 증거로 쓰이는 학사모 세리머니, 가짜 수료증, 맥락 없는 점수판, 정형화된 "천재" 이미지는 피한다.

## Directing and capture

- 실제 수업, 연습, 피드백, 또래 상호작용, 접근 가능한 공간, 교육자의 책임을 우선 포착한다.
- 미성년자, 학생 이름, 성적, 학습 기록, 화면, 음성, 작품, 식별 가능한 위치 패턴을 보여주기 전에 적절한 승인을 받는다.
- 다양한 학습자를 배경 장식이 아닌 능동적 참여자로 프레이밍한다.
- 장면이 다큐멘터리인지 재연인지 합성인지 기록한다. 재연 학습자가 특정 결과를 얻었다고 암시하지 않는다.
- 세로·가로·텍스트 세이프 구도는 레퍼런스 선택 후에 정한다. 이런 속성은 레퍼런스 쿼리에 들어가지 않는다.

## Channel deliverables

| 채널 | 산출물 | 의사결정 역할 |
|---|---|---|
| 학원·학교 사이트 | 적합성 페이지, 커리큘럼 맵, 강사 프로필, 가격·환불 사실 | 증거·등록 |
| 검색·네이버 | 의도 매칭 광고와 연결 랜딩 | 수요 포착 |
| 유튜브 | 샘플 수업, 교육자 설명, 학습 과정 스토리 | 방법 시연 |
| 숏폼 소셜 | 개념 하나, 연습 장면 하나, 다음 단계 하나 | 발견 |
| 행사 | 공개 수업·설명회 키트 | 체험·상담 |
| 라이프사이클 | 온보딩, 진도 커뮤니케이션, 수료 경로 | 활성화·지속 |

측정: 유효 문의, 체험 참석, 정보 확인 후 등록, 활성화, 지속, 수료, 학습 진도, 환불 사유, 민원율, 클레임 재작업. 클릭이나 지원 수만 최적화하지 않는다.

## Prompt kernel

```text
[관할]의 [프로그램]에 대한 교육 마케팅 방향을 만든다.
학습자·결제자·영향자·학습자 연령: [역할]. 여정 단계: [단계].
전략 잡: [하나]. 학습 약속: [한정된 약속].
승인된 커리큘럼·강사·등록·가격·성과 증거만 사용한다.
능동적 학습, 피드백, 진도 증거, 비례하는 다음 단계를 보여준다.
인정·제휴·순위·합격·성적·취업·소득·후기 클레임을 지어내지 않는다.
미성년 동의·프라이버시·현지 교육 규정·플랫폼 점검 중 미해결 항목을 표시한다.
지정된 제작 스킬을 위해 canonical `industry_direction` 객체를 반환한다.
```

## Claims and safety gates

- 성과 게이트: 비율·성적 클레임에 코호트·분모·기간·방법·한계를 요구한다.
- 인정 게이트: 등록·인가·자격·대학 제휴·로고 사용권을 발급 기관에서 확인한다.
- 비용 게이트: 수강료, 추가 비용(교재비·모의고사비), 환불 조건, 정원, 관할별 의무 고지를 확인한다. 한국은 학원법 제15조에 따른 교습비 등 게시·고지 의무를 확인한다.
- 미성년 게이트: 법적 근거와 법정대리인 동의 필요 여부를 확인한다. 연령에 맞는 명확한 안내를 쓴다.
- 청소년 광고 게이트: 현행 플랫폼 제한을 재확인하고 미성년자 행동 맞춤 광고를 피한다.
- 존엄 게이트: 공포, 굴욕, 학부모 죄책감, 사회적 배제를 전환 장치로 쓰지 않는다.
- 합성 미디어 게이트: 가짜 학습자·교육자·수료증·결과·후기 금지.
- 게시 게이트: 현행 관할·플랫폼 규칙이 미확인이면 `draft-only`.

한국 문구 법규 상세 점검은 gil-commerce:commerce-ad-claim-compliance-kr(해당 번들 설치 시), 최종 게시 검토는 gil-creative:publication-review.

## Reference handoff

`references/industry-taxonomy.json`의 경로:

- domain: `education`
- 필수 첫 쿼리(L1): `Education Campaign Design`
- 선택 직접 L2: `University Campaign Design` | `Academy Campaign Design` | `Online Course Campaign Design` | `Education Technology Campaign Design` | `Language School Campaign Design`(어학원·언어 과정)

승인된 레퍼런스 소스마다 L1을 정확히 한 번 먼저 실행한다. L2는 0~1개. 동의어 쿼리, 두 번째 L2, 스타일·렌즈·장소·색·감정·대상·플랫폼·브랜드·캠페인·레이아웃 수식어 금지. 확실한 서브타입이 없으면 L1에서 멈춘다. 모든 크리에이티브 속성은 검색 후 랭킹 기준이다. 탐색은 gil-creative:reference-board가 수행한다.

## Authority sources

광고에 현행 문구를 복사하지 말고 아래 출처를 재확인한다. 최종 확인 2026-09-04(원문 기준).

- 한국, 학원의 설립·운영 및 과외교습에 관한 법률 제15조: https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1023885543
- 한국, 개인정보 보호법 제22조의2(아동의 개인정보 보호): https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029335257
- Google Ads, 청소년 대상 광고 게재 보호(현행): https://support.google.com/adspolicy/answer/12205906?hl=en-GB
- NACAC, Guide to Ethical Practice in College Admission(2026-08 개정): https://www.nacacnet.org/who-we-are/what-we-do/guiding-ethics/nacacs-guide-to-ethical-practice-in-college-admission/
- ASA/CAP, Instructional Courses 규정(비교 기준): https://www.asa.org.uk/type/broadcast/code_section/25.html

통제 규칙은 교육 유형·학습자 연령·관할·매체·게시일에 따라 달라진다.

## UZ 듀얼 주석

- 라이선스 표기: 우즈베키스탄에서 비국립 교육기관(학원·어학원·사설 학교)은 교육 관련 부처의 라이선스·등록 대상이며 광고에 라이선스 번호를 표기하는 관행이 있다. 정확한 소관 부처(취학전·일반교육 / 고등교육·과학·혁신부)와 표기 의무 범위는 현지 확인 필요. `required_disclosures`에 "라이선스 번호(UZ)"를 기본 후보로 넣는다.
- 언어: 카피·고지는 UZ(라틴)·RU 병기. 어학원 광고에서 "N개월 만에 IELTS 7.0" 같은 점수 보장 표현은 한국과 같은 기준으로 `missing` 처리한다.
- 미성년: 학부모(ota-ona) 동의서 없이 학생 얼굴·성적 노출 금지. 마할라 단위 입소문(og'zaki tavsiya)이 강한 시장이므로 후기는 실제 학부모 동의·대가 고지 확인.
- 채널: Telegram 채널·봇이 모집 창구로 흔하다. `channel_deliverables`에 Telegram 포스트(UZ/RU)와 봇 등록 CTA를 포함한다.
- 가격: 숨(UZS) 월 수강료·교재비·등록비를 분리 표기. 할부 조건이 있으면 금융 조건으로 클레임 원장에 기록.
- 장면: 타슈켄트 어학원 교실, 대학 입시(DTM 시험) 맥락, IT 교육센터 등을 `must_capture`에 쓸 수 있으나 국가시험 합격률 클레임은 코호트·분모 없이는 `missing`.
- 시장 프로필은 gil-creative:market-profile-engine 참조. 현지 교육 광고 규정의 세부는 lex.uz에서 현지 확인 필요.
- 결제자 관행: 학원비는 월 단위 현금·카드·Payme/Click 결제가 흔하다. 결제 수단·환불 조건을 `required_disclosures`에 넣고 "환불 보장" 표현은 실제 규정 없이는 `missing`.
- 온라인 강좌: 외국 플랫폼(Coursera 등) 수료증을 "국가 인정 학위"로 표현하는 사례가 있다. 인정 범위는 현지 확인 필요하며 원칙적으로 `prohibited_or_high_risk`.
- 트리거(UZ): "o'quv markazi reklamasi"(학원 광고), "kurs uchun dalil"(강좌 증거). 시장 프로필은 gil-creative:market-profile-engine.
