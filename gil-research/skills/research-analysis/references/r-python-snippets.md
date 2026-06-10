# R·Python·STATA 분석 코드 스니펫

> gil-research | research-analysis 참조

## R 스니펫

### 데이터 로드·정리
```r
library(tidyverse)
library(haven)  # SPSS, STATA, SAS

df <- read_csv("data.csv")
df <- read_sav("data.sav")  # SPSS
df <- read_dta("data.dta")  # STATA

# 기술 통계
df %>% summary()
df %>% group_by(group) %>% summarise(across(where(is.numeric), list(mean = mean, sd = sd), na.rm = TRUE))

# 결측 처리
df_clean <- df %>% drop_na()
df_imputed <- df %>% mutate(across(where(is.numeric), ~replace_na(., median(., na.rm = TRUE))))
```

### t-test·ANOVA
```r
# t-test
t_result <- t.test(score ~ group, data = df, var.equal = FALSE)
library(effsize)
d_result <- cohen.d(score ~ group, data = df)

# Paired t-test
t.test(df$pre, df$post, paired = TRUE)

# ANOVA
aov_model <- aov(score ~ group, data = df)
summary(aov_model)
TukeyHSD(aov_model)

# Repeated ANOVA
library(ez)
ezANOVA(data = df, dv = score, wid = id, within = time)
```

### 회귀
```r
# Linear
lm_model <- lm(y ~ x1 + x2 + x3, data = df)
summary(lm_model)
confint(lm_model)
library(car)
vif(lm_model)
plot(lm_model)  # Residual diagnostics

# Logistic
glm_model <- glm(outcome ~ x1 + x2, data = df, family = binomial)
summary(glm_model)
exp(coef(glm_model))
exp(confint(glm_model))

# Mixed Models
library(lme4)
mm <- lmer(y ~ x1 + (1 | subject), data = df)
library(lmerTest)
mm <- lmer(y ~ x1 + (1 | subject), data = df)
summary(mm)
anova(mm)
```

### 생존 분석
```r
library(survival)
library(survminer)

# Kaplan-Meier
fit <- survfit(Surv(time, event) ~ group, data = df)
ggsurvplot(fit, pval = TRUE, risk.table = TRUE)

# Cox Regression
cox_model <- coxph(Surv(time, event) ~ x1 + x2 + x3, data = df)
summary(cox_model)
ggforest(cox_model)
```

### Meta-Analysis
```r
library(meta)

meta_obj <- metagen(TE = effect, seTE = se, studlab = study,
                    data = df, sm = "SMD", method.tau = "REML")
summary(meta_obj)
forest(meta_obj)
funnel(meta_obj)
metabias(meta_obj, method.bias = "Egger")
```

### Bayesian
```r
library(brms)
mod <- brm(y ~ x1 + x2, data = df, family = gaussian(),
           chains = 4, iter = 2000, cores = 4)
summary(mod)
plot(mod)
```

## Python 스니펫

### 데이터·기술 통계
```python
import pandas as pd
import numpy as np
from scipy import stats

df = pd.read_csv("data.csv")
df.describe()
df.groupby('group').agg({'score': ['mean', 'std', 'count']})
```

### t-test·ANOVA
```python
# t-test
t, p = stats.ttest_ind(df[df.group=='A']['score'], df[df.group=='B']['score'])

# Paired
t, p = stats.ttest_rel(df['pre'], df['post'])

# ANOVA
f, p = stats.f_oneway(group1, group2, group3)

# Tukey post-hoc
from statsmodels.stats.multicomp import pairwise_tukeyhsd
tukey = pairwise_tukeyhsd(df['score'], df['group'])
```

### 회귀
```python
import statsmodels.api as sm

# Linear
X = sm.add_constant(df[['x1', 'x2']])
model = sm.OLS(df['y'], X).fit()
print(model.summary())

# Logistic
model = sm.Logit(df['outcome'], X).fit()
print(model.summary())
print(np.exp(model.params))  # OR

# Mixed
import statsmodels.formula.api as smf
mm = smf.mixedlm("y ~ x1", df, groups=df['subject']).fit()
print(mm.summary())
```

### 생존
```python
from lifelines import KaplanMeierFitter, CoxPHFitter

# KM
kmf = KaplanMeierFitter()
kmf.fit(df['time'], df['event'])
kmf.plot_survival_function()

# Cox
cph = CoxPHFitter()
cph.fit(df, duration_col='time', event_col='event')
cph.print_summary()
```

### ML
```python
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
import shap

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))
print(f"AUC: {roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]):.3f}")

# SHAP
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
shap.summary_plot(shap_values, X_test)
```

## STATA

```stata
* 데이터
import delimited "data.csv", clear

* 기술
summarize score, by(group)

* t-test
ttest score, by(group)

* ANOVA
oneway score group, tabulate

* 회귀
regress y x1 x2 x3
estat vif

* Logistic
logit outcome x1 x2
margins, dydx(*)

* 생존
stset time, failure(event)
sts graph, by(group)
stcox x1 x2 x3

* Panel
xtset id year
xtreg y x1 x2, fe
```

## SPSS (GUI)

- Analyze → Compare Means → Independent t / Paired t / One-way ANOVA
- Analyze → Regression → Linear / Binary Logistic
- Analyze → Survival → Kaplan-Meier / Cox
- Graphs → Chart Builder

## 재현성 패키지 관리

R: `renv` (lock file)
Python: `requirements.txt`, `poetry`, `conda env export`
STATA: `version` 명령으로 호환성

## 시드 고정

```r
set.seed(42)
```
```python
import random, numpy as np
random.seed(42)
np.random.seed(42)
torch.manual_seed(42)  # PyTorch
```
