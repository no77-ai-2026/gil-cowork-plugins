---
name: telegram-commerce
description: |
  [한·UZ 듀얼] Telegram 기반 이커머스(채널·Bot·Shop) 운영 전담 스킬. UZ는 Telegram 침투율 60%+로 비즈니스 채널이 주류 판매 경로입니다. 채널 방송형·Bot 자동화형·Telegram Payments 자동결제형 3가지 모델과 결제(Click·Payme·Uzum Pay)·광고를 다룹니다.
  "텔레그램 판매", "Telegram 채널 운영", "Telegram Bot 쇼핑몰", "텔레그램 자동결제", "Telegram Ads", "우즈벡 텔레그램 커머스"라고 요청하세요.
  (UZ 추가 트리거: "타슈켄트 텔레그램 채널", "Click Payme 봇 연동", "고려인 텔레그램 판매")
user-invocable: true
version: 1.0.1
---

# telegram-commerce — Telegram Channels·Shops 운영

> gil-commerce | UZ Telegram 판매 (침투율 60%+, 비즈니스 채널 주류) | 한·UZ 듀얼

## 한 줄 요약

우즈베키스탄에서 Telegram은 단순 메신저가 아니라 **핵심 판매·고객 채널**입니다. 본 스킬은 한국 셀러가 Telegram으로 UZ 고객에게 판매하는 3가지 모델(채널·Bot·Shop)과 결제·광고·운영을 안내합니다. 상세는 [`references/telegram-guide.md`](references/telegram-guide.md).

## 책임 경계

- **본 스킬**: Telegram 채널·Bot·Shop 판매.
- 정형 마켓플레이스는 `marketplace-uzum`, C2C·중고는 `marketplace-olx`, 러시아·Yandex는 `yandex-market`.

## 판매 모델 3가지

### 1. Telegram Channel (방송형)

- 채널 생성(예: `@MyShop_uz`) → 상품 사진·가격·설명 포스팅 → 구독자가 댓글/DM 주문 → 수동 결제(계좌 송금).
- 구독자 1,000~100,000 규모. 주문 처리 수동·반자동. 진입 쉬움, 자동화 낮음.

### 2. Telegram Bot (자동화형)

- Bot 기능: 카탈로그·장바구니·자동 결제(Click·Payme·Uzum Pay 연동)·주문 추적.
- 개발: BotFather로 생성 + Python/Node.js 백엔드, 또는 외주(@ShopBot류).
- 객단가·주문량이 늘면 Bot 자동화로 전환.

### 3. Telegram Shop (Bot Payments 2.0)

- Telegram Payments 2.0로 인앱 자동 결제. UZ 게이트웨이(Payme·Click·Uzum) 연동.
- 수수료: Telegram 자체 무료, 결제 게이트웨이 1~2.5%.

## 워크플로우

1. 채널·Bot 생성
2. 카탈로그 구성(제품 사진·가격·설명) — **트릴링구얼(러·우즈벡·한) 권장, 러시아어 필수**
3. 광고(Telegram Ads·인플루언서 채널)
4. 주문·결제·배송
5. 후기·재구매 유도(핀 메시지·쿠폰)

## 결제 연동

| 게이트웨이 | 비고 |
|---|---|
| Click | UZ 대표 결제 |
| Payme | UZ 대표 결제 |
| Uzum Pay | Uzum 생태계 연동 |

Bot/Shop 모델에서 자동 결제로 연결, 채널 방송형은 수동 송금.

## Telegram Ads

- 1,000구독자+ 채널 대상 광고, 캠페인당 대략 $50~$500, 카테고리·언어·지역 타겟팅.
- 인플루언서 채널 협업은 `gil-commerce:commerce-influencer-collab` 연동(표시광고 준수).

## 한국 셀러용 가이드

- UZ 현지 파트너 또는 KOTRA 타슈켄트 활용.
- 한국어 단독 채널은 효과 거의 없음 → **러시아어 필수**.
- K-팝·K-뷰티는 인기 → 한국 셀러 진출 기회.

## 한·UZ 듀얼 컨텍스트

한국에선 Telegram 커머스가 생소하지만 UZ에선 1차 채널입니다. 카카오톡 채널/스토어 운영 감각을 Telegram 채널·Bot로 옮기되, 결제(Click·Payme)·언어(러)·현지 인플루언서 생태계가 다릅니다. 상세는 [`references/telegram-guide.md`](references/telegram-guide.md).

## 체이닝

```
gil-content:copywriting  (러·우즈벡 카탈로그 카피)
  → gil-media:nano-banana  (상품·카드 이미지)
  → telegram-commerce  (본 스킬: 채널·Bot·Shop 구축·운영)
  → gil-commerce:commerce-influencer-collab  (인플루언서 채널 광고)
  → gil-marketing:campaign-planner  (Telegram Ads)
```

## 참조

- 운영 가이드 SSOT: [`references/telegram-guide.md`](references/telegram-guide.md) — 3모델·결제·광고·한국 셀러 가이드
