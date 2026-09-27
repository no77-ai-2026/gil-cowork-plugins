# 능력 매트릭스 (capability-matrix)

GIL 3번들의 로컬 MCP 서버·미디어 작업이 어떤 런타임에 의존하는지, 무엇으로 관찰하는지, 상태를 어떻게 판정하는지 정리한 표입니다. 모든 항목은 "실행 결과"만 근거로 삼고, 실행하지 못한 것은 `not_observable` 또는 `blocked`로 둡니다.

## 1. GIL MCP 서버 → 런타임 의존

| 번들 | 서버 | 기동 명령 | 필요한 런타임 | 자격증명 파일(`~/.gil/mcp/`) | 도구가 보이는지 확인할 이름 |
|---|---|---|---|---|---|
| gil | context7 | `npx -y @upstash/context7-mcp@latest` | Node 18+ · npx | 없음 | `resolve-library-id`, `query-docs` |
| gil | kordoc | `npx -y kordoc mcp` | Node 18+ · npx | 없음 | `parse_document` |
| gil | dart | `uv run --script mcp-launch/mcp_launch.py -- npx -y korean-dart-mcp` | uv · Node 20.19+ · npx | `dart.json` (`DART_API_KEY`) | 공시 검색 도구 |
| gil | korean-law · korean-stats · archhub | http(원격) | 없음(네트워크만) | 없음(`korean-law`는 설치 폼 OC 키) | — |
| gil-creative | reference-preview | `node mcp-servers/reference-preview/server.mjs` | Node 18+ | 없음 | `fetch_reference_preview_image` |
| gil-creative | ElevenLabs | `uv run --script mcp_launch.py -- uvx elevenlabs-mcp` | uv · Python 3.10+ | `elevenlabs.json` | TTS 도구 |
| gil-creative | gil-mcp-threads-poster | `uv run --directory mcp-servers/gil-mcp-threads-poster` | uv · Python 3.10+ | `threads_poster.json` | Threads 발행 도구 |
| gil-creative | typefully · wordpress · meta-ads · higgsfield | http(원격, OAuth) | 없음 | 없음 | — |
| gil-commerce | smartstore · imweb · cafe24 | `uv run --directory mcp-servers/...` | uv · Python 3.10+ | `smartstore.json` · `imweb.json` · `cafe24.json` | 각 커머스 도구 |

원격(http) 서버는 본 스킬의 점검 대상이 아닙니다. 원격 서버의 인증 실패는 `gil:mcp-connector-setup`.

## 2. 관찰 명령과 판정

| Capability | Windows | macOS / Linux | `available` 기준 | 주의 |
|---|---|---|---|---|
| OS | `ver` 또는 `$PSVersionTable.OS` | `sw_vers` / `uname -a` | 문자열 반환 | device_bash는 사용자 PC의 Linux VM이라 호스트 OS와 다를 수 있음 — 보고에 명시 |
| Node.js | `node --version` | 동일 | `v18.x` 이상(dart는 `v20.19` 이상) | 설치 직후에는 새 터미널·앱 재시작 전까지 `missing`처럼 보임 |
| npx | `npx --version` | 동일 | 버전 반환 | Node와 함께 설치되지만 별도로 관찰 |
| uv | `uv --version` | 동일 | `uv 0.x` 반환 | Windows 설치 경로 `%USERPROFILE%\.local\bin` — PATH 갱신 전엔 못 찾음 |
| Python | `py -3 --version` 및 `python --version` | `python3 --version` | `3.10` 이상 | Windows Store 별칭이 빈 출력을 내면 `py -3` 결과 우선 |
| ffmpeg | `ffmpeg -version` | 동일 | 버전 + 필요한 인코더(`-encoders`)·필터(`-filters`) 확인 | 자막 굽기는 `drawtext`/`subtitles` 필터, libfreetype 빌드 필요 |
| ffprobe | `ffprobe -version` | 동일 | 버전 반환 | ffmpeg가 있어도 별도 확인. 없으면 능력은 `missing`, 미디어 쓰기는 `막힌 작업` |
| ImageMagick | `magick -version` | `magick -version` 또는 `convert -version` | 버전 반환 | Linux `convert`는 ImageMagick 6일 수 있음 |
| 한글 폰트 | `fc-list :lang=ko` (fontconfig 있을 때) / 폰트 폴더 목록 | `fc-list :lang=ko` | 승인 문자열의 모든 코드포인트가 cmap에 있음 | 폴백 끄고 검사. 한글뿐 아니라 라틴·숫자·문장부호·기호까지 |
| 자격증명 파일 | `Test-Path ~\.gil\mcp\<svc>.json` | `test -f ~/.gil/mcp/<svc>.json` | 파일 존재 | 내용은 절대 출력·열람하지 않음 |
| MCP 기동 | Claude 앱 도구 목록 / `ToolSearch("select:<도구명>")` | 동일 | 도구 이름이 목록에 보임 | 보이는데 401 → 자격증명 문제(페어 스킬) |
| device_bash | `mcp__remote-devices__device_bash` 호출 시도 | 동일 | 명령 결과 반환 | 없으면 사용자 PC 항목 전부 `not_observable` |

## 3. 4상태 판정 흐름

```text
명령을 실행할 수 있는가?
  아니오 → 정책·샌드박스가 막았는가? → 예: blocked / 아니오(수단 자체 없음): not_observable
  예 → 결과가 "찾을 수 없음"인가? → 예: missing
                                    → 아니오: 버전·능력 조건 충족? → 예: available / 아니오: missing (버전 미달, 관찰값 병기)
```

버전 미달(예: Node 16)은 `missing`으로 두고 관찰된 버전을 함께 적습니다("Node v16.20 관찰, 18+ 필요").

## 4. 한글 폰트 코드포인트 검사 절차

1. 굽기에 쓸 **승인된 문자열 전체**를 확정합니다(자막 전문·타이틀·숫자·괄호·물결표·중점 등 포함).
2. 문자열을 코드포인트 집합으로 만듭니다(Python이 있으면 `{ord(c) for c in s}`).
3. 선택 폰트의 cmap을 조회합니다: `fc-query --format='%{charset}\n' <font>` 또는 이미 설치된 `fontTools`로 `TTFont(path).getBestCmap()`. 새 패키지를 설치하지 않습니다.
4. 빠진 코드포인트를 목록으로 보고합니다(문자와 U+ 코드 병기).
5. cmap 조회 수단이 없을 때만 렌더 테스트: `ffmpeg -f lavfi -i color=c=black:s=64x64:d=0.1 -vf "drawtext=fontfile=<font>:text='<문자열>'" -f null -` 처럼 null sink로 실행하고, 파일이 꼭 필요하면 OS 임시 폴더에 고유 이름으로 쓴 뒤 즉시 삭제합니다. 이 경우 보고에 "일시 파일 검사"라고 적고 "읽기 전용"이라 부르지 않습니다.
6. 하나라도 빠지면 능력 상태는 `missing`(글리프 부재 확인)이고 굽기는 `막힌 작업`에 넣습니다. 대안: 다른 검증 폰트 승인, 또는 비굽기 자막 파일(SRT/VTT) 산출.
7. cmap을 볼 수단 자체가 없으면(`fc-list`·`fontTools` 부재, 사용자 실행 결과 없음) 폰트 파일이 보여도 `available`이 아니라 `not_observable`입니다.

기본 후보 폰트: Windows `Malgun Gothic`(맑은 고딕) · macOS `Apple SD Gothic Neo` · Linux `Noto Sans CJK KR`. 후보가 있다고 `available`이 아니며, 코드포인트 검사를 통과해야 `available`입니다.

## 5. 교정 명령(승인 후·관찰된 OS와 매니저에 한함)

| 항목 | Windows PowerShell | macOS | Linux(Debian/Ubuntu) | 영구 상태 변경 |
|---|---|---|---|---|
| uv | `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 \| iex"` | `curl -LsSf https://astral.sh/uv/install.sh \| sh` | 동일 | 예(`~/.local/bin`) |
| Node LTS | nodejs.org LTS 설치본 / `winget install OpenJS.NodeJS.LTS` | `brew install node` / `nvm install --lts` | NodeSource LTS / `nvm install --lts` | 예 |
| Python | python.org(Add to PATH) / `winget install Python.Python.3.12` | `brew install python@3.12` | `apt install python3` | 예 |
| ffmpeg | `winget install Gyan.FFmpeg` / gyan.dev 정적 빌드 | `brew install ffmpeg` | `apt install ffmpeg` | 예 |
| ImageMagick | `winget install ImageMagick.ImageMagick` | `brew install imagemagick` | `apt install imagemagick` | 예 |
| Noto Sans CJK KR | 구글 폰트 다운로드 후 사용자 폰트 설치 | 동일(Font Book) | `apt install fonts-noto-cjk` | 예 |

- winget·brew·apt·nvm 명령은 그 매니저가 관찰됐을 때만 제시합니다.
- 어떤 명령도 승인 전에 실행하지 않고, 실행했더라도 결과를 다시 관찰해 상태를 갱신한 뒤에만 `available`로 바꿉니다.
- 설치 후 Claude 앱 재시작 안내는 항상 붙입니다.
