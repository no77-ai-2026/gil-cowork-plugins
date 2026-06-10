# 2026 연구 방법론 최신 트렌드

> gil-research | research-methodology 참조

## 1. Causal Inference (인과 추론)

관찰 데이터에서 인과 관계 추정:
- DAG (Directed Acyclic Graph) — Judea Pearl
- IV (Instrumental Variables)
- DiD (Difference-in-Differences)
- RDD (Regression Discontinuity Design)
- PSM (Propensity Score Matching)
- Synthetic Control Method
- Mendelian Randomization (의학)

도구:
- R: `dagitty`, `MatchIt`, `Synth`
- Python: `dowhy`, `EconML`
- STATA: `teffects`, `psmatch2`

## 2. AI/ML in Research

- Supervised: 분류·회귀
- Unsupervised: 클러스터·차원 축소
- Deep Learning: CNN·RNN·Transformer
- LLM in research (GPT·Claude·Llama)
- Explainable AI (SHAP·LIME)

가이드라인:
- TRIPOD-AI (예측 모델)
- MI-CLAIM (의학 ML)
- CONSORT-AI (AI 개입 RCT)
- SPIRIT-AI (AI 개입 프로토콜)

## 3. Preregistration

사전 가설·방법 등록:
- AsPredicted (간단)
- OSF Registries (full)
- Registered Reports (사전 동료 검토)
- ClinicalTrials.gov (RCT)
- PROSPERO (체계적 고찰)

장점:
- HARKing 방지
- 출판 편향 ↓
- 신뢰도 ↑
- Reviewer 평가 ↑

## 4. Open Science

FAIR 원칙:
- **F**indable
- **A**ccessible
- **I**nteroperable
- **R**eusable

CARE 원칙 (원주민 데이터):
- **C**ollective Benefit
- **A**uthority to Control
- **R**esponsibility
- **E**thics

도구:
- OSF (Open Science Framework)
- GitHub·Zenodo (코드·데이터)
- Plan S (EU OA 의무)

## 5. Living Reviews

실시간 업데이트 systematic reviews:
- 최신 연구 자동 통합
- COVID-19 living reviews 표준화
- Cochrane Living Reviews

## 6. Network Meta-Analysis

다수 처치 동시 비교:
- 직접·간접 비교 통합
- R: `netmeta`, `gemtc`
- 의학에서 표준 (NICE·HTA)

## 7. Patient and Public Involvement (PPI)

연구 설계·실행에 환자·일반인 참여:
- BMJ·NIHR 표준
- 연구비 신청 시 필수 (EU·UK)
- INVOLVE 가이드라인

## 8. Reproducibility Crisis 대응

- 사전 등록
- 데이터·코드 공개
- 재현 시도 (Many Labs Project)
- p-hacking·HARKing 회피
- Many Analysts 프로젝트

## 9. Bayesian Statistics

- Frequentist 한계 (p-value 오용)
- Bayes Factor·Credible Interval
- Stan·brms (R)·PyMC (Python)

## 10. Mixed Methods Evolution

- Convergent
- Explanatory Sequential
- Exploratory Sequential
- Multistage
- Joint Display로 통합 시각화

## 11. Implementation Science

- 효과 검증 → 실세계 적용
- RE-AIM (Reach·Effectiveness·Adoption·Implementation·Maintenance)
- CFIR (Consolidated Framework for Implementation Research)

## 12. Real-World Evidence (RWE)

전통 RCT 보완:
- 의무 보험 청구 데이터
- EMR (Electronic Medical Records)
- Wearable·디지털 헬스 데이터
- FDA·EMA 점차 인정

## 13. ChatGPT·LLM in Research Workflow

활용:
- 문헌 요약·번역
- 코드 작성
- 데이터 정리
- 초안 작성

주의:
- 사실 검증 필수
- 인용 정확성
- 표절·자기 표절
- 저자 자격 X (AI는 저자 X)
- Acknowledgment에 명시

## 14. Equity·Diversity·Inclusion (EDI)

- 다양한 인구 표본 포함
- 성별·인종·소수민족 분석
- Health equity 연구
- 인종·성별 코딩 (NIH·EU 권장)

## 15. Climate-Conscious Research

- 환경 영향 ↓ (출장·실험)
- Sustainable lab practices
- Carbon footprint 보고

## 적용 우선순위

1. 사전 등록 (모든 분야)
2. 보고 가이드라인 적용
3. 데이터·코드 공개
4. 효과 크기 + CI 보고
5. 다양성 표본
6. 환자·시민 참여 (해당 시)
