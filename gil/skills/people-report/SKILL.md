---
name: people-report
description: |
  인사 리포트 — 헤드카운트·이직률·조직 건강 지표 보고서를 생성합니다 트리거: "헤드카운트 리포트", "이직률 분석해줘", "조직 현황 보고서"
version: "2.5.0"
uz: references/uz-people-report.md
origin: anthropics/knowledge-work-plugins@2cf4294 (human-resources/people-report, Apache-2.0)
---

# people-report

## 스킬 개요(상세)

인사 리포트 — 헤드카운트·이직률·조직 건강 지표 보고서를 생성합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 다양성 지표는 한국 실무 맥락(고령자·장애인 고용 의무 등)으로 재구성.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 현지 채용 비율(로컬라이제이션)·급여 통화 구성을 지표에 추가. 상세는 `references/uz-people-report.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: human-resources/people-report -->
# /people-report

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Generate people analytics reports from your HR data. Analyze workforce data to surface trends, risks, and opportunities.

## Usage

```
/people-report $ARGUMENTS
```

## Report Types

**Headcount**: Current org snapshot — by team, location, level, tenure
**Attrition**: Turnover analysis — voluntary/involuntary, by team, trends
**Diversity**: Representation metrics — by level, team, pipeline
**Org Health**: Span of control, management layers, team sizes, flight risk

## Key Metrics

### Retention
- Overall attrition rate (voluntary + involuntary)
- Regrettable attrition rate
- Average tenure
- Flight risk indicators

### Diversity
- Representation by level, team, and function
- Pipeline diversity (hiring funnel by demographic)
- Promotion rates by group
- Pay equity analysis

### Engagement
- Survey scores and trends
- eNPS (Employee Net Promoter Score)
- Participation rates
- Open-ended feedback themes

### Productivity
- Revenue per employee
- Span of control efficiency
- Time to productivity for new hires

## Approach

1. Understand what question they're trying to answer
2. Identify the right data (upload, paste, or pull from ~~HRIS)
3. Analyze with appropriate statistical methods
4. Present findings with context and caveats
5. Recommend specific actions based on data

## What I Need From You

Upload a CSV or describe your data. Helpful fields:
- Employee name/ID, department, team
- Title, level, location
- Start date, end date (if applicable)
- Manager, compensation (if relevant)
- Demographics (for diversity reports, if available)

## Output

```markdown
## People Report: [Type] — [Date]

### Executive Summary
[2-3 key takeaways]

### Key Metrics
| Metric | Value | Trend |
|--------|-------|-------|
| [Metric] | [Value] | [up/down/flat] |

### Detailed Analysis
[Charts, tables, and narrative for the specific report type]

### Recommendations
- [Data-driven recommendation]
- [Action item]

### Methodology
[How the numbers were calculated, any caveats]
```

## If Connectors Available

If **~~HRIS** is connected:
- Pull live employee data — headcount, tenure, department, level
- Generate reports without needing a CSV upload

If **~~chat** is connected:
- Offer to share the report summary in a relevant channel

