---
name: doc-reader
description: |
  [한·UZ 듀얼] 한국 공문서(HWP 3.0/5.x·HWPX·HWPML·PDF·DOCX·XLS/XLSX·스캔 이미지)를 kordoc CLI로 마크다운·JSON·RAG 청크로 파싱합니다 — 병합 표 보존, 내장 OCR, 암호 문서, 표 분류, 신구대조. 트리거: "이 HWP 파일 읽어줘", "PDF 표 그대로 가져와줘", "스캔 문서 텍스트화", "hujjatni o'qib ber" (UZ)
version: "2.6.0"
origin: chrisryugj/kordoc@4.15.7 (MIT, 2026-09-28 반영 — 구 moai-cowork@f1eb954 doc-reader 전면 재작성)
---

# 한국 공문서 파서 (doc-reader)

## 스킬 개요(상세)

관공서·법원·기업에서 오는 한국 문서를 AI가 바로 읽고 분석할 수 있는 마크다운으로 바꾸는 **읽기(파싱) 전담** 스킬입니다. HWP 3.0(구버전)·HWP 5.x·HWPX·HWPML(.hml)·PDF·DOCX·XLS(BIFF8)·XLSX와 스캔 이미지(PNG/JPG/WebP)를 지원하고, 병합·중첩 표를 HTML `<table>`로 보존하며, 스캔본은 내장 OCR(로컬, 키 불필요)로 읽습니다. 엔진은 `kordoc` CLI(`npx -y kordoc@^4`)이며 **MCP 서버 없이도 동작**합니다 — MCP(`kordoc` 서버)가 떠 있으면 같은 엔진을 도구 호출로 쓸 수 있을 뿐입니다.

다음과 같은 요청 시 사용하세요:
- "이 HWP 파일 읽어줘", "한글 파일 텍스트 추출", "판결문 HWP 내용 정리"
- "공문서 PDF 마크다운으로 변환", "PDF 표 그대로 가져와줘", "예산서 표만 뽑아줘"
- "스캔 PDF 텍스트화", "사진으로 찍은 공문 읽어줘"
- "두 문서 신구대조표 만들어줘", "개정판 달라진 부분 비교"
- "RAG용으로 문서 쪼개줘", "지식베이스에 넣게 청크로"
- "암호 걸린 한글 파일 열어줘", "배포용 HWP 읽기"
- "hujjatni o'qib ber", "PDF jadvalini chiqar" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 문서(라틴·키릴 우즈베크어, 러시아어 DOCX/PDF)는 `references/uz-doc-reader.md`의 제약을 추가로 적용합니다.

[책임 경계] 본 스킬은 **읽기**만 합니다. 새 문서 **생성**은 `gil:hwpx-writer`(HWPX)·`gil:docx-generator`·`gil:pdf-writer`·`gil:xlsx-creator`, 서식 **빈칸 채우기·날인**은 `gil:form-filler`, 개인정보 **마스킹**은 `gil:doc-redactor`, 기존 문서 **제자리 수정(패치)**은 `gil:hwpx-writer`가 담당합니다.

> 엔진: [`chrisryugj/kordoc`](https://github.com/chrisryugj/kordoc) (MIT). 포함 OSS: rhwp(MIT)·OpenDataLoader(Apache-2.0)·pdfjs(Apache-2.0)·cfb(Apache-2.0)·JSZip(MIT). 상시 외부 통신 없음, 텔레메트리 없음(OCR 모델 최초 1회 다운로드만).

## 실행 방법

| 경로 | 명령 | 언제 |
|---|---|---|
| **CLI(기본)** | `python scripts/kordoc_run.py parse <파일> [--format markdown\|json\|chunks] [-o 출력] [--auto-ocr] -- <kordoc 플래그>` | 항상 가능. 래퍼가 npx 탐지·`@^4` 고정·중립 cwd·경고 요약·OCR 자동 재시도를 처리 |
| CLI 직접 | `npx -y kordoc@^4 <파일> -o 출력.md` | 래퍼가 없는 환경. **저장소 클론 폴더 안에서 실행 금지**(로컬 package.json 오해석 → `kordoc: not found`) |
| MCP(보조) | `parse_document`·`parse_pages`·`parse_table`·`parse_chunks`·`parse_metadata`·`detect_format`·`compare_documents`·`extract_tables`·`crop_regions` | 서버가 떠 있을 때. 신구대조(`compare_documents`)는 MCP 전용 — 없으면 두 문서를 각각 파싱해 Claude가 대조 |

첫 호출만 패키지 다운로드(20~30초), 이후 캐시. 원본 파일은 절대 덮어쓰지 않고 결과는 항상 `-o`/`-d`로 새 파일에 씁니다.

## 워크플로우

### 0단계 — 환경 확인
`python scripts/kordoc_run.py check` → node(20+)·npx·kordoc 버전. 없으면 `gil:env-preflight`로 안내하고 중단합니다. 폴백(`gil:hwpx-writer/scripts/extract_*.py`, olefile/zip)은 **텍스트만** 뽑고 표·수식·서식을 잃는다는 점을 사용자에게 먼저 알립니다.

### 1단계 — 포맷 확인
확장자를 믿지 않습니다. `--format json`의 `fileType`(또는 MCP `detect_format`)으로 실제 포맷을 확인합니다 — `.hwp`인데 HWPML(XML)인 경우, `.xls`인데 HTML 표인 경우가 흔합니다. PPTX는 감지만 되고 파싱되지 않습니다(→ `gil:pptx-designer` 아님, 사용자에게 PDF 변환 요청).

### 2단계 — 목적별 파싱 (레시피 선택)
`references/parse-recipes.md`의 8종 중 하나를 고릅니다. 요약하면:

| 목적 | 플래그 | 이유 |
|---|---|---|
| 요약·검토용 전체 파싱 | (기본) | 그림 자리표시·링크 유지 |
| 대형 PDF(50쪽+) | `--format json`으로 `pageCount` 확인 → `-p 1-10` | 사용자에게 범위 확인 후 진행 |
| 표 데이터(재무·예산) | `--html-tables` | 병합 셀 보존 → 검산·엑셀화 |
| RAG·지식베이스 | `--format chunks --plain` | breadcrumb(헤딩+□○- 위계)·page 앵커, 자르기는 소비자 몫 |
| 스캔·사진 | `--auto-ocr`(래퍼) 또는 `--ocr` / `--ocr-force` | 내장 PP-OCRv5, 필요한 쪽만. 이미지 파일은 플래그 없이 자동 |
| 논문·수식 PDF | `--formula-ocr` | 모델 155MB 최초 다운로드 — **착수 전 고지** |
| 2단 시험지·박스형 안내문 | `--no-tables` | 테두리 박스를 표로 오인해 읽기 순서가 뒤집히는 문서 |
| 빈 서식 분석 | `--include-field-placeholders --keep-empty-cols` | 칸 용도 보존 → `gil:form-filler`로 인계 |

전체 옵션과 MCP 대응은 `references/cli-options.md`.

### 3단계 — 품질 게이트 (경고 코드 → 조치)
결과의 `warnings`(JSON) 또는 stderr 요약을 반드시 확인합니다. 조치 표는 `references/warning-codes.md`. 핵심만:

| 코드 | 조치 |
|---|---|
| `ENCRYPTED`(실패) | 열기 암호를 **질문 채널**로 묻고 `--password`로 재시도. 한컴 DRM 배포본은 해당 없음 → Windows+한컴 환경이면 COM 폴백, 아니면 원본 재저장 안내 |
| `NEEDS_OCR` · `IMAGE_BASED_PDF` · `SKIPPED_IMAGE` | `--ocr` 재시도(래퍼 `--auto-ocr`). 그래도 남으면 스캔 품질 문제로 보고 |
| `OCR_LOW_CONF` · `OCR_FAILED` | 해당 쪽을 사용자에게 명시, 숫자·금액은 원본 대조 요청 |
| `PARTIAL_PARSE` · `TRUNCATED_TABLE` · `MALFORMED_XML` · `LENIENT_CFB_RECOVERY` | 부분 손실 가능 — 어느 쪽·어느 표인지 그대로 노출 |
| `HIDDEN_TEXT_FILTERED` | 숨김 텍스트가 제거됐음을 고지(법무 문서는 중요) |
| `PAGE_BOUNDARY_APPROXIMATE` | `-p` 범위가 섹션 근사임을 고지 |
| 읽기 순서가 이상함(경고 없음) | `--no-tables`로 재시도 후 비교 |

### 4단계 — 결과 정리 (응답 컴팩트 규칙)
- 파일명 + 감지 포맷 + 쪽수(`pageCount`) + 경고 요약 1줄을 머리에.
- 표는 GFM으로, 병합이 있으면 HTML `<table>` 그대로. 큰 표는 상위 5~10행 + "전체 N행".
- 수식은 `$…$`/`$$…$$` LaTeX 그대로.
- 개인정보(주민번호·계좌·연락처)가 보이면 응답에 되풀이하지 않고 `gil:doc-redactor` 마스킹을 제안.
- 대형 문서는 먼저 메타·목차(헤딩 3~5개)만 보여주고 전체 파싱 여부를 확인(§10 장시간 고지).

### 5단계 — 후속 인계
파싱 결과를 소비 스킬에 넘길 때는 **출력 파일 경로 + 사용한 플래그 + 남은 경고**를 함께 넘깁니다. 대표 인계처: `gil:contract-review`·`gil:legal-risk`(계약), `gil:financial-statements`·`gil:doc-data-audit`(표 검산), `gil:data-explorer`(JSON blocks), `gil:past-exam-analyzer`(시험지), `gil:paper-writer`(논문), `gil:textbook-builder`(chunks).

## 표 분류·영역 절취 (멀티모달 파이프라인)
`python scripts/kordoc_run.py raw tables <파일> -o tables.json [--cells] [--visual non-tabular -d 영역/]` → 표마다 `semantic-table`(데이터표) / `non-tabular-layout`(조직도·연락망·결재란처럼 표를 캔버스로 쓴 것) / `uncertain` 분류와 근거. 조직도류는 `--visual non-tabular -d 영역/`(또는 `raw crop <파일> -d 영역/`)으로 PNG 절취해 이미지로 다루고, 데이터표만 셀 구조로 넘깁니다(HWP/HWPX 전용, 네트워크·LLM 없음).

## 신구대조표
MCP `compare_documents`(HWP↔HWPX 크로스 포맷, 표는 셀 단위 diff)를 우선 사용합니다. MCP가 없으면 두 문서를 같은 플래그로 각각 파싱해 저장한 뒤 조문·문단 단위로 대조하고, "추가/삭제/수정/변경 없음" 4분류 표로 정리합니다. 법령·규정 개정은 `gil:law-research`와 연계합니다.

## 이 스킬을 사용하지 말아야 할 때
- 새 문서를 처음부터 작성 → `gil:hwpx-writer`·`gil:docx-generator`·`gil:pdf-writer`·`gil:xlsx-creator`
- 서식 빈칸 채우기·도장 → `gil:form-filler` / 개인정보 마스킹 → `gil:doc-redactor` / 기존 문서 문구 수정 → `gil:hwpx-writer`(패치 모드)
- DART 공시 첨부 PDF → `dart` MCP `get_attachments(mode=extract)`가 내부적으로 kordoc을 쓰므로 공시 맥락에서는 dart 우선
- 파싱 텍스트의 윤문·맞춤법 → `gil:korean-spell-check`·`gil:humanize-korean`

## Prerequisites
- **Node.js 20+**(npx 포함). API 키·계정 없음. 첫 실행 시 npm 캐시에 kordoc 다운로드.
- OCR: 최초 1회 모델 다운로드(텍스트 18MB, 수식 155MB) — 폐쇄망은 `references/format-notes.md` §오프라인 참고(`KORDOC_OFFLINE=1`, 오프라인 tarball).
- Windows에서 한컴오피스가 있으면 DRM 배포용 HWPX COM 폴백이 추가로 동작(선택).

## Failure modes
- `ENCRYPTED` — 열기 암호 필요. `ZIP_BOMB` — 손상/악성 ZIP 컨테이너, 중단. `UNSUPPORTED_FORMAT` — 지원 밖(PPTX 등). `EMPTY_INPUT` — 빈 파일.
- 500MB 초과 파일은 CLI가 건너뜀 → 분할 요청.
- `kordoc: not found` — 저장소 클론 폴더 안에서 실행한 경우. 래퍼를 쓰거나 다른 폴더에서 실행.
- 도구 목록에 `parse_document`가 없음(MCP) — Node 부재로 서버가 조용히 죽은 것. CLI 경로는 영향 없음.

## 관련 스킬 체이닝
- **before**: `gil:env-preflight` — Node·npx 점검
- **after**: `gil:contract-review`·`gil:nda-triage`·`gil:legal-risk` — 계약 문서 검토 / `gil:financial-statements`·`gil:variance-analysis`·`gil:doc-data-audit` — 표 검산 / `gil:data-explorer`·`gil:validate-data` — 구조 데이터 / `gil:korean-spell-check` — 교정
- **pair**: `gil:form-filler`(서식) · `gil:doc-redactor`(마스킹) · `gil:hwpx-writer`(생성·패치) · `gil:mcp-connector-setup`(MCP 보조 경로 준비)

## Done when
- 실제 포맷을 확인하고 목적에 맞는 레시피(플래그)로 파싱했다.
- `warnings`를 검토해 필요한 재시도(OCR·암호·`--no-tables`)를 했고, 남은 경고를 사용자에게 노출했다.
- 결과 파일 경로·플래그·경고를 붙여 소비 스킬 또는 사용자에게 인계했다.
- "읽기 vs 생성·채우기·마스킹" 책임 경계를 지켰다.
