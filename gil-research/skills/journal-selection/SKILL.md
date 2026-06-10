---
name: journal-selection
description: >
  [한·UZ 듀얼] 연구 논문에 적합한 타겟 학술지를 선정합니다. '학술지 추천', 'Nature 투고 가능?',
  'IF 매트릭스', 'Scopus 학술지', 'KCI 학술지', '의학 톱 저널'이라고 요청하세요.
  Impact Factor·Scopus·SCIE·SSCI·AHCI·KCI·심사 기간·접수율·OA fee·분야 적합성·
  예상 성공률을 기반으로 1~3개 후보 추천.
user-invocable: true
version: 1.0.1
---

# 타겟 학술지 선정 (Journal Selection)

> gil-research | 학술지 매트릭스 분석·전략적 선정

> **한국 표준 + UZ 듀얼 컨텍스트** — 국제 IF/Scopus/KCI 중심이 기본이며, UZ·CIS 권역(УзВАК 등재지·러시아 ВАК·CIS 학술지)·트릴링구얼 발표 전략은 [`references/uz-cis-journals.md`](references/uz-cis-journals.md) 참조. (UZ 트리거: "УзВАК 등재지 추천", "러시아·CIS 학술지 선정")

## 역할

논문 주제·방법론·결과 강도 → 적합 학술지 1~3개 후보 추천. 게재 가능성·임팩트·시간·비용 종합 분석.

## 트리거 키워드

학술지, 저널, journal, 투고, IF, impact factor, Scopus, SCIE, SSCI, AHCI, KCI,
저널 추천, 저널 선정, target journal, 게재, peer review

## 워크플로우

### Step 1: 논문 정보 수집

```
"논문 정보를 알려주세요:"
- 분야 (specific subfield)
- 연구 방법 (RCT, observational, qualitative, theoretical 등)
- 결과 강도 (혁신적·확인적·null·비유의)
- 타겟 청중 (학계·실무·정책)
- 시간 (긴급·여유)
- 예산 (OA fee 가능 범위)
- 저자 소속 (한국 대학·UZ·국제)
- 언어 (영어·한국어·러시아어 학술지)
```

### Step 2: 매트릭스 분석

학술지 매트릭스 (분야별 상위 10~30개):

| 학술지 | IF | Scopus 순위 | KCI 등재 | 심사 평균 | 접수율 | OA fee | 투고 권장 |
|--------|----|-----------|---------|----------|--------|--------|----------|
| Nature | 49.0 | Q1 #1 | - | 2~6개월 | 8% | $11,690 | 혁신적·범용 |
| Science | 44.7 | Q1 | - | 2~5개월 | 7% | $10,000 | 혁신적·범용 |
| Cell | 45.5 | Q1 #1 (생명) | - | 2~4개월 | 12% | $10,800 | 생명과학 |
| Lancet | 98.4 | Q1 #1 (의학) | - | 2~6개월 | 5% | $5,000 | 임상의학 |
| NEJM | 158.5 | Q1 #1 | - | 2~6개월 | 5% | $5,000 | 임상의학 |
| JAMA | 120.7 | Q1 | - | 2~4개월 | 8% | $5,000 | 임상의학 |
| BMJ | 105.7 | Q1 | - | 2~4개월 | 7% | $4,500 | 임상·정책 |
| PNAS | 11.1 | Q1 | - | 2~3개월 | 19% | $3,650 | 자연과학 |
| PLOS ONE | 3.7 | Q2 | - | 4~6개월 | 50% | $1,931 | 모든 분야 |

### 한국 학술지

| 학술지 | KCI | 분야 | 심사 | 접수율 | 게재료 |
|--------|-----|------|------|--------|--------|
| 한국심리학회지 | KCI Top | 심리 | 2~4개월 | 30% | 30만 원 |
| 한국교육심리학회 | KCI | 교육·심리 | 2~3개월 | 40% | 25만 원 |
| 대한의학회지 | KCI Top | 의학 | 2~4개월 | 35% | 50만 원 |
| 한국전자공학회 | KCI Top | 공학 | 2~3개월 | 40% | 30만 원 |
| Asian Journal of Communication | Scopus | 커뮤니케이션 | 3~6개월 | 25% | 무료 |

### CIS·UZ 학술지 (NEW)

| 학술지 | 분야 | 언어 | 심사 |
|--------|------|------|------|
| Журнал РАН (RAS Journal) | 자연과학 | 러시아어 | 2~4개월 |
| Доклады РАН | 자연과학 | 러시아어 + 영어 | 1~2개월 |
| Uzbek Journal of Physics | 물리 | 영어 + 우즈벡어 | 3~6개월 |
| Tashkent State University Bulletin | 종합 | 러시아어 + 우즈벡어 | 3~6개월 |

상세 분야별: `references/field-top-journals.md`.

### Step 3: 적합도 평가

각 학술지별 평가 항목:

```
1. Aim & Scope 매칭 (필수)
   - 학술지의 주제 범위에 정확히 부합?

2. Article Type 일치
   - Original Research / Review / Brief / Letter / Case Report

3. 결과 강도 vs 학술지 기준
   - Nature·Science·Cell: 분야 패러다임 변화급
   - Lancet·NEJM·JAMA: 임상 영향 큰 RCT·체계적 고찰
   - PLOS ONE: 방법론 정확하면 결과 강도 무관 (mega-journal)
   - 특수 학술지: 분야 깊이 중심

4. 통계 검정력
   - Top 학술지: pre-registration·OSF·재현성

5. 청중
   - 학계 vs 실무·정책

6. 시간
   - Top 학술지: 심사·재투고 6개월~1년+
   - Mega-journal·OA: 빠름 (1~3개월)

7. 비용
   - OA fee $0 ~ $11,690
   - APC waiver (일부 학술지·국가)
```

### Step 4: 1~3개 후보 추천

```
1순위 (Stretch): IF 높음, 게재 가능성 30%
2순위 (Realistic): IF 중간, 게재 가능성 50~70%
3순위 (Safe): IF 낮음, 게재 가능성 80%+
```

### Step 5: 투고 전 체크리스트

```
[ ] Aim & Scope 재확인
[ ] Author Guidelines 다운로드·정독
[ ] Article Type 확인
[ ] Word Limit·Figure 수
[ ] 인용 형식 (APA·Vancouver·IEEE 등)
[ ] 사전 등록 (해당 시)
[ ] IRB·이해 충돌 명시
[ ] Cover Letter 작성
[ ] Reviewer 추천·회피 (해당 시)
[ ] OA·구독 옵션 결정
[ ] APC 예산 확인
```

상세는 `references/submission-checklist.md`.

### Step 6: 후속 작업 제안

- "선정 학술지 형식 적응" → `journal-style-adapter`
- "Devil's review" → `devil-review`
- "재투고 전략" (rejection 후) → 본 스킬 재호출

## 학술지 평가 도구

| 도구 | 용도 | URL |
|------|------|-----|
| **JCR (Journal Citation Reports)** | IF·인용 | jcr.clarivate.com (구독) |
| **Scopus** | 인용·SJR | scopus.com (구독) |
| **SCImago** | 분야별 순위 (무료) | scimagojr.com |
| **DOAJ** | OA 학술지 | doaj.org |
| **KCI** | 한국 학술지 | kci.go.kr |
| **Cabells** | 학술지 평가·predatory | cabells.com (구독) |
| **Beall's List** | predatory 학술지 | beallslist.net |
| **Think.Check.Submit** | 자기 평가 | thinkchecksubmit.org |
| **Journal/Author Name Estimator (JANE)** | 자동 추천 | jane.biosemantics.org |

## Predatory 학술지 회피

⚠️ Predatory journal 신호:
- 이메일 스팸 초대
- 명확하지 않은 출판사
- 빠른 심사 보장 (1~2주)
- 낮은 APC ($100~500)
- IF 미공개 또는 가짜
- 불분명한 편집위원
- 표지·웹사이트 디자인 조잡

검증: Beall's List, Cabells, Think.Check.Submit.

## 분야별 Top 5 (예시)

### 의학·임상
1. NEJM (IF 158.5)
2. Lancet (IF 98.4)
3. JAMA (IF 120.7)
4. BMJ (IF 105.7)
5. Nature Medicine (IF 82.9)

### 생명과학
1. Cell (IF 45.5)
2. Nature (IF 49.0)
3. Science (IF 44.7)
4. Nature Biotechnology (IF 33.1)
5. PNAS (IF 11.1)

### 공학·CS
1. Nature Electronics
2. IEEE Transactions on Pattern Analysis and Machine Intelligence
3. Communications of the ACM
4. Nature Communications
5. ACM Computing Surveys

### 사회과학
1. American Sociological Review
2. American Journal of Sociology
3. Journal of Personality and Social Psychology
4. Journal of Marketing
5. Academy of Management Journal

### 인문학
1. Journal of the American Academy of Religion
2. PMLA (Modern Language Association)
3. American Historical Review
4. Critical Inquiry
5. New Literary History

상세 분야별 Top 30: `references/field-top-journals.md`.

## OA (Open Access) 옵션

- **Gold OA**: 즉시 무료 공개, APC 지불
- **Green OA**: 셀프 아카이빙 (PubMed Central, repository), 엠바고
- **Diamond OA**: 무료 + APC 없음 (대학·기관 후원)
- **Hybrid**: 구독 학술지 + OA 옵션 (가장 비쌈)

OA 의무화:
- NIH Public Access Policy
- Plan S (EU)
- 한국 NRF 일부
- UNESCO 권고

## APC Waiver

- 학술지별 APC 면제 (개도국·조건부)
- Research4Life 회원국 (UZ 포함)
- Plan S compliant
- 일부 학술지 자동 적용

## 한국·UZ 저자 특별 고려

### 한국
- KCI 등재 (국내 활용 + 승진)
- SCIE·SSCI (글로벌 + 연구비 평가)
- KCI + 국제 동시 투고는 X (이중 출판)

### UZ
- VAK (Higher Attestation Commission) 등재
- 러시아어 학술지 (UZ·CIS 활용)
- 국제 학술지 (Scopus·WoS) — 학위·승진 필수
- 한·우즈벡 저자 시 양국 저자 표기

## 예상 성공률 시뮬레이션

```
논문 강도: ★★★☆☆ (실증적 우수, 혁신성 중간)
방법: RCT (n=300)
저자 소속: 한국 중견 대학

→ 추천:
1순위: Lancet (IF 98.4) — 게재 가능성 5~10%
2순위: PLOS Medicine (IF 15.8) — 30~40%
3순위: BMC Medicine (IF 9.3) — 50~60%
4순위 (Safe): KCI Top 의학 — 70~80%
```

## 이 스킬을 사용하지 말아야 할 때

- **선정된 학술지 형식 적응** → `journal-style-adapter`
- **논문 작성 자체** → `paper-writer`
- **Reviewer 시뮬레이션** → `devil-review`
- **연구비** → `grant-writer`
