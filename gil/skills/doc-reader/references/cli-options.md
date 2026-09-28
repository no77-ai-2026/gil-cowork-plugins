# kordoc CLI 옵션 ↔ MCP 파라미터 대응표 (4.15.7 기준)

## 파싱(기본 커맨드 `kordoc <files...>`)

| 목적 | CLI | MCP(`parse_document`) | 기본값 | 메모 |
|---|---|---|---|---|
| 출력 파일/폴더 | `-o <path>` / `-d <dir>` | — | stdout | `-o`는 단일 파일 전용, 다중은 `-d` |
| 페이지 범위 | `-p 1-3` / `-p 1,3,5` | `parse_pages{pages}` | 전체 | `pageMode=layout`(실제) / `section`(근사) |
| 출력 형식 | `--format markdown\|json\|chunks` | 응답 / `parse_chunks` | markdown | json 키: `success·fileType·markdown·blocks·metadata·pageCount·pages(·warnings)` |
| 평문 | `--plain` | `plain` | off | 그림 자리표시·링크·굵게/밑줄 제거, 구조 유지 |
| 표 전부 HTML | `--html-tables` | `html_tables` | off | 병합 보존, 태그별 한 줄 |
| PDF 표 감지 끄기 | `--no-tables` | `tables:false` | 감지 on | 2단·박스 문서 읽기 순서 교정 |
| PDF 머리글/바닥글 | `--no-header-footer` | `remove_header_footer:false` | 제거 on | |
| OCR | `--ocr` / `--ocr-force` | `ocr:true\|"force"` | off | PP-OCRv5 korean, 18MB |
| 수식 OCR | `--formula-ocr` | `formula_ocr` | off | 155MB |
| 열기 암호 | `--password <pw>` | `password` | — | HWPX·HWP3·HWP5. DRM 아님 |
| 누름틀 안내문 | `--include-field-placeholders` | 동일 | off | 빈 서식 |
| 빈 열 보존 | `--keep-empty-cols` | `keep_trailing_empty_cols` | off | |
| 빈 문단 보존 | `--keep-empty-paragraphs` | `keep_empty_paragraphs` | off | |
| 러닝 헤더 제거 | `--dedupe-headers` | `dedupe_running_headers` | off | HWP5 레이아웃 표 |
| 이미지 인라인 | `--inline-images` | — | off | HWP5만 실제 인라인 |
| 이미지 참조만 | `--image-refs` | — | off | JSON, `images/<파일>` 참조 |
| 이미지 생략 | `--no-images` | — | off | 자리표시만 남김 |
| 진행 메시지 숨김 | `--silent` | — | | 래퍼는 항상 켬 |

## 파싱 계열 서브커맨드

| 커맨드 | 용도 | MCP 대응 |
|---|---|---|
| `tables <file> [-o tables.json] [--cells] [--visual none\|non-tabular\|non-tabular-and-uncertain\|all -d dir]` | 표 분류(semantic-table / non-tabular-layout / uncertain) + 근거 + bbox, 정책에 따라 crop | `extract_tables` |
| `crop <file> -d <dir>` | 표·이미지·문단·도형 영역 PNG 절취 + `regions.json` | `crop_regions` |
| `render <file> -o x.svg [--format svg\|html\|png\|jpeg\|pdf] [--pages 1-3] [--highlight 검색어] [--no-reflow]` | 조판 미리보기. reflow(순수 TS 조판)는 기본 on. **PDF만 puppeteer-core+Chromium 필요**, 나머지는 Node만으로 | `render_document` |
| (없음) | 신구대조표 | `compare_documents` — **MCP 전용**, CLI는 양쪽 파싱 후 대조 |
| (없음) | 메타데이터만 | `parse_metadata` — CLI는 `--format json`의 `metadata` |
| (없음) | 포맷 감지만 | `detect_format` — CLI는 `--format json`의 `fileType` |
| `watch <dir> -d <out> [--webhook url]` | 폴더 감시 자동 변환 | — |

## 생성·수정 계열(다른 GIL 스킬이 담당)

| 커맨드 | GIL 스킬 |
|---|---|
| `generate <md> -o x.hwpx --preset …`, `validate`, `lint`, `profile`, `patch` | `gil:hwpx-writer` |
| `fill`, `seal` | `gil:form-filler` |
| `redact` | `gil:doc-redactor` |

## 환경 변수
- `KORDOC_OFFLINE=1` — 외부 요청(OCR 모델 다운로드·webhook) 발신 전 차단.
- `KORDOC_ROOT=<dir>` — MCP 서버의 읽기·쓰기를 해당 하위로 한정.
- `GIL_KORDOC_SPEC` — 래퍼가 쓰는 패키지 스펙(기본 `kordoc@^4`).

## MCP 서버 도구 17종(참고)
parse_document · parse_table · parse_pages · parse_metadata · parse_chunks · detect_format · compare_documents · extract_tables · crop_regions · render_document · parse_form · fill_form · place_seal · patch_document · redact_document · extract_profile · generate_document
