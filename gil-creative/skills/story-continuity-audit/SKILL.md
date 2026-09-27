---
name: story-continuity-audit
description: |
  웹툰·웹소설 회차·시나리오·시놉시스·캐릭터 시트·IP 피치의 인물·사건·설정 연속성과 권리 주장을 읽기 전용 검수합니다(원본 수정 없음, PASS/FAIL/미확인 판정) 트리거: "설정 연속성 검수", "캐릭터 설정 충돌 점검", "회차 간 오류 확인", "hikoya izchilligini tekshirish" (UZ)
version: "2.5.0"
---
## 스킬 개요(상세)

웹툰·웹소설 회차, 시나리오, 시놉시스, 캐릭터 시트와 IP 피치 자료의 인물·사건·설정 연속성 및 권리 주장을 읽기 전용으로 대조합니다. 웹툰 이미지 결함은 story-webtoon-qc로 연결합니다.
다음과 같은 요청 시 사용하세요: "설정 연속성 검수", "캐릭터 설정 충돌 점검", "회차 간 오류 확인", "hikoya izchilligini tekshirish" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 자료는 `references/uz-story-continuity-audit.md` 기준을 추가로 적용합니다. 모태 moai-cowork의 `story-continuity-audit`(Apache-2.0) 차용·확장(v2.5.0).


# 서사 연속성 검수

원본을 수정하지 않고 원고·시리즈 설정집·캐릭터 시트·제출 규격을 대조한다.

- 인물의 이름·나이·관계·외형·배경 사실과 Soul ID가 회차·컷마다 일치하는지 위치별로 확인한다. 변경에 이야기 안의 설명이 있는지도 본다.
- 사건의 순서, 원인과 결과, 시간 점프, 세계 규칙을 첫 설정과 후속 회차에서 대조한다.
- 플랫폼 형식이나 공모 제출 요건은 현재 공식 자료와 비교한다. 자료가 없으면 형식 적합성을 PASS로 판정하지 않는다.
- 식별 가능한 타 작품의 표현과 유사한 대사·장면·캐릭터가 있는지 근거를 들어 확인한다. 유사성이 의심될 뿐이면 확정 표절이라고 단정하지 않는다.
- IP 피치의 로그라인·시놉시스·인물 자료·권리 조건을 확인하고, 제작사·공모전·수익 배분 수치는 현재 출처와 대조한다.

보고서는 `판정(PASS/FAIL/미확인)`, `확인 자료`, `요소별 첫 설정·후속 표현`, `심각도·위치·근거가 있는 발견`, `미검증 항목`으로 작성한다. 원고나 설정집이 없으면 연속성을 PASS로 판정하지 않는다. 이미지는 `gil-creative:story-webtoon-qc`로 별도 검수한다. 독립된 검수자를 실행하지 않았다면 독립 감사라고 부르지 않는다.

## GIL 연결 (v2.5.0)

- **검수 대상 산출물**: `gil-creative:story-series-bible` · `gil-creative:story-character-sheet` · `gil-creative:story-webnovel-writer` · `gil-creative:story-webtoon-episode` · `gil-creative:story-screenplay` · `gil-creative:story-ip-pitch` · `gil-creative:story-webtoon-qc`
- **◆최종본 게이트**: 에이전트 `gil-creative:story-production-pipeline`가 ◆최종본을 마감하기 전에 이 검수를 1회 실행한다. ⚡초안·◐작업본에는 자동으로 붙이지 않는다(common-rules §1 등급제).
- **판정 규칙**: 같은 세션에서 산출물을 만든 주체의 자기 검수는 `자체 검수`로 표기하고 독립 감사라고 부르지 않는다. 확인 불가 항목은 `미확인`으로 분리해 PASS에 섞지 않는다.
- **보고서 한국어 품질**: 검수 보고서 자체가 ◆최종본으로 외부 전달되면 `gil:ai-slop-reviewer` → `gil:humanize-korean` 체인을 적용한다.
