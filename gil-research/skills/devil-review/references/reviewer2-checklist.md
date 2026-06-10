# Reviewer 2 체크리스트 (가장 까다로운 동료 검토)

> gil-research | devil-review 참조

## 1. 논리·구조 (Logic & Structure)

```
[ ] 연구 질문이 명확한가?
[ ] 가설이 검증 가능한가?
[ ] 방법이 질문에 적합한가?
[ ] 결과가 가설을 입증·기각하는가?
[ ] 논의가 결과로부터 자연스러운가?
[ ] 결론이 데이터를 넘어서지 않는가? (over-interpretation)
[ ] 인용 흐름이 논리적인가?
[ ] 핵심 주장에 빈틈은 없는가?
[ ] 대안 설명·반론을 다루었는가?
[ ] 부정적·null 결과를 솔직하게?
```

## 2. 통계·방법론 (Statistics & Methodology)

```
[ ] 표본 크기 정당화 (사전 power analysis)?
[ ] 가정 점검 (정규성·등분산·독립성)?
[ ] 다중 비교 보정 (Bonferroni·FDR)?
[ ] 효과 크기 + 95% CI 보고?
[ ] p-value만 의존하지 않는가?
[ ] 적합한 검정 사용 (parametric vs 비모수)?
[ ] 결측 데이터 처리 명시?
[ ] 비뚤림 통제 (selection·confounding·measurement)?
[ ] 민감도 분석 (sensitivity analysis)?
[ ] Subgroup 분석의 사전 등록?
[ ] 데이터 변환 정당화 (log·sqrt 등)?
[ ] 모델 가정 점검 (residual·VIF)?
[ ] Cross-validation·robustness 점검?
[ ] 사후 분석 (post-hoc) vs 사전 등록?
```

## 3. 재현성 (Reproducibility)

```
[ ] 데이터 공개 (FAIR·DUA)?
[ ] 코드 공개 (GitHub·Zenodo)?
[ ] 패키지·버전 명시 (sessionInfo·requirements.txt)?
[ ] 시드 고정 (random_state)?
[ ] 사전 등록 (preregistration)?
[ ] 보고 가이드라인 적용 (CONSORT·STROBE·PRISMA·CHEERS·SRQR)?
[ ] 다른 연구자가 결과 복제 가능?
[ ] 분석 단계별 명시?
```

## 4. 인용·문헌 (Citations)

```
[ ] 핵심 선행 연구 인용?
[ ] 자기 인용 과다 X
[ ] 비주류·반대 의견 인용?
[ ] 최신 (3~5년 내) 비율?
[ ] 인용 정확성 (실제 논문 내용과 일치)?
[ ] 인용 형식 일관성?
[ ] Predatory journal 인용 X?
[ ] 핵심 분야 review 인용?
[ ] Reviewer 본인 (또는 본인 추정 학자) 인용 균형?
```

## 5. 윤리·COI (Ethics & Conflicts)

```
[ ] IRB·IACUC 승인 명시?
[ ] 동의서 (informed consent)?
[ ] 환자 익명성·데이터 보호?
[ ] 동물 윤리 (3R: Replace·Reduce·Refine)?
[ ] 이해 충돌 (COI) 명시?
[ ] 저자 기여 (CRediT)?
[ ] Funding 명시·영향?
[ ] 데이터 조작·표절 0?
[ ] 사전 발표·이중 출판 X?
[ ] AI 사용 명시 (있다면)?
```

## 6. 결과 해석 (Interpretation)

```
[ ] 인과 관계 vs 상관 관계 구분?
[ ] 일반화 가능성 (external validity)?
[ ] 한계 (limitations) 솔직하고 충분?
[ ] 양측·대안 해석?
[ ] 임상·실무·정책 함의 정당?
[ ] 향후 연구 방향 구체적?
[ ] 결과를 confirmation bias 없이 해석?
[ ] 효과 크기를 임상적 의미와 함께?
[ ] Subgroup 결과를 신중하게?
```

## 7. 작성·소통 (Writing)

```
[ ] 명료성 (clarity)?
[ ] 학술지 청중 적합?
[ ] 약자·전문 용어 정의?
[ ] 표·그림 설명 self-contained?
[ ] 영어 (또는 학술지 언어) 품질?
[ ] AI 생성 텍스트 티 X?
[ ] 능동태 vs 수동태 일관?
[ ] 단락 길이 적절?
[ ] 섹션 간 흐름 자연?
```

## 8. 학술지 적합도 (Journal Fit)

```
[ ] Aim & Scope 매칭?
[ ] Article Type 일치?
[ ] Word Limit 준수?
[ ] 인용 형식 일치?
[ ] Reference 수 제한?
[ ] 보고 가이드라인 적용?
[ ] Cover Letter·Reviewer 추천 (요구 시)?
[ ] Figure·Table 형식·해상도?
```

## 9. 분야별 특수 (Field-specific)

### 임상 의학
```
[ ] CONSORT 적용
[ ] ClinicalTrials.gov 등록
[ ] 효과 + harms 보고
[ ] 임상 의미 (NNT 등)
[ ] Patient public involvement (PPI)
```

### 역학
```
[ ] STROBE 적용
[ ] 비뚤림 통제
[ ] Confounding adjustment
[ ] DAG 명시
```

### 체계적 고찰·메타분석
```
[ ] PRISMA 2020 적용
[ ] PROSPERO 등록
[ ] 검색 전략 reproducible
[ ] 비뚤림 위험 평가 (RoB 2·ROBINS-I·AMSTAR-2)
[ ] 이질성 (I²) 점검
[ ] Publication bias (funnel·Egger)
[ ] GRADE 증거 등급
```

### 질적 연구
```
[ ] SRQR·COREQ
[ ] Researcher reflexivity
[ ] Member checking
[ ] Audit trail
[ ] Data saturation
[ ] Theoretical framework
```

### ML in Healthcare
```
[ ] TRIPOD-AI / MI-CLAIM
[ ] Train·validation·test split
[ ] External validation
[ ] Calibration
[ ] Fairness·bias
[ ] Explainability (SHAP)
```

### 사회과학
```
[ ] Construct validity
[ ] Measurement invariance
[ ] Effect size + practical significance
[ ] Replication concern
```

## 10. Reviewer 2 시그니처 비판

(시뮬레이션에 활용 — 정중하지만 까다로운)

- "I am concerned that..."
- "The authors fail to acknowledge..."
- "The methodology is fundamentally flawed because..."
- "Have the authors considered...?"
- "This is not novel because..."
- "The conclusions are not supported by the data..."
- "I would like to see additional analyses, including..."
- "The literature review is incomplete; the authors miss..."
- "The statistical approach is questionable; specifically..."
- "I am not convinced by..."
- "Major revisions are required before this can be considered..."

## 종합 평가 매트릭스

```
[ Critical Issues - must fix ]
1. ...
2. ...

[ Major Issues - significant concerns ]
1. ...
2. ...

[ Minor Issues ]
1. ...
2. ...

[ Recommendation ]
○ Reject
○ Major Revision
○ Minor Revision
○ Accept (with edits)

[ Estimated probability of acceptance after revision ]
~XX%
```
