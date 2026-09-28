# 파싱 레시피 8종 (kordoc 4.15.x · GIL doc-reader)

모든 명령은 래퍼 기준: `python scripts/kordoc_run.py parse <파일> [래퍼 옵션] -- <kordoc 플래그>`.
직접 실행은 `npx -y kordoc@^4 <파일> <플래그>`. 원본은 덮어쓰지 않는다(`-o`/`-d` 필수 습관).

## 1. 공문·판결문 요약·검토
```
kordoc_run.py parse 공문.hwp -o _parsed/공문.md
```
- 기본값 그대로. 병합 표는 HTML `<table>`로 나온다 — 그대로 다룬다.
- HWP 3.0(구버전 판결문, `HWP Document File V3.00`)도 상용조합형→유니코드 변환으로 읽힌다.
- 후속: `gil:contract-review`·`gil:legal-brief`·`gil:executive-summary`.

## 2. 대형 PDF(50쪽 이상) — 범위 확인 후 부분 파싱
```
kordoc_run.py parse 보고서.pdf --format json -o _parsed/meta.json     # pageCount·metadata 확인
kordoc_run.py parse 보고서.pdf -o _parsed/보고서_1-10.md -- -p 1-10
```
- `metadata.pageMode`: `layout`(한컴 저장본·PDF, 실제 페이지) / `section`(생성 HWPX, 섹션 근사 → `PAGE_BOUNDARY_APPROXIMATE`).
- 8분 초과가 예상되면 착수 전 1회 고지(common-rules §10).

## 3. 표 데이터 추출(재무제표·예산서·통계표)
```
kordoc_run.py parse 예산서.hwpx -o _parsed/예산서.md -- --html-tables
kordoc_run.py raw tables 예산서.hwpx -o _parsed/tables.json --cells    # 데이터표/조직도 분류(+셀 격자)
```
- `--html-tables`는 파이프 표도 HTML로 통일해 병합·빈 셀 위치가 보존된다.
- 서식 입력란(오른쪽 빈 열)이 필요하면 `--keep-empty-cols`.
- 후속: `gil:financial-statements`·`gil:variance-analysis`·`gil:doc-data-audit`·`gil:xlsx-creator`.
- 실측 주의: 워드→PDF 변환본처럼 문단이 표 테두리 안에 놓인 PDF는 `--html-tables`가 본문까지 표로 감쌀 수 있다 → 본문 위주면 `--no-tables`로 재파싱해 비교한다.

## 4. RAG·지식베이스 적재
```
kordoc_run.py parse 규정집.hwpx --format chunks -o _parsed/규정집.chunks.json -- --plain
```
- 청크 스키마: `id`(c0001…, 결정적) · `type`(text|table|heading) · `breadcrumb`(상위 헤딩+□○-/1.가.1) 위계) · `text` · `page` · `blockRange` · `table{rows,cols}`.
- 토큰 상한·오버랩 자르기는 소비자(RAG 파이프라인) 몫 — kordoc은 구조 트리까지만.
- `--plain`은 그림 자리표시·링크 URL·굵게/밑줄을 빼 색인 품질을 올린다(제목·목록·표 구조는 유지).
- 후속: `gil:work-memory`·`gil:kb-article`·`gil:textbook-builder`.

## 5. 스캔·사진·이미지
```
kordoc_run.py parse 스캔.pdf --auto-ocr -o _parsed/스캔.md            # NEEDS_OCR 감지 시 --ocr 자동 재시도
kordoc_run.py parse 스캔.pdf -o _parsed/스캔.md -- --ocr-force        # 텍스트층이 깨진 경우 전 페이지 강제
kordoc_run.py parse 사진.jpg -o _parsed/사진.md                        # 이미지는 플래그 없이 자동 OCR + 괘선 복원
```
- 내장 PP-OCRv5 korean, 로컬 CPU, 최초 1회 모델 18MB. 한글·영문·숫자 위주 — 키릴 문자 스캔은 미보장(`uz-doc-reader.md`).
- `OCR_LOW_CONF` 쪽은 금액·날짜를 원본과 대조하도록 사용자에게 명시.

## 6. 논문·수식 PDF
```
kordoc_run.py parse 논문.pdf -o _parsed/논문.md -- --formula-ocr
```
- MFD+MFR ONNX 모델 155MB 최초 다운로드 — 착수 전 고지. 수식은 `$…$`/`$$…$$`.
- 2단 논문은 자동 2단 처리. 머리글/바닥글은 기본 제거(`--no-header-footer`로 끄기).
- 후속: `gil:paper-writer`·`gil:research-analysis`·`gil:journal-style-adapter`.

## 7. 2단 시험지·박스형 안내문(읽기 순서 교정)
```
kordoc_run.py parse 기출.pdf -o _parsed/기출.md -- --no-tables
```
- 테두리 박스를 표로 오인해 읽기 순서가 뒤집히는 문서(#64). 결과가 자연 읽기순인지 앞 2쪽을 눈으로 확인한다.
- 후속: `gil:past-exam-analyzer`·`gil:assessment-creator`.

## 8. 빈 서식(신청서·양식) 분석
```
kordoc_run.py parse 신청서.hwpx -o _parsed/신청서.md -- --include-field-placeholders --keep-empty-cols --keep-empty-paragraphs
npx -y kordoc@^4 fill 신청서.hwpx --dry-run                            # 채울 수 있는 필드 목록
```
- 미기입 누름틀 안내문(#92)·빈 열·빈 문단을 보존해 칸의 용도를 읽는다.
- 실제 채우기는 `gil:form-filler`로 인계(값은 JSON 파일로, 셸 인자 노출 금지).

## 공통 후처리
- 이미지: 기본은 `images/`에 저장 + 링크. 수백 장이면 `--image-refs`(JSON) 또는 `--no-images`.
- HWP5 레이아웃 표 문서에서 쪽마다 반복되는 러닝 헤더가 거슬리면 `--dedupe-headers`(붙임별 재번호가 지워질 수 있어 기본 off).
- 일괄: `npx -y kordoc@^4 *.hwp -d _parsed/` · 폴더 감시: `npx -y kordoc@^4 watch ./수신함 -d ./변환결과`.
