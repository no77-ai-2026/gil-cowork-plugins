---
name: market-profile-engine
description: |
  [한·UZ 듀얼 · gil-creative] 광고 크리에이티브의 국가·언어·산업별 현지화 프로필을 로드/생성하는 글로벌 시장 엔진입니다. 문화 차원·소비자 행동·결제/배송 관습·규제·플랫폼 규범을 담은 '시장 프로필'을 확보해, 카피·구성·이미지 전반에 오버레이로 적용합니다. 사전 구축: 우즈베키스탄/CIS·러시아·한국. 그 외 국가는 리서치로 즉시 생성.
  다음과 같은 요청 시 사용하세요:
  - "우즈벡 시장 프로필 로드해줘"
  - "이 나라 광고 현지화 규칙 만들어줘"
  - "시장별 신뢰 단서·결제 관습 정리"
  - "카자흐스탄 시장 프로필 생성"
  - "bozor profili" (시장 프로필, UZ)
  gil-creative:creative-wizard·gil-creative:creative-architect가 현지화 오버레이로 호출합니다. 심층 시장 규모/경쟁은 gil:market-analyst, 규제 점검은 gil-commerce:commerce-marketing-compliance-kr로 이어집니다.
version: "2.6.0"
---

# 시장 프로필 엔진 (Market Profile Engine)

> **역할** 요청 국가·언어·산업의 문화·소비자행동·규제 규칙을 담은 '시장 프로필'을 확보하고, 모든 카피·구성·이미지에 **오버레이**로 적용한다. 특정 시장 고정 없이 확장.

---

## 1. 동작
1. 요청 시장 프로필이 라이브러리(§4)에 있으면 **로드**.
2. 없으면 Claude가 **리서치로 생성**(WebSearch 활용) → 사용자 확인 → 라이브러리 저장 제안.
3. 사전 구축: **우즈베키스탄/CIS · 러시아 · 한국**. 이후 임의 국가 확장.

---

## 2. 프로필 스키마

| 범주 | 포함 항목 |
|---|---|
| 언어 | 주 언어·병기 언어, 경어·호칭, 숫자·통화·단위 |
| 문화 차원 | 신뢰 단서, 권위·사회적 증거 선호, 불확실성 회피, 개인/집단, 종교·할랄, 색·상징 금기 |
| 소비자 행동 | 구매 결정 경로, 결제·배송 관습, 리뷰·구전 문화, 가격 민감도 |
| 산업 규범 | 카테고리별 관용 표현·필수 고지·인증 관행 |
| 규제·광고법 | 과장·최상급·의학 효능 제한, 표시 의무 |
| 플랫폼 규범 | 주요 채널의 형식·금지 규정 |

```json
{
  "market": "UZ",
  "language": { "primary": "ru", "secondary": "uz", "script": "cyrillic|latin" },
  "culture": { "trust": [], "tabooColors": [], "religion": "" },
  "behavior": { "payment": [], "delivery": [], "review": "", "priceSensitivity": "" },
  "industry": { "requiredNotices": [], "certifications": [] },
  "regulation": { "superlativeLimit": true, "medicalClaimLimit": true },
  "platform": { "channels": [], "bans": [] }
}
```

---

## 3. 크리에이티브 반영 (오버레이)
- **카피**: 신뢰 단서·톤·소구점을 gil-creative:creative-architect 8단계에 주입.
- **비주얼**: 금기색·상징을 팔레트에서 제외, 결제·통화 아이콘·인증 배지를 시장 세트로 교체(§ gil-creative:design-system-prep 연동).
- **조판**: 비라틴 언어면 gil-creative:creative-architect renderMode=overlay 기본.
- **규제**: 과장·최상급·의학 효능·표시의무를 QA(gil-commerce:commerce-marketing-compliance-kr)에 전달.

---

## 4. 사전 구축 프로필 (핵심 차이)

| 항목 | 우즈벡/CIS | 러시아 | 한국 |
|---|---|---|---|
| 언어 | 러시아어+우즈벡어 병기 | 러시아어 | 한국어 |
| 신뢰 단서 | 정품·적합성 인증, 지인 추천 | 스펙·비교·상세 특성 | 후기 수·랭킹·인증 |
| 결제 | Payme·Click·Uzum Nasiya 할부 | 카드·현금·분할 | 카드·간편결제 |
| 배송 | BTS·Yandex Delivery, 착불 현금 | 택배·픽업 | 당일·새벽배송 |
| 톤 | 신뢰·혜택 중심 | 정보·객관 비교 | 감성·트렌드 |
| 조판 기본 | overlay(후조판) | overlay | flat/overlay 혼용 |

> UZ/CIS 상세 프로필 원본 = `references/uz-market-profile.md`.

---

## 5. 신규 시장 생성 절차
1. 국가·언어·산업 확인.
2. WebSearch로 문화 차원·결제/배송·광고 규제·주요 채널 리서치.
3. §2 스키마로 정리 → 사용자 확인.
4. 불확실 항목은 "확인 필요"로 표시(단정 금지). 현지 전문가 검수 권고.
5. 라이브러리 저장 제안(재사용).

---

## 6. 체이닝
| 목적 | 스킬 |
|---|---|
| 심층 시장 규모·경쟁·가격 | `gil:market-analyst` |
| 규제 게이트 | `gil-commerce:commerce-marketing-compliance-kr` |
| 커머스 채널 가이드(UZ) | `gil-commerce:marketplace-uzum`·`gil-commerce:yandex-market`·`gil-commerce:marketplace-olx`·`gil-commerce:telegram-commerce` |
| 소비자로서 현지화 반영 | `gil-creative:creative-architect`·`gil-creative:creative-wizard` |
