---
name: marketplace-olx
description: |
  [한·UZ 듀얼] OLX.uz(UZ 최대 C2C·중고·소상공인 플랫폼) 운영 전담 스킬. 한국의 중고나라·번개장터 격으로, 개인 판매·소상공인 도매·부동산·서비스 등록을 다룹니다. 한국 셀러의 소량 직수입·도매·서비스(한국어 교습 등) 진출에 적합합니다.
  "OLX.uz 등록", "OLX 상품 올려줘", "OLX 비즈니스 계정", "OLX 광고", "올엑스 우즈벡 판매", "OLX 소상공인 도매"라고 요청하세요.
  (UZ 추가 트리거: "타슈켄트 중고 판매", "OLX VIP 노출", "고려인 대상 서비스 등록")
user-invocable: true
version: 1.0.1
---

# marketplace-olx — OLX.uz 운영

> gil-commerce | UZ C2C·중고·소상공인 (한국 중고나라·번개장터 격) | 한·UZ 듀얼

## 한 줄 요약

OLX.uz는 우즈베키스탄 최대 **C2C·중고·소상공인** 플랫폼입니다. Uzum이 정형 이커머스(자동 결제·풀필먼트)라면, OLX는 **연락→직접 거래** 모델로 소량·도매·부동산·서비스에 강합니다. 구체 수치는 [`references/olx-guide.md`](references/olx-guide.md) 참조.

## 책임 경계

- **본 스킬**: OLX.uz C2C·소상공인 등록·운영.
- 대량 정형 이커머스는 `marketplace-uzum`, Telegram 판매는 `telegram-commerce`, 러시아·Yandex는 `yandex-market`.

## OLX 판매 유형

| 유형 | 설명 |
|---|---|
| 개인(C2C) | 무료 가입·상품 등록(사진 최대 8장), 무료/유료 노출 |
| 비즈니스(B2B·소상공인) | OLX Business 계정(월 구독), 상점 페이지·다수 상품·광고 |
| 부동산·자동차 | 별도 메인 카테고리 |
| 서비스·구인 | 서비스·채용 등록 |

## 워크플로우

### 1. 등록

- 개인: 무료 가입 → 상품 등록(사진 8장) → 무료 vs 유료 노출 선택.
- 비즈니스: OLX Business 계정(월 구독료) → 상점 페이지 개설 → 다수 상품·광고 옵션.

### 2. 카테고리

인기: 자동차·부동산(메인), 전자·가전, 패션·의류, 가구, 서비스·구인, 식품·생활용품.

### 3. 가격·노출 정책

- 일반 등록: 무료(횟수 제한), 노출 한정.
- VIP·Premium: 월 50,000~300,000 UZS, 상위 노출·하이라이트. (변동 → 가이드 참조)

### 4. 상품 카피·이미지

- 카피(러시아어 우선) → `gil-content:copywriting`.
- 이미지 → `gil-commerce:detail-page-image` / `gil-media:nano-banana`.
- OLX는 "신뢰"가 핵심 — 실물 사진·명확한 상태 표기·연락처 응답 속도가 전환을 좌우.

### 5. 운영·거래

OLX는 자동 결제가 약함 → 댓글/DM 문의 → 계좌 송금 또는 대면 거래. 응답 속도·매너 평점 관리가 중요.

## 한국 셀러 활용

적합: 소상공인 도매, 한국 직수입 소량 판매, 부동산(해외 거주자 대상), 서비스(한국어 교습 등).
부적합: 대량 이커머스(→ Uzum), 결제 자동화(→ Telegram Bot/Uzum).

## 한·UZ 듀얼 컨텍스트

OLX는 현지 생활 밀착형이라 **러시아어 필수**, 한국어 단독 등록은 효과가 없습니다. 한국 셀러는 "소량·고신뢰·서비스" 포지션이 유효합니다. 상세는 [`references/olx-guide.md`](references/olx-guide.md).

## 체이닝

```
gil-content:copywriting  (러시아어 매물 카피)
  → gil-commerce:detail-page-image / gil-media:nano-banana  (실물 사진 보정)
  → marketplace-olx  (본 스킬: 등록·노출)
  → gil-marketing:campaign-planner  (유료 노출·광고)
```

## 참조

- 운영 가이드 SSOT: [`references/olx-guide.md`](references/olx-guide.md) — 유형·등록·카테고리·가격 정책·한국 셀러 적합성
