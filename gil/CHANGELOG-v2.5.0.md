# CHANGELOG — GIL v2.5.0 (2026-09-27) — 모태 데스크톱 범용성 동기화 2단계: 특허·상표 MCP·GPT Image 2.5·검수 스킬 (마이너)

모태 **modu-ai/moai-cowork** 6bc6098a(Apache-2.0) 중 사용자가 선택한 **A·B·D**를 반영한다(1단계 C·F는 v2.4.1). ChatGPT Work·Codex 대응(workflow 진입 스킬 14종 등)은 계속 제외.

## 버전
- gil / gil-creative / gil-commerce 모두 2.4.1 → **2.5.0** (plugin.json ×3 + SKILL.md ×315 = 318지점)
- 스킬 302 → **315** (gil 149→158 / creative 99→102 / commerce 54→55)
- MCP 16 → **18** (`gil-mcp-ip` gil, `gil-mcp-openai` gil-creative) · 자격증명 입력칸 +8(IP 7, OpenAI 1)
- UZ 참고 파일 197 → 210 (+13)
- 롤백: `gil-bundles-v2.4.1-clean/` · `gil-upload-v2.4.1/`

## A. 특허·상표 공식 데이터 MCP (gil)
- **`gil-mcp-ip`** — 모태 `moai-mcp-ip` 리브랜드 vendor. KIPRIS Plus(한국 특허·상표)·USPTO ODP(미국 특허)·USPTO TSDR(미국 상표 상태)·JPO(일본, 번호 기반)·EPO OPS(유럽·국제·패밀리·법적상태). 먼저 `ip_check_access`로 소스별 자격증명 존재만 확인(값 비노출). 자격증명 = 설치 입력 폼 7칸(안 쓰는 소스는 비움) 또는 `~/.gil/mcp/ip.json`, uv 필요. **테스트 32 PASS**
- **신규 스킬 `gil:legal-ip-search-report`** — 상표 선행검색·특허 선행기술·권리상태·FTO 예비조사 보고서(검색 로그·위험 평가·국가별 출원 전략·한계). 결과 0건 ≠ 등록 가능/침해 없음. UZ = 지식재산청·WIPO 공개 검색 범위(`references/uz-ip-search.md`)
- 연결: `patent-search`·`patent-analyzer` 관련 스킬, `legal-review-coordinator` 특허·상표 경로, `env-preflight` uv 점검 대상, CONNECTORS.md ×3

## B. GPT Image 2.5 (gil-creative)
- **`gil-mcp-openai`** — 모태 `moai-mcp-openai` 리브랜드 vendor. `gpt-image-2.5-flare`(기본)·`gpt-image-2.5-sunburst` 정확 지정 **생성**(편집 도구 없음, 1회 1장). OpenAI API 키(`OPENAI_API_KEY` 입력 폼 또는 `~/.gil/mcp/openai.json`)·별도 과금. **테스트 6 PASS**
- **신규 스킬 `gil-creative:gpt-image-prompt`** — 모태 2.5세대 프롬프트 스킬을 GIL `gpt-image-2-prompt`에 3-way 병합: 생성/편집 분기, 필요한 슬롯만 확인, 신규 참고 `prompting-fundamentals.md`·`workflow-recipes.md`, 2.5 공식 출처. **v2.4.0 실사 인물 8칸 문법·수위 스위치·HARD 3줄·6-Block(prompt-blocks.md) 보존**. `references/uz-image-prompt.md` 신규
- **`gpt-image-2-prompt` → 호환 스텁**(기존 호출·프로젝트 지침 보호). 참조 17개 파일을 새 이름으로 교체
- `image-bridge`: A0 경로(`gil-mcp-openai`, 2.5 명시 요청 시) 추가. **GIL 기본 요청 모델은 `gpt-image-2` 유지**(image-generation-runtime.md 계약 — 2.5는 사용자 명시 = `override-approved`). `generate_image.py` 고정값 `gpt-image-1`(계약과 불일치하던 기존 결함) → `gpt-image-2`(환경변수 `GIL_OPENAI_IMAGE_MODEL`로 변경 가능). 키 보관 원칙을 MCP 입력 폼·사용자 작성 파일까지 명확화

## D. 검수 스킬 (원본 수정 없음 · PASS/FAIL/미확인)
**신규 11** — 각 UZ 참고 파일 1개, ◆최종본에서만 해당 코디네이터가 1회 실행(⚡◐ 자동 연결 없음), 자기 검수는 `자체 검수` 표기
| 스킬 | 번들 | ◆최종본 게이트 에이전트 |
|---|---|---|
| finance-audit | gil | finance-report-assembler |
| career-claim-audit | gil | career-job-search-coordinator |
| consult-feasibility-audit | gil | business-plan-coordinator |
| cs-quality-audit | gil | support-ticket-triage-batch |
| legal-evidence-audit | gil | legal-review-coordinator (GIL 인용 4분류 대조 추가) |
| doc-data-audit | gil | core-text-qa-coordinator |
| hr-screening-audit | gil | hiring-coordinator |
| education-assessment-audit | gil | education-course-builder |
| story-continuity-audit | gil-creative | story-production-pipeline |
| book-manuscript-audit | gil-creative | content-publishing-pipeline |
| commerce-margin-audit | gil-commerce | commerce-growth-analyst · commerce-launch-coordinator |

**흡수 3** — `data-provenance-audit` → `gil:validate-data` "출처 대조(Provenance)" 섹션(+data-analysis-coordinator 게이트) · `marketing-evidence-audit`·`media-brand-audit` → `gil-creative:publication-review` 레인 A·D·E 보강(media_job 원장 대조 포함)

## 게이트 (전수 PASS)
YAML·꺾쇠·kebab·dir==name·예약어 0 · `moai-[a-z]+[:/]` 0 · `gil-도메인:` 0 · 백틱 교차참조(스킬·에이전트) 끊김 0 · 충돌 마커·.MERGE 0 · 버전 318지점 2.5.0 · `check-plugin-runtimes` 오류 0 경고 0 · MCP 테스트 ip 32·openai 6 · zip 슬래시·plugin.json 최상위

## 푸시 전 전체 점검 (2026-09-27, 독립 재검수)
- 구조: 게이트 전수 재통과, v2.4.1 기준선 대비 신규 결함 0(검출 증가분은 모두 스킬명 한정 표기·`private/` 의도 제외)
- 런타임: `gil-mcp-ip`·`gil-mcp-openai` stdio 기동 → 도구 목록(18·1) 확인, 무자격증명 호출 시 API 미호출·안전 거절 확인. 테스트 32·6 PASS
- 교정 3건: ① `gil-mcp-openai`는 **생성 전용**(`openai_image_generate` 1종, 편집 도구 없음) — image-bridge·CONNECTORS·cheatsheet의 "생성·편집" 표기 정정 ② plugin.json·marketplace.json 설명의 MCP 수(gil 7종·creative 8종) 갱신 ③ `gpt-image-prompt` 개요·Round 3의 잔존 ChatGPT 표기 중립화, `legal-ip-search-report` UZ 트리거 위치, `commerce-margin-audit` 게이트 에이전트 2곳 명기
