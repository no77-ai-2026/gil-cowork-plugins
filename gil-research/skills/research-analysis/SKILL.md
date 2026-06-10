---
name: research-analysis
description: >
  [한·UZ 듀얼] 통계·데이터 분석 가이드를 제공합니다. '통계 검정 어떤 거 써야 해?', '회귀 분석 도와줘',
  'meta-analysis R 코드', '효과 크기 계산', 'ML 모델 적용', '시각화 추천'이라고 요청하세요.
  parametric/non-parametric·regression·ML·survival·시각화 전반. R·Python·SPSS·STATA 코드 제공.
  분야 무관 범용 (의학·공학·인문·사회·자연과학).
user-invocable: true
version: 1.0.1
---

# 연구 분석 (Research Analysis)

> gil-research | 통계·데이터 분석·시각화 풀 가이드

> **한국 표준 + UZ 듀얼 컨텍스트** — 범용 통계/ML 가이드가 기본이며, UZ 공공데이터(stat.uz)·러시아어 데이터셋·현지 표본 제약을 활용한 분석은 [`references/uz-research-data.md`](references/uz-research-data.md) 참조. (UZ 트리거: "stat.uz 데이터 분석", "UZ 현지 표본 통계")

## 역할

연구 데이터 분석 가이드: 적합 통계 기법 선택·코드 (R·Python·SPSS·STATA)·결과 해석·시각화·재현성.

## 트리거 키워드

통계, 분석, 회귀, regression, t-test, ANOVA, chi-square, 검정, meta-analysis, 효과 크기, effect size,
ML, 머신러닝, 시각화, R 코드, Python 코드, SPSS, STATA, 생존 분석, survival, 베이지안, Bayesian

## 워크플로우

### Step 1: 데이터·연구 질문 확인

```
"분석 목적은?"

(질문 유형)
- 두 그룹 비교? (예: 처치 vs 대조)
- 다수 그룹 비교?
- 변수 간 관계?
- 예측 모델?
- 시간에 따른 변화?
- 분류·군집?
- 인과 추론?
```

### Step 2: 변수 유형 확인

| 종속변수 (DV) | 독립변수 (IV) | 권장 분석 |
|--------------|--------------|----------|
| 연속 | 그룹 (2) | t-test (paired/independent), Mann-Whitney U |
| 연속 | 그룹 (3+) | ANOVA, Kruskal-Wallis |
| 연속 | 연속 | Pearson/Spearman r, Linear Regression |
| 연속 | 다수 (혼합) | Multiple Regression, GLM |
| 이진 | 그룹·연속 | Logistic Regression, Chi-square |
| 다범주 | 다양 | Multinomial Logistic |
| 순서형 | 다양 | Ordinal Regression |
| 시간 (생존) | 다양 | Cox Regression, Kaplan-Meier |
| Count | 다양 | Poisson, Negative Binomial |
| 종단 (반복) | 다양 | Mixed Models, GEE |

상세 선택 트리: `references/statistical-test-selector.md`.

### Step 3: 가정 점검 (Assumptions)

#### Parametric 가정
- 정규성 (Shapiro-Wilk, Kolmogorov-Smirnov, Q-Q plot)
- 등분산성 (Levene's, F-test)
- 독립성
- 선형성 (회귀)
- 다중공선성 (VIF)
- 동일분포 (생존)

#### 위반 시
- 비모수 검정 (Mann-Whitney·Kruskal-Wallis)
- 변환 (log·sqrt·Box-Cox)
- 강건한 추정 (robust SE)
- 부트스트랩

### Step 4: 효과 크기 (Effect Size) — 필수

p-value만 X. 효과 크기 + 신뢰구간 필수.

| 검정 | 효과 크기 | 해석 (small/medium/large) |
|------|----------|--------------------------|
| t-test | Cohen's d | 0.2 / 0.5 / 0.8 |
| ANOVA | η² (eta-squared) | 0.01 / 0.06 / 0.14 |
| 상관 | Pearson r | 0.1 / 0.3 / 0.5 |
| 회귀 | R² | 0.02 / 0.13 / 0.26 |
| Chi-square | Cramer's V | 0.1 / 0.3 / 0.5 |
| 메타분석 | OR, RR, SMD, MD | 분야별 |

상세는 `references/effect-size-guide.md`.

### Step 5: 코드 생성

#### R (가장 범용)

```r
# 데이터 로드
library(tidyverse)
df <- read.csv("data.csv")

# 기술 통계
df %>% group_by(group) %>%
    summarise(mean = mean(score, na.rm = TRUE),
              sd = sd(score, na.rm = TRUE),
              n = n())

# t-test
t.test(score ~ group, data = df, var.equal = FALSE)

# 효과 크기
library(effsize)
cohen.d(score ~ group, data = df)

# ANOVA
aov_model <- aov(score ~ group, data = df)
summary(aov_model)
TukeyHSD(aov_model)

# 회귀
lm_model <- lm(y ~ x1 + x2 + x3, data = df)
summary(lm_model)
confint(lm_model)
library(car)
vif(lm_model)  # 다중공선성

# Logistic
glm_model <- glm(outcome ~ x1 + x2, data = df, family = binomial)
summary(glm_model)
exp(coef(glm_model))  # OR

# 생존 (Cox)
library(survival)
cox_model <- coxph(Surv(time, event) ~ x1 + x2, data = df)
summary(cox_model)

# Mixed Models
library(lme4)
mm <- lmer(y ~ x1 + (1 | subject), data = df)
summary(mm)
```

#### Python (ML 강점)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import statsmodels.api as sm
from sklearn.linear_model import LinearRegression, LogisticRegression

# 데이터
df = pd.read_csv("data.csv")

# 기술 통계
df.groupby('group')['score'].describe()

# t-test
t, p = stats.ttest_ind(df[df.group=='A']['score'], df[df.group=='B']['score'])

# 회귀 (statsmodels)
X = sm.add_constant(df[['x1','x2']])
model = sm.OLS(df['y'], X).fit()
print(model.summary())

# Logistic (sklearn)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression()
model.fit(X_train, y_train)
print(model.score(X_test, y_test))

# ML
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# SHAP 해석
import shap
explainer = shap.TreeExplainer(rf)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test)
```

#### SPSS (사회·의학)

GUI 기반. 핵심 메뉴:
- Analyze → Compare Means → Independent t-test
- Analyze → General Linear Model → Univariate (ANOVA)
- Analyze → Regression → Linear / Logistic
- Analyze → Survival → Kaplan-Meier / Cox

#### STATA (역학·경제)

```stata
* 기술 통계
summarize score, by(group)

* t-test
ttest score, by(group)

* 회귀
regress y x1 x2 x3
estat vif

* Logistic
logit outcome x1 x2
margins, dydx(*)

* 생존
stset time, failure(event)
stcox x1 x2

* Panel data
xtset id year
xtreg y x1 x2, fe
```

상세 코드: `references/r-python-snippets.md`.

### Step 6: 시각화

분석별 권장 시각화:

| 분석 | 시각화 |
|------|--------|
| 두 그룹 비교 | Boxplot, Violin plot, Bar + 95% CI |
| 다수 그룹 | Boxplot, Strip plot |
| 상관 | Scatter plot, Heatmap |
| 회귀 | Scatter + regression line, Coefficient plot |
| 시간 추이 | Line plot, Time series |
| 분포 | Histogram, Density plot |
| 분류 | ROC curve, Confusion matrix |
| 생존 | Kaplan-Meier curve |
| ML 해석 | SHAP plot, Feature importance |
| 메타분석 | Forest plot, Funnel plot |

상세: `references/visualization-best-practices.md`.

### Step 7: 결과 해석·보고

#### APA 7 표준 보고

```
"두 그룹 간 점수 차이는 통계적으로 유의했다,
t(98) = 3.45, p < .001, Cohen's d = 0.71, 95% CI [0.30, 1.12]."
```

#### 의학 (Lancet·NEJM 표준)

```
"개입군(n=150)의 평균은 75.3 (SD 12.5),
대조군(n=148)의 평균은 68.1 (SD 14.2),
mean difference 7.2 (95% CI 4.1 to 10.3, p<0.001)."
```

#### 비유의 결과 (NULL findings)

- "유의하지 않았다"만 X
- 효과 크기 + 신뢰구간 + 검정력 보고
- 검정력 부족 시 명시

### Step 8: 후속 작업

- "결과를 논문에" → `paper-writer`
- "타겟 학술지" → `journal-selection`
- "통계 비판" → `devil-review`
- "시각화 추가" → `gil-data:data-visualizer` (인터랙티브)

## 메타분석 (Meta-Analysis)

```r
# R - meta package
library(meta)

# 효과 크기·SE 입력
meta_obj <- metagen(TE = effect_size,
                    seTE = se,
                    studlab = study_name,
                    data = df,
                    sm = "SMD",  # 또는 "OR", "RR", "MD"
                    method.tau = "REML",
                    random = TRUE)

# 결과
summary(meta_obj)

# Forest plot
forest(meta_obj)

# Funnel plot (publication bias)
funnel(meta_obj)
metabias(meta_obj, method.bias = "Egger")

# 이질성
# I² > 50% 시 무작위 효과 모델, 하위 그룹 분석
```

## 베이지안 (Bayesian) — NEW

전통 빈도주의 vs 베이지안:
- 베이지안: 사전·사후 분포, credible interval
- R: `brms`, `rstanarm`
- Python: `PyMC`

```r
library(brms)
mod <- brm(y ~ x1 + x2, data = df, family = gaussian())
summary(mod)
plot(mod)
```

## ML 통합 (의학·공학·사회과학)

```python
# 분류·회귀 표준 절차
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

# 1. 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# 2. 모델
model = GradientBoostingClassifier(random_state=42)
model.fit(X_train, y_train)

# 3. 평가
print(classification_report(y_test, model.predict(X_test)))

# 4. Cross-validation
cv_scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')
print(f"CV AUC: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# 5. SHAP 해석
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test)
```

## 재현성 (Reproducibility)

```
[ ] 분석 코드 GitHub·Zenodo 공개
[ ] 데이터 공개 (FAIR·DUA 준수)
[ ] 패키지 버전 명시 (sessionInfo, requirements.txt)
[ ] R Markdown / Jupyter Notebook 활용
[ ] 시드 (random_state=42) 고정
[ ] 분석 사전 등록 (preregistration)
```

## 흔한 실수

1. **p-hacking**: 다양한 테스트 후 유의한 것만 보고
2. **다중 비교 보정 X**: Bonferroni·FDR
3. **효과 크기 누락**: p만 보고
4. **가정 점검 X**: 정규성·등분산
5. **표본 크기 사후 정당화**: 사전 power analysis
6. **결과 → 가설 (HARKing)**: 사전 등록
7. **Cherry-picking**: 모든 분석 보고

## 통계 윤리

- 모든 분석 보고 (긍정·부정·null 결과)
- 사전 등록 (가능 시)
- 데이터·코드 공유
- 통계 자문 (복잡 분석)
- 통계학자·역학자 공동 저자 고려

## 이 스킬을 사용하지 말아야 할 때

- **데이터 수집·실험 설계** → `research-methodology`
- **논문 작성** → `paper-writer`
- **시각화 인터랙티브** → `gil-data:data-visualizer`
- **분석 비판적 리뷰** → `devil-review`
- **DB 쿼리** → `gil-data` 플러그인
