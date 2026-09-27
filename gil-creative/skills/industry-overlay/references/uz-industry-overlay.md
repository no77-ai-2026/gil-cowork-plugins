# UZ 듀얼 주석 — industry-overlay

한국 표준 패킷을 우즈베키스탄/CIS 시장에 적용할 때 공통으로 얹는 층이다. 업종별 세부는 각 `playbooks/<domain>.md` 말미의 "UZ 듀얼 주석"에 있다. 확실하지 않은 규정은 "현지 확인 필요"로 남기고 지어내지 않는다.

- `jurisdiction`에 `UZ` 또는 `KR+UZ`를 명시하고, `last_policy_check`는 UZ 광고법(Reklama to'g'risidagi qonun)과 해당 플랫폼 규칙을 확인한 시각으로 기록한다. 우즈벡 광고법은 비교광고·풍기문란·외국어 표기(국가어 병기)·미성년 보호 조항이 있으므로 `prohibited_or_high_risk`에 "경쟁사 직접 비교", "국가어 미병기"를 기본 후보로 넣는다.
- 언어: 카피·고지는 UZ(라틴)·RU 병기가 관행이다. `required_disclosures`에 언어별 고지 위치를 각각 적는다. 한국어 원문은 내부 검토용으로만 둔다.
- 채널: Telegram(채널·봇), Instagram, OLX.uz, Uzum Market, Yandex(Direct·Market)가 주 채널이다. `channel_deliverables`에 Telegram 포스트·봇 CTA를 포함하고, 규격은 제작 시점에 확인한다. 상세는 gil-commerce:telegram-commerce, gil-commerce:marketplace-uzum, gil-commerce:marketplace-olx, gil-commerce:yandex-market(해당 번들 설치 시).
- 결제·가격: 숨(UZS) 표기, 할부(muddatli to'lov)·카드 결제 조건을 클레임 원장에 금융 조건으로 기록한다. 총액 표기 의무는 현지 확인 필요.
- 증거 출처: 한국 law.go.kr에 대응하는 UZ 법령 포털은 lex.uz다. 플레이북의 한국·미국 출처는 방법론 참고이지 UZ 규정이 아니다.
- 장면 어휘: 마할라(mahalla) 공동체, 초이호나(choyxona), 초르수 바자르, 타슈켄트 지하철, 신도시(Yangi Toshkent) 등 현지 장면은 `must_capture`·`visual_narrative`에 쓸 수 있으나 문화·종교 맥락(할랄, 라마단, 나브루즈)은 `directing_rules`로 통제한다.
- 리뷰어: `review_owner`에 현지 법무 또는 라이선스 보유자를 지정하기 전까지 UZ 대상 자산은 `draft-only`다.
- 시장 프로필(가격 민감도, 언어 비율, 채널 선호)은 gil-creative:market-profile-engine에서 가져와 `audience_and_decision_unit`을 보강한다.
- 트리거(UZ): "soha bo'yicha reklama qoidalari"(업종별 광고 규칙), "reklama uchun dalil"(광고 증거).
