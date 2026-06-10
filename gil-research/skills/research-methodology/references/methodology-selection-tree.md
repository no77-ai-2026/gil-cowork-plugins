# 방법론 선택 트리

> gil-research | research-methodology 참조 | 연구 질문 → 방법 매핑

## 1단계: 연구 질문 유형

```
연구 질문이...
├── 무엇을 기술? → Descriptive
│   ├── 양적 → Survey, Cross-sectional
│   └── 질적 → Phenomenology, Ethnography
├── 관계를 탐색? → Exploratory
│   ├── 상관 → Correlational
│   └── 패턴 발견 → Grounded Theory, Cluster Analysis
├── 인과 관계 검증? → Explanatory/Causal
│   ├── 무작위 가능 → RCT, Lab Experiment
│   ├── 무작위 불가 → Quasi-experimental, Observational + Causal Inference
│   └── 메커니즘 → Process tracing, Mediator analysis
├── 미래 예측? → Predictive
│   ├── 통계 → Regression, Time Series
│   └── ML → Supervised Learning
├── 평가? → Evaluative
│   ├── 효과 → RCT, Pre-Post
│   └── 적용 → Implementation Science
└── 종합? → Synthesizing
    ├── 양적 통합 → Meta-analysis
    └── 질적 통합 → Meta-synthesis, Realist review
```

## 2단계: 분야별 권장

| 분야 | 1순위 |
|------|-------|
| 임상의학 | RCT, Systematic Review |
| 역학 | Cohort, Case-control, Cross-sectional |
| 공중보건 | Mixed Methods, Implementation |
| 공학 | Experiment, Simulation, Design Science |
| CS·AI | ML, Benchmark, Empirical |
| 사회학 | Survey, Ethnography, Mixed |
| 심리학 | Experiment, Survey, Longitudinal |
| 교육학 | Quasi-experimental, Action Research |
| 경제학 | Natural Experiment, RDD, DiD, IV |
| 인문학 | Hermeneutic, Historical, Comparative |

## 3단계: 보고 가이드라인 적용

연구 유형 → 가이드라인:

| 유형 | 가이드라인 | URL |
|------|-----------|-----|
| RCT | CONSORT 2010 | consort-statement.org |
| 관찰 (cohort·case-control·cross-sectional) | STROBE | strobe-statement.org |
| 체계적 고찰 | PRISMA 2020 | prisma-statement.org |
| 사례 보고 | CARE | care-statement.org |
| 질적 연구 | SRQR / COREQ | srqr.org |
| 진단 정확도 | STARD 2015 | stard-statement.org |
| 동물 연구 | ARRIVE 2.0 | arriveguidelines.org |
| ML in healthcare | TRIPOD-AI | tripod-statement.org |
| 경제 평가 | CHEERS | cheers-statement.org |
| 행동 개입 | TIDieR | tidierguide.org |

## 4단계: 사전 등록

- AsPredicted: aspredicted.org
- OSF: osf.io
- ClinicalTrials.gov (RCT)
- PROSPERO (체계적 고찰)
- Registered Reports (in advance peer review)

## 흔한 실수

1. 질문 → 방법 X (방법 → 질문 ❌)
2. 단일 방법 고집 (혼합 가능)
3. 사후 가설 (HARKing)
4. 사전 등록 X
5. 보고 가이드라인 무시
