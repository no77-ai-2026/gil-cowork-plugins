# UZ/CIS 듀얼 컨텍스트 — publication-review

> 한국 표준 + 우즈베키스탄/CIS 듀얼. 5레인·4상태·담당자 게이트는 동일하게 적용하고, 아래 현지 규칙을 레인별 입력에 추가한다.

## 트리거 (RU/UZ 병기)
- "nashrdan oldin tekshiruv" (게시 전 검수), "reklama tekshiruvi" (광고 검수), "проверка перед публикацией" (RU)
- "kim tasdiqladi?" (누가 승인했는지), "chiqarsa bo'ladimi?" (내보내도 되나)

## 레인 A·B — 주장·오퍼 (우즈벡 광고법 "Reklama to'g'risida")
- 비교광고: 경쟁사·타 브랜드를 직접 식별하는 비교는 원칙 제한. "eng yaxshi / №1 / лучший" 최상급 표현은 공인 기관 근거 없이는 `blocked`.
- 가격은 UZS 표기 필수. USD 병기만 있고 UZS가 없으면 레인 B `missing`. Payme·Click·Uzum Nasiya 할부 조건은 실제 판매 페이지와 대조.
- 의료·의약·주류·담배·도박·금융 상품은 별도 허가·경고 문구 대상 → 공식 출처 확인 전까지 `draft-only`.

## 레인 C — 아웃바운드 (Telegram·SMS)
- Telegram 채널·봇 대량 발송은 수신 동의 근거와 발신자 표기(회사명·연락처)를 기록. 야간 발송 관행 규정은 KR 정통망법과 다르므로 "한국 규칙 이식 금지"를 `findings`에 명시.
- SMS 단문은 UZ 통신사 등록 발신자명(alpha name) 필요 여부를 `missing`으로 추적.

## 레인 D — 권리·풍기문란
- `sensuality_level`은 UZ 시장 0 고정(레인 D 소유). 노출·암시 이미지는 우즈벡 광고법 풍기문란 조항 대상이라 1 이상은 `blocked`.
- 마할라(mahalla)·초이호나(choyxona)·초르수 바자르(Chorsu bozori)·타슈켄트 지하철 등 현지 장면의 촬영 허가·초상 동의를 기록. 종교 상징·국가 상징 사용은 `blocked` 후보.

## 레인 E — 플랫폼·언어 표기
- 외국어 표기 규정: 국가어(우즈벡어) 표기가 기본이며 러시아어·영어는 병기. 라틴/키릴 선택은 채널(Uzum Market·Yandex Market·OLX.uz·Telegram) 관행에 맞춰 최종 렌더에서 확인.
- Uzum Market·Yandex Market 리스팅은 각 플랫폼의 현재 이미지·텍스트 정책을 검수 시점에 조회해 `official_sources[]`에 기록(날짜 없으면 `unknown`).
- 담당자(`named_review_owner`)는 UZ 법인 또는 현지 대리인 중 결정 권한 있는 사람이어야 하며, 한국 본사 승인만으로 `reviewed-by-named-owner`를 채우지 않는다.
