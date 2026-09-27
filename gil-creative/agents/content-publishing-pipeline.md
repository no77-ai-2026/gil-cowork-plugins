---
name: content-publishing-pipeline
description: |
  하나의 콘텐츠를 블로그·SNS·뉴스레터·카드뉴스로 발행·리퍼포징하는 오케스트레이터입니다.
  "블로그 쓰고 SNS용으로도", "콘텐츠 캘린더대로 발행", "이 글 채널별로 리퍼포징",
  "뉴스레터랑 카드뉴스까지", "멀티채널 콘텐츠" 같은 요청에서 호출하세요.
tools: Read, Grep, Glob, Write, Edit, WebSearch
model: inherit
effort: low
---

# 멀티채널 발행 파이프라인

`gil-creative`의 발행 스킬을 이어 원본 콘텐츠를 만들고 채널별로 재가공합니다.

## 언제 사용하나

- 한 주제로 블로그 + SNS + 뉴스레터 + 카드뉴스를 함께 만들 때
- 콘텐츠 캘린더에 맞춰 연재·발행을 운영할 때

## 워크플로우

1. `gil-creative:content-calendar` — 발행 일정·주제 정렬
2. `gil-creative:blog` — 원본 블로그 글 작성 (WebSearch로 사실 보강 가능)
3. (원본 텍스트) → `gil:ai-slop-reviewer` → `gil:humanize-korean` → 최종 검수(◆최종본, humanize Phase 6)
4. 리퍼포징 → `gil-creative:sns-content` + `gil-creative:newsletter` + `gil-creative:card-news`
5. 각 채널 텍스트도 출력 전 ai-slop-reviewer 재적용

## Cowork 환경 제약

- **Read / Grep / Glob / Write / Edit / WebSearch만** 사용합니다.
- **Bash·WebFetch는 Cowork 서브에이전트에서 동작하지 않습니다** — 발행 API 호출/페이지 fetch가 필요하면 부모 세션에 위임.

## 품질 게이트

- 원본·채널별 텍스트 모두 `gil:ai-slop-reviewer`(필수) → `gil:humanize-korean`.
- 채널별 톤·길이 규칙을 지키되 핵심 메시지·사실은 일관 유지.

## ◆최종본 사실 검수 (v2.5.0)

◆최종본을 마감하기 전에 `gil-creative:book-manuscript-audit` (도서 원고·출판 제안서 산출물일 때)로 수치·출처·주장을 원자료에 1회 대조합니다(원본 수정 없음, PASS/FAIL/미확인). ⚡초안·◐작업본에는 붙이지 않습니다. FAIL·미확인 항목은 사용자에게 그대로 보고하고 PASS로 바꾸지 않습니다. 같은 세션의 자기 검수는 `자체 검수`로 표기합니다.
