# reference-preview MCP 계약 (Pinterest 전용 미리보기)

`gil-creative` 번들의 `.mcp.json`에 등록된 `reference-preview` 서버(`mcp-servers/reference-preview/server.mjs`, Node 18+)는 도구 하나 `fetch_reference_preview_image`만 노출합니다. 역할은 공개 Pinterest 미리보기 1장을 검증·다운로드해 MCP 이미지 콘텐츠로 돌려주는 것뿐이며, 검색·순위·중복 제거·보드 구성은 호출하는 워크플로우(본 스킬)가 소유합니다.

하드 allowlist: 공개 `pinterest.com/pin/...` 페이지 + `i.pinimg.com` 미리보기. 그 밖의 호스트는 검색·열기·가져오기·미리보기·보관·노출 대상이 아닙니다. Production Paradise·수상 아카이브·MeiGen URL은 이 서버에 절대 넘기지 않습니다.

## 가용성 확인

- 서버는 `alwaysLoad: true`로 등록돼 세션 시작 시 도구가 로드됩니다.
- 호스트가 여전히 지연 로드 상태로 표시하고 `ToolSearch`를 노출하면 `ToolSearch(query: "select:fetch_reference_preview_image")`로 로드합니다.
- 그래도 없거나 연결이 끊겼으면 검색 전에 멈추고 연결 차단을 보고합니다. 로컬 런타임(Node 18+) 점검은 `gil:env-preflight`(해당 번들 설치 시).

## 발견 단계 입력(연결된 검색 도구가 있을 때)

    {
      "query": "Product Photography",
      "provider": "pinterest",
      "domains": ["pinterest.com"],
      "limit": 8,
      "safe_search": true
    }

- 의미 검색어는 공급된 그대로 사용. provider `pinterest` + `pinterest.com`만 허용.
- 호출당 결과 8건 상한. 정확한 L1 1회 + 해당 시 직접 L2 1회, 세 번째 의미 검색어 없음.
- 공개 미리보기 URL은 이미지 콘텐츠를 가져오기 전까지 "미확인"으로 표시.
- 안정적인 공개 Pin 페이지를 돌려주고 아웃바운드 목적지는 돌려주거나 따라가지 않음.
- 나중에 `i.pinimg.com`에서 가져올 수 없는 결과는 거부.

발견 출력 예시 필드: `id`, `provider: "Pinterest"`, `title`, `preview_image_url`, `source_url`, `original_source_url: null`, `source_domain`, `creator`, `width`, `height`, `mime_type`, `preview_fetchable`, `rights_status: "direction-only"`.

발견 레이어는 미리보기와 Pin 페이지가 한 검색 결과로 함께 도착했는지 확인한 뒤 미리보기 도구를 호출합니다. 정규 Pin ID/URL, 크기 세그먼트·쿼리를 제거한 `i.pinimg.com` 자산 경로, 지각적 근사 중복·대체 크롭으로 중복을 제거하고, 아웃바운드 목적지 필드는 폐기합니다.

## `fetch_reference_preview_image`

후보당 1회 호출. 미사용 예비 후보로 이어가며 `target_count`회 성공하고 모든 결과가 보일 때까지 진행합니다. 실패한 후보는 맹목적으로 재시도하거나 목표에 세지 않습니다. 병렬 호출은 호스트가 지원하면 허용되며, 동시성 상한(8)을 넘는 수량은 파도 단위로 처리합니다. 후보는 최대 1회 제출, 도구 결과 하나에 이미지 하나.

입력:

    {
      "id": "1",
      "provider": "Pinterest",
      "title": "Pin title",
      "preview_image_url": "https://i.pinimg.com/736x/aa/bb/cc/example.jpg",
      "source_url": "https://www.pinterest.com/pin/123456789/",
      "original_source_url": null,
      "creator": "creator name when visible",
      "query": "Product Photography",
      "fit_note": "제품을 위한 명확한 여백",
      "visual_dna": "중앙 프레이밍, 부드러운 측광, 연한 석재 표면",
      "width": 736,
      "height": 920
    }

필수 필드는 `id`, `preview_image_url`, `source_url`. 도구는 Pin 페이지에서 Pinterest를 도출하고, 충돌하는 provider·비 Pinterest 페이지·비 `i.pinimg.com` 미리보기·null이 아닌 `original_source_url`을 거부합니다. 목록에 없는 입력 키도 거부합니다.

성공 `CallToolResult`: 실제 이미지가 첫 블록, 사람이 읽는 출처 캡션이 둘째, 구조화 메타데이터가 함께 옵니다.

    {
      "content": [
        { "type": "image", "data": "<base64>", "mimeType": "image/jpeg",
          "annotations": { "audience": ["user"], "priority": 1 } },
        { "type": "text",
          "text": "Pinterest reference | 1\nProvided source page: https://www.pinterest.com/pin/123456789/\nImage-to-Pin mapping: supplied by discovery; not verified by preview fetch" }
      ],
      "structuredContent": {
        "reference": {
          "id": "1",
          "provider": "Pinterest",
          "source_url": "https://www.pinterest.com/pin/123456789/",
          "preview_image_url": "https://i.pinimg.com/736x/aa/bb/cc/example.jpg",
          "fetched_preview_url": "https://i.pinimg.com/236x/aa/bb/cc/example.jpg",
          "final_preview_url": "https://i.pinimg.com/236x/aa/bb/cc/example.jpg",
          "original_source_url": null,
          "mime_type": "image/jpeg",
          "byte_length": 84213,
          "intrinsic_width": 236,
          "intrinsic_height": 295,
          "provenance_mapping_verified": false,
          "display_transport": "mcp-image-content",
          "rights_status": "direction-only"
        }
      }
    }

선두 `type: image` 블록이 없는 공개 URL·마크다운 링크·HTML 조각·리소스 링크·파일 경로·메타데이터는 이 계약을 만족하지 않습니다. 그런 것은 보조 출처 정보나 선택적 내보내기로만 나타날 수 있습니다.

`provenance_mapping_verified`는 항상 `false`입니다. 서버는 Pinterest를 스크래핑해 이미지-Pin 소속을 증명하지 않으므로, 이 값을 "커넥터가 독자 검증했다"는 주장으로 바꾸지 않습니다.

## 책임 분리

- 검색 능력: 사실적 Pinterest 후보 메타데이터와 미리보기 URL을 돌려주고, 이미지-Pin 짝을 공급하며, 아웃바운드 목적지 데이터를 제거.
- 모델(본 스킬): 주제 카테고리 최대 2개(L1 + 직접 L2 1개), 동의어·페이지네이션 자동 복구, 서로 다른 후보에 대해 상한 안에서 `fetch_reference_preview_image` 호출, `target_count`·교차 결과 중복 제거·성공 수·세트 다양성 소유.
- 미리보기 서버: 작은 공개 Pinterest 미리보기 1장을 검증·다운로드하고 MCP 이미지 콘텐츠를 돌려주며 공급된 출처 메타데이터를 보존. 상태 없음, 한 번에 후보 하나.
- 이미지 생성(`gil-creative:higgsfield-image` 등): 사용자가 선택한 레퍼런스만 가져와 요청된 자산 생성.

## 인라인 표시 요건

보드는 정확히 `target_count`장의 서로 다른 Pinterest 이미지가 현재 대화에 보일 때만 완성입니다. JSON 안의 `preview_image_url`은 표시로 세지 않습니다.

미리보기 호출 1건이 실패하면: ① 그 후보 거부 → ② 허용된 L1/L2 풀의 다음 미사용 후보 선택 → ③ 교체 후보로 호출 → ④ `target_count`개의 이미지 결과가 보인 뒤에만 번호 선택 요청.

자동 복구가 소진되면 유효 이미지를 보여주고 미완성으로 표시한 뒤 요청/표시/부족 수를 밝힙니다. 다른 제공자를 검색하거나, 중복을 세거나, 수량을 조용히 줄이거나, 유료 생성을 시작하지 않습니다. 이 연결이 불가능하면 호스트가 실제로 지원하는 네이티브 인라인 경로를 확인하고, 없으면 한 번만 보고합니다. 링크·HTML은 선택적 폴백일 뿐 인라인 체크포인트 통과가 아닙니다.

## 보안·크기·출처 수치(서버 구현 기준)

| 항목 | 값 |
|---|---|
| 프로토콜 | JSON-RPC over stdio, MCP `2025-06-18` / `2025-11-25` |
| 전송 | 자격증명 없는 HTTPS, 표준 포트(443)만 |
| 출처 페이지 | 공개 `pinterest.com/pin/...` 필수 |
| 미리보기 호스트 | `i.pinimg.com`만, 크기 세그먼트는 `/236x/`로 축소 |
| 허용 MIME | `image/jpeg`, `image/png`, `image/webp` (SVG·HTML·압축 본문·MIME 불일치 거부) |
| 이미지 서명 | 매직 바이트 검증 후 고유 크기 확인 |
| 최대 변 길이 | 4,096 px |
| 최대 디코드 면적 | 8,388,608 px |
| 최대 리다이렉트 | 3회 (모든 리다이렉트·DNS 응답 재검증) |
| 요청 총 시간 | 8초 |
| 반환 이미지 바이트 | 92 KiB (94,208 bytes) |
| 동시 요청 | 8 |
| JSON-RPC 입력 한 줄 | 1 MiB (1,048,576 bytes) |
| 차단 IP | 루프백·사설·링크로컬·CGNAT·문서용·멀티캐스트 등 IPv4/IPv6 대역(DNS 해석 결과까지 검사) |
| 쿠키·Authorization 헤더 | 전송 안 함 |
| 파일 쓰기·캐시 | 없음(이미지 파일을 디스크에 쓰지 않음) |
| `original_source_url` | 항상 null 유지, 아웃바운드 목적지 미추적 |
| `rights_status` | 항상 `direction-only` |

- 안전 검색을 기본 적용합니다.
- 출처·표시 상태를 절대 지어내지 않습니다.
- 테스트: `node --test test/` (서버 폴더에서). 상세는 `mcp-servers/reference-preview/README.md`.
