# 통계 검정 선택 가이드

> gil-research | research-analysis 참조

## 두 그룹 비교

| 종속변수 | 짝지음 | 정규성 | 검정 |
|---------|-------|-------|------|
| 연속 | 독립 | O | Independent t-test |
| 연속 | 독립 | X | Mann-Whitney U |
| 연속 | 짝지음 | O | Paired t-test |
| 연속 | 짝지음 | X | Wilcoxon signed-rank |
| 이진 | 독립 | - | Chi-square / Fisher exact |
| 이진 | 짝지음 | - | McNemar |
| 순서형 | 독립 | - | Mann-Whitney U |
| 순서형 | 짝지음 | - | Wilcoxon signed-rank |

## 다수 그룹 (3+)

| 종속변수 | 짝지음 | 정규성 | 검정 |
|---------|-------|-------|------|
| 연속 | 독립 | O | One-way ANOVA |
| 연속 | 독립 | X | Kruskal-Wallis |
| 연속 | 반복 | O | Repeated Measures ANOVA |
| 연속 | 반복 | X | Friedman |
| 범주 | 독립 | - | Chi-square (다중 그룹) |

사후 검정 (post-hoc):
- ANOVA: Tukey HSD, Bonferroni, Scheffé
- Kruskal-Wallis: Dunn, Conover

## 변수 간 관계

| 변수 1 | 변수 2 | 검정 |
|--------|--------|------|
| 연속 | 연속 | Pearson r (정규) / Spearman ρ (비정규·순서) |
| 이진 | 연속 | Point-biserial r |
| 범주 | 범주 | Chi-square / Cramer's V |
| 순서형 | 순서형 | Spearman ρ / Kendall τ |

## 회귀 분석

| 종속변수 | 모델 |
|---------|------|
| 연속 | Linear Regression (OLS) |
| 이진 | Logistic Regression |
| 다범주 | Multinomial Logistic Regression |
| 순서형 | Ordinal Logistic Regression |
| Count | Poisson / Negative Binomial |
| 시간 (생존) | Cox Proportional Hazards |
| 종단 | Mixed Models / GEE |

## 다변량

- MANOVA (다종속변수)
- 요인 분석 (Factor Analysis)
- 주성분 분석 (PCA)
- 군집 분석 (Cluster Analysis)
- 판별 분석 (Discriminant)
- 구조방정식 (SEM)

## 비모수 대응표

| 모수 | 비모수 |
|------|--------|
| Independent t-test | Mann-Whitney U |
| Paired t-test | Wilcoxon signed-rank |
| One-way ANOVA | Kruskal-Wallis |
| Repeated ANOVA | Friedman |
| Pearson r | Spearman ρ |
| Linear Regression | Quantile / Robust |

## 가정 점검

- 정규성: Shapiro-Wilk (n<50), KS (n≥50), Q-Q plot
- 등분산: Levene's, Bartlett, F
- 독립성: 연구 설계 / Durbin-Watson
- 다중공선성: VIF (>10 위험), 상관 행렬
- 선형성: 산점도

## 효과 크기

| 검정 | 효과 크기 | 작/중/큰 |
|------|----------|---------|
| t-test | Cohen's d | 0.2/0.5/0.8 |
| ANOVA | η² (eta) | 0.01/0.06/0.14 |
| 상관 | Pearson r | 0.1/0.3/0.5 |
| 회귀 | R²·f² | 0.02/0.13/0.26 (f²) |
| 카이제곱 | Cramer's V | 0.1/0.3/0.5 |
| Logistic | OR | <1, 1-2, 2-5, >5 |
| 메타분석 | SMD/MD/OR/RR | 분야별 |

## p-value vs 효과 크기

p < 0.05 = "통계적 유의" ≠ "실용적 의미"

큰 표본 → 작은 효과도 유의 (의미 X 가능)
작은 표본 → 큰 효과도 비유의 (검정력 부족)

→ p + 효과 크기 + 95% CI 모두 보고
