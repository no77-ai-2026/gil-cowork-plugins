---
name: policy-lookup
description: |
  사내 규정 조회 — 취업규칙·정책 문서를 찾아 쉬운 말로 답합니다 트리거: "연차 규정 알려줘", "재택 정책 어떻게 돼", "경조휴가 며칠이야"
version: "2.5.0"
uz: references/uz-policy-lookup.md
origin: anthropics/knowledge-work-plugins@2cf4294 (human-resources/policy-lookup, Apache-2.0)
---

# policy-lookup

## 스킬 개요(상세)

사내 규정 조회 — 취업규칙·정책 문서를 찾아 쉬운 말로 답합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 규정 문서(.gil/refs 또는 업로드) 기반 답변 + 근로기준법 최저 기준 대조(korean-law MCP). 규정 부재 시 법정 기준 안내.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: UZ 노동법 기준 병기 옵션(연차 15일+ 등) — 원문 확인 제약 시 SECONDARY 표기. 상세는 `references/uz-policy-lookup.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: human-resources/policy-lookup -->
# /policy-lookup

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Look up and explain company policies in plain language. Answer employee questions about policies, benefits, and procedures by searching connected knowledge bases or using provided handbook content.

## Usage

```
/policy-lookup $ARGUMENTS
```

Search for policies matching: $ARGUMENTS

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    POLICY LOOKUP                                   │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                       │
│  ✓ Ask any policy question in plain language                    │
│  ✓ Paste your employee handbook and I'll search it              │
│  ✓ Get clear, jargon-free answers                               │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + Knowledge base: Search handbook and policy docs automatically │
│  + HRIS: Pull employee-specific details (PTO balance, benefits) │
└─────────────────────────────────────────────────────────────────┘
```

## Common Policy Topics

- **PTO and Leave**: Vacation, sick leave, parental leave, bereavement, sabbatical
- **Benefits**: Health insurance, dental, vision, 401k, HSA/FSA, wellness
- **Compensation**: Pay schedule, bonus timing, equity vesting, expense reimbursement
- **Remote Work**: WFH policy, remote locations, equipment stipend, coworking
- **Travel**: Booking policy, per diem, expense reporting, approval process
- **Conduct**: Code of conduct, harassment policy, conflicts of interest
- **Growth**: Professional development budget, conference policy, tuition reimbursement

## How to Answer

1. Search ~~knowledge base for the relevant policy document
2. Provide a clear, plain-language answer
3. Quote the specific policy language
4. Note any exceptions or special cases
5. Point to who to contact for edge cases

**Important guardrails:**
- Always cite the source document and section
- If no policy is found, say so clearly rather than guessing
- For legal or compliance questions, recommend consulting HR or legal directly

## Output

```markdown
## Policy: [Topic]

### Quick Answer
[1-2 sentence direct answer to their question]

### Details
[Relevant policy details, explained in plain language]

### Exceptions / Special Cases
[Any relevant exceptions or edge cases]

### Who to Contact
[Person or team for questions beyond what's documented]

### Source
[Where this information came from — document name, page, or section]
```

## If Connectors Available

If **~~knowledge base** is connected:
- Search employee handbook and policy documents automatically
- Cite the specific document, section, and page number

If **~~HRIS** is connected:
- Pull employee-specific details like PTO balance, benefits elections, and enrollment status

## Tips

1. **Ask in plain language** — "Can I work from Europe for a month?" is better than "international remote work policy."
2. **Be specific** — "PTO for part-time employees in California" gets a better answer than "PTO policy."

