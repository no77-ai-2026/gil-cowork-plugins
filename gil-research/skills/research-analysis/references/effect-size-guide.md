# 효과 크기 (Effect Size) 가이드

> gil-research | research-analysis 참조

## 왜 효과 크기?

p-value: 통계적 유의성 (표본 크기에 민감)
효과 크기: 실용적 의미 (표본 무관)

→ 둘 다 보고 + 신뢰구간 (95% CI)

## 검정별 효과 크기

### t-test, ANOVA → Cohen's d, η²

```
Cohen's d = (M₁ - M₂) / SD_pooled
- 0.2: small
- 0.5: medium
- 0.8: large

η² (Eta-squared) = SS_between / SS_total
- 0.01: small
- 0.06: medium
- 0.14: large

Partial η² (다요인 ANOVA에서)
ω² (덜 편향, 권장)
```

### 상관 → Pearson r, Spearman ρ

```
- 0.10: small
- 0.30: medium
- 0.50: large
- 0.70+: very large
```

### 회귀 → R², f²

```
R² = 설명된 분산 비율
f² = R² / (1 - R²)
- f² 0.02: small
- f² 0.15: medium
- f² 0.35: large
```

### Logistic → Odds Ratio (OR)

```
OR < 1: 음의 효과
OR = 1: 효과 없음
OR > 1: 양의 효과
- OR 1.5: small
- OR 2.5: medium
- OR 4.3: large
```

### Risk Ratio (RR), Hazard Ratio (HR) - 의학

```
RR/HR = 1: 효과 없음
RR/HR > 1: 위험 ↑
RR/HR < 1: 위험 ↓ (보호 효과)
```

### Chi-square → Cramer's V, φ

```
2x2: φ
다범주: Cramer's V
- 0.10: small
- 0.30: medium
- 0.50: large
```

### Meta-Analysis → SMD, MD, OR, RR, HR

- SMD (Standardized Mean Difference): 다른 척도 통합
- MD (Mean Difference): 동일 척도
- OR/RR: 이진 결과
- HR: 시간 결과

## 신뢰구간 (95% CI)

효과 크기 + 95% CI 함께 보고:

```
"개입군은 대조군보다 점수가 5.3점 높았다 (95% CI 2.1 to 8.5),
Cohen's d = 0.65 (95% CI 0.30 to 1.00)."
```

## 실용적 의미 (Clinical/Practical Significance)

통계적 유의 ≠ 임상적 유의:

- MCID (Minimum Clinically Important Difference): 분야별 정의
- NNT (Number Needed to Treat): 1명 효과를 위해 치료할 환자 수

## 효과 크기 계산 도구

R:
```r
library(effectsize)
cohens_d(score ~ group, data = df)
eta_squared(aov_model)
omega_squared(aov_model)
```

Python:
```python
from scipy.stats import t
import numpy as np

def cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    pooled_sd = np.sqrt(((n1-1)*np.var(group1, ddof=1) + (n2-1)*np.var(group2, ddof=1)) / (n1+n2-2))
    return (np.mean(group1) - np.mean(group2)) / pooled_sd
```

온라인:
- https://www.psychometrica.de/effect_size.html
- G*Power (사전·사후 power analysis)

## 검정력 분석 (Power Analysis)

사전 (a priori): 효과 크기·α·β → n 결정
사후 (post-hoc): 권장 X (논란)

```r
library(pwr)
pwr.t.test(d = 0.5, sig.level = 0.05, power = 0.80)  # → n 계산
```

## 보고 표준

```
"두 그룹 간 차이는 통계적으로 유의했다,
t(98) = 3.45, p < .001, Cohen's d = 0.71, 95% CI [0.30, 1.12].
이 효과는 medium-to-large로, 임상적으로 의미 있는 차이로 해석된다."
```

## 흔한 실수

1. p만 보고
2. 효과 크기 누락
3. 95% CI 없음
4. 임상 의미 미해석
5. 다중 비교 보정 X
