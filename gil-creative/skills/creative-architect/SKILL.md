---
name: creative-architect
description: |
  [한·UZ 듀얼 · gil-creative 핵심 IP] 광고 크리에이티브의 감정 여정 8단계 + 카피 방법론 10종을 코드화한 설계 엔진입니다. 하나의 브리프에서 상세페이지·카드뉴스·포스터·인쇄물 공통으로 쓰는 CreativeSpec(섹션별 역할·헤드라인·본문·레이아웃·렌더모드·이미지프롬프트)을 언어 병렬(RU/UZ/KR)로 생성합니다.
  다음과 같은 요청 시 사용하세요:
  - "광고 크리에이티브 설계해줘"
  - "감정 여정 8단계로 카피 구조 잡아줘"
  - "히어로부터 톤 앵커링해서 전 섹션 설계"
  - "벤치마크 흐름 이어서 새 카피 흐름 만들어줘"
  - "우즈벡 시장용 크리에이티브 설계"
  - "reklama kreativ" (광고 크리에이티브, UZ)
  단독으로도 쓰지만 보통 gil-creative:creative-wizard 코디네이터가 호출합니다. 시장 현지화는 gil-creative:market-profile-engine, 자료 흐름은 gil-creative:material-analyzer, 포맷 산출은 gil-commerce:detail-page-copy·gil-creative:card-news·gil-creative:poster-ad-builder·gil-creative:print-creative-builder로 이어집니다. 텍스트 산출은 마지막에 gil:ai-slop-reviewer → gil:humanize-korean으로 종료합니다.
version: "2.4.1"
---

# 크리에이티브 아키텍트 (Creative Architect)

> **역할** 광고 크리에이티브의 "설계 두뇌". **감정 여정 8단계 + 카피 방법론 10종**을 규칙으로 코드화해, 포맷·시장에 무관한 **CreativeSpec**을 산출한다.
> **핵심 원칙** 텍스트 지능은 Claude가 직접 수행한다(외부 텍스트 API 없음). 이미지 생성만 외부(gil-creative:image-bridge).
> **한·UZ 듀얼** 한국 표준 + UZ/CIS 듀얼 컨텍스트. 비라틴(키릴·우즈벡) 시장은 후조판을 기본으로 설계한다.

---

## 0. 무엇을 만드는가 (산출물)

**CreativeSpec** — 포맷 빌더가 그대로 소비하는 설계 명세. 기본 산출은 Markdown(.md)이며, 빌더 연동용 JSON 블록을 함께 낸다.

```json
{
  "meta": { "product": "", "market": "", "format": "", "preset": "", "anchorApproved": false },
  "sections": [
    {
      "key": "hero",
      "role": "첫 3초 볼 이유·핵심 약속",
      "headline": { "ko": "", "ru": "", "uz": "" },
      "body": { "ko": "", "ru": "", "uz": "" },
      "layout": "hero-block",
      "renderMode": "overlay",         // "flat"(통이미지) | "overlay"(후조판)
      "imgPrompt": "",
      "imgAsset": null
    }
  ]
}
```

- `headline`/`body`는 **언어 병렬 보관** → 언어 전환·문구 수정·인쇄물 재사용에 유리(§방법론 10).
- `renderMode`는 §방법론 10 규칙으로 자동 결정.

---

## 1. 감정 여정 8단계 (방법론 #1)

각 섹션은 반드시 `[역할 / 무엇을 보여주나 / 목적]` 3요소로 정의한다.

| 단계 | key | 역할·목적 |
|---|---|---|
| ① 히어로 | `hero` | 첫 3초 안에 "볼 이유". 핵심 약속을 가장 크게 |
| ② 문제제기 | `pain` | 고객이 느끼는 불편·망설임을 먼저 꺼내 필요성으로 연결 |
| ③ 고민 리스팅 | `worries` | 구매 전 속마음을 말풍선처럼 보여 공감·몰입 |
| ④ 제품 특장점 | `benefits` | 기능을 '고객이 얻는 변화'로 번역 |
| ⑤ 해결·계획 | `solution` | 제품이 문제를 어떻게 푸는지 |
| ⑥ 구매 제안 | `offer` | 오퍼·행동 유도 |
| ⑦ 고객 후기 | `proof` | 별점·인용 카드로 선택 불안 제거 |
| ⑧ 마지막 확신·오퍼 | `final` | 손실 회피 자극 + 최종 혜택·CTA |

> **포맷별 압축/확장**: 상세페이지=8~13섹션 전개 / 카드뉴스=4~10장 압축 / 포스터=①④⑥⑧ 핵심만 1컷 / 인쇄물=포맷 규격에 맞춰 재편성. 단계 골격은 공통 엔진으로 유지.

---

## 2. 카피 방법론 10종 (필수 반영 IP)

설계 시 **모든 섹션 카피가 아래 10종을 통과**해야 한다. 산출 끝에 §7 체크리스트로 자가검증한다.

| # | 방법론 | 실행 규칙 |
|---|---|---|
| 1 | 감정 여정 8단계 | §1 골격 준수. 섹션마다 `[역할/무엇을/목적]` 3요소 명시 |
| 2 | 장면 연속성 | 각 섹션의 서브카피가 **다음 구매 판단**으로 이어지게. 섹션 끝에 다음 장면 브릿지 1줄 |
| 3 | 반복 금지 + 정보 위계 | 히어로 문구를 반복하지 말 것. 같은 제품 톤 안에서 **새 장면·구도·정보 위계** 생성 |
| 4 | 베네핏 헤드라인 | 제목 = 섹션명(X). 실제 **혜택 문구**(O). 예: "성분표" → "밤새 마르지 않는 이유" |
| 5 | 기능→변화 번역 | 스펙을 '고객이 얻는 변화'로 치환. `[기능] → [그래서 당신에게 생기는 변화]` 2단 표기 |
| 6 | 섹션별 레이아웃 규칙 | 고민=말풍선 4~5개 / 후기=별점·마스킹 인용 카드 3~4개 / 히어로=가장 큰 약속(§4) |
| 7 | 후기 선분석 → 전 섹션 반영 | gil-creative:material-analyzer·gil-commerce:commerce-voc-triage가 추출한 **실제 고객 언어**를 카피에 주입 |
| 8 | 히어로 톤 앵커링 | 히어로 1장 먼저 확정(승인 게이트) → 톤·컬러·구도·서체 위계 상속(§3) |
| 9 | 벤치마크 흐름 계승 | 업로드 자료의 **카피 흐름·정보 순서는 계승, 문구는 새로**(복제 금지)(§5) |
| 10 | 통이미지 vs 후조판 | 라틴·짧은 카피=통이미지(flat) / 비라틴·정확문구·다국어·편집=후조판(overlay). **CIS 기본=overlay**(§6) |

### 2.1 베네핏 헤드라인 변환 예시 (방법론 #4·#5)

| 나쁜 예 (섹션명·스펙) | 좋은 예 (혜택·변화) |
|---|---|
| "히알루론산 5종 함유" | "저녁까지 당김 없이 촉촉하게" |
| "제품 스펙" | "왜 아침 화장이 안 무너질까" |
| "고출력 모터" | "이불 먼지까지 3초 만에" |

---

## 3. 히어로 톤 앵커링 (방법론 #8) — 승인 게이트

1. 전체를 한 번에 뽑지 않는다. **히어로 1장(카피 + 이미지 프롬프트)을 먼저 확정**한다.
2. 히어로에서 **톤·컬러·구도·서체 위계**를 '앵커'로 고정한다(`meta.anchorApproved`).
3. **사용자 승인 게이트**: 히어로 확정 시 사용자 승인을 받아야 나머지 섹션 일괄 설계로 넘어간다.
4. 이후 모든 섹션은 이 앵커를 상속 → 섹션 간 톤·비주얼 일관성 유지.

> 코디네이터(gil-creative:creative-wizard)가 이 게이트를 관리한다. 단독 실행 시 이 스킬이 직접 "히어로 승인하시겠어요?"로 멈춘다.

---

## 4. 섹션별 레이아웃 규칙 (방법론 #6)

| 섹션 | 레이아웃 규칙 (컴포넌트) |
|---|---|
| `hero` | 대표 이미지 + Display 헤드라인 + 서브 + 배지. 여백 크게, 가장 큰 약속 |
| `worries` | 어두운 배경 + 큰 제목 + 흰색 채팅 말풍선 4~5개(고객 속마음, 짧은 1문장) |
| `benefits` | 베네핏 카드 3분할(아이콘 + 짧은 제목 + 1줄 설명) |
| `proof` | 별점 + 마스킹 이름 + 큰 인용문 후기 카드 3~4개. 1인칭 짧고 크게 |
| `offer`/`final` | CTA 블록(버튼 + 오퍼 배지 + 결제·배송 아이콘 행) |

> 컴포넌트는 **구조만** 정의한다. 색·서체는 바인딩된 브랜드킷 토큰을 따른다(디자인 시스템 = gil-creative:design-system-prep 소싱).

---

## 5. 벤치마크 흐름 계승 (방법론 #9)

- gil-creative:material-analyzer가 파악한 업로드 자료(기존 상세·경쟁사·PDF)의 **카피 흐름·정보 순서**를 입력으로 받는다.
- 신규 카피는 그 **논리 전개는 유지, 표현·비주얼·정보 위계는 갱신**한다. 문구 복제 금지.
- 벤치마크가 **타 시장** 자료면 gil-creative:market-profile-engine 프로필로 톤·소구점을 요청 시장에 맞게 변환.
- 벤치마크가 없으면 §1 감정 여정 기본 골격을 사용.

---

## 6. 통이미지 vs 후조판 결정 로직 (방법론 #10)

```
IF 언어 ∈ {키릴(RU), 우즈벡, 아랍(RTL), 기타 비라틴}      → renderMode = "overlay"(후조판)
ELIF 정확한 문구 필요 OR 다국어 전환 OR 편집/인쇄 재사용   → renderMode = "overlay"
ELIF 라틴 문자 + 짧은 카피 + 빠른 시안                    → renderMode = "flat"(통이미지)
ELSE                                                    → renderMode = "overlay"  (안전 기본값)
# 시장 프로필이 CIS(RU·UZ)이면 전 섹션 기본 overlay
```

- **overlay**: gil-creative:image-bridge가 **배경만 생성** → 카피는 코드/디자인으로 위에 얹음. 비라틴 오타 리스크 회피.
- **flat**: 카피·디자인을 이미지 안에 함께 생성. 라틴·짧은 카피에만.

---

## 7. 산출 절차 (실행)

1. **입력 수집**: 브리프(product·market·format·tone), 시장 프로필(gil-creative:market-profile-engine), 자료·후기 인사이트(gil-creative:material-analyzer), 벤치마크 흐름. (v2.4.0) 업종 패킷 `industry_direction`(gil-creative:industry-overlay)이 있으면 `message_job`·`proof_objects`·`claim_ledger`·`must_capture`·`directing_rules`·`required_disclosures`·`prohibited_or_high_risk`를 **이름 그대로** 받아 8단계 설계에 반영하고, 레퍼런스 보드(gil-creative:reference-board)의 Visual DNA는 방향 자료로만 쓴다.
2. **히어로 우선 설계** → 승인 게이트(§3).
3. **앵커 상속 → 전 섹션 설계**: §1 골격에 §2 방법론 10종 적용, 언어 병렬 카피.
4. **renderMode 결정**(§6) + 섹션별 이미지 프롬프트(구조 + §4 레이아웃 + 시장 톤 오버레이) 생성.
5. **CreativeSpec(.md + JSON)** 출력. (v2.4.0) 캠페인 상태 레코드(gil-creative:creative-wizard `references/campaign-state.md`)의 `creative_direction.version_id`·`copy_lock`·`claim_ledger` 참조를 함께 기록해, 오퍼·카피·방향이 바뀌면 의존 산출물만 무효화되게 한다. 실사 인물 이미지 프롬프트는 `gil-creative:image-bridge/references/photoreal-prompt-grammar.md`의 8칸 문법·`sensuality_level`(기본 0)을 따른다.
6. **자가검증 체크리스트**(아래) 전수 통과 확인.
7. 포맷 빌더로 핸드오프. 텍스트 산출은 **gil:ai-slop-reviewer → gil:korean-spell-check(한국어·민감도 public 시) → gil:humanize-korean(마지막, Phase 6 최종 검수)** 로 종료.

### 자가검증 체크리스트 (10종)
- [ ] 8단계 감정 여정 골격 유지, 각 섹션 3요소 명시
- [ ] 섹션 간 장면 브릿지(연속성) 존재
- [ ] 히어로 문구 반복 없음 / 정보 위계 상이
- [ ] 모든 제목이 베네핏 헤드라인(섹션명 아님)
- [ ] 스펙이 '변화 언어'로 번역됨
- [ ] 섹션 레이아웃 규칙 준수(말풍선·후기카드 수)
- [ ] 후기·자료의 실제 고객 언어 주입됨
- [ ] 히어로 앵커 상속 확인
- [ ] 벤치마크 흐름 계승(복제 아님)
- [ ] renderMode 규칙대로 결정(CIS=overlay)

---

## 8. 체이닝 (기존 gil 스킬 조합)

| 단계 | 연동 스킬 | 방향 |
|---|---|---|
| 시장 현지화 오버레이 | `gil-creative:market-profile-engine` | ← 입력 |
| 업종 오버레이 (v2.4.0) | `gil-creative:industry-overlay` — `industry_direction` 패킷 | ← 입력 |
| 레퍼런스 보드 (v2.4.0, 선택) | `gil-creative:reference-board` — Visual DNA(방향 자료만) | ← 입력 |
| 자료·벤치마크 흐름 | `gil-creative:material-analyzer` | ← 입력 |
| 후기 인사이트 | `gil-commerce:commerce-voc-triage` | ← 입력(material-analyzer 경유) |
| 디자인 토큰·브랜드킷 | `gil-creative:design-system-prep` | ← 참조 |
| 상세페이지 카피 산출 | `gil-commerce:detail-page-copy` | → 핸드오프 |
| 카드뉴스 산출 | `gil-creative:card-news` | → 핸드오프 |
| 포스터/인쇄 산출 | `gil-creative:poster-ad-builder`·`gil-creative:print-creative-builder` | → 핸드오프 |
| 이미지 프롬프트 실행 | `gil-creative:image-bridge` (+ `gil-creative:gpt-image-2-prompt`·`gil-creative:gemini-3-image-prompt`) | → 핸드오프 |
| 규제 점검 | `gil-commerce:commerce-marketing-compliance-kr` | → QA |
| 게시 전 검수 (v2.4.0) | `gil-creative:publication-review` — 게시 목적 산출물, 4상태 기록 | → QA |
| 텍스트 마감 | `gil:ai-slop-reviewer` → `gil:korean-spell-check`(민감도 public 시) → `gil:humanize-korean`(마지막, Phase 6 최종 검수) | → QA |

> 상세 UZ/CIS 현지화 규칙은 `references/uz-creative-architect.md` 참조.

---

## 9. 산출 포맷 규칙
- 기본 산출은 **Markdown(.md)**. Word/PPT/PDF 등 무거운 포맷은 사용자 명시 요청 시에만.
- 파일명 `[크리에이티브]_[제품·주제]_[YYYYMMDD]`, 카테고리 폴더 저장.
- 코드·JSON·순수 표를 제외한 모든 텍스트는 AI 슬롭 검수로 종료.
