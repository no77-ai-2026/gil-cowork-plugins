---
name: yandex-market
description: |
  [한·UZ 듀얼] Yandex Market(러시아 최대 이커머스) + UZ Yandex 생태계(Direct 광고·Search) 운영 전담 스킬. 한국 셀러의 러시아 시장 진출 주력 채널이자, UZ에서는 Yandex Direct 광고로 Uzum 판매를 보조하는 전략을 다룹니다.
  "Yandex Market 등록", "얀덱스 마켓 입점", "Yandex Direct 광고", "러시아 이커머스 진출", "얀덱스 UZ 광고"라고 요청하세요.
  (UZ 추가 트리거: "UZ Yandex Direct 타겟팅", "러시아 K-뷰티 판매", "EAEU 경유 입점")
user-invocable: true
version: 1.0.1
---

# yandex-market — Yandex Market 운영

> gil-commerce | 러시아 최대 이커머스 + UZ Yandex(Direct·Search) | 한·UZ 듀얼

## 한 줄 요약

Yandex Market는 **러시아** 최대 이커머스이며, **UZ**에서는 주로 Yandex Search·Direct(광고)로 활용됩니다. 한국 셀러에게는 (1) 러시아 시장 직판 채널, (2) UZ에서 Uzum 판매를 보조하는 광고 채널의 두 역할입니다. 상세는 [`references/yandex-guide.md`](references/yandex-guide.md).

## 책임 경계

- **본 스킬**: Yandex Market(러시아) 입점·운영 + UZ Yandex Direct 광고.
- UZ 실판매 본진은 `marketplace-uzum`, C2C는 `marketplace-olx`, Telegram은 `telegram-commerce`.

## 두 시장, 두 역할

| 시장 | Yandex의 역할 | 한국 셀러 전략 |
|---|---|---|
| 러시아 | Yandex Market 실판매(수백만 사용자) | K-뷰티·K-팝 강세 → 주력 직판 |
| 우즈베키스탄 | Yandex Search(~10%)·Direct 광고 | 광고로 유입 → 실판매는 Uzum |

## 워크플로우

### 1. 입점 (러시아 Yandex Market)

- `partner.market.yandex.ru` 셀러 등록.
- 러시아 법인 또는 EAEU 회원국 자격 필요 → 한국 셀러는 **러시아 대리인/합작** 또는 EAEU(카자흐스탄·우즈벡 향후) 경유.
- 풀필먼트 모델: FBY(Yandex 풀필먼트) 또는 셀러 자체.

### 2. 카테고리·수수료

카테고리별 2~10%. 모델(FBY vs 자체)에 따라 비용 구조가 다름 → [`references/yandex-guide.md`](references/yandex-guide.md) 참조.

### 3. 광고 (Yandex Direct) — UZ 타겟 핵심

- UZ 사용자 타겟팅: Yandex Search(UZ 점유율 ~10%)·디스플레이·카테고리/관심사 타겟팅.
- CPC 대략 $0.05~$0.50(UZ 기준, 한국 대비 낮음).
- SEO는 `gil-marketing:seo-audit`(uz-seo-yandex), 캠페인은 `gil-marketing:campaign-planner`(uz-marketing-channels).

### 4. 상품 카피·이미지

러시아어 카피 → `gil-content:copywriting`. 이미지 → `gil-media:nano-banana`.

## UZ 진출 시나리오 (권장)

1. **러시아 직판**: Yandex Market 입점(K-뷰티·K-팝).
2. **UZ**: Yandex Direct(광고 유입) + **Uzum Market(실판매)** 조합. UZ 단독 Yandex Market 정식 진출은 진행 중이므로 Uzum을 본진으로.

## 한·UZ 듀얼 컨텍스트

한국 셀러에게 Yandex는 "러시아 진출의 관문 + UZ 광고 채널"입니다. 네이버 검색광고 감각을 Yandex Direct로 옮기되, 키릴 검색어·러시아어 랜딩·EAEU 입점 요건이 다릅니다. 상세는 [`references/yandex-guide.md`](references/yandex-guide.md).

## 체이닝

```
gil-marketing:seo-audit (uz-seo-yandex)  (Yandex SEO 진단)
  → gil-content:copywriting  (러시아어 카피)
  → gil-media:nano-banana  (이미지)
  → yandex-market  (본 스킬: 입점·Direct 광고)
  → marketplace-uzum  (UZ 실판매 연계)
  → gil-data:data-explorer  (성과 분석)
```

## 참조

- 운영 가이드 SSOT: [`references/yandex-guide.md`](references/yandex-guide.md) — 입점·수수료·UZ 진출 시나리오·Yandex Direct
