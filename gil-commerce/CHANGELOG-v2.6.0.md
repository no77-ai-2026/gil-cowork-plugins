# CHANGELOG — GIL v2.6.0 (2026-09-28) — 한국 공문서 툴킷 kordoc 4.x 스킬화 (마이너)

외부 저장소 **chrisryugj/kordoc 4.15.7**(MIT, 커밋 b8c0c52, 2026-09-28) 전수 분석 후, GIL이 2026-08 모태 스냅샷(도구 8개·MCP 의존)으로 기술하던 한국 문서 파싱을 **CLI-우선 스킬 형태**로 재작성하고, 생성·서식·마스킹까지 GIL 스킬 경계("읽기 vs 쓰기")에 맞춰 편입했다. 모태(moai-cowork 6bc6098a) 변경 없음. 사용자 결정(2026-09-28): 범위=파싱+생성 전체, MCP 항목은 `kordoc@^4` 고정 유지.

## 버전
- gil / gil-creative / gil-commerce 모두 2.5.0 → **2.6.0** (plugin.json ×3 + SKILL.md ×317 = 320지점)
- 스킬 315 → **317** (gil 158→160 / creative 102 / commerce 55) — 신규 `gil:form-filler`·`gil:doc-redactor`
- MCP 18 불변(kordoc 항목 `kordoc@^4` 고정, 주석 17도구로 갱신)
- UZ 참고 파일 210 → **214** (+4: doc-reader·hwpx-writer·form-filler·doc-redactor)
- 롤백: `gil-upload-v2.5.0/`(3 .plugin) · 공개 repo main 3ba6bb8

## A. `gil:doc-reader` 전면 재작성 — CLI-우선 파싱
- 엔진 호출을 MCP 8도구 전제 → **`npx -y kordoc@^4` CLI**(MCP는 보조: `compare_documents`·이미지 응답). Cowork 샌드박스(Node 22)·사용자 PC(Node 24) 실호출 확인(HWPX·PDF·DOCX·chunks·tables·render).
- 신규 `scripts/kordoc_run.py`(표준 라이브러리) — npx 탐지(Windows `npx.cmd`)·`@^4` 고정·**중립 cwd**(kordoc 저장소 클론 폴더 안에서 실행하면 `kordoc: not found`가 나는 함정 실측)·warnings 요약·`--auto-ocr`(NEEDS_OCR/IMAGE_BASED_PDF 1회 자동 재시도)·`raw` 서브커맨드 패스스루.
- 워크플로 0~5단계(환경 확인 → 포맷 확인 → 목적별 레시피 → **경고 코드 품질 게이트** → 컴팩트 응답 → 소비 스킬 인계).
- references 신규 4+UZ 1: `parse-recipes.md`(8종: 요약·대형 PDF·표 데이터·RAG 청크·스캔 OCR·수식 논문·2단 시험지·빈 서식) · `cli-options.md`(CLI↔MCP 대응·환경변수·17도구) · `warning-codes.md`(소스 실측 39종 → 조치) · `format-notes.md`(포맷별 함정·오프라인·실행 함정) · `uz-doc-reader.md`(라틴/키릴·OCR 한계·UZ 서식 레시피).
- 낡은 기술 정정: "Tesseract·Claude Vision 별도 연결" → 내장 PP-OCRv5(로컬·키 불필요) / `PARSE_WARNING` 등 존재하지 않는 코드 제거 / Node 18+ → **20+**(kordoc `engines`).

## B. `gil:hwpx-writer` v3 — 엔진 교체
- python-hwpx → **kordoc `generate`**(프리셋 8종: 기안문·보고서·계획서·통지·회의록·개조식·업무보고·보도자료, 두문/결문표·결재란·쪽번호·'끝.'·네이티브 차트 20종·LaTeX 수식·표 서식 프로필 재현) + **`patch`**(서식 1바이트 불변 제자리 텍스트 치환, HWP 5.x 포함) + `validate`·`lint --munche`·`render` 검증 루프 의무화. 실호출: 보고서·기안문(두문표·결문표) 생성 → validate ok → render SVG → patch 1건 적용·재파싱 일치.
- python-hwpx 경로(`scripts/create_hwpx.py`·`references/guide.md` 등)는 **Node 부재 시 폴백**으로 보존. `scripts/extract_hwp.py`·`extract_text.py`는 구 추출기로 강등(파싱은 doc-reader).
- references 신규: `gongmun-style.md`(kordoc `gongmunseo` 스킬(MIT) 규약 GIL 재구성 — 위계·문서별 골격·표기법·개조식 문체 검수·AI 문체 제거·위계 타이포·차트/수식) · `generate-options.md` · `uz-hwpx-writer.md`(UZ 수신처 HWPX 불가 → PDF/DOCX 병행).

## C. 신규 스킬 2 (gil)
- **`gil:form-filler`** — 구 doc-reader "fill_form 예외 항목" 분리. `fill`(누름틀 이름 매칭·라벨 매칭·체크박스·괄호·`hwpx-preserve`·내장 정부 표준 서식 gian 23필드/gian-simple 13필드·`--formats` 마스크·`--require-unique` 반복 라벨 가드·값은 JSON 파일로만) + `seal`(앵커 위 글 앞 부유 날인, 표·쪽 불변). 실호출: 내장 기안문 7필드 채움 → validate ok → seal 배치. `uz-form-filler.md`(UZ 서식은 DOCX/XLSX/PDF 분기, PINFL·여권 주의).
- **`gil:doc-redactor`** — `redact`(기본 8룰 + crn·ip·name·address opt-in, HWPX/HWP 서식 보존 같은 길이 마스킹·본문 외 위치·저장 전 재스캔 `remaining`, 타 포맷은 마스킹 마크다운) — 외부 전송·AI 첨부·재사용 전 **게이트**(◐ 이상). 실호출: 주민·전화·이메일·계좌 4히트 마스킹 파일 생성. `uz-doc-redactor.md`(PINFL 14자리·UZ 여권·+998 전화·INN 수동 확인 목록).

## D. 배선·설정
- **소비 스킬 38곳**에 `## 문서 입력 전처리 (v2.6.0)` 삽입(권장 옵션·마스킹 게이트 포함): 법무 8(contract-review·nda-triage·legal-risk·compliance-check·legal-brief·legal-response·law-research·policy-lookup) · 재무 5(financial-statements·variance-analysis·reconciliation·finance-audit·doc-data-audit) · 데이터 3(data-explorer·validate-data·statistical-analysis) · 지원사업·ODA 4(kr-gov-grant·grant-writer·oda-proposal-writer·oda-tendering-uz) · 공공 2(sbiz365-analyst·public-data) · 교육 4(past-exam-analyzer·assessment-creator·textbook-builder·learning-material) · 연구 3(paper-search·paper-writer·research-analysis) · 문서 3(kb-article·executive-summary·report-speak) · HR 6(employment-manager·people-operations·resume-screener·hr-screening-audit·people-report·signature-request).
- **에이전트 8곳** 0-1단계 배선: legal-review-coordinator·finance-report-assembler·data-analysis-coordinator·research-scout-coordinator·public-data-research-coordinator·hiring-coordinator·operations-coordinator·education-course-builder.
- `.mcp.json` kordoc `args` → `["-y","kordoc@^4","mcp"]`, 주석 17도구·보조 경로 명시.
- `common-rules.md` §5에 "문서 파일 입력 → doc-reader 선행", "서식·마스킹 게이트" 2행 추가.
- `env-preflight`(Node 20+, CLI 경로는 MCP 부재 무관)·`capability-matrix.md`·`mcp-connector-setup` Connector E(`kordoc_run.py check`)·`CONNECTORS.md` kordoc 절 신설(v1.1.0)·`NOTICE.md`(kordoc 4.15.7·gongmunseo 재구성 표기)·plugin.json description·keywords 갱신.

## 라이선스
kordoc MIT(2026, chrisryugj) — 코드 vendoring 없음(npx 런타임 호출). SKILL.md 규약 문장은 kordoc 플러그인 스킬·`gongmunseo` 스킬(MIT)을 GIL식으로 재구성, NOTICE 표기. 포함 OSS: rhwp(MIT)·OpenDataLoader(Apache-2.0)·pdfjs(Apache-2.0)·cfb(Apache-2.0)·JSZip(MIT).

## 게이트
YAML·꺾쇠·kebab·dir==name·예약어 0 · `moai-[a-z]+[:/]` 0 · `gil-도메인:` 0 · 백틱 교차참조(스킬·에이전트·references) 끊김 0 · 상대경로 끊김 0 · 버전 320지점 2.6.0 · zip 슬래시·plugin.json 최상위 · kordoc 실호출 8종(check·parse md/json/chunks·tables·generate·validate·render·patch·lint·profile·fill·seal·redact) PASS — 결과는 본 파일 하단 "검증 로그" 참조.

## 검증 로그 (샌드박스 Node v22.22.2, kordoc 4.15.7, 2026-09-28)
- `kordoc_run.py check` → node v22.22.2 · kordoc 4.15.7
- `parse dummy.hwpx` md/json(blocks 6: paragraph·table) · 암호 HWP3 `ENCRYPTED` 실패 JSON → `--password` 성공
- `generate --preset 보고서` → validate `ok:true` → render SVG(표 6) → `patch` 1건 적용·재파싱 11블록 일치 · `lint --munche` 0건 · `profile` 표 6 추출
- `generate --preset 기안문 --doc-head/--doc-foot` → 두문표 6행 재파싱 확인
- `fill --template gian -j 값.json --formats` 7필드 → validate ok · `seal --anchor 기안자` right 배치
- `redact` 주민·전화·이메일·계좌 4히트 → 마스킹 파일 재파싱 `900101-●●●●●●●`
- DOCX json(heading·paragraph·table) · LibreOffice PDF `--html-tables`/`--no-tables` 비교(문단이 표로 감싸지는 변환본 함정 → 레시피 3 주의문 반영)
- 함정 2건 반영: 저장소 클론 폴더 내 `npx kordoc` → `kordoc: not found`(중립 cwd) · render `--reflow`는 없는 옵션(기본 on, `--no-reflow`만 존재), PDF 렌더는 puppeteer-core+Chromium 필요
