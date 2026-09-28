# 경고·오류 코드 → 조치 (kordoc 4.15.7 소스 실측)

`--format json`이면 `warnings[]`(`code·message·page`)로, markdown 출력이면 stderr 요약으로 나온다.
실패는 모든 포맷에서 stdout에 `{ "success": false, "code": "...", "error": "..." }` JSON + 종료 코드 1.

## 실패(중단) 코드

| 코드 | 뜻 | 조치 |
|---|---|---|
| `ENCRYPTED` | 열기 암호 문서(HWPX·HWP3·HWP5) | 암호를 질문 채널로 받아 `--password` 재시도. 한컴 **DRM 배포본**은 다른 문제 — Windows+한컴이면 COM 폴백(`DRM_COM_FALLBACK` 경고와 함께 성공), 아니면 한컴에서 열어 일반 저장 후 재시도 안내 |
| `IMAGE_BASED_PDF` | 텍스트층 없는 스캔 PDF | `--ocr` 재시도(래퍼 `--auto-ocr`) |
| `ZIP_BOMB` | 비정상 압축비 ZIP 컨테이너(HWPX·DOCX·XLSX) | 처리 중단, 파일 출처 확인 요청 |
| `UNSUPPORTED_FORMAT` | 지원 밖 포맷(PPTX는 감지만) | 지원 포맷 안내, PDF 변환 요청 |
| `EMPTY_INPUT` | 빈 파일 | 재첨부 요청 |
| `PARSE_ERROR` | 파서 예외 | 메시지 그대로 전달, `--format json`으로 재시도해 부분 결과 확인 |
| `MISSING_DEPENDENCY` | 선택 의존성 부재(pdfjs·onnx 등) | `npx -y kordoc@^4 check-ocr-models` / 재설치 안내 |

## 경고(계속 진행, 반드시 노출)

| 코드 | 뜻 | 조치 |
|---|---|---|
| `NEEDS_OCR` | 일부 쪽 텍스트층 부재·깨짐 | `--ocr` 재시도(필요 쪽만 인식) |
| `SKIPPED_IMAGE` | 그림 속 글자 미추출 | 그림 텍스트가 중요하면 `--ocr` |
| `OCR_APPLIED` | OCR이 적용된 쪽 | 해당 쪽 숫자·고유명사 검토 권고 |
| `OCR_LOW_CONF` | OCR 신뢰도 낮음 | 쪽 번호 명시, 원본 대조 요청 |
| `OCR_FAILED` | OCR 실패 | 해상도 높은 재스캔 요청 |
| `PARTIAL_PARSE` | 개별 요소·쪽 부분 실패 | 어느 쪽인지 노출, 전체 중단 아님 |
| `TRUNCATED_TABLE` | 표 일부 잘림 | 해당 표는 `raw tables`/`crop`으로 이미지 확인 |
| `HIDDEN_TEXT_FILTERED` | 숨김 텍스트 제거됨 | 법무·감사 문서면 반드시 고지 |
| `PAGE_BOUNDARY_APPROXIMATE` | `-p` 범위가 섹션 근사 | 조판 캐시 없는 생성본임을 고지 |
| `MALFORMED_XML` | XML 손상, 관대 파싱 | 손실 가능 구간 고지 |
| `LENIENT_CFB_RECOVERY` | 손상 HWP5 컨테이너 복구 파싱 | 원본 손상 고지 |
| `SKIPPED_OLE` | OLE 개체(엑셀 임베드 등) 건너뜀 | 개체 별도 요청 |
| `UNSUPPORTED_ELEMENT` | 미지원 개체 | 자리표시 확인 |
| `DRM_COM_FALLBACK` | 한컴 COM으로 복호화됨 | 정보성 |

## 생성·검수 계열(hwpx-writer `lint`가 내는 문체 경고 — 파싱과 무관)
`MONEY_NO_HANGUL` · `MONEY_GEUM_SP` · `MONEY_CHEONWON` · `DATE_ZERO_PAD` · `TIME_COLON_SP` · `TIME_AMPM` · `TILDE_SPACE` · `KKAJI_DUP` · `FOREIGN_FIRST` · `LOANWORD_ERROR` · `DUEUM_ERROR` · `DISCRIMINATORY_TERM` — 공문서 표기 규정 위반 신호. `gil:hwpx-writer/references/gongmun-style.md` 참조.

## 보고 형식(응답 머리 1줄)
`파일명 · 포맷 · N쪽 · warnings: NEEDS_OCR×2(p.3,5), HIDDEN_TEXT_FILTERED×1 → OCR 재시도 완료`
