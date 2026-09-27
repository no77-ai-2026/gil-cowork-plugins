---
name: lead-triage
description: |
  리드 분류 — 신규 문의·리드를 구매 가능성 기준으로 분류하고 후속 조치를 배정합니다 트리거: "리드 정리해줘", "문의 온 것 분류", "어떤 고객부터 연락할까"
version: "2.5.0"
uz: references/uz-lead-triage.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/lead-triage, Apache-2.0)
---

# lead-triage

## 스킬 개요(상세)

리드 분류 — 신규 문의·리드를 구매 가능성 기준으로 분류하고 후속 조치를 배정합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 채널 일반화: 스마트스토어 문의·카카오채널·인스타 DM·전화 문의 통합 분류.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: Telegram 문의가 주 채널 — 봇 수집 리드의 언어(UZ/RU)별 분류·응대 언어 배정 포함. 상세는 `references/uz-lead-triage.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/lead-triage -->
# Lead Triage

## Quick start

Pull inbound leads from HubSpot, score them, and surface a ranked call list with talking points. Drafts follow-ups and proposes calendar slots — never sends or books without owner approval.

```
User: "prioritize my leads"
→ Pull contacts: lifecycle stage Lead or MQL, status ≠ Unqualified
→ Score each across engagement, company fit, urgency, recency
→ Return ranked list (size adapts to volume) with talking points
→ Offer to draft follow-ups and propose calendar slots
```

## Workflow

1. **Pull leads from HubSpot.** Fetch contacts with `lifecyclestage` = `Lead` or `MQL` and `hs_lead_status` ≠ `Unqualified`. Use the field list in [reference/hubspot-scoring.md](reference/hubspot-scoring.md). If HubSpot is unavailable, stop: *"HubSpot is disconnected — connect it and try again."*

2. **Clarify if trigger is ambiguous.** If the user said only "pipeline" without a qualifier, ask: *"Quick pipeline overview (deal stages + total value) or prioritized call list?"* — then route accordingly. Do not score leads on a bare "pipeline."

3. **Score each lead.** Apply the four-dimension model in [reference/hubspot-scoring.md](reference/hubspot-scoring.md):
   - **Engagement** — email replies, opens, site visits in HubSpot (last 30 days only)
   - **Company fit** — industry and employee count vs. owner's ICP (default: any industry, 1–50 employees)
   - **Urgency** — lead age, stage duration, notes containing "urgent / ASAP / deadline / budget approved"
   - **Recency penalty** — subtract points if last activity was <24 hours ago (already touched today)

4. **Build the ranked list.** Sort descending by composite score. Adapt list size to volume:
   - ≤10 leads → show all
   - 11–30 leads → show top 5
   - >30 leads → show top 8

   For each lead: name, company, score, one-paragraph talking point, last activity summary. If engagement signals are all >30 days old, flag: *"Engagement signals are stale — approach as cold outreach."*

5. **Offer follow-up drafts.** Ask: *"Draft follow-ups for any of these?"* If yes, write one email per selected lead, matching the tone of their last outbound thread in Mail. Show draft; do not send.

6. **Offer calendar slots.** Ask: *"Propose call slots for any of these?"* If yes, check Calendar for open 30-minute windows in the next two business days (avoid slots with existing events ±15 min). Propose two options per lead. Do not create events — the owner books.

## Approval gates

- **Never send an email.** Draft only; owner sends from their inbox.
- **Never create calendar events.** Propose times; owner books.
- **Never change lifecycle stage or mark a lead Unqualified** unless the owner explicitly asks.
- **Never include `Customer` or `Evangelist` lifecycle contacts** in the lead list.
- **If zero leads match the filter**, explain why and offer to check what lifecycle stages are in use — do not fabricate a list.

## Reference

- [reference/hubspot-scoring.md](reference/hubspot-scoring.md) — HubSpot field names, scoring weights, ICP defaults
- [reference/gotchas.md](reference/gotchas.md) — edge cases: stale data, zero leads, pipeline disambiguation, customer contamination
- [reference/examples/happy-path-triage.md](reference/examples/happy-path-triage.md) — worked output for a 7-lead list with draft and slot proposal

