---
name: call-list
description: |
  오늘 전화할 톱5 리드 선정 — 이력 기반 통화 포인트와 후속 메시지 초안까지 준비합니다 트리거: "오늘 전화 리스트", "콜리스트 뽑아줘", "누구한테 먼저 전화하지"
version: "2.4.1"
uz: references/uz-call-list.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/call-list, Apache-2.0)
---

# call-list

## 스킬 개요(상세)

오늘 전화할 톱5 리드 선정 — 이력 기반 통화 포인트와 후속 메시지 초안까지 준비합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: lead-triage(분류)의 후속 실행 스킬. 통화 포인트는 구매 이력·문의 맥락 기반.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 통화 대신 Telegram 음성/메시지 선호 관습 — 채널 선택 옵션 포함. 상세는 `references/uz-call-list.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/call-list -->
Run the lead prioritization. Scan the pipeline, rank by urgency and opportunity, pull relevant email context, and get the owner ready to make calls.

Parse arguments:
- `--n` (default: `5`) — number of leads to surface (1–10)
- `--date` (default: today) — date to build the call list for (`YYYY-MM-DD`)

## Step 1 — Pipeline scan

Using the `lead-triage` skill workflow:

1. Pull open HubSpot deals and contacts with activity in the last 30 days.
2. Pull email threads from Mail for each lead (last 3 emails per contact).
3. Score each lead on:
   - **Recency**: days since last owner touchpoint (lower = better)
   - **Stage**: how close to close (later stage = higher priority)
   - **Signal**: any recent inbound activity (email open, reply, calendar hold, web visit)
   - **Value**: deal size from HubSpot

## Step 2 — Rank and select top N

Rank all scored leads and select the top `--n`. For ties, prefer leads with unanswered inbound signals.

For each selected lead, produce a call card:

```
{Rank}. {Contact Name} — {Company}
Deal: ${amount} | Stage: {stage} | Last contact: {X days ago}
Signal: {most recent activity}

TALKING POINTS
• {point from email/deal context}
• {point from email/deal context}
• {open question to ask}

GOAL FOR THIS CALL: {one sentence — advance to next stage / re-engage / close}
```

## Step 3 — Calendar block

For each lead on the list, offer to block 20 minutes on the owner's calendar for the target date.

Show the proposed calendar entries:
```
{time slot} — Call: {Contact Name} ({Company})
```

Wait for owner to confirm which calls to block before creating calendar events.

## Step 4 — Draft follow-ups

For any lead that has an unanswered email older than 3 days, draft a brief follow-up:
```
Subject: Re: {thread subject}

Hi {first name},

{One sentence referencing prior conversation}. {One sentence with a clear next step or question}.

{Sign-off}
```

## Connector failures

If HubSpot is unreachable, stop and tell the owner — lead scoring requires CRM data. If Mail is unreachable, skip Steps 3-4 (email context and follow-ups) and note "Mail not connected — email context and follow-up drafts skipped" in output. If Google Calendar is unreachable, skip calendar blocking and note it.

## Approval gates

- **Never send emails automatically.** Present drafts for owner approval only.
- **Never create calendar blocks without owner confirmation** — show the proposed list first.
- **Never update HubSpot deal stages automatically.**

## Output

Present the ranked call list with talk tracks. Then show proposed calendar blocks and ask for confirmation. Then show follow-up drafts and ask which to send.

