---
name: call-prep
description: |
  영업 통화·미팅 준비 — 어카운트 맥락·참석자 리서치·제안 어젠다를 준비합니다 트리거: "내일 미팅 준비해줘", "영업 콜 프렙", "참석자 파악하고 어젠다 짜줘"
version: "2.5.0"
uz: references/uz-call-prep.md
origin: anthropics/knowledge-work-plugins@2cf4294 (sales/call-prep, Apache-2.0)
---

# call-prep

## 스킬 개요(상세)

영업 통화·미팅 준비 — 어카운트 맥락·참석자 리서치·제안 어젠다를 준비합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [경계] 일반 회의 진행은 gil:meeting-facilitator — 이 스킬은 영업 맥락 전용.

**도구 일반화**: 원문의 미국 SaaS 연동(QuickBooks·HubSpot·PayPal·Gusto 등)은 방법론으로만 계승한다 — 한국 실무에서는 스마트스토어·카페24 MCP(gil-commerce 설치 시), 엑셀/CSV 업로드, 사용자 제공 수치를 소스로 쓰고, 해당 커넥터가 연결된 경우에만 직접 조회한다.

**UZ 컨텍스트**: UZ: 관계 중심 상담 관습 — 스몰토크·신뢰 형성 단계를 어젠다 앞에 배치. 상세는 `references/uz-call-prep.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: sales/call-prep -->
# Call Prep

Get fully prepared for any sales call in minutes. This skill works with whatever context you provide, and gets significantly better when you connect your sales tools.

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        CALL PREP                                 │
├─────────────────────────────────────────────────────────────────┤
│  ALWAYS (works standalone)                                       │
│  ✓ You tell me: company, meeting type, attendees                │
│  ✓ Web search: recent news, funding, leadership changes         │
│  ✓ Company research: what they do, size, industry               │
│  ✓ Output: prep brief with agenda and questions                 │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + CRM: account history, contacts, opportunities, activities    │
│  + Email: recent threads, open questions, commitments           │
│  + Chat: internal discussions, colleague insights               │
│  + Transcripts: prior call recordings, key moments              │
│  + Calendar: auto-find meeting, pull attendees                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

When you run this skill, I'll ask for what I need:

**Required:**
- Company or contact name
- Meeting type (discovery, demo, negotiation, check-in, etc.)

**Helpful if you have it:**
- Who's attending (names and titles)
- Any context you want me to know (paste prior notes, emails, etc.)

If you've connected your CRM, email, or other tools, I'll pull context automatically and skip the questions.

---

## Connectors (Optional)

Connect your tools to supercharge this skill:

| Connector | What It Adds |
|-----------|--------------|
| **CRM** | Account details, contact history, open deals, recent activities |
| **Email** | Recent threads with the company, open questions, attachments shared |
| **Chat** | Internal chat discussions (e.g. Slack) about the account, colleague insights |
| **Transcripts** | Prior call recordings, topics covered, competitor mentions |
| **Calendar** | Auto-find the meeting, pull attendees and description |

> **No connectors?** No problem. Just tell me about the meeting and paste any context you have. I'll research the rest.

---

## Output Format

```markdown
# Call Prep: [Company Name]

**Meeting:** [Type] — [Date/Time if known]
**Attendees:** [Names with titles]
**Your Goal:** [What you want to accomplish]

---

## Account Snapshot

| Field | Value |
|-------|-------|
| **Company** | [Name] |
| **Industry** | [Industry] |
| **Size** | [Employees / Revenue if known] |
| **Status** | [New prospect / Active opportunity / Customer] |
| **Last Touch** | [Date and summary] |

---

## Who You're Meeting

### [Name] — [Title]
- **Background:** [Career history, education if found]
- **LinkedIn:** [URL]
- **Role in Deal:** [Decision maker / Champion / Evaluator / etc.]
- **Last Interaction:** [Summary if known]
- **Talking Point:** [Something personal/professional to reference]

[Repeat for each attendee]

---

## Context & History

**What's happened so far:**
- [Key point from prior interactions]
- [Open commitments or action items]
- [Any concerns or objections raised]

**Recent news about [Company]:**
- [News item 1 — why it matters]
- [News item 2 — why it matters]

---

## Suggested Agenda

1. **Open** — [Reference last conversation or trigger event]
2. **[Topic 1]** — [Discovery question or value discussion]
3. **[Topic 2]** — [Address known concern or explore priority]
4. **[Topic 3]** — [Demo section / Proposal review / etc.]
5. **Next Steps** — [Propose clear follow-up with timeline]

---

## Discovery Questions

Ask these to fill gaps in your understanding:

1. [Question about their current situation]
2. [Question about pain points or priorities]
3. [Question about decision process and timeline]
4. [Question about success criteria]
5. [Question about other stakeholders]

---

## Potential Objections

| Objection | Suggested Response |
|-----------|-------------------|
| [Likely objection based on context] | [How to address it] |
| [Common objection for this stage] | [How to address it] |

---

## Internal Notes

[Any internal chat context (e.g. Slack), colleague insights, or competitive intel]

---

## After the Call

Run **call-follow-up** to:
- Extract action items
- Update your CRM
- Draft follow-up email
```

---

## Execution Flow

### Step 1: Gather Context

**If connectors available:**
```
1. Calendar → Find upcoming meeting matching company name
   - Pull: title, time, attendees, description, attachments

2. CRM → Query account
   - Pull: account details, all contacts, open opportunities
   - Pull: last 10 activities, any account notes

3. Email → Search recent threads
   - Query: emails with company domain (last 30 days)
   - Extract: key topics, open questions, commitments

4. Chat → Search internal discussions
   - Query: company name mentions (last 30 days)
   - Extract: colleague insights, competitive intel

5. Transcripts → Find prior calls
   - Pull: call recordings with this account
   - Extract: key moments, objections raised, topics covered
```

**If no connectors:**
```
1. Ask user:
   - "What company are you meeting with?"
   - "What type of meeting is this?"
   - "Who's attending? (names and titles if you know)"
   - "Any context you want me to know? (paste notes, emails, etc.)"

2. Accept whatever they provide and work with it
```

### Step 2: Research Supplement

**Always run (web search):**
```
1. "[Company] news" — last 30 days
2. "[Company] funding" — recent announcements
3. "[Company] leadership" — executive changes
4. "[Company] + [industry] trends" — relevant context
5. Attendee LinkedIn profiles — background research
```

### Step 3: Synthesize & Generate

```
1. Combine all sources into unified context
2. Identify gaps in understanding → generate discovery questions
3. Anticipate objections based on stage and history
4. Create suggested agenda tailored to meeting type
5. Output formatted prep brief
```

---

## Meeting Type Variations

### Discovery Call
- Focus on: Understanding their world, pain points, priorities
- Agenda emphasis: Questions > Talking
- Key output: Qualification signals, next step proposal

### Demo / Presentation
- Focus on: Their specific use case, tailored examples
- Agenda emphasis: Show relevant features, get feedback
- Key output: Technical requirements, decision timeline

### Negotiation / Proposal Review
- Focus on: Addressing concerns, justifying value
- Agenda emphasis: Handle objections, close gaps
- Key output: Path to agreement, clear next steps

### Check-in / QBR
- Focus on: Value delivered, expansion opportunities
- Agenda emphasis: Review wins, surface new needs
- Key output: Renewal confidence, upsell pipeline

---

## Tips for Better Prep

1. **More context = better prep** — Paste emails, notes, anything you have
2. **Name the attendees** — Even just titles help me research
3. **State your goal** — "I want to get them to agree to a pilot"
4. **Flag concerns** — "They mentioned budget is tight"

---

## Related Skills

- **account-research** — Deep dive on a company before first contact
- **call-follow-up** — Process call notes and execute post-call workflow
- **draft-outreach** — Write personalized outreach after research

