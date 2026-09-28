# kordoc generate / patch / validate / render / profile / lint 옵션 (4.15.7)

모든 명령은 `npx -y kordoc@^4 <command> …`. 래퍼: `gil:doc-reader/scripts/kordoc_run.py raw <command> …`.

## generate `<markdown.md> -o 출력.hwpx`
| 옵션 | 용도 |
|---|---|
| `--preset 기안문\|보고서\|계획서\|통지\|회의록\|개조식\|업무보고\|보도자료` | 문서 종류(기본 기안문). 영문 alias: official/report/plan/notice/minutes/gaejosik/ministry/press |
| `--font myeongjo\|gothic` · `--pt <n>` · `--line-spacing <%>` | 본문 글꼴·크기·줄간격 |
| `--fonts "body=나눔명조,heading=나눔고딕,ref=한양중고딕,table=맑은 고딕"` | 요소별 글꼴 |
| `--sizes "dae=16,cham=13,table=12,coverTitle=30"` | 개조식 요소별 pt |
| `--levels "0=HY견고딕/17/bold,1=한컴돋움/15/bold,2=휴먼명조/14"` | 항목부호 단계별 타이포(depth 0~7) |
| `--bullet2 ㅇ\|○` · `--suppress-single` | 2단계 부호, 단일 항목 부호 생략 |
| `--h2-marker band\|roman\|number\|box\|none` · `--band-color #003366` · `--band-text-color #FFFFFF` | 장 제목 표기(보고서·계획서 기본 band, 통지 number). 교육청형 밝은 띠 `#DFE6F7`+`#000000` |
| `--org` · `--dept` · `--date "2026. 9. 28."` · `--cover/--no-cover` · `--toc/--no-toc` · `--doc-info "docNum=…,date=…,disclosure=공개,policyNo="` · `--cover-label 대외주의` · `--no-body-title-box` | 표지·목차·문서정보표(개조식 기본 on) |
| `--approval "담당,팀장,과장"` | 결재란(최상단 우측) |
| `--page-numbers/--no-page-numbers` · `--end-mark/--no-end-mark` | 쪽번호(개조식·보고서·계획서 기본 on), '끝.'(기안문 기본 on) |
| `--summary "…"` · `--report-info "(날짜, 부서 담당자, ☎)"` | 보고서 요약박스(제목 직후 인용문으로도 가능)·담당자 행 |
| `--doc-head "org=,slogan=,to=,title="` · `--doc-foot "sender=,drafter=,reviewer=,approver=,cooperator=,docNum=,receive=,zip=,address=,site=,phone=,fax=,email=,disclosure="` | 기안문 두문표·결문표 |
| `--notice-head "no=,date=,sender="` · `--press-head "release=,distribute=,dept=,manager=,phone="` · `--press-sub "부제1;부제2"` | 공고·보도자료 머리 |
| `--paper A4\|A3\|B4\|B5\|Letter\|210x297` · `--landscape` · `--columns 1~8` · `--header "…"` · `--footer "…"` | 용지·다단·머리말/꼬리말 |
| `--image-dir <dir>` | `![](x.png)` 실데이터 임베드 |
| `--profile 프로필.json` | `profile`로 추출한 표 서식 재현 |
| `--plain` | 공문서 모드 끄기(범용 변환) |
| stdin | 파일 인자에 `-` |

생성 경고: 제목·□ 한 줄 초과(자동 축소 후 경고), 요약박스 없음/3줄 초과, 미설치 글꼴, 프리셋과 맞지 않는 옵션.

## patch `<원본.hwpx|hwp> <편집.md> -o 수정본`
`--no-verify`(재파싱 검증 생략). 텍스트 변경만, 블록 추가/삭제·표 구조 변경 미지원(미적용 보고). 줄 나눔은 `<br>`.

## validate `<파일.hwpx> [--json]`
ZIP 구조·mimetype·필수 파트·XML 웰폼드·secCnt·manifest 참조 → `{ok, issues[], entryCount}`.

## render `<파일> [-o x.svg | -d 쪽폴더/] [--format svg|html|png|jpeg|pdf] [--pages 1-3] [--max-width 1400] [--highlight 검색어] [--no-reflow] [--reflow-mode keep|charAll]`
한컴 저장본은 조판 캐시로 정확히, 생성본은 reflow(기본 on). **PDF만 puppeteer-core+Chromium 필요**(`--browser <경로>`).

## profile `<참조.hwpx> -o 프로필.json`
표 서식(테두리·음영·열 너비·셀 글꼴) 추출 → `generate --profile`.

## lint `<초안.md> [--json] [--munche]`
표기법(편람 13룰+보강, `AI_*` 포함) + `--munche` 개조식 문체(보고서·계획서·개조식만). 위반 0건 후 생성.

## 내장 서식(fill 전용, `gil:form-filler`)
`fill --template gian`(일반기안문 별지 제1호서식 23필드) / `gian-simple`(간이기안문 별지 제2호서식 13필드) · `--list-templates`.
