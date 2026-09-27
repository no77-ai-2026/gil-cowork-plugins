---
name: plan-payroll
description: |
  급여일 자금 계획 — 현금 전망과 미수금 우선순위를 정리해 급여 지급 가능성을 확인합니다 트리거: "급여 자금 계획", "이번달 월급 나가도 되나", "급여일 전 자금 점검"
version: "2.4.0"
uz: references/uz-plan-payroll.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/plan-payroll, Apache-2.0)
---

# plan-payroll

## 스킬 개요(상세)

급여일 자금 계획 — 현금 전망과 미수금 우선순위를 정리해 급여 지급 가능성을 확인합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 한국 맥락: 급여+4대보험 사업자 부담분+원천세 10일 납부를 묶어 소요 현금 산출.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 급여의 사회세(12%)·NDFL 원천 공제 동시 계산. 상세는 `references/uz-plan-payroll.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/plan-payroll -->
Run the payroll-confidence pipeline by chaining two skills. The owner approves at each handoff — never send a reminder or commit a forecast without explicit confirmation.

Parse arguments:
- `--horizon` (default `30`) — forecast window in days (30, 60, or 90)
- `--payroll-date` (optional) — the date payroll runs; defaults to next Friday

## Step 1 — Cash forecast (cash-flow-snapshot)

Trigger the `cash-flow-snapshot` skill workflow:
1. Pull AR, AP, and historical cash timing from QuickBooks, PayPal, Stripe, or Square (whichever are connected). Fall back to CSV upload if no connector is live.
2. Layer in known fixed costs (rent, payroll, recurring vendor charges).
3. Produce a 30/60/90-day forecast (use the requested `--horizon`) with percentage-variance confidence bands.
4. Flag named risks — e.g., "payroll on May 15 lands $4,200 below your fixed-cost floor at the median forecast."
5. Deliver chat summary + downloadable XLSX.
6. Present to the owner. Wait for explicit "okay, see what we can collect" before Step 2.

If the forecast shows payroll is comfortably covered, ask the owner whether they still want to chase overdue invoices or stop here.

## Step 2 — Overdue collection (invoice-chase)

After Step 1 approval, trigger the `invoice-chase` skill workflow:
1. Pull overdue invoices from QuickBooks and PayPal.
2. Rank by amount × days-late × customer payment history.
3. For each, draft a reminder matched to tone (gentle for good customers, firm for repeat late payers).
4. PayPal-issued invoices queue as PayPal-send drafts; non-PayPal invoices queue as Mail drafts.
5. Present the ranked list with drafted reminders. Show the projected cash impact if a top-N subset gets paid within the horizon — does that close the payroll gap from Step 1?
6. Wait for explicit "send these" per reminder (or batch approval) before pushing.

## Approval gates (must hold)

- Never send a reminder without owner approval — drafts only until "send" is given.
- Never commit a forecast as authoritative without owner sign-off.
- If a connector is unreachable (QuickBooks, PayPal, Mail), stop, report which connector failed, and ask whether to retry, fall back to CSV, or abort.

## Output

End the run with a one-paragraph recap: forecast verdict (covered / gap / risk), reminders sent and to whom, projected new cash position if reminders convert.

