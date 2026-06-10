---
name: marketplace-uzum
description: |
  [한·UZ 듀얼] Uzum Market(UZ 최대 이커머스) 입점·운영 전담 스킬. 한국 셀러의 우즈베키스탄 진출을 입점·상품등록·수수료·트릴링구얼 SEO·광고·결제(Uzum Bank 할부)·정산·CS까지 단계별로 안내합니다.
  "Uzum Market 등록", "Uzum 입점 절차", "Uzum 수수료", "Uzum 상품 올려줘", "우즘 마켓 운영", "K-뷰티 우즈벡 판매"라고 요청하세요.
  (UZ 추가 트리거: "타슈켄트 이커머스 입점", "Uzum Bank 할부 결제", "고려인 타겟 Uzum 판매")
user-invocable: true
version: 1.0.1
---

# marketplace-uzum — Uzum Market 운영

> gil-commerce | UZ 최대 이커머스 (Uzum 그룹, 월 활성 사용자 5백만+) | 한·UZ 듀얼

## 한 줄 요약

한국 셀러가 우즈베키스탄 **Uzum Market**에 입점해 상품을 판매·운영하는 전 과정을 다룹니다. 한국 오픈마켓(스마트스토어·쿠팡) 운영 경험을 UZ 현지 규격(언어·통화·결제·물류)으로 옮기는 것이 핵심입니다. 구체 수치(수수료·광고비 등)는 [`references/uzum-guide.md`](references/uzum-guide.md)를 SSOT로 참조하세요.

## 책임 경계

- **본 스킬**: Uzum Market 단일 채널 입점·운영.
- OLX(C2C·중고)는 `marketplace-olx`, Telegram 판매는 `telegram-commerce`, 러시아·Yandex는 `yandex-market`.
- 상세페이지 카피·이미지는 `gil-content`/`gil-media`, 광고 기획은 `gil-marketing`.

## Uzum 생태계 구조

| 구성 | 역할 |
|---|---|
| Uzum Market | 메인 마켓플레이스(판매 채널) |
| Uzum Bank | 결제·할부(3·6·12개월) |
| Uzum Delivery | 자체 배송망 |
| Uzum Tezkor | Q-commerce 빠른 배송 |

판매자는 Market에 입점하되 결제(Uzum Bank)·배송(Uzum Delivery)을 함께 설계하면 전환율·신뢰도가 올라갑니다.

## 워크플로우 (입점 → 운영)

### 1. 입점·등록 (한국 셀러)

준비물: UZ 법인 또는 한국 본사 + UZ 대리인, UZ 세무등록(INN), UZ 은행계좌(Uzum Bank 또는 시중은행), 상품 인증(해당 시 Halal·식약처·KC).

등록 절차:
1. `seller.uzum.uz` 가입
2. KYC(법인·대리인 서류)
3. 카테고리·상품 등록
4. 가격(UZS)·재고 입력
5. 배송 옵션(Uzum Delivery 또는 자체)
6. 결제 연동(Uzum Bank·시중은행)
7. 운영 시작

> 한국 셀러는 단독 법인보다 **UZ 대리인/현지 파트너 또는 KOTRA 타슈켄트** 활용이 현실적입니다. 통관·INN·은행계좌가 진입 장벽입니다.

### 2. 상품 등록·트릴링구얼 SEO

검색 노출 언어 우선순위: **러시아어(1순위) → 우즈벡어 라틴(2순위) → 영어(선택)**.

상품명 공식: `{브랜드} {제품명} {핵심 특징} {용량/사이즈}`
예: `Innisfree Green Tea Foam 150ml` + 키워드 `Korean cosmetics·K-beauty·Skincare`

- 카피·키워드는 `gil-content:copywriting`(러·우즈벡 트릴링구얼)로 산출 후 현지 검수 1회 필수.
- 상세 이미지는 `gil-commerce:detail-page-image`(러시아어 우선) 또는 `gil-media:nano-banana`.

### 3. 카테고리·수수료

카테고리별 수수료(전자 5~10%·의류 12~15%·뷰티 10~12%·식품 8~10% 등)는 변동되므로 [`references/uzum-guide.md`](references/uzum-guide.md) 표를 참조하고, 마진 계산은 부가세·결제수수료·환전수수료까지 반영합니다.

### 4. 광고·프로모션

- Uzum Promoted(검색 상위), 카테고리 배너, 메인 노출(대형 셀러).
- CPC 대략 200~2,000 UZS. 캠페인 기획은 `gil-marketing:campaign-planner`(uz-marketing-channels) 연동.
- 시즌(나브루즈·라마단·연말) 프로모션은 현지 캘린더에 맞춤.

### 5. 결제·정산

- 고객 결제: 카드(Visa·Mastercard·UzCard·Humo), **Uzum Bank 할부(3·6·12개월)**, 배송 시 현금.
- 셀러 정산: 주 1회 또는 격주. **UZS→KRW 환전 수수료** 고려, 또는 USD 다중통화 계좌.
- 할부는 객단가 높은 K-뷰티 세트·전자제품 전환율에 유리.

### 6. 배송·풀필먼트

Uzum Delivery(자체망) 또는 셀러 자체배송. 한국발 직배송은 리드타임·통관이 길어, 현지 보관(3PL/FBУ형) 검토.

### 7. 운영·CS

- 리뷰·Q&A는 러시아어 중심 응대.
- 리뷰 분석 → `gil-commerce:commerce-review-aggregator`, VOC 우선순위 → `gil-commerce:commerce-voc-triage`.

## 한·UZ 듀얼 컨텍스트

한국 셀러에게 Uzum은 "UZ의 쿠팡"에 가깝습니다. 한국 운영 노하우(상품명 최적화·리뷰 관리·광고)는 그대로 이전하되, **언어(러·우즈벡)·통화(UZS)·할부 문화·현지 물류**가 결정적으로 다릅니다. 인기 카테고리는 K-뷰티·한국 식품·한국 의류·한국 전자입니다. 상세는 [`references/uzum-guide.md`](references/uzum-guide.md).

## 체이닝

```
gil-commerce:detail-page-copy / gil-content:product-detail  (상세페이지)
  → gil-commerce:detail-page-image / gil-media:nano-banana  (이미지, 러시아어 우선)
  → marketplace-uzum  (본 스킬: 등록·운영)
  → gil-marketing:campaign-planner  (광고)
  → gil-commerce:commerce-review-aggregator / commerce-voc-triage  (리뷰·VOC)
  → gil-data:data-explorer  (매출·전환 분석)
```

## 참조

- 운영 가이드 SSOT: [`references/uzum-guide.md`](references/uzum-guide.md) — 입점·수수료표·SEO·광고·결제·성공 사례
