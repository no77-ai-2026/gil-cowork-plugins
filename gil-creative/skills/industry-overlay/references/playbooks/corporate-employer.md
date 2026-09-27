# 기업·고용주 브랜드 플레이북 (corporate-employer)

기업 평판·역량·문화·EVP·채용·직원 스토리·후보자 캠페인을 증거 기반 `industry_direction` 패킷으로 만든다. 책임 있는 크리에이티브 결정을 돕는 것이지 현행 고용·개인정보·접근성·광고 심의를 대신하지 않는다. 법률 자문이 아니다.

적용: 기업 이해관계자 또는 인재 대상. 소비자 제품·교육·의료·일반 서비스 캠페인은 각자의 플레이북으로.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 선택한 전략 잡은 `message_job`, 정책·운영·인력·직무·이해관계자 증거는 `proof_objects`, 필수 직무·직장 증거는 `must_capture`, 고용·표현 통제는 `directing_rules`·`required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

```yaml
mode_or_subtype: "corporate-brand | employer-brand"
reference_route: {domain_id: "corporate-employer", l1: "Corporate Branding", l2: "", query_count: 1}
domain_extensions:
  domain: "corporate-employer"
  corporate_promise_or_evp: ""
  proof_priority: []
  representation_boundary: []
  compliance_review:
    organization_facts_current: false
    employee_and_location_consent_cleared: false
    employment_and_privacy_rules_current: false
    platform_rules_current: false
    human_review_owner: ""
```

### 모드 하나 선택

- `corporate-brand`: 고객·파트너·투자자·지역사회 등 이해관계자를 향한 평판·역량 커뮤니케이션
- `employer-brand`: 고용주 가치 제안(EVP), 채용, 후보자 경험, 직원 옹호, 문화 커뮤니케이션

고객/이해관계자 여정과 후보자 여정을 합치지 않는다. 대상이나 원하는 행동으로 모드가 분명하지 않으면 간결한 질문 하나.

## Strategic job

### corporate-brand

행동·역량·이해관계자 증거로 조직의 목적을 신뢰할 수 있게 만든다. 잡 하나: `clarify identity` | `prove capability` | `earn stakeholder trust` | `explain change` | `support reputation` | `mobilize participation`

### employer-brand

적합한 후보자가 정보에 근거해 스스로 선택하도록 돕는다. EVP는 실제 직원 조사·정책·근무 조건·후보자 경험에서 도출한다. 잡 하나: `build talent awareness` | `clarify role reality` | `differentiate the EVP` | `convert qualified applicants` | `improve candidate trust` | `activate employee advocacy`

해결되지 않은 직장 문제를 꾸미는 데 고용주 브랜딩을 쓰지 않는다. 약속과 경험이 충돌하면 우회해서 쓰지 말고 운영상 격차를 표시한다. 조직 설계·인사 정책 자체는 gil:people-operations, gil:org-planning(해당 번들 설치 시)의 영역이다.

## Audience and journey

### corporate-brand 여정

| 단계 | 이해관계자의 질문 | 신뢰 신호 |
|---|---|---|
| awareness | 누구이며 왜 존재하나 | 명확한 정체성과 관련성 |
| credibility | 행동이 주장과 일치하나 | 날짜 있는 행동과 증거 |
| capability | 해낼 수 있나 | 사람, 시스템, 작업물, 성과 |
| engagement | 내 역할과 다음 단계는 | 투명한 참여 경로 |
| advocacy | 관계를 지지할 가치가 있나 | 일관된 경험과 책임 |

### employer-brand 여정

| 단계 | 후보자의 질문 | 신뢰 신호 |
|---|---|---|
| awareness | 왜 이 고용주를 고려하나 | 구체적이고 현행인 EVP |
| research | 실제 일은 어떤가 | 실제 직원·직무 증거 |
| role discovery | 이 직무가 관련 있고 진짜인가 | 완전한 사실 기반 직무 정보 |
| self-selection | 여기서 성공하고 소속될 수 있나 | 현실적 요건과 지원 |
| application/interview | 내 시간과 데이터가 존중되나 | 명확한 절차, 일정, 접근성, 프라이버시 |
| offer/onboarding | 조건이 약속과 일치하나 | 일관된 조건과 준비 |
| employee advocacy | 이야기가 여전히 사실인가 | 실제 경험과 자발적 목소리 |

지원자, 채용 매니저, 직원 옹호자, 임원, 고객, 투자자, 지역사회 이해관계자를 분리한다.

## Proof architecture

클레임 원장의 `claim` 앞에 유형을 적는다: `purpose | capability | impact | culture | compensation | benefit | diversity | award | ranking | employee-experience | hiring`.

증거 우선순위: 현행 정책·계약 사실 → 운영 행동 → 범위 있는 인력·이해관계자 데이터 → 승인된 직원 증거 → 외부 인정. 세련된 사무실 장면은 문화를 증명하지 않는다. 보상·복리후생에는 자격 조건을 명시한다.

| 증거층 | 예시 | 비고 |
|---|---|---|
| 정책·계약 | 취업규칙, 복리후생 규정, 근로계약 표준, 유연근무 정책 | `verified` 가능 |
| 운영 행동 | 실제 회의·의사결정·현장·고객 접점 기록 | 날짜 필수 |
| 인력 데이터 | 이직률·정착률·다양성 지표(범위·기간·분모) | `evidence_scope` 필수 |
| 직원 증거 | 자발적 참여 직원의 인터뷰·인용(승인·철회 절차) | 배우 대체 금지 |
| 외부 인정 | 수상·인증·순위(발급 기관·연도·범주) | 범주 넘는 일반화 금지 |

## Visual narrative

- corporate-brand: `purpose → people and systems → work in context → stakeholder evidence → next action`
- employer-brand: `role impact → real work → team interaction → support and trade-offs → candidate next step`

실제 업무, 결정, 도구, 고객, 현장, 직무별 세부를 우선한다. 토큰 다양성, 전원 젊은 팀, 영구 축하 장면, 빈 사무실, 연출된 브레인스토밍, 가짜 직원 인용, 일반 스톡 문화 이미지는 거부한다.

## Directing and capture

- 실제 직무 행동, 결정 순간, 장인적 세부, 팀 의식, 현장·생산 맥락, 리더십 책임, 접근성을 포착한다
- 직원 참여는 자발적으로 초대하고 초상권 동의, 사용 채널, 인용 승인, 철회 절차(제공 시)를 문서화한다
- 고객 데이터, 미공개 제품, 보안 통제, 출입증, 화면, 후보자 데이터, 기밀 작업을 노출하지 않는다
- 다양성은 시각적 머릿수 세기나 토큰 배치가 아니라 신뢰할 수 있는 참여와 다양한 권한으로 보여준다
- 다큐멘터리·재연·합성 장면을 표시한다. 배우나 합성 인물을 실제 직원·후보자로 제시할 수 없다
- employer 모드에서는 매력적인 면과 현실적인 면을 함께 담아 후보자가 스스로 선택하게 한다

## Channel deliverables

| 채널 | 산출물 | 의사결정 역할 |
|---|---|---|
| 기업 사이트 | 목적, 역량, 리더십, 임팩트 증거 | 평판·검증 |
| 채용 사이트 | EVP 증거, 직무군, 절차, 접근성, 프라이버시 | 후보자 조사·전환 |
| LinkedIn·리멤버 | 회사 증거, 직원 스토리, 사실 기반 공고 | 인지·참여 |
| 채용 플랫폼(사람인·잡코리아·원티드 등) | 진실하고 정확하며 완전한 기회 하나 | 지원 |
| 영상·소셜 | 직무 하루, 팀 작업, 리더십 맥락 | 현실적 미리보기 |
| 행사·PR | 채용 행사 키트, 기업 스토리, 미디어 자산 | 신뢰·참여 |
| 내부 라이프사이클 | 직원 옹호 키트, 온보딩 정렬 | 약속 연속성 |

기업 측정: 유효 이해관계자 참여, 메시지 이해, 평판 신호, 행동 완료. 고용주 측정: 유효 지원, 완료, 오퍼 수락, 후보자 경험, 초기 정착, 소스 품질, 민원율, 약속-경험 격차. 지원자 수만 보지 않는다. 채용 파이프라인 자체는 gil:recruiting-pipeline(해당 번들 설치 시).

## Prompt kernel

```text
[관할]의 [조직]에 대한 [corporate-brand | employer-brand] 방향을 만든다.
대상과 여정 단계: [대상/단계]. 전략 잡: [하나].
기업 약속 또는 EVP: [한정된 진술]. 현행 승인 증거만 사용한다.
실제 사람, 업무, 시스템, 조건, 정직한 다음 단계를 보여준다.
문화, 임팩트, 보상, 복리후생, 다양성, 수상, 순위, 직무, 직원 인용, 긴급성을 지어내지 않는다.
표현, 프라이버시, 고용, 접근성, 플랫폼 점검 중 미해결 항목을 표시한다.
지정된 제작 스킬을 위해 canonical `industry_direction` 객체를 반환한다.
```

## Claims and safety gates

- 진실 게이트: 공개 약속을 현행 정책·운영·직원 조사·후보자 경험과 대조한다
- 진성 직무 게이트: 실제 채용 의사, 진짜 기회 하나, 사실 기반 책임·자격·고용 형태·근무지·보상 조건·유급/무급 상태를 확인한다
- 변경 게이트: 광고된 조건보다 실질적으로 불리한 변경을 숨기거나 정상화하지 않는다(한국: 채용절차법 제4조)
- 공정 게이트: 보호 특성에 근거한 직접·대리 차별을 거부한다. 성별·연령·장애 관련 표현은 남녀고용평등법·연령차별금지법·장애인차별금지법 기준으로 점검하고 직업상 예외 주장은 자격 있는 리뷰어로
- 접근성 게이트: 편의 제공·연락 경로를 포함하고 장애인을 영감 소품으로 묘사하지 않는다
- 프라이버시 게이트: 지원자 데이터 최소화, 마케팅 동의 분리, 직원·장소·고객·내부 정보 사용 클리어
- 표현 게이트: DEI·문화 클레임에는 실제 정책·참여·성과 증거가 필요하다
- 플랫폼 게이트: 대상 시장·플랫폼별 현행 공고·타게팅 규칙 확인
- 합성 미디어 게이트: 가짜 직원·후보자·임원·공석·후기·보증 금지
- 현행 규칙이나 증거가 미해결이면 `draft-only`

## Reference handoff

- domain: `corporate-employer`
- 필수 첫 쿼리(L1): `Corporate Branding`
- 선택 직접 L2: `Employer Branding` | `Recruitment Campaign Design` | `Corporate Report Design` | `Corporate Culture Campaign Design`

승인된 소스마다 L1을 정확히 한 번 먼저. L2는 0~1개. 동의어, 두 번째 L2, 산업·스타일·렌즈·장소·색·감정·대상·플랫폼·브랜드·캠페인·레이아웃 수식어 금지. 확실한 서브타입이 없으면 L1에서 멈춘다. 탐색은 gil-creative:reference-board.

## Authority sources

광고에 현행 문구를 복사하지 말고 재확인한다. 최종 확인 2026-09-04(원문 기준).

- 한국, 채용절차의 공정화에 관한 법률 제4조: https://www.law.go.kr/DRF/lawService.do?MST=218301&OC=unicpla&efYd=20200526&mobileYn=Y&target=law&type=HTML
- 한국, 남녀고용평등과 일·가정 양립 지원에 관한 법률 제7조: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1025587289
- 한국, 고용상 연령차별금지 및 고령자고용촉진에 관한 법률 제4조의4: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1015647385
- 한국, 장애인차별금지 및 권리구제 등에 관한 법률 제10조: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1017943279
- LinkedIn Jobs Policies (2025-01-07 시행): https://www.linkedin.com/legal/l/jobs-policies
- LinkedIn Talent Solutions, Employer Branding guide (2023-08-14): https://www.linkedin.com/business/talent/blog/talent-acquisition/employer-branding
- Google Ads, Employment in personalized advertising 정책(현행): https://support.google.com/adspolicy/answer/16700442?hl=en

통제 규칙은 조직 규모·직무·관할·매체·플랫폼·게시일에 따라 달라진다.

## UZ 듀얼 주석

- 노동법: 우즈베키스탄 노동법(Mehnat kodeksi, 2023년 신법 시행)은 채용 차별 금지와 근로계약 필수 조건을 규정한다. 공고에 성별·연령·국적 제한을 명시하는 관행이 아직 남아 있으나 `prohibited_or_high_risk`에 기본 등재한다. 예외 허용 범위는 현지 확인 필요.
- 언어 관행: 채용 공고는 RU 단독 또는 UZ·RU 병기가 흔하다. 국가어 표기 의무와 외국어 공고 허용 범위는 현지 확인 필요. `required_disclosures`에 언어별 게시 여부 기록.
- 채널: HeadHunter(hh.uz), OLX.uz 구인 섹션, Telegram 채용 채널, LinkedIn(제한적) 순으로 관행이 있다. `channel_deliverables`에 hh.uz 공고와 Telegram 포스트를 포함한다.
- 보상 표기: 숨(UZS) 월급 표기가 일반적이며 "세전/세후", 시험 기간(sinov muddati) 조건을 명시한다. 외화 표기는 현지 규정 확인 필요.
- 외국 기업 채용: 한국 기업의 현지 채용은 워크퍼밋·비자 조건이 후보자 질문에 포함되므로 `audience_and_decision_unit`에 반영한다.
- 직원 초상: 마할라 단위 공동체 문화상 직원의 얼굴 노출에 가족 의견이 개입될 수 있다. 서면 동의와 철회 절차를 `directing_rules`에 둔다.
- 기업 브랜드: 국영·준국영 파트너십(예: 산업 클러스터 참여) 클레임은 공식 문서 없이는 `missing`.
- 인재 시장 맥락: 청년 인구 비중이 높고 해외 취업(한국 EPS 포함) 경쟁이 심하다. 한국 기업 EVP는 "한국 본사 연수·비자 지원" 클레임의 실제 정책 근거를 `evidence_scope`에 남긴다.
- 학력·자격 표기: 채용 공고의 학위·자격 요건은 직무 관련성이 있어야 한다. 과도한 요건은 `unresolved_decisions`에 올려 채용 매니저 확인.
- 트리거(UZ): "ish e'loni"(채용 공고), "ish beruvchi brendi"(고용주 브랜드). 채용 파이프라인은 gil:recruiting-pipeline(해당 번들 설치 시).
