# 아임웹 OPEN API MCP

아임웹 [공식 OPEN API 명세](https://developers-docs.imweb.me/reference/openapi.json)를 바탕으로 만든 판매자용 MCP 서버입니다. 현재 명세의 OAuth 엔드포인트 2개를 제외한 작업 138개를 카테고리 도구 8개에 묶었습니다. 실제 호출에는 해당 사이트의 앱 권한과 유효한 토큰이 필요합니다.

## 구성

- MCP 서버 키와 실행 파일: `gil-mcp-imweb`
- 실행: Claude는 `.mcp.json`의 `${CLAUDE_PLUGIN_ROOT}` 경로에서 `uv`로 `gil-mcp-imweb`을 시작합니다.
- 도구: `imweb_site_info`, `imweb_member_info`, `imweb_community`, `imweb_promotion`, `imweb_product`, `imweb_order`, `imweb_script`, `imweb_payment`
- 각 도구는 `action`으로 작업을 고릅니다. 경로·조회 조건은 `params`, 요청 본문은 `body`에 넣습니다. `paginate=True`는 명세에 `page`와 `limit`가 있는 GET 작업에만 사용합니다.
- 액세스 토큰 만료 시 refresh token을 이용한 갱신을 지원합니다. 초기 앱 등록·인가·토큰 발급은 [연동 안내](./CONNECTORS.md)를 따릅니다.

## 명세 갱신

## 도구 설계 — 카테고리 디스패치

도메인(카테고리)당 **1개 도구**. 각 도구는 `action` 파라미터로 해당 도메인의
엔드포인트를 디스패치합니다. 8개 도구 = 8개 MCP 스키마만 로드되어 가볍고, LLM 이
도구를 선택하기 쉽습니다.

```python
imweb_<category>(
    action: Literal[...],   # 도메인 내 엔드포인트 키 (operationId 스네이크)
    params: dict | None,    # path + query 파라미터
    body:   dict | None,    # POST/PATCH/PUT 요청 본문
    paginate: bool = False  # list 계열 GET 전체 페이지 자동 집계
) -> dict
```

## 도구 목록 (8)

| 도구 | action 수 | 범위 |
|---|---:|---|
| `imweb_order` | 44 | 주문 조회·배송처리·송장·취소·교환·반품 (주문/섹션/섹션아이템) |
| `imweb_product` | 31 | 상품 조회·등록·수정(가격·재고·옵션·배송·SEO·이미지) |
| `imweb_member_info` | 19 | 회원·그룹·등급 조회·수정·일괄변경 |
| `imweb_community` | 17 | Q&A·구매평(커서기반) 조회·등록·수정·삭제·답글 |
| `imweb_promotion` | 14 | 적립금(조회·지급/차감)·쿠폰(생성·발급·일괄·등급/그룹별) |
| `imweb_site_info` | 6 | 사이트 정보·메뉴·유닛·연동(완료/해제/수정) |
| `imweb_script` | 4 | 스크립트 CRUD |
| `imweb_payment` | 1 | 무통장 입금 수동 확인 |

> OAuth2 인증 엔드포인트 2개(`authorize`/`token`)는 MCP 도구로 노출하지 **않습니다** —
> 인증은 환경변수 + 내부 자동 갱신으로 처리합니다(`CONNECTORS.md`).

각 도구의 docstring 에 해당 도메인의 **전체 action 목록**(method·path·요약)과
각 action 의 **요청 본문(Body) Pydantic 모델**이 한국어 필드 설명과 함께 inputSchema 에
포함되어 있어, MCP 클라이언트가 별도 문서 없이도 action 을 선택하고 본문을 구성할 수
있습니다. description 은 2KB 이하로 간결하게 유지하고 본문 구조는 inputSchema 가 전달합니다.

## 설치

`.mcp.json`(번들 `gil-commerce/.mcp.json`)에 등록:

```jsonc
"gil-mcp-imweb": {
  "command": "uv",
  "args": ["run", "--directory", "${CLAUDE_PLUGIN_ROOT}/mcp-servers/gil-mcp-imweb", "gil-mcp-imweb"],
  "env": {
    "IMWEB_CLIENT_ID":     "${IMWEB_CLIENT_ID}",
    "IMWEB_CLIENT_SECRET": "${IMWEB_CLIENT_SECRET}",
    "IMWEB_ACCESS_TOKEN":  "${IMWEB_ACCESS_TOKEN}",
    "IMWEB_REFRESH_TOKEN": "${IMWEB_REFRESH_TOKEN}",
    "IMWEB_UNIT_CODE":     "${IMWEB_UNIT_CODE}"
  }
}
```

사전 요구: **uv** (`curl -LsSf https://astral.sh/uv/install.sh | sh`). PyPI 게시 불필요 —
소스를 플러그인에 vendor 했으므로 `uv run` 이 즉시 작동합니다.

## 자격증명

[`CONNECTORS.md`](./CONNECTORS.md) 의 1~5단계:
1. 아임웹 개발자센터 앱 등록 → `clientId` / `clientSecret` / `siteCode` / `redirectUri`
2. 브라우저로 `/oauth2/authorize` → authorization code
3. `POST /oauth2/token` (`grantType=authorization_code`) → `accessToken` / `refreshToken`
4. `.mcp.json` env 에 4종 토큰 설정

이후 access token 만료 시 서버가 refresh token 으로 **자동 갱신**합니다.

## 사용 예 (MCP 클라이언트 관점)

```text
uv run --directory mcp-servers/gil-mcp-imweb python tools/_generator.py
uv run --directory mcp-servers/gil-mcp-imweb --group dev pytest -q
```

Apache-2.0 (모두의 코워크 플러그인 패밀리).

---
Origin: modu-ai/moai-cowork@f1eb954 (Apache-2.0). Rebranded moai-mcp-* -> gil-mcp-* for GIL v2.0.0 (2026-08-11). Runtime dir ~/.moai -> ~/.gil.
