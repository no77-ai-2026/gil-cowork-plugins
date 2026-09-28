---
name: env-preflight
description: |
  [한·UZ 듀얼] 사용자 PC의 로컬 실행 환경(Node 18+·uv·Python·npx·ffmpeg·한글 폰트·자격증명 파일·MCP 기동)을 4상태(available·missing·not_observable·blocked)로 비파괴 점검하고, 설치 명령은 승인 후에만 안내 트리거: "내 PC 환경 점검", "MCP 왜 안 돼", "uv 설치돼 있어?", "한글 폰트 확인", "플러그인 실행 환경 진단", "muhitni tekshirish" (UZ)
version: "2.6.0"
origin: chany-studio/chany-studio@v2.8.1 (MIT, 2026-09-15 반영)
---

# 로컬 실행 환경 사전 점검 (env-preflight)

## 스킬 개요(상세)

GIL 플러그인의 로컬 MCP 서버와 미디어 작업이 실제로 돌아갈 수 있는지, 사용자 PC(또는 현재 샌드박스)의 런타임 상태를 관찰 근거와 함께 보고하는 스킬입니다. "왜 도구가 안 보이지?", "uv 깔려 있나?" 같은 질문에 추측이 아니라 실행 결과로 답하고, 빠진 것이 있으면 OS별 설치 명령을 보여주되 명시적 승인 없이는 아무것도 설치·변경하지 않습니다.

GIL에서 이 점검이 필요한 대표 상황:
- `.mcp.json`의 `npx`(context7·kordoc·dart) 서버가 Node.js 없이 **오류 메시지 없이 조용히 사라지는** 경우
- `uv` 기반 서버(smartstore·imweb·cafe24·threads-poster·ElevenLabs, 런처를 쓰는 dart)가 uv 미설치로 기동 자체가 안 되는 경우(2026-09-03 사용자 PC 실측)
- `reference-preview`(gil-creative, Node 18+) 도구가 목록에 없는 경우
- 영상·이미지에 한글 자막을 굽는데 폰트에 글리프가 없어 네모(tofu)가 나오는 경우

다음과 같은 요청 시 사용하세요:
- "내 PC 환경 점검해줘", "플러그인 실행 환경 진단"
- "MCP 왜 안 돼", "도구 목록에 parse_document가 없어"
- "uv 설치돼 있어?", "Node 버전 확인해줘"
- "한글 폰트 확인", "자막에 한글이 네모로 나와"
- "ffmpeg 있는지 봐줘"
- "muhitni tekshirish", "kompyuter muhitini tekshir" (UZ)

[책임 경계] 본 스킬은 **로컬 런타임**(실행 파일·폰트·파일 존재·서버 기동)만 다룹니다. 커넥터 계정 가입·OAuth·API 키 발급·`--check` D-3 체크리스트는 페어 스킬 `gil:mcp-connector-setup`이 담당합니다. 유료 생성 견적·자격증명 값 자체·비밀값 열람은 하지 않습니다.

## 개요

**책임 한 줄**: 작업에 필요한 능력만 골라 → 각 도구의 자체 버전/능력 명령을 실행해 관찰 → 4상태 중 하나로 기록 → 한국어 고정 템플릿으로 보고 → 교정은 명령 표시 + 승인 후에만.

### 4상태 정의

| 상태 | 뜻 | 예 |
|---|---|---|
| `available` | 명령이 실행됐고 버전·능력 증거가 돌아옴 | `node --version` → `v22.11.0` |
| `missing` | 명령이 실행됐으나 실행 파일·파일·글리프가 없음이 확인됨 | `uv --version` → "command not found" |
| `not_observable` | 실행 자체를 할 수 없어 있는지 없는지 모름 | 셸 접근 없음, 사용자 PC 미연결, 임시 폴더 쓰기 불가 |
| `blocked` | 실행 파일은 있거나 있을 수 있지만 샌드박스·정책이 실행을 막음 | 관리 정책으로 PowerShell 차단, 실행 권한 거부 |

**HARD**: "샌드박스라 실행 못 함"(`not_observable` 또는 `blocked`)과 "실행 파일 없음"(`missing`)은 다른 상태입니다. 실행하지 못한 것을 `missing`으로 적지 않습니다. 관찰된 버전·증거는 실제로 돌아온 값만 적습니다.

**HARD — 4상태는 "능력"에만 붙입니다.** 작업이 가능한지 여부는 상태 단어가 아니라 보고서의 `막힌 작업` 줄로 적습니다. 예: 폰트에 글리프 2개가 없으면 능력 상태는 `missing`(글리프 부재가 확인됨)이고, 그 결과로 "한글 자막 굽기"가 막힌 작업에 들어갑니다. 같은 상황을 능력 `blocked`로 적지 않습니다 — `blocked`는 실행 파일이 있는데 정책·권한이 실행을 막을 때만 씁니다.

### HARD 규칙

- 호스트 이름·이전 세션·설치 폴더 존재·플러그인 문서로 가용성을 추론하지 않습니다. 실행 결과만 근거입니다.
- 패키지 매니저(winget·choco·brew·apt·pip·uv·npm)의 존재도 관찰 전에는 가정하지 않습니다.
- 점검은 비파괴입니다. 설치·업그레이드·영구 상태 변경을 점검 중에 하지 않습니다.
- 교정은 명령을 보여주고 명시적 승인을 받은 뒤에만 실행합니다. `sudo`·권한 상승·관리 정책 우회 금지.
- 보고서에 비밀값·자격증명 값·개인 미디어 내용을 넣지 않습니다. 파일 "존재 여부"만 봅니다.

## 트리거 키워드

- 환경: "내 PC 환경 점검", "플러그인 실행 환경 진단", "실행 환경 확인"
- MCP: "MCP 왜 안 돼", "도구가 안 보여", "서버 기동 실패", "Connection closed"
- 런타임: "uv 설치돼 있어?", "Node 있어?", "Python 버전", "npx 되나"
- 미디어: "ffmpeg 확인", "한글 폰트 확인", "자막 한글 깨짐"
- UZ: "muhitni tekshirish", "kompyuter muhiti"

## 워크플로우

### 1단계 — 점검 범위 결정

요청된 작업(또는 실패한 도구)에서 필요한 능력만 고릅니다. 전부 점검하라는 요청이면 아래 표 전체를 돕니다. 상세 매트릭스는 [references/capability-matrix.md](references/capability-matrix.md).

| Capability | 관찰 근거(명령) | 필요한 GIL 기능 |
|---|---|---|
| Node.js 18+ | `node --version` (kordoc 4.x는 20+, dart는 20.19+) | context7·kordoc·dart(`npx`), gil-creative `reference-preview` |
| npx | `npx --version` | context7·kordoc·dart 기동 |
| uv | `uv --version` | smartstore·imweb·cafe24·threads-poster·ElevenLabs·dart 런처(`uv run --script mcp_launch.py`)·gil-mcp-ip(특허·상표)·gil-mcp-openai(GPT Image 2.5) |
| Python 3.10+ | `python --version` / `python3 --version` (Windows는 `py -3 --version`) | uv 서버 런타임, 표·컨택트시트·배치 헬퍼 |
| ffmpeg / ffprobe (선택) | `ffmpeg -version`, `ffprobe -version` | 영상 조립·자막 굽기·미디어 측정(gil-creative 영상 스킬) |
| ImageMagick (선택) | `magick -version` 또는 `convert -version` | 컨택트시트·배치 이미지 |
| 한글 폰트 | 선택 폰트의 문자맵에서 **승인된 문자열 전체**의 코드포인트 검사 | 영상·이미지 한글 자막·텍스트 굽기 |
| 자격증명 파일 | `~/.gil/mcp/<서비스>.json` 존재 여부(내용 미열람) | dart·threads_poster·smartstore·imweb·cafe24·elevenlabs |
| MCP 서버 기동 | Claude 앱 도구 목록에 해당 도구가 보이는지(사용자 확인 또는 `ToolSearch`) | 모든 로컬 MCP |
| OS | Windows `ver`/`$PSVersionTable` · Mac `sw_vers` · Linux `uname -a` | 설치 명령 분기 |
| device_bash 가용 | `mcp__remote-devices__device_bash` 호출 가능 여부 | 사용자 PC 관찰 자체 |

### 2단계 — 관찰 위치 확인

1. `device_bash`(사용자 PC의 Cowork 워크스페이스)가 있으면 그것으로 점검합니다.

   **HARD — VM과 호스트를 구분합니다.** `device_bash`는 사용자 PC 안에서 도는 **격리 리눅스 VM**이지 Windows·macOS 호스트가 아닙니다. Claude 데스크톱 앱은 **호스트**에서 MCP 서버를 기동하므로, VM에서 본 값으로 호스트를 판정하지 않습니다.
   - VM에서 관찰 가능: 연결 폴더의 파일, VM 쪽 `node`·`uv`·`python` 존재(참고값).
   - **호스트 기준으로는 `not_observable`**(사용자가 직접 실행한 결과를 받기 전까지): 호스트 OS·버전, 호스트 PATH의 `node`·`uv`·`npx`·`python`, `~/.gil/mcp/*.json`(VM `$HOME`은 호스트 홈이 아님), 설치된 폰트, MCP 서버 기동 여부.
   - Windows 전용 명령(`ver`, `$PSVersionTable`, `py -3`, `winget`)은 VM에서 실행되지 않습니다. 표의 명령은 **사용자가 직접 실행할 것**으로 제시하고, 돌아온 출력만 근거로 씁니다.
2. 클라우드 샌드박스 `Bash`만 있으면 그 결과는 "샌드박스 기준"으로 표기하고, 사용자 PC 항목은 `not_observable`로 둡니다.
3. 둘 다 없으면 사용자에게 진단 명령을 주고 결과를 받아 판정합니다. 결과가 오기 전에는 `해결안: 관찰 대기`.

### 3단계 — 비파괴 점검 실행

- 각 도구의 자체 버전 명령을 실행합니다. 종료 코드·stdout·stderr를 그대로 근거로 씁니다.
- 한글 폰트: 문자맵 조회(예: `fc-list :lang=ko`, `fc-query`, Python `fontTools`가 이미 있을 때 cmap 조회)로 **승인된 문자열의 모든 코드포인트**(한글·라틴·숫자·문장부호·기호)를 확인합니다. 렌더 테스트가 불가피하면 null sink(`ffmpeg -f null -`)를 쓰고, 파일을 써야만 하면 OS 임시 폴더에 고유 이름으로 만들고 검사 후 즉시 삭제합니다. 프로젝트 콘텐츠 폴더에는 쓰지 않습니다. 폰트 폴백을 끄고 검사합니다. **cmap을 볼 수단이 없으면**(Windows 호스트에 `fc-list`·`fontTools`가 없고 사용자 실행 결과도 없을 때) 폰트 파일이 보인다는 이유로 `available`로 적지 않고 `not_observable`로 둡니다. 글리프 부재가 실제로 확인되면 능력 상태는 `missing`이고, 굽기 작업은 다른 검증 폰트 승인 또는 비굽기 자막 산출물로 대체할 때까지 `막힌 작업`에 남습니다.
- 영상 조립은 `ffmpeg`가 있어도 `ffprobe`가 없으면 매니페스트 계획만 가능하고 미디어 쓰기·성공 주장은 멈춥니다.
- 자격증명 파일은 존재·크기만 확인하고 내용을 출력하지 않습니다.
- MCP 기동: Claude 앱에서 해당 도구 이름이 목록에 보이는지가 기준입니다. 서버가 뜨는데 401이면 런타임 문제가 아니라 자격증명 문제이므로 `gil:mcp-connector-setup`으로 넘깁니다.

### 4단계 — 교정 안내(승인 게이트)

빠진 항목마다 OS별 명령을 **병기**해 보여주고, 사용자가 명시적으로 승인한 뒤에만(그리고 device_bash로 실행 가능한 경우에만) 실행합니다. 패키지명·다운로드 크기·목적지·출처·영구 상태 변경 여부를 함께 적습니다.

uv 설치 명령은 표 안에서 파이프가 깨지기 쉬우므로 그대로 복사할 수 있게 블록으로 제시합니다.

```powershell
# Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

| 항목 | Windows (PowerShell) | macOS / Linux |
|---|---|---|
| uv | 위 PowerShell 블록 | 위 bash 블록 |
| Node.js LTS | nodejs.org LTS 설치본 실행 후 **새 터미널·Claude 앱 재시작** (또는 `winget install OpenJS.NodeJS.LTS`가 관찰될 때) | `brew install node` (brew 관찰 시) / `nvm install --lts` / NodeSource LTS 저장소 |
| Python 3.10+ | python.org 설치본(Add to PATH 체크) 또는 `winget install Python.Python.3.12` | `brew install python@3.12` / 배포판 패키지 |
| ffmpeg | `winget install Gyan.FFmpeg` (winget 관찰 시) 또는 gyan.dev 정적 빌드 압축 해제 후 PATH 추가 | `brew install ffmpeg` / `apt install ffmpeg` |
| ImageMagick | `winget install ImageMagick.ImageMagick` | `brew install imagemagick` / `apt install imagemagick` |
| 한글 폰트 | Windows 기본 `맑은 고딕`·`Malgun Gothic` 확인, 없으면 Noto Sans KR 설치 | macOS `Apple SD Gothic Neo` 확인, Linux `fonts-noto-cjk` |

- 위 표의 winget·brew·apt 명령은 해당 패키지 매니저가 **관찰된 뒤에만** 제시합니다. 관찰 안 됐으면 공식 설치본 링크만 안내합니다.
- Python 패키지 설치로 시스템 `ffmpeg` 바이너리를 대신할 수 없습니다. OS 도구와 Python 라이브러리는 분리해 다룹니다.
- 가벼운 Python 전용 의존성은 uv가 관찰될 때 작업 범위 `uv run --with` 환경을 승인 후 제안할 수 있습니다. 사용자 콘텐츠 폴더에 패키지·아카이브·폰트·설치본을 두지 않습니다.
- 설치 후에는 반드시 **Claude 앱 재시작**을 안내합니다(PATH 갱신 없이는 MCP가 여전히 못 찾음).
- 실행하지 않은 단계를 완료된 것처럼 적지 않습니다.

### 5단계 — 보고

아래 한국어 고정 템플릿으로 보고합니다. 항목이 없으면 `없음`으로 채우고 줄을 지우지 않습니다.

## 출력 형식

```text
환경: [관찰된 OS·런타임 위치(사용자 PC / 샌드박스) 또는 not_observable]
점검 범위: [요청된 작업 또는 실패한 도구]
사용 가능: [capability — 도구/버전/증거]
누락: [capability — 관찰 명령과 결과]
관찰 불가: [capability — 이유(셸 없음·PC 미연결 등)]
차단: [capability — 정책/샌드박스 사유]
지금 가능한 작업: [계획·매니페스트·표 등 현재 상태로 가능한 것]
막힌 작업: [정확한 단계]
해결안: [승인 필요한 조치 / 검증된 사용자 실행 명령(Windows·Mac 병기) / 없음 / 관찰 대기]
```

## 사용 예시

**예시 1** — "MCP 왜 안 돼? 공시 검색 도구가 안 보여"
→ 범위: dart. `node --version`(20.19+ 필요)·`npx --version`·`uv --version`·`~/.gil/mcp/dart.json` 존재. uv가 `missing`이면 Windows/Mac uv 설치 명령 병기 + 앱 재시작 안내. 파일이 없으면 자격증명은 `gil:mcp-connector-setup`으로.

**예시 2** — "uv 설치돼 있어?"
→ device_bash로 `uv --version`. 없으면 `missing` + 설치 명령 표시 후 승인 대기. device_bash가 없으면 `not_observable` + 사용자가 직접 실행할 명령 안내.

**예시 3** — "영상 자막에 한글이 네모로 나와"
→ 범위: ffmpeg·ffprobe·한글 폰트. 승인된 자막 문자열 전체를 폰트 cmap과 대조. 빠진 글리프 목록 + 대체 폰트 후보 제시. 굽기는 `blocked` 유지.

**예시 4** — "내 PC 환경 전체 점검"
→ 표 전체 실행 후 템플릿 보고. 샌드박스만 관찰 가능하면 환경 줄에 "샌드박스 기준, 사용자 PC not_observable" 명시.

## 주의사항

- 서버가 정상 기동하고 도구 목록도 뜨는데 호출만 401·실패하는 것은 자격증명 문제입니다(`.mcp.json` env의 `${KEY}`는 Claude 데스크톱에서 확장되지 않음). 본 스킬 범위가 아니라 `gil:mcp-connector-setup` 안내로 넘깁니다.
- 첫 `npx` 기동은 패키지 다운로드로 10~30초 걸릴 수 있습니다. 이를 "기동 실패"로 판정하지 않습니다.
- Windows에서 `python`이 Microsoft Store 별칭으로 잡혀 빈 결과를 내는 경우가 있습니다. `py -3 --version`을 함께 봅니다.
- 관찰된 OS와 패키지 매니저가 없으면 설치 명령을 추측하지 않고 진단 명령 결과를 먼저 요청합니다.
- 우즈베키스탄 맥락(키릴·라틴 UZ 폰트, 러시아어 로케일 PC)은 [references/uz-env-preflight.md](references/uz-env-preflight.md)를 참조합니다.

## 관련 스킬

- `gil:mcp-connector-setup` — 페어. 커넥터 계정·OAuth·API 키·D-3 `--check` 체크리스트(인증 단계). 본 스킬은 로컬 런타임 4상태 점검.
- `gil:doc-reader`·`gil:hwpx-writer`·`gil:form-filler`·`gil:doc-redactor` — kordoc CLI(`npx -y kordoc@^4`, Node 20+) 사용 스킬. MCP 없이 CLI로 동작하므로 "도구 목록에 parse_document가 없다"는 CLI 경로에는 영향이 없다
- `gil:korean-stock-search` · `gil:public-data` — dart(Node 20.19+ · uv) 사용 스킬
- `gil:tutor-research` — context7(Node 18+) 사용 스킬
- `gil-creative:reference-board` — reference-preview(Node 18+) 사용 스킬(해당 번들 설치 시)
- `gil-creative:audio-gen` · `gil-creative:threads-post-draft` — ElevenLabs·threads-poster(uv) 사용 스킬(해당 번들 설치 시)
- `gil-commerce:marketplace-naver` · `marketplace-d2c` — smartstore·imweb·cafe24(uv) 사용 스킬(해당 번들 설치 시)

## 출처

- chany-studio/chany-studio@v2.8.1 (MIT, 2026-09-15 반영) — 환경 사전 점검 스킬의 4상태·비파괴·교정 승인 계약을 GIL 로컬 MCP 런타임(Node·uv·npx·자격증명 파일)으로 확장
- GIL v2.3.1 CHANGELOG(2026-09-03) — context7 bash 배선·uv 미설치 실측, `scripts/check-plugin-runtimes.py`
- uv 설치 문서: https://docs.astral.sh/uv/getting-started/installation/
- Node.js LTS: https://nodejs.org
