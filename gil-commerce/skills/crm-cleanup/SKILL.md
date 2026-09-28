---
name: crm-cleanup
description: |
  CRM 정리 — 방치된 거래·중복 연락처·누락 필드를 스캔하고 승인받아 정리합니다 트리거: "CRM 정리해줘", "고객 명단 중복 정리", "방치된 거래 찾아줘"
version: "2.6.0"
uz: references/uz-crm-cleanup.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/crm-cleanup+crm-maintenance, Apache-2.0)
---

# crm-cleanup

## 스킬 개요(상세)

CRM 정리 — 방치된 거래·중복 연락처·누락 필드를 스캔하고 승인받아 정리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 원본 crm-maintenance(정기 유지보수) 병합 — 일회 정리+정기 루틴 2모드. 도구 일반화: 엑셀 고객명부·채널톡·HubSpot 등.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: Telegram 연락처 기반 고객 명부(엑셀) 정리 관행 반영 — 전화번호 형식(+998) 정규화 포함. 상세는 `references/uz-crm-cleanup.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/crm-cleanup -->
Run a HubSpot hygiene pass using the `crm-maintenance` skill cleanup workflow. Act immediately — the user typed /crm-cleanup, so skip the intent-detection step.

Parse arguments:
- `--scope` (default: `all`) — `deals` for deal audit only, `contacts` for contact dedup only, `all` for both

## Step 1 — Scan for stale deals

If scope includes deals:

1. Pull all open deals from HubSpot.
2. Flag deals with no activity (email, call, meeting, note) in the last 14 days.
3. For each stale deal: show deal name, stage, last activity date, associated contacts, and amount.
4. Propose actions per deal: update next-step, change stage, add a note, or close-lost.

Present the full stale-deals list before making any changes.

## Step 2 — Scan for duplicate contacts

If scope includes contacts:

1. Search HubSpot contacts for likely duplicates (same email, similar names, same company + similar name).
2. For each duplicate set: show both records side-by-side — name, email, company, deals, last activity.
3. Propose which record to keep and which fields to merge.

Present all duplicate sets before merging anything.

## Step 3 — Scan for missing required fields

1. Check all open deals for missing fields: close date, amount, deal stage, associated contact, next-step/notes.
2. Check contacts associated with open deals for missing fields: email, company, phone.
3. Present a table of records with missing fields and what's missing.

## Step 4 — Apply approved fixes

1. Walk through each finding from Steps 1-3.
2. Apply only the changes the owner explicitly approves.
3. Report each change as it's made with a HubSpot link.

## Connector failures

If HubSpot is unreachable, stop — this command requires HubSpot as the data source. Tell the owner: "HubSpot isn't connected. Connect it in Cowork settings, then rerun /crm-cleanup."

## Approval gates

- **Never delete records.** Not contacts, not deals, not activities. If the user asks, say the skill cannot and direct them to HubSpot.
- **Never change deal stage or close a deal without explicit approval.** Even if evidence is strong. Flag and defer.
- **Never auto-merge duplicate contacts.** Show side-by-side and wait for approval per pair.
- **Side-by-side diffs for all changes.** Show current value and proposed value; wait for approval per item.

## Output

End with a summary: X deals updated, Y contacts merged, Z fields filled. Include links to the affected records.


---

<!-- source: small-business/crm-maintenance -->
# CRM Maintenance

## Quick start

Pull context from the referenced email or calendar event, resolve the right HubSpot contact and deal, log the activity, and surface what changed. For a deal cleanup, audit the deal against recent email/calendar activity and propose updates — never apply them without approval.

```
User: "log this call to the Acme deal"
→ Read the most recent completed calendar event
→ Confirm attendees map to the Acme deal's contacts
→ Write a call activity on the Acme deal
→ Report: "Logged call to Acme Q2 Expansion. [deal link]"
```

## Workflow

1. **Identify intent.** Decide which of three paths applies from the user's message and context:
   - **Email path** — "update my CRM", "add this to the deal", or any reference to an email thread
   - **Call path** — "log this call", "log the meeting", or any reference to a calendar event
   - **Cleanup path** — "clean up HubSpot", "is this deal up to date", or any request to audit a specific deal
   If the intent is ambiguous (e.g. "update HubSpot" with no referenced email/meeting/deal), ask which path before proceeding.

2. **Gather context.**
   - Email path: read the thread (subject, participants, last 1–3 messages). Identify the primary external contact.
   - Call path: read the calendar event (title, attendees, time, description). If no event was specified, use the most recent completed meeting in the last 24 hours and confirm with the user before proceeding.
   - Cleanup path: pull the deal (stage, amount, close date, next-step, associated contacts, activities in last 60 days), plus the last 14 days of email threads and calendar events involving the deal's contacts.

3. **Resolve the HubSpot contact and deal.** For email/call paths:
   - Search HubSpot contacts by email address. If a contact is missing, create it from email signature or calendar invite data — announce creation in chat before writing.
   - Find the right deal in this order: (a) explicit match if the user named one, (b) the contact's sole open deal, (c) fuzzy match across the contact's open deals against the email subject or meeting title — confirm before writing, (d) ask the user if no match. **Never auto-create a deal.**
   - For field names, activity types, and association rules, read [reference/hubspot-fields.md](reference/hubspot-fields.md) before writing anything to HubSpot.
   - If deduplication or deal-resolution feels ambiguous, check [reference/gotchas.md](reference/gotchas.md) before proceeding — it covers the most common failure modes.

4. **Execute the action.**
   - Email path: write an email activity with the thread subject as the title and a concise summary (not the full thread) as the body. Timestamp to the latest message. For a worked example, see [reference/examples/log-email-happy-path.md](reference/examples/log-email-happy-path.md).
   - Call path: write a call activity with the event title, duration, and any notes available. Timestamp to the event start. For a worked example including a missing-contact scenario, see [reference/examples/log-call-happy-path.md](reference/examples/log-call-happy-path.md).
   - Cleanup path: walk each field per [reference/cleanup-checklist.md](reference/cleanup-checklist.md) and assemble a proposed-changes list. Show current → proposed side-by-side. Write only what the user approves. For a full worked example, see [reference/examples/cleanup-deal.md](reference/examples/cleanup-deal.md).

5. **Approval gate — every externally visible write.** For contact creation and activity logging, announce before writing and surface the result after. For cleanup edits, do not write anything until the user approves the specific changes.

6. **Report what happened.** Tell the user what was written and what's pending. Include a HubSpot link to the affected deal when possible. Keep it short.

## Approval gates

- **Never delete records.** Not contacts, not deals, not activities. If the user asks, say the skill cannot and direct them to HubSpot.
- **Never change deal stage or close a deal without explicit user approval.** Even if evidence is strong. Flag and defer.
- **Never create a new deal unprompted.** Ask if the right deal can't be resolved.
- **Announce contact creation before writing.** One line — lets the user catch typos or duplicates.
- **Side-by-side diffs for cleanup.** Show current value and proposed value; wait for approval per item.

## Reference

- [reference/hubspot-fields.md](reference/hubspot-fields.md) — activity types, field names, association rules used in this skill
- [reference/cleanup-checklist.md](reference/cleanup-checklist.md) — the fields checked during a deal cleanup and the evidence needed to flag each
- [reference/gotchas.md](reference/gotchas.md) — Good / Bad patterns for contact resolution, activity summaries, and cleanup proposals
- [reference/examples/log-email-happy-path.md](reference/examples/log-email-happy-path.md) — worked example: email to existing deal
- [reference/examples/log-call-happy-path.md](reference/examples/log-call-happy-path.md) — worked example: meeting to existing deal, missing contact
- [reference/examples/cleanup-deal.md](reference/examples/cleanup-deal.md) — worked example: stale deal audit

