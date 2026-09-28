---
name: material-analyzer
description: |
  [한·UZ 듀얼 · gil-creative] 업로드된 제품 자료·기존 상세페이지·경쟁사 벤치마크·후기의 '카피 흐름과 정보 순서'를 분석해 크리에이티브 설계 입력으로 정리하는 스킬입니다. 벤치마크의 논리 전개는 계승하되 문구는 새로 쓰도록(복제 금지) 흐름 맵을 만들고, 후기에서 실제 고객 언어를 추출합니다.
  다음과 같은 요청 시 사용하세요:
  - "이 상세페이지 캡처 흐름 분석해줘"
  - "경쟁사 벤치마크 카피 순서 파악"
  - "후기에서 소구점 뽑아줘"
  - "업로드 자료로 크리에이티브 입력 정리"
  - "material tahlili" (자료 분석, UZ)
  방법론 #7(후기 선분석)·#9(벤치마크 흐름 계승)를 담당합니다. 후기 대량 분석은 gil-commerce:commerce-voc-triage, 상품 사진 분석은 gil-commerce:product-photo-brief로 이어지고, 결과는 gil-creative:creative-architect 설계 입력으로 전달됩니다.
version: "2.6.0"
---

# 자료·벤치마크 분석기 (Material Analyzer)

> **역할** 업로드 자료(제품 자료·기존 상세·경쟁사·PDF·후기)를 해석해 gil-creative:creative-architect가 소비할 **흐름 맵 + 고객 언어 + 소구점**을 산출한다.
> **담당 방법론** #7(후기 선분석 → 전 섹션 반영), #9(벤치마크 흐름 계승).

---

## 1. 입력 자료 유형
- 제품 자료: 스펙·성분·기능·가격·상품 사진.
- 벤치마크: 잘 팔린 기존 상세페이지 캡처, 경쟁사 상세·광고, PDF.
- 후기: 엑셀·CSV·텍스트(별점·본문).

---

## 2. 벤치마크 흐름 분석 (방법론 #9)
1. 자료의 **섹션 순서·정보 위계·카피 흐름**을 추출해 흐름 맵으로 정리.
2. 각 섹션의 역할(무엇을 설득하나)을 감정 여정 8단계에 매핑.
3. **계승 원칙**: 논리 전개는 유지, 표현·비주얼·정보 위계는 갱신. **문구 복제 금지**.
4. 타 시장 자료면 "현지화 필요" 플래그 → gil-creative:market-profile-engine로 변환 지시.

```json
{
  "flowMap": [
    { "order": 1, "sourceRole": "히어로", "journeyStage": "hero", "note": "핵심 약속 위치" }
  ],
  "carryOver": "유지할 논리 전개",
  "renew": "갱신할 표현·위계",
  "crossMarket": false
}
```

---

## 3. 후기 선분석 (방법론 #7)
1. 후기에서 **실제 고객 언어**(반복 표현·감정어·구매 계기·불만) 추출.
2. 긍정 소구점 / 불안·이의(objection) / 재구매 이유로 분류.
3. 핵심 소구 3~5개를 gil-creative:creative-architect 섹션(②문제제기·④특장점·⑦후기·⑧확신)에 주입 지시.
4. 마스킹 인용문 후보(후기 카드용) 3~4개 선별.

```json
{
  "voice": ["보습 지속", "저자극"],
  "objections": ["끈적임 걱정"],
  "quotes": ["아침까지 안 당겨요 - 김O영"],
  "inject": { "pain": [], "benefits": [], "proof": [] }
}
```

> 후기 수가 많으면(수백 개) gil-commerce:commerce-voc-triage로 위임 후 결과를 받는다.

---

## 4. 산출
- **흐름 맵 + 고객 언어 + 소구 주입 지시**를 Markdown(.md) + JSON으로.
- gil-creative:creative-architect의 §5(벤치마크 계승)·§2 방법론 #7 입력으로 전달.

---

## 5. 체이닝
| 목적 | 스킬 |
|---|---|
| 후기 대량 분석 | `gil-commerce:commerce-voc-triage` |
| 상품 사진 분석·부족 컷 | `gil-commerce:product-photo-brief` |
| 설계로 핸드오프 | `gil-creative:creative-architect` |
| 시장 변환(타 시장 벤치마크) | `gil-creative:market-profile-engine` |

> UZ/CIS 자료(RU/UZ 후기) 처리 규칙은 `references/uz-material-analyzer.md`.
