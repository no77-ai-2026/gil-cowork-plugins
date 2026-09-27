---
name: sprint-planning
description: |
  스프린트 플래닝 — 범위 산정·캐파 추정·목표 설정·스프린트 플랜 초안을 만듭니다 트리거: "스프린트 계획 짜줘", "백로그 사이징", "이번 스프린트 목표"
version: "2.4.0"
uz: references/uz-sprint-planning.md
origin: anthropics/knowledge-work-plugins@2cf4294 (product-management/sprint-planning, Apache-2.0)
---

# sprint-planning

## 스킬 개요(상세)

스프린트 플래닝 — 범위 산정·캐파 추정·목표 설정·스프린트 플랜 초안을 만듭니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [경계] 제품 스펙은 gil:spec-writer, 로드맵은 gil:roadmap-manager.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 분산 팀(한국-타슈켄트) 시차 4시간 기준 세리머니 시간대 제안. 상세는 `references/uz-sprint-planning.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: product-management/sprint-planning -->
# /sprint-planning

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Plan a sprint by scoping work, estimating capacity, and setting clear goals.

## Usage

```
/sprint-planning $ARGUMENTS
```

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRINT PLANNING                                 │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                       │
│  ✓ Define sprint goals and success criteria                     │
│  ✓ Estimate team capacity (accounting for PTO, meetings)        │
│  ✓ Scope and prioritize backlog items                           │
│  ✓ Identify dependencies and risks                              │
│  ✓ Generate sprint plan document                                │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + Project tracker: Pull backlog, create sprint, assign items   │
│  + Calendar: Account for PTO and meetings in capacity           │
│  + Chat: Share sprint plan with the team                        │
└─────────────────────────────────────────────────────────────────┘
```

## What I Need From You

- **Team**: Who's on the team and their availability this sprint?
- **Sprint length**: How many days/weeks?
- **Backlog**: What's prioritized? (Pull from tracker, paste, or describe)
- **Carryover**: Anything unfinished from last sprint?
- **Dependencies**: Anything blocked on other teams?

## Output

```markdown
## Sprint Plan: [Sprint Name]
**Dates:** [Start] — [End] | **Team:** [X] engineers
**Sprint Goal:** [One clear sentence about what success looks like]

### Capacity
| Person | Available Days | Allocation | Notes |
|--------|---------------|------------|-------|
| [Name] | [X] of [Y] | [X] points/hours | [PTO, on-call, etc.] |
| **Total** | **[X]** | **[X] points** | |

### Sprint Backlog
| Priority | Item | Estimate | Owner | Dependencies |
|----------|------|----------|-------|--------------|
| P0 | [Must ship] | [X] pts | [Person] | [None / Blocked by X] |
| P1 | [Should ship] | [X] pts | [Person] | [None] |
| P2 | [Stretch] | [X] pts | [Person] | [None] |

### Planned Capacity: [X] points | Sprint Load: [X] points ([X]% of capacity)

### Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [What happens] | [What to do] |

### Definition of Done
- [ ] Code reviewed and merged
- [ ] Tests passing
- [ ] Documentation updated (if applicable)
- [ ] Product sign-off

### Key Dates
| Date | Event |
|------|-------|
| [Date] | Sprint start |
| [Date] | Mid-sprint check-in |
| [Date] | Sprint end / Demo |
| [Date] | Retro |
```

## Tips

1. **Leave buffer** — Plan to 70-80% capacity. You will get interrupts.
2. **One clear sprint goal** — If you can't state it in one sentence, the sprint is unfocused.
3. **Identify stretch items** — Know what to cut if things take longer than expected.
4. **Carry over honestly** — If something didn't ship, understand why before re-committing.

