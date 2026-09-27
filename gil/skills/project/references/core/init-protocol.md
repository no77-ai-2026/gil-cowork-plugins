# init-protocol.md — `/project` 초기화 전체 플로우

## 개요

`/project`는 모두의 코워크 프로젝트를 초기화하고, 사용자의 업무 워크플로우를 인터뷰한 뒤, **스킬 체이닝 + 프로젝트 전용 커스텀 에이전트 기반 AGENTS.md**(폴더 지침 정본)와 이를 불러오는 `CLAUDE.md` 포인터를 생성한다.

**현재 상태**:
- Phase 2 인벤토리는 설치된 플러그인을 **동적으로 도출**(plugin.json 스캔)하여 신규 플러그인을 자동 포함한다.
- Phase 4 Gap Detection: 체인 스킬 ↔ 인벤토리 대조 → 누락 감지 → 설치 안내 → Re-entry.
- 설치 완료 후 사용자가 "이어서 진행"·"설치 완료"라고 하면 저장된 진행 상태에서 재개한다(자연어 단일 경로).
- 글로벌 프로필 시스템은 사용하지 않는다(이름·회사·역할 재질문 없음).
- 생성 `AGENTS.md`에 8개 HARD 규칙 블록이 고정 포함된다.

---

## 전체 플로우

```
/project
    ↓
Phase 1: 워크플로우 인터뷰 (맥락 충분까지 수집)
    ↓
Phase 2: Inventory — 설치된 플러그인·스킬 인벤토리 구성
    ↓
Phase 3: 스킬 체인 설계 (산출물별 파이프라인)
    ↓
Phase 4: Gap Detection — 누락 플러그인/스킬 감지 + 설치 안내
    ↓ (누락 0건이거나 옵션 2/3 선택 시)
Phase 5: 설계 확인 (AskUserQuestion)
    ↓
Phase 6: 지침 생성 (AGENTS.md.tmpl 기반 AGENTS.md ≤100라인 + CLAUDE.md 포인터)
    ↓
Phase 7: 커스텀 에이전트 생성 (.claude/agents/*.md + .codex/agents/*.toml)
    ↓
Phase 8: API 키 / 커넥터 + 첫 실행 안내
```

---

## Phase 1: 워크플로우 인터뷰 (렌즈 도출 · 커버리지 종료)

> **v2.3.0 개정 (HARD)** — 아래 S1/S2 절차는 유지하되 세 가지가 바뀐다. ① **질문 풀은 고정 목록이 아니다**: 프로젝트 설명·폴더명·기존 파일에서 명사를 뽑고 8렌즈(정체성·산출물·독자·문체·현행·품질·자산·제약)를 대어 해당 없는 렌즈는 버린 뒤, 그 프로젝트의 말로 묻는다(SKILL.md §Socratic Interview). ② **종료는 커버리지**: 미확인 축이 남으면 S2를 몇 번이든 더 돈다. 단 첫 라운드부터 「지금 아는 것으로 진행」 선택지를 둔다. ③ **응답 없음≠거절**: 빈 응답·deny·dismissed(Cowork 카드 렌더링 버그 #58750)는 결정이 아니므로 같은 질문을 응답 본문에 번호 매긴 선택지로 다시 낸다. 서브에이전트에 인터뷰를 위임하지 않는다. **H 제약 렌즈의 민감도는 모든 프로젝트 필수**이며 미응답이면 `unknown`(외부 전송 안 함).


사용자의 **이 프로젝트 맥락**만 수집한다. 이름·회사·역할 같은 **글로벌 프로필 정보는 묻지 않는다**.

**[HARD] 질문은 나눠 내지 않는다.** 과거의 1-1/1-2/1-3 3연발 순차 호출은 폐기됐다. 한 라운드에 필요한 질문을 **모두 묶어 한 번의 질문 채널(`AskUserQuestion`)로** 낸다.

### S1 — 일괄 진단 라운드 (`AskUserQuestion` 1회, 최대 4질문 × 각 4옵션)

질문은 **고정 세트가 아니다.** 아래 풀에서 이번 프로젝트에 정보 이득이 큰 순으로 4개를 골라 **한 화면에 배치**한다.

| # | 축 | 형태 | 기본 선택지 예시 |
|---|---|---|---|
| ① | 업무 유형 | multiSelect 4옵션 | 사업 기획·전략 / 콘텐츠 제작 / 문서·행정 / 제품·연구 |
| ② | 주요 산출물 | 4옵션(+Other 자유입력) | 보고서·기획서 / 마케팅 콘텐츠 / 계약·공문 / 데이터·분석물 |
| ③ | 대상 독자·수신자 | 4옵션 | 경영진·투자자 / 고객·소비자 / 내부 팀·부서 / 공공기관·심사역 |
| ④ | 톤·형식 제약 | 4옵션 | 공식·격식체 / 캐주얼·대화체 / 산업 전문용어 / 제약 없음 |
| ⑤ | 산출물 포맷 | multiSelect 4옵션 | 한글(HWP) / PPTX·Word / 웹·노션·마크다운 / 이미지·영상 |
| ⑥ | 작업 주기·마감 | 4옵션 | 일회성 / 주간 반복 / 월간 반복 / 상시·수시 |
| ⑦ | 기존 자료 유무 | 4옵션 | 기존 산출물 있음 / 레퍼런스만 있음 / 브랜드 가이드 있음 / 백지에서 시작 |
| ⑧ | 반드시 피할 것 | 4옵션(+Other) | 과장·단정 표현 / 특정 경쟁사 언급 / 개인정보 노출 / 없음 |
| ⑨ | 배경·동기 (소크라테스 축) | 4옵션(+Other) | 신규 사업 착수 / 기존 업무 자동화 / 품질 편차 해소 / 인력 부족 보완 |

**슬롯 채우기 규칙 (HARD)**: 진입 발화·기존 `./AGENTS.md`·`.gil/context.md`에서 **이미 확보된 축은 질문 목록에서 제거**하고, 빈 슬롯은 다음 순위 축으로 채워 **항상 4슬롯을 채운다**. 남은 축이 4개 미만이면 그만큼만 낸다.

**작성 규칙**: 모든 옵션에 `description`(선택 시 무엇이 달라지는지)을 붙인다. 첫 옵션에만 `(권장)` 라벨. 자유 서술이 필요한 축은 `Other`로 흡수한다(별도 텍스트 질문을 만들지 않는다).

### S2 — 보강 라운드 (조건부, `AskUserQuestion` 추가 호출)

**발동 조건** — 하나라도 해당할 때만 실행한다:

| 조건 | 판정 신호 |
|---|---|
| (a) 필수 축 공백 | A등급 + 필수 B등급 중 미확보 항목 존재 |
| (b) 저신뢰 응답 | `Other` 선택, 모호한 자유입력 |
| (c) 답변 상충 | 예: 산출물=공문인데 톤=캐주얼 |
| (d) 슬롯 초과 | S1의 4슬롯에 못 담은 필수 축이 남음 |

해당 없으면 **S2를 건너뛰고 즉시 Phase 2로 진행**한다. 실행할 때도 질문을 쪼개지 않고 **부족분을 한 번에 묶어** 배치한다. S2가 2회를 넘어가면 그 라운드에 「지금 아는 것으로 진행」 옵션을 함께 넣어 사용자가 종료할 수 있게 한다.

### 종료 판정

라운드 수를 미리 정하지 않는다. **A등급 + 필수 B등급이 채워지면 종료**한다. 수집 결과는 메모리에 임시 저장되며, Phase 6에서 `AGENTS.md`에 직접 기록된다. 별도 프로필 파일을 생성하지 않는다.

---

## Phase 2: Inventory — 활성 스킬 인벤토리 구성

### 2-1. 인벤토리 소스

**[HARD] 스캔 필터링 — GIL 번들만 인정**: `~/.claude/plugins/`에는 여러 마켓플레이스 플러그인이 섞여있을 수 있다. project 스킬은 **GIL 번들(`gil`·`gil-creative`·`gil-commerce`)만** 인벤토리에 포함하고, 그 외는 제외한다.

**[HARD] 스킬 집합은 하드코딩하지 않는다.** 설치된 각 번들의 `plugin.json` + `skills/` 디렉터리를 스캔해 실측 도출한다. 번들이 추가·갱신되면 자동 반영된다.

**소스 A — Bash 디렉터리 스캔**:

```bash
# Claude(~/.claude/plugins) + Codex(~/.codex/plugins/cache) 양쪽 스캔
INSTALLED_MOAI_PLUGINS=()
for dir in ~/.claude/plugins/gil ~/.claude/plugins/gil-creative ~/.claude/plugins/gil-commerce; do
  p=$(basename "$dir")
  if [ -d "$dir" ] && { [ -f "$dir/.claude-plugin/plugin.json" ] || [ -f "$dir/.codex-plugin/plugin.json" ]; }; then
    INSTALLED_MOAI_PLUGINS+=("$p")
  fi
done
for plugin in "${INSTALLED_MOAI_PLUGINS[@]}"; do
  for base in ~/.claude/plugins ~/.codex/plugins/cache/*; do
    find "$base/$plugin/skills" -maxdepth 2 -name SKILL.md 2>/dev/null
  done
done
# Codex 커스텀 에이전트(.codex/agents/*.toml)도 인벤토리에 포함
for f in ./.codex/agents/*.toml ~/.codex/agents/*.toml; do [ -f "$f" ] && basename "$f" .toml; done 2>/dev/null
```

각 SKILL.md frontmatter의 `name:` 필드를 추출해 `<skill-name> → <plugin>` 매핑을 구성한다.

**소스 B — system reminder 파싱**: 현재 세션 system reminder의 "user-invocable skills" 목록에서 `gil:`·`gil-creative:`·`gil-commerce:` 접두 스킬만 등록한다.

**교차 검증**: 두 소스가 일치하면 신뢰도 HIGH. 한쪽에만 있으면 MEDIUM(설치는 됐으나 세션 미반영 등).

### 2-2. `.gil/config.json` 인벤토리 스냅샷 스키마

```json
{
  "scanned_at": "2026-07-11T00:00:00+09:00",
  "plugins_installed": ["gil", "gil-creative", "gil-commerce"],
  "skills_available": {
    "blog": "gil-creative",
    "ai-slop-reviewer": "gil",
    "design-brief": "gil-creative"
  },
  "confidence": { "gil": "HIGH" }
}
```

### 2-3. Phase 1 답변 기반 매칭

| 업무 유형 | 우선 코워커(플러그인) |
|----------|------------|
| 사업 기획·전략 | 코워커(business-* 스킬군) |
| 콘텐츠 제작 | 마케터(content-*, marketing-* 스킬군) |
| 문서·행정 | 사무관(office-*), 법무(legal-*) |
| 제품·연구 | 코워커(spec/ux 스킬군), 튜터(education-* 스킬군) |
| 이커머스 | 셀러(commerce-* 스킬군) |
| 출판·원고·웹툰·IP | 작가(book-*), 스토리(story-*) |
| 디자인 핸드오프·브랜드 | gil-creative(design-* 스킬군) |

라우터 허브는 project 스킬(`/project` 진입). 실무·사무·전문직 도메인은 코어 `gil`로 수렴하며, 콘텐츠·창작·디자인은 `gil-creative`, 커머스는 `gil-commerce`로 분기된다. `ai-slop-reviewer`·`humanize-korean`·`korean-spell-check`는 코어 `gil` 소속으로 텍스트 후처리 체인에 항상 활용 가능하다.

---

## Phase 3: 스킬 체인 설계 (핵심)

### 3-1. 체인 구성 규칙

```
[기획/분석 스킬] → [생성 스킬] → [포맷 변환/미디어 스킬] → ai-slop-reviewer
```

텍스트 산출물 체인은 **반드시 `ai-slop-reviewer`로 종료**. 한국어 최종본은 직후 `humanize-korean` 2차 패스를 추가. 비텍스트는 ai-slop 단계 생략. Inventory에 없는 스킬은 체인에서 제외하거나 Gap Detection으로 넘긴다.

### 3-2. 체인 프리셋 테이블

상세 체인 프리셋(주요 산출물별 권장 체인)은 `cowork-setup.md` §3을 참조한다(단일 소스 — 중복 유지 안 함).

### 3-3. 체인 요약 포맷

Phase 5(확인 단계)에서 사용자에게 보여줄 요약:

```
이 프로젝트의 실행 체인 설계

[주 산출물 1] 사업계획서(PPT)
  체인: consult-strategy → doc-pptx → ai-slop-reviewer
  트리거 예시: "사업계획서 만들어줘"
```

---

## Phase 4: Gap Detection — 누락 플러그인/스킬 감지

### 4-1. 누락 감지 알고리즘

```
for each skill in chain_skills:
    if skill not in inventory.skills_available:
        missing_skills.append(skill)
        missing_plugin = SKILL_PLUGIN_MAP[skill]
        missing_plugins.add(missing_plugin)
```

### 4-2. 스킬 → 플러그인 매핑

스킬 → 소속 번들 매핑은 **설치된 번들의 skills/ 실측을 정본으로 삼는다.** 참고 패턴: 커머스(`commerce-*`·`marketplace-*`·live-commerce 등) → `gil-commerce`; 콘텐츠·창작·미디어·디자인(blog·card-news·sns-content·book-*·story-*·design-*·higgsfield-*·threads-* 등) → `gil-creative`; 그 외 범용·전문직·오피스·데이터 → 코어 `gil`. `project`(PM 허브)는 코어 `gil` 소속.

### 4-3. 누락 발견 시 AskUserQuestion 4 옵션

```
"체인에 필요한 스킬이 설치되지 않은 플러그인에 포함돼 있습니다."

누락 스킬: [skill-A] → [gil-X] 번들 필요

옵션:
  1. (권장) 설치 안내 받기 + 설치 후 재개
     → 설치 명령을 안내하고, 완료 후 "이어서 진행"으로 재개합니다.
     → 현재 진행 상태(.gil/cache/init-progress.json)는 보존됩니다.
  2. 누락 스킬 제외하고 진행
  3. 대체 스킬로 변경
  4. 중단
```

### 4-4. 옵션 1 선택 시: 설치 안내 흐름

```
1. 누락 플러그인별 설치 안내 (데스크톱 앱 — /plugin 슬래시 명령은 Claude Code 전용이라 안내하지 않음):
   - 앱 UI: Plugins 메뉴 → 해당 플러그인 Install
   - Cowork 설정 → 플러그인 → 해당 번들 .plugin 파일 업로드(로컬 설치, NC-ND 비배포 정책·Apache 전환 여부는 CLAUDE.md 참조)

2. .gil/cache/init-progress.json 저장

3. 안내: "'이어서 진행' 또는 '설치 완료' 발화"
```

`.gil/cache/` 디렉터리가 없으면 `Bash("mkdir -p .gil/cache")`로 생성한다.

### 4-5. `init-progress.json` 스키마

```json
{
  "started_at": "2026-07-11T14:30:00+09:00",
  "phase_completed": 3,
  "interview_answers": { "work_type": ["사업 기획·전략"] },
  "chain_design": [
    { "deliverable": "사업계획서(PPT)", "chain": ["consult-strategy", "doc-pptx", "ai-slop-reviewer"] }
  ],
  "missing_skills": [],
  "missing_plugins": []
}
```

### 4-6. 옵션 2/3 선택 시

옵션 2(제외): `missing_skills`에 해당하는 체인 단계를 제거하고 Phase 5로 진행하며, `AGENTS.md`의 해당 체인에 미설치 주석을 삽입한다. 옵션 3(대체): `inventory.skills_available`에서 유사 기능 스킬을 검색해 재설계 후 Phase 5로 진행한다.

### 4-7. 누락 0건이면

즉시 Phase 5 Confirm으로 진행한다.

---

## Phase 5: 설계 확인

질문 채널(`AskUserQuestion`)(1질문, 3옵션): 승인(권장) / 수정 / 취소.

---

## Phase 6: 지침 생성 (AGENTS.md 정본 + CLAUDE.md 포인터)

`references/templates/AGENTS.md.tmpl`을 로드하여 변수를 치환하고 `./AGENTS.md`에 쓴다. 이어서 `references/templates/CLAUDE.md.tmpl`을 **치환 없이 그대로** `./CLAUDE.md`에 복사해 `@AGENTS.md` 포인터를 만든다(본문 복제 금지). 상세 변수 치환 테이블·생성 절차·포인터 규칙은 `agentsmd-generator.md` 참조. 생성 원칙: AGENTS.md ≤100라인, 스킬 체인 최대 10개, 8개 HARD 규칙 블록 항상 포함, UTF-8/LF/한국어.

---

## Phase 7: 커스텀 에이전트 생성

Phase 3-6 결과를 바탕으로 커스텀 에이전트를 **Claude용 `.claude/agents/*.md`(markdown+YAML frontmatter)와 Codex용 `.codex/agents/*.toml`(TOML: `name`·`description`·`developer_instructions`, `model`·`sandbox_mode` 선택) 양쪽**으로 생성한다. 절차·frontmatter·7-step 루프는 project 스킬 SKILL.md §Custom Agent & Skill-Chain Design 참조.

---

## Phase 8: API 키 / 커넥터 + 첫 실행 안내

Phase 2에서 선택된 플러그인이 API 키를 요구하면 등록 안내.

| # | 서비스 | 환경변수 | 용도 | 발급처 |
|---|--------|---------|------|--------|
| 1 | 공공데이터포털 | `DATA_GO_KR_API_KEY` | 공공데이터/KOSIS/KCI | data.go.kr |
| 2 | KIPRIS Plus | `KIPRIS_API_KEY` | 특허 검색 | plus.kipris.or.kr |
| 3 | 국가법령정보 | `KOREAN_LAW_OC` | 법령/판례 | law.go.kr |
| 4 | Google Gemini | `GEMINI_API_KEY` | 이미지 프롬프트 | ai.google.dev |
| 5 | Higgsfield | `HIGGSFIELD_API_KEY` + `HIGGSFIELD_SECRET` | Higgsfield MCP | higgsfield.ai |
| 6 | ElevenLabs | `ELEVENLABS_API_KEY` | media-audio-gen(TTS) | elevenlabs.io |

저장 위치: `./.gil/credentials.env`(프로젝트 격리, GUIDANCE 전용 — 실제 값은 절대 기록하지 않음).

첫 실행 안내는 Phase 3에서 설계된 체인 중 상위 3개를 예시로 제시한다. 전체 코워커 목록이 궁금하면 "어떤 코워커 있어?", 현재 상태는 "지금 상태 어때?"로 물으면 안내한다.

---

## Re-entry: 설치 완료 후 진행 재개

| 트리거 | 처리 |
|--------|------|
| "이어서 진행" / "설치 완료" / "다시 진행" | 자연어 → resume 흐름 자동 트리거(유일한 재개 경로) |

### 복원 흐름

1. `.gil/cache/init-progress.json` 존재 확인(없으면 "저장된 진행 상태가 없습니다. `/project`로 새로 시작하세요.")
2. `init-progress.json` 로드(Phase 1-3 결과 복원)
3. Phase 2 Inventory 재실행(설치 확인)
4. Phase 4 Gap Detection 재검증(여전히 누락 시 4옵션 재제시, 0건이면 Phase 5로 진행)
5. Phase 5 이후는 정상 흐름과 동일

---

## API 키 관리 — "API 키 설정할래" (자연어)

사용자가 "API 키 설정할래"·"키 등록할래"라고 하면 Phase 8 안내 흐름이 6개 API 키를 조회·변경·추가·삭제한다.

---

## AskUserQuestion 제약 준수 요약

**[HARD] 호출 수가 아니라 라운드 수를 센다.** 한 라운드는 질문 여러 개를 묶은 **1회 호출**이다. 질문 1개당 1회 호출하는 분할 방식은 금지한다.

| Phase | 호출 | 한 호출에 담는 질문 수 | 옵션 수 |
|-------|------|------------------------|---------|
| Phase 1 · S1 일괄 진단 | 1 | **최대 4 (묶음 배치)** | 각 ≤4 (+Other) |
| Phase 1 · S2 보강(조건부) | 0-N | 부족분 전부 묶어 최대 4 | 각 ≤4 (+Other) |
| Phase 4 Gap Detection(조건부) | 0-1 | 1 | 4 |
| Phase 5 설계 확인 | 1 | 1 | 3 |
| Phase 8 API 키(조건부) | 0-1 | 1-2 | 최대 4(multiSelect) |

- 정상 경로(맥락 충분): **총 2회 호출** — S1 + Phase 5 확인.
- 최대 경로: S1 + S2 반복 + Gap + 확인 + API 키. S2 반복이 2회를 넘으면 종료 선택지를 함께 제시한다.
- 모든 질문은 질문 채널(`AskUserQuestion`)만 사용한다. 자유 서술 질문·텍스트 대화형 심화 인터뷰는 사용하지 않는다(`Other` 옵션이 자유입력을 흡수한다).
