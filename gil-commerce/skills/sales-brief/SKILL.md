---
name: sales-brief
description: |
  판매 브리프 — 톱·바텀 셀러와 시즌 패턴을 짚고 잘 팔리는 것을 밀고 재고를 터는 2주 콘텐츠 브리프를 만듭니다 트리거: "잘 팔리는 것 정리해줘", "재고 털 콘텐츠 브리프", "판매 브리프"
version: "2.4.0"
uz: references/uz-sales-brief.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/sales-brief, Apache-2.0)
---

# sales-brief

## 스킬 개요(상세)

판매 브리프 — 톱·바텀 셀러와 시즌 패턴을 짚고 잘 팔리는 것을 밀고 재고를 터는 2주 콘텐츠 브리프를 만듭니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 콘텐츠 실행은 gil-creative:sns-content·card-news 체인(설치 시).

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 시즌 패턴에 Navruz(3월)·라마단·신학기 등 UZ 캘린더 반영 — commerce-season-calendar와 연동. 상세는 `references/uz-sales-brief.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/sales-brief -->
Run the sales analysis and content brief. Pull what sold (and what didn't), explain why, and produce a ready-to-use content plan that acts on the data.

Parse arguments:
- `--lookback` (default: `30d`) — `30d`, `60d`, or `90d` lookback window

## Step 1 — Sales breakdown

Using the `content-strategy` skill workflow for sales analysis:

1. Pull PayPal transactions for the lookback period grouped by item/service/SKU.
2. Pull QuickBooks revenue by product/service category.
3. Rank products by: total revenue, unit volume, and margin (if available in QB).
4. Calculate each product's share of total revenue vs. prior equivalent period.

Top sellers: products that grew share or maintained top-3 rank.
Bottom sellers: products with declining volume or below 5% of revenue.

## Step 2 — Seasonality check

1. Compare current period to same period in prior year (if QB history available).
2. Flag any items with a seasonal pattern (e.g., spikes in Q4, slow summers).
3. Note any new products with insufficient history to detect seasonality.

## Step 3 — Why analysis

For each top and bottom seller, explain the likely driver:
- Price change, promo, new channel, seasonal demand, competitor move
- Cross-reference with HubSpot campaign activity for the period
- Note where attribution is inferred vs. confirmed

## Step 4 — 2-week content brief

Produce a ready-to-use content brief:

```
2-Week Content Brief — {date range}

PUSH THESE (winners)
• {product}: {suggested angle} — {channel: email|social|both}
• {product}: {suggested angle} — {channel}

CLEAR THESE (slow movers)
• {product}: {promo angle or bundle suggestion} — {channel}

CONTENT CALENDAR
Week 1:
  Mon: {post/email concept}
  Wed: {post/email concept}
  Fri: {post/email concept}
Week 2:
  Mon: {post/email concept}
  Wed: {post/email concept}
  Fri: {post/email concept}
```

## Connector failures

If both QuickBooks and PayPal are unreachable, stop — sales analysis requires at least one revenue source. If only one is connected, run from that source and note "QuickBooks not connected — revenue data from PayPal only" (or vice versa). If HubSpot is missing, skip campaign cross-reference in the "why analysis" and note it.

## Approval gates

- **Never auto-schedule or publish content.** The brief is for owner review only.
- **Never create Canva assets automatically** — offer to generate them after owner approves the brief.

## Output

Present the sales analysis, then the content brief. Ask the owner if they'd like to generate Canva assets for any of the planned posts.

