---
name: pipeline-review
description: |
  파이프라인 건강 점검 — 딜 우선순위·리스크 플래그·주간 액션 플랜을 만듭니다 트리거: "파이프라인 리뷰", "딜 상태 점검해줘", "이번 주 영업 액션 플랜"
version: "2.5.0"
uz: references/uz-pipeline-review.md
origin: anthropics/knowledge-work-plugins@2cf4294 (sales/pipeline-review, Apache-2.0)
---

# pipeline-review

> **타 번들 연계**: 본 문서의 `gil-creative:*`·`gil-commerce:*` 참조는 해당 번들이 설치된 경우에만 체이닝합니다. 미설치 시 해당 단계를 생략하고 코어 스킬만으로 진행합니다.


## 스킬 개요(상세)

파이프라인 건강 점검 — 딜 우선순위·리스크 플래그·주간 액션 플랜을 만듭니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [경계] 소상공인 리드 분류는 gil-commerce:lead-triage — 이 스킬은 B2B 딜 파이프라인.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 정부·공공 딜의 긴 결재 체인(부처 협의) 단계를 스테이지 모델에 반영. 상세는 `references/uz-pipeline-review.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: sales/pipeline-review -->
# /pipeline-review

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Analyze your pipeline health, prioritize deals, and get actionable recommendations for where to focus.

## Usage

```
/pipeline-review [segment or rep]
```

Review pipeline for: $ARGUMENTS

If a file is referenced: @$1

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     PIPELINE REVIEW                              │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                       │
│  ✓ Upload CSV export from your CRM                              │
│  ✓ Or paste/describe your deals                                 │
│  ✓ Health check: flag stale, stuck, and at-risk deals          │
│  ✓ Prioritization: rank deals by impact and closability        │
│  ✓ Hygiene audit: missing data, bad close dates, single-thread │
│  ✓ Weekly action plan: what to focus on                        │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + CRM: Pull pipeline automatically, update records             │
│  + Activity data for engagement scoring                         │
│  + Historical patterns for risk prediction                      │
│  + Calendar: See upcoming meetings per deal                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

**Option A: Upload a CSV**
Export your pipeline from your CRM (e.g. Salesforce, HubSpot). Helpful fields:
- Deal/Opportunity name
- Account name
- Amount
- Stage
- Close date
- Created date
- Last activity date
- Owner (if reviewing a team)
- Primary contact

**Option B: Paste your deals**
```
Acme Corp - $50K - Negotiation - closes Jan 31 - last activity Jan 20
TechStart - $25K - Demo scheduled - closes Feb 15 - no activity in 3 weeks
BigCo - $100K - Discovery - closes Mar 30 - created last week
```

**Option C: Describe your pipeline**
"I have 12 deals. Two big ones in negotiation that I'm confident about. Three stuck in discovery for over a month. The rest are mid-stage but I haven't talked to some of them in a while."

---

## Output

```markdown
# Pipeline Review: [Date]

**Data Source:** [CSV upload / Manual input / CRM]
**Deals Analyzed:** [X]
**Total Pipeline Value:** $[X]

---

## Pipeline Health Score: [X/100]

| Dimension | Score | Issue |
|-----------|-------|-------|
| **Stage Progression** | [X]/25 | [X] deals stuck in same stage 30+ days |
| **Activity Recency** | [X]/25 | [X] deals with no activity in 14+ days |
| **Close Date Accuracy** | [X]/25 | [X] deals with close date in past |
| **Contact Coverage** | [X]/25 | [X] deals single-threaded |

---

## Priority Actions This Week

### 1. [Highest Priority Deal]
**Why:** [Reason — large, closing soon, at risk, etc.]
**Action:** [Specific next step]
**Impact:** $[X] if you close it

### 2. [Second Priority]
**Why:** [Reason]
**Action:** [Next step]

### 3. [Third Priority]
**Why:** [Reason]
**Action:** [Next step]

---

## Deal Prioritization Matrix

### Close This Week (Focus Time Here)
| Deal | Amount | Stage | Close Date | Next Action |
|------|--------|-------|------------|-------------|
| [Deal] | $[X] | [Stage] | [Date] | [Action] |

### Close This Month (Keep Warm)
| Deal | Amount | Stage | Close Date | Status |
|------|--------|-------|------------|--------|
| [Deal] | $[X] | [Stage] | [Date] | [Status] |

### Nurture (Check-in Periodically)
| Deal | Amount | Stage | Close Date | Status |
|------|--------|-------|------------|--------|
| [Deal] | $[X] | [Stage] | [Date] | [Status] |

---

## Risk Flags

### Stale Deals (No Activity 14+ Days)
| Deal | Amount | Last Activity | Days Silent | Recommendation |
|------|--------|---------------|-------------|----------------|
| [Deal] | $[X] | [Date] | [X] | [Re-engage / Downgrade / Remove] |

### Stuck Deals (Same Stage 30+ Days)
| Deal | Amount | Stage | Days in Stage | Recommendation |
|------|--------|-------|---------------|----------------|
| [Deal] | $[X] | [Stage] | [X] | [Push / Multi-thread / Qualify out] |

### Past Close Date
| Deal | Amount | Close Date | Days Overdue | Recommendation |
|------|--------|------------|--------------|----------------|
| [Deal] | $[X] | [Date] | [X] | [Update date / Push to next quarter / Close lost] |

### Single-Threaded (Only One Contact)
| Deal | Amount | Contact | Risk | Recommendation |
|------|--------|---------|------|----------------|
| [Deal] | $[X] | [Name] | Champion leaves = deal dies | [Identify additional stakeholders] |

---

## Hygiene Issues

| Issue | Count | Deals | Action |
|-------|-------|-------|--------|
| Missing close date | [X] | [List] | Add realistic close dates |
| Missing amount | [X] | [List] | Estimate or qualify |
| Missing next step | [X] | [List] | Define next action |
| No primary contact | [X] | [List] | Assign contact |

---

## Pipeline Shape

### By Stage
| Stage | # Deals | Value | % of Pipeline |
|-------|---------|-------|---------------|
| [Stage] | [X] | $[X] | [X]% |

### By Close Month
| Month | # Deals | Value |
|-------|---------|-------|
| [Month] | [X] | $[X] |

### By Deal Size
| Size | # Deals | Value |
|------|---------|-------|
| $100K+ | [X] | $[X] |
| $50K-100K | [X] | $[X] |
| $25K-50K | [X] | $[X] |
| <$25K | [X] | $[X] |

---

## Recommendations

### This Week
1. [ ] [Specific action for priority deal 1]
2. [ ] [Action for at-risk deal]
3. [ ] [Hygiene task]

### This Month
1. [ ] [Strategic action]
2. [ ] [Pipeline building if needed]

---

## Deals to Consider Removing

These deals may be dead weight:

| Deal | Amount | Reason | Recommendation |
|------|--------|--------|----------------|
| [Deal] | $[X] | [No activity 60+ days, no response] | Mark closed-lost |
| [Deal] | $[X] | [Pushed 3+ times, no champion] | Qualify out |
```

---

## Prioritization Framework

I'll rank your deals using this framework:

| Factor | Weight | What I Look For |
|--------|--------|-----------------|
| **Close Date** | 30% | Deals closing soonest get priority |
| **Deal Size** | 25% | Bigger deals = more focus |
| **Stage** | 20% | Later stage = more focus |
| **Activity** | 15% | Active deals get prioritized |
| **Risk** | 10% | Lower risk = safer bet |

You can tell me to weight differently: "Focus on big deals over soon deals" or "I need quick wins, prioritize close dates."

---

## If CRM Connected

- I'll pull your pipeline automatically
- Update records with new close dates, stages, next steps
- Create follow-up tasks
- Track hygiene improvements over time

---

## Tips

1. **Review weekly** — Pipeline health decays fast. Weekly reviews catch issues early.
2. **Kill dead deals** — Stale opportunities inflate your pipeline and distort forecasts. Be ruthless.
3. **Multi-thread everything** — If one person goes dark, you need a backup contact.
4. **Close dates should mean something** — A close date is when you expect signature, not when you hope for one.

