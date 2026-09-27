---
name: mcp-connector-setup
description: |
  [책임 경계] Drive·Notion·Higgsfield·OpenAI 4커넥터 인증·환경변수·트러블슈팅 가이드 전담 트리거: "MCP 커넥터 연결", "Drive 인증 방법", "Notion Integration Token 어디서"
version: "2.4.0"
---
## 스킬 개요(상세)

[책임 경계] Drive·Notion·Higgsfield·OpenAI 4커넥터 인증·환경변수·트러블슈팅 가이드 전담. 페어 gil-commerce:commerce-morning-brief(MCP 매장 데이터 호출)와 명확히 구분 — 본 스킬은 커넥터 설치·인증 단계, 페어는 인증 이후 실제 MCP 호출 결과물.
다음과 같은 요청 시 반드시 이 스킬을 사용하세요:
"MCP 커넥터 연결", "Drive 인증 방법", "Notion Integration Token 어디서", "Higgsfield 키 발급", "OpenAI API 키 발급", "Windows MAX_PATH 오류", "한글 파일명 30자 오류", "computer:// 링크 안 열려요", "커넥터 4개 연결 방법", "MCP 4커넥터 인증".
v2.3.0 신규 (Wave 3 — Day 1 S4 셋업).

# MCP 커넥터 셋업 가이드

> **타 번들 연계**: 본 문서의 `gil-creative:*`·`gil-commerce:*` 참조는 해당 번들이 설치된 경우에만 체이닝합니다. 미설치 시 해당 단계를 생략하고 코어 스킬만으로 진행합니다.


## 개요

Day 1 S4 (14:00–14:50) 강의 시간에 수강생이 Drive·Notion·Higgsfield·OpenAI 4커넥터를 Cowork에 연결하는 단계별 가이드를 제공합니다. 인증 흐름 사이드바이사이드 시연 자산으로 사용되며, 합격 기준은 4커넥터 모두 인증 성공 + 1회 호출 성공입니다 (PDF §4.4 ③).

**시연 매핑**
- S4 14:00–14:10 강사 시연: 4커넥터 인증 흐름 사이드바이사이드
- S4 14:10–14:25 수강생 실습: 본인 계정으로 4커넥터 직접 연결
- S4 14:25–14:45 라이브 충격 시연: commerce-morning-brief + commerce-order-summary 1회 호출

**합격 기준 (PDF §4.4 ③)**
Drive·Notion·Higgsfield·OpenAI — 인증 성공 + 1회 호출 성공 (Drive: 폴더 list / Notion: 공유 페이지 read / Higgsfield: 모델 list / OpenAI: GPT Image 2 ping)

---

## 트리거 키워드

MCP 커넥터 연결, Drive 인증, Notion Integration Token, Higgsfield API 키, OpenAI Project Keys, 4커넥터 설치, computer:// 링크, MAX_PATH 오류, 한글 파일명 오류, OAuth redirect URI

---

## 워크플로우

### Step 1 — 사전 확인 (D-3 가입 안내 완료 전제)

수강생은 강의 당일 이전에 아래 계정을 생성해야 합니다 (PDF §8.3 D-7 메일):
- Google 계정 (Drive)
- Notion 계정
- Higgsfield 계정 + 워크스페이스 충전 (D-3 운영팀 안내)
- OpenAI 계정 (API 키 발급은 D-3 안내 메일 기준)

> **[HARD] PDF §6.2 수강생 절대 금지**: 강의 시간 중 API 키 발급 단계를 직접 수행하지 않습니다. 발급처 URL과 환경변수 입력 안내만 제공합니다.

---

### Connector A — Google Drive

**목적**: Cowork 폴더 마운트 + 파일 접근 (drive.readonly, drive.file 권한)

**인증 방법**: Cowork 앱 → 커넥터 추가 → Google Drive → OAuth 로그인

**필수 권한**
- `drive.readonly` — 파일 읽기
- `drive.file` — Cowork가 생성한 파일 접근

**인증 단계**
1. Cowork 앱 → 설정 → MCP 커넥터 → Google Drive 선택
2. "Google 계정으로 연결" 클릭
3. Google OAuth 화면에서 계정 선택 + 권한 허용
4. 연결 완료 후 Drive 폴더 list 1회 호출로 검증

**1회 호출 검증**: 폴더 목록이 응답에 나타나면 합격

---

### Connector B — Notion

**목적**: 강의 결과물 Notion 페이지 읽기·쓰기

**인증 방법**: Cowork 앱 → 커넥터 추가 → Notion → OAuth 인증

**인증 단계**
1. Cowork 앱 → 설정 → MCP 커넥터 → Notion 선택
2. "Notion으로 연결" 클릭
3. Notion OAuth 화면에서 워크스페이스 선택 + 페이지 접근 권한 허용
4. 연결 완료 후 공유 페이지 read 1회 호출로 검증

**1회 호출 검증**: 공유 페이지 내용이 응답에 나타나면 합격

---

### Connector C — Higgsfield

**목적**: Day 3 광고 영상 생성 (PDF §D-14 — 강사 워크스페이스 사전 충전 + 비용 한도 안내)

**인증 방법**: API 키 방식 (OAuth 아님)

**사전 확인 사항**
- 강사 운영팀: D-14 이전 Higgsfield 워크스페이스 충전 완료 확인
- 예상 사용량: Day 3 메인 영상 1편(5-10초) + 시연 1회 + 보조 영상 2컷
- 비용 한도: 운영팀이 강의 시작 전 공지 (PDF §6.9)

**인증 단계**
1. Cowork 앱 → 설정 → MCP 커넥터 → Higgsfield 선택
2. API Key 필드에 발급받은 키 입력 (발급처: higgsfield.ai → API Keys)
3. 연결 완료 후 모델 list 1회 호출로 검증

**1회 호출 검증**: 사용 가능한 모델 목록이 응답에 나타나면 합격

---

### Connector D — OpenAI

**목적**: GPT Image 2를 활용한 상세페이지 이미지 생성 (PDF 부록 E)

**인증 방법**: API 키 방식

**사용 범위 제한 (PDF 부록 E)**
- **사용**: GPT Image 2 (이미지 생성)
- **미사용**: GPT-5.5, Sora — 수강생에게 필요 없음

**인증 단계**
1. Cowork 앱 → 설정 → MCP 커넥터 → OpenAI 선택
2. API Key 필드에 발급받은 Project Key 입력 (발급처: platform.openai.com → API Keys)
3. 연결 완료 후 GPT Image 2 ping 1회 호출로 검증

**1회 호출 검증**: 모델 상태 응답이 나타나면 합격

---

### Connector E — Node.js 기반 로컬 MCP (kordoc · dart) — 사전 준비물 (2026-09-02 신설, v2.3.1 자격증명 경로 갱신)

gil 코어 `.mcp.json`의 `kordoc`(한국 공문서 파서)과 `dart`(korean-dart-mcp, OpenDART)는
`command: npx`로 기동합니다. **Node.js가 없으면 오류 메시지 없이 도구가 조용히 사라져** 진단이
어렵습니다 — 도구 목록에 `parse_document`·공시 검색 도구가 보이지 않으면 먼저 여기를 확인하세요.

| 커넥터 | 요구 | 키 | 확인 |
|---|---|---|---|
| kordoc | **Node.js 18+** | 불필요 | `node --version` → v18 이상 |
| dart (korean-dart-mcp) | **Node.js 20.19+** (LTS 권장) + **uv**(런처 `mcp-launch/mcp_launch.py`가 `uv run --script`로 기동) | `DART_API_KEY` — 설치 시 입력 폼 또는 `~/.gil/mcp/dart.json` (셸 export는 CLI 전용) | `node --version` → v20.19 이상, `uv --version` |

**설치**: Windows — [nodejs.org](https://nodejs.org) LTS 설치본(설치 후 **새 터미널/앱 재시작**) /
macOS — `brew install node` / Debian·Ubuntu — NodeSource LTS 저장소 또는 `nvm`.

**첫 호출**: npm이 패키지를 내려받아(약 10~30초) 캐시합니다. 이후 즉시 기동.
**1회 호출 검증**: kordoc — 임의 HWP/PDF에 `parse_document` → 마크다운 응답 / dart — 회사명 1건 공시 검색 응답.

> **[v2.3.1 HARD] 자격증명은 `.mcp.json`의 `${KEY}`로 전달되지 않는다** — Claude 데스크톱 앱은 이를 확장하지 않는다(모태 실측). 키가 필요한 모든 커넥터(dart·korean-law·ElevenLabs·threads·smartstore·imweb·cafe24)는 ① 플러그인 설치 시 입력 폼(`userConfig`) ② `~/.gil/mcp/<서비스>.json` 파일 중 하나로 넣는다. 사용자가 "키를 넣었는데 401"이라고 하면 이 두 경로로 다시 넣게 안내한다. 상세: 각 번들 `CONNECTORS.md` 머리말.

> Windows에서 한컴 오피스가 설치된 경우 kordoc은 DRM 배포용 HWP/HWPX COM fallback이 추가로 동작합니다(선택).

---

## 트러블슈팅

### T1 — Windows MAX_PATH 260자 초과 오류 (PDF §4.3 S2)

**증상**: Cowork 폴더 마운트 실패, 경로 관련 오류 메시지

**원인**: Windows 기본 MAX_PATH 260자 제한. 한글 파일명이 포함된 긴 경로에서 자주 발생.

**해결 방법**
1. 폴더를 드라이브 루트 가까운 위치로 이동 (예: `C:\cowork\` 또는 `D:\cw\`)
2. 한글 파일명 30자 룰: 폴더명·파일명을 30자 이내로 유지
3. 필요 시 Windows Registry로 MAX_PATH 제한 해제 (관리자 권한 필요)

**조교 대응 (PDF §8.5 Plan B)**: 10분 안에 해결 안 되면 조교 1:1 원격 화면공유. 안 되면 강사 노트북에서 Drive 폴더로 임시 진행.

---

### T2 — `computer://` 링크 안 열림 (PDF §4.3 S2)

**증상**: Cowork가 제공하는 `computer://` 링크를 클릭해도 열리지 않음

**해결 방법**
1. Chrome 시크릿 모드로 재시도
2. 브라우저 기본 프로토콜 핸들러 확인 (설정 → 기본 앱 → 링크 처리)
3. Cowork 앱 재시작 후 재시도

---

### T3 — OAuth 인증 실패 (Drive·Notion)

**증상**: OAuth 화면에서 "접근 거부" 또는 redirect 오류

**해결 방법**
1. Chrome 시크릿 모드에서 재시도 (캐시된 세션 충돌 방지)
2. Google 계정이 workspace 계정인 경우: 관리자 승인이 필요할 수 있음
3. OAuth redirect URI 문제: Cowork 앱 버전 업데이트 후 재시도
4. 팝업 차단 해제 확인 (브라우저 설정 → 팝업 허용)

---

### T4 — API 키 인증 실패 (Higgsfield·OpenAI)

**증상**: "Invalid API key" 또는 "Unauthorized" 오류

**해결 방법**
1. API 키 앞뒤 공백 없이 정확히 복사·붙여넣기 확인
2. OpenAI: Project Keys 사용 확인 (계정 전체 API Keys 아님)
3. Higgsfield: 워크스페이스 충전 여부 확인 (잔액 부족 시 인증 실패)
4. 키 재발급 후 재시도

---

## 슬래시 커맨드 등록 안내 (Day 1 S6, REQ-SETUP-006)

Day 1 S6 (16:10–16:20) — 강사 시연 시점에 수강생 CLAUDE.md에 아래 3개 슬래시 커맨드 등록:

```markdown
## 슬래시 커맨드

- `/morning-brief` — 아침 브리핑 (commerce-morning-brief)
- `/detail-copy` — 상세페이지 카피 (detail-page-copy)
- `/channel-msg` — 채널 메시지 (commerce-channel-message)
```

수강생은 `본인_폴더/CLAUDE.md`에 위 블록을 직접 붙여넣어 등록합니다.

---

## MCP Phase 1 미출시 상태 안내 (REQ-SETUP-007)

GIL eCommerce MCP Phase 1이 미출시 상태일 때 `/commerce-morning-brief` 또는 `/commerce-order-summary` 호출 시 다음 안내 메시지가 표시됩니다:

> 현재 GIL eCommerce MCP Phase 1은 출시 준비 중입니다.  
> 강사 사전 녹화 영상(5분)을 함께 시청해 주세요.  
> 수강생 베타 테스터 우선 배정 신청 가능합니다.

---

## D-3 사전 점검 체크리스트 (`--check` 옵션)

D-7 사전 준비물 메일 기준으로 4커넥터 가입·인증 상태를 체크하는 옵션입니다.

```
/mcp-connector-setup --check
```

출력 예시:
```
[✅] Google Drive — 계정 확인 완료
[✅] Notion — 계정 확인 완료
[⚠️] Higgsfield — 워크스페이스 충전 미확인 (운영팀 확인 필요)
[⚠️] OpenAI — API 키 미입력 (D-3 안내 메일 참조)
```

---

## 사용 예시

**예시 1**
> "Drive MCP 연결하는 방법 알려줘"

→ Connector A (Google Drive) 인증 단계 제공 + 1회 호출 검증 안내

**예시 2**
> "Windows에서 Cowork 마운트가 안 돼요"

→ T1 (MAX_PATH 오류) 해결 방법 제공 + 조교 연락 Plan B 안내

**예시 3**
> "OpenAI 키 어디서 발급받아요"

→ platform.openai.com → API Keys → Project Keys 발급 URL 안내 (직접 발급 단계는 D-3 메일 기준)

---

## 출력 형식

- 단계별 인증 가이드 (Markdown)
- 트러블슈팅 해결 방법 (번호 목록)
- `--check` 옵션: 4커넥터 상태 체크리스트 (`.md` 파일 저장 가능)

---

## 합격 기준 (PDF §4.4 ③)

| 커넥터 | 인증 방법 | 1회 호출 검증 |
|--------|-----------|---------------|
| Google Drive | OAuth (drive.readonly, drive.file) | 폴더 list 응답 |
| Notion | OAuth (워크스페이스 연결) | 공유 페이지 read 응답 |
| Higgsfield | API Key | 모델 list 응답 |
| OpenAI | Project API Key | GPT Image 2 ping 응답 |

4커넥터 모두 인증 성공 + 1회 호출 성공 시 산출물 ③ 합격.

---

## 관련 스킬

- `gil-commerce:commerce-morning-brief` — 인증 완료 후 아침 브리핑 MCP 호출
- `gil-commerce:commerce-morning-brief` — 인증 완료 후 신규 주문 통합 호출
- `gil:course-operations-manual` — D-7 사전 준비물 메일 (계정 가입 안내 포함)
- `gil:env-preflight` — 로컬 런타임(Node·uv·npx·Python·ffmpeg·한글 폰트·자격증명 파일 존재) 4상태 점검. 본 스킬 `--check`는 커넥터 인증, 페어는 실행 환경

---

## 이 스킬을 사용하지 말아야 할 때

- 이미 4커넥터가 모두 연결된 경우 → `commerce-morning-brief` 또는 `commerce-order-summary` 직접 호출
- MCP 호출 결과물(아침 브리핑·주문 요약) 생성이 목적인 경우 → `gil-commerce` 스킬 사용
- Cowork 앱 설치 자체가 안 되는 경우 → Cowork 공식 지원 채널 문의 (본 스킬 범위 외)
- 광고 운영 4종 MCP (Facebook Ads, Google Ads 등) 연결 → SPEC-COMMERCE-MCP-002 별도 커넥터
