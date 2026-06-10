---
name: oda-monitoring-report
description: >
  ODA 사업 모니터링·평가 보고서를 작성합니다. 'PDM 작성', 'RBM 보고', '반기 보고서',
  '연간 보고서', '사업 완료 평가', 'SROI 측정', 'ODA 평가'라고 요청하세요.
  KOICA·EDCF 표준 모니터링 양식 + RBM (결과 기반 관리) + DAC 5대 평가 기준.
user-invocable: true
version: 1.0.1
---

# ODA 모니터링·평가 보고서 (ODA Monitoring & Evaluation)

> gil-oda | 사업 진행·완료 평가·SROI

## 역할

ODA 사업 라이프사이클 동안의 모니터링·평가 (M&E) 보고서. 분기·반기·연간·완료 단계별 KOICA·EDCF·MDB 표준.

## 트리거 키워드

PDM, Project Design Matrix, RBM, Result-Based Management, Log Frame, 모니터링,
평가, Monitoring, Evaluation, Mid-term Review, Completion Report, SROI, DAC 평가

## 주요 양식·도구

### 1. PDM (Project Design Matrix)

JICA·KOICA 표준 — Log Frame 확장.

```
| 단계 | 서술 | 측정 지표 (OVI) | 검증 수단 (MOV) | 가정·전제 |
|------|------|---------------|--------------|---------|
| Goal | 상위 목표 | OECD·UN 지표 | 통계청 | 정치 안정 |
| Purpose | 사업 목적 | 핵심 성과 지표 | 평가 | UZ 정부 의지 |
| Outputs | 산출물 | 정량 지표 | 사업 보고 | 자원 |
| Activities | 활동 | 예산·일정 | 회계 | 인력 |
```

#### 예시

```
Goal: UZ 청년 실업률 17% → 12% (2030)
OVI: ILO·KOSIS 통계
MOV: stat.uz·ILO Annual Report

Purpose: TVET 5,000명 졸업·취업
OVI: 졸업률 95%·취업률 80%
MOV: 사업 완료 평가

Outputs:
1. TVET 센터 1개 설립
   - OVI: 시설 면적 5,000㎡·장비 100종
   - MOV: 시공 검수
2. 강사 100명 양성 (한국 연수)
   - OVI: 100명 인증서
   - MOV: 한국기술교육대 인증

Activities:
1.1 토지·건물 (예산 ₩20억)
1.2 장비 조달 (₩15억)
2.1 강사 선발 (UZ)
2.2 한국 연수 (₩5억)
```

### 2. RBM (Results-Based Management)

UN·WB·ADB 표준.

```
[Results Chain]

Inputs → Activities → Outputs → Outcomes → Impact

Inputs (자원):
- $50M·인력·시설

Activities (활동):
- 컨설팅·시공·교육

Outputs (산출):
- 시설 1개·강사 100명·학생 5,000명

Outcomes (성과):
- 청년 취업 4,000명·산업 역량 강화

Impact (영향):
- 청년 실업률 감소·산업 경쟁력
```

### 3. DAC 5대 평가 기준 (OECD)

```
1. Relevance (적절성)
   - UZ 정부·SDG·한국 정책 정렬

2. Effectiveness (효과성)
   - 목표 달성 정도

3. Efficiency (효율성)
   - 비용·시간 vs 성과

4. Impact (임팩트)
   - 단·장기 변화

5. Sustainability (지속가능성)
   - 사업 후 자체 운영
```

추가 (2019 개정):
- **Coherence**: 다른 사업·정책과 일관

### 4. SROI (Social Return on Investment)

```
SROI Ratio = (사회·경제 가치 - 비용) / 비용

예: $50M 투자 → $200M 사회 가치
SROI = (200 - 50) / 50 = 3.0 (1달러 투자당 $3 사회 가치)

[측정 단계]
1. 이해관계자 매핑
2. 변화 이론 (Theory of Change)
3. 결과 측정·가치화 (화폐 환산)
4. 영향 검증 (Attribution·Deadweight)
5. SROI 계산
6. 보고
```

## 보고서 종류

### 1. 분기 보고서 (Quarterly Report)

```
[표준 양식]
1. 사업 개요 (1p)
2. 분기 진행 상황 (2~3p)
   - 활동별
   - 산출물 진행률 (%)
3. 예산 집행 (1p)
   - 계획 vs 실적
4. 이슈·위험 (1p)
   - 발견·대응
5. 다음 분기 계획 (1p)

총 5~7페이지
```

### 2. 반기·연간 보고서 (Semi-Annual·Annual)

```
[표준 양식]
1. Executive Summary (2~3p)
2. 사업 개요 (3p)
3. 진행 상황 (10~15p)
   - PDM·RBM 추적
   - 산출물·성과
4. 예산·재무 (5p)
5. 모니터링 결과 (5p)
6. 이슈·위험·완화 (5p)
7. 학습·교훈 (3p)
8. 다음 기간 계획 (3p)
9. 부록

총 35~50페이지
```

### 3. 중간 평가 (Mid-term Review)

사업 중반 (50% 진행 시점) 외부 평가:

```
1. 사업 개요·목표·예산
2. 진행 상황 (DAC 5대 기준)
3. 주요 발견
4. 권고 사항
5. 향후 조정안
```

### 4. 완료 보고서 (Completion Report)

```
[표준 양식 - 50~80p]

1. Executive Summary (5p)
2. 사업 개요 (5p)
3. 사업 진행 (10p)
   - 산출물 달성
   - 예산 집행
4. DAC 5대 평가 (15p)
   - Relevance
   - Effectiveness
   - Efficiency
   - Impact
   - Sustainability
5. SROI (5p, 해당 시)
6. 학습·교훈 (10p)
7. 권고 사항 (5p)
8. 부록
   - PDM·RBM 최종
   - 재무·통계
   - 인터뷰·설문
```

### 5. 사후 평가 (Ex-post Evaluation)

사업 종료 3~5년 후:
- 지속 가능성 검증
- 장기 임팩트
- 학습 교훈

## 워크플로우

### Step 1: 보고서 종류 선택

```
"보고서 종류는?"

○ 분기 보고서
○ 반기 보고서
○ 연간 보고서
○ 중간 평가 (Mid-term Review)
○ 사업 완료 보고서 (Completion Report)
○ 사후 평가 (Ex-post Evaluation)
○ SROI 측정
+ Other
```

### Step 2: 데이터 수집

- PDM·RBM 기준
- 활동별 진행 데이터
- 예산 집행 (`gil-finance:variance-analysis`)
- 모니터링 데이터 (`gil-data:public-data`)
- 이해관계자 인터뷰·설문

### Step 3: 분석

- 산출물 달성률 (계획 vs 실적)
- 예산 변동 (계획 vs 실적)
- 이슈·위험 식별
- DAC 5대 기준 (해당 시)
- SROI (해당 시)

### Step 4: 보고서 작성

- 표준 양식
- 한국어 + 영어 (KOICA·EDCF 양식)
- 또는 영어 + 러시아어 (UZ 정부 보고)
- DOCX (`gil-office:docx-generator`)
- PPT 발표 (`gil-office:pptx-designer`)

### Step 5: 검수·제출

- 한국 측 (KOICA·EDCF·KEXIM)
- UZ 측 (협력 부처)
- 다자 (해당 시 — UN·WB·ADB)
- 외부 평가자 (Mid-term·Completion)

## 모니터링 지표 (Monitoring Indicators)

### SMART 원칙

- **S**pecific (구체)
- **M**easurable (측정 가능)
- **A**chievable (달성 가능)
- **R**elevant (관련)
- **T**ime-bound (시간 제한)

### 좋은 vs 나쁜 지표

| 영역 | 나쁜 | 좋은 |
|------|------|------|
| 교육 | "교육 개선" | "TVET 졸업률 80% 달성 (2027)" |
| 보건 | "건강 향상" | "5세 이하 영아 사망률 25/1000 → 18/1000 (2028)" |
| 인프라 | "도로 건설" | "Tashkent~Samarkand 350km 4차선 (2026)" |

## 한·우즈벡 사업 모니터링 특수 사항

### UZ 정부 보고 의무
- UZ MoF (Ministry of Finance)
- UZ MID (Ministry of Innovative Development)
- 협력 부처 (분야별)
- 보고 언어: 러시아어 또는 우즈벡어

### KOICA Tashkent 보고 라인
- KOICA Tashkent 사무소
- KOICA HQ (성남)
- 외교부 ODA 정책관

### 다자 협력 시 추가
- UN Resident Coordinator
- World Bank Country Director
- ADB Country Director

## 환경·사회 모니터링 (Safeguards)

EDCF 차관·MDB 사업 시 필수:

- **환경 모니터링** (분기·반기)
- **사회 모니터링** (성별·취약 계층)
- **이주 모니터링** (RAP 진행)
- **불만 처리 (Grievance Redress)**

## SROI 활용 (NEW)

ODA 사업 사회·경제 임팩트 화폐 환산:

```
[예시: TVET 사업]

투자: $5M (KOICA + UZ 매칭)

산출 (5년):
- 졸업생 5,000명
- 취업률 80% (4,000명)
- 평균 임금 $400/월 → 연 $4,800 → 5년 $24,000

사회 가치:
- 졸업생 추가 소득: $24,000 × 4,000 = $96M
- 가족 영향: 1.5배 = $144M
- 산업 경쟁력 (간접): $30M
- 합계: $270M

Deadweight (X 사업해도 일부 발생): -20% = $216M
Attribution (사업 단독 기여 비율): 70% = $151M

SROI = ($151M - $5M) / $5M = 29.2

→ 1달러 투자당 $29 사회 가치 (매우 높음)
```

→ ODA 사업 정당화·후속 사업 근거.

## 자원

| 자원 | URL |
|------|-----|
| KOICA 평가 가이드라인 | KOICA HQ 발간 |
| EDCF 모니터링 매뉴얼 | KEXIM |
| OECD DAC Evaluation | https://www.oecd.org/dac/evaluation |
| UNDP Evaluation Guidelines | https://www.undp.org/evaluation |
| SROI Network | https://www.socialvalueint.org |

## 면책

> 본 가이드는 보고서 작성 보조. 최종 보고서는 KOICA·EDCF·MDB 공식 양식·평가 기준 + 외부 평가자·UZ 정부 검토 필수.

## 이 스킬을 사용하지 말아야 할 때

- **사업 발굴·기획** → `oda-project-planner`
- **F/S 타당성** → `edcf-feasibility`
- **사업 제안서** → `oda-proposal-writer`
- **거버넌스·이해관계자** → `oda-stakeholder-engagement`
- **재무 분석 단독** → `gil-finance:variance-analysis`
- **데이터 시각화** → `gil-data:data-visualizer`
