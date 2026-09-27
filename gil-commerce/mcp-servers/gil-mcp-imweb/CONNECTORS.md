# 아임웹 OPEN API 연동

이 서버는 아임웹 [공식 개발자 문서](https://developers-docs.imweb.me/)의 앱 등록·OAuth 인가 절차로 발급한 자격증명을 사용합니다. 사이트별 이용 권한과 필요한 scope는 호출할 작업의 공식 명세에서 확인하세요. 실제 계정 인가가 끝나기 전에는 주문·상품 작업을 실행할 수 없습니다.

## 준비

---

## 1. 사전 요구사항

- **uv** 설치: `curl -LsSf https://astral.sh/uv/install.sh | sh`
  (`uv run --directory ./mcp-servers/gil-mcp-imweb gil-mcp-imweb` 실행에 필요)
- 아임웹 계정 (계정이 소유한 사이트를 테스트 사이트로 사용)

## 2. 앱 등록 — 자격증명 발급

1. 아임웹 **개발자센터** 에 접속해 우측 상단 **[시작하기]** → 아임웹 계정으로 로그인.
2. 이용약관 · 개인정보처리방침 동의.
3. **앱 등록**: 앱 이름, **redirect URI**(예: `https://localhost/callback`), 사용 scope 선택.
4. 등록 완료 시 다음 값을 받는다 — 메모해 둘 것:
   - `clientId` (클라이언트 ID)
   - `clientSecret` (클라이언트 시크릿)
   - `siteCode` (연동할 테스트 사이트 코드)
   - `redirectUri` (등록한 리다이렉트 URI)

> 참고: 아임웹 정책상 **특정 고객/사이트 전용 서비스는 승인되지 않으며**, 연동된 테스트
> 사이트에 한해 API 호출이 가능합니다. 앱스토어 노출을 위해서는 아임웹과의 제휴 계약이
> 필요합니다.

## 3. 최초 1회 — authorization code 발급 (브라우저)

아래 URL 을 브라우저로 열고, 아임웹 계정으로 로그인하여 동의하면 `redirectUri` 로
`code=...` 쿼리 파라미터가 전달됩니다.

```
https://openapi.imweb.me/oauth2/authorize?
  responseType=code
  &clientId=<CLIENT_ID>
  &redirectUri=<REDIRECT_URI>
  &scope=site-info:read site-info:write member-info:read member-info:write product:read product:write order:read order:write community:read community:write promotion:read promotion:write payment:read payment:write script:read script:write statistics:read
  &state=<RANDOM_STRING>
  &siteCode=<SITE_CODE>
```

- `scope` 는 **공백으로 구분** (URL 인코딩 시 `%20`).
- `state` 는 CSRF 방지용 임의 문자열.
- 리다이렉트된 URL 에서 `?code=XXXXX` 의 `XXXXX` 가 **authorization code**.

## 4. access token / refresh token 발급

authorization code 로 토큰을 교환합니다 (POST, `application/x-www-form-urlencoded`):

```bash
curl -X POST https://openapi.imweb.me/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grantType=authorization_code" \
  --data-urlencode "code=<AUTHORIZATION_CODE>" \
  --data-urlencode "clientId=<CLIENT_ID>" \
  --data-urlencode "clientSecret=<CLIENT_SECRET>" \
  --data-urlencode "redirectUri=<REDIRECT_URI>" \
  --data-urlencode "siteCode=<SITE_CODE>"
```

응답에서 `accessToken` / `refreshToken` (또는 `access_token` / `refresh_token`) 획득.

> 아임웹은 camelCase 를 일관되게 사용합니다(`/oauth2/authorize` 파라미터가 모두
> camelCase). 본 MCP 서버는 응답 키를 camelCase · snake_case 양쪽으로 모두 허용합니다.

## 자격증명을 어디에 넣는가 (2026-09-03 갱신)

셸 환경변수만으로는 부족하다. **Claude 데스크톱·Codex CLI·Codex 데스크톱은 `.mcp.json` 의
`${KEY}` 를 확장하지 않고 문자열 그대로 서버에 넘긴다**(실측). 그래서 이 서버는 값을
아래 순서로 해석한다 — `gil_mcp_core/credentials.py`.

1. 실제 값이 든 환경변수 (자리표시자·빈 값은 없는 것으로 본다)
2. `~/.gil/mcp/imweb.json` — Windows 는 `C:\Users\<사용자>\.gil\mcp\imweb.json`
3. 없으면 기본값

파일 형식은 키와 값을 짝지은 JSON 객체 하나다:

```json
{
  "IMWEB_CLIENT_ID": "<앱 ID>",
  "IMWEB_CLIENT_SECRET": "<앱 시크릿>",
  "IMWEB_ACCESS_TOKEN": "<액세스 토큰>",
  "IMWEB_REFRESH_TOKEN": "<갱신 토큰>"
}
```

Claude 에서는 `.claude-plugin/plugin.json` 의 `userConfig` 선언에 따라 앱이 입력 폼을 띄우고
민감 항목을 키체인에 보관한다. 두 경로를 같이 써도 되며, 환경변수 쪽이 우선한다.

아래 환경변수 안내는 **개발 중 셸에서 직접 넣을 때**의 참고다.

## 5. `.mcp.json` env 설정

번들 `gil-commerce/.mcp.json` 의 `moai-imweb.env` 에 값을 채웁니다(값은 `${VAR}` 보간으로
셸 환경변수에서 읽어도 됩니다):

```jsonc
"env": {
  "IMWEB_CLIENT_ID":     "<CLIENT_ID>",
  "IMWEB_CLIENT_SECRET": "<CLIENT_SECRET>",
  "IMWEB_ACCESS_TOKEN":  "<ACCESS_TOKEN>",
  "IMWEB_REFRESH_TOKEN": "<REFRESH_TOKEN>",
  "IMWEB_UNIT_CODE":     "KRW"           // 선택: 다중 통화 사이트의 기본 unit 코드
}
```

선택 항목:
- `IMWEB_API_BASE` — 기본 `https://openapi.imweb.me`
- `IMWEB_TOKEN_FILE` — 토큰 영속화 경로(기본 `~/.gil/mcp/imweb-tokens.json`). 갱신된
  토큰을 디스크에 저장해 재시작 후에도 유지.
- `IMWEB_REQUEST_DELAY` — 요청 간 최소 간격(초, 기본 0). rate limit 회피용.

## 6. 자동 갱신 동작

- 모든 API 호출에 `Authorization: Bearer <access_token>` 주입.
- 응답이 `401` 이면(토큰 만료), 서버가 **1회** `POST /oauth2/token`
  (`grantType=refresh_token`) 으로 access token 을 재발급 후 원래 요청을 재시도.
- 갱신된 토큰은 `IMWEB_TOKEN_FILE`(지정 시) 에 저장.
- refresh token 까지 만료되면 갱신 실패 → 위 3~4단계를 다시 수행해 새 토큰을 발급.

## 7. 사용 가능한 scope (18)

`<domain>:read` / `<domain>:write` 쌍:

| 도메인 | read | write |
|---|---|---|
| site-info | 사이트 정보 조회 | 연동 정보·완료 처리 |
| member-info | 회원·그룹·등급 조회 | 회원 정보 수정·일괄변경 |
| product | 상품 조회 | 상품 등록·수정 |
| order | 주문 조회 | 주문 처리·송장·취소·교환·반품 |
| promotion | 적립금·쿠폰 조회 | 쿠폰 발급·적립금 지급/차감 |
| community | Q&A·구매평 조회 | 답변·구매평 등록/수정 |
| payment | 결제 정보 조회 | 무통장 입금 수동 확인 |
| script | 스크립트 조회 | 스크립트 등록·수정·삭제 |
| statistics | 통계 조회 | 통계 연동 |

## 8. 트러블슈팅

## 동작과 확인

서버는 인증 헤더에 access token을 넣습니다. 401 응답 시 refresh token으로 한 번 갱신한 뒤 재시도합니다. 갱신 토큰이 유효하지 않으면 앱 인가 절차를 다시 진행해야 합니다. 도구 등록 여부는 MCP 클라이언트의 도구 목록에서 확인하고, API 권한은 허용된 읽기 작업으로 계정에서 별도 검증하세요.

기본 API 주소는 `https://openapi.imweb.me`입니다. `IMWEB_API_BASE`, `IMWEB_TOKEN_FILE`, `IMWEB_REQUEST_DELAY` 설정은 필요한 경우에만 사용합니다. 기본 토큰 파일 위치와 자격증명 우선순위는 서버의 `_base.py`와 공유 코어 구현을 기준으로 합니다.
