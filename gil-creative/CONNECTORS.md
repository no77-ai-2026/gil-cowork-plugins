# GIL 통합 커넥터 안내 (MCP/API)

> **[v2.3.1 HARD] 자격증명 주입 방식 (2026-09-03)** — `.mcp.json`의 `"env": {"KEY": "${KEY}"}` 참조는 **Claude 데스크톱 앱에서 확장되지 않습니다**(모태 실측: 서버는 정상 기동·도구 목록도 뜨지만 문자열 `${KEY}`가 그대로 전달돼 모든 호출이 401). 아래 각 절의 "환경변수 설정"은 **Claude Code CLI(셸 export)에서만** 유효합니다. Cowork 데스크톱에서는 다음 둘 중 하나를 쓰세요.
> 1. **플러그인 설치 시 입력 폼** — 각 번들 `plugin.json`의 `userConfig`에 선언된 키(gil: `DART_API_KEY`·`KOREAN_LAW_OC` / gil-creative: `THREADS_*`·`IG_*`·`ELEVENLABS_API_KEY` / gil-commerce: `NAVER_COMMERCE_*`·`IMWEB_*`·`CAFE24_*`). Claude 앱이 키체인에 보관하고 `.mcp.json`은 `${user_config.KEY}`로 참조합니다. 플러그인 설정 화면에서 언제든 수정 가능.
> 2. **자격증명 파일** `~/.gil/mcp/<서비스>.json` (Windows `C:\Users\<사용자>\.gil\mcp\`) — 서비스 슬러그: `smartstore`·`imweb`·`cafe24`·`threads_poster`·`dart`·`elevenlabs`. 자체 서버 4종은 `gil_mcp_core.CredentialStore`가, 제3자 서버(dart·ElevenLabs)는 `mcp-launch/mcp_launch.py` 런처가 이 파일을 읽어 실제 값을 채운 뒤 서버를 실행합니다. korean-law만 키가 URL에 들어가 1번 경로만 지원.
> 확장되지 않은 `${...}`와 빈 문자열은 "값 없음"으로 판정되어 다음 경로로 넘어갑니다.



---
# [gil-business] 커넥터 안내

# gil-business 커넥터 가이드

## DART (금융감독원 전자공시시스템)

기업 공시 데이터를 조회하여 시장 분석, 경쟁사 분석, 재무 모델링에 활용합니다.

### API 키 발급

1. [DART Open API](https://opendart.fss.or.kr) 접속
2. 회원가입 (공인인증서 불필요, 이메일 인증만)
3. 마이페이지 > 인증키 신청
4. 발급된 인증키 복사

### 환경변수 설정

```
DART_API_KEY=발급받은_인증키
```

### 제공 데이터

| API | 용도 |
|-----|------|
| 공시 검색 | 사업보고서, 분기보고서, 주요사항보고서 |
| 기업 개황 | 회사명, 업종, 대표자, 설립일, 상장일 |
| 재무제표 | 재무상태표, 손익계산서, 현금흐름표 |
| 지분 공시 | 최대주주, 임원 지분 변동 |
| 배당 정보 | 배당금, 배당률, 배당 성향 |

### 요율 제한

- 일 10,000건 (무료)
- 분당 600건
- 초과 시 429 에러 반환

### 활용 스킬

- `strategy-planner`: 경쟁사 재무 분석, 시장 규모 추정
- `market-analyst`: 산업 동향, 기업 비교 분석
- `investor-relations`: IR 자료의 재무 데이터 검증

---

## MOLIT 실거래가 (k-skill-proxy 경유, v2.0.0+)

국토교통부 부동산 실거래가/전월세 신고 데이터를 NomaDamas의 hosted 프록시(`k-skill-proxy.nomadamas.org`) 경유로 조회합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (프록시가 키를 보유)
- 인터넷 연결만 있으면 동작

### 환경변수 (선택)

```
KSKILL_PROXY_BASE_URL=https://k-skill-proxy.nomadamas.org   # 기본값. self-host 시 변경
```

### Self-host 시 추가 설정 (운영 측)

self-host 프록시를 운영하려면 프록시 서버 환경에 다음 키를 등록합니다.

```
DATA_GO_KR_API_KEY=발급받은_공공데이터포털_키
```

발급: [공공데이터포털](https://www.data.go.kr) 회원가입 → 활용신청 → 자동승인. 일 1,000회(개발계정).

### 활용 스킬

- `real-estate-search`: 아파트·오피스텔·빌라·단독·상업용 매매·전월세 시세
- `market-analyst`: 부동산 시세 데이터 기반 시장 분석
- `investor-relations`: 부동산 자산 실거래가 IR 자료


---
# [gil-commerce] 커넥터 안내

# gil-commerce 커넥터 가이드

## MFDS (식품의약품안전처) — k-skill-proxy 경유, v2.0.0+

식약처 의약품·식품 안전 공식 OpenAPI를 NomaDamas의 hosted 프록시(`k-skill-proxy.nomadamas.org`) 경유로 조회합니다. 헬스/F&B 커머스 상품의 안전성 확인, 회수·부적합 이력 점검에 활용합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (프록시가 키를 보유)
- 인터넷 연결만 있으면 동작

### 환경변수 (선택)

```
KSKILL_PROXY_BASE_URL=https://k-skill-proxy.nomadamas.org   # 기본값. self-host 시 변경
```

### Self-host 시 추가 설정 (운영 측)

```
DATA_GO_KR_API_KEY=공공데이터포털_키        # 의약품 + 부적합 식품
FOODSAFETYKOREA_API_KEY=식품안전나라_키      # 건강기능식품 + 회수 live
```

발급:

- 공공데이터포털: [data.go.kr](https://www.data.go.kr) 회원가입 → 활용신청 → 자동승인
- 식품안전나라: [foodsafetykorea.go.kr](https://www.foodsafetykorea.go.kr) 회원가입 → OpenAPI 이용신청. 키 1개로 I-0040, I-0050, I0030, I0490, I2620 모두 사용

`FOODSAFETYKOREA_API_KEY`가 없으면 sample feed로 fallback 가능.

### 제공 데이터

| 카테고리 | 정보 |
|---|---|
| 의약품 | e약은요 (효능·사용법·주의사항·상호작용) + 안전상비의약품 |
| 건강기능식품 | 기능성 원료 인정현황 (I-0040), 개별인정형 (I-0050), 품목제조 신고 (I0030) |
| 검사부적합 | 국내 검사부적합 (I2620), 부적합 식품 |
| 회수·판매중지 | 식품안전나라 (I0490) |

### 활용 스킬

- `mfds-safety`: 의약품·식품 통합 안전 체크 (red flag 인터뷰 우선)
- `commerce-integrated-strategy`: 헬스/F&B 신상품 기획 시 안전성 검토
- `detail-page-copy`: 안전 정보 반영한 상세페이지 카피
- `marketplace-coupang`/`marketplace-naver`: 헬스/F&B 카테고리 상품 등록 시 안전성 검증

### Red Flag 정책 (HARD)

`mfds-safety` 스킬은 사용자가 증상·복용/섭취 상황을 말하면 **반드시 인터뷰로 먼저 되묻고**, red flag(`호흡곤란`, `의식저하`, `혈변`, `심한 탈수`, `심한 발진` 등)가 발견되면 API 조회보다 **즉시 119·응급실·의료진 안내**가 우선합니다. 진단·처방·복용 지시는 하지 않습니다.


---
# [gil-content] 커넥터 안내

# gil-content 커넥터 가이드

## WordPress (Cowork 내장 커넥터)

WordPress 사이트에 블로그 포스트를 직접 발행합니다.

### 연결 방법

1. Claude Cowork > **Settings** > **Connectors**
2. **WordPress** 선택 > **Connect**
3. WordPress.com 계정 인증 (OAuth)
4. 발행할 사이트 선택

### 스킬 내 동작

스킬 실행 시 WordPress 커넥터 연결 여부를 자동 확인합니다:
- **연결됨**: 블로그 카피 생성 → WordPress에 직접 발행 (카테고리, 태그, 특성 이미지 자동 설정)
- **미연결**: "WordPress 커넥터가 연결되어 있지 않습니다. Settings > Connectors에서 WordPress를 연결하세요." 안내 후, 마크다운 카피만 생성합니다

### 활용 스킬

- `blog`: WordPress 블로그 포스트 생성 및 발행/예약

### 참고

- 네이버 블로그, 티스토리, 브런치, Ghost 등은 Cowork 커넥터가 없으므로 콘텐츠 생성까지만 지원합니다 (발행은 수동)
- WordPress.org (자체 호스팅)는 WordPress.com 계정 연동이 필요합니다 (Jetpack 플러그인)


---
# [gil-finance] 커넥터 안내

# gil-finance 커넥터 가이드

## 법원경매정보 (courtauction.go.kr, v2.0.0+)

대법원이 운영하는 공식 법원경매정보 사이트의 매각공고와 사건정보를 read-only로 조회합니다. 자산 처분·경매 투자·실사 검토에 활용합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (사이트는 공개 데이터)
- Node.js 환경 (사이트 내부 WebSquare JSON XHR 직접 호출)
- `rebrowser-playwright` 또는 `playwright-core` (선택, 차단·5xx 시 fallback)

### Throttling — 매우 중요

사이트는 자동화 호출에 매우 민감합니다.

- 호출 간 **최소 2초** 지연
- 기본 세션 호출 budget **10회**
- 16회/30초 정도면 IP가 **약 1시간 차단**됩니다
- 차단 발생 시 자동 retry 금지(차단 연장 위험), 즉시 멈추고 사용자에게 안내

### 환경변수

본 커넥터는 환경변수를 요구하지 않습니다.

### 활용 스킬

- `court-auction-search`: 매각공고 조회·사건번호 단건 조회
- `financial-statements`: 경매 투자 타당성 분석
- `variance-analysis`: 감정평가액 vs 최저매각가 분석

---

## KRX (한국거래소) — k-skill-proxy 경유, v2.0.0+

KRX 상장 종목 검색·기본정보·일별 시세를 NomaDamas의 hosted 프록시(`k-skill-proxy.nomadamas.org`) 경유로 조회합니다. gil-business의 DART(공시) 데이터를 보완하는 시세 데이터로 활용합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (프록시가 키를 보유)
- 인터넷 연결만 있으면 동작

### 환경변수 (선택)

```
KSKILL_PROXY_BASE_URL=https://k-skill-proxy.nomadamas.org   # 기본값. self-host 시 변경
```

### Self-host 시 추가 설정 (운영 측)

```
KRX_API_KEY=발급받은_KRX_OpenAPI_키
```

발급: [KRX Open API](https://openapi.krx.co.kr/contents/OPP/MAIN/main/index.cmd) 회원가입 후 신청.

### 제공 데이터

| 시장 | 종목 검색 | 기본정보 | 일별 시세 |
|---|---|---|---|
| KOSPI | ✅ | ✅ | ✅ |
| KOSDAQ | ✅ | ✅ | ✅ |
| KONEX | ✅ | ✅ | ✅ |

read-only 일별 snapshot. **실시간 호가·체결은 미제공**.

### 활용 스킬

- `korean-stock-search`: 종목 검색·기본정보·일별 시세
- `variance-analysis`: 시세 변동 분석
- `investor-relations` (gil-business): IR 자료 작성 시 KRX 공식 시세
- `executive-summary` (gil-bi): 경영진 1pager 시세 요약

### Disclaimer (HARD)

본 커넥터는 **read-only 조회 전용**이며 **투자 자문이 아닙니다**. 답변 말미에 "KRX 공식 데이터 기준 / 투자 조언 아님" 고지를 항상 남깁니다.


---
# [gil-legal] 커넥터 안내

# gil-legal 커넥터 가이드

## korean-law (국가법령정보센터 MCP)

법제처 법령 원문, 판례, 행정규칙을 실시간 검색합니다.

### API 키 발급

1. [법제처 Open API](https://open.law.go.kr) 접속
2. 회원가입 후 로그인
3. 마이페이지 > API 인증키 신청
4. 발급된 OC(인증코드) 복사

### 환경변수 설정

```
KOREAN_LAW_OC=발급받은_인증코드
```

### 제공 도구 (14개)

| 도구 | 용도 |
|------|------|
| 법령 검색 | 법령명/키워드로 법률 검색 |
| 법령 조문 | 특정 법률의 조항 전문 조회 |
| 판례 검색 | 대법원/헌법재판소 판례 검색 |
| 행정규칙 | 고시, 훈령, 예규 검색 |
| 법령 연혁 | 법률 개정 이력 추적 |

### 요율 제한

- 일 1,000건 (무료)
- 초과 시 별도 신청 필요

### MCP 서버

korean-law-mcp는 [korean-law-mcp.fly.dev](https://korean-law-mcp.fly.dev)에서 호스팅되는 HTTP MCP 서버입니다. URL 파라미터에 OC를 포함하여 인증합니다.

### 활용 스킬

- `contract-review`: 계약 조항의 법적 근거 확인
- `compliance-check`: 규제 준수 여부의 법령 기반 검증
- `legal-risk`: 관련 판례 조회로 리스크 평가
- `nda-triage`: 영업비밀보호법 관련 조항 확인

---

## 인터넷등기소 (IROS, v2.0.0+)

대법원 인터넷등기소(`iros.go.kr`)에서 법인·부동산 등기부등본을 묶음 단위로 발급할 때 안전한 작업 순서와 로컬 자동화를 보조합니다.

### 사용 측 준비

- **에이전트는 로그인·결제를 직접 수행하지 않습니다** (보안 경계)
- Chrome/Chromium, Python 3.10+, Playwright 설치 가능 환경
- IROS 로그인 수단(아이디·공동인증서·간편인증) — 사용자가 브라우저에서 직접
- TouchEn nxKey 사전 설치 + 결제 카드

### upstream 참고 구현 (사용자 환경에 clone)

```bash
git clone https://github.com/challengekim/iros-registry-automation.git
cd iros-registry-automation
git checkout 7c6924b2ff88d693a12556659188cb91041e5097
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

업스트림 핀(SHA) 변경은 신뢰 경계 변경이므로 새 upstream diff 검토 후 같은 PR에서 갱신합니다.

### 환경변수 (선택)

본 스킬은 환경변수를 요구하지 않습니다. 사용자 입력은 모두 **저장소 밖** 안전 폴더(`mktemp -d`)에 둡니다.

### 활용 스킬

- `iros-registry-automation`: 법인·부동산 등기부등본 일괄 발급 보조
- `legal-risk`: 발급된 등기부등본 기반 법적 리스크 분석
- `compliance-check`: 등기 변경 이력 기반 준수 점검


---
# [gil-marketing] 커넥터 안내

# gil-marketing — MCP 커넥터 가이드

본 플러그인은 메타 광고 운영·분석에 필요한 2개 MCP 서버를 등록한다.

## 등록 MCP 서버 요약

| 이름 | 책임 | 유형 | 라이선스 | 인증 |
|------|------|------|----------|------|
| `meta-ads` | Layer 1 — Meta 공식 Ads AI Connectors (라이브 운영 + Marketing API 데이터 fetch) | `http` (hosted) | Meta 약관 | Meta Business OAuth 2.0 |
| `gil-ads-audit` | Layer 2 — 50-check audit + 가중치 스코어링 + 한국 벤치마크/컴플라이언스 | `stdio` (local uvx) | MIT | `MOAI_LOG_LEVEL` (선택) |

3-Layer 아키텍처:

- **Layer 1** (공식 MCP): `meta-ads` — Meta 공식 **Ads AI Connectors** (`https://mcp.facebook.com/ads`)
- **Layer 2** (자체 MCP): `gil-ads-audit` — audit 비즈니스 로직, `.xlsx` 입력 단독 모드도 항상 지원
- **Layer 3** (스킬):
  - `gil-creative:meta-ads-manager` — 공식 MCP 기반 **라이브 운영**(캠페인·광고세트·광고 생성·수정·예산·온오프)
  - `gil-creative:meta-ads-analyzer` — 보고서 **분석·진단**(`.xlsx` 1-6개 → 9 모듈·4D 교차·🟢🟡🔴 액션)

`meta-ads` 비활성 환경에서도 `gil-ads-audit` 단독으로 `.xlsx` 보고서 업로드 모드 동작 (REQ-AUDIT-MCP-005).

---

## gil-mcp-openai (GPT Image 2.5 정확 모델 지정 MCP, v2.5.0+ · gil-creative)

모태 modu-ai/moai-cowork의 `moai-mcp-openai`를 리브랜드 vendor(Apache-2.0). OpenAI Image API로 `gpt-image-2.5-flare`(기본)·`gpt-image-2.5-sunburst`를 **정확히 지정해** 생성한다(도구 `openai_image_generate` 1종, 1회 1장·편집 미지원).

- **사전 설치**: uv (`gil:env-preflight`로 확인)
- **자격증명**: 설치 입력 폼 `OPENAI_API_KEY` 또는 `~/.gil/mcp/openai.json`. ChatGPT 구독·로그인과는 별개인 **OpenAI API 키·별도 과금**이다. 키는 채팅에 붙여 넣지 않는다.
- **사용 스킬**: `gil-creative:image-bridge`(A0 경로, 사용자가 2.5를 명시할 때), 프롬프트는 `gil-creative:gpt-image-prompt`
- GIL 기본 요청 모델은 여전히 `gpt-image-2`(`image-bridge/references/image-generation-runtime.md`). 2.5는 사용자 명시 요청 시에만 쓰며 유료 생성 승인 게이트·2회 상한을 그대로 적용한다.

---

## gil-mcp-ip (특허·상표 공식 데이터 MCP, v2.5.0+ · gil)

KIPRIS Plus·USPTO·JPO·EPO 공식 데이터. 자격증명 입력 폼 7칸(쓰지 않는 소스는 비워 둠) 또는 `~/.gil/mcp/ip.json`, 사전 설치 uv. 사용 스킬 `gil:legal-ip-search-report`. 상세는 gil 번들 `mcp-servers/gil-mcp-ip/CONNECTORS.md`.

---

## reference-preview (Pinterest 레퍼런스 미리보기 MCP, v2.4.0+ · gil-creative)

레퍼런스 보드 스킬(`gil-creative:reference-board`)이 Pinterest 레인 후보를 **대화 안에 실제 이미지**로 표시할 때 쓰는 아주 작은 로컬 서버입니다. 도구 1개(`fetch_reference_preview_image`), 비밀값·API 키 없음.

### 사용 측 준비
- **Node.js 18 이상**만 필요(추가 npm 패키지 없음). `context7`(npx)과 같은 요구사항이라 새로 설치할 것은 보통 없습니다. 확인: `node -v`. 없으면 `gil:env-preflight`가 상태를 보고하고 설치 안내를 합니다.
- 자동 등록: `gil-creative/.mcp.json`의 `reference-preview` 항목(`alwaysLoad: true`).

### 보안 설계 (변경 금지)
- 공개 `pinterest.com/pin/...` 페이지와 짝지어진 `i.pinimg.com` 미리보기 1장만 가져옵니다. 다른 호스트·사설망·링크로컬 주소는 DNS 해석 단계에서 차단(DNS 고정으로 리바인딩 방지).
- 크기 세그먼트를 `/236x/`로 강제, 92 KiB·4,096px·8,388,608px 상한, 리다이렉트 3회·8초 제한, 선언 MIME과 실제 바이트 대조, 쿠키·인증 헤더 미전송, 파일 쓰기 없음.
- 이 도구는 **표시**만 담당합니다. 검색(발견)은 Cowork `WebSearch`/`WebFetch` 또는 사용자 브라우저가 담당하며, 검색 결과의 Pin↔미리보기 짝은 "발견 도구가 제공한 매핑, 미검증"으로 표기됩니다.
- 표시된 이미지는 **방향 자료(direction-only)** 입니다. 픽셀·인물·로고·카피를 산출물에 옮기지 않습니다.

### 트러블슈팅
- 도구가 목록에 없음 → `ToolSearch(query: "select:fetch_reference_preview_image")`로 지연 로드. 그래도 없으면 Node 미설치 또는 `.mcp.json` 미반영 — `gil:env-preflight` 실행.
- 이미지가 표시되지 않고 오류 문구만 → 해당 후보를 다른 공개 후보로 교체(같은 카테고리 재검색은 추가 허락 없이 자동).
- 테스트: `gil-creative/mcp-servers/reference-preview/`에서 `node --test` (15건).

### 출처
chany-studio/chany-studio v2.8.1 `mcp/reference-preview` (MIT) — 소스 무변경 vendor, LICENSE 동봉.

---

## Meta Ads — 공식 커넥터 연결

Meta 공식 **Meta Ads AI Connectors**(한글: Meta 광고 AI 커넥터, 2026-04-29 오픈 베타)는 Ads MCP 서버 + Ads CLI로 구성된다. AI 에이전트(Claude 등)를 사용자의 Meta 광고 계정에 연결해 자연어로 광고를 생성·관리·분석한다. 공식 안내: <https://www.facebook.com/business/help/1456422242197840>.

### OAuth 2.0 커넥터 (1차 · 권장)

공식 기본 인증 경로다. 앱 생성·앱 심사·토큰 수동 복사가 **필요 없다**. 클라이언트(Claude)가 Meta Business OAuth 로그인을 브라우저에서 수행하고 액세스 토큰을 자동 발급한다.

- **엔드포인트**: `https://mcp.facebook.com/ads`
- **표준**: RFC 9728 Protected Resource Metadata + RFC 6750 Bearer
- **OAuth scope**: `ads_management ads_read catalog_management business_management pages_show_list`

#### A. Claude Cowork / Desktop (비개발자 1차 경로)

1. Settings → Connectors → **Add custom connector**
2. 이름 입력 + URL `https://mcp.facebook.com/ads` 입력 후 Add
3. 브라우저가 열리며 **Meta Business OAuth 로그인** 진행 (필요 시 2FA)
4. 공유할 광고 계정·페이지 선택 + 권한 등급 선택 (read-only로 시작 권장 → 필요 시 read+write/financial)
5. "내 광고 계정 목록 보여줘" 등 자연어 프롬프트로 연결 검증. 쓰기·재무 동작은 매번 사용자 승인. 권한 철회는 Meta Business Suite에서.

#### B. Claude Code (`.mcp.json`)

정적 Authorization 헤더를 넣지 않는다. OAuth 커넥터 흐름이 인증을 처리한다.

```json
{
  "mcpServers": {
    "meta-ads": {
      "type": "http",
      "url": "https://mcp.facebook.com/ads"
    }
  }
}
```

### 정적 토큰 (Fallback · 강등)

OAuth가 불가한 개발 환경 **전용 fallback**이다. 개발자/시스템 사용자 토큰을 Graph API Explorer에서 발급한다.

1. <https://developers.facebook.com/> → **My Apps** → **Create App** ("Business" 유형)
2. 앱 대시보드 → **Marketing API** 제품 추가 → **Graph API Explorer**
3. 권한 선택: `ads_read`(필수) · `ads_management`(선택) · `business_management`(선택)
4. **Generate Access Token** → `export META_ACCESS_TOKEN="EAA..."` (`.zshrc`/`.bashrc` 또는 `~/.claude/settings.json` env)

> ⚠️ OAuth 보호 엔드포인트(`mcp.facebook.com/ads`)는 일반 정적 Bearer를 거부할 수 있다(라이브 프로브에서 더미 Bearer는 403). **항상 OAuth 커넥터를 먼저** 사용하고, 정적 토큰은 우선순위가 낮은 fallback으로만 둔다.

### 보안 (MCP 키 관리 원칙)

- 토큰을 코드·plugin.json·SKILL.md에 절대 하드코딩하지 않는다
- 토큰을 git에 commit하지 않는다 (`.gitignore` 확인 — `.env`, `.envrc`, `**/secrets/**`)
- 토큰을 로그·stdout에 노출하지 않는다 (`MOAI_LOG_LEVEL=DEBUG` 환경에서도 자동 마스킹, REQ-AUDIT-MCP-023)
- 토큰 갱신 주기: Meta 단기 토큰 60일 / 시스템 사용자 장기 토큰 발급 시 사실상 영구

---

## gil-ads-audit — 로컬 설치 및 환경변수

### 설치 (uvx 자동 처리)

`uvx`가 시스템에 설치되어 있어야 한다. 설치되어 있지 않다면:

```
curl -LsSf https://astral.sh/uv/install.sh | sh
```

`.mcp.json`의 `gil-ads-audit` 항목이 로컬 gil-ads-audit MCP(번들 미포함, 선택) 명령으로 자동 실행한다. 첫 실행 시 uvx가 패키지를 isolated 가상환경에 설치한다.

### 환경변수 (선택)

| 변수 | 기본값 | 용도 |
|------|--------|------|
| `MOAI_LOG_LEVEL` | `INFO` | 로깅 수준 (DEBUG/INFO/WARNING/ERROR). DEBUG 시에도 자격증명·인구통계 raw 데이터는 자동 마스킹. |

### 도구 10종 (v0.1.0 — 우선 3종 구현)

| # | 도구 이름 | 책임 | v0.1.0 |
|---|----------|------|-------|
| 1 | `audit_meta_account` | 4 카테고리 합산 health score 진입점 | ✅ |
| 2 | `audit_pixel_capi` | Pixel/CAPI Health 10개 check (EMQ·dedup·AEM·키 파라미터) | ✅ |
| 3 | `audit_creative_diversity` | Creative Diversity & Fatigue 12개 check | ⏸ 라운드 4 |
| 4 | `audit_account_structure` | Account Structure 10개 check (Learning Limited·CBO/ABO) | ⏸ 라운드 4 |
| 5 | `audit_audience_targeting` | Audience & Targeting 7개 check | ⏸ 라운드 4 |
| 6 | `audit_andromeda_emq` | Andromeda & Platform 4개 check | ⏸ 라운드 4 |
| 7 | `calculate_health_score` | 가중치 공식 점수 + A-F 등급 | ✅ |
| 8 | `generate_quick_wins` | Critical/High + <15분 분류 | ⏸ 라운드 4 |
| 9 | `apply_korean_benchmarks` | 8 카테고리 한국 시장 벤치마크 비교 | ⏸ 라운드 4 |
| 10 | `apply_korean_compliance` | 5 규제 (PIPA·ITNA·전상법·표시광고법·식약처) | ⏸ 라운드 4 |

---

## 검증 (등록 후)

```
# 1. .mcp.json 문법 검사
python3 -c "import json; json.load(open('.mcp.json')); print('OK')"

# 2. gil-ads-audit-mcp 직접 호출 (--version)
uvx --from ./mcp-servers/gil-ads-audit gil-ads-audit-mcp --version
# 기대: gil-ads-audit-mcp 0.1.0

# 3. Claude Code 재시작 후 MCP 도구 목록 확인 (meta-ads 첫 호출 시 OAuth 로그인)
```

---

## Attribution

`gil-ads-audit` MCP 서버의 audit 방법론은 [`agricidaniel/claude-ads`](https://github.com/AgriciDaniel/claude-ads) v1.5.1 (MIT License)의 50-check matrix·가중치 스코어링 공식·Quick Wins 로직을 한국 시장 7 변화 영역에 맞춰 차용했다.

전체 attribution 텍스트는 `NOTICE.md` §"agricidaniel/claude-ads (MIT)" 참조.

`meta-ads` 커넥터는 Meta 공식 Ads AI Connectors를 사용하며, 서드파티 오픈소스 Meta Ads MCP는 사용하지 않는다.

---

Last Updated: 2026-05-30


---
# [gil-media] 커넥터 안내

# gil-media 커넥터·API 가이드

## 개요

`gil-media`는 **4개 스킬 + 2개 MCP 번들**로 구성됩니다:

- **이미지 프롬프트 빌더 3종** (`gpt-image-prompt`·`gemini-3-image-prompt`·`midjourney-v8-prompt`) — 텍스트 프롬프트만 산출, API 키 불필요
- **음성 생성 1종** (`audio-gen`) — ElevenLabs MCP 호출, `ELEVENLABS_API_KEY` 1개 필요

**번들 MCP 2종** (`gil-media/.mcp.json`에 자동 등록):
- **Higgsfield MCP** (hosted, `https://mcp.higgsfield.ai/mcp`) — 이미지·영상 생성 30+ 모델
- **ElevenLabs MCP** (uvx stdio) — 음성·TTS·더빙

## MCP 번들 (자동 등록)

`gil-media` 플러그인 설치 시 `.mcp.json`의 2개 MCP가 Cowork에 자동 등록됩니다.

### Higgsfield (hosted MCP, OAuth)

```json
{
  "higgsfield": {
    "type": "http",
    "url": "https://mcp.higgsfield.ai/mcp"
  }
}
```

**첫 연결 절차**:
1. gil-media 설치 후 Cowork에서 "Higgsfield" 커넥터가 보입니다
2. **Connect** 버튼 클릭 → 브라우저가 Higgsfield 로그인 페이지로 이동
3. Higgsfield 계정으로 로그인 (없으면 [higgsfield.ai](https://higgsfield.ai)에서 가입)
4. 권한 승인 → Cowork로 자동 복귀
5. 1회만 인증하면 이후 모든 호출이 본인 계정·잔액으로 처리됨

**API 키 별도 발급 불필요**. Higgsfield 계정의 OAuth 토큰으로 인증·요금이 처리됩니다.

**지원 모델 (30+)**:
- 이미지: Soul · Nano Banana · Seedream · Flux · Cinema Studio
- 영상: Sora 2 · Veo 3 · Kling 3.0 · Minimax Hailuo · Seedance · Wan
- 특수: DOP (Director of Photography) · Speak (말하는 머리) · Character (캐릭터 일관성)

### ElevenLabs (`ELEVENLABS_API_KEY`) — `audio-gen` 전용

**용도**: TTS, 보이스 클로닝, 다국어 더빙, 효과음 생성

**발급**:
1. [elevenlabs.io](https://elevenlabs.io) 가입
2. [elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)에서 키 생성
3. Free 티어: 월 10,000자 TTS 무료

**등록**:
```bash
# .gil/credentials.env
ELEVENLABS_API_KEY=sk_...
```

**MCP 자동 등록 설정** ([공식 GitHub](https://github.com/elevenlabs/elevenlabs-mcp) 기준):

```json
{
  "ElevenLabs": {
    "command": "uvx",
    "args": ["elevenlabs-mcp"],
    "env": { "ELEVENLABS_API_KEY": "${ELEVENLABS_API_KEY}" }
  }
}
```

- **uvx 자동 설치** — 최초 실행 시 `elevenlabs-mcp` 패키지 자동 설치
- 사전 준비: `uv` 설치 (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- `which uvx` 결과가 비어 있으면 PATH에 추가 필요 (`~/.local/bin` 등)
- Windows 사용자: Claude Desktop "Help → Enable Developer Mode" 활성화 필요
- [공식 MCP GitHub](https://github.com/elevenlabs/elevenlabs-mcp)

**옵션 환경변수** (필요 시 추가):

| 변수 | 기본 | 용도 |
|---|---|---|
| `ELEVENLABS_API_KEY` | 필수 | API 인증 |
| `ELEVENLABS_MCP_BASE_PATH` | `~/Desktop` | 파일 출력 디렉토리 |
| `ELEVENLABS_MCP_OUTPUT_MODE` | `files` | files / resources / both |
| `ELEVENLABS_API_RESIDENCY` | `us` | 데이터 거주지 |

**로그 위치** (트러블슈팅):
- macOS: `~/Library/Logs/Claude/mcp-server-elevenlabs.log`
- Windows: `%APPDATA%\Claude\logs\mcp-server-elevenlabs.log`

**대체 설치 방법** (pip):
```bash
pip install elevenlabs-mcp
python -m elevenlabs_mcp --api-key=${ELEVENLABS_API_KEY}
```

## 스킬-도구 매핑

| 스킬 | 출력·동작 | 사용 MCP |
|---|---|---|
| `gpt-image-prompt` | OpenAI 6-Block 프롬프트 텍스트 | (직접 호출 X) — ChatGPT 등에 사용자가 복붙 |
| `gemini-3-image-prompt` | Google 5-component 프롬프트 텍스트 | (직접 호출 X) — Google AI Studio에 복붙 또는 Higgsfield MCP로 호출 (Nano Banana 모델) |
| `midjourney-v8-prompt` | 키워드+`--파라미터` 텍스트 | (직접 호출 X) — Discord `/imagine` 또는 alpha.midjourney.com에 복붙 |
| `audio-gen` | MP3·WAV·OGG 음성 파일 | **ElevenLabs MCP** 자동 호출 |
| (이미지·영상 직접 생성) | 결과 파일 | **Higgsfield MCP** 자동 호출 (30+ 모델) |

## Higgsfield MCP 활용 패턴

### 패턴 1 — 카드뉴스·SNS 이미지

```
"카드뉴스 4장 만들어 줘" 또는 "인스타 비주얼 생성"
→ card-news 스킬로 프롬프트 생성
→ Higgsfield MCP의 Soul 또는 Nano Banana 모델로 자동 렌더링
```

### 패턴 2 — 광고 영상 (피드·릴스)

```
"제품 광고 30초 영상 만들어 줘"
→ 스토리보드·컷 설계
→ Higgsfield MCP의 Veo 3 또는 Sora 2 모델 호출
```

### 패턴 3 — 인물·캐릭터 일관성

```
"같은 모델로 다양한 포즈 5컷"
→ Higgsfield Character 모델 + 시드 고정
```

### 패턴 4 — 카메라 무브먼트

```
"줌인·트래킹 영상 효과로"
→ Higgsfield DOP (Director of Photography) 모델
```

### 패턴 5 — 말하는 머리·립싱크

```
"이 스크립트를 인물이 말하는 영상으로"
→ Higgsfield Speak 모델 + ElevenLabs TTS 음성 결합
```

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| Higgsfield MCP "Not connected" | OAuth 인증 미완료 | Cowork → 설정 → MCP → Higgsfield → Connect 클릭 |
| Higgsfield 모델 호출 실패 | 워크스페이스 잔액 부족 | higgsfield.ai → Billing에서 충전 |
| `uvx elevenlabs-mcp` 실패 | `uv` 미설치 | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| ElevenLabs 401 | API 키 오류 | 대시보드에서 키 재확인 |
| ElevenLabs Free 한도 초과 | 월 10,000자 소진 | 유료 플랜 또는 다음 달 대기 |
| Higgsfield 응답 느림 | 영상 모델은 30-60초 소요 정상 | 대기 (Sora·Veo는 1-2분도 가능) |
| 프롬프트 빌더 결과가 안 좋음 | 입력 컨텍스트 부족 | AskUserQuestion 프리셋(제품샷·인물·일러스트·풍경) 재선택 |

## 비용 관리

- **이미지 프롬프트 빌더 3종**: 비용 0원 (텍스트 생성만)
- **`audio-gen`** (ElevenLabs):
  - Free: 월 10,000자 TTS
  - Starter ($5/월): 30,000자 + 음성 복제 10개
  - Creator ($22/월): 100,000자 + 더빙 30분
- **Higgsfield** (이미지·영상):
  - Free: 약간의 무료 크레딧 (가입 시)
  - 유료 플랜: higgsfield.ai/pricing
  - 모델별 크레딧 소비량 다름 (영상이 이미지보다 큼)

## Higgsfield CLI (옵션)

MCP 외에 Higgsfield CLI를 별도로 쓸 수도 있습니다. CLI는 .mcp.json과 무관하게 터미널에서 직접 호출:

```bash
# Higgsfield CLI 설치
curl -LsSf https://higgsfield.ai/cli/install.sh | sh

# 이미지 생성
higgsfield generate image "...prompt..."

# 영상 생성
higgsfield generate video "...prompt..."
```

CLI는 MCP를 대체하지 않고 보조입니다. MCP가 통합 워크플로우에 더 적합합니다.

## 자료 출처

- [Higgsfield 공식 MCP](https://higgsfield.ai/mcp) — hosted MCP 서버 안내
- [Higgsfield 공식 사이트](https://higgsfield.ai) — 계정·요금·모델
- [ElevenLabs MCP GitHub](https://github.com/elevenlabs/elevenlabs-mcp)
- [Higgsfield CLI](https://higgsfield.ai/cli)


---
# [gil-public-data] 커넥터 안내

# gil-public-data 커넥터 가이드

한국 공공·데이터 조회 5개 소스의 설정 절차를 한곳에 모았습니다. 대부분 사용자 측 키가 필요 없고, data.go.kr·KOSIS만 무료 키 등록이 필요합니다. 모든 커넥터는 **read-only 조회 전용**입니다.

| 데이터 소스 | 활용 스킬 | 사용자 키 | 비고 |
|------|------|:--------:|------|
| KRX (한국거래소) | `korean-stock-search` | 불필요 | k-skill-proxy가 키 보유 |
| 법원경매정보 | `court-auction-search` | 불필요 | 공개 데이터, 2초 throttle 필수 |
| 국토교통부 실거래가 (MOLIT) | `real-estate-search` | 불필요 | k-skill-proxy가 키 보유 |
| 공공데이터포털 (data.go.kr) | `public-data` | DATA_GO_KR_API_KEY | 무료, 1,000회/일 |
| KOSIS 통계청 | `public-data` | KOSIS_API_KEY | 무료, 1,000회/일 |

---

## 1. KRX (한국거래소) — k-skill-proxy 경유

KRX 상장 종목 검색·기본정보·일별 시세를 NomaDamas의 hosted 프록시(`k-skill-proxy.nomadamas.org`) 경유로 조회합니다. gil-business의 DART(공시) 데이터를 보완하는 시세 데이터로 활용합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (프록시가 키를 보유)
- 인터넷 연결만 있으면 동작

### 환경변수 (선택)

```
KSKILL_PROXY_BASE_URL=https://k-skill-proxy.nomadamas.org   # 기본값. self-host 시 변경
```

### Endpoints

```
GET /v1/korean-stock/search?q={검색어}&bas_dd={YYYYMMDD}
GET /v1/korean-stock/base-info?market={KOSPI|KOSDAQ|KONEX}&code={코드}&bas_dd={YYYYMMDD}
GET /v1/korean-stock/trade-info?market={KOSPI|KOSDAQ|KONEX}&code={코드}&bas_dd={YYYYMMDD}
```

### Self-host 시 추가 설정 (운영 측)

```
KRX_API_KEY=발급받은_KRX_OpenAPI_키
```

발급: [KRX Open API](https://openapi.krx.co.kr/contents/OPP/MAIN/main/index.cmd) 회원가입 후 신청.

### Disclaimer (HARD)

read-only 일별 snapshot. **실시간 호가·체결은 미제공**이며 **투자 자문이 아닙니다**. 답변 말미에 "KRX 공식 데이터 기준 / 투자 조언 아님" 고지를 항상 남깁니다.

---

## 2. 법원경매정보 (courtauction.go.kr)

대법원이 운영하는 공식 법원경매정보 사이트의 매각공고와 사건정보를 read-only로 조회합니다. 공식 OPEN API가 없어 사이트 내부 WebSquare JSON XHR endpoint를 직접 호출합니다.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (사이트는 공개 데이터)
- Node.js 환경 (npm 패키지 `court-auction-notice-search` 호출)
- `rebrowser-playwright` 또는 `playwright-core` (선택, 차단·5xx 시 fallback)

### 환경변수

본 커넥터는 환경변수를 요구하지 않습니다.

### Endpoints (사이트 내부 직접 호출)

```
POST /pgj/pgj143/selectRletDspslPbanc.on       — 매각공고 목록
POST /pgj/pgj143/selectRletDspslPbancDtl.on    — 매각공고 상세 (사건/물건 펼치기)
POST /pgj/pgj15A/selectAuctnCsSrchRslt.on      — 사건 단건 조회
POST /pgj/pgjComm/selectCortOfcCdLst.on        — 법원사무소코드 전체
```

### Throttling — 매우 중요 (HARD)

사이트는 자동화 호출에 매우 민감합니다.

- 호출 간 **최소 2초** 지연 (기본)
- 기본 세션 호출 budget **10회**
- 빠른 연속 조회 시 IP가 **약 1시간 차단**됩니다
- 차단(`data.ipcheck === false`) 발생 시 자동 retry 금지(차단 연장 위험), 즉시 멈추고 사용자에게 안내

### Disclaimer (HARD)

데이터는 공고 시점 기준이며 정정·취하·연기로 변경될 수 있습니다. **실제 입찰 전에는 법원 원문을 재확인**해야 합니다. 입찰 자동화는 절대 미지원입니다.

---

## 3. 국토교통부 실거래가 (MOLIT) — k-skill-proxy 경유

국토교통부 실거래가 신고 데이터로 아파트·오피스텔·연립다세대·단독다가구·상업업무용 부동산의 매매·전월세 시세를 조회합니다. NomaDamas hosted 프록시(`k-skill-proxy.nomadamas.org`) 경유.

### 사용 측 준비

- **사용자 측 시크릿 불필요** (프록시가 키를 보유)
- 인터넷 연결만 있으면 동작

### 환경변수 (선택)

```
KSKILL_PROXY_BASE_URL=https://k-skill-proxy.nomadamas.org   # 기본값. self-host 시 변경
```

### Endpoints

```
GET /v1/real-estate/region-code?q={지역명}
GET /v1/real-estate/:assetType/:dealType?lawd_cd={5자리법정동코드}&deal_ymd={YYYYMM}
```

| assetType | dealType | 설명 |
|---|---|---|
| `apartment` | `trade` / `rent` | 아파트 매매 / 전월세 |
| `officetel` | `trade` / `rent` | 오피스텔 매매 / 전월세 |
| `villa` | `trade` / `rent` | 연립다세대 매매 / 전월세 |
| `single-house` | `trade` / `rent` | 단독/다가구 매매 / 전월세 |
| `commercial` | `trade` | 상업업무용 매매 (`rent` 미지원) |

### Self-host 시 추가 설정 (운영 측)

```
DATA_GO_KR_API_KEY=발급받은_공공데이터포털_키
```

(실거래가 upstream은 공공데이터포털 MOLIT API이며, 운영 프록시 측에만 둡니다.)

### Disclaimer (HARD)

국토교통부 신고 데이터이며 **실거래가와 호가를 섞어 말하지 않습니다**. 답변 말미에 출처(국토교통부 실거래가 신고)를 남깁니다. 가격 단위는 만원(예: `245000` = 24억 5천만원).

---

## 4. 공공데이터포털 (data.go.kr)

공공데이터포털의 각종 공공 API를 실시간 조회합니다.

### 사용 측 준비 (HARD — 키 필수)

1. [data.go.kr](https://www.data.go.kr/) 접속 → 회원가입
2. 개발계정 신청 → 활용신청 → 자동승인
3. 무료, **1,000회/일** (개발계정)

### 환경변수

```
DATA_GO_KR_API_KEY=발급받은_서비스키
```

키 입력 후 `${CLAUDE_PLUGIN_DATA}/gil-credentials.env`에 저장합니다.

### 호출 패턴

```
GET https://apis.data.go.kr/{기관코드}/{서비스명}?ServiceKey={키}&...
```

응답: JSON 또는 XML.

---

## 5. KOSIS 통계청

KOSIS(통계청) OpenAPI로 인구·경제·물가·고용 등 국가통계를 실시간 조회합니다.

### 사용 측 준비 (HARD — 키 필수)

1. [kosis.kr/openapi](https://kosis.kr/openapi/) 접속 → 회원가입
2. 인증키 신청 → 자동승인 즉시 발급
3. 무료, **1,000회/일**

### 환경변수

```
KOSIS_API_KEY=발급받은_인증키
```

키 입력 후 `${CLAUDE_PLUGIN_DATA}/gil-credentials.env`에 저장합니다.

### 호출 패턴

```
GET https://kosis.kr/openapi/Param/statisticsParameterData.do
  ?method=getList
  &apiKey={키}
  &itmId=T10
  &objL1=ALL
  &format=json
  &jsonVD=Y
  &prdSe=M
  &startPrdDe=202501
  &endPrdDe=202512
  &orgId=101
  &tblId=DT_1B04005N
```

응답 포맷: JSON, XML, SDMX.

### 주요 KOSIS 통계 분류

| 분류 | 예시 |
|------|------|
| 인구 | 인구총조사, 주민등록인구 |
| 경제 | GDP, 경제성장률 |
| 물가 | 소비자물가지수 |
| 고용 | 경제활동인구, 실업률 |


---
# [gil-support] 커넥터 안내

# gil-support 커넥터 가이드

## Slack (Cowork 내장 커넥터)

고객 지원 채널 메시지 조회, 에스컬레이션 알림 전송에 사용합니다.

### 연결 방법

Claude Cowork에서 Slack 커넥터를 연결합니다:

1. Claude Cowork > **Settings** > **Connectors**
2. **Slack** 선택 > **Connect**
3. Slack 워크스페이스 인증 (OAuth)
4. 접근 허용할 채널 선택

### 스킬 내 동작

스킬 실행 시 Slack 커넥터 연결 여부를 자동 확인합니다:
- **연결됨**: Slack 채널에서 CS 문의를 직접 조회하고, 에스컬레이션 알림을 전송합니다
- **미연결**: "Slack 커넥터가 연결되어 있지 않습니다. Settings > Connectors에서 Slack을 연결하세요." 안내 후, 수동 입력으로 진행합니다

### 활용 스킬

- `ticket-triage`: Slack 채널에서 CS 문의 자동 수집 및 분류
- `escalation-manager`: 에스컬레이션 시 담당자에게 Slack DM 알림
- `draft-response`: Slack 스레드에 응답 초안 작성

---

## Notion (Cowork 내장 커넥터)

KB(Knowledge Base) 문서를 Notion 데이터베이스로 관리합니다.

### 연결 방법

1. Claude Cowork > **Settings** > **Connectors**
2. **Notion** 선택 > **Connect**
3. Notion 워크스페이스 인증
4. 접근 허용할 페이지/데이터베이스 선택

### 스킬 내 동작

스킬 실행 시 Notion 커넥터 연결 여부를 자동 확인합니다:
- **연결됨**: Notion 데이터베이스에 KB 문서를 직접 생성/업데이트합니다
- **미연결**: "Notion 커넥터가 연결되어 있지 않습니다. Settings > Connectors에서 Notion을 연결하세요." 안내 후, 마크다운 파일로 KB 문서를 생성합니다

### 활용 스킬

- `kb-article`: Notion 데이터베이스에 KB 문서 생성/업데이트
- `escalation-manager`: Notion에 에스컬레이션 로그 기록


---
# [gil] 커넥터 안내

# GIL Connectors Guide

GIL 플러그인은 Cowork 공식 커넥터와 연동하여 외부 도구와 직접 상호작용할 수 있습니다.
커넥터는 무료이며, 한 번 인증하면 모든 세션에서 유지됩니다.

## 커넥터 설정 방법

1. Claude Cowork 좌측 메뉴 > Settings > Connectors
2. 원하는 도구 선택 > "Connect" 클릭
3. 해당 도구 계정으로 인증 (OAuth)
4. 연결 완료 — GIL 스킬에서 즉시 사용 가능

## 플러그인별 권장 커넥터

### gil-content (콘텐츠)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **WordPress** | 블로그 포스트 직접 발행, 기존 글 수정 | 공식 커넥터 |
| **Canva** | 카드뉴스, SNS 이미지, 프레젠테이션 디자인 | 공식 커넥터 |
| ~~post-bridge~~ | (2026-09-02 제거) 공식 호스팅 MCP 부재 — 다중 발행은 typefully·wordpress 커넥터 사용 | — |
| typefully | 트위터/X 스레드 예약 발행 | 커스텀 MCP |

### gil-marketing (마케팅)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Gmail** | 이메일 캠페인 발송, 시퀀스 관리 | 공식 커넥터 |
| **HubSpot** | CRM 연동, 리드 관리, 캠페인 추적 | 공식 커넥터 |
| **Canva** | SNS 이미지, 광고 소재 제작 | 공식 커넥터 |

### gil-product (제품)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Notion** | 로드맵, PRD, 스프린트 보드 관리 | 공식 커넥터 |
| **Figma** | UX 리서치, 디자인 피드백, 핸드오프 | 공식 커넥터 |
| **Asana** / **Linear** / **Jira** | 이슈 트래킹, 스프린트 관리 | 공식 커넥터 |

### gil-office (문서)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Google Drive** | Google Docs/Sheets 저장, 공유, 실시간 편집 | 공식 커넥터 |
| **Google Sheets** | 스프레드시트 데이터 직접 편집/분석 | 공식 커넥터 |
| **Gmail** | 문서 이메일 발송, 첨부파일 관리 | 공식 커넥터 |
| **Notion** | 보고서/회의록/제안서를 Notion 페이지로 발행 | 공식 커넥터 |
| **Airtable** | 구조화된 데이터 조회/관리 | 공식 커넥터 |
| **Microsoft 365** | Outlook, OneDrive, SharePoint, Teams | 공식 커넥터 |

### gil-support (고객지원)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Slack** | 티켓 알림, 팀 소통, 에스컬레이션 | 공식 커넥터 |
| **HubSpot** | 고객 이력 조회, 지원 티켓 관리 | 공식 커넥터 |

### gil-operations (운영)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Slack** | 결재 알림, 프로세스 소통 | 공식 커넥터 |
| **Notion** | SOP 문서, 운영 매뉴얼 관리 | 공식 커넥터 |
| **Asana** / **Jira** | 업무 트래킹, KPI 보고 | 공식 커넥터 |

### gil-data (데이터 분석)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Airtable** | 구조화된 데이터 조회/분석/업데이트 | 공식 커넥터 |
| **Google Sheets** | 스프레드시트 데이터 분석, 결과 출력 | 공식 커넥터 |
| **Google Drive** | CSV/Excel 파일 저장/공유 | 공식 커넥터 |
| **Notion** | 분석 결과 보고서 발행 | 공식 커넥터 |

### gil-research (연구/특허)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| **Google Drive** | 논문/특허 보고서 저장/공유 | 공식 커넥터 |
| **Notion** | 연구 노트, 문헌 관리 | 공식 커넥터 |
| **Google Calendar** | 출원 기한, 연구비 마감일 관리 | 공식 커넥터 |

### gil-business (비즈니스 전략)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| dart (DART OpenAPI) | 기업 공시 조회, 재무제표 분석 | 커스텀 MCP (API 키 필요) |

### gil-legal (법률)

| 커넥터 | 활용 | 유형 |
|--------|------|------|
| korean-law | 법령 검색, 판례 조회 | 커스텀 MCP (API 키 필요) |

### 공공데이터포털 (gil-data)

1. [data.go.kr](https://www.data.go.kr/) 회원가입 → 개발계정 → 활용신청 → 자동승인 (무료, 1,000회/일)
2. `/project apikey`로 등록

### KOSIS 통계청 (gil-data)

1. [KOSIS OpenAPI](https://kosis.kr/openapi/introduce/introduce_01List.do) 회원가입 → 자동승인 즉시 발급 (무료, 1,000회/일)
2. [개발가이드 PDF](https://kosis.kr/openapi/file/openApi_manual_v1.0.pdf)
3. `/project apikey`로 등록

### KIPRIS Plus 특허 (gil-research)

1. [KIPRIS Plus](https://plus.kipris.or.kr/) 회원가입 → 실명인증 → 인증키 발급
   - 또는 [data.go.kr](https://www.data.go.kr/data/15065437/openapi.do) 경유 (무료, 1,000회/월)
2. [개발가이드](https://plus.kipris.or.kr/portal/bbs/view.do?nttId=1060&bbsId=B0000001)
3. `/project apikey`로 등록

### KCI 논문 (gil-research)

1. [data.go.kr KCI 논문정보](https://www.data.go.kr/data/3049042/openapi.do) 경유 권장 (간편, 자동승인)
   - 또는 [KCI Open API](https://www.kci.go.kr/kciportal/po/openapi/openApiConnView.kci) 직접 신청 (공문 필요)
2. [활용방법 샘플](https://www.kci.go.kr/kciportal/po/openapi/openApiConnSamp.kci)
3. `/project apikey`로 등록

### gil-finance, gil-hr, gil-education, gil-lifestyle, gil-career

현재 외부 커넥터 불필요. 향후 필요 시 추가.

---

## 커스텀 MCP 서버 설정

공식 커넥터가 아닌 커스텀 MCP 서버는 각 플러그인의 `.mcp.json`에 정의되어 있습니다.
API 키가 필요한 경우 환경변수로 설정합니다.

### DART API (gil-business)

1. [DART OpenAPI](https://opendart.fss.or.kr/) 회원가입 → 인증키 즉시 발급 (무료, 10,000회/일)
2. MCP 서버: [DART-mcp-server](https://github.com/snaiws/DART-mcp-server) (오픈소스)
3. `/project apikey`로 등록 또는 `/project init` Phase 3에서 입력

### 법령 정보 (gil-legal)

1. [국가법령정보센터 Open API](https://www.law.go.kr/LSO/main.do) 인증코드 발급
2. `/project apikey`로 등록 (글로벌 저장)

### 이미지 생성 (gil-content)

1. Nano Banana API 키 발급
2. `/project apikey`로 등록 (글로벌 저장)

---

## 공식 커넥터 전체 목록

Cowork에서 제공하는 50+개 커넥터 전체 목록은 아래에서 확인:
- Cowork 좌측 메뉴 > Settings > Connectors
- https://claude.com/connectors

---

Version: 1.0.0
Last Updated: 2026-04-10
