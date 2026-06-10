# 시각화 모범 사례

> gil-research | research-analysis 참조

## 분석별 권장 시각화

| 분석 | 1순위 | 2순위 |
|------|-------|-------|
| 두 그룹 비교 | Boxplot, Violin | Bar + 95% CI, Strip |
| 다수 그룹 | Boxplot, Violin | Bar |
| 분포 | Histogram, Density | Q-Q plot |
| 상관 | Scatter | Heatmap (다변량) |
| 회귀 | Scatter + 회귀선 + CI | Coefficient plot |
| 시간 추이 | Line | Stacked area |
| 비율 | Stacked bar | Pie (한정적) |
| 분류 | ROC curve, PR curve | Confusion matrix |
| 생존 | Kaplan-Meier curve | Forest plot (HR) |
| ML 해석 | SHAP summary | Feature importance |
| 메타분석 | Forest plot | Funnel plot |
| 다변량 | PCA·t-SNE·UMAP | Heatmap |

## 디자인 원칙

### 단순화
- 한 차트 = 한 메시지
- 데이터 잉크 비율 ↑ (Tufte)
- 불필요한 격자선·3D 제거

### 색상
- Color-blind safe palettes (viridis, ColorBrewer)
- 의미 있는 색상 (빨강 = 위험, 녹색 = 정상)
- 대비 충분 (WCAG AA)

### 라벨·축
- 명확한 축 라벨 + 단위
- 적절한 폰트 크기 (10pt+)
- 범례 명확
- 주석 (annotation)

### 출처·메타데이터
- 데이터 출처
- 표본 크기 (n=...)
- 신뢰구간·오차 막대

## R - ggplot2

```r
library(ggplot2)

# Boxplot + jitter
ggplot(df, aes(x = group, y = score, fill = group)) +
    geom_boxplot(alpha = 0.5) +
    geom_jitter(width = 0.2, alpha = 0.5) +
    scale_fill_brewer(palette = "Set2") +
    labs(title = "Score by Group", x = "Group", y = "Score (0-100)") +
    theme_minimal()

# 회귀
ggplot(df, aes(x = x, y = y)) +
    geom_point(alpha = 0.5) +
    geom_smooth(method = "lm", se = TRUE) +
    labs(title = "Y vs X", x = "X (units)", y = "Y (units)") +
    theme_minimal()

# Forest plot (meta-analysis)
library(meta)
forest(meta_obj, leftcols = c("studlab", "n.e", "mean.e", "sd.e"),
       rightcols = c("effect", "ci"))
```

## Python - matplotlib·seaborn

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 스타일
sns.set_theme(style="whitegrid", palette="Set2")

# Boxplot
fig, ax = plt.subplots(figsize=(8, 6))
sns.boxplot(data=df, x='group', y='score', ax=ax)
sns.stripplot(data=df, x='group', y='score', alpha=0.5, ax=ax)
ax.set_title('Score by Group')
ax.set_xlabel('Group')
ax.set_ylabel('Score (0-100)')
plt.tight_layout()
plt.savefig('boxplot.png', dpi=300)

# Heatmap (상관)
corr = df.corr()
fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0, fmt='.2f', ax=ax)
plt.tight_layout()
```

## 인터랙티브 (R - plotly, Python - plotly)

```python
import plotly.express as px

fig = px.scatter(df, x='x', y='y', color='group',
                 hover_data=['id'], trendline="ols",
                 title='Y vs X by Group')
fig.show()
fig.write_html('scatter.html')
```

## 학술지 그림 표준

| 학술지 | 해상도 | 형식 | 색상 |
|--------|--------|------|------|
| Nature | 300 dpi+ | EPS, AI, PDF (vector) | Color OK |
| Cell | 300 dpi+ | TIFF, EPS | Color OK |
| Lancet | 300 dpi | TIFF, EPS | Color OK |
| NEJM | 300 dpi | EPS, TIFF | 흑백 권장 |
| BMJ | 300 dpi | TIFF, EPS | Color OK |
| KCI 일반 | 300 dpi | TIFF, JPG | Color OK |

## Color-Blind Safe Palettes

R:
- viridis (`viridis` package)
- RColorBrewer: Set2, Dark2, Paired

Python:
- viridis, plasma, magma (matplotlib)
- colorbrewer (seaborn)

## 흔한 실수

1. 3D 차트 (불필요한 차원)
2. 파이 차트 다수 카테고리
3. 잘린 y-축 (오해 유발)
4. 색상 너무 많음
5. 축 라벨 누락
6. 출처 없음
7. 저해상도

## 도구

- R: ggplot2, plotly, ggsurvplot, meta
- Python: matplotlib, seaborn, plotly, lifelines
- BI: Tableau, Power BI
- 학술 그림: Inkscape (vector 편집)
