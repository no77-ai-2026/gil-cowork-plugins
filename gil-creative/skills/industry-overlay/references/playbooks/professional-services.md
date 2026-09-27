# 전문 서비스 플레이북 (professional-services)

컨설팅·에이전시·법률·회계·세무·건축·재무 자문·부동산 중개 등 전문성 기반 서비스의 브리프를 증거 기반 `industry_direction` 패킷으로 바꾼다. 전략과 안전 오버레이이지 현행 전문직·법적 검토를 대신하지 않는다. 법률 자문이 아니다.

적용: 자문형 서비스 브랜드, 전문가 포지셔닝, 리드 생성, 권위 콘텐츠. 교육·의료·고용·제품 캠페인은 각자의 플레이북으로.

## Canonical handoff

`industry_direction` 루트 하나로 반환하고 canonical 필드를 전부 채운다. 선택한 전략 잡은 `message_job`, 구체적 증거 산출물은 `proof_objects`, 캡처 요구는 `must_capture`, 직종별 통제는 `directing_rules`, 게시 통제는 `required_disclosures`·`prohibited_or_high_risk`·`human_review_gate`에 매핑한다.

```yaml
mode_or_subtype: "general-service | licensed-professional"
reference_route: {domain_id: "professional-services", l1: "Professional Services Branding", l2: "", query_count: 1}
domain_extensions:
  domain: "professional-services"
  promise: ""
  proof_priority: []
  message_boundary: []
  compliance_review:
    licensed_rules_current: false
    platform_rules_current: false
    consent_and_confidentiality_cleared: false
    human_review_owner: ""
```

### 모드 하나 선택

- `general-service`: 브리프에 직종별 광고 규제가 식별되지 않는 서비스 사업
- `licensed-professional`: 변호사, 회계사, 세무사, 건축사, 재무 설계사, 공인중개사 등 자격 기반 실무

모드가 클레임이나 승인을 바꾸는데 추론 불가면 질문 하나. 전문직 직함·면허·인증·순위·수상·제휴는 증거 없이 사실로 취급하지 않는다.

## Strategic job

전문 서비스 마케팅은 정보 비대칭과 지각된 결정 리스크를 줄인다. 일반적 우수성 주장이 아니라 특정 고객·문제·방법·경계로 포지셔닝한다.

- 인지도 낮음 또는 신규 실무: 검증된 자격, 과정 명료성, 진단적 유용성으로 시작
- 고의도 로컬 수요: 적합성, 가용성, 응답 기대, 범위, 가격 논리로 시작
- 장주기 또는 B2B 작업: 관점 교육, 맥락 있는 사례 증거, 상담, 이해관계자 지원
- 고결과 작업: 긴급성이나 감정 압박보다 한정된 클레임과 정보에 근거한 선택

전략 잡 하나: `diagnose` | `reduce risk` | `differentiate method` | `prove fit` | `convert consultation` | `retain and refer`

## Audience and journey

| 단계 | 대상의 질문 | 유용한 콘텐츠 | 주 신뢰 신호 |
|---|---|---|---|
| problem recognition | 문제를 이해하고 있나 | 진단 가이드, 체크리스트, 오해 교정 | 구체성과 유용성 |
| shortlist | 이 실무가 관련 있고 적법한가 | 서비스 범위, 전문가 프로필, 자격 요건 | 검증된 정체성과 자격 |
| validation | 내 케이스 같은 걸 다룰 수 있나 | 맥락 있는 사례, 방법, 작업 샘플 | 경계 있는 증거 |
| consultation | 무엇이 일어나고 비용은 | 의제, 수임료 논리, 일정, 책임 | 과정 투명성 |
| onboarding | 믿고 함께 일할 수 있나 | 단계, 소통 기준, 변경 정책 | 예측 가능성과 배려 |
| retention/referral | 가치가 책임 있게 전달됐나 | 결과 리뷰, 후속, 승인된 리뷰 요청 | 문서화된 전달 |

다중 이해관계자 구매에서는 사용자, 경제적 구매자, 승인자, 리스크 검토자를 구분한다.

## Proof architecture

클레임 원장의 `claim` 앞에 유형을 적는다: `credential | capability | performance | comparison | price | testimonial | affiliation`.

증거 우선순위: 법적으로 유효한 정체성·자격 → 실제 전달 과정 → 대표적 경험 증거 → 승인된 고객 증거 → 미적 완성도. 예외적 사례 하나가 일반적 결과를 세우지 못한다. 추천·보증 뒤의 대가 관계는 클레임 가까이에 명확히 고지한다.

| 증거층 | 예시 | 비고 |
|---|---|---|
| 정체성·자격 | 자격증 번호, 협회 등록, 사업자 정보 | 발급 기관 확인 후 `verified` |
| 전달 과정 | 진단 → 제안 → 실행 → 보고 절차, 소통 기준 | 실제 운영 문서 |
| 경험 증거 | 사례 수·분야·기간(고객 식별 불가 처리) | `evidence_scope`로 범위 명시 |
| 고객 증거 | 승인된 사례 연구, 동의된 후기 | 대가 관계 고지 |
| 완성도 | 브랜드 디자인, 사무실 | 신뢰의 근거가 아님 |

## Visual narrative

시퀀스: `person → process → proof object → client value → next step`

- person: 실제 작업 맥락 속 책임 있는 전문가 또는 팀
- process: 진단, 검토, 워크숍, 현장 조사, 의사결정
- proof object: 기밀 데이터를 제거한 도면, 모델, 마크업 문서, 대시보드, 작업 샘플
- client value: 명료함, 진전, 마찰 감소, 완료된 서비스 순간. 지어낸 결과가 아님
- next step: 상담, 진단, 범위 있는 문의

교체 가능한 악수, 빈 회의실, 연출된 통화, 트로피 벽, 노트북만 있는 이미지는 피한다.

## Directing and capture

- 환경 초상, 실제 제스처, 협업, 검토 순간, 도구, 읽히는 과정 세부를 포착한다
- 고객 문서, 화면, 주소, 사건 식별자는 프레임 밖에 두거나 사용 전 되돌릴 수 없게 마스킹한다
- 차분한 유능함과 주의 깊은 상호작용을 연출한다. 위협, 사치, 정부 기관 같은 상징으로 권위를 연출하지 않는다
- 인물 초상권, 장소 사용권, 로고 허가, 장면이 다큐멘터리/재연/합성인지 기록한다
- 재연을 쓰면 카피나 맥락이 배우를 실제 고객으로 암시하지 않게 한다

## Channel deliverables

| 채널 | 산출물 | 의사결정 역할 |
|---|---|---|
| 서비스 웹사이트 | 서비스 페이지, 전문가 프로필, 방법론, FAQ | 숏리스트·검증 |
| 검색·로컬 | 의도 광고, 로컬 프로필 세트, 집중 랜딩 | 수요 포착 |
| LinkedIn·사고 리더십 | 전문가 기고, 캐러셀, 웨비나 클립 | 카테고리 권위 |
| 사례 지원 | 맥락 있는 사례 페이지 또는 PDF | 증거·내부 공유 |
| 상담 | 진단 폼, 의제, 확인 | 적합성·기대 설정 |
| 라이프사이클 | 온보딩 가이드, 진행 노트, 리뷰 요청 | 유지·추천 |

측정: 유효 상담률, 출석률, 제안 수락, 확신까지의 시간, 유지, 추천, 민원, 클레임 재작업. 리드 수만 최적화하지 않는다.

## Prompt kernel

```text
[관할]의 [서비스]에 대한 [general-service | licensed-professional] 방향을 만든다.
대상과 여정 단계: [대상/단계]. 전략 잡: [하나].
승인된 사실과 첨부한 클레임 원장만 사용한다. [증거 우선순위]로 신뢰를 쌓는다.
시각 내러티브: 책임 있는 사람, 실제 과정, 클리어된 증거 객체, 비례하는 다음 단계.
자격, 결과, 순위, 비교, 제휴, 가격, 후기, 긴급성을 지어내지 않는다.
미해결 클레임과 현행 직종/플랫폼 검토 요건을 표시한다.
지정된 제작 스킬을 위해 canonical `industry_direction` 객체를 반환한다.
```

## Claims and safety gates

- 일반 게이트: 거짓·과장·기만·부당 비교·비방 암시를 걸러낸다(한국: 표시광고법 제3조)
- 후기 게이트: 실제 경험, 대표성 있는 프레이밍, 동의, 대가 관계 고지를 확인한다
- 면허 모드 게이트: 관할 직종, 직함 규칙, 권유 규칙, 필수 고지, 기록 보존 의무, 책임 리뷰어를 식별한다. 한국 변호사 광고는 대한변협 광고 규정, 세무사·회계사·공인중개사는 각 협회 규정 확인
- 기밀 게이트: 명시적 클리어 없이는 고객 정체성, 보호 사실, 비밀유지 특권 자료, 식별 가능한 작업물을 제외한다
- 합성 미디어 게이트: 가짜 전문가, 가짜 고객, 조작 리뷰, 암시적 보증 금지
- 게시 게이트: 게시 시점 관할·플랫폼 재확인. 미확인이면 `draft-only`

문구 점검은 gil-commerce:commerce-ad-claim-compliance-kr(해당 번들 설치 시), 법률 리스크 자체는 gil:legal-risk(해당 번들 설치 시), 최종 검토는 gil-creative:publication-review.

## Reference handoff

- domain: `professional-services`
- 필수 첫 쿼리(L1): `Professional Services Branding`
- 선택 직접 L2: `Law Firm Branding` | `Accounting Firm Branding` | `Consulting Firm Branding` | `Architecture Firm Branding`

승인된 소스마다 L1을 정확히 한 번 먼저. L2는 0~1개. 동의어, 두 번째 L2, 스타일·렌즈·장소·색·감정·대상·플랫폼·브랜드·캠페인·레이아웃 수식어 금지. 확실한 서브타입이 없으면 L1에서 멈춘다. 탐색은 gil-creative:reference-board.

## Authority sources

광고에 현행 문구를 복사하지 말고 재확인한다. 최종 확인 2026-09-04(원문 기준).

- 한국, 표시·광고의 공정화에 관한 법률 제3조: https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029943751
- 한국 공정거래위원회, 추천·보증 등에 관한 표시·광고 심사지침(2026-06-01 시행): https://www.law.go.kr/LSW/admRulInfoP.do?admRulSeq=2100000280130&chrClsCd=010201
- 대한변호사협회, 변호사 광고 관련 규정 목록(현행): https://www.koreanbar.or.kr/pages/board/law_list.asp?category=3&page=1&searchstr=%EA%B4%91%EA%B3%A0&types=6
- American Bar Association, Model Rule 7.1 주석(비교 윤리 기준): https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_7_1_communication_concerning_a_lawyer_s_services/comment_on_rule_7_1/
- Google Ads, Misrepresentation 정책(현행): https://support.google.com/adspolicy/answer/15936666?hl=en-GB

통제 규칙은 직종·관할·매체·게시일에 따라 달라진다.

## UZ 듀얼 주석

- 면허 전문직: 우즈베키스탄에서 변호사(advokat)는 변호사회(Advokatlar palatasi) 소속 면허, 공증인·감사인·세무 컨설턴트도 각각 면허·등록 제도가 있다. 광고에 면허 번호·소속을 표기하는 관행이 있으며 의무 범위는 현지 확인 필요. `required_disclosures`에 "면허 번호(UZ)"를 기본 후보로 둔다.
- 변호사 광고 제한: 성공 보장·승소율 표현은 한국과 같이 `missing` 처리하고, 현지 변호사 윤리 규정상 광고 허용 범위는 현지 확인 필요.
- 한국 기업 대상 서비스: 한국 투자기업·ODA 사업 대상 자문(법인 설립, 세무, 인허가)이 흔하다. 대상 결정 단위에 한국 본사 승인자를 포함하고, 카피는 KR·RU·UZ 3언어 병렬로 준비한다. ODA 맥락은 gil:oda-tendering-uz(해당 번들 설치 시).
- 언어: RU가 비즈니스 자문에서 여전히 우세하나 공식 문서는 UZ. 국가어 병기 의무는 현지 확인 필요.
- 채널: LinkedIn보다 Telegram 채널·개인 네트워크·마할라 단위 소개가 리드 원천이다. `channel_deliverables`에 Telegram 전문가 채널과 세미나 키트를 포함.
- 증거 객체: 사업자 등록(STIR 번호), 면허, 협회 회원증을 `proof_objects`에 넣되, 정부 기관 로고·"정부 공인" 표현은 공식 근거 없이는 `prohibited_or_high_risk`.
- 가격: 숨(UZS) 또는 외화 병기 관행이 있으나 외화 표시 규제는 현지 확인 필요.
- 비교·비방: 우즈벡 광고법은 비교광고와 경쟁사 비방에 제한을 둔다. "타 로펌보다 빠른" 류 표현은 `prohibited_or_high_risk`에 기본 등재하고 허용 범위는 현지 확인 필요.
- 사례 공개: 고객사 이름·사건 공개는 비밀유지 관행이 한국보다 느슨한 경우가 있으나 이 플레이북은 한국 기준(명시적 클리어 없이는 제외)을 그대로 적용한다.
- 트리거(UZ): "yuridik xizmat reklamasi"(법률 서비스 광고), "konsalting reklamasi"(컨설팅 광고).
