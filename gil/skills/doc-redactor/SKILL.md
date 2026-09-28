---
name: doc-redactor
description: |
  [한·UZ 듀얼] 문서 속 개인정보(주민·외국인등록번호·전화·이메일·카드·계좌·사업자번호·여권·운전면허, 인명·주소 opt-in)를 탐지해 서식 보존으로 마스킹한 사본을 만듭니다 — HWPX/HWP는 같은 길이 마스킹 파일, PDF·DOCX·XLSX는 마스킹 마크다운. 외부 전송·AI 분석 전 게이트. 트리거: "개인정보 가리고 보내줘", "주민번호 마스킹", "문서 비식별화", "shaxsiy ma'lumotni yashir" (UZ)
version: "2.6.0"
origin: chrisryugj/kordoc@4.15.7 (MIT, 2026-09-28 신설)
---
## 스킬 개요(상세)

문서를 외부(거래처·자문사·클라우드 AI)에 보내기 전, 또는 사례집·교육자료로 재사용하기 전에 **개인정보를 찍어 내는** 스킬입니다. kordoc `redact`는 주민등록번호·외국인등록번호·전화·이메일·카드·계좌·사업자등록번호·여권·운전면허(기본 8룰)와 법인등록번호·IP·인명·주소(opt-in)를 탐지해, HWPX/HWP는 **본문·표·중첩표·머리말/꼬리말·각주·글상자·필드·미리보기·문서 정보(제목·작성자)까지 같은 길이로 가린 파일**을 만들고 저장 전 재스캔으로 남은 항목을 보고합니다. PDF·DOCX·XLS(X)는 원본을 건드리지 않고 마스킹된 마크다운을 냅니다. 로컬 처리, 네트워크·LLM 없음.

다음과 같은 요청 시 사용하세요:
- "개인정보 가리고 보내줘", "주민번호 마스킹해줘", "연락처 지운 사본 만들어줘"
- "이 계약서 비식별화해서 검토 요청", "판결문 인명 익명화"
- "고객 명단 엑셀 개인정보 점검", "문서에 개인정보 있는지만 확인"
- "shaxsiy ma'lumotni yashir", "hujjatni anonimlashtir" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 식별자(PINFL·여권 AA1234567·+998 전화)는 `references/uz-doc-redactor.md` 규칙으로 보완합니다.

[책임 경계] 마스킹 **사본 생성과 탐지 리포트**만 담당합니다. 문서 읽기는 `gil:doc-reader`, 서식 채우기는 `gil:form-filler`, 개인정보 처리 **법적 판단**(수집 근거·제3자 제공 적법성)은 `gil:compliance-check`·`gil:legal-risk`. **자동 검출 보조 도구**이므로 결과 리포트를 사람이 최종 확인해야 하며, 이미지 속 글자는 탐지하지 못합니다.

> 엔진: [`chrisryugj/kordoc`](https://github.com/chrisryugj/kordoc) (MIT) `redact`. common-rules §7(인용·저작권)·§11(실사 인물)과 함께 GIL의 외부 전송 게이트를 구성합니다.

# 문서 개인정보 마스킹 (doc-redactor)

## 실행 방법
`npx -y kordoc@^4 redact <files...> [옵션]` (래퍼: `gil:doc-reader/scripts/kordoc_run.py raw redact …`). MCP `redact_document`도 동일 엔진. Node.js 20+, 키 없음.

## 워크플로우

### 1단계 — 탐지 리포트 (파일 미생성)
```
npx -y kordoc@^4 redact 문서.hwpx --dry-run --json
```
- `hits[]`(rule·masked 미리보기·위치)와 `fileHits`(머리말·각주·문서정보 등 본문 외 위치)를 확인.
- 리포트의 `masked` 값만 사용자에게 보여주고 **원문 값은 응답에 쓰지 않습니다**.
- 인명·주소는 기본 off — 필요하면 `--rules rrn,phone,email,card,account,brn,passport,driver,name,address`(오탐 증가, 2단계에서 검토).

### 2단계 — 룰·마스크 결정 (질문 채널)
| 선택 | 옵션 | 기본 |
|---|---|---|
| 적용 룰 | `--rules <csv>` (`crn`·`ip`·`name`·`address` opt-in) | 8룰 |
| 마스크 문자 | `--mask-char ●` | ● |
| 부분/전체 | 룰별 부분 마스킹(`900101-●●●●●●●`, `010-●●●●-5678`)이 기본 — 전체 익명화가 필요하면 결과를 `gil:hwpx-writer` patch로 추가 치환 | 부분 |
용도(외부 검토·공개 자료·내부 공유)에 따라 인명·주소 포함 여부를 사용자가 정합니다.

### 3단계 — 마스킹 사본 생성
```
npx -y kordoc@^4 redact 문서.hwpx -o 문서_마스킹.hwpx --json          # HWPX/HWP: 서식 보존 파일
npx -y kordoc@^4 redact *.hwp -d 마스킹/ --rules rrn,phone,account   # 일괄
npx -y kordoc@^4 redact 계약서.pdf -o 계약서_마스킹.md               # PDF·DOCX·XLSX: 마스킹 마크다운
```
- 원본은 절대 덮어쓰지 않습니다. 결과 파일명에 `_마스킹`을 붙입니다.
- HWPX/HWP는 저장 전 결과를 다시 훑어 **남은 PII를 `remaining`으로 보고** — 0이 아니면 3단계 반복 또는 수동 치환.

### 4단계 — 눈 검증·전달
`npx -y kordoc@^4 render 문서_마스킹.hwpx -o 확인.svg`(또는 `--format png -d 쪽/`)로 마스킹 위치를 눈으로 확인 → 파일 경로 + 룰 + 히트 수(룰별) + `remaining` + "이미지 속 글자·도장 안 인명은 미탐지" 고지. 스캔 문서(이미지 PDF)는 텍스트층이 없어 탐지 자체가 안 되므로 `gil:doc-reader --ocr` 후 마크다운 마스킹으로 우회하고 원본 이미지는 별도 처리 필요를 알립니다.

## GIL 전송 게이트로 쓰기
다음 상황에서는 소비 스킬이 이 스킬을 **먼저** 호출합니다(◐작업본 이상):
- 외부 자문·번역·클라우드 AI 분석에 문서를 첨부할 때(`gil:contract-review`·`gil:legal-brief`·`gil:doc-data-audit`)
- 사례·교재·블로그로 재사용할 때(`gil:textbook-builder`·`gil:kb-article`·`gil-creative:blog`)
- 채용·인사 서류를 공유할 때(`gil:resume-screener`·`gil:hr-screening-audit`·`gil:people-report`)
- SEUZ 팀 공유용 `sz` 플러그인에서는 기본 게이트(마스킹 없이 외부 전송 금지).

## 이 스킬을 사용하지 말아야 할 때
- 개인정보 **수집·제공의 적법성 판단** → `gil:compliance-check`·`gil:legal-risk`
- 이미지·스캔 속 글자 마스킹 → 이미지 편집 도구(본 스킬 미탐지) — 위치만 `gil:doc-reader` OCR로 찾아 안내
- 문장 내용의 익명화(사건 정황 재서술) → `gil:legal-brief`·`gil:humanize-korean`과 협업

## Prerequisites
Node.js 20+ · 키 없음 · 로컬 처리(네트워크 없음).

## Failure modes
- `remaining > 0` — 룰 밖 표기(공백 삽입 번호·전각 숫자) → 룰 추가 또는 patch 치환.
- 오탐(날짜·문서번호가 전화·계좌로) — 리포트에서 확인 후 룰 축소, 치환 결과를 눈으로 검증.
- PDF·DOCX는 파일이 아닌 마크다운이 나옴 — 서식 보존 사본이 필요하면 원본 소유자에게 HWPX/편집본 요청 또는 `gil:docx-generator`로 재생성.
- 암호·DRM 문서 → `gil:doc-reader` 절차로 먼저 열기.

## 관련 스킬 체이닝
- **before**: `gil:doc-reader` — 스캔 문서 OCR, 포맷 확인
- **after**: `gil:contract-review`·`gil:legal-brief`·`gil:doc-data-audit`·`gil:textbook-builder` — 마스킹 사본으로 진행 · `gil:compliance-check` — 처리 적법성
- **pair**: `gil:form-filler` — 채운 서식의 전송 사본 · `gil:hwpx-writer` — 잔여 항목 patch 치환

## Done when
- `--dry-run` 리포트를 검토하고 룰·마스크를 사용자와 정했다.
- 마스킹 사본을 새 파일로 만들었고 `remaining`을 확인·보고했다.
- 응답에 원문 개인정보를 쓰지 않았고, 미탐지 한계(이미지·룰 밖 표기)를 고지했다.
