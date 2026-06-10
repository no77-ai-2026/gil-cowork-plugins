# gil-design — Claude Design 보조 플러그인 (한·UZ 듀얼)

[claude.ai/design](https://claude.ai/design)에서 디자인을 만들 때 **그 앞과 뒤를 받쳐 주는** Cowork 플러그인입니다. Claude Design 자체를 대체하지 않습니다 — 더 좋은 입력을 만들어 주고, 결과물을 잘 활용하도록 돕습니다.

[![버전](https://img.shields.io/badge/version-2.13.0-blue)](../CHANGELOG.md)
[![라이선스](https://img.shields.io/badge/license-MIT-green)](../LICENSE)
[![스킬](https://img.shields.io/badge/skills-5-success)](#스킬-5종)

한국 SaaS·D2C·공공 UI 표준과 **UZ 한인사회 트릴링구얼(한·러·우즈벡) 디자인 컨텍스트**를 함께 지원합니다. 각 스킬의 `references/uz-*.md`가 키릴·라틴 폰트, 러시아어 장문 레이아웃, Telegram·Uzum 채널 규격 등 UZ 시장 보강 항목을 담습니다.

## 왜 필요한가

| Claude Design이 하는 일 | 이 플러그인이 받쳐 주는 일 |
|---|---|
| 브리프 → 시안 → 핸드오프 번들 | **브리프 작성**을 6요소 템플릿으로 자동화 |
| 디자인 시스템 자동 추출 | **업로드 직전 자산을 합성·정리** |
| 자연어 프롬프트 처리 | **시니어 UX 10패턴** 중 적합한 것 자동 선택 |
| 핸드오프 번들 생성 | **번들 분석·요약 + Claude Code 지시 자동 생성** |
| 카피 생성 | **AI 슬롭 패턴 검수** (영문·한국어·러시아어·우즈벡어) |

전체 동선:

```
[1] gil-design:claude-design-system-prep  ← 자산 합성
        ↓ (DESIGN.md 업로드)
[2] claude.ai/design  ← 디자인 시스템 셋업
        ↓
[3] gil-design:claude-design-brief        ← 브리프 작성
[3] gil-design:claude-design-prompt-builder ← 시니어 UX 프롬프트
        ↓ (프롬프트 복붙)
[4] claude.ai/design  ← 시안 생성·리파인
        ↓
[5] gil-design:claude-design-slop-check   ← 결과 카피 검수
        ↓ (필요 시 humanize-korean)
[6] Claude Code 핸드오프 번들 다운로드
        ↓
[7] gil-design:claude-design-handoff-reader ← 번들 분석·요약
        ↓
[8] Claude Code로 구현
```

## 스킬 5종

| 스킬 | 사용 시점 | 결과물 |
|---|---|---|
| [`claude-design-brief`](./skills/claude-design-brief/) | Claude Design 프롬프트 작성 단계 | 6요소(Project·Audience·Pages·Tone·Reference·Constraints) 복붙용 프롬프트 |
| [`claude-design-system-prep`](./skills/claude-design-system-prep/) | 디자인 시스템 셋업 직전 | 업로드용 DESIGN.md + 자산 정리 가이드 |
| [`claude-design-prompt-builder`](./skills/claude-design-prompt-builder/) | 특정 UX 영역(IA·온보딩·접근성 등) 작업 | 시니어 UX 10패턴 중 적합 프롬프트 |
| [`claude-design-handoff-reader`](./skills/claude-design-handoff-reader/) | Claude Design → Claude Code 직전 | 번들 요약 + Claude Code 지시 1줄 |
| [`claude-design-slop-check`](./skills/claude-design-slop-check/) | Claude Design 카피 결과물 검수 | AI 슬롭 패턴 검수 리포트 + 수정 제안 |

## 한·UZ 듀얼 컨텍스트

UZ 한인사회(약 17만명)·CIS 시장 디자인 작업 시 다음을 함께 고려합니다. 상세는 각 스킬의 `references/uz-*.md` 참조.

- **트릴링구얼 UI** — 한국어 + 러시아어(공용·디지털 1순위) + 우즈벡어(라틴·키릴)
- **레이아웃** — 러시아어 텍스트는 한국어 대비 1.3~1.6배 길어 간격·줄바꿈 토큰에 여유 필요
- **폰트** — 키릴·라틴 글리프 커버리지 필수
- **채널** — 모바일 우선(Android ~92%), Telegram·Uzum·Yandex 채널 규격
- **슬롭 검수** — 영문·한국어 외 러시아어·우즈벡어 진부 표현 사전 적용

## 빠른 시작

### 시나리오 1 — 디자인 시스템 셋업

```
1. Cowork에서 /claude-design-system-prep 호출
2. 브랜드 자산 폴더 경로 또는 자사 URL 제공
3. 결과 DESIGN.md를 claude.ai/design 온보딩에 업로드
4. Published 토글 ON
```

### 시나리오 2 — 시안 작성

```
1. Cowork에서 /claude-design-brief 호출
2. "마케팅 자동화 SaaS 가격 페이지" 같이 한 문장 입력
3. 누락된 요소를 AskUserQuestion으로 보완
4. 완성된 프롬프트를 claude.ai/design 채팅에 복붙
```

### 시나리오 3 — 핸드오프

```
1. Claude Design에서 "Hand off to Claude Code" → 번들 다운로드
2. Cowork에서 /claude-design-handoff-reader 호출 + 번들 경로 제공
3. 요약 + Claude Code 지시 1줄을 받음
4. Claude Code에 그대로 붙여 넣어 구현 시작
```

## Claude Design 가이드

이 플러그인의 배경 지식은 모태(modu-ai) docs-site의 **클로드 디자인** 섹션에 정리되어 있습니다: [cowork.mo.ai.kr/claude-design](https://cowork.mo.ai.kr/claude-design/).

특히 다음 페이지를 먼저 읽기를 권장합니다.

- [디자인 시스템 설정](https://cowork.mo.ai.kr/claude-design/design-system/) — 본 플러그인의 가장 큰 효과
- [리파인먼트](https://cowork.mo.ai.kr/claude-design/refinement/) — 시니어 UX 10패턴
- [내보내기·핸드오프](https://cowork.mo.ai.kr/claude-design/export-handoff/) — 핸드오프 번들 내부 구조
- [베스트 프랙티스](https://cowork.mo.ai.kr/claude-design/best-practices/) — 통합 프롬프트 템플릿

## 관련 플러그인

| 플러그인 | 함께 쓰는 시점 |
|---|---|
| `gil-content:humanize-korean` | slop-check 후 한국어 카피 자연화 |
| `gil-content:landing-page` | Claude Design 대안 — 랜딩 페이지 카피·구조 |
| `gil-marketing:brand-identity` | system-prep 전 브랜드 정체성 정의 |
| `gil-product:ux-designer` | Claude Design과 별개의 UX 분석 (Nielsen·WCAG) |
| `gil-office:pptx-designer` | Claude Design 결과를 PPTX로 후처리 |

## 라이선스

MIT — 모태 [modu-ai/cowork-plugins](https://github.com/modu-ai/cowork-plugins) `gil-design` (v2.12.0 도입) 차용.
