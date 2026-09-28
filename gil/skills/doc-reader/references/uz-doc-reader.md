# UZ 듀얼 — 우즈베키스탄·CIS 문서 파싱 제약 (GIL 오리지널)

kordoc은 한국 문서 엔진이다. 우즈베키스탄 실무 문서(정부 서식·계약·세무·입찰)는 대부분 DOCX·PDF·XLSX이며 HWP는 없다. 아래 제약을 먼저 적용한다.

## 언어·문자
- 우즈베크어 라틴(o', g', sh, ch)과 키릴, 러시아어가 한 문서에 섞인다. 텍스트층 PDF·DOCX는 그대로 읽힌다.
- **스캔본 OCR은 한글·영문 모델**(PP-OCRv5 korean)이라 라틴 우즈베크어는 대체로 읽히지만 **키릴 문자는 미보장**. 키릴 스캔은 `OCR_LOW_CONF`가 없어도 숫자·이름을 원본과 대조하라고 명시하고, 필요하면 사용자에게 텍스트층 PDF(원본 DOCX)를 요청한다.
- 아포스트로피 표기(`ʻ` U+02BB / `'` / `’`)가 문서마다 다르다 — 검색·대조 시 정규화한다.

## 자주 오는 문서와 레시피
| 문서 | 형식 | 레시피 |
|---|---|---|
| 세무·통계 신고 서식(soliq.uz·stat.uz 다운로드) | XLSX / PDF | `--html-tables`, 빈 서식이면 `--keep-empty-cols` |
| 정부 결의(Qaror)·법령 PDF(lex.uz 인쇄본) | PDF | 기본, 조문 색인은 `--plain` |
| 입찰(tender)·ODA 제안 요청서 | DOCX/PDF | 기본 → `gil:oda-tendering-uz`·`gil:oda-proposal-writer` |
| 계약서(러시아어·우즈베크어 2개 언어 병기 표) | DOCX | `--html-tables`(언어 병기 2열 표 보존) → `gil:contract-review` |
| 스캔 공증·등기 서류 | 이미지/PDF | `--ocr`, 키릴이면 원본 대조 필수 고지 |

## 표기 함정
- 날짜 `dd.mm.yyyy`, 천 단위 공백·소수점 쉼표(`1 250,50`) — 숫자 검산 전에 로케일을 명시한다.
- 금액 단위 so'm/сум, 환율 병기 표는 열 이름을 그대로 유지한다.
- 인명 순서(성-이름-부칭)는 한국식으로 재배열하지 않는다.

## 트리거 예시 (UZ)
- "hujjatni o'qib ber" (문서 읽어줘)
- "PDF jadvalini chiqar" (PDF 표 뽑아줘)
- "skan qilingan hujjatni matnga aylantir" (스캔 문서 텍스트로)
