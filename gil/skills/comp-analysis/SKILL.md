---
name: comp-analysis
description: |
  보상 분석 — 시장 벤치마킹·밴드 배치·오퍼 경쟁력을 분석합니다 트리거: "이 직무 연봉 얼마 줘야 해", "오퍼 경쟁력 봐줘", "보상 밴드 분석"
version: "2.6.0"
uz: references/uz-comp-analysis.md
origin: anthropics/knowledge-work-plugins@2cf4294 (human-resources/comp-analysis, Apache-2.0)
---

# comp-analysis

## 스킬 개요(상세)

보상 분석 — 시장 벤치마킹·밴드 배치·오퍼 경쟁력을 분석합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 한국 맥락: 잡플래닛·원티드인사이트·크레딧잡 등 공개 소스 기반 추정 + 확인 필요 항목 명시. 4대보험·퇴직금 총보상 환산 포함.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 급여 실무는 net 표기 관습(세후) — gross/net 환산 명시. 상세는 `references/uz-comp-analysis.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: human-resources/comp-analysis -->
# /comp-analysis

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Analyze compensation data for benchmarking, band placement, and planning. Helps benchmark compensation against market data for hiring, retention, and equity planning.

## Usage

```
/comp-analysis $ARGUMENTS
```

## What I Need From You

**Option A: Single role analysis**
"What should we pay a Senior Software Engineer in SF?"

**Option B: Upload comp data**
Upload a CSV or paste your comp bands. I'll analyze placement, identify outliers, and compare to market.

**Option C: Equity modeling**
"Model a refresh grant of 10K shares over 4 years at a $50 stock price."

## Compensation Framework

### Components of Total Compensation
- **Base salary**: Cash compensation
- **Equity**: RSUs, stock options, or other equity
- **Bonus**: Annual target bonus, signing bonus
- **Benefits**: Health, retirement, perks (harder to quantify)

### Key Variables
- **Role**: Function and specialization
- **Level**: IC levels, management levels
- **Location**: Geographic pay adjustments
- **Company stage**: Startup vs. growth vs. public
- **Industry**: Tech vs. finance vs. healthcare

### Data Sources
- **With ~~compensation data**: Pull verified benchmarks
- **Without**: Use web research, public salary data, and user-provided context
- Always note data freshness and source limitations

## Output

Provide percentile bands (25th, 50th, 75th, 90th) for base, equity, and total comp. Include location adjustments and company-stage context.

```markdown
## Compensation Analysis: [Role/Scope]

### Market Benchmarks
| Percentile | Base | Equity | Total Comp |
|------------|------|--------|------------|
| 25th | $[X] | $[X] | $[X] |
| 50th | $[X] | $[X] | $[X] |
| 75th | $[X] | $[X] | $[X] |
| 90th | $[X] | $[X] | $[X] |

**Sources:** [Web research, compensation data tools, or user-provided data]

### Band Analysis (if data provided)
| Employee | Current Base | Band Min | Band Mid | Band Max | Position |
|----------|-------------|----------|----------|----------|----------|
| [Name] | $[X] | $[X] | $[X] | $[X] | [Below/At/Above] |

### Recommendations
- [Specific compensation recommendations]
- [Equity considerations]
- [Retention risks if applicable]
```

## If Connectors Available

If **~~compensation data** is connected:
- Pull verified market benchmarks by role, level, and location
- Compare your bands against real-time market data

If **~~HRIS** is connected:
- Pull current employee comp data for band analysis
- Identify outliers and retention risks automatically

## Tips

1. **Location matters** — Always specify location for benchmarking. SF vs. Austin vs. London are very different.
2. **Total comp, not just base** — Include equity, bonus, and benefits for a complete picture.
3. **Keep data confidential** — Comp data is sensitive. Results stay in your conversation.

