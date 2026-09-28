---
name: commerce-margin-audit
description: |
  상품 등록안·상세페이지·가격표·광고·프로모션 계획의 원가·수수료·할인·마진 계산을 읽기 전용 재검산합니다(원본 수정 없음, PASS/FAIL/미확인 판정) 트리거: "마진 계산 검수해줘", "상세페이지 가격 대조", "프로모션 손익 재검산", "marja hisobini tekshirish" (UZ)
version: "2.6.0"
---
## 스킬 개요(상세)

상품 등록안·상세페이지·가격표·광고 및 프로모션 계획의 원가, 수수료, 할인과 마진 계산을 읽기 전용으로 재검산합니다. 채널 제약과 주장 근거도 함께 확인합니다.
다음과 같은 요청 시 사용하세요: "마진 계산 검수해줘", "상세페이지 가격 대조", "프로모션 손익 재검산", "marja hisobini tekshirish" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 자료는 `references/uz-commerce-margin-audit.md` 기준을 추가로 적용합니다. 모태 moai-cowork의 `commerce-margin-audit`(Apache-2.0) 차용·확장(v2.5.0).


# 판매 수익성 검수

원본을 수정하지 않고 상품 자료와 산출물의 수치·주장을 대조한다.

- 판매가에서 상품 원가, 채널 수수료, 결제 수수료, 배송·포장, 단위당 광고비를 빼 공헌이익을 다시 계산한다. 할인 중복과 손익분기 수량·ROAS 목표도 입력값으로 재계산한다.
- 상세페이지 문구와 계산표의 가격·할인율·기간이 일치하는지 확인한다. 빠진 비용 항목과 근거 없는 벤치마크를 기록한다.
- 해당 마켓의 현재 글자 수·이미지 규칙·수수료와 금지 주장을 확인한다. 최신 기준을 확인하지 못하면 채널 준수 PASS를 내지 않는다.
- 광고·상품 주장의 근거와 발송·플랫폼 변경 승인 기록을 확인한다. 실제로 수행하지 않은 외부 변경을 완료로 적지 않았는지 본다.

보고서는 `판정(PASS/FAIL/미확인)`, `확인 자료`, `비용별 재계산`, `심각도·위치·근거가 있는 발견`, `미검증 항목`으로 작성한다. 원가·수수료 자료가 없으면 마진 정확성을 PASS로 판정하지 않는다. 독립된 검수자를 실행하지 않았다면 독립 감사라고 부르지 않는다.

## GIL 연결 (v2.5.0)

- **검수 대상 산출물**: `gil-commerce:commerce-margin-calculator` · `gil-commerce:price-check` · `gil-commerce:commerce-promotion-planner` · `gil-commerce:detail-page-copy` · `gil-commerce:commerce-ad-claim-compliance-kr`
- **◆최종본 게이트**: 에이전트 `gil-commerce:commerce-growth-analyst`·`gil-commerce:commerce-launch-coordinator`가 ◆최종본을 마감하기 전에 이 검수를 1회 실행한다. ⚡초안·◐작업본에는 자동으로 붙이지 않는다(common-rules §1 등급제).
- **판정 규칙**: 같은 세션에서 산출물을 만든 주체의 자기 검수는 `자체 검수`로 표기하고 독립 감사라고 부르지 않는다. 확인 불가 항목은 `미확인`으로 분리해 PASS에 섞지 않는다.
- **보고서 한국어 품질**: 검수 보고서 자체가 ◆최종본으로 외부 전달되면 `gil:ai-slop-reviewer` → `gil:humanize-korean` 체인을 적용한다.
