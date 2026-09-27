---
name: monday-brief
description: |
  월요일 아침 1페이지 주간 브리핑 — 현금·매출·파이프라인·이번 주 일정·최우선 3가지를 한 장으로 정리합니다 트리거: "월요일 브리핑 만들어줘", "이번 주 시작 브리핑", "주간 우선순위 정리해줘"
version: "2.5.0"
uz: references/uz-monday-brief.md
origin: anthropics/knowledge-work-plugins@2cf4294 (small-business/monday-brief, Apache-2.0)
---

# monday-brief

## 스킬 개요(상세)

월요일 아침 1페이지 주간 브리핑 — 현금·매출·파이프라인·이번 주 일정·최우선 3가지를 한 장으로 정리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 일 단위 매장 현황은 gil-commerce:commerce-morning-brief, 주 시작 종합 브리핑은 이 스킬. 데이터 소스는 스마트스토어·카페24 MCP 또는 사용자 제공 수치.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ 셀러: Uzum Market 주간 정산 주기(주 1회)·Payme/Click 잔고·Telegram 채널 주문 현황을 브리핑 항목에 포함. 상세는 `references/uz-monday-brief.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: small-business/monday-brief -->
Run the Monday Morning Briefing. Pull from every connector that's live, gracefully degrade when one isn't, and deliver a one-page brief the owner can read in under two minutes.

Parse arguments:
- `--post` (default `none`) — post the brief summary to `slack`, `teams`, or `none`
- `--save-to` (default `files`) — `files` (Google Drive / OneDrive), `desktop` (local), or `both`

## Step 1 — Run business-pulse

Trigger the `business-pulse` skill workflow. It pulls in this order, scoping to whatever is connected:

1. **Cash** — QuickBooks balance + last 7 days of net flow
2. **Sales trend** — PayPal/Square last 7 days vs. prior 7 days, % change, top SKU
3. **Pipeline** — HubSpot deals moved, deals stalled (>14 days no activity), new inbound leads
4. **This week's commitments** — Calendar events with external attendees, deliverable deadlines
5. **Watch-list** — unread Gmail flagged "needs reply," Slack DMs awaiting response
6. **The 3 things** — the three highest-leverage actions for today, ranked

If a connector is missing, note it in the brief ("PayPal not connected — sales trend skipped") rather than failing.

## Step 2 — Format the one-page brief

Layout (markdown, fits on one screen):

```
# Monday Brief — {Mon DD, YYYY}

## Cash
{$X balance · {+/-}$Y net last 7 days · runway note}

## Sales (last 7d vs prior 7d)
{$X total · {+/-}Z% · top SKU: {name} ({$})}

## Pipeline
{N deals moved · M stalled · K new leads}

## Week ahead
- {Tue 10am} — {Customer X discovery call}
- {Thu EOD}  — {Proposal due to Y}
- ...

## Three things that need you today
1. {Highest-leverage action with one-line why}
2. {...}
3. {...}
```

## Step 3 — Save and (optionally) post

1. Save the brief to the chosen `--save-to` location:
   - `files` — Google Drive or OneDrive root, filename `monday-brief-YYYY-MM-DD.md`
   - `desktop` — `~/Desktop/monday-brief-YYYY-MM-DD.md`
   - `both` — both locations
2. If `--post slack` or `--post teams`, post the **Three things** section only (not the full brief — keep the channel post short) and link to the saved file.
3. Show the full brief in chat regardless of save target.

## Approval gates

- **Saving the file is auto.** No approval needed — it's the owner's own drive.
- **Posting to Slack/Teams requires confirmation.** Show the post draft and wait for "post it" before publishing.
- **Never post if the brief surfaces unflattering numbers** (significant cash drop, deal slipping) without explicitly asking the owner — the channel may have non-leadership members.

## Cadence note

This command is designed to run weekly. The owner may schedule it via Cowork's task scheduler — when run on Monday at 7am ET, the output goes straight to their drive and (if configured) Slack/Teams DM channel.

