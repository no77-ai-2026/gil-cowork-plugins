# gil-mcp-smartstore

네이버 [커머스API](https://apicenter.commerce.naver.com/docs/introduction)를 연결하는 자체 제작 MCP 서버다. 현재 서버 import에서 **90개 도구**가 등록된다. 도구 등록은 판매자 계정의 API 권한이나 실제 주문·상품 처리 성공을 뜻하지 않는다.

## 연결

Claude는 `gil-commerce/.mcp.json`의 `${CLAUDE_PLUGIN_ROOT}` 경로에서 `uv`로 `gil-mcp-smartstore`를 실행한다. 도구·자격증명 입력은 사용하는 데스크톱 앱에서 확인한다. 인증 정보는 `CONNECTORS.md`를 따른다. 현재 계정에 승인된 API 그룹만 호출할 수 있고, 통계는 별도 서비스 신청이 필요할 수 있다.

| 영역 | 도구 예 |
|---|---|
| 상품 | `product_search`, `product_get_origin` |
| 주문 | `order_changed_product_orders`, `order_dispatch` |
| 정산·문의 | `settlement_daily`, `qna_list` |
| 물류·판매자·솔루션 | `sku_get`, `seller_account`, `solution_subscription_get` |
| 통계 | `stats_marketing`, `stats_sales` |

| 도메인 | 도구 예시 |
|-------|----------|
| 인증 | `smartstore_test_connection`, `smartstore_config_status` |
| 상품 | `product_search`, `product_create`, `product_update_stock`, `product_change_status`, `category_list` … |
| 주문 | `order_list_product_orders`, `order_changed_product_orders`, `order_dispatch`, `order_return_approve` … |
| 정산 | `settlement_daily`, `settlement_case`, `vat_daily` … |
| 문의 | `qna_list`, `qna_answer`, `customer_inquiry_answer` … |
| 물류/N배송 | `logistics_companies`, `sku_list`, `sku_get` … |
| 판매자정보 | `seller_account`, `seller_channels`, `addressbook_list` … |
| 커머스솔루션 | `solution_subscription_get`, `solution_approve` … |
| 통계 | `stats_marketing`, `stats_sales`, `stats_shopping`, `stats_customer_status` … |

## 실 API 연동 검증 (2026-07-10)

실 자격증명(SELF 타입 앱)으로 **read-only GET** 호출만 수행해 종단간 연동을 검증했다.
쓰기(POST/PUT/PATCH/DELETE) 도구는 테스트에서 **0건 호출**했다.

- **인증**: OAuth2 토큰 발급 성공 — bcrypt 전자서명(`$2a$04$` 형식 진짜 salt)이 bcrypt 5.x 에서 정상 동작.
- **MCP stdio E2E**: 서버 spawn → `initialize` 핸드셰이크(MCP v1.28.1) → `call_tool("category_list")` → **5,827개 실제 카테고리 반환**(패션의류 등).
- **실데이터 반환 그룹**: 상품(카테고리·원산지·공지), 정산(daily), 문의(Q&A 10건, `maskedWriterId` 로 개인정보 마스킹).

> ⚠️ 자격증명은 `.env`/코드/로그에 하드코딩하지 말고 **인라인 환경변수**로만 주입하고,
> 테스트 후 네이버 커머스 API 센터에서 **시크릿 재발급(rotate)** 한다.

## API 그룹별 승인 현황

네이버 커머스 API 는 **API 그룹별로 사전 사용신청(스코프 승인)** 이 필요하다. 앱 등록만으로는
전 그룹이 열리지 않는다. 아래 표는 2026-07-10 SELF 앱으로 실측한 결과.

**상태 판별 키**: 토큰 발급이 성공한 뒤 —
`403 GW.AUTHN` = 해당 그룹 **미승인**(사용신청 필요) / `400 (필수 파라미터 누락)` = **승인됨**(파라미터만 맞추면 됨, 403 과 혼동 금지) / `200` = 정상.

| 그룹 | 상태 | 비고 |
|---|---|---|
| 상품 (products) | ✅ 승인·실데이터 | `category_list`, `product_origin_areas`, `seller_notices` 200 |
| 정산 (settlement) | ✅ 승인·실데이터 | `settlement_daily` 200 (elements + pagination) |
| 문의 (inquiries) | ✅ 승인·실데이터 | `qna_list` 200 (10건, `fromDate`/`toDate` ISO-8601 필수) |
| 주문 (orders) | ✅ 승인됨 | `order_changed_product_orders` 400(파라미터) — 도구 문서 이슈는 [알려진 이슈](#알려진-이슈) 참조 |
| 통계 (stats) | ⚠️ 별도 신청 | **API 데이터솔루션** 제품의 별도 사용신청이 선행 필요 (일반 API 그룹 승인과 상이) |
| 판매자정보 (seller) | ❌ 미승인 | `seller_account` 403 → 사용신청 필요 |
| 물류 (logistics) | ❌ 미승인 | `logistics_companies` 403 → 사용신청 필요 |
| 커머스솔루션 (solutions) | ❌ 미승인 | `solution_*` 403 → 사용신청 필요 |

사용신청은 [apicenter.commerce.naver.com](https://apicenter.commerce.naver.com) 에서 각 API 그룹별로 진행한다.

## 설치 및 실행

```bash
# uvx로 직접 실행
uvx gil-mcp-smartstore

# 버전 확인
uvx gil-mcp-smartstore --version

# 개발 환경
pip install -e ".[dev]"
pytest tests/
```

플러그인 vendor 모델 — `uv run --directory ./mcp-servers/gil-mcp-smartstore gil-mcp-smartstore` 로 end-user 기동 시 `.venv` 가 자동 생성된다(gitignored).

## 환경변수

자격증명은 반드시 환경변수로 주입. 코드·manifest·로그에 하드코딩 절대 금지.

```bash
export NAVER_COMMERCE_CLIENT_ID="<애플리케이션 ID>"
export NAVER_COMMERCE_CLIENT_SECRET="<애플리케이션 시크릿(bcrypt salt)>"
export NAVER_COMMERCE_ACCOUNT_ID="<판매자 계정 ID>"   # type=SELLER 시 필수
export NAVER_COMMERCE_TYPE="SELF"                       # SELF(기본) | SELLER
```

발급 절차는 `CONNECTORS.md` 참고.

## 인증

네이버 커머스API의 Client Credentials 인증은 `client_id`, `client_secret`과 밀리초 타임스탬프의 bcrypt 서명을 사용한다. 토큰은 만료 전 갱신하며 `401`과 `GW.AUTHN`이 함께 나타날 때 한 번 다시 발급한다. 첫 인증과 그룹별 권한 신청은 판매자 또는 앱 운영자가 공식 API 센터에서 진행한다.

2026-07-10에 별도 계정으로 읽기 요청을 확인했다는 과거 기록이 있었지만, 현재 계정의 권한이나 이 버전의 실 API 동작을 증명하지 않는다. 이 작업 트리의 로컬 테스트도 실제 판매자 계정을 호출하지 않는다.

## 개발 검증

`uv run --directory gil-commerce/mcp-servers/gil-mcp-smartstore --extra dev pytest -q`로 로컬 단위 테스트를 실행한다. 실인증 점검 스크립트 `scripts/check_auth.py`는 판매자 자격증명과 외부 호출이 필요하므로 계정 운영자의 테스트에서만 사용한다. 데스크톱 앱 사용자에게 터미널 설치를 요구하는 절차는 아니다.

## 라이선스

Apache-2.0 (모두의 코워크 플러그인 패밀리).

---
Origin: modu-ai/moai-cowork@f1eb954 (Apache-2.0). Rebranded moai-mcp-* -> gil-mcp-* for GIL v2.0.0 (2026-08-11). Runtime dir ~/.moai -> ~/.gil.
