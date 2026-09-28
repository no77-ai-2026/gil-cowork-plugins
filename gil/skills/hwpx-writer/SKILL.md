---
name: hwpx-writer
description: |
  [한·UZ 듀얼] 아래아한글(.hwpx) 공문서를 kordoc 엔진으로 생성·수정합니다 — 기안문·보고서·계획서·통지·회의록·개조식·업무보고·보도자료 프리셋, 두문/결문표, 네이티브 표·차트·수식, 서식 보존 제자리 패치, 구조 검증·조판 미리보기. 트리거: "한글 파일로 공문서 만들어줘", "기안문 hwpx로", "이 한글 문서 문구만 고쳐줘", "hwpx hujjat yarat" (UZ)
version: "2.6.0"
origin: chrisryugj/kordoc@4.15.7 (MIT, 2026-09-28 엔진 교체 — 구 python-hwpx 경로는 폴백으로 보존)
---
## 스킬 개요(상세)

아래아한글(.hwpx) 문서를 **만들고(generate) 고치는(patch)** 스킬입니다. 엔진은 `kordoc` CLI(`npx -y kordoc@^4`)로, 행정안전부 「행정업무운영편람」 기반 공문서 프리셋 8종(기안문·보고서·계획서·통지·회의록·개조식·업무보고·보도자료), 두문표·결문표·결재란·쪽번호·'끝.' 표시, 실측 정부 서식 표, 한컴 네이티브 차트 20종, LaTeX→`<hp:equation>` 수식을 마크다운 한 장에서 생성합니다. 기존 문서는 서식을 1바이트도 건드리지 않고 텍스트만 제자리 치환(patch)하며, 생성·패치 결과는 `validate`(구조)와 `render`(조판 미리보기)로 검증한 뒤 전달합니다. 한컴오피스·Windows COM 불필요, Node.js 20+만 있으면 됩니다.

다음과 같은 요청 시 사용하세요:
- "한글 파일로 공문서 만들어줘", "기안문 hwpx로 뽑아줘", "협조 요청 공문 한글 파일로"
- "보고서로/개조식으로/계획서로 만들어줘", "국회 업무보고 양식으로"
- "이 한글 문서 문구만 고쳐줘"(서식 유지), "계약서 조항 수정해서 같은 서식으로"
- "이 문서 표 서식 그대로 새 문서 만들어줘"(프로필 재현)
- "hwpx 구조 검증", "한컴독스 업로드가 거부돼"
- "hwpx hujjat yarat", "rasmiy xat hwpx" (UZ)

**한국 표준 + UZ 듀얼 컨텍스트** — 우즈베키스탄 기관에 보내는 문서는 `references/uz-hwpx-writer.md`(HWPX 수신 불가 전제, DOCX/PDF 병행)를 먼저 적용합니다.

[책임 경계] vs `gil:doc-reader`: 저 스킬=읽기(파싱), 이 스킬=생성·패치. vs `gil:form-filler`: 기존 서식의 **빈칸 채우기·날인**은 저 스킬. vs `gil:docx-generator`: MS 워드 .docx. vs `gil:doc-redactor`: 개인정보 마스킹. 아래아한글 문서를 만들 때는 Claude 기본 생성 대신 이 스킬을 사용하세요.

> 엔진: [`chrisryugj/kordoc`](https://github.com/chrisryugj/kordoc) (MIT). 공문서 작성 규약은 kordoc `gongmunseo` 스킬(MIT)을 GIL식으로 재구성해 `references/gongmun-style.md`에 담았습니다.

# 한글 문서 작성자 (HWPX Writer)

## 실행 방법

| 경로 | 명령 | 비고 |
|---|---|---|
| **kordoc CLI(기본)** | `npx -y kordoc@^4 generate 초안.md -o 결과.hwpx --preset 보고서` | 래퍼 `gil:doc-reader/scripts/kordoc_run.py raw generate …`도 동일(npx 탐지·`@^4`·중립 cwd) |
| MCP(보조) | `generate_document`·`patch_document`·`extract_profile`·`render_document` | kordoc MCP가 떠 있을 때 |
| **폴백** python-hwpx | `scripts/create_hwpx.py`(`pip install python-hwpx lxml`) | Node가 없을 때만. 프리셋·차트·수식·패치 없음, 표·서식 제한(`references/guide.md`) |

## 워크플로우

### 1단계 — 종류 판별 → 프리셋 (모호하면 질문 채널로 확인)

| 의도 | `--preset` | 위계 | 특징 |
|---|---|---|---|
| 대외 공문·시행문 | `기안문` | 법정 8단계 `1. 가. 1) 가) (1) (가) ① ㉮` | `--doc-head`(두문표)·`--doc-foot`(결문표), '끝.' 기본 |
| 정책·검토·결과 보고(1건 1매) | `보고서` | `□ ○ - ㆍ` + `#`/`##` | **제목 직후 `> …하고자 함` 한 문장 필수**(요약박스), `--report-info` 담당자 행 |
| 사업·행사 계획 | `계획서` | 8단계 또는 □/ㅇ | 5W2H 골격 |
| 알림·통지·안내·공고 | `통지` | 8단계 | 경어 종결, `--notice-head` |
| 회의 기록 | `회의록` | 8단계 | 법정 9요소 |
| 정부 표준 보고서(표지·목차·Ⅰ.Ⅱ.) | `개조식` | □/○/- | 표지·목차·장 띠 자동, `--org --dept --doc-info` |
| 중앙부처 업무보고·국회 서면보고 | `업무보고` | □/ㅇ/- + 장 띠·절 숫자칸·① 항목 띠 | `--cover-label 대외주의`, `> ▪` 성과 요약박스 |
| 보도자료 | `보도자료` | — | `--press-head`·`--press-sub` |

"엉뚱한 프리셋 선택"이 가장 흔한 오생성 원인입니다. 문서 종류·제목·기관명·날짜·목차 여부가 불명확하면 착수 전에 묻습니다(common-rules §12).

### 2단계 — 마크다운 작성 (`references/gongmun-style.md` 규약)
- `#`=제목, `##`=장(보고서 Ⅰ.Ⅱ. / 기안문·통지는 법정 `1.`), `###`=□ 대항목(기안문 `가.`), 그 아래 리스트 깊이(2칸=1단계)가 ㅇ → - → ㆍ(법정형 `1)` → `가)`)로 **자동 부호화** — 부호를 직접 타이핑하지 않아도 되고, 써도 같은 깊이로 정규화됩니다.
- 표는 GFM 파이프표. 차트는 ` ```chart ` 펜스(type/cat/size/colors + `계열명: 값들`). display 수식 `$$…$$`은 네이티브 수식.
- `출처: …`/`자료: …`/`※ …` 줄은 참고(작은 글씨). 법제처 코드·KOSIS 표 ID·"○○ MCP 조회" 같은 내부 식별자는 자동 제거되므로 출처는 기관·자료명만.
- 표기법(엔진이 안 고쳐줌): 날짜 `2026. 6. 19.`, 기간 `∼`, 시각 `09:00`, 금액 `금113,560원(금일십일만삼천오백육십원)`, 붙임 `붙임  ○○ 1부.  끝.`, 법령명 「 」. 사실·수치·고유명사는 지어내지 않고 `[기관명]` 플레이스홀더 + 채울 항목 목록.
- AI 문체 흔적(줄표·연속 볼드·구호형 문장·외래어)은 작성 단계에서 제거 — `lint`가 `AI_*` 룰로 잡습니다.

### 3단계 — 생성
```
npx -y kordoc@^4 generate 초안.md -o 결과.hwpx --preset 보고서 --report-info "(2026. 9. 28., 리스크관리팀 홍길동, ☎ …)"
npx -y kordoc@^4 generate 초안.md -o 결과.hwpx --preset 기안문 --doc-head "org=…,to=…,title=…" --doc-foot "sender=…,drafter=…,reviewer=…,approver=…,docNum=…"
npx -y kordoc@^4 generate 초안.md -o 결과.hwpx --preset 개조식 --org 기관명 --dept 부서 --cover --toc
```
옵션 전체(글꼴·크기·줄간격·`--levels` 위계 타이포·`--bullet2 ㅇ|○`·용지·다단·머리말/꼬리말·`--image-dir`·`--profile`)는 `references/generate-options.md`. 참조 문서의 표 서식을 재현하려면 `profile 참조.hwpx -o 프로필.json` → `--profile 프로필.json`.

### 4단계 — 검증 루프 (전달 전 필수)
1. `npx -y kordoc@^4 lint 초안.md --munche --json` — 표기법·개조식 문체(서술형 종결·당위·수사) 위반 0건까지 초안 수정.
2. `npx -y kordoc@^4 validate 결과.hwpx --json` — ZIP 구조·mimetype·필수 파트·XML·secCnt·manifest(`ok:true`). 한컴독스 업로드 거부 요인 사전 차단.
3. `npx -y kordoc@^4 render 결과.hwpx -o 미리보기.svg`(또는 `--format png -d 쪽/`) — 제목·□ 한 줄 넘침 경고, 표 잘림, 요약박스 3줄 초과를 눈으로 확인 후 초안 수정 → 재생성. PDF 렌더만 puppeteer-core+Chromium 필요.
4. 생성 경고(`제목 한 줄 초과`, `요약박스 3줄 초과`, 미설치 글꼴)는 문장을 줄여 해소하고, 해소 못 한 것은 사용자에게 그대로 전달.

### 5단계 — 기존 문서 수정 (패치 모드)
```
npx -y kordoc@^4 원본.hwpx -o 편집.md          # ① 파싱(gil:doc-reader와 동일 엔진)
# ② 편집.md 의 텍스트만 수정 — 블록 추가/삭제·표 구조 변경 금지, 줄 나눔은 명시적 <br>
npx -y kordoc@^4 patch 원본.hwpx 편집.md -o 수정본.hwpx   # ③ 서식 1바이트 불변, 재파싱 자동 검증
```
- 글꼴·표·도장칸·이미지·조판을 그대로 둔 채 바뀐 텍스트만 제자리 치환. 미적용 항목은 결과에 보고되니 사용자에게 전달.
- HWP 5.x(.hwp)도 패치 가능(출력은 원본 포맷). 원본은 절대 덮어쓰지 않는다(`-o` 필수).
- 서식 **빈칸**을 채우는 일은 `gil:form-filler`(fill)로 — 패치는 이미 있는 문구를 바꿀 때.

### 6단계 — 결과 안내
생성 파일 경로 + 사용 프리셋·옵션 + 플레이스홀더로 남긴 항목 목록 + 검증 결과(lint/validate/render) 1줄. 산출물 등급이 ◆최종본이면 텍스트 체인(`gil:ai-slop-reviewer` → `gil:korean-spell-check` → `gil:humanize-korean`)을 **마크다운 초안 단계**에서 먼저 돌리고 생성합니다.

## 출력 형식
- `.hwpx`(OWPML, 한컴오피스 2010+). 생성본은 조판 캐시가 없어 `render`가 순수 TS 조판(reflow)으로 그립니다 — 한컴 실조판의 근사. 한컴에서 한 번 저장하면 캐시가 생깁니다.
- 글꼴 기본 함초롬바탕(`--font gothic`=맑은 고딕). 한컴 전용 글꼴(HY헤드라인M·HY견고딕)은 한컴 설치 환경에서만 표시 — 배포 시 PDF 병행.

## Prerequisites
- **Node.js 20+**. 키·계정 없음. 첫 실행 시 npm 캐시 다운로드(20~30초).
- PDF 미리보기만 `puppeteer-core` + Chromium(선택). 폴백 python-hwpx는 `pip install python-hwpx lxml`.

## Failure modes
- 프리셋 오선택 → 1단계로 돌아가 확인. `--plain`은 공문서 모드 끄기(범용 변환)라 서식이 사라짐.
- `요약박스 없음/3줄 초과` 경고(보고서) — 제목 직후 인용문 한 문장(90~100자) 추가·축약.
- `validate` `ok:false` — issues 목록을 보고 초안(표 열 수 불일치·깨진 이미지 참조)을 고쳐 재생성. 손으로 XML을 만지지 않는다.
- patch에서 "미적용 N건" — 블록 추가/삭제·표 구조 변경을 시도한 것. 텍스트 변경만 남기거나 새로 생성.
- `kordoc: not found` — 저장소 클론 폴더 안 실행. 다른 폴더에서 실행.

## 관련 스킬 / 자체 검수
생성·패치 후 `validate`+`render`로 플레이스홀더 잔존·구조·표 깨짐을 **자체 검수**하고 PASS/FAIL을 보고합니다.
- `gil:doc-reader` — 파싱(패치 1단계, 신구대조) · `gil:form-filler` — 서식 빈칸·날인 · `gil:doc-redactor` — 전송 전 마스킹
- `gil:docx-generator` · `gil:pdf-writer` · `gil:xlsx-creator` · `gil:pptx-designer` — 다른 포맷
- `gil:report-speak`·`gil:executive-summary` — 보고서 본문 초안 · `gil:korean-spell-check` — 표기 교정

## 기술 참조
- kordoc 공문서 엔진: 실결재 문서 실측(서울 629건, 재경부 업무보고)으로 고정된 위계·여백(위20·아래10·좌우20mm)·명조 15pt
- 폴백: `references/guide.md`(python-hwpx)·`references/owpml-spec.md`·`references/format-converter.md`, `scripts/create_hwpx.py`·`pack.py`·`unpack.py`·`validate.py`. `scripts/extract_hwp.py`·`extract_text.py`는 텍스트만 뽑는 구 추출기 — 파싱은 `gil:doc-reader`를 쓴다.
