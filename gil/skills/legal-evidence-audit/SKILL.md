---
name: legal-evidence-audit
description: |
  계약 검토·법령 조사·규제·특허 보고서의 인용 검증 기록·적용 시점·위험 등급·누락 쟁점을 원자료에 대조합니다(원본 수정 없음, PASS/FAIL/미확인 판정) 트리거: "법무 보고서 인용 검수", "계약 검토 근거 대조", "특허 보고서 출처 점검", "huquqiy hisobot manbalarini tekshirish" (UZ)
version: "2.5.0"
---
## 스킬 개요(상세)

계약 검토·법령 조사·규제·특허 보고서의 인용 검증 기록, 적용 시점, 위험 등급과 누락 쟁점을 원자료에 대조합니다. 원본을 수정하지 않는 제출 전 검수에 사용합니다.
다음과 같은 요청 시 사용하세요: "법무 보고서 인용 검수", "계약 검토 근거 대조", "특허 보고서 출처 점검", "huquqiy hisobot manbalarini tekshirish" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 자료는 `references/uz-legal-evidence-audit.md` 기준을 추가로 적용합니다. 모태 moai-cowork의 `legal-evidence-audit`(Apache-2.0) 차용·확장(v2.5.0).


# 법무 산출물 근거 검수

원본을 수정하지 않고 산출물에 남긴 원문과 검증 기록을 대조한다.

- 법령 조문마다 실제 원문과 `verify_citations` 결과 또는 공식 웹 원문 대조 기록을 확인한다. 판례는 조문 검증만으로 확인됐다고 보지 않고 별도의 `cite_check` 결과 또는 공식 판례 원문·상태 기록을 확인한다. 웹 기록은 URL·확인일·시행일 또는 선고일·인용 원문을 포함해야 한다.
- 사건 발생 시점과 적용 법령 버전이 맞는지 확인한다. 과거 사실에 현행 조문을 썼다면 `applicable_law` 근거나 별도의 공식 원문 대조가 있는지 확인한다.
- 위험 등급이 사실관계와 인용 근거에서 도출되는지 확인한다. 같은 결함에 서로 다른 등급을 매겼다면 이유가 있는지 본다.
- 해당 전담 스킬의 계약·NDA·규제 점검 항목 가운데 빠진 쟁점을 기록한다. 검토하지 않은 항목을 문제없음으로 처리하지 않는다.
- GIL 인용 4분류(`VERIFIED`·`SECONDARY`·`NOT_FOUND`·`MISMATCH`)가 인용마다 붙었는지, `SECONDARY`에 `⚠ 원문 재확인 필요`가 병기됐는지, ◆Deep 모드에서 `SECONDARY`를 결론 근거로 쓰지 않았는지 확인한다(`gil:contract-review` `references/legal-citation-rules.md`).
- `법률 자문이 아닌 참고 자료` 고지가 있는지 확인한다. 검증 기록이 없거나 자료에 접근할 수 없는 인용은 미확인으로 분리한다.

보고서는 `판정(PASS/FAIL/미확인)`, `확인 자료`, `인용별 원문·도구 결과 또는 공식 웹 대조 기록`, `심각도·위치·근거가 있는 발견`, `미검증 항목`으로 작성한다. 검증 기록이 없는 범위를 PASS로 판정하지 않는다. 독립된 검수자를 실행하지 않았다면 독립 감사라고 부르지 않는다.

## GIL 연결 (v2.5.0)

- **검수 대상 산출물**: `gil:contract-review` · `gil:nda-triage` · `gil:legal-risk` · `gil:compliance-check` · `gil:law-research` · `gil:legal-ip-search-report`
- **◆최종본 게이트**: 에이전트 `gil:legal-review-coordinator`가 ◆최종본을 마감하기 전에 이 검수를 1회 실행한다. ⚡초안·◐작업본에는 자동으로 붙이지 않는다(common-rules §1 등급제).
- **판정 규칙**: 같은 세션에서 산출물을 만든 주체의 자기 검수는 `자체 검수`로 표기하고 독립 감사라고 부르지 않는다. 확인 불가 항목은 `미확인`으로 분리해 PASS에 섞지 않는다.
- **보고서 한국어 품질**: 검수 보고서 자체가 ◆최종본으로 외부 전달되면 `gil:ai-slop-reviewer` → `gil:humanize-korean` 체인을 적용한다.
