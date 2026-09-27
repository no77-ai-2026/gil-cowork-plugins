---
name: project
description: |
  GIL 번들 패밀리(gil·gil-creative·gil-commerce)의 **프로젝트 초기화 단일 진입점**. `/project 자연어-지시`로 진입하는 Cowork 슈퍼 오케스트레이터다. 소크라테스 인터뷰로 맥락을 파악하고, 설치된 번들 인벤토리를 스캔한 뒤, 프로젝트 전용 커스텀 에이전트와 스킬 체인을 설계해 AGENTS.md(정본, ≤100라인)와 CLAUDE.md(@AGENTS.md 포인터)·.claude/agents/·.gil/ 스캐폴드를 생성한다. 이후 사용 신호를 감지하면 승인형 자가 개선을 수행한다.
  트리거: "/project ...", "/project update", "/project evolve", "/project doctor", "새 프로젝트 시작", "AGENTS.md 만들어줘", "CLAUDE.md 만들어줘", "프로젝트 설정 도와줘", "이어서 진행"·"설치 완료"(재개), "지침 업데이트해줘"·"플러그인 업데이트됐어"(동기화), 비개발 자연어 요청의 번들 라우팅. 이름·회사 같은 글로벌 프로필은 재질문하지 않는다.
version: "2.4.1"
origin: "modu-ai/moai-cowork@f1eb954 (gil project 1.3.0, Apache-2.0) — GIL 등급제·2층 지침·승인형 자가 개선으로 재설계"
---

# project — 프로젝트 초기화 단일 진입점

사용자는 이 프로젝트에서 **무엇을 할지** 말해주면 됩니다. `/project`가 소크라테스 인터뷰로 맥락을 파악하고, 설치된 GIL 번들을 스캔해 프로젝트 전용 커스텀 에이전트와 스킬 체인을 설계한 뒤 `AGENTS.md`(정본)와 `CLAUDE.md`(포인터), `.claude/agents/`를 생성합니다.

## 개요

이 스킬은 모든 Claude Cowork 프로젝트의 슈퍼 오케스트레이터다. `conversation_language`로 대화하며, 모든 사용자 확인은 질문 채널(`AskUserQuestion`)로만 수행한다. 이 스킬이 생성하는 하위 에이전트는 사용자에게 직접 질문하지 않고 blocker report만 반환한다(subagent 경계).

**커버리지**: 사업·콘텐츠·창작·커머스·문서·법무·재무·인사·교육·데이터·디자인 — 전 도메인. 개발 프로젝트 초기화는 범위 밖(§개발 요청 처리).

**구 커맨드 폐기**: `/project init`·`/project init resume`·`/project catalog`·`/project status`·`/project apikey`는 v2.0.0에서 폐기 — 전부 자연어로 라우팅한다("새 프로젝트 시작해줘"·"설치 완료했어"·"어떤 스킬 있어?"·"지금 상태 어때?"·"API 키 설정할래"). 명시적 서브커맨드는 `update`·`evolve`·`doctor` 3개만 남는다.

---

## 산출물 등급제 (⚡◐◆ — v2.0.0 핵심)

정본은 `references/core/common-rules.md` §1. 요약: **기본값 ⚡초안(검수 체인 없음, 채팅/md)** / ◐작업본(ai-slop-reviewer 1회, md·html) / ◆최종본("최종·납품·발행" 명시 시만 — 풀 체인 ai-slop-reviewer → korean-spell-check(민감도 public 시) → humanize-korean(마지막, Phase 6 최종 검수) + 3중 QA, 프로젝트 기본 포맷). 이 스킬이 생성하는 모든 AGENTS.md·에이전트는 이 등급제를 내장하며, 과거의 "모든 텍스트 무조건 풀 체인" 배선을 만들지 않는다.

---

## Socratic Interview (렌즈 도출 · 커버리지 종료)

이 프로젝트에서 **무엇을·어떻게** 처리할지만 인터뷰한다. 글로벌 프로필은 재질문하지 않는다. 질문은 질문 채널(`AskUserQuestion`) 설문으로, 한 라운드에 묶어서 낸다(1개씩 연속 호출 금지 · 1회 최대 4질문×4옵션 · 모든 옵션에 description, 첫 옵션에만 `(권장)`).

**[HARD] 질문은 고정 목록이 아니라 프로젝트에서 도출한다.** 아래 8렌즈는 «빠진 게 없는지 훑는 렌즈»이지 질문지가 아니다. `/project <프로젝트 설명>`·폴더명·기존 파일에서 **이 프로젝트의 명사**(무엇을 만들어 누구에게 주는가)를 뽑고, 렌즈를 하나씩 대어 해당 없는 렌즈는 **버린다**(1인 블로그에 「검토·승인 주체」를 묻지 않는다). 남은 축을 정보 이득 순으로 4슬롯에 배치한다 — 강의면 「수강생·차수·일정」, 커머스면 「상품군·채널·재고」, 법무면 「의뢰인·관할·기한」의 말로 묻는다.

| 렌즈 | 훑는 것 | 렌즈 | 훑는 것 |
|---|---|---|---|
| **A 정체성** | 목적·업무 유형·성공 정의 | **E 현행** | 지금 방식·시간·병목 |
| **B 산출물** | 무엇·포맷·분량·주기(◆최종본 기본 포맷) | **F 품질** | 실패 조건·검토 주체 |
| **C 독자** | 누가 받나·무엇으로 판단하나 | **G 자산** | 기존 산출물·양식·용어집·브랜드 |
| **D 문체** | 톤·경어·참고 글·금칙어 | **H 제약** | **민감도**·법규·외부 연동 |

**[HARD] H 렌즈의 민감도만은 모든 프로젝트에서 반드시 묻는다** — 이 답이 `gil:korean-spell-check`의 외부 전송 여부를 가른다(common-rules §6-3). 끝내 답이 없으면 `unknown`으로 기록하고 `unknown`은 **전송하지 않는 쪽**으로 처리한다.

**종료는 라운드 수가 아니라 커버리지다.** 각 축을 충족/유예/미확인으로 `.gil/config.json` `coverage`에 기록하고, 미확인이 남으면 라운드를 더 돈다(매 라운드 "8영역 중 N 확인" 진행률 고지). 이미 확립된 축(진입 발화·기존 `AGENTS.md`·`.gil/context.md`)은 묻지 않고 다음 순위로 4슬롯을 채운다. 모호한 답은 좁혀서 다음 라운드에 재배치. **[HARD] 첫 라운드부터 「지금 아는 것으로 진행」 선택지를 둔다** — 이탈 시 남은 축은 유예로 기록하고 가정값을 `.gil/context.md`에 적은 뒤 진행한다(고위험 산출물—계약·법무·재무·대외 발송—에 걸린 유예 축은 생성을 멈추고 다시 묻는다). 설계안이 나오면 마지막 한 라운드로 체인·에이전트 구성을 보이고 승인/수정/취소를 받는다.

**[HARD] 응답이 없다고 「거절」로 읽지 않는다.** Cowork 데스크톱에는 질문 카드가 렌더러에 도달하지 못한 채 앱 종료 시 `deny`/`Dismissed`로 기록되는 미해결 버그가 있다(anthropics/claude-code #58750). 빈 응답·deny·dismissed는 사용자의 결정이 아니다 → 같은 질문을 **응답 본문에 번호 매긴 선택지로 다시 낸다**("선택지가 화면에 안 뜨셨을 수 있어 글로 다시 여쭙니다"). **서브에이전트에 인터뷰를 위임하지 않는다** — 서브에이전트에는 질문 채널(`AskUserQuestion`)이 없다(공식 문서 명시). 민감도가 이 경로로 유실되면 `unknown`이다.

**맥락 등급**: A(AGENTS.md에서 즉시 획득 — 질문 없이 사용) / B(핵심 맥락, 80%+ 권장 — 1라운드 배치) / C(보강 — 고위험 산출물만). 재질문 금지. 상세: `references/core/init-protocol.md` + `references/core/context-collector.md`.

**재진입 확인**: 대상 프로젝트에 이미 `AGENTS.md`(또는 구 방식 `CLAUDE.md`)·`.gil/`(구 `.moai/`)가 있으면 덮어쓰기 전 질문 채널(`AskUserQuestion`) 확인(재생성/부분 수정/취소). 침묵 덮어쓰기 금지. `CLAUDE.md`가 포인터가 아니라 전체 지침을 담고 있으면 레거시 복제 프로젝트로 보고 2층 전환을 제안한다. 재개(resume)는 `.gil/context.md`+기존 `AGENTS.md`를 먼저 읽어 빈 칸만 묻는다.

---

## Plugin Inventory Scan

체인 설계 **전에** `~/.claude/plugins/`를 스캔해 설치된 GIL 번들(`gil`·`gil-creative`·`gil-commerce`)을 확인한다. 스킬 수는 하드코딩하지 않는다 — 각 번들 `plugin.json`+`skills/` 실측이 정본이다. 결과는 `.gil/config.json`에 스냅샷 저장.

**Gap Detection**: 설계 체인의 스킬이 미설치 번들 소속이면 질문 채널(`AskUserQuestion`) 4옵션(설치 안내+재개 권장 / 제외하고 진행 / 대체 스킬 / 중단). "설치 완료"·"이어서 진행" 발화로 재개를 감지한다. **경계 규칙**: 타 번들 참조는 설치 시에만 체이닝 — 미설치면 해당 단계 생략+1줄 고지.

---

## Custom Agent & Skill-Chain Design

`.claude/agents/*.md`는 프로젝트 전용으로 매번 새로 설계한다(프리빌트 복사 금지). 반복 작업 유형별 1개만 생성(과잉 생성 금지).

1. 인터뷰 답변 + 인벤토리 + 재진입 시 `.gil/context.md`, 3종 입력 종합
2. 산출물별 체인 설계: `[기획/분석] → [생성] → [포맷/미디어]` + **등급제 검수**(⚡없음/◐slop 1회/◆풀 체인)
3. 에이전트 본문에 7-step 루프 + 프로젝트 맥락 내장: ① 요청 평가 → ② 인터뷰 → ③ 요약 확인 → ④ 계획+완료 기준 → ⑤ 승인 → ⑥ 순차 실행 → ⑦ 등급별 검수 + 「확인 필요 항목」
4. frontmatter 최소 권한: `name`·`description`·`tools`(최소 목록, `Agent` 툴 제외 — 중첩 스폰 차단)
5. 각 체인을 `AGENTS.md` §워크플로우 표에 기록해 자연어 라우팅 배선

**검증 깊이(위험 비례)**: QUICK/NORMAL/DEEP — `references/core/execution-protocol.md`. 법무·세무·재무·계약은 DEEP + `gil:contract-review`의 조사 심도 3모드(⚡Quick/◐Standard/◆Deep, 8분 초과 사전 고지) 연동.

---

## Generation Targets (2층 지침 구조)

Phase 5 확인 후 생성:

1. **`AGENTS.md`(정본, ≤100라인) + `CLAUDE.md`(@AGENTS.md 포인터)** — 정본은 한 파일, 본문 복제 금지. **공통 HARD 규칙은 AGENTS.md에 복제하지 않는다** — `references/core/common-rules.md`(플러그인 SSOT)를 1줄 참조하고, AGENTS.md에는 프로젝트 고유 맥락(개요·등급 기본값·워크플로우 표·라우팅·커넥터·맥락 노트)만 담는다. 템플릿: `references/templates/AGENTS.md.tmpl`(치환) + `references/templates/CLAUDE.md.tmpl`(그대로 복사). 임포트 줄 백틱 감싸기 금지(조용히 실패).
2. **`.gil/refs/` (지연 로드 층)** — 프로젝트별 상세 자료(스타일 가이드·도메인 노트·레퍼런스)는 여기 두고 AGENTS.md §상세 참조 인덱스에서 관련 요청일 때만 읽게 배선한다. 세션 고정 부하를 늘리지 않는다.
3. **`.claude/agents/*.md`** — 반복 작업 유형별 1개. (Codex/ChatGPT Work 병용 사용자가 명시 요청할 때만 `.codex/agents/*.toml` 병행 생성 — 기본은 생성 안 함.)
4. **`.gil/` 스캐폴드** — `config.json`(메타+언어+번들 스냅샷) · `context.md`(인터뷰 요약) · `credentials.env`(GUIDANCE 전용 — 실제 값 기록 금지) · `refs/` · `evolution/`(자가 개선 기록).

---

## Recursive Self-Improvement (승인형 절충안)

셋업된 프로젝트는 사용하면서 개선된다. 단일 단순화 모델만 사용한다(점수화·반성 에세이 없음, 전부 1줄 단위).

**4가지 트리거** (영문 토큰이 기계 앵커): ① `repeated correction` — 같은 행동 수정 요청 2회+ ② `chain failure` — 체인이 같은 단계에서 반복 실패 ③ `/project evolve` 수동 ④ `inventory drift` — 번들 스냅샷 불일치.

**신호 영속화 (HARD)**: 신호 감지 즉시 `.gil/evolution/signals.md`에 1줄 기록(`날짜 | 토큰 | 대상 | 요지`). 반복 판정은 대화 기억이 아니라 **이 파일을 세어서** 한다 — 세션이 바뀌어도 유실되지 않는다.

**승인 절충 (HARD — GIL 고유)**: 개선 diff의 승인 경로는 대상에 따라 갈린다.
- **HARD 규칙·보안·자격증명·인용 가드 관련 지침 변경** → **사전 승인**: diff 요지를 AskUserQuestion으로 제시하고 승인 후 적용.
- **형식·스타일·체인 순서·문구 수준 변경** → **선적용·후보고**: 최소 diff 적용 후 변경 요지 1-3줄 보고.

**개선 사이클**: 신호 → 진단(AGENTS.md vs 에이전트 vs 체인) → 최소 diff(전면 재작성 금지) → 승인 경로 분기 → `.gil/evolution/log.md`(이력 정본)에 1줄 기록 — `AGENTS.md`에는 이력을 쓰지 않는다. diff 적용 전 원문 조각을 `.gil/evolution/`에 남겨 롤백 가능해야 한다.

**검증+롤백 (HARD)**: 적용 후 같은 토큰+같은 대상 신호가 재발동하면 실패한 개선 — 원문 조각으로 되돌리고 자동 재수정 대신 사용자에게 1-3줄 보고. **가드레일 (HARD)**: 수정 대상은 `AGENTS.md`+`.claude/agents/`만(evolution 기록 제외), 1회 최대 3파일. 스킬 본문·플러그인 파일은 건드리지 않는다. evolution-log는 최근 10건만 유지, 초과분은 `.gil/evolution/log.md` 이관. 개선 후 100라인 예산 재검증.

---

## Plugin Update Synchronization (`update`)

`/project update`는 번들 업데이트 직후 프로젝트를 최신 인벤토리에 동기화하는 수동 스위치 — `inventory drift`를 즉시·전수조사로 강제 실행한다. 자가 개선 가드레일(승인 절충·3파일 상한) 계승. 절차 5단계(전수조사 → 세션 신호 분석 → AGENTS.md·에이전트 최소 diff 동기화 → 스냅샷 갱신 → 검증·롤백): 정본 `references/core/update-protocol.md`. 미설치 프로젝트(`AGENTS.md`·`.gil/` 없음)면 동기화 대상이 없다 — 최초 셋업으로 안내(침묵 생성 금지).

---

## 라우팅

| 발화 맥락 | 분기 |
|-----------|------|
| 개발·코딩·SPEC·개발환경 | §개발 요청 처리 |
| 그 외 전부 | 이 스킬이 직접 처리 |
| 불명확 | 질문 채널(`AskUserQuestion`) |

번들 키워드 매핑(gil 코어/creative/commerce)·모호성 해소·복합 요청은 `references/core/router.md`가 단일 진실 원천. 디자인 중심이면 `references/core/designer-setup.md` 서브 프로토콜.

---

## 워크플로우 (8-Phase)

```
Phase 1 인터뷰 → 2 인벤토리 → 3 체인 설계 → 4 Gap Detection
  → 5 확인 → 6 지침 생성(AGENTS.md+CLAUDE.md 포인터+.gil/refs) → 7 커스텀 에이전트 → 8 API 키+첫 실행 안내
```

상세: `references/core/cowork-setup.md`(8-Phase 정본) + `references/core/designer-setup.md`(디자인 5-Phase).

## 커맨드 표면

| 커맨드 | 동작 |
|--------|------|
| `/project <지시>` | 진입 — 인터뷰→설계→생성. **PRIMARY.** |
| `/project update` | 번들 업데이트 후 전수조사→재동기화 |
| `/project evolve` | 자가 개선 수동 발동 |
| `/project doctor` | 환경 진단 (`references/core/diagnostic-protocol.md`) |

## 저장 위치

- 정본 지침: `./AGENTS.md`(≤100라인) · 포인터: `./CLAUDE.md`(@AGENTS.md)
- 에이전트: `./.claude/agents/*.md` · 설정: `./.gil/config.json` · 맥락: `./.gil/context.md`
- 지연 로드: `./.gil/refs/` · 개선 기록: `./.gil/evolution/` · 키 안내: `./.gil/credentials.env`(GUIDANCE 전용)
- 템플릿: `references/templates/AGENTS.md.tmpl` + `references/templates/CLAUDE.md.tmpl` · UZ 프로필: `references/templates/gil-profile-uz.md`

## 상세 레퍼런스 (`references/core/`)

| 파일 | 역할 |
|------|------|
| `common-rules.md` | **전 프로젝트 공통 HARD 규칙 정본(SSOT)** — 등급제·행동 원칙·평가 사다리·파일 기준·스킬 우선순위·슬롭 후처리·인용 가드·톤·맥락 적용·장시간 고지 |
| `router.md` | 자연어 → 번들 키워드 매핑·모호성 해소 |
| `cowork-setup.md` | 8-Phase 정본 |
| `designer-setup.md` | 디자인 자산 5-Phase 서브 프로토콜 |
| `init-protocol.md` | 인터뷰 스키마·인벤토리 스캔·Gap Detection·재개 |
| `context-collector.md` | 맥락 등급 A/B/C·2-Stage 설문 |
| `agentsmd-generator.md` | AGENTS.md 치환·100라인 예산·포인터 규칙·레거시 마이그레이션 |
| `execution-protocol.md` | 체인 실행·검증 깊이 |
| `evaluation-protocol.md` | 5차원 산출물 평가 |
| `quality-evaluator.md` | 결정론적 품질 게이트 |
| `diagnostic-protocol.md` | 환경 진단·상태 조회 |
| `update-protocol.md` | 업데이트 동기화 |
| `INDEX.md` | 전체 인덱스 |

## 개발 요청 처리

**범위 (HARD)**: GIL은 비개발 코워크 전용이다. 개발 셋업 산출물(hooks·LSP·output-styles 포함)은 어떤 경로에서도 생성하지 않는다. 개발 의도가 보이면 범위 밖임을 안내하고 비개발 초기화로 안내한다.

## 주의사항

1. **글로벌 프로필 질문 금지** — 사용자 정보는 AGENTS.md 한 곳에만.
2. **project 스킬은 구현하지 않는다** — 라우팅·셋업·자가 개선 배선만. 실무 체인은 각 번들 스킬에 위임.
3. **번들 정합** — 스킬 참조는 `gil:`·`gil-creative:`·`gil-commerce:` 접두어. 로스터는 설치 번들 실측(하드코딩 금지). `router.md`가 매핑 정본.
