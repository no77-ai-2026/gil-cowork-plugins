# reference-preview — Pinterest 미리보기 MCP 서버

`gil-creative:reference-board` 스킬의 Pinterest 레인이 후보 이미지를 대화 안에 실제 이미지로 표시할 때 쓰는 단일 도구 MCP 서버입니다. 의존성 없는 Node.js 단일 파일(`server.mjs`)이며, stdio JSON-RPC로 Claude 앱과 통신합니다.

## 역할

- 노출 도구: `fetch_reference_preview_image` 1개.
- 입력: 발견 단계에서 짝지어진 공개 Pinterest Pin 페이지 URL(`source_url`)과 `i.pinimg.com` 미리보기 URL(`preview_image_url`), 그리고 번호·제목·검색어·적합성 메모·Visual DNA 등 출처 메타데이터.
- 출력: MCP `ImageContent`(base64 JPEG/PNG/WebP) + 출처 캡션 텍스트 + `structuredContent.reference` 메타데이터. 검색·순위·중복 제거·보드 구성은 하지 않고, 후보 1장을 검증·다운로드해 이미지로 돌려주는 일만 합니다.
- 계약 상세: `skills/reference-board/references/reference-preview-contract.md`.

## 보안 설계 요약

| 항목 | 값 |
|---|---|
| 허용 출처 페이지 | 공개 `pinterest.com/pin/...` (www.·m.·지역 서브도메인 포함) |
| 허용 미리보기 호스트 | `i.pinimg.com`만, 크기 세그먼트는 `/236x/`로 축소 |
| 전송 | HTTPS 443만, 쿠키·Authorization 헤더 미전송, 압축 본문(`content-encoding`) 거부 |
| SSRF 방어 | DNS 해석 결과가 루프백·사설·링크로컬·CGNAT·문서용·멀티캐스트 대역이면 차단(IPv4/IPv6), 리다이렉트마다 재검증 |
| 리다이렉트 | 최대 3회 |
| 요청 시간 | 총 8초 |
| 이미지 크기 | 92 KiB 이하, 최대 변 4,096 px, 디코드 면적 8,388,608 px 이하 |
| MIME | `image/jpeg`·`image/png`·`image/webp`만, 매직 바이트로 서명 검증 후 고유 크기 확인 |
| 동시성 | 동시 요청 8 |
| 입력 | JSON-RPC 한 줄 1 MiB 이하, 허용 키 외 입력 거부, `original_source_url`은 null만 |
| 파일 시스템 | 이미지 파일·캐시를 쓰지 않음 |
| 출처 | `provenance_mapping_verified: false` 고정(이미지-Pin 소속은 발견 단계가 공급), `rights_status: "direction-only"` |
| 비밀값 | 없음. API 키·환경변수·`~/.gil/mcp` 자격증명 불필요 |

Pinterest 외 URL(Production Paradise·수상 아카이브·MeiGen 등)은 거부됩니다. allowlist를 넓히지 마세요.

## 요구 사항

- Node.js 18 이상 (Windows·macOS·Linux). 추가 npm 패키지 없음.
- 네트워크: `i.pinimg.com`으로의 HTTPS 아웃바운드.

## 실행

`gil-creative` 번들 `.mcp.json`에 `alwaysLoad: true`로 등록돼 있어 Claude 앱이 자동 기동합니다. 수동 실행:

```
node server.mjs
```

stdin으로 MCP `initialize` → `tools/list` → `tools/call` JSON-RPC 메시지를 받습니다. 지원 프로토콜 버전: `2025-06-18`, `2025-11-25`.

## 테스트

```
node --test
```

또는 명시적으로 `node --test test/server.test.mjs`. (Node 22에서 `node --test test/`처럼 디렉터리에 슬래시를 붙이면 glob으로 해석돼 실패하니 위 형태를 쓰세요.) 네트워크 없이 15개 테스트가 통과해야 합니다(URL 정규화·인수 검증·DNS 차단·리다이렉트·크기·MIME·프로토콜 핸들러·stdio 한 줄 상한).

## 문제 해결

- 도구 목록에 `fetch_reference_preview_image`가 없음 → Node 18+ 설치 여부(`node --version`)와 Claude 앱 재시작. 로컬 런타임 진단은 `gil:env-preflight`(gil 코어 설치 시).
- 도구는 있는데 호출이 실패 → 입력 URL이 공개 Pin 페이지·`i.pinimg.com` 미리보기인지, 92 KiB·4,096 px 상한을 넘지 않는지 확인.

## 출처·라이선스

- 출처: chany-studio/chany-studio (photo-reference-studio 플러그인 `mcp/reference-preview`, v2.8.1), MIT License. 서버 로직은 변경 없이 vendoring했으며 원 저작권 고지는 `LICENSE`에 있습니다.
- GIL v2.4.0 (2026-09-15) 반영.
