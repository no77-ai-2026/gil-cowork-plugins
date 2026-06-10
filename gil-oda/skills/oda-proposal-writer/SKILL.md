---
name: oda-proposal-writer
description: >
  ODA 사업 제안서를 작성합니다. 'PCP 작성', 'KOICA 사업제안서', 'EDCF 사업 신청',
  'KSP 정책 자문 제안', 'UN·WB·ADB 협력 제안', '사업개요서'라고 요청하세요.
  KOICA·EDCF·KSP·다자 (UN·WB·ADB) 양식·표준 + 한·우즈벡 사업 특화.
user-invocable: true
version: 1.0.1
---

# ODA 사업 제안서 작성 (ODA Proposal Writer)

> gil-oda | KOICA·EDCF·KSP·다자 사업 제안서

## 역할

사업 제안서 풀 작성: PCP (사업개요서) → Pre-F/S → F/S → 차관 협상 단계까지. KOICA·EDCF·KSP·UN·WB·ADB 양식 모두 지원.

## 트리거 키워드

ODA 제안서, PCP, 사업개요서, KOICA 신청, EDCF 신청, KSP 제안, KSP 정책 자문,
UN 사업 제안, World Bank 제안, ADB 제안, 사업 신청서, Project Proposal

## 제안서 종류·양식

### 1. KOICA 사업제안서

```
[유형]
- 일반 무상협력 (Project)
- 글로벌 파트너십 (CIVIL SOCIETY)
- 봉사단·연수
- 인도적 지원

[기본 양식 (KOICA Project)]
1. 사업 개요 (1p)
2. 사업 배경·필요성 (5p)
3. 사업 목적·전략 (5p)
4. 사업 내용 (산출물·활동 — 10p)
5. 추진 체계 (한국·UZ — 5p)
6. 예산 (5p)
7. 일정 (3p)
8. 위험 분석·완화 (3p)
9. 기대 효과 (3p)
10. 부록 (Log Frame·MOU·이력서 등)
```

### 2. EDCF 사업개요서 (PCP - Project Concept Paper)

```
[형식]
- 한국어 + 영어
- 30~60p
- 한국수출입은행 제출 → 검토 → 승인 → F/S 진행 단계로

[구조]
1. 사업 개요
2. UZ 측 요청 배경
3. 사업 목적·범위
4. 예비 타당성 (간략)
5. 차관 조건 (예상)
6. 한국 기업 참여 (Tied/Untied)
7. 일정·예산
8. 위험·고려사항
```

### 3. KSP 정책 자문 제안서

KSP (Knowledge Sharing Program) — KDI (한국개발연구원) 운영, 한국 발전 경험 UZ 정부에 전수.

```
[양식]
1. 정책 자문 주제 (구체)
2. UZ 정부 수원 기관·고위 인사
3. 한국 측 자문단 (학자·정책가)
4. 자문 활동 (워크숍·연수·정책 보고서)
5. 일정 (1~2년)
6. 예산
7. 기대 효과 (정책 채택)

[자문 주제 예시]
- UZ 산업 정책
- 디지털 정부 전환
- 환경·기후 정책
- 교육 개혁
- 재정·금융 안정
- 무역·투자 활성화
```

상세는 `references/ksp-policy-consulting.md`.

### 4. UN 사업 제안서

UNDP·UNICEF·UNDP·UN Women·FAO 등.

```
[표준 양식 (UNDP Project Document)]
1. Project Title·Country·Partners
2. Brief Description
3. Theory of Change
4. Results Framework (Log Frame)
5. Budget·Workplan
6. Management Arrangement
7. Risk Log
8. Evaluation·Audit
9. Annexes
```

### 5. World Bank 사업 제안서

```
[Bank-funded Project]
- Concept Note → Pre-Appraisal → Appraisal → Negotiation
- PAD (Project Appraisal Document) — 본 제안서

[구조]
- Project Description
- Key Risks·Mitigation
- Implementation Arrangements
- Procurement·Financial Management
- Safeguards (ESF)
- Results Framework
```

### 6. ADB 사업 제안서

WB와 유사 (RRP - Report and Recommendation of the President).

## 풀 워크플로우

### Step 1: 사업 유형·기관 결정

```
"제안서 종류는?"

○ KOICA 무상협력 (Project)
○ KOICA 글로벌 파트너십
○ EDCF PCP
○ KSP 정책 자문
○ UN (UNDP·UNICEF 등)
○ World Bank
○ ADB
○ 다자 협력 (한국 + WB·ADB)
+ Other
```

### Step 2: 사전 데이터 수집

`oda-project-planner` 산출물 또는 직접 입력:
- Concept Note·Log Frame
- UZ 협력 부처·MOU 진행 상황
- 한국 측 주관·컨설턴트·기업

`gil-data:public-data`로 UZ 통계 수집.

### Step 3: 양식별 작성

선택된 양식의 풀 섹션 작성.

#### KOICA 무상협력 예시

```
[1. 사업 개요]

사업명 (한): 우즈베키스탄 직업훈련센터 설립 사업
사업명 (영): Establishment of TVET Center in Uzbekistan
사업기간: 2026~2028 (3년)
사업비: ₩50억 원 (KOICA 무상)
UZ 매칭: 토지·건물 (USD 5M 상당)
사업위치: Tashkent City
대상기관: UZ 직업훈련부 (Vocational Training Agency)
한국주관: KOICA + 한국기술교육대학교

[2. 사업 배경·필요성]

UZ 청년 (15~24세) 실업률: 17% (2024, 한국 6%)
직업 훈련 인프라 부족: 인구 1,000명당 직업학교 0.05개 (한국 0.4개)
한국·UZ 협력 강화: K-Move·K-tech 우즈벡 진출
한국 직업 교육 모델 글로벌 전수 (싱가포르·태국 사례)

[...전체 섹션...]
```

### Step 4: 검수·연계

- `gil:ai-slop-reviewer`: AI 어구 검수
- `oda-monitoring-report`: 결과 매트릭스 (RBM) 통합
- `gil-office:docx-generator`: DOCX 변환
- `gil-office:pptx-designer`: 발표용 PPT

### Step 5: 제출·후속

- KOICA·EDCF: 한국 정부 검토 (3~9개월)
- UN·WB·ADB: 국제기구 검토
- UZ 정부 동시 합의 (G2G MOU)

## 한·우즈벡 사업 작성 팁

### 강조 포인트

- **한·우즈벡 양국 우호 관계** (1992 외교 수립, 30년+)
- **UZ 한국 K-콘텐츠 인기** (사회 친근감)
- **한국 발전 경험** (UZ 개혁 모델로 적합)
- **현지 한국 기업·KOTRA·KOICA Tashkent 인프라**
- **트릴링구얼** (한국어·러시아어·우즈벡어)

### UZ 정부 우선순위 매핑

```
UZ-2030 Strategy 7대 우선:
1. 디지털 전환 → KOICA·EDCF·KSP 모두
2. 그린 에너지·기후 → EDCF 차관·KSP
3. 보건·교육 → KOICA + EDCF
4. 농업·식품 → KOICA + 민간
5. 인프라 (교통·도시) → EDCF
6. 거버넌스·반부패 → KSP
7. 청년·여성 일자리 → KOICA
```

## 다자 협력 (NEW 트렌드)

### 한국 ODA + WB·ADB 공동

- **WB-Korea Trust Fund** (KEDIF 등)
- **ADB-Korea Trust Fund**
- **Korea-UN Multi-Donor Trust Fund**

장점:
- 자금 규모 ↑
- 국제 표준 준수 (Safeguards)
- UZ 정부 신뢰 ↑
- 다양한 전문성

## 평가 기준 (KOICA·EDCF)

| 영역 | 100점 |
|------|------|
| 사업 적절성 (UZ·SDG·한국 정책) | 30 |
| 사업 효과성 (목표·결과) | 25 |
| 사업 효율성 (비용·시간) | 20 |
| 지속 가능성 | 15 |
| 추진 체계 | 10 |

## 자주 하는 실수

1. UZ 정부 우선순위 X
2. SDG 매핑 X
3. Log Frame 미숙
4. 예산 비현실적
5. UZ 매칭 (Counterpart Contribution) 불명확
6. 환경·사회 영향 무시
7. 선행 사업 중복 미점검
8. 다자 협력 (UN·WB·ADB) 활용 X
9. 한·우즈벡 30년 관계 강조 X
10. 영어 번역 부정확

## 자원·양식

상세 양식은 `references/oda-templates.md`.

| 양식 | 출처 |
|------|------|
| KOICA 사업 제안서 | https://www.koica.go.kr |
| EDCF PCP·F/S | https://edcfkorea.go.kr |
| KSP 제안서 | https://www.ksp.go.kr |
| UNDP Project Doc | UNDP HQ |
| WB PAD | World Bank |
| ADB RRP | ADB |

## 면책

> 본 가이드는 제안서 작성 보조. 최종 신청은 KOICA·EDCF·KSP·UN·WB·ADB 공식 양식·절차 준수 + 한국 정부·UZ 정부 사전 협의 + 등록 컨설턴트 검토 필수.

## 이 스킬을 사용하지 말아야 할 때

- **사업 발굴·기획** → `oda-project-planner`
- **F/S 타당성 조사** → `edcf-feasibility`
- **모니터링·평가** → `oda-monitoring-report`
- **입찰 응대** → `oda-tendering-uz`
- **민간 사업계획서** → `gil-business:strategy-planner`
- **연구비 (NRF·EU)** → `gil-research:grant-writer`
