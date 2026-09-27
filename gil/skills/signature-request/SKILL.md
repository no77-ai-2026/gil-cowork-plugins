---
name: signature-request
description: |
  전자서명 라우팅 — 서명 전 체크리스트, 서명 순서 구성, 발송 준비를 정리합니다 트리거: "전자서명 보내줘", "서명 순서 정리", "계약 체결 준비 체크"
version: "2.5.0"
uz: references/uz-signature-request.md
origin: anthropics/knowledge-work-plugins@2cf4294 (legal/signature-request, Apache-2.0)
---

# signature-request

## 스킬 개요(상세)

전자서명 라우팅 — 서명 전 체크리스트, 서명 순서 구성, 발송 준비를 정리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: 한국 맥락: 전자서명법상 효력·모두싸인/글로싸인 등 국내 서비스 일반화. 날인(법인인감 vs 사용인감) 구분 체크 포함.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 전자서명(ERI) 키 관습·정부 포털 제출용 서명 요건. 상세는 `references/uz-signature-request.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: legal/signature-request -->
# /signature-request -- E-Signature Routing

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../../CONNECTORS.md).

Prepare a document for electronic signature — verify completeness, set signing order, and route for execution.

**Important**: This command assists with legal workflows but does not provide legal advice. Verify documents are in final form before sending for signature.

## Usage

```
/signature-request $ARGUMENTS
```

Prepare for signature: @$1

## Workflow

### Step 1: Accept the Document

Accept the document in any format:
- **File upload**: PDF, DOCX
- **URL**: Link to a document in ~~cloud storage or ~~CLM
- **Reference**: "The Acme Corp MSA we finalized yesterday"

### Step 2: Pre-Signature Checklist

Before routing for signature, verify:

```markdown
## Pre-Signature Checklist

- [ ] Document is in final, agreed form (no open redlines)
- [ ] All exhibits and schedules are attached
- [ ] Correct legal entity names on signature blocks
- [ ] Dates are correct or left blank for execution date
- [ ] Signature blocks match the authorized signers
- [ ] Any required internal approvals have been obtained
- [ ] Document has been reviewed by appropriate counsel
```

### Step 3: Configure Signing

Gather signing details:
- **Signers**: Who needs to sign? (names, emails, titles)
- **Signing order**: Sequential or parallel?
- **Internal approval**: Does anyone need to approve before the counterparty signs?
- **CC recipients**: Who should receive a copy of the executed document?

### Step 4: Route for Signature

**If ~~e-signature is connected:**
- Create the signature envelope/request
- Set signing fields and order
- Add any required initials or date fields
- Send for signature

**If not connected:**
- Generate a signing instruction document
- Provide the document formatted for wet signature or manual e-sign
- List all signers with contact information

## Output

```markdown
## Signature Request: [Document Title]

### Document Details
- **Type**: [MSA / NDA / SOW / Amendment / etc.]
- **Parties**: [Party A] and [Party B]
- **Pages**: [X]

### Pre-Signature Check: [PASS / ISSUES FOUND]
[List any issues that need attention before sending]

### Signing Configuration
| Order | Signer | Email | Role |
|-------|--------|-------|------|
| 1 | [Name] | [email] | [Party A Authorized Signatory] |
| 2 | [Name] | [email] | [Party B Authorized Signatory] |

### CC Recipients
- [Name] — [email]

### Status
[Sent for signature / Ready to send / Issues to resolve first]

### Next Steps
- [What to expect after sending]
- [Expected turnaround time]
- [Follow-up if not signed within X days]
```

## Tips

1. **Check entity names carefully** — The most common signing error is incorrect legal entity names.
2. **Verify authority** — Make sure each signer is authorized to bind their organization.
3. **Keep a copy** — Executed copies should be filed in ~~cloud storage or ~~CLM immediately after execution.

