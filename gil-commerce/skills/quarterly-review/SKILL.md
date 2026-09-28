---
name: quarterly-review
description: |
  분기 리뷰(QBR) — 매출·마진 추세, 고객 헬스, 기회·리스크를 발표 가능한 서사로 정리합니다 트리거: "분기 리뷰 만들어줘", "QBR 정리", "3분기 성과 발표자료 준비"
version: "2.6.0"
uz: references/uz-quarterly-review.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/quarterly-review, Apache-2.0)
---

# quarterly-review

## 스킬 개요(상세)

분기 리뷰(QBR) — 매출·마진 추세, 고객 헬스, 기회·리스크를 발표 가능한 서사로 정리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 발표 산출은 gil:pptx-designer·gil:html-slide 체인. 연간 시즌 맥락은 commerce-season-calendar 참조.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 분기 국가 통계(stat. 상세는 `references/uz-quarterly-review.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/quarterly-review -->
Run the quarterly business review. Pull financial, sales, and customer data for the quarter, synthesize it into a narrative, and produce a presentation-ready document.

Parse arguments:
- `--quarter` (default: previous calendar quarter) — format `YYYY-QN` (e.g., `2026-Q1`)
- `--save-to` (default: `files`) — `files` (Google Drive / OneDrive), `desktop`, or `both`

## Step 1 — Financial performance

Using the `business-pulse` skill in deep mode:

1. Pull QuickBooks P&L for the quarter: revenue, COGS, gross margin, operating expenses, net margin.
2. Compare to prior quarter and same quarter last year (if available).
3. Pull PayPal settlements for the same period to validate QB revenue.
4. Calculate: revenue growth %, margin change in points, top 3 revenue categories.

## Step 2 — Customer health

1. Pull HubSpot deal data: new customers won, churned, average deal size, pipeline entering next quarter.
2. Calculate customer acquisition cost (if data available) and revenue per customer.
3. Flag any customers representing >20% of revenue (concentration risk).

## Step 3 — Top opportunities

Identify 3 specific opportunities for next quarter based on the data:
- Revenue upside (category, customer segment, or channel to double down on)
- Margin upside (cost to cut or price to raise)
- Customer upside (segment to target or churn to reduce)

## Step 4 — Top risks

Identify 3 specific risks for next quarter:
- Revenue risk (concentration, trend, seasonality)
- Margin risk (rising cost, pricing pressure)
- Operational risk (pipeline gap, vendor dependency)

## Step 5 — QBR narrative

Write a 500–800 word narrative in plain business English with this structure:
1. Quarter headline (one sentence)
2. Revenue story (trend + why)
3. Margin story (trend + why)
4. Customer story (health + pipeline)
5. Three opportunities
6. Three risks
7. One-paragraph call to action for next quarter

## Step 6 — Export

Generate:
1. **`qbr-{YYYY-QN}.pdf`** — formatted narrative + key charts (as ASCII tables if no chart tool available)
2. Save to `--save-to` location

## Connector failures

If QuickBooks is unreachable, stop — the QBR requires QB financial data as the foundation. If PayPal is missing, skip cross-validation and note "PayPal not connected — revenue validated from QB only." If HubSpot is missing, skip customer health (Step 2) and note "HubSpot not connected — customer health section skipped."

## Approval gates

- **Never publish or email the QBR automatically.** Always display for owner review first.
- **Flag if any data source returns incomplete data** — note gaps in the narrative.

## Output

Present the narrative in-line, then confirm export. End with a one-paragraph "what to focus on next quarter" summary.

