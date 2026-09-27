---
name: friday-brief
description: |
  금요일 주간 마감 브리핑 — 전주 대비 매출·베스트셀러·성과와 관찰 항목을 정리합니다 트리거: "금요일 브리핑", "주간 마감 정리해줘", "이번 주 성과 요약"
version: "2.4.0"
uz: references/uz-friday-brief.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/friday-brief, Apache-2.0)
---

# friday-brief

## 스킬 개요(상세)

금요일 주간 마감 브리핑 — 전주 대비 매출·베스트셀러·성과와 관찰 항목을 정리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: monday-brief(주 시작)와 페어. 룩백 기간 옵션(7일/14일).

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 금요일은 UZ 주말 직전 — 주말 프로모션 예약 점검 항목 추가. 상세는 `references/uz-friday-brief.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/friday-brief -->
Run the Friday wins-and-watches briefing. Pull the numbers, surface what matters, and give the owner a clean end-of-week picture.

Parse arguments:
- `--lookback` (default: `7d`) — `7d` for one week or `14d` for a two-week rolling comparison

## Step 1 — Revenue pulse

Using the `business-pulse` skill workflow:

1. Pull PayPal transactions for the lookback period.
2. Pull any HubSpot deal closes for the same window.
3. Calculate week-over-week revenue delta.
4. Surface top 3 revenue sources (product / customer / channel) ranked by contribution.

## Step 2 — Sales breakdown

1. List the top 5 selling products/services by volume and revenue.
2. List the bottom 3 (anything that moved less than expected vs. prior period).
3. Flag any items with a sudden spike or drop (>20% change).

## Step 3 — Wins and watches summary

Format the output as:

```
Friday Brief — {date}

WINS
• {win 1}
• {win 2}
• {win 3}

WATCHES
• {watch 1} — {recommended action}
• {watch 2} — {recommended action}

Revenue this week: ${amount} ({+/-}X% vs last week)
```

## Connector failures

Run with whatever is connected — this command degrades gracefully. If PayPal is missing, skip transaction data and note "PayPal not connected — revenue data from HubSpot deals only." If HubSpot is missing, skip deal closes and note it. If neither is connected, stop and tell the owner: "No revenue sources connected. Connect PayPal or HubSpot to run the Friday brief."

## Approval gates

- **Never send or post this brief automatically.** Always display it for the owner to review first.
- **Never auto-cancel or modify anything.** Surface the data and recommendations only.

## Output

End with the formatted brief and ask the owner: "Want me to post this to Slack, email it to yourself, or save it?"

