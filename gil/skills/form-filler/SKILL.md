---
name: form-filler
description: |
  [한·UZ 듀얼] 한글 서식(HWPX·HWP)의 빈칸을 원본 서식 100% 보존으로 채우고 도장·서명 이미지를 앵커 문구 위에 배치합니다 — 내장 정부 표준 기안문 서식(별지 제1·2호), 누름틀 이름 매칭, 날짜·전화·주민번호 포맷 마스크, 반복 라벨 가드. 트리거: "신청서 빈칸 채워줘", "기안문 서식에 값 넣어줘", "도장 찍어줘", "shaklni to'ldir" (UZ)
version: "2.6.0"
origin: chrisryugj/kordoc@4.15.7 (MIT, 2026-09-28 신설 — 구 doc-reader fill_form 예외 항목 분리)
---
## 스킬 개요(상세)

이미 있는 **서식 문서의 빈칸을 채우는** 스킬입니다(새 문서를 만들지 않음). kordoc `fill`은 라벨-값 매칭·누름틀(CLICK_HERE) 이름 매칭·체크박스(`□`→`☑`)·괄호 빈칸(`( )`→`(3)`)을 처리하고 기본 출력 `hwpx-preserve`가 원본 글꼴·크기·정렬·테두리를 그대로 유지합니다. 내장 정부 표준 서식(일반기안문 23필드·간이기안문 13필드)은 파일 없이도 채울 수 있고, `seal`은 "(인)"·"서명 또는 인" 같은 앵커 위에 투명 PNG 도장·서명을 글 앞 부유로 얹어 표·쪽이 절대 밀리지 않게 합니다.

다음과 같은 요청 시 사용하세요:
- "신청서 빈칸 채워줘", "이 양식에 값 넣어줘", "서식 필드 목록 보여줘"
- "정부 표준 기안문 서식으로 채워서 hwpx로", "간이기안문 양식에 결재선 넣어줘"
- "도장 찍어줘", "서명 이미지 (인) 자리에 넣어줘"
- "같은 양식 30명분 채워줘"(반복 채우기)
- "shaklni to'ldir", "arizani to'ldirib ber" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 서식(DOCX/PDF)은 `references/uz-form-filler.md`를 적용합니다(HWPX 서식이 없으므로 DOCX 경로로 분기).

[책임 경계] 빈칸 **채우기·날인**만 담당합니다. 서식 자체를 **읽고 분석**하는 것은 `gil:doc-reader`, 새 문서 **생성**·기존 문구 **수정(패치)**은 `gil:hwpx-writer`, 채운 결과의 개인정보 **마스킹**은 `gil:doc-redactor`. 채움 값에 담긴 개인정보는 응답에 되풀이하지 않습니다.

> 엔진: [`chrisryugj/kordoc`](https://github.com/chrisryugj/kordoc) (MIT) `fill`·`seal`. 내장 서식은 행정안전부 별지 제1호·제2호서식.

# 서식 채우기·날인 (form-filler)

## 실행 방법
`npx -y kordoc@^4 fill …` / `npx -y kordoc@^4 seal …` (래퍼: `gil:doc-reader/scripts/kordoc_run.py raw fill …`). MCP가 떠 있으면 `parse_form`·`fill_form`(`require_unique`·`formats`·`mask_values`)·`place_seal`도 같은 엔진입니다. Node.js 20+, 키 없음.

## 워크플로우

### 1단계 — 필드 파악 (채우기 전 필수)
```
npx -y kordoc@^4 fill 서식.hwpx --dry-run            # fields(라벨-값) + clickHereFields(누름틀 이름·안내문)
npx -y kordoc@^4 fill --list-templates               # 내장 서식: gian(일반기안문 23) · gian-simple(간이기안문 13)
npx -y kordoc@^4 fill --template gian --dry-run
```
- 누름틀 이름이 있으면 **이름으로 정확 매칭**되어 우선 채워집니다. 없으면 라벨 텍스트 유사 매칭(`confidence` 확인).
- 서식 구조가 복잡하면 `gil:doc-reader`로 `--include-field-placeholders --keep-empty-cols` 파싱해 칸 용도를 먼저 읽습니다.

### 2단계 — 값 준비 (JSON 파일)
- 값은 **반드시 `-j 값.json`** 파일로 넘깁니다. `-f 'k=v,…'`는 셸 히스토리·프로세스 목록에 개인정보가 남습니다.
- 다중 줄은 JSON 문자열 안 `\n`(표 셀·문단 안 강제 줄바꿈). 체크박스는 `true`/`"☑"`, 괄호 빈칸은 숫자·문자.
- 같은 라벨이 여러 칸이면 기본은 **모든 칸에 같은 값**(반복 양식). 특정 칸만 채우려면 값을 배열로(`"성명": ["홍길동","김철수"]`, 등장 순서).
- 포맷 마스크: `--formats '{"날짜":"yy.mm.dd","전화번호":"phone","주민등록번호":"rrn:masked"}'` — 칸 모양에 맞춰 변환.
- 모르는 값은 지어내지 않고 비워 두며, 응답 끝에 "채워야 할 항목"으로 안내합니다.

### 3단계 — 채우기
```
npx -y kordoc@^4 fill 서식.hwpx -j 값.json -o 결과.hwpx                       # 기본 hwpx-preserve
npx -y kordoc@^4 fill --template gian -j 값.json -o 기안.hwpx --formats '{"전화번호":"phone"}'
npx -y kordoc@^4 fill 서식.hwpx -j 값.json -o 결과.hwpx --require-unique       # 2곳+ 매칭 라벨은 채우지 않고 rejected 보고
```
- 원본은 덮어쓰지 않습니다(`-o` 필수). 출력 포맷 `--format hwpx-preserve|hwpx|markdown`.
- `--require-unique`: 반복 라벨 서식에서 남의 칸 오염 방지 — 거부된 항목은 배열 값으로 다시 지정.
- 응답에 값 원문을 노출하지 않으려면 `--mask`(markdown stdout 시) 또는 MCP `mask_values`.

### 4단계 — 날인·서명
```
npx -y kordoc@^4 seal 결과.hwpx --image 도장.png --anchor "(인)" -o 결과_날인.hwpx
npx -y kordoc@^4 seal 결과.hwpx --image 서명.png --anchor "서명 또는 인" -n 1 --mode right --size-mm 12 --dx 1 --dy -1 -o …
```
- 앵커 위/옆에 **글 앞 부유**로 배치 — 표·쪽이 커지지 않음. 같은 앵커 여럿이면 `-n <0-based>`.
- `--mode auto`(오른쪽 공간 있으면 옆, 없으면 겹침) · `overlap` · `right`. 크기 기본 줄높이×1.6(7~18mm 클램프).
- 중첩표·글상자·복잡 rowSpan은 근사 배치 → `warnings` 고지 후 `--dx/--dy`로 보정. **투명 배경 PNG** 권장. HWPX 전용.
- 도장 이미지는 사용자가 제공한 것만 사용합니다(실존 관인·서명을 생성하지 않음).

### 5단계 — 검증·전달
`npx -y kordoc@^4 validate 결과.hwpx --json`(`ok:true`) → `render 결과.hwpx -o 확인.svg`로 채움 위치·도장 위치 확인 → 파일 경로 + 채운 필드 수 + `rejected`/미채움 목록 + "결과 파일은 개인정보 문서" 고지. 값 원문은 사용자가 명시 요청할 때만 표시.

## 대량 채우기
값 JSON을 행마다 만들어 반복 실행(`for` 루프 또는 배열 값). 30건 이상은 착수 전 소요를 고지하고(common-rules §10), 산출 폴더 하나에 `수신자명_서식.hwpx`로 저장합니다.

## 이 스킬을 사용하지 말아야 할 때
- 서식이 아닌 **완성 문서의 문구 수정** → `gil:hwpx-writer`(patch) / 새 문서 → `gil:hwpx-writer`(generate)
- **PDF·DOCX 서식** → HWPX 아님. DOCX는 `gil:docx-generator`의 템플릿 치환, PDF 폼은 `gil:pdf-writer`
- 채움 값 **마스킹·외부 전송용 사본** → `gil:doc-redactor`

## Prerequisites
Node.js 20+ · 키 없음 · 도장/서명 PNG는 사용자 제공(macOS 미리보기 서명 내보내기, 도장 스캔 후 배경 제거).

## Failure modes
- `fields: []`·`confidence: 0`이고 누름틀도 없음 → 라벨 없는 자유 서식. `gil:doc-reader`로 구조를 읽고 `gil:hwpx-writer` patch로 텍스트 치환.
- `rejected` 항목 → 2곳+ 매칭. 배열 값 또는 라벨 정정.
- 앵커 미발견 → 오류에 등장 횟수 안내. 정확한 문구(`(인)` vs `（인）` 전각)를 확인.
- `.hwp`(HWP 5.x) 서식 → 채우기는 HWPX 출력. 배포용·암호 문서는 먼저 `gil:doc-reader`로 열리는지 확인.

## 관련 스킬 체이닝
- **before**: `gil:doc-reader` — 서식 구조 파악 · `gil:hwpx-writer` — 서식이 없으면 생성부터
- **after**: `gil:doc-redactor` — 외부 전송 사본 마스킹 · `gil:signature-request` — 서명 요청 흐름
- **pair**: `gil:kr-gov-grant`·`gil:grant-writer`(지원사업 신청서) · `gil:employment-manager`·`gil:people-operations`(인사 서식) · `gil:oda-tendering-uz`(입찰 서식)

## Done when
- `--dry-run`으로 필드를 확인하고 값을 JSON 파일로 넘겨 채웠다(`-o` 새 파일).
- 반복 라벨·포맷 마스크·누름틀 매칭 결과(`rejected`·미채움)를 사용자에게 보고했다.
- 날인이 있으면 `render`로 위치를 확인했고, `validate ok:true`다.
- 응답에 개인정보 값을 되풀이하지 않았고 결과 파일이 개인정보 문서임을 알렸다.
