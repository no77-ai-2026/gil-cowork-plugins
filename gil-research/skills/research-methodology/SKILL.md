---
name: research-methodology
description: >
  [한·UZ 듀얼] 연구 질문에 적합한 최신 연구 방법론을 추천·설계합니다. AI 보조 연구의 인간-in-the-loop 무결성 원칙 포함.
  '어떤 방법론이 적합해?', 'RCT 설계해줘', 'systematic review 가이드',
  'meta-analysis 방법', 'mixed methods 설계', '연구 방법론 추천'이라고 요청하세요.
  RCT·systematic review·meta-analysis·mixed methods·causal inference·ML in research·
  qualitative coding·delphi·case study 등 분야 무관 범용 지원.
user-invocable: true
version: 1.0.1
---

# 연구 방법론 (Research Methodology)

> gil-research | 분야 무관 최신 연구 방법론 적용

> **한국 표준 + UZ 듀얼 컨텍스트** — 국제 표준 방법론이 기본이며, UZ 현지 필드 제약·IRB·트릴링구얼(한·러·우즈벡) 설문 설계는 [`references/uz-field-context.md`](references/uz-field-context.md) 참조. (UZ 트리거: "UZ 현지 필드 연구 설계", "트릴링구얼 설문")

## 역할

연구 질문 → 적합한 방법론 추천·설계. 의학·공학·자연과학·사회과학·인문학 분야 무관 사용 가능. 2026년 최신 트렌드 (causal inference, AI/ML in research, preregistration, open science) 반영.

## 트리거 키워드

연구 방법, 방법론, RCT, 무작위 대조 시험, systematic review, 체계적 문헌 고찰, meta-analysis, 메타분석,
mixed methods, qualitative, 질적 연구, causal inference, 인과 추론, ML 연구, AI 연구,
preregistration, 사전 등록, open science

## 워크플로우

### Step 1: 연구 질문 유형 판별

```
"연구 질문이 무엇입니까?"

(소크라테스식 질문)
- 어떤 현상을 설명·예측·이해·기술하려는가?
- 새로운 이론을 만들거나 기존 이론을 검증하는가?
- 인과 관계 vs 상관 관계?
- 일반화 vs 사례 깊이?
```

질문 유형 → 방법론 매핑은 `references/methodology-selection-tree.md`.

### Step 2: 방법론 카테고리 선택

```
"방법론 카테고리는?"

○ 양적 (Quantitative): 통계·실험·관찰
○ 질적 (Qualitative): 인터뷰·관찰·문서 분석
○ 혼합 (Mixed Methods): 양적 + 질적
○ 종설 (Review): 문헌 고찰·메타분석
○ 이론 연구 (Theoretical): 모델링·시뮬레이션
○ 사례 연구 (Case Study): 단일·다중 사례
○ 디자인·개발 (Design Science): 인공물 개발
+ Other
```

### Step 3: 분야별 가이드라인 적용

| 분야 | 가이드라인 | 비고 |
|------|----------|------|
| 임상 RCT | CONSORT 2010 | 의학 표준 |
| 관찰 연구 | STROBE | 역학·공중보건 |
| 체계적 고찰 | PRISMA 2020 | 모든 분야 |
| 사례 보고 | CARE | 임상 사례 |
| 질적 연구 | SRQR, COREQ | 의학·간호·사회 |
| 진단 정확도 | STARD | 의학 |
| 동물 연구 | ARRIVE 2.0 | 생명과학 |
| 모델링 | TRIPOD, MISTIK | ML in healthcare |
| 경제 평가 | CHEERS | 보건경제 |
| 행동·개입 | TIDieR | 모든 분야 |

### Step 4: 방법 상세 설계

선택된 방법론별 풀 설계:

#### RCT (Randomized Controlled Trial)
- 연구 질문 (PICO·PICOS·PECO)
- 무작위 배정 방법 (block, stratified, cluster)
- 눈가림 (blinding)
- 1차·2차 결과
- 표본 크기 계산 (G*Power 등)
- 의도 분석 vs Per-protocol
- 사전 등록 (ClinicalTrials.gov, OSF)

#### Systematic Review + Meta-Analysis
- 연구 질문 (PICO)
- 검색 전략 (Boolean, MeSH·Emtree)
- 데이터베이스 선정 (PubMed·Embase·Cochrane·Web of Science)
- 포함·배제 기준
- 데이터 추출 양식
- 비뚤림 위험 평가 (RoB 2, ROBINS-I, AMSTAR-2)
- 메타분석 (random·fixed effects, I², heterogeneity)
- GRADE 증거 등급
- PRISMA 흐름도

#### Mixed Methods
- 디자인 (Convergent, Explanatory Sequential, Exploratory Sequential)
- 양적·질적 통합 시점·방법 (Joint Display)
- 메타 추론 (meta-inference)

#### Qualitative
- 접근 (현상학·근거이론·내러티브·민족지·사례)
- 표본 (목적·이론·최대 변이·snowball)
- 자료 수집 (인터뷰·FGD·관찰·문서)
- 코딩 (open·axial·selective, thematic, framework)
- 도구 (NVivo, ATLAS.ti, MAXQDA)
- 신뢰도 (member checking, peer debriefing, audit trail)

#### Causal Inference (NEW 트렌드)
- DAG (Directed Acyclic Graph)
- Instrumental Variables (IV)
- Difference-in-Differences (DiD)
- Regression Discontinuity Design (RDD)
- Propensity Score Matching (PSM)
- Synthetic Control
- Mendelian Randomization (의학)

#### ML in Research (NEW 트렌드)
- Supervised: classification·regression
- Unsupervised: clustering·PCA·UMAP
- Deep Learning: CNN·RNN·Transformer
- Explainable AI (SHAP·LIME)
- 검증 (cross-validation, train/test split)
- TRIPOD-AI, MI-CLAIM 보고 가이드라인

### Step 5: 사전 등록·윤리 (Preregistration & Ethics)

#### Preregistration
- AsPredicted (간단)
- OSF (full)
- ClinicalTrials.gov (의학 RCT)
- PROSPERO (체계적 고찰)
- 사전 등록 시 Reviewer 신뢰도 ↑

#### IRB·IACUC
- 인간 연구: IRB 필수
- 동물 연구: IACUC 필수
- 사전 검토 + 정기 갱신

#### Open Science
- Open Data (FAIR 원칙)
- Open Code (GitHub·Zenodo)
- Open Materials
- Open Access (Gold·Green·Diamond OA)

### Step 6: 후속 작업 제안

- "통계 분석·코드" → `research-analysis`
- "논문 작성" → `paper-writer`
- "타겟 학술지" → `journal-selection`
- "Devil's review" → `devil-review`
- "선행 연구 검색" → `paper-search`

## 2026 최신 트렌드 (선택)

상세는 `references/latest-trends-2026.md`.

- **Causal Inference**: 인과 추론 (관찰 데이터에서)
- **AI/ML in Research**: 머신러닝 통합
- **Preregistration**: 사전 등록 표준화
- **Open Science**: FAIR·CARE 원칙
- **Living Reviews**: 실시간 업데이트되는 systematic reviews
- **Network Meta-Analysis**: 다수 처치 비교
- **Patient and Public Involvement (PPI)**: 환자 참여 연구
- **Reproducibility Crisis 대응**: 등록·OA·코드 공유

## 분야별 권장 방법

| 분야 | 인기 방법 |
|------|----------|
| 의학·임상 | RCT, systematic review·meta-analysis, observational, real-world evidence |
| 공중보건·역학 | STROBE 관찰, ecological, time-series |
| 공학 | 실험, 시뮬레이션, design science, case study |
| 자연과학 | 실험, observational, modeling |
| 사회과학 | survey, longitudinal, mixed methods, qualitative |
| 심리학 | experimental, survey, qualitative, neuroimaging |
| 경제학 | natural experiments, RDD, DiD, IV, structural |
| 교육학 | quasi-experimental, design-based research, mixed methods |
| 인문학 | textual analysis, hermeneutic, historical, comparative |
| 법학 | doctrinal, comparative, empirical legal studies |

## 윤리·재현성 체크리스트

```
[ ] 연구 질문 명확
[ ] 사전 등록 (해당 시)
[ ] IRB·IACUC 승인
[ ] 표본 크기 정당화 (power analysis)
[ ] 비뚤림 통제
[ ] 데이터 관리 계획 (DMP)
[ ] 코드·데이터 공개 계획
[ ] 이해 충돌 명시
[ ] 환자 참여 (해당 시)
[ ] 보고 가이드라인 적용 (CONSORT·STROBE·PRISMA 등)
```

## 방법론 미니 체크: "PICO"

대부분의 임상·중재 연구 질문에 적용:
- **P**opulation (대상자)
- **I**ntervention (처치)
- **C**omparator (비교)
- **O**utcome (결과)

확장: PICOS (Study design), PICO + T (Time).

## AI 보조 연구 — 인간 in-the-loop 무결성

AI를 연구에 활용할 때, 완전 자동화보다 **사람이 판단을 책임지고 AI가 grunt work를 돕는** 구조가 알려진 실패 유형(결과 환각·방법론 조작·인용 환각·지름길 의존)을 더 잘 피합니다. 방법론 설계 단계에서 다음을 명시하세요.

- **검증 책임 분리** — 질문 정의·방법 선택·결과 해석은 사람이 최종 판단. AI는 문헌 탐색·형식·정합성 점검 보조.
- **출처 검증 절차** — 인용·데이터는 1차 출처 대조(예: 시맨틱 스칼라/Crossref 교차 확인), 학습-평가 데이터 분리(anti-leakage), 성능 주장은 추세·재현으로 뒷받침.
- **무결성 게이트 연계** — 초안·분석 산출 직후 `gil-research:devil-review`의 AI 연구 무결성 게이트 + 인용 충실성 점검을 통과시킨다.

(이 원칙은 AI 연구 자동화·인용 환각 관련 공개 연구에서 널리 논의된 개념을 일반화한 것으로, 구체 논문 인용은 본 스킬 외부에서 검증 후 사용하십시오.)

## 자원

## 자원

- Cochrane Handbook (체계적 고찰)
- EQUATOR Network (보고 가이드라인)
- NIH Methods Resources
- OSF (사전 등록)
- ClinicalTrials.gov (RCT 등록)
- PROSPERO (체계적 고찰 등록)

## 체이닝 (연구 파이프라인)

```
research-methodology  (본 스킬: 방법론 설계·무결성 원칙)
  → gil-research:research-analysis  (통계·데이터 분석; UZ 데이터는 uz-research-data 참조)
  → gil-research:paper-writer  (본문 집필)
  → gil-research:devil-review  (무결성 게이트·인용 충실성 점검)
  → gil-research:journal-selection / journal-style-adapter  (투고)
```

UZ 현지 데이터·설문은 `gil-data:public-data`(stat.uz 등)와, 정책·법령은 `gil-legal`과 연계. 트릴링구얼 설문은 `references/uz-field-context.md`.

## 이 스킬을 사용하지 말아야 할 때

- **통계 분석 코드** → `research-analysis`
- **논문 작성** → `paper-writer`
- **학술지 선정** → `journal-selection`
- **연구비 신청** → `grant-writer`
- **방법 비판적 리뷰** → `devil-review`
