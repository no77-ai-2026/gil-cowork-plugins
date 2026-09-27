# CHANGELOG — GIL v2.3.1 (2026-09-03) — 모태 v1.2.5 자격증명 배선 동기화 (패치)

모태 **modu-ai/moai-cowork** 61fac40(v1.2.4) → **d71addc(v1.2.5, 2026-09-03)**, Apache-2.0. 신규·삭제 스킬 0. 스킬 본문 변경 0(문서 안내 3건 제외). 33개 프로젝트 영향 없음.

## 버전
- gil 2.3.0 → **2.3.1**, gil-creative 2.2.0 → **2.2.1**, gil-commerce 2.2.0 → **2.2.1**
- 롤백: `gil-bundles-v2.3.0-clean/`

## 결함 (모태 2026-09-03 실측, GIL 동일)
`.mcp.json`의 `"env": {"KEY": "${KEY}"}`는 **Claude 데스크톱 앱에서 확장되지 않는다.** 서버는 정상 기동·도구 목록도 뜨지만 문자열 `${KEY}`가 그대로 전달돼 모든 호출이 401. Claude Code CLI(셸 export)에서만 동작. GIL 7개 서버(smartstore·imweb·cafe24·threads-poster·ElevenLabs·dart·korean-law)가 이 방식이었다.

## J. `userConfig` 선언 + `${user_config.KEY}` 참조
- plugin.json ×3에 `userConfig`(gil 2키 / creative 5키 / commerce 14키, title·description·sensitive). Claude 앱이 설치 시 입력 폼을 띄우고 민감값을 키체인에 보관. `.mcp.json` 22키 전부 `${user_config.KEY}`로 교체.

## K. 자체 서버 자격증명 레이어 (`gil_mcp_core.CredentialStore`)
- `credentials.py` 신설(모태 `moai_mcp_core` 리브랜드): **환경변수(실제 값일 때만) → `~/.gil/mcp/<서비스>.json` → 기본값** 순 해석. 확장 안 된 `${...}`·빈 문자열 = 값 없음. `setup_hint()`로 미설정 키 안내.
- smartstore·threads-poster: 공유 코어 `gil_mcp_core` 전체 신규 vendor(pyproject packages·httpx 의존·uv.lock). imweb·cafe24: credentials.py 추가. `config.py`/`_base.py`/`server.py` 전환. 테스트: cafe24 32·imweb 27·smartstore 26(+bcrypt 버전 의존 1건은 모태 동일 실패)·threads 118·credentials 23 PASS.

## L. 제3자 서버 런처 `mcp-launch/mcp_launch.py`
- 표준 라이브러리만(uv run --script 즉시 기동). `~/.gil/mcp/<서비스>.json`을 읽어 환경변수를 채운 뒤 원래 서버를 `execvp` 대체 실행. gil(dart: npx korean-dart-mcp)·gil-creative(ElevenLabs: uvx elevenlabs-mcp) 적용. 런처 테스트 18 PASS. korean-law는 키가 URL에 있어 `${user_config}`만.

## M. 검사 스크립트 `scripts/check-plugin-runtimes.py` (GIL 빌드 게이트 편입)
- Claude 전용 축약: `${CLAUDE_PLUGIN_ROOT}` 경로·Windows 적대 command(sh/bash/python)·셸 연산자·비-user_config 자리표시자·userConfig↔참조 양방향·런처 `--keys`·런처 사본 드리프트·벤더 core credentials.py 존재. v2.3.0 baseline 오류 29 → v2.3.1 **0**.

## 추가 발견 — Windows 기동 불가 2건
- **context7**: `/bin/bash -l -c "exec npx ..."` 배선 → Windows에 bash가 없어 "Connection closed". `npx -y @upstash/context7-mcp@latest` 직접 호출로 교정.
- **uv 미설치**(사용자 PC 실측 2026-09-03): uv 기반 5서버(smartstore·imweb·cafe24·threads-poster·ElevenLabs)가 기동 자체 불가. 설치: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`. v2.3.1부터 dart도 런처 때문에 uv 필요.

## 문서
- CONNECTORS.md ×3 머리말에 자격증명 3경로 HARD 안내. 벤더 서버 CONNECTORS/README(경로 1 파일·경로 2 폼) 갱신. audio-gen·threads-post-draft·instagram-post 토큰 안내를 `${VAR}` → 입력 폼/파일 경로로 교체(v2.3.0 G항목의 `${VAR}` 권고 철회). mcp-connector-setup Connector E·law-research 안내 갱신.
- 제외: Codex 분기(.codex-plugin 인라인 배선·$comment 제거) — Cowork 전용.
