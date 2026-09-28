---
name: customer-pulse-check
description: |
  고객 이슈 펄스 — 분쟁·문의·리뷰를 종합해 지금 고칠 수 있는 톱3 이슈와 응대 초안을 만듭니다 트리거: "고객 불만 종합해줘", "지금 제일 급한 고객 이슈", "리뷰·문의 펄스 체크"
version: "2.6.0"
uz: references/uz-customer-pulse-check.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/customer-pulse-check+customer-pulse, Apache-2.0)
---

# customer-pulse-check

## 스킬 개요(상세)

고객 이슈 펄스 — 분쟁·문의·리뷰를 종합해 지금 고칠 수 있는 톱3 이슈와 응대 초안을 만듭니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 원본 customer-pulse 병합. 리뷰 대량 분석은 gil-commerce:commerce-voc-triage로 위임(경계).

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: Uzum 리뷰·Telegram 채널 댓글·Payme 분쟁을 소스로. 상세는 `references/uz-customer-pulse-check.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/customer-pulse-check -->
Run the customer voice synthesis. Pull feedback signals from all connected sources, identify the themes that are actually fixable, and produce drafted responses the owner can review and send.

Parse arguments:
- `--since` (default: last 30 days) — start date `YYYY-MM-DD` for the lookback window

## Step 1 — Gather feedback signals

Using the `customer-pulse` skill workflow:

1. Pull PayPal disputes and chargebacks for the period: reason codes, amounts, resolution status.
2. Pull HubSpot support tickets and conversation notes for the period.
3. If review export files are available (Google Reviews CSV, Yelp export, etc.) in Files: read and parse them.
4. Count total signals per source.

## Step 2 — Theme extraction

Cluster all signals into recurring themes. For each theme:
- Count how many signals mention it
- Classify: Product quality / Delivery / Billing / Communication / Expectation mismatch / Other
- Rate impact: 🔴 High (revenue risk, churn) / 🟡 Medium / 🟢 Low

## Step 3 — Top-3 fixable issues

Using the `ticket-deflector` skill workflow:

Select the top 3 themes by: frequency × impact rating. For each:
1. State the issue in one sentence
2. Explain the root cause (where evident)
3. Suggest a specific operational fix
4. Draft a customer response template

Response template format:
```
Subject: Re: {issue topic}

Hi {first name},

Thank you for reaching out. {Acknowledgment of their experience in 1-2 sentences}.

{What we're doing about it / what happened / resolution offered}.

{Next step or offer}.

{Sign-off}
```

## Step 4 — Summary table

Format the output as:

```
Customer Voice — {date range}
Total signals: {n} ({PayPal disputes: n} | {HubSpot tickets: n} | {Reviews: n})

TOP 3 FIXABLE ISSUES
1. {Issue} ({frequency}) — {impact} — Fix: {one-line fix}
2. {Issue} ({frequency}) — {impact} — Fix: {one-line fix}
3. {Issue} ({frequency}) — {impact} — Fix: {one-line fix}
```

## Connector failures

Run with whatever sources are connected — this command degrades gracefully. If PayPal is missing, skip dispute data and note "PayPal not connected — dispute data skipped." If HubSpot is missing, skip ticket data and note it. If no sources are connected at all, stop and tell the owner: "No feedback sources connected. Connect at least one of PayPal, HubSpot, or upload a review export CSV."

## Approval gates

- **Never send response emails automatically.** Present drafts for owner review only.
- **Never close HubSpot tickets or resolve PayPal disputes without explicit owner confirmation.**
- **Never include customer PII in the summary** — use first name + last initial only.

## Output

Present the summary table, then each response template. Ask the owner which templates they'd like to send, then wait for explicit approval before drafting the send.


---

<!-- source: small-business/customer-pulse -->
# Customer Pulse

## Quick start

Ask: *"How are customers feeling this month?"*

Claude pulls disputes, tickets, email threads, and Intercom conversations for the last 30 days, groups them into 3–5 themes with verbatim evidence, and delivers a "do these 3 things this week" action list.

To include Google/Yelp reviews, paste them after triggering — or say "I have some reviews to add."

## Workflow

1. **Set the date window.** Default: last 30 days. If the user specifies a range, use it.

2. **Pull PayPal disputes.** Fetch disputes opened in the window. If the PayPal API returns a rate-limit error, skip and add `PayPal: rate-limited — not included` to the Sources section. Do not retry; do not error. See [reference/gotchas.md](reference/gotchas.md) for the rate-limit pattern.

3. **Pull HubSpot tickets and feedback.** Fetch open and recently closed tickets. If 0 tickets exist, record `HubSpot tickets: 0` and continue — do not surface a warning.

4. **Pull Gmail threads.** Search for threads in the window containing: `refund cancel unhappy issue problem disappointed frustrated broken late slow wrong missing`. Extract subject lines and 1–2 sentence excerpts per thread.

5. **Pull Intercom conversations.** Call `search_conversations` to fetch open and recently closed conversations. Then call `get_conversation` for each conversation ID returned to access the full `conversation_parts`. Extract parts where `author.type === 'user'` — these are customer messages. Exclude parts where `author.type` is `admin` or `bot`.

6. **Accept pasted reviews (optional).** If the user pastes Google or Yelp review text, include it in the source pool tagged as `[Review]`. No connector required.

7. **Extract themes.** Group all evidence into 3–5 recurring themes. Each theme must include:
   - A one-sentence label (e.g., "Shipping delays causing repeat complaints")
   - 2–3 verbatim quotes with source tags: `[PayPal]`, `[HubSpot]`, `[Gmail]`, `[Intercom]`, or `[Review]`
   - A signal count (how many items touch this theme)

   Verbatim quotes are non-negotiable — never paraphrase. See [reference/gotchas.md](reference/gotchas.md) for the verbatim anti-pattern.

8. **Generate the "do these 3 things" list.** Rank themes by signal count. Pick the top 3 and write one concrete, owner-actionable step per theme. Format as a numbered checklist.

9. **Deliver the report.** Structure the output with these sections in order:
   - **Header** — H2 with "Customer Pulse" and the date range.
   - **Sources pulled** — Bullet list with signal counts per source (PayPal
     disputes, HubSpot tickets, Gmail threads, Intercom conversations, pasted
     reviews). Note any source that was rate-limited and skipped.
   - **Themes** — For each theme, show a bold numbered theme label with the
     signal count, followed by two verbatim quotes as blockquotes, each
     attributed to its source.
   - **Do these 3 things this week** — Numbered list of three concrete,
     owner-actionable steps, each tied to one of the top themes.

   For a complete worked example, see [reference/examples/example-report.md](reference/examples/example-report.md).

## Approval gates

This skill is **read-only** — it does not post, send, reply, or modify any records. No approval gate is required.

## Reference

- [reference/gotchas.md](reference/gotchas.md) — PayPal rate limits, HubSpot empty state, verbatim quote requirement, Gmail keyword drift
- [reference/examples/example-report.md](reference/examples/example-report.md) — full worked example output

