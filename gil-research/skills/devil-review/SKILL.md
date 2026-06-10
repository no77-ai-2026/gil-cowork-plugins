---
name: devil-review
description: >
  [한·UZ 듀얼] Devil's Advocate 리뷰 — Reviewer 2 수준의 비판적 검토를 시뮬레이션합니다. AI 연구 무결성 게이트(실패모드 차단)·인용 충실성(claim-faithfulness) 점검 포함.
  '내 논문 비판적 리뷰', 'Reviewer 2 시뮬레이션', '심사 대비', 'revise and resubmit',
  'devil's review', '논리 결함 찾아줘'라고 요청하세요. 논리·통계·재현성·방법론·인용·
  윤리·이해 충돌 점검 + 각 critique에 대한 응답 템플릿 제공.
user-invocable: true
version: 1.0.1
---

# Devil's Review (Reviewer 2 시뮬레이션)

> gil-research | 비판적 동료 검토·revise & resubmit 대응

> **한국 표준 + UZ 듀얼 컨텍스트** — 국제 저널(영어) 심사 기준이 기본이며, UZ·CIS 권역(러시아어 논문·УзВАК·ВАК) 투고 시의 심사 관행은 [`references/uz-review-context.md`](references/uz-review-context.md) 참조. (UZ 트리거: "UZ·CIS 학술 심사 대비", "러시아어 논문 reviewer 검토")

## 역할

논문 초안에 대해 Reviewer 2 수준의 가장 까다로운 비판적 검토. 게재 거부 사유 사전 식별 + revise & resubmit 응답 템플릿 제공.

## 트리거 키워드

devil's review, devil's advocate, reviewer 2, 비판적 리뷰, 동료 검토, peer review,
revise and resubmit, R&R, 심사 대비, 논리 결함, 통계 오류, 방법론 한계, 재현성

## 왜 Devil's Review인가

> "Reviewer 2"는 학술 커뮤니티에서 가장 까다로운 심사자의 별명. 이 스킬은 Reviewer 2의 시각으로 사전에 약점을 찾아 보강하는 것이 목적.

## 워크플로우

### Step 1: 논문 초안 입력

- 텍스트 직접 입력 또는 파일
- 또는 paper-writer 산출물 자동
- 학술지 명시 (해당 학술지 기준 적용)

### Step 2: 다층 비판적 검토

#### Layer 1: 논리·구조

```
[ ] 연구 질문 명확한가?
[ ] 가설이 검증 가능한가?
[ ] 방법이 질문에 적합한가?
[ ] 결과가 가설을 입증·기각하는가?
[ ] 논의가 결과로부터 자연스러운가?
[ ] 결론이 데이터를 넘어서지 않는가? (over-interpretation)
[ ] 인용 흐름이 논리적인가?
[ ] 핵심 주장에 빈틈이 있는가?
```

#### Layer 2: 통계·방법론

```
[ ] 표본 크기 정당화 (power analysis)?
[ ] 가정 점검 (정규성·등분산·독립성)?
[ ] 다중 비교 보정 (Bonferroni·FDR)?
[ ] 효과 크기 + 95% CI 보고?
[ ] p-value만 의존 X
[ ] 적합한 검정 사용?
[ ] 결측 데이터 처리 명시?
[ ] 비뚤림 통제 (selection·confounding·measurement)?
[ ] 민감도 분석 (sensitivity analysis)?
[ ] 중복 분석·subgroup의 사전 등록?
```

#### Layer 3: 재현성·투명성

```
[ ] 데이터 공개 (FAIR·DUA)?
[ ] 코드 공개 (GitHub·Zenodo)?
[ ] 패키지·버전 명시?
[ ] 사전 등록 (preregistration)?
[ ] 보고 가이드라인 적용 (CONSORT·STROBE·PRISMA·CHEERS·SRQR)?
[ ] 재현 가능 (다른 연구자가 결과 복제 가능)?
```

#### Layer 4: 인용·문헌

```
[ ] 핵심 선행 연구 인용?
[ ] 자기 인용 과다 X
[ ] 비주류·반대 의견 인용?
[ ] 최신 (3~5년 내) 연구 비율?
[ ] 인용 정확성 (실제 논문 내용과 일치)?
[ ] 인용 형식 일관성?
[ ] Predatory journal 인용 X
```

#### Layer 5: 윤리·COI

```
[ ] IRB·IACUC 승인 명시?
[ ] 동의서 (informed consent) 명시?
[ ] 환자 익명성·데이터 보호?
[ ] 동물 윤리 (3R: Replace·Reduce·Refine)?
[ ] 이해 충돌 (COI) 명시?
[ ] 저자 기여 (CRediT)?
[ ] Funding 명시·영향?
[ ] 데이터 조작·표절 0?
[ ] 사전 발표·이중 출판 X?
```

#### Layer 6: 결과 해석

```
[ ] 인과 관계 vs 상관 관계 구분?
[ ] 일반화 가능성 (external validity)?
[ ] 한계 (limitations) 솔직?
[ ] 양측·대안 해석?
[ ] 임상·실무·정책 함의 정당?
[ ] 향후 연구 방향 구체적?
```

#### Layer 7: 작성·소통

```
[ ] 명료성 (clarity)?
[ ] 학술지 청중 적합?
[ ] 약자·전문 용어 정의?
[ ] 표·그림 설명 self-contained?
[ ] 영어 (또는 학술지 언어) 품질?
[ ] AI 생성 텍스트 티 X (개인 경험·1인칭)?
```

#### Layer 8: 학술지 적합도

```
[ ] Aim & Scope 매칭?
[ ] Article Type 일치?
[ ] Word Limit 준수?
[ ] 인용 형식 일치?
[ ] 보고 가이드라인 적용?
[ ] Cover Letter·Reviewer 추천?
```

상세 체크리스트: `references/reviewer2-checklist.md`.

### Step 3: Critique 정리

각 발견 항목별:
- **Severity**: Critical / Major / Minor
- **Location**: Page·Line 또는 Section
- **Issue**: 무엇이 문제인가
- **Suggestion**: 어떻게 개선?

### Step 4: Major Revisions vs Minor Revisions vs Reject

종합 평가:
- **Reject**: 근본 결함 (방법·결과·해석 중 1개 이상 치명적)
- **Major Revision**: 여러 Major 이슈, 추가 분석·실험 필요
- **Minor Revision**: 작은 수정, 명료화
- **Accept (with edits)**: 사실상 완성

### Step 5: Revise & Resubmit 응답 템플릿

각 Reviewer 코멘트에 응답하는 표준 양식:

```
Reviewer Comment 1:
[원문 코멘트]

Author Response:
We thank the reviewer for this insightful comment.
[수용·반박·부분 수용]

[수용 시] We have addressed this by [구체적 변경].
The revised text now reads (page X, line Y):
"[새 텍스트]"

[반박 시] We respectfully disagree because [이유 + 인용].
However, to clarify, we have added [명료화] on page X.

[부분 수용 시] We agree with [부분]. As suggested,
we have [변경]. However, regarding [부분],
we believe [반대 이유].

Changes:
- Page X, line Y-Z: [변경 내용]
- New Figure/Table N: [추가 시]
- Reference list: Added [N개 새 인용]
```

상세는 `references/revise-and-resubmit-templates.md`.

### Step 6: 후속 작업

- "방법론 보강" → `research-methodology`
- "통계 재분석" → `research-analysis`
- "인용 추가" → `paper-search`
- "타겟 학술지 변경" → `journal-selection`

## Critique 카테고리별 응답 전략

### "Lack of novelty" (혁신성 부족)
- 선행 연구 정확히 매핑 + 차별점 강조
- 새로운 데이터·방법·맥락 명시
- "First study to..." (가능 시)

### "Sample size too small" (표본 부족)
- 사전 power analysis 보고
- 효과 크기 + CI 강조 (p가 아닌)
- 한계로 수용 + 향후 연구 방향
- 추가 데이터 (가능 시)

### "Methods not rigorous" (방법론 한계)
- 추가 분석 (sensitivity, subgroup)
- 가이드라인 적용 명시 (CONSORT 등)
- 한계로 수용 + 정당화

### "Statistical concerns" (통계 비판)
- 전문 통계학자 자문
- 추가 검정·재분석
- 효과 크기·CI 보고 강화
- 사전 등록 명시

### "Generalizability concerns" (일반화 어려움)
- 표본 특성 명시
- 한계로 수용
- 향후 연구 방향

### "Writing/clarity issues" (작성 문제)
- 영어 교정 (전문 서비스)
- 구조 재정리
- 약자·전문 용어 정의

### "Citation gaps" (인용 누락)
- 추가 인용 (모두)
- 감사 표현
- 기존 인용 재정리 (필요 시)

### "Ethical concerns" (윤리)
- IRB·동의서·익명화 명시
- COI 명시
- 데이터 보호 강화

### "Reviewer 2 특수: Self-citation 요구"
- 관련성 평가
- 적절하면 추가, 부적절하면 정중 거절

## 다중 학술지 동시 R&R 전략

논문이 여러 학술지에서 거부되는 경우:
1. 공통 critique 식별
2. 근본 보강 (방법·결과·해석)
3. 다음 학술지 적합도 재평가 (`journal-selection`)
4. 형식 재적응 (`journal-style-adapter`)
5. 재투고

## Devil's Review 강도 조절

```
"리뷰 강도는?"

○ Light: 명료성·형식 위주
○ Medium: 논리·통계 위주 (대부분 권장)
○ Hard: Reviewer 2 모드 (Top 학술지 대비)
○ Brutal: 모든 가능 critique 식별 (예방 차원)
+ Other
```

## 실제 Reviewer 2 시그니처 표현

(시뮬레이션에 활용)

- "The authors fail to acknowledge..."
- "The methodology is fundamentally flawed because..."
- "I am concerned about..."
- "Have the authors considered...?"
- "This paper would benefit from..."
- "It is unclear how..."
- "The conclusions are not supported by the data..."
- "Major concerns: 1) ... 2) ... 3) ..."

## 시뮬레이션 결과 산출물

```
[Devil's Review Report]

Overall Assessment: Major Revision
Estimated Acceptance: 30~40% (with revisions)

Critical Issues (must address before resubmission):
1. ...
2. ...

Major Issues (significant concerns):
1. ...
2. ...

Minor Issues:
1. ...
2. ...

Summary of Required Revisions:
- Methods section: Add power analysis (Section 2.3)
- Results: Report effect sizes with 95% CI (Tables 1-3)
- Discussion: Acknowledge limitations more thoroughly
- References: Add 5 key recent citations (2023-2025)

Recommended Action Plan:
1. (Week 1-2) Statistical reanalysis with effect sizes
2. (Week 2-3) Rewrite Methods + Discussion
3. (Week 3) Re-cite + format check
4. (Week 4) Resubmit
```

## AI 연구 무결성 게이트 (차단형 체크리스트)

AI 보조로 작성·분석된 연구는 사람이 직접 한 연구와 다른 실패 패턴을 보입니다. Devil's Review는 일반 논리 점검에 더해, 아래 **차단형(blocking) 항목**을 통과하지 못하면 "수정 전 제출 보류"로 판정합니다. (개념은 AI 연구 자동화·재현성 분야의 공개적으로 알려진 실패 유형에 기반하며, 구체 출처는 본 스킬 외부에서 검증해 인용하십시오.)

| # | 실패 유형 | 점검 질문 |
|---|---|---|
| 1 | 구현 버그 | 분석 코드·파이프라인이 결과를 재현하는가? 시드·환경 고정? |
| 2 | 결과 환각 | 표/그림의 수치가 실제 산출물과 일치하는가? 캡션과 본문이 같은 값인가? |
| 3 | 지름길 의존 | 데이터 누수(leakage)·과적합으로 성능이 부풀려지지 않았는가? |
| 4 | 버그의 통찰 재포장 | 예상 밖 결과를 "발견"으로 포장하기 전에 오류 가능성을 배제했는가? |
| 5 | 방법론 조작 | 보고된 절차가 실제 수행 절차와 일치하는가(사후 합리화 아님)? |
| 6 | 프레임 고착 | 가설에 반하는 증거를 의도적으로 탐색했는가? |
| 7 | 인용 환각 | 모든 인용이 실재하며, 그 문헌이 **실제로 그 주장을 뒷받침**하는가? |

7번이 통과 못 하면 단독으로도 제출 보류 사유입니다(아래 인용 충실성 참조).

## 인용 충실성 점검 (Claim-Faithfulness)

"실재하는 문헌이 본문 주장을 뒷받침하지 않는" 인용은 환각된 가짜 인용보다 잡기 어렵습니다. 주장-인용 쌍마다 다음을 확인합니다.

1. **존재성** — DOI/식별자로 문헌이 실재하는지(Crossref·Semantic Scholar 등으로 대조).
2. **앵커** — 주장을 뒷받침하는 정확한 위치(페이지·절·표)를 명시했는가.
3. **충실성** — 그 위치가 주장을 (a) 직접 지지 / (b) 부분 지지 / (c) 무관 / (d) 반대 중 무엇인가. (c)·(d)는 차단.
4. **부정 제약 위반** — "X는 없다/효과 없다"류 주장에 긍정 근거를 잘못 붙이지 않았는가.

각 인용에 `지지/부분/무관/반대` 라벨을 달고, 무관·반대는 수정 목록으로 회신합니다.

## 보조 도구

## 보조 도구

- **iThenticate / Turnitin**: 표절 검사
- **Grammarly / DeepL Write**: 영어 교정
- **Trinka.AI**: 학술 영어 교정
- **Penelope.ai**: 학술지 가이드라인 자동 검사
- **Crossref Similarity Check**: 인용 정확성

## AI Reviewer 한계 (정직)

- 분야 깊이 한계 (특히 신생 분야)
- 학술지 편집위원 개인 선호 X
- 정치·소셜 다이나믹 X
- 신규성 평가 한계 (모든 선행 X)

→ 인간 멘토·동료 검토 병행 필수.

## 체이닝 (연구 파이프라인)

```
gil-research:research-methodology  (방법론 설계 + 인간 in-the-loop 무결성)
  → gil-research:paper-search / paper-writer  (선행연구·초고)
  → gil-research:research-analysis  (통계·결과)
  → devil-review  (본 스킬: 비판적 검토 + AI 무결성 게이트 + 인용 충실성)
  → gil-research:journal-style-adapter  (타겟 저널 형식 변환)
  → gil-research:journal-selection  (투고 저널 확정)
```

산출 텍스트(리뷰 보고서·R&R 응답)는 `gil:ai-slop-reviewer` → `gil-content:humanize-korean`(한국어일 때)로 후처리. UZ·CIS 투고는 `references/uz-review-context.md` 병행.

## 이 스킬을 사용하지 말아야 할 때

- **논문 작성 자체** → `paper-writer`
- **방법론 설계** → `research-methodology`
- **통계 코드** → `research-analysis`
- **학술지 선정** → `journal-selection`
- **형식 변환** → `journal-style-adapter`
- **법률 검토 (윤리·COI 분쟁)** → `gil-legal:legal-risk`
