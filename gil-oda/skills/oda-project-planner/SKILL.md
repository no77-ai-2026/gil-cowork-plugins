---
name: oda-project-planner
description: >
  ODA 사업을 기획합니다. 'KOICA UZ 사업 기획', 'EDCF 우즈벡 사업 발굴', 'ODA Concept Note',
  'Log Frame 작성', 'SDG 매핑'이라고 요청하세요. UZ 정부 우선순위 매핑·SDG 정렬·
  Log Frame Approach (LFA)·Concept Note·사업 범위 정의.
user-invocable: true
version: 1.0.1
---

# ODA 사업 기획 (ODA Project Planner)

> gil-oda | 한·우즈벡 ODA·EDCF 사업 발굴·기획

## 역할

ODA·EDCF·KSP 사업의 발굴·기획. UZ 정부 우선순위·한국 ODA 전략·SDG 정렬에 기반한 Concept Note·Log Frame·사업 범위 작성.

## 트리거 키워드

ODA 사업 기획, KOICA 사업 발굴, EDCF 사업 발굴, Concept Note, Log Frame, LFA,
SDG 매핑, 사업 범위, 사업 발굴, Project Identification

## 워크플로우

### Step 1: 사업 발굴 (Identification)

```
"사업 발굴 정보를 알려주세요:"

- 분야 (보건·교육·인프라·농업·IT·환경·거버넌스 등)
- UZ 협력 부처 (재무부·MID·교육부·보건부·교통부·정보통신부·도시건설부 등)
- 한국 측 주관 (KOICA·EDCF·KSP·기업·NGO·연구기관)
- 사업 규모·기간 (소형 1~3년 < $5M / 중형 3~5년 $5~30M / 대형 5년+ $30M+)
- 사업 유형 (무상·유상·정책 자문·기술 협력)
```

### Step 2: 우선순위 매핑

#### 한국 ODA 정책 (2026)

- **국제 협력 5개년 기본계획**
- **SDGs 17개 목표** 정렬
- **분야별 중점**: 교육·보건·거버넌스·기후·디지털·평화

#### UZ 정부 우선순위 (UZ-2030 Strategy)

- 디지털 전환
- 그린 에너지·기후 적응
- 보건·교육 현대화
- 농업 가치사슬 (면화 → 의류·식품)
- 인프라 (교통·도시·물)
- 거버넌스·반부패

#### SDG 매핑

각 사업을 SDG 17개 목표에 매핑:

| SDG | 목표 | UZ·한국 사업 예 |
|-----|------|----------------|
| 1 | No Poverty | 농촌 소득 |
| 3 | Good Health | 의료·백신 |
| 4 | Quality Education | 직업 훈련·디지털 교육 |
| 5 | Gender Equality | 여성 경제 활동 |
| 6 | Clean Water | 물·위생 |
| 7 | Clean Energy | 재생 에너지 |
| 8 | Decent Work | 일자리 |
| 9 | Industry & Innovation | IT·제조 |
| 11 | Sustainable Cities | Tashkent 도시 |
| 13 | Climate Action | 기후 적응 |
| 16 | Peace & Justice | 거버넌스 |
| 17 | Partnerships | 다자 협력 |

### Step 3: Concept Note 작성

#### 표준 양식 (KOICA·EDCF 통합)

```
[1. 사업 개요]
- 사업명 (한국어 + 영어)
- 사업 위치 (UZ 도시·주)
- 사업 분야·SDG
- 사업 기간
- 사업 비용 (USD)
- 한국 측 주관·UZ 측 협력 부처

[2. 사업 배경 (Background)]
- UZ 분야 현황 (지표·통계 — gil-data 활용)
- 개발 갭 (Development Gap)
- UZ 정부 정책·우선순위
- 선행 사업 (한국·국제기구)

[3. 사업 목표 (Objectives)]
- 상위 목표 (Goal): SDG·UZ-2030 정렬
- 사업 목적 (Purpose): 변화 가설
- 산출물 (Outputs): 구체 결과
- 활동 (Activities): 단계별

[4. 사업 범위·전략]
- 대상 지역
- 수혜자 (직접·간접)
- 접근 방식
- 기술 이전·역량 강화

[5. 사업 추진 체계]
- 한국 PMC (Project Management Consultant)
- UZ 협력 부처·기관
- 거버넌스 구조

[6. 예산 개요]
- 인건비 / 시설·장비 / 운영 / 컨설팅
- 한국 정부 (KOICA·EDCF) + UZ 정부 매칭

[7. 일정 (Timeline)]
- 단계별 (월·연 단위)

[8. 기대 효과]
- 정량 (수혜자 수·인프라·기술 이전)
- 정성 (역량·정책·관계)
```

### Step 4: Log Frame 작성 (LFA)

Logical Framework Approach — ODA 표준.

#### Log Frame 매트릭스 (4x4)

| 단계 | 서술 | 측정 지표 | 검증 수단 | 가정·전제 |
|------|------|----------|----------|----------|
| Goal (상위 목표) | 장기 영향 | OECD·UN 지표 | 통계청 | 정치 안정 |
| Purpose (사업 목적) | 사업 종료 시 변화 | 핵심 지표 | 평가 보고 | UZ 정부 의지 |
| Outputs (산출물) | 사업 직접 결과 | 정량 (수·시설) | 사업 보고 | 자원 확보 |
| Activities (활동) | 단계별 작업 | 예산·일정 | 회계·기록 | 인력·시기 |

#### 예시 (UZ 직업 훈련 사업)

```
Goal: UZ 청년 실업률 감소 (15~24세, 현재 17% → 2030 12%)

Purpose: 한국 직업 훈련 모델 UZ 도입으로 청년 5,000명 직업 역량 강화

Outputs:
1. Tashkent에 한·우즈벡 직업 훈련 센터 1개 설립
2. UZ 강사 100명 양성 (Train of Trainers)
3. UZ 학생 5,000명 졸업·취업 연계
4. 한·UZ 직업 인증 표준 1개 개발

Activities:
1.1 토지·건물 확보
1.2 시설·장비 조달
1.3 커리큘럼 개발
2.1 강사 선발
2.2 한국 연수
3.1 학생 모집
3.2 훈련 진행
3.3 취업 매칭
```

### Step 5: 사업 분류 결정

```
"사업 유형 확인:"

○ 무상 협력 (Grant) — KOICA
   - 5억~50억 원·3~5년
   - UZ 정부 매칭 (인력·토지)

○ 유상 협력 (Concessional Loan) — EDCF
   - 100억 원~수천억 원·10~30년
   - 차관 (이자율 0.01~1.5%)
   - 인프라·대형 사업

○ 정책 자문 (KSP) — KDI
   - 1~3억 원·1~2년
   - UZ 정부 정책·제도 전수

○ 기술 협력 (TCP) — KOICA
   - 한국 전문가 파견·UZ 연수

○ 다자 협력 — UN·WB·ADB 공동
   - 한국 신탁기금·KSP·MDTF
+ Other
```

### Step 6: 후속 작업

- "F/S 작성" → `edcf-feasibility`
- "풀 사업 제안서" → `oda-proposal-writer`
- "UZ 정부 협력" → `oda-stakeholder-engagement`
- "통계 데이터" → `gil-data:public-data`

## 한·우즈벡 ODA 우선 분야 (2025~2030)

### 1순위 (확대)

- **디지털 전환** (e-Government·IT 교육·스마트시티)
- **보건** (의료시설·백신·디지털 헬스)
- **교육** (직업 훈련·고등교육·한국학)
- **그린 에너지** (재생·에너지 효율)
- **농업** (면화 가치사슬·식품 가공·스마트팜)

### 2순위

- 거버넌스·반부패
- 도시 인프라 (Tashkent 메트로 확장)
- 물·위생
- 여성 경제 활동
- 청년 일자리

상세 한·우즈벡 ODA 30년사: `references/uz-oda-history.md`.

## KOICA UZ 프로그램 (NEW)

상세는 `references/koica-uz-programs.md`.

- 무상 협력 (Project)
- 봉사단·연수
- 글로벌 파트너십 (NGO·민간)
- 다자 협력 (UN·WB)
- 인도적 지원 (긴급)

## SDG 매핑 도구

- KOICA SDG 매핑 가이드라인
- UN SDG Indicators (https://unstats.un.org/sdgs)
- Korea SDG Report (외교부)

## 기획 단계 체크리스트

```
[ ] UZ 정부 우선순위 매핑
[ ] 한국 ODA 정책 정렬
[ ] SDG 매핑 (1~3개 목표)
[ ] 분야 적합성
[ ] 예산·기간 현실성
[ ] 한국 측 주관·UZ 협력 부처 명확
[ ] Log Frame 4x4 완성
[ ] Concept Note 8섹션
[ ] 선행 사업 검토 (중복 회피)
[ ] 환경·사회 영향 사전 평가
[ ] 성별·환경·인권 (Cross-cutting)
[ ] KOICA Tashkent 사전 협의
```

## 흔한 실수

1. UZ 정부 우선순위 무시
2. SDG 매핑 X
3. Log Frame 가정·전제 누락
4. 예산 비현실적
5. 선행 사업 중복
6. 환경·사회 영향 무시
7. UZ 협력 부처 사전 협의 X

## 자원

| 자원 | URL |
|------|-----|
| KOICA | https://www.koica.go.kr |
| KOICA Tashkent | https://www.koica.go.kr/koica_kr/3552/subview.do |
| 한국 외교부 ODA | https://www.odakorea.go.kr |
| UN SDG Indicators | https://unstats.un.org/sdgs |
| OECD DAC | https://www.oecd.org/dac |

## 면책

> 본 가이드는 사업 기획 보조. 최종 사업 발굴·기획은 KOICA·EDCF·KSP 공식 절차 + KOICA Tashkent 사전 협의 필수.

## 이 스킬을 사용하지 말아야 할 때

- **F/S 타당성 조사** → `edcf-feasibility`
- **풀 사업 제안서** → `oda-proposal-writer`
- **UZ 정부 협력 거버넌스** → `oda-stakeholder-engagement`
- **국제 입찰 응대** → `oda-tendering-uz`
- **모니터링 보고서** → `oda-monitoring-report`
- **민간 사업 (비ODA)** → `gil-business:strategy-planner`
