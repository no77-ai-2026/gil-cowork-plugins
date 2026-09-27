# gil-mcp-cafe24

카페24 쇼핑몰의 Admin API와 Analytics API를 연결하는 자체 제작 MCP 서버다. 현재 소스에는 **20개 카테고리 도구**와 **526개 작업 정의**가 있다. 한 카테고리 도구에서 `action`을 골라 작업을 호출한다. 작업 정의가 등록된 사실은 각 작업의 최신 API 호환성과 판매자 계정 접근을 보증하지 않는다.

카페24는 별도의 [공식 MCP 시작 문서](https://developers.cafe24.com/en/app/front/mcpserver/mcpstart)에서 몰 상품 검색과 결제 링크, Global Catalog MCP를 소개한다. 공식 MCP의 `tools/list`를 대상 몰에서 확인해 필요한 기능이 제공되면 그것을 우선한다. 이 서버가 다루는 Admin API 쓰기·Analytics 기능을 공식 MCP가 모두 제공한다는 근거는 확인하지 못했다.

## 연결 범위

| 범위 | 현재 작업 정의 | 계정에서 확인할 것 |
|---|---:|---|
| Admin API | 502 | 앱의 `mall.read_*`·`mall.write_*` 권한과 각 작업의 사용 조건 |
| Analytics API | 24 | 통계 API 접근 권한, 조회 기간·응답 형식 |
| MCP 도구 | 20 | 각 카테고리의 `action` 목록과 매개변수 |

Claude 연결 정보는 플러그인의 `.mcp.json`과 `.claude-plugin/plugin.json`의 `userConfig`에서 선언한다. 앱에서 입력 폼이나 도구가 실제로 표시되는지는 호스트별로 확인해야 한다. 직접 설정할 때는 자격증명 파일 `Path.home() / ".gil" / "mcp" / "cafe24.json"`도 읽는다. Windows와 macOS·Linux 모두 사용자 홈 디렉터리를 기준으로 해석한다. 토큰과 비밀값을 문서·채팅·로그에 붙여 넣지 않는다.

## 앱과 토큰

1. [카페24 개발자 문서](https://developers.cafe24.com/en/app/front/app)에서 앱을 만들고 필요한 권한만 선택한다.
2. 판매자 몰에서 OAuth 인가를 마친 뒤 발급된 토큰을 플러그인 자격증명에 입력한다. 이 서버는 최초 브라우저 인가 화면을 제공하지 않는다.
3. 액세스 토큰 만료로 HTTP 401을 받으면 서버는 리프레시 토큰으로 한 번 갱신을 시도한다. 카페24의 회전된 리프레시 토큰은 사용자 홈의 `.gil/mcp/cafe24-tokens.json`에 저장한다.
4. 저장에 실패하면 다음 앱 실행에서 인증이 끊길 수 있다. 서버 경고를 확인하고 새 인가가 필요한지 판단한다.

필요한 값은 `CAFE24_MALL_ID`, `CAFE24_CLIENT_ID`, `CAFE24_CLIENT_SECRET`, `CAFE24_ACCESS_TOKEN`, `CAFE24_REFRESH_TOKEN`이다. `CAFE24_API_VERSION`은 앱에 적용된 API 버전을 명시할 때 사용한다. 기본값은 현재 코드의 `2026-03-01`이며, 실제 앱의 지원 버전은 개발자센터에서 확인한다.

## 호출

예를 들어 상품 목록은 `cafe24_product(action="list", params={"limit": 20})`, 상품 상세는 `cafe24_product(action="get", params={"product_no": 128})` 형태다. 작업 이름·필수 본문·권한은 대상 서버의 `tools/list`와 [카페24 Admin API 문서](https://developers.cafe24.com/docs/en/api/admin/)에서 확인한다. 생성·수정·삭제 전에 대상 몰·상품·주문과 변경 범위를 사용자에게 보여준다.

`paginate=true`는 목록을 여러 번 읽을 수 있다. 작업마다 조회 상한과 커서 방식이 달라 자동 페이지네이션이 완전한 전체 수집을 보장하지 않는다. 429 응답은 제한된 횟수만 재시도한다. 이미 처리됐을 수 있는 쓰기 요청은 응답이 불분명할 때 결과 상태를 확인하고 중복 실행을 피한다.

## 개발 검증

1. **개발자센터 앱 생성** — developers.cafe24.com 로그인 → Apps → 개발정보에서
   `client_id` / `client_secret` / Redirect URL 확보. 필요 `scope` 지정
   (예: `mall.read_product mall.write_product mall.read_order ...`).
2. **인증코드 발급** (웹브라우저에서만 — cURL 불가):
   ```
   https://{mall_id}.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id={client_id}&state={state}&redirect_uri={redirect_uri}&scope={scope}
   ```
   → 리다이렉트 URL로 `code={authorize_code}` 수신(1분간 유효, 재사용 불가).
3. **토큰 교환** — `code`를 access/refresh 토큰으로 교환 (개발자센터 "Get Access Token" 예시 참조).
4. 발급받은 `access_token` / `refresh_token`을 `.mcp.json` env에 설정.

만료 시 MCP 서버가 자동으로 refresh_token으로 갱신합니다(401 → 1회 refresh+재시도).
refresh_token 자체가 만료(2주)되면 위 절차를 다시 밟아야 합니다.

## 설치

```bash
# uv 필수 (없으면): curl -LsSf https://astral.sh/uv/install.sh | sh
cd <플러그인 루트>/mcp-servers/gil-mcp-cafe24
uv sync
```

소스는 플러그인에 자체 vendor — PyPI 게시 불필요, 설치 즉시 작동.

## 자격증명을 어디에 넣는가 (2026-09-03 갱신)

셸 환경변수만으로는 부족하다. **Claude 데스크톱·Codex CLI·Codex 데스크톱은 `.mcp.json` 의
`${KEY}` 를 확장하지 않고 문자열 그대로 서버에 넘긴다**(실측). 그래서 이 서버는 값을
아래 순서로 해석한다 — `gil_mcp_core/credentials.py`.

1. 실제 값이 든 환경변수 (자리표시자·빈 값은 없는 것으로 본다)
2. `~/.gil/mcp/cafe24.json` — Windows 는 `C:\Users\<사용자>\.gil\mcp\cafe24.json`
3. 없으면 기본값

파일 형식은 키와 값을 짝지은 JSON 객체 하나다:

```json
{
  "CAFE24_MALL_ID": "<몰 ID>",
  "CAFE24_CLIENT_ID": "<클라이언트 ID>",
  "CAFE24_CLIENT_SECRET": "<클라이언트 시크릿>",
  "CAFE24_ACCESS_TOKEN": "<최초 발급 access token>",
  "CAFE24_REFRESH_TOKEN": "<최초 발급 refresh token>"
}
```

Claude 에서는 `.claude-plugin/plugin.json` 의 `userConfig` 선언에 따라 앱이 입력 폼을 띄우고
민감 항목을 키체인에 보관한다. 두 경로를 같이 써도 되며, 환경변수 쪽이 우선한다.

아래 환경변수 안내는 **개발 중 셸에서 직접 넣을 때**의 참고다.

## 환경변수

| 변수 | 필수 | 설명 |
|---|---|---|
| `CAFE24_MALL_ID` | ✓ | 쇼핑몰 아이디 (Admin 호스트의 서브도메인) |
| `CAFE24_CLIENT_ID` | ✓ | 앱 client_id |
| `CAFE24_CLIENT_SECRET` | ✓ | 앱 client_secret |
| `CAFE24_ACCESS_TOKEN` | ✓ | access_token (2h, 자동갱신) |
| `CAFE24_REFRESH_TOKEN` | ✓ | refresh_token (2w, 회전) |
| `CAFE24_API_VERSION` | | API 버전 (기본 `2026-03-01` — 앱 기본값; `2025-09-01` 단종) |
| `CAFE24_SHOP_NO` | | 기본 멀티샵 번호 (기본 1) |
| `CAFE24_TIMEOUT` | | HTTP 타임아웃 초 (기본 30) |
| `CAFE24_REQUEST_DELAY` | | 요청 간 최소 대기 초 (기본 0, 옵션) |
| `CAFE24_TOKEN_FILE` | | 토큰 영속화 경로 (기본 `~/.gil/mcp/cafe24-tokens.json`) |

## .mcp.json 등록 (이미 플러그인에 반영됨)

```jsonc
"gil-mcp-cafe24": {
  "command": "uv",
  "args": ["run", "--directory", "./mcp-servers/gil-mcp-cafe24", "gil-mcp-cafe24"],
  "env": {
    "CAFE24_MALL_ID": "${CAFE24_MALL_ID}",
    "CAFE24_CLIENT_ID": "${CAFE24_CLIENT_ID}",
    "CAFE24_CLIENT_SECRET": "${CAFE24_CLIENT_SECRET}",
    "CAFE24_ACCESS_TOKEN": "${CAFE24_ACCESS_TOKEN}",
    "CAFE24_REFRESH_TOKEN": "${CAFE24_REFRESH_TOKEN}"
  }
}
```

## 도구 호출 패턴

모든 도구는 `cafe24_{category}_{operation}` 명명 규칙을 따릅니다.

```text
# 상품 목록 조회 (GET, 필터 + 페이지네이션)
cafe24_product_list(product_name="셔츠", limit=10, shop_no=1)

# 상품 상세 (경로 매개변수)
cafe24_product_get(product_no=128, embed="variants,inventories")

# 상품 생성 (body는 resource_key로 자동 래핑: {"product": {...}})
cafe24_product_create(body={"product_name": "티셔츠", "price": 10000, "supply_price": 7000})

# 다건 배송처리
cafe24_shipment_create_bulk(body=[{"order_id": "O1", "tracking_no": "...", "shipping_company_code": "kr.post", "status": "shipping"}])

# Analytics — mall_id는 config에서 자동 주입
cafe24_analytics_visitors_pageview(start_date="2026-01-01", end_date="2026-01-31")

# 전체 페이지 자동 수집 (offset 자동 증가)
cafe24_order_list(start_date="2026-01-01", end_date="2026-01-31", date_type="order_date", paginate=True)
```

**매개변수 규칙:**
- `{product_no}` 같은 경로 매개변수 → 필수 인수
- 선언된 query 매개변수 → 선택적 typed 인수
- 모든 도구 → `shop_no`(선택, 미제공시 config 기본값)
- POST/PUT 도구 → `body: dict` (dispatcher가 `{"<resource_key>": body}`로 래핑)
- 목록 도구 → `paginate: bool` / `max_pages: int` (offset 자동 페이지네이션)

**타입 강제:** bool → `T`/`F`, list → 콤마 조인, `None` → 자동 제거 (Cafe24 규칙).

## 레이트리밋

카페24는 두 가지 제한을 병용 — 본 서버가 모두 준수:

1. **Leaky Bucket (요청 수 제한)** — 쇼핑몰당 40건 버킷, 1초에 2씩 보충. 초과시 429.
2. **Usage 기반 (사용량 제한)** — `X-Cafe24-Call-Usage/Remain`, `X-Cafe24-Time-Usage/Remain`.
   100% 도달시 일시 차단.

`429` 발생 시 서버가 캡이 있는 지터 백오프(Usage Remain 힌트 우선)로 자동 재시도(최대 4회).
Analytics API는 별도 Token Bucket(IP/URL 기반).

## 검증

```bash
cd <플러그인 루트>/mcp-servers/gil-mcp-cafe24
uv run python -c "import gil_mcp_cafe24.server as s; print('tools:', s._TOOLS_REGISTERED)"
# tools: 526
```

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| 401 반복 | access/refresh_token 만료 | README 인증 절차로 토큰 재발급 |
| 429 과다 | 레이트리밋 | `CAFE24_REQUEST_DELAY`로 요청 간격 조정, 자동 백오프는 이미 동작 |
| 422 필수누락 | body 필수값 누락 | 도구 독스트링의 description/notes 확인 |
| offset 한계(5000/15000) | 페이지네이션 상한 | cursor 매개변수(`since_product_no` 등) 사용 — 독스트링 notes 참고 |
| "특정 클라이언트만" API | 카페24 개발자센터 사전 승인 필요 | 해당 API는 승인된 앱에서만 호출 가능 |

## 라이선스

Apache-2.0 (모두의 코워크 플러그인의 일부).
