---
name: edcf-feasibility
description: >
  EDCF 사업 타당성 조사 (Pre-F/S·F/S)를 작성합니다. 'EDCF F/S', 'EDCF 타당성 조사',
  'Pre-F/S 작성', '경제·재무 분석', '환경 영향 평가', '한·우즈벡 차관 사업'이라고 요청하세요.
  EDCF 차관 적격성·경제·재무·기술·환경·사회 분석.
user-invocable: true
version: 1.0.1
---

# EDCF 타당성 조사 (EDCF Feasibility Study)

> gil-oda | EDCF Pre-F/S·F/S 풀 워크플로우

## 역할

EDCF (대외경제협력기금) 차관 사업의 타당성 조사 (Pre-F/S·F/S) 작성. 경제·재무·기술·환경·사회 5축 분석. 한국수출입은행·UZ 정부 차관 협상 자료.

## 트리거 키워드

EDCF, 타당성 조사, F/S, Pre-F/S, Feasibility Study, 경제 분석, 재무 분석, 환경 영향,
ESIA, EIA, Cost-Benefit Analysis, IRR, NPV, 한·우즈벡 차관, 차관 사업

## EDCF 차관 개요

### 운영 기관
한국수출입은행 (KEXIM) — Economic Development Cooperation Fund.

### 차관 조건 (UZ 일반)
- 이자율: 0.01~1.5%
- 거치 기간: 7~10년
- 상환 기간: 25~40년
- 통화: USD (또는 KRW)
- 규모: $10M~$500M+

### 우선 분야
- 교통·인프라 (도로·철도·항만·메트로)
- 에너지 (발전·송전·재생)
- 도시·물·위생
- 보건·교육 (시설)
- IT·디지털
- 환경 (기후 적응·친환경)

### UZ EDCF 주요 파이프라인 (참고)

상세는 `references/edcf-uz-pipelines.md`.

- Tashkent 메트로 연장
- 발전·송전 시설
- 의료시설
- 도로·교량
- e-Government

## 워크플로우

### Step 1: 사업 적격성 점검

```
"EDCF 차관 적격성 점검:"

[필수 조건]
[ ] UZ 정부 공식 요청 (또는 G2G 합의)
[ ] 사업 분야 EDCF 우선 (인프라·에너지·교육·보건·환경)
[ ] 사업 규모 EDCF 차관 한도 (UZ 1건 $10M+)
[ ] UZ 정부 매칭 (10~30%)
[ ] 환경·사회 영향 사전 평가 가능
[ ] 한국 기업 참여 가능 (Tied or Untied)

[Tied vs Untied]
○ Tied: 한국 기업 우선 (한국 기술·물품·컨설팅)
○ Untied: 국제 입찰 (한국 + UZ + 국제)
```

### Step 2: Pre-F/S (예비 타당성 조사)

소요: 3~6개월, 예산 $50K~$300K (KOICA·EDCF 지원).

#### Pre-F/S 보고서 구조

```
1. 사업 개요
2. UZ 분야 현황·정책
3. 사업 필요성·정당성
4. 사업 개념 (Concept)
5. 예비 타당성 분석
   5.1 기술 (간략)
   5.2 경제 (CBA — Cost-Benefit Analysis)
   5.3 재무 (IRR·NPV — 간략)
   5.4 환경·사회 (스크리닝)
6. 위험·완화 (Preliminary)
7. F/S 추진 권고
8. 예산·일정
```

### Step 3: F/S (본 타당성 조사)

소요: 6~12개월, 예산 $300K~$2M+ (한국 측 지원·EDCF 자금).

#### F/S 보고서 표준 구조 (15장)

```
[1. Executive Summary] (10p)
- 사업 개요·결론·권고

[2. 사업 배경·필요성] (15p)
- UZ 분야 현황
- 개발 갭
- UZ 정부 정책·요청
- 선행 사업·중복 회피

[3. 사업 범위·기술] (30p)
- 사업 위치 (지도·좌표)
- 시설·장비 사양
- 기술 옵션 분석
- 수원국 기술 수용성

[4. 시장·수요 분석] (15p)
- 인구·소득 (gil-data:public-data)
- 수요 예측
- 가격·요금 (해당 시)

[5. 경제 분석] (20p)
- Cost-Benefit Analysis (CBA)
- 사회적 비용·편익
- EIRR (Economic Internal Rate of Return) ≥ 12%
- ENPV (Economic NPV)

[6. 재무 분석] (20p)
- 사업비 추정 (자본·운영)
- 재무 모델 (현금흐름·DSCR)
- FIRR (Financial IRR)
- FNPV (Financial NPV)
- 민감도 분석 (수요·가격·환율·이자율)
- UZ 정부 상환 능력

[7. 환경 영향 평가 (EIA)] (25p)
- 베이스라인 (대기·물·토양·생물)
- 영향 예측 (건설·운영)
- 완화 조치
- 환경 관리 계획 (EMP)
- ADB·WB Safeguards 준수

[8. 사회 영향 평가 (SIA)] (20p)
- 수혜자·영향자
- 토지 수용·이주 (RAP)
- 성별·취약 계층
- 원주민 (해당 시)

[9. 추진 체계] (10p)
- PMU (Project Management Unit) — UZ 측
- PMC (Project Management Consultant) — 한국 측
- 거버넌스 (Steering Committee)

[10. 조달 계획] (10p)
- Tied vs Untied
- 입찰 패키지
- WB·ADB·KEXIM Procurement Guidelines

[11. 일정] (5p)
- 차관 협상·체결
- 입찰·계약
- 시공·운영
- 인수·이관

[12. 위험 분석] (10p)
- 정치·환율·기술·환경·사회
- 완화 조치

[13. 기대 효과] (10p)
- 직접 (시설·서비스)
- 간접 (경제·사회·환경)
- 한·우즈벡 협력 강화

[14. 결론·권고] (5p)
- 사업 타당성 종합
- 차관 협상 권고

[15. 부록] (다수)
- 도면·지도
- 재무 모델 (Excel)
- 환경 데이터
- 인터뷰·설문
- 선행 연구
```

### Step 4: 5축 분석 상세

#### 4.1 경제 분석 (CBA)

```
Economic Costs:
- Capital (Investment·Land·Land acquisition)
- Operating (O&M·Personnel·Maintenance)
- Externalities (Environmental damage·Social disruption)

Economic Benefits:
- Direct (Increased GDP·Time savings·Health gains)
- Indirect (Productivity·Inequality reduction)
- Externalities (Environmental·Social positive)

Discount Rate: 10~12% (Social Discount Rate)

EIRR ≥ 12%: 적격
ENPV > 0: 적격
B/C Ratio > 1: 적격
```

#### 4.2 재무 분석 (FIRR·NPV)

```
Financial Cash Flow:
Year 0: -$50M (Capital)
Year 1-3: -$5M/yr (Construction)
Year 4-30: +$10M/yr (Revenue or Cost Savings)

FIRR: 차관 이자율 + 5% 초과 권장
DSCR (Debt Service Coverage Ratio) > 1.2

Sensitivity Analysis:
- 수요 -20% / +20%
- 가격 -10% / +10%
- 환율 ±20% (UZS/USD)
- 이자율 ±2%

UZ 정부 상환 능력:
- GDP 대비 차관 비중
- 외환 보유고
- 부채 비율 (DSA)
```

#### 4.3 기술 분석

- 기술 옵션 비교 (3+)
- 한국 기술 적용 가능성
- UZ 기술 수용성·인력
- 표준 (한국·UZ·국제)

#### 4.4 환경 영향 (EIA)

EDCF·KEXIM Safeguards (WB·ADB 표준 준수):

- Category A: 중대 영향 → 풀 EIA + 공청회
- Category B: 중간 → 부분 EIA + 관리 계획
- Category C: 미미 → 환경 관리 계획만

EMP (Environmental Management Plan):
- 완화 조치
- 모니터링 일정
- 비용·책임

#### 4.5 사회 영향 (SIA)

- 성별 영향 (Gender Impact)
- 취약 계층 (장애인·노인·여성·아동)
- 토지 수용 (Resettlement Action Plan)
- 원주민 (UZ는 거의 미해당)

### Step 5: 후속 작업

- "풀 사업 제안서" → `oda-proposal-writer`
- "UZ 정부 협상" → `oda-stakeholder-engagement`
- "입찰 준비" → `oda-tendering-uz`
- "재무 모델 (Excel)" → `gil-office:xlsx-creator`
- "환경 데이터" → `gil-data:public-data`

## 핵심 지표 임계값

| 지표 | 임계값 | 의미 |
|------|--------|------|
| EIRR | ≥ 12% | 사회·경제 타당 |
| ENPV | > 0 | 사회·경제 타당 |
| B/C Ratio | > 1.0 | 비용보다 편익 |
| FIRR | 이자율 + 5% | 재무 타당 |
| FNPV | > 0 | 재무 타당 |
| DSCR | > 1.2 | 부채 상환 능력 |

## 환율 가정

```
[2026 기준 가정]
- USD/KRW: 1,380
- USD/UZS: 12,500
- 인플레: UZ 9% / 한국 2.5%
- 실질 할인율: 10%

→ Sensitivity Analysis로 ±20% 변동 시뮬레이션
```

## EDCF·WB·ADB Safeguards 비교

| 영역 | EDCF | World Bank | ADB |
|------|------|-----------|-----|
| 환경 (Cat A·B·C) | 적용 | ESF 적용 | SPS 적용 |
| 사회·이주 | 적용 | OP 4.12 | SPS |
| 원주민 | 적용 (제한적) | OP 4.10 | SPS |
| 성별 | 가이드 | Gender Strategy | Gender Action Plan |
| 정보공개 | 한국·UZ | Access to Information Policy | PCP |

UZ EDCF 사업은 보통 WB·ADB Safeguards도 함께 준수.

## 한·우즈벡 EDCF 사업 사례

상세는 `references/edcf-uz-pipelines.md`.

| 사업 | 차관 규모 | 분야 | 시기 |
|------|---------|------|------|
| Tashkent 도시 | $200M+ | 인프라 | 2010s |
| 의료 시설 | $50~$100M | 보건 | 2010~2020s |
| e-Government | $30~$80M | IT | 2010~2020s |
| 교육 시설 | $20~$60M | 교육 | 2020s |
| 발전·재생 | $50~$200M | 에너지 | 2020s+ |

## F/S 컨설턴트

EDCF F/S는 한국 측 컨설팅 회사 + UZ 현지 전문가가 공동 수행:

- 한국 측: KEXIM·KOICA 등록 컨설팅 (도화엔지니어링·삼안·서영엔지니어링·KECC 등)
- UZ 측: 현지 엔지니어링·연구기관

본 스킬은 컨설턴트 작성 보조 + UZ 정부·KEXIM 검토 보조.

## 면책

> 본 가이드는 F/S 작성 보조. 최종 F/S는 EDCF·KEXIM 공식 양식·MDB Safeguards 준수 + 한국 등록 컨설팅 + UZ 현지 전문가 + KEXIM·KOICA 검토 필수.

## 이 스킬을 사용하지 말아야 할 때

- **사업 발굴·기획** → `oda-project-planner`
- **풀 사업 제안서** → `oda-proposal-writer`
- **모니터링·평가** → `oda-monitoring-report`
- **입찰 준비** → `oda-tendering-uz`
- **재무 모델 단독** → `gil-finance:financial-statements`
