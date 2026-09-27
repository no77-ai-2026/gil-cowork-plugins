---
name: publication-review
description: |
  [한·UZ 듀얼] 광고·상세페이지·아웃바운드 메시지·캠페인 영상의 게시 전 최종 검수 — 5레인(주장·오퍼·발송·권리·플랫폼/최종렌더) 점검, 4상태 기록, 담당자 검토 인계 트리거: "이 광고 내보내도 돼?", "게시 전 최종 검수", "발행 승인 기록", "누가 승인했는지", "nashrdan oldin tekshiruv" (UZ)
version: "2.4.0"
origin: chany-studio/chany-studio@v2.8.1 (MIT, 2026-09-15 반영)
---

# 게시 검수 게이트 (publication-review)

## 스킬 개요(상세)

광고·프로모션·상세페이지·아웃바운드 메시지·캠페인 영상 자산을 게시하기 전에, 특정 카피·자산 버전에 결속된 추적 가능한 검수 기록을 만드는 스킬입니다. 관할·채널·증거·권리·최종 렌더 5개 레인을 모두 점검하고, 결과를 4상태(`blocked | draft-only | ready-for-named-human-review | reviewed-by-named-owner`) 중 하나로 기록한 뒤, 이름이 명시된 담당자에게 결정 패킷을 인계합니다. 전략·카피·크리에이티브 작업은 초안으로 계속 진행할 수 있지만, 사실·증거·공식 출처·권리·고지·담당자 중 하나라도 비어 있으면 게시는 열리지 않습니다.

다음과 같은 요청 시 사용하세요:
- "이 광고 내보내도 돼?", "이거 올려도 되는 거야?"
- "게시 전 최종 검수", "발행 전 마지막 점검해줘"
- "발행 승인 기록 남겨줘", "검수 기록 만들어줘"
- "누가 승인했는지 확인해줘", "이 버전 검토한 사람 누구야"
- "상세페이지 최종 검수", "카드뉴스 게시 검토"
- "이 CRM 메시지 보내도 되는지 검토"
- "nashrdan oldin tekshiruv", "reklamani chiqarsa bo'ladimi" (UZ)

[책임 경계] 이 스킬은 구조화된 마케팅 제작 게이트이지 법률 자문·법적 의견·규제 인증·플랫폼 사전승인·법적 승인이 아닙니다. 직접 게시·업로드·예약·발송·승인하지 않습니다. 공식 요건을 요약하고 위험을 식별할 수는 있지만, 게시 결정의 책임은 이름이 명시된 사람 담당자에게 남습니다. 문구 적법성 자체는 `gil-commerce:commerce-ad-claim-compliance-kr`(해당 번들 설치 시), 발송 규제는 `gil-commerce:commerce-marketing-compliance-kr`(해당 번들 설치 시)가 전담하고, 본 스킬은 그 결과를 레인 입력으로 흡수해 버전 결속·최종 렌더·상태 계산·담당자 게이트를 완성합니다.

※ 본 스킬은 법률 자문이 아니며, 최종 판단은 변호사·심의기관 확인이 필요합니다.

## 개요

검수 전에 반드시 [references/publication-gate.md](references/publication-gate.md)를 읽습니다. 후보에 플랫폼·지면·스토어프런트·아웃바운드 채널·업로드·예약·라이브 운영이 지정돼 있으면 `gil-creative:meta-ads-manager/references/platform-publication-adapter.md`의 어댑터 레코드도 함께 완성합니다. 게시 가능한 흐름은 어떤 것도 이 어댑터를 우회할 수 없습니다.

**책임 한 줄**: 고정된 카피·자산·오퍼·랜딩 버전 → 공식 출처 기록 → 5레인 점검 → 4상태 중 하나 기록 → 담당자 인계 패킷.

### HARD 규칙

- **Claude는 `reviewed-by-named-owner`로 스스로 승격할 수 없습니다.** 자동 검수가 완료돼도 도달 가능한 최고 상태는 `ready-for-named-human-review`입니다.
- **레인 평균 금지.** 하나의 material blocker가 자산 전체 상태를 지배합니다. 레인 4개가 통과해도 하나가 `blocked`면 자산은 `blocked`입니다.
- **레인은 생략하지 않고 비해당으로 적습니다.** 해당 사항이 없는 레인도 레코드에 남기되 `findings: ["n/a — <이유>"]`, `missing: []`, `required_actions: []`로 채웁니다(예: 수신자 지정 발송이 없는 상품 리스팅의 레인 C). 레인을 통째로 빼면 점검했는지 아닌지 나중에 알 수 없습니다.
- **안정 ID가 없는 입력에는 ID를 만들어 붙입니다.** 채팅으로 받은 카피처럼 파일·리비전이 없으면 최종 텍스트(공백 정규화 후)의 SHA-256 앞 8자를 `copy_version_id`로 쓰고 레코드에 원문을 함께 보관합니다. 같은 방식으로 `offer_version_id`(오퍼 문구), `asset_version_ids`(첨부 파일 체크섬)를 만듭니다. ID를 만들 수 없는 입력만 `draft-only` 사유가 됩니다.
- **배치는 최저 상태.** 여러 자산을 한 번에 검수하면 독립 게시 가능한 버전마다 별도 레코드를 만들거나, 배치 상태를 가장 낮은 미해결 자산 상태로 둡니다.
- 침묵·"괜찮아 보임"·이전 캠페인 승인·도구 결과는 담당자 검토가 아닙니다.
- 빠진 증거를 라벨 완화나 면책 문구 발명으로 메우지 않습니다.

## 트리거 키워드

- 게시 판단: "이 광고 내보내도 돼?", "올려도 돼?", "발행해도 되나"
- 최종 검수: "게시 전 최종 검수", "발행 전 점검", "최종 렌더 확인"
- 기록: "발행 승인 기록", "검수 기록", "누가 승인했는지"
- 재검수: "카피 바꿨는데 다시 검수", "크롭 바꾼 버전 검토"
- UZ: "nashrdan oldin tekshiruv", "reklama tekshiruvi"

## 필수 입력

게시 가능 상태를 부여하기 전에 다음을 확정합니다.

- 대상 관할(복수 가능), 게시일, 대상 연령 경계, 모든 채널·지면
- 정확한 카피·오퍼·랜딩·자산·최종 렌더 버전 식별자
- 현재 증거, 가격·거래 조건, 권리·동의 기록, 고지, 도메인 통제, 플랫폼 요건
- 이름이 명시된 담당자, 역할, 검토 권한 범위

입력이 비어 있어도 초안 발상·초안 제작은 막지 않습니다. 다만 게시는 막히며, 빈 항목은 반드시 `unresolved_items`에 기록합니다.

## 워크플로우

1. **후보 고정** — 카피·자산 파일·크롭/레이아웃 변형·최종 렌더·오퍼 조건·랜딩의 안정 식별자를 기록한다. 덮어쓰기 가능한 파일명만으로는 부족하다.
2. **경계 확정** — 관할·채널·지면·대상·도메인·게시 시점·담당자를 확정한다. 한 시장의 규칙을 다른 시장에 그대로 적용하지 않는다.
3. **공식 출처 조회** — 검수 시점에 각 규칙·플랫폼 요건의 현재 1차 출처를 찾아 제목·발행처·URL·발행/갱신일·시행일·조회일·만료/재확인 트리거·적용 범위·지원 레인을 기록한다. 날짜가 없으면 `unknown`. 2차 요약은 탐색 보조로만 쓴다.
4. **5레인 점검** — A 주장·증거, B 오퍼·거래, C 아웃바운드 메시지, D 보증·크리에이터·권리, E 도메인·플랫폼·최종 렌더. 각 레인은 `{findings[], missing[], required_actions[]}`를 반환한다.
5. **분리** — 확인된 사실 / 뒷받침된 주장 / 초안 제안 / 빠진 증거 / 담당자 결정 사항 / hard blocker를 나눈다.
6. **상태 부여** — 4상태 중 정확히 하나를 부여하고, 미해결 항목마다 구체적 수정안과 담당자를 적는다.
7. **담당자 기록** — 담당자가 고정된 정확한 버전을 검토하면 이름·역할·결정·시각·만료/재확인일을 기록한다. 기록된 범위보다 넓은 승인을 암시하지 않는다.
8. **무효화 후 재개** — 무효화 변경이 생기면 검수를 다시 연다. 옛 기록은 이력으로 보존하고, 그 상태를 바뀐 파생본에 옮기지 않는다.

## 4상태 모델

| 상태 | 의미 | 게시 결과 |
|---|---|---|
| `blocked` | 금지·불안전·기만·무단·실질적 근거 부족 요소가 남아 있음 | 게시 불가. 제거·교체·에스컬레이션 |
| `draft-only` | 초안 작업은 가능하나 사실·증거·출처·권리·고지·버전 ID·담당자 정보가 불완전 | 게시·발송 불가 |
| `ready-for-named-human-review` | 고정 버전에 대해 5레인·공식 출처 점검 완료, 담당자 지정됨, 결정 미기록 | 담당자가 결정을 기록할 때까지 게시 불가 |
| `reviewed-by-named-owner` | 담당자가 정확한 고정 버전을 검토하고 범위 한정 결정을 기록함 | 기록된 결정과 조직의 릴리스 절차를 따름. 법적 승인 아님 |

### 판정 우선순위 (HARD — 위에서부터 먼저 걸리는 것이 상태를 결정)

1. **`blocked`** — 자산 안에 남아 있는 내용 자체가 문제인 경우: 금지 표현, 불안전·기만, 무단 사용, **근거 없는 효능·성능·비교 주장**, 허위 희소성·허위 기간, 관할이 금지한 표현. 문구를 빼거나 바꿔야 풀립니다.
2. **`draft-only`** — 내용은 살릴 수 있으나 **정보가 비어 있는** 경우: 공식 출처 미조회, 증빙 미첨부, 버전 ID 없음, 번역본 없음, 담당자 미지정, `recheck_by` 경과. 채워 넣으면 올라갑니다.
3. **`ready-for-named-human-review`** — 1·2가 모두 해소되고 담당자가 지정된 경우.
4. **`reviewed-by-named-owner`** — 사람만 기록합니다.

같은 자산이 1과 2에 동시에 걸리면 **`blocked`가 이깁니다**. 규제 산업(의료·금융·교육 라이선스 등)에서 "공식 출처를 아직 조회하지 못했다"는 2번 사유이므로 `draft-only`이지, 그 사실만으로 `blocked`가 되지는 않습니다.

## 버전 결속

리포지토리 리비전, 문서 리비전, 자산 ID+체크섬, 내보내기 ID, 해시 같은 안정 식별자에 검수를 결속합니다. 카피 수정·번역 변경·CTA/오퍼 변경·고지 변경·크롭·레이아웃·텍스트 위치·자막·합성·최종 렌더 교체는 이전 검수를 무효화합니다. 채널·타게팅·관할·랜딩·플랫폼 규칙의 실질 변경도 새 검수를 요구합니다. 바뀐 후보는 `draft-only` 이하로 되돌리고, 영향 레인을 다시 돌린 뒤 담당자가 새 버전을 검토해야 합니다. `recheck_by` 경과, 의존 출처·증거 만료, 게시일 이전 시행 예정 규칙도 파일이 그대로여도 무효화 트리거입니다.

## 출력 형식

```yaml
publication_review:
  review_id: ""
  status: "blocked | draft-only | ready-for-named-human-review | reviewed-by-named-owner"
  reviewed_scope:
    jurisdictions: []
    channels_and_placements: []
    audience_and_age_boundary: ""
    domain_and_offer_type: ""
    intended_publication_date: ""
    copy_version_id: ""
    offer_version_id: ""
    landing_destination_version_id: ""
    asset_version_ids: []
    final_render_version_ids: []
  named_review_owner:
    name: ""
    role: ""
    authority_scope: ""
    decision: "pending | approved-within-scope | changes-required | rejected"
    decided_at: ""
  official_sources:
    - title: ""
      publisher: ""
      url: ""
      published_or_updated: "unknown | date"
      effective_date: "unknown | date"
      accessed_at: ""
      expires_or_recheck: "before publication | date | trigger"
      applies_to: ""
      review_lane: ""
  review_lanes:
    claims_and_evidence: {findings: [], missing: [], required_actions: []}
    offer_and_transaction: {findings: [], missing: [], required_actions: []}
    outbound_messaging: {findings: [], missing: [], required_actions: []}
    endorsement_creator_and_rights: {findings: [], missing: [], required_actions: []}
    domain_platform_and_final_render: {findings: [], missing: [], required_actions: []}
  unresolved_items: []
  invalidation_triggers: []
  reviewed_at: ""
  recheck_by: ""
  release_note: "사람 검토 기록이며 법적 승인·게시 권한이 아님"
```

미지 값은 빈 문자열 또는 `"unknown"`으로 두고 절대 추정으로 채우지 않습니다. 게이트에 영향을 주는 필드는 모두 보존합니다.

## 사용 예시

```
"이 카드뉴스 4장 인스타에 내보내도 돼?"
→ 4장 각각 최종 렌더 ID 고정 → 레인 A(할인율 근거)·D(모델 초상 동의)·E(인스타 크롭 고지 가림) 점검
→ 3장 ready-for-named-human-review, 1장 draft-only(모델 동의 기록 없음) → 배치 상태 draft-only
→ 담당자 인계 패킷 7항목 출력

"카피 한 줄 바꿨는데 어제 승인 그대로 쓰면 돼?"
→ 불가. 카피 변경은 무효화 트리거 → 새 copy_version_id로 draft-only부터 재검수 → 담당자 재결정 필요

"누가 승인했는지 확인해줘"
→ named_review_owner{name, role, authority_scope, decision, decided_at} + 검토된 정확한 버전 ID 회신
→ 기록이 없으면 "담당자 결정 기록 없음 — 현재 상태 ready-for-named-human-review"로 답함
```

## 주의사항

- `ready-for-named-human-review`를 "승인됨"으로 표현하지 않습니다. `reviewed-by-named-owner`는 담당자의 기록된 결정 없이는 절대 부여하지 않습니다.
- 최종 렌더의 카피가 승인 카피와 다르거나, 크롭·레이아웃이 필수 문맥·고지를 가리거나, 랜딩과 오퍼가 일치하지 않으면 게시를 멈춥니다.
- 교정 가능한 입력이 대기 중이면 `draft-only`, 금지·불안전·기만·근거 부족·무단 콘텐츠는 `blocked`입니다.
- 검수 과정에서 테스트 메시지나 실제 메시지를 발송하지 않습니다.
- 실사 인물 이미지의 `sensuality_level`(0·1·2) 점검은 **레인 D(보증·크리에이터·권리·표현)** 가 소유합니다. 우즈베키스탄 시장 후보는 레인 D에서 0 고정을 확인하고, 광고법의 국가어 표기·비교광고 조항은 레인 E에서 봅니다. [references/uz-publication-review.md](references/uz-publication-review.md) 참조.

## 관련 스킬

- `gil-commerce:commerce-ad-claim-compliance-kr`(해당 번들 설치 시) — 레인 A(주장·증거) 한국 표시광고법·식약처·전상법 문구 검사 위임
- `gil-commerce:commerce-marketing-compliance-kr`(해당 번들 설치 시) — 레인 C(아웃바운드 메시지) 정통망법 발송 규제 위임
- `gil-commerce:commerce-influencer-collab` — 레인 D 크리에이터 협업·뒷광고 고지 질문
- `gil:legal-risk`, `gil:law-research` — 관할별 1차 법령·시행일 조사 (해당 번들 설치 시)
- `gil:mfds-safety` — 식품·화장품·건강기능식품 식약처 안전 질문 (해당 번들 설치 시)
- `gil-creative:creative-wizard` — QA 단계에서 본 스킬을 호출하는 코디네이터
- `gil-creative:meta-ads-manager` — `references/platform-publication-adapter.md` 공유 어댑터 소유

타 번들 스킬 결과는 `specialist_handoffs[]` 레코드(`gil-creative:creative-wizard/references/campaign-state.md`)로 흡수하고 출처를 귀속합니다. 미설치 시 그 사실을 밝히고, 빠진 전문 검토 때문에 게시를 보류하는 검수 기록을 남깁니다. 실행되지 않은 스킬이 실행됐다고 말하지 않습니다.

## 출처

- 원본 스킬(frontmatter `origin` 참조, MIT) — 5레인 게이트·4상태 모델·버전 결속 규칙을 GIL 네임스페이스로 이식
- 「표시·광고의 공정화에 관한 법률」, 「전자상거래 등에서의 소비자보호에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 — 레인별 한국 1차 법령
- 우즈베키스탄 「광고법」(O'zbekiston Respublikasining "Reklama to'g'risida"gi Qonuni) — UZ 레인 E 1차 출처
