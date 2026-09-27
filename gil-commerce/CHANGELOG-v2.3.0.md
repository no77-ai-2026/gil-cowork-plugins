# CHANGELOG — GIL v2.3.0 (2026-09-02) — 모태 moai-cowork v1.2.4 동기화 (마이너)

모태 **modu-ai/moai-cowork** f1eb954(v1.2.0) → **61fac40(v1.2.4, 2026-09-01)**, Apache-2.0 유지. 신규·삭제 스킬 0 — 기존 스킬 품질·안전 층 보강. 후보 A~I 전부 반영(사용자 선택).

## 버전
- gil 2.2.0 → **2.3.0**, gil-creative 2.1.0 → **2.2.0**, gil-commerce 2.1.0 → **2.2.0** (plugin.json ×3 + SKILL.md ×298 전 지점). 스킬 수 298(148/96/54) 불변.
- 롤백: `gil-bundles-v2.2.0-clean/`

## A. 죽은 MCP 원격 주소 교체 (실측 연결 실패 4종)
- archhub `archhub-mcp.fly.dev/mcp` → `mcp.gomdori.app/archhub` · typefully `api.typefully.com/mcp` → `mcp.typefully.com/mcp` · wordpress `mcp.wordpress.com/mcp` → `public-api.wordpress.com/wpcom/v2/mcp/v1` · **post-bridge 제거**(공식 호스팅 MCP 부재). MCP 16→15종. `$comment`에 옛 주소·금지 사유 기록. 파급 문서(blog·newsletter·building-ledger-search·CONNECTORS·plugin.json) 정합.

## B. humanize-korean 1.4.0 계보 흡수 (GIL SSOT 유지, `scripts/` 배치)
- 실증 교정 4건: `A-2 ~를 통해` S1→S2(원어민이 2배 더 씀·문단 3회+만) · `A-16 대명사` 번역 맥락 전용 · `I-1 ~것이다` 기본 보존 · `E-1` "장문 부재"(인접 문장 잇기, 창작 금지) · `C-8 대구` S2→S1(실측 최강 신호 9.2배)
- 판정 주체 규칙→**LLM 전문 정독**(Phase 2.5 `contextual-review.md`) + **Phase 6 최종 검수**(`final-review.md`, 원문 대조 15항 + 과윤문 역방향, `hold_and_report`)
- 카테고리 **N 영어 수사 구조 직역 6종**(모집·랜딩 장르 한정) · P5 리듬 축 · 장르값 정규화(슬라이드 카피 가드)
- 코드: `scripts/verify_gates.py`(4축 결정적 게이트) · `checks.py` · `sanitize_text.py` · `metrics_v2.py`(antithesis·long_sentence·geosida·change_rate·sentence_touch) · `baseline_v2.json` · `metrics.py`(공개 API 동일) · 테스트 4종 **116 통과**
- 참조: taxonomy(모태 상위집합 + GIL post-editese 3축 섹션 보존)·quick-rules·rewriting-playbook·scholarship·empirical-validation 갱신. `strict-pipeline-spec.md`·`web-service-spec.md`(GIL 고유) 보존. OS별 실행 표(PowerShell) 추가.

## C. 체인 종단 「최종 검수」 + 감사 순서 역전 (등급제 연동)
- 스킬·에이전트 58파일: `→ gil:humanize-korean` 종단에 `→ 최종 검수(◆최종본, humanize Phase 6)` 부가. ⚡초안·◐작업본은 불변.
- `common-rules.md` §6 → **한국어 품질 체인**(6-1 장르 확정 / 6-2 영어 수사 구조 표 / 6-3 ◆최종본 3단 감사). 순서 **ai-slop → korean-spell-check(민감도 `public` 명시 시만, 외부 전송) → humanize-korean(마지막)**. `unknown`은 전송 안 함(fail-closed). 구 순서(humanize→spell) 잔존 8곳 정정, core-text-qa-coordinator·cowork-setup 프리셋 `⟨감사:산문|카피|슬라이드⟩` 표기.
- **버그 수정**: cowork-setup 프리셋의 모태 접두어 스킬명 21종(`doc-pptx`·`content-blog`·`consult-strategy` 등, GIL에 없음) → `gil:*` 실존 이름으로 교정.

## D. 승인 게이트 신설 (되돌릴 수 없는 일·유료 소진) — gil-creative 13스킬
- higgsfield-core §유료 생성 승인 게이트(프롬프트 전문·모델·입력 미디어·옵션·개수·adjustments·견적/잔액 → 이대로 생성/재견적/취소) + §승인 요청 계약(런타임 중립: AskUserQuestion → 대화 승인서 → blocker, 권한 프롬프트≠승인, 무인=fail-closed). image/video(4.5단계 신설)·product·assets·explainer(계획 전체+최대 총 크레딧 1회 승인)·identity(얼굴 사진 0단계 게이트)·job-lifecycle(재시도=재승인)
- audio-gen: 음성 복제·다국어 더빙 업로드 전 승인 + 목소리 주인 동의 별도 문항
- instagram-comments(답글·숨김 건별 승인, `instagram_comments_list`로 중복 판정 금지)·instagram-post·threads-post-draft(감사 3단 → 최종본 승인 → 발행, 실패 시 자동 재시도 금지, 조회 도구 부재 명시)·threads-multichannel·design-sync-upload(묶음 경로 펼침·삭제 별도 거절·복구 스냅샷 미생성 고지)

## E. 슬라이드 정량 QA 필수화
- html-slide 9단계 「정량 QA 채점(의무)」: hard 9기준 인라인(본문 폰트 ≥24pt **투사 pt 환산**·명도대비·3D·정렬·출처·오버플로·아이콘 반복 ≤3·icon_reason 의미 대응·제작 메타 0) + `deck-quality-rubric.md`(34기준) 신규 수록 + deck-manuscript-schema·샘플 회귀 기준. html-report·learning-material 4축 배선.

## F. gil:project 인터뷰·자가개선 보정
- 인터뷰 고정 질문 풀 → **8렌즈 도출**(프로젝트의 말로 질문, 해당 없는 렌즈 폐기), 커버리지 종료·첫 라운드 「지금 아는 것으로 진행」·H 민감도 필수
- **[HARD] 무응답·deny·dismissed ≠ 거절**(Cowork 카드 렌더링 버그 #58750) → 응답 본문에 번호 선택지 재제시, 서브에이전트 인터뷰 위임 금지
- 자가 개선 이력 정본 `.gil/evolution/log.md`(템플릿 `<!-- evolution-log -->` 마커 제거 — 생성 5단계가 HTML 주석을 지워 이력이 남지 않던 결함), 폐기된 딥씽킹 예산 행 제거(여유분 29→39), 템플릿 예시 체인 순서 정정

## G. 맥/윈도우 범용성
- pdf-writer: Windows GTK 런타임(UCRT64 pango·`WEASYPRINT_DLL_DIRECTORIES`) 안내·CJK 폰트 OS별 표·`Path.as_uri()`(스크립트 반영) · iros: PowerShell venv/임시폴더 병기 · threads/instagram: 토큰 `${VAR}` 참조 강제(추적 파일 토큰 유입 차단) + PowerShell 환경변수 · smartstore/threads CONNECTORS OS 병기 · mcp-connector-setup: **Node.js 사전 준비물(kordoc 18+/dart 20.19+)** 신설(없으면 도구가 조용히 사라짐)

## H. `user-invocable: true` 202건 제거
- Cowork 앱이 true 스킬을 "커맨드"로 분류해 스킬 수 표시에서 빠지는 문제(모태 v1.2.2 실측). skill-template에 금지 경고 추가. 기능 영향 없음.

## I. 기타
- design-workflow §Part 4(브랜드 자산 직진 경로, 구 `/design` 체인 이관) · design-copywriting/handoff `/design` 참조 → 스킬명 · 패치 스킬 13종 `origin: moai-cowork@61fac40`
- 제외: Codex/ChatGPT Work 대응(request_user_input·.codex-plugin·commands 삭제 — GIL은 Cowork 전용)

## 게이트
꺾쇠 0 · YAML 298 파싱 · name==dir · kebab · `moai-[a-z]+[:/]` SKILL.md 0 · 끊긴 교차참조 0(기존 `story` 잔재 1 = baseline 동일) · 버전 전 지점 일치 · zip 슬래시 경로 · humanize 테스트 116 PASS
