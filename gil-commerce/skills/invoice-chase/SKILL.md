---
name: invoice-chase
description: |
  미수금 관리 — 연체 인보이스를 금액·연체일 기준으로 정렬하고 단계별 독촉 메시지를 초안합니다 트리거: "미수금 정리해줘", "연체 인보이스 독촉", "수금 계획 세워줘"
version: "2.5.0"
uz: references/uz-invoice-chase.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/invoice-chase, Apache-2.0)
---

# invoice-chase

## 스킬 개요(상세)

미수금 관리 — 연체 인보이스를 금액·연체일 기준으로 정렬하고 단계별 독촉 메시지를 초안합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 한국 맥락: 세금계산서 기반 B2B 미수 관리, 내용증명 전 단계까지. 독촉 문구는 채권추심법 준수 톤.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: B2B 계약서 지급 조건(아방스 관행)·은행 이체 지연 리드타임 반영. 상세는 `references/uz-invoice-chase.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/invoice-chase -->
# Invoice Chase

## Quick start

Pull the AR aging report, score each customer by payment history, draft a tone-matched reminder for each overdue invoice, and present them to the owner. Nothing sends until the owner says so.

```
User: "who owes me money"
→ Pull AR aging from QuickBooks
→ Cross-reference PayPal settlements (last 14 days)
→ Score each customer: good-payer / occasionally-late / repeat-late
→ Draft tone-matched reminders
→ Show summary table + drafts. Wait for "send these."
```

## Setup (first run only)

Ask the owner two questions before running for the first time:

1. **Mail connector**: "Do you use Gmail or Apple Mail for drafts?" — store the answer; use it for all non-PayPal draft queuing.
2. **Stripe**: "Do you use Stripe for invoicing? I can include Stripe invoices in the overdue sweep." — if yes, pull Stripe overdue invoices alongside QuickBooks.

Do not ask again on subsequent runs.

## Workflow

1. **Pull overdue receivables.** Query QuickBooks AR aging for all invoices more than 1 day past due. If Stripe is enabled (owner confirmed at setup), also pull Stripe overdue invoices.

2. **Cross-reference payment history.** For each overdue customer, query PayPal for settled transactions using these parameters:
   - `transaction_status: S` (settled only — filters out pending and denied transactions that inflate result size and increase rate-limit risk)
   - Date window: **last 7 days** ending today (not 14 or 30 — wider windows are the primary cause of PayPal 429 rate limit errors)

   **If PayPal returns a 429 rate limit error:**
   - Retry once immediately with a **3-day window** instead.
   - If the retry also returns 429, skip the PayPal cross-reference entirely for this run. Flag all customers in the batch as "PayPal unavailable — verify manually" in the summary table. Proceed to scoring using QuickBooks history only. Do not silently drop the caveat.

   If a customer shows a settled payment within the query window, flag as "possibly paid — verify" and exclude from the draft queue.

3. **Score each customer.** Read [reference/tone-matching.md](reference/tone-matching.md) for scoring logic. Result: `good-payer`, `occasionally-late`, or `repeat-late`.

4. **Draft reminder emails.** One email per customer — consolidate multiple overdue invoices into one email. Match tone to score. See [reference/examples/gentle-reminder.md](reference/examples/gentle-reminder.md) and [reference/examples/firm-reminder.md](reference/examples/firm-reminder.md).

5. **Present drafts to owner.** Show a summary table first:

   | Customer | Amount Due | Days Late | Tone | Send via |
   |---|---|---|---|---|
   | Acme Corp | $1,200 | 18 days | Gentle | PayPal |
   | Smith LLC | $450 | 47 days | Firm | Gmail draft |

   Then show each draft email in full. Wait for owner to say "send these" or approve individually.

6. **Send or queue — only after approval.**
   - PayPal invoices: send the reminder via PayPal.
   - Non-PayPal invoices: queue as a draft in the owner's configured mail app.
   - Never send without explicit approval.

7. **Report what happened.** List what was sent, what was queued as draft, and what was flagged (possibly paid, excluded).

## Approval gates

- **Never send or queue a draft without explicit owner approval.** Present all drafts first; wait for the go-ahead.
- **Never include a customer who paid in the last 14 days.** Flag as "possibly paid — verify" instead.
- **Never send to a customer not in the QuickBooks AR report** (or Stripe, if enabled). No reminders from memory alone.
- **One approval covers one batch.** Adding a customer or changing a draft after approval starts a new round.

## Reference

- [reference/tone-matching.md](reference/tone-matching.md) — scoring logic, tone guidelines, subject line formulas
- [reference/gotchas.md](reference/gotchas.md) — known failure modes
- [reference/examples/gentle-reminder.md](reference/examples/gentle-reminder.md) — good-payer email example
- [reference/examples/firm-reminder.md](reference/examples/firm-reminder.md) — repeat-late-payer email example

