# 포맷별 함정·운영 메모 (kordoc 4.15.7)

## HWP 5.x (.hwp, 바이너리 CFB)
- 배포용(읽기 전용) 문서는 AES-128 ECB 복호화(rhwp 알고리즘)로 자동 처리. 한컴 **DRM**은 별개 — Windows+한컴 COM 폴백만 가능.
- 손상 컨테이너는 관대 복구(`LENIENT_CFB_RECOVERY`). 이미지 인라인은 HWP5에서만 실제로 동작.
- 레이아웃 표(쪽마다 반복 머리행)는 `--dedupe-headers`로 정리 가능하나 붙임별 재번호가 지워질 수 있어 기본 off.
- HWP↔HWPX 짝 1,120쌍에서 결과 동일(원저자 벤치) — 어느 쪽을 받아도 품질 차이 없음.

## HWP 3.0 (구버전)
- 시그니처 `HWP Document File V3.00`. 상용조합형(johab)→유니코드, 그림·표 지원. 열기 암호는 `--password`.
- 1990년대 판결문·고시 아카이브에서 등장. 옛한글 자모가 분리되어 보이면 정상(원문이 그렇다).

## HWPX (.hwpx, ZIP/OWPML)
- 표 13,041개 셀 단위 100% 일치(원저자 벤치). 병합·중첩 표는 HTML `<table>`.
- `pageMode`: 한컴 저장본은 조판 캐시로 실제 페이지(`layout`), AI 생성본은 섹션 근사(`section`).
- 열기 암호 지원. 누름틀(CLICK_HERE) 안내문은 기본 제외 → 빈 서식 분석 시 `--include-field-placeholders`.

## HWPML (.hml, XML)
- `.hwp` 확장자로 잘못 저장된 경우가 잦다 → 항상 실제 포맷 확인.

## PDF
- 텍스트층 PDF: 읽기 순서·표·제목 위계 벤치 1위(0.937). 머리글/바닥글 자동 제거, 2단 자동, 링크·탭 리더·수식 런 처리.
- 표 감지가 박스형 레이아웃을 오인하면 `--no-tables`.
- 스캔: `NEEDS_OCR`/`IMAGE_BASED_PDF` → `--ocr`. 216dpi 렌더 후 PP-OCRv5. 쪽당 약 0.5~1초.
- 수식: `--formula-ocr`(155MB). 논문 외에는 켜지 않는다.
- 500MB 초과는 건너뜀.

## DOCX
- 글상자·수식(OMML→LaTeX)·표 지원. 변경 추적(track changes)은 최종 텍스트 기준.

## XLS (BIFF8, 구 엑셀) / XLSX
- XLS는 4.x에서 신규 지원(SST·셀 인코딩 처리). 시트별 블록으로 나오며 수식은 값으로.
- `.xls`인데 실제로는 HTML 표(웹 다운로드)인 경우가 흔함 → 포맷 확인.

## 이미지 (PNG/JPG/WebP)
- 플래그 없이 자동 OCR + 표 괘선 복원. 사진은 원근 왜곡이 크면 실패 → 정면 재촬영 요청.

## PPTX
- 감지만 지원(`detect_format`), 파싱 불가 → PDF 변환 요청.

## 오프라인·폐쇄망
- 상시 외부 통신 없음, 텔레메트리 없음, 계정·키 없음.
- `KORDOC_OFFLINE=1`로 OCR 모델 다운로드·webhook 발신 차단. `KORDOC_ROOT`로 MCP 파일 접근 한정.
- 반입 번들: 인터넷 되는 같은 OS/CPU에서 `node scripts/pack-offline.mjs [--with-ocr --with-models]` → `dist-offline/*.tar.gz` + INSTALL.md. 모델은 SHA-256 검증 후 동봉.

## 실행 환경 함정(실측)
- 저장소 클론 폴더(`package.json name=kordoc`) 안에서 `npx kordoc` → 로컬 미빌드 패키지 해석 → `kordoc: not found`. 래퍼는 중립 임시 폴더에서 실행.
- Windows PowerShell에서 `npx.ps1` 실행 정책 오류 → cmd에서 실행하거나 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- 깨진 글로벌 설치(`Cannot find module ...\dist\cli.js`) → `npm uninstall -g kordoc` 후 npx 재실행.
- Node 18은 일부 동작하나 kordoc 4.x `engines`는 20+ — 경고가 나면 업그레이드 안내.
