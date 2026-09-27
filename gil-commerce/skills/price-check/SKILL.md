---
name: price-check
description: |
  가격 점검 — 상품별 마진 표와 3가지 가격 시나리오를 만들어 인상·인하 결정을 돕습니다 트리거: "가격 올려도 될까", "가격 시나리오 비교", "상품별 마진 표"
version: "2.5.0"
uz: references/uz-price-check.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/price-check, Apache-2.0)
---

# price-check

## 스킬 개요(상세)

가격 점검 — 상품별 마진 표와 3가지 가격 시나리오를 만들어 인상·인하 결정을 돕습니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [책임 경계] 마진·엔드ROAS 계산 자체는 commerce-margin-calculator 정본 — 이 스킬은 시나리오 비교·의사결정 프레임.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 환율 변동 시나리오(UZS 약세 시 수입원가) 축 추가. 상세는 `references/uz-price-check.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/price-check -->
Run the pricing analysis. Pull cost and revenue data, build the margin table, and model three pricing scenarios — so the owner can see the numbers clearly before deciding what to charge.

Parse arguments:
- `PRODUCT_NAME` (optional) — specific product or service to analyze; if omitted, analyze all active products

## Step 1 — Current margin baseline

Using the `margin-analyzer` skill workflow:

1. Pull QuickBooks revenue by product/service for the last 90 days.
2. Pull COGS or direct costs per product from QuickBooks (if categorized).
3. Pull PayPal gross sales for the same products to cross-validate.
4. Calculate current gross margin per product: (revenue − COGS) ÷ revenue.

Build the margin table:

```
Product          | Revenue  | COGS     | Gross Margin | Margin %
{product}        | ${amt}   | ${amt}   | ${amt}       | {X}%
```

Flag any product with margin below 20% as a risk.

## Step 2 — Three pricing scenarios

For each product (or the specified product), model three scenarios. Do NOT recommend a price — present data only.

**Scenario A — Hold current price**
- Project revenue at current price × current volume
- Project margin at current COGS

**Scenario B — Price increase (+10% to +20%, owner to specify)**
- Project revenue assuming 0%, 5%, and 10% volume loss at new price
- Show the break-even volume needed to maintain current profit

**Scenario C — Price decrease (−10%, to drive volume)**
- Project revenue assuming 10%, 20%, and 30% volume increase
- Show the volume needed to match current profit

Present each scenario as a data table, not a recommendation.

## Step 3 — Customer messaging brief

Produce a plain-language brief (for price increase scenarios) the owner can use to communicate a change to customers:
- One paragraph explaining the change
- Three key message options (direct, value-focused, empathetic)
- Suggested timing and channel (email, invoice note, in-person)

## Connector failures

If QuickBooks is unreachable, stop — margin analysis requires QB revenue and cost data. If PayPal is missing, run from QB-only and note "PayPal not connected — cross-validation against PayPal sales skipped."

## Approval gates

- **Never recommend a specific price.** Provide data views only — pricing decisions belong to the owner.
- **Flag if COGS data is incomplete** (many QB setups don't track per-product COGS) and note the gap.
- **Never update any prices in QB, PayPal, or any connected system.**

## Output

Present the margin table, then the three scenario tables side-by-side. If a price increase scenario is being considered, append the customer messaging brief. End with: "Which scenario would you like to explore further?"

