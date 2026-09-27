---
name: month-heads-up
description: |
  매월 25일 실행 — 다음 30일 현금흐름 전망과 월말 전 조치 항목을 미리 경고합니다 트리거: "월말 전 현금 점검", "다음달 현금흐름 미리 봐줘", "25일 헤드업"
version: "2.4.0"
uz: references/uz-month-heads-up.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/month-heads-up, Apache-2.0)
---

# month-heads-up

## 스킬 개요(상세)

매월 25일 실행 — 다음 30일 현금흐름 전망과 월말 전 조치 항목을 미리 경고합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 한국 맥락: 부가세 예정고지(4·10월)·원천세 10일 납부·4대보험 정기 납부일을 경고 캘린더에 반영.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: NDS(부가세) 월 20일 신고·사회세 납부 주기를 경고 항목에 반영. 상세는 `references/uz-month-heads-up.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/month-heads-up -->
Run the month-end heads-up. Pull forward-looking cash data and give the owner a clear "here's what the next 30 days look like" picture with specific things to watch.

Parse arguments:
- `--horizon` (default: `30`) — forecast window in days (`30` or `60`)

## Step 1 — Current cash position

Using the `cash-flow-snapshot` skill workflow:

1. Pull QuickBooks current cash and receivables balance.
2. Pull PayPal settled balance and pending payouts.
3. Combine for total available + incoming cash.

## Step 2 — Upcoming obligations

1. Pull recurring expenses from QuickBooks (payroll, subscriptions, rent/lease) due in the next 30 days.
2. Pull any outstanding invoices past due or due within 14 days.
3. Flag any payment that would push the balance below a comfortable buffer (default: <$2,000 or owner's QB average monthly expense × 0.5).

## Step 3 — Cash-flow forecast

1. Project 30-day net cash: current balance + expected inflows − known obligations.
2. Identify the single tightest week (lowest projected balance).
3. Flag if any week projects negative.

## Step 4 — Two things to watch

Surface no more than two specific, actionable watches:
- Which invoice(s) to chase now
- Which expense(s) to defer or negotiate

Format as:

```
Month-End Heads Up — {current date}
Horizon: next {X} days

Cash today: ${amount}
Projected end-of-period: ${amount}
Tightest week: {date range} — projected ${amount}

TWO THINGS TO WATCH
1. {item} — {why it matters} — suggested action: {action}
2. {item} — {why it matters} — suggested action: {action}
```

## Connector failures

If QuickBooks is unreachable, stop — the cash forecast requires QB as the source of truth. If PayPal is missing, run the forecast from QB-only data and note "PayPal not connected — PayPal receivables excluded from forecast." Same for Stripe/Square if missing.

## Approval gates

- **Never initiate payments or send emails automatically.** Surface the data and actions for the owner to take.
- **Never project revenue that hasn't been confirmed in QB or PayPal.** Use conservative estimates only.

## Output

Present the formatted brief and offer to draft chase emails for any flagged overdue invoices.

