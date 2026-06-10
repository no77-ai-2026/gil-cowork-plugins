---
name: humanize-korean
description: |
  한국어 AI 글쓰기 패턴을 정밀 검수하고 자연스러운 한국어로 다듬는 스킬 (정본 위임 포인터).
  ai-slop-reviewer의 다음 단계로 호출되며, 실제 윤문은 정본 SSOT인 gil-content:humanize-korean(풀버전)에 위임합니다.

  다음 요청 시 이 스킬을 사용하세요:
  - "한국어 AI 패턴 검수", "한국어 자연스럽게 다듬어줘", "humanize-korean"
  - "AI 티 나는 한국어 표현 고쳐줘", "더 한국어답게"
  - "ai-slop 다음 단계로 한 번 더 검수"
  - 텍스트 산출물 체인의 ai-slop-reviewer 다음 단계

  ai-slop-reviewer가 잡지 못한 한국어 특화 패턴 (어색한 조사·미묘한 반복·번역체 등)을 추가 검수.
user-invocable: true
version: 1.0.1
---

# humanize-korean — 한국어 특화 AI 검수 (정본 위임 포인터)

> gil 코어 | ai-slop-reviewer 다음 단계 (한국어 전용)

## 이 스킬의 역할

본 코어 스킬은 표준 텍스트 체인에서 **"한국어 정밀 검수 단계"의 진입점(포인터)** 입니다.
실제 검수·윤문 로직과 분류 체계(taxonomy)·메트릭·플레이북은 **정본(SSOT)** 인
**`gil-content:humanize-korean`** 에 단일화되어 있습니다 (GIL CLAUDE.md § 핵심 원칙 7 휴머나이징 SSOT).

중복 taxonomy를 코어에 따로 두지 않습니다. 한국어 정밀 윤문이 필요하면 아래 정본을 호출하세요.

## 정본 위임

```
한국어 정밀 검수 요청
  → gil-content:humanize-korean   ★ 정본 (40+ 패턴 taxonomy · scripts/metrics.py·metrics_v2.py · baseline)
```

정본이 제공하는 것:
- 10대 카테고리 × 60+ 서브패턴 SSOT (`references/ai-tell-taxonomy.md`, 587줄)
- 정량 메트릭 v1.6 + v2.0 (post-editese 3축 · 번역투 8종 T1~T8) — `scripts/metrics.py` · `scripts/metrics_v2.py`
- 변경률 가드(30% 초과 경고 · 50% 초과 강제 중단), 등급 판정, 학술 근거(`references/scholarship.md`)

## 표준 체인 위치

```
[표준 텍스트 산출물 체인]
  도메인 스킬 (blog·card-news·strategy-planner 등)
  → gil-office:* (DOCX·PDF·HTML 변환)
  → gil:ai-slop-reviewer        (1차 영·한 공통 AI 슬롭 검수)
  → gil-content:humanize-korean (2차 한국어 정밀 윤문 · 정본)  ★ 본 포인터가 가리키는 단계
  → gil-content:korean-spell-check (최종 맞춤법·띄어쓰기)
```

선택적 단계 — 한국어 출력일 때만 호출. 영어·러시아어·우즈벡어는 스킵.

## 참고

- 정본: `gil-content:humanize-korean` (풀버전 SSOT)
- 최종 맞춤법: `gil-content:korean-spell-check`
- 1차 일반 검수: `gil:ai-slop-reviewer`
