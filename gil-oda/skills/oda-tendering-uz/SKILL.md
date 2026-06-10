---
name: oda-tendering-uz
description: >
  ODA·EDCF·국제기구 입찰에 대응합니다. 'WB UZ 입찰', 'ADB 입찰', 'KOICA 입찰',
  'UZ zakupki.uz 입찰', '기술 제안서', '입찰서 작성', 'FIDIC 계약'이라고 요청하세요.
  UZ + World Bank + ADB + KOICA·EDCF 입찰 차이·국제 조달 표준.
user-invocable: true
version: 1.0.1
---

# ODA·국제 입찰 대응 (ODA International Tendering)

> gil-oda | UZ·KOICA·EDCF·WB·ADB·MDB 입찰 풀 가이드

## 역할

ODA 사업·국제기구 사업 입찰 응대. 컨설턴트 (QCBS·QBS)·시공·물품 조달. UZ + WB + ADB + KOICA·EDCF 표준 통합.

## 트리거 키워드

ODA 입찰, 국제 입찰, KOICA 입찰, EDCF 입찰, World Bank 입찰, ADB 입찰,
UZ 입찰, zakupki.uz, 기술 제안서, 가격 제안서, FIDIC, MDB Procurement

## 입찰 종류

### 1. 한국 ODA 입찰 (KOICA·EDCF)

#### KOICA 무상협력
- 한국 등록 컨설팅·기업 우선 (Tied)
- KOICA 조달 시스템: https://procure.koica.go.kr
- 한국어·영어
- 평가: 기술 80% + 가격 20% (QCBS) 또는 70:30

#### EDCF 차관 사업
- Tied (한국) 또는 Untied (국제)
- 한국 + UZ + 국제 기업
- KEXIM 조달 가이드라인

### 2. UZ 정부 입찰 (zakupki.uz)

- UZEX (UZ 상품원자재거래소) 운영
- URL: https://www.xarid.uzex.uz
- 러시아어·우즈벡어
- UZ 등록 법인 (외국인 OK, 등록 후)
- 보증금 1~3% (입찰), 5~10% (계약)

상세는 `gil-operations:process-manager/references/uz-procurement-zakupki.md`.

### 3. World Bank 입찰

#### Procurement Regulations (2016, 개정)

- WB 자금 사업 표준
- Open International Bidding (OIB)
- Limited International Bidding (LIB)
- Direct Selection (예외)
- QCBS·QBS·LCS·CQS·SSS (컨설턴트)

#### STEP (Systematic Tracking of Exchanges in Procurement)

WB 사업 입찰 추적 시스템.

#### URL
- WB 사업 검색: https://projects.worldbank.org
- WB 조달: https://wbgeprocure.worldbank.org

### 4. ADB 입찰

#### Procurement Policy (2017)

- WB와 유사
- ADB Operations Manual
- ADB 사업 검색: https://www.adb.org/projects

#### CSRN (Consulting Services Recruitment Notice)

ADB 컨설턴트 채용 공고.

### 5. UN 입찰

각 UN 기구별:
- UNGM (UN Global Marketplace): https://www.ungm.org
- UNDP·UNICEF·WHO 등 통합

### 6. EBRD·AIIB·IsDB 입찰

각 기구별 표준.

## 컨설턴트 입찰 방식

### QCBS (Quality and Cost-Based Selection)

가장 일반적. 기술 + 가격 통합 평가.

```
평가 = (기술 점수 × 80%) + (가격 점수 × 20%)

또는 (70%, 30%)·(90%, 10%)
```

### QBS (Quality-Based Selection)

기술만 평가, 가격은 협상:
- 복잡·전문 사업
- 컨설팅 (전략·정책)

### CQS (Consultant's Qualification Selection)

자격만 평가:
- 소규모·신속 사업
- 가격 제안서 X (자격만)

### LCS (Least Cost Selection)

기술 적격 + 최저가:
- 표준화된 사업
- 단순 업무

### SSS (Single Source Selection)

직접 지명:
- 긴급·특수 (이전 컨설턴트 연속 등)
- 정당화 필요

## 입찰서 작성 풀 워크플로우

### Step 1: 기회 발견

- WB STEP·ADB CSRN·KOICA 공고
- UN UNGM
- UZ zakupki.uz
- 기관별 메일링·뉴스레터

### Step 2: 자격 평가

```
[적격성 점검]

[기관 자격]
[ ] 등록 (KOICA·KEXIM·WB·ADB·UN)
[ ] 분야 경험
[ ] 매출 (최소 임계)
[ ] 인증 (ISO 9001·14001 등)

[기술 자격]
[ ] 핵심 인력 (CV)
[ ] 유사 사업 경력
[ ] 기술 역량
[ ] UZ·러시아어·영어 인력

[재무 자격]
[ ] 재무 안정 (감사 보고)
[ ] 입찰 보증
[ ] 이행 보증

[법적 자격]
[ ] 회사 등록·면허
[ ] 세무 (한국·UZ)
[ ] 부정당업자 X
```

### Step 3: EOI (Expression of Interest)

WB·ADB 컨설턴트 1차 단계:

```
[EOI 표준 양식]

1. 컨설팅 회사 소개
2. 핵심 인력 (간략)
3. 유사 사업 경력 (5~10개)
4. 분야 전문성
5. UZ·해당 지역 경험
6. 협력 파트너 (Joint Venture·Sub)
7. 재무·법적 자격

→ Shortlist (5~7개) 선정
```

### Step 4: RFP (Request for Proposal) 응답

EOI 통과 → RFP 풀 응답.

```
[RFP 응답 - 기술 제안서 (Technical Proposal)]

1. Letter of Submission
2. Approach·Methodology (사업 이해·방법론)
3. Work Plan·Schedule
4. Team Composition
5. Personnel CVs (핵심 인력 이력서)
6. Comments on TORs (Terms of Reference)
7. References (유사 사업)

[가격 제안서 (Financial Proposal) - 별도 봉인]

1. 인건비 (인력별·일별·월별)
2. 출장비
3. 기타 비용
4. 보고서·인쇄
5. 우발 사고
6. 세금 (한국·UZ·국제)

→ 별도 평가 (기술 통과 후 개봉)
```

### Step 5: 입찰 결과·계약

- 낙찰 → Contract Negotiation
- 계약 조항: FIDIC (시공)·MDB Standard (컨설팅)
- UZ 추가 조건 (현지 등록·매칭)

## 시공·물품 입찰 (Works·Goods)

### 시공 입찰

- ICB (International Competitive Bidding)
- NCB (National Competitive Bidding)
- FIDIC 계약 (Red·Yellow·Silver Book)

### 물품 입찰

- ICB·NCB
- ICT·의료기기·산업 장비

## 한국 등록 컨설팅·기업

### KOICA·KEXIM 등록

- 한국 컨설팅 (사전 평가)
- 분야별 (인프라·교육·보건·IT 등)
- 정기 갱신

### 한국 ODA 등록 회사 (예시)
- 도화엔지니어링
- 삼안
- 서영엔지니어링
- KECC
- 한솔엔지니어링
- 한국개발연구원 (KDI) — KSP 운영
- 한국법제연구원 — 법률·제도
- KOTRA (무역)
- 다수

## UZ 등록 (외국인 컨설팅)

UZ 사업 입찰 시 UZ 등록 필요:

```
[옵션]

옵션 1: UZ 지사 (Filial)
- 한국 본사가 UZ에 지사 설립
- 비교적 간단

옵션 2: UZ 법인 (ИЧТ·ООО)
- 외국인 100% 출자 LLC
- 더 안정적

옵션 3: UZ 현지 파트너 (Joint Venture)
- 현지 회사와 컨소시엄
- 입찰 우대 (UZ 지분 30%+)

옵션 4: 단발성 (Open Tender — 등록 X 가능)
- 일회성 입찰만
- WB·ADB 사업 일부
```

상세는 `gil-business:strategy-planner/references/uz-market-entry.md`.

## 입찰 평가 기준 (예시 — WB QCBS 80:20)

```
[기술 평가 (80점)]

1. 컨설턴트 자격·경험 (10점)
2. 사업 이해·접근 방법 (30점)
3. 핵심 인력 (40점)
4. 보고서 작성·발표 (해당 시) (-)

[가격 평가 (20점)]

가장 낮은 가격 = 100% 점수
다른 가격 = (최저가 / 해당 가격) × 100%
```

## 입찰 흔한 실수

1. **EOI에서 너무 많은 정보**: 간결·핵심
2. **CVs 표준화 X**: WB·ADB는 표준 양식 (DACON)
3. **유사 사업 X**: 분야·국가·규모 매칭
4. **TOR 분석 부족**: 모든 요구 조건 응답 필수
5. **방법론 일반론**: 본 사업 특화 필요
6. **Joint Venture 합의 모호**: 사전 명확
7. **가격 비현실**: 너무 낮으면 의심·너무 높으면 탈락
8. **언어 (영어 vs 러시아어)**: WB·ADB·UN 영어, UZ 러시아어
9. **마감 직전 제출**: 시스템 오류·자료 누락 위험
10. **외국 회사 단독 (UZ)**: 현지 파트너 권장

## UZ + 국제 입찰 차이

| 항목 | UZ (zakupki.uz) | WB·ADB | KOICA·EDCF |
|------|-----------------|--------|------------|
| 언어 | 러시아·우즈벡 | 영어 | 한국·영어 |
| 보증금 | 1~3% | 2~10% | 다양 |
| 평가 | 가격 우선 (보통) | QCBS 80:20 | QCBS·QBS |
| 외국 참여 | 조건부 | 자유 | Tied or Untied |
| 분쟁 | UZ 법원 | 국제 중재 (ICC·LCIA) | 한국·UZ |
| 표준 | UZ 법 | MDB Procurement | 한국·MDB |

## 자원

| 자원 | URL |
|------|-----|
| KOICA 조달 | https://procure.koica.go.kr |
| WB Projects·Procurement | https://projects.worldbank.org |
| ADB Projects | https://www.adb.org/projects |
| UN UNGM | https://www.ungm.org |
| UZ zakupki | https://www.xarid.uzex.uz |
| FIDIC | https://fidic.org |

## 면책

> 본 가이드는 입찰 응대 보조. 실제 입찰은 공식 RFP·기관 절차·등록 필수. 등록 컨설팅 + UZ 현지 파트너 + 법무 검토 권장.

## 이 스킬을 사용하지 말아야 할 때

- **사업 기획** → `oda-project-planner`
- **F/S** → `edcf-feasibility`
- **사업 제안서 (ODA 신청서)** → `oda-proposal-writer`
- **이해관계자·MOU** → `oda-stakeholder-engagement`
- **민간 입찰 (비ODA)** → `gil-operations:process-manager`
- **계약 법무** → `gil-legal:contract-review`
- **사업화 (비ODA)** → `gil-business:strategy-planner`
