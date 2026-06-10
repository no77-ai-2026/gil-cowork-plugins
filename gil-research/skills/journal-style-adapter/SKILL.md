---
name: journal-style-adapter
description: >
  [한·UZ 듀얼] 선정된 학술지의 형식·문체·구조·인용 형식에 자동 적응합니다.
  'Nature 형식으로 변환', 'Lancet 스타일', 'APA 7 인용', 'IEEE 변환', 'Vancouver 인용',
  'KCI 형식'이라고 요청하세요. 학술지 가이드라인 분석 → 본문 구조·섹션 길이·문체·도표 형식·
  인용 형식 자동 변환.
user-invocable: true
version: 1.0.1
---

# 학술지 형식 적응 (Journal Style Adapter)

> gil-research | 학술지별 자동 형식 변환

> **한국 표준 + UZ 듀얼 컨텍스트** — APA·IEEE·Vancouver 등 국제 양식이 기본이며, UZ·CIS 권역 표준 인용(ГОСТ 7.0.5)·러시아어 논문 형식은 [`references/uz-gost-citation.md`](references/uz-gost-citation.md) 참조. (UZ 트리거: "ГОСТ 인용 변환", "러시아어 논문 형식")

## 역할

타겟 학술지의 Author Guidelines 분석 → 논문 초안을 해당 학술지 형식으로 자동 변환. 본문 구조·섹션·문체·도표·인용·길이 모두 적응.

## 트리거 키워드

학술지 형식, 저널 스타일, journal style, format conversion, APA, MLA, Chicago, Vancouver, IEEE, Harvard, KCI, ГОСТ,
Nature 형식, Lancet 형식, Cell 형식, IEEE 변환, 인용 형식 변환

## 워크플로우

### Step 1: 타겟 학술지 정보 수집

```
"타겟 학술지는?"

학술지명·URL·Author Guidelines 링크 입력
또는 journal-selection 결과 자동 활용
```

### Step 2: 학술지 가이드라인 분석

자동 추출:
- Article Type (Original·Review·Brief·Letter·Case)
- Word Limit (전체·초록·본문)
- Figure·Table 수 제한
- Section 구조 (IMRaD·Structured Abstract·기타)
- Citation Style
- Reference 수 제한
- Cover Letter 요구사항
- 보고 가이드라인 (CONSORT·STROBE·PRISMA 등)
- 사전 등록 요구
- Data Sharing 정책

상세 가이드: `references/journal-format-templates.md`.

### Step 3: 변환 적용

#### 1. 본문 구조 변환

| 학술지 | 구조 |
|--------|------|
| Nature | Summary (200) - Main Text (1500-3000) - Methods (3000) - Refs (50) |
| Cell | Summary (150) - Intro - Results - Discussion - STAR Methods |
| Lancet | Structured Summary (300) - IMRaD - Refs |
| NEJM | Structured Abstract (250) - IMRaD - Refs (60) |
| JAMA | Structured Abstract (350) - IMRaD - Tables/Figures (5) - Refs |
| Science | Abstract (125) - Main (2500) - Refs (40) - SM |
| BMJ | Structured Abstract (300) - IMRaD - Patient Public Involvement - Refs |
| PLOS ONE | Abstract (300) - IMRaD - Refs - Supporting Info |
| KCI 일반 | 국문 초록 (300자) + 영문 Abstract (200) - 서론·방법·결과·논의·결론 - 참고문헌 |

#### 2. Structured Abstract 변환

##### Lancet·NEJM·JAMA 표준
```
Background:
Methods:
Findings/Results:
Interpretation/Conclusions:
Funding:
```

##### Cochrane (Systematic Review)
```
Background:
Objectives:
Search Methods:
Selection Criteria:
Data Collection and Analysis:
Main Results:
Authors' Conclusions:
```

##### BMJ
```
Objective:
Design:
Setting:
Participants:
Intervention(s):
Main Outcome Measures:
Results:
Conclusions:
Trial Registration:
```

#### 3. 인용 형식 변환

##### APA 7th
```
Author, A. A., & Author, B. B. (Year). Title of article.
Journal Name, Volume(Issue), Pages. https://doi.org/...

본문 인용: (Author, Year) 또는 Author (Year)
```

##### Vancouver (의학)
```
1. Author AA, Author BB. Title of article.
   Journal Name. Year;Volume(Issue):Pages.

본문 인용: [1] 또는 ¹
```

##### IEEE (공학)
```
[1] A. A. Author and B. B. Author, "Title of article,"
    *Journal Name*, vol. X, no. Y, pp. Z-W, Year.

본문 인용: [1]
```

##### Chicago (인문)
- Author-Date: (Author Year, Page)
- Notes-Bibliography: 각주

##### Harvard
```
Author, A.A. and Author, B.B. (Year) Title of article,
Journal Name, Volume(Issue), pp. Pages.

본문 인용: (Author, Year)
```

##### KCI 한국
```
저자 (연도). 제목. *학술지명*, 권(호), 쪽-쪽.

본문 인용: (저자, 연도) 또는 저자 (연도)
```

##### ГОСТ Р 7.0.5-2008 (러시아·CIS)
```
Автор А.А. Название // Журнал. — Год. — Т. Х, № Y. — С. Z-W.
```

상세 변환 표·예시: `references/citation-styles.md`.

#### 4. 문체 변환

##### Top 의학지 (Lancet·NEJM)
- 능동태·간결
- 1인칭 복수 ("We found...")
- 임상 함의 강조
- 주관 표현 회피

##### Nature·Science
- 명료·정밀
- 분야 외 청중 고려 (general audience)
- 기술적 디테일 → Methods·Supplementary
- "Significantly" 등 의미 있는 단어 절제

##### KCI 인문·사회
- 격식 문체
- 학술 표현
- 장문 가능
- 인용 풍부

##### IEEE 공학
- 기술적 명확
- 약자·단위 정확
- 알고리즘·수식 형식

#### 5. 도표·그림 변환

| 학술지 | 도표 수 | 형식 |
|--------|---------|------|
| Nature | 4~6 | Vector PDF, EPS, AI |
| Cell | 7 | High-res TIFF, EPS |
| Lancet | 5 | TIFF, EPS, 300 dpi |
| NEJM | 5 | EPS, TIFF |
| BMJ | 5 | TIFF, EPS, vector |
| Science | 5 | EPS, PDF |
| JAMA | 5 | EPS, TIFF |

캡션 형식, 색상·접근성 (color-blind safe palettes), Figure Legend 위치.

#### 6. 보조 자료 (Supplementary)

- Methods 상세
- 추가 데이터·분석
- 코드·데이터 (GitHub·Zenodo)
- Multimedia (Cell·Nature)

### Step 4: 후속 작업

- "Reviewer 시뮬레이션" → `devil-review`
- "다른 학술지 비교" → `journal-selection` 재호출
- "DOCX·LaTeX 변환" → `gil-office:docx-generator`

## 자동 변환 예시

### 입력: APA 7 형식 논문

```
Original (APA 7):
Smith, J., Lee, K., & Kim, S. (2024). Effects of intervention X on outcome Y.
*Journal of Health*, *15*(3), 100-120. https://doi.org/...

본문: Recent research (Smith et al., 2024) shows...
```

### 변환: Lancet (Vancouver)

```
Vancouver:
1. Smith J, Lee K, Kim S. Effects of intervention X on outcome Y.
   J Health. 2024;15(3):100-120.

본문: Recent research [1] shows...
```

### 변환: Nature

```
Author-Year (Nature):
1. Smith, J., Lee, K. & Kim, S. Effects of intervention X on outcome Y.
   J. Health 15, 100-120 (2024).

본문: Recent research¹ shows...
```

### 변환: KCI

```
KCI:
스미스, 이, 김 (2024). 처치 X가 결과 Y에 미치는 영향.
*보건학회지*, 15(3), 100-120.

본문: 최근 연구 (스미스 등, 2024)에 따르면...
```

## 체크리스트 (학술지별)

```
[ ] Article Type 확인
[ ] Word Count 준수
[ ] Section 구조 일치
[ ] Abstract 형식·길이
[ ] Figure·Table 수·해상도
[ ] 인용 형식 변환 완료
[ ] Reference 수 제한
[ ] 보고 가이드라인 적용 (CONSORT·STROBE·PRISMA)
[ ] Cover Letter (학술지 양식)
[ ] Reviewer 추천 (요구 시)
[ ] 사전 등록 명시 (해당 시)
[ ] Data Sharing Statement
[ ] 이해 충돌 명시
[ ] 저자 기여 (CRediT)
[ ] Funding 명시
```

## Cover Letter 템플릿

```
Dear Editor-in-Chief,

We are pleased to submit the manuscript entitled
"[Title]" for consideration as an [Article Type] in [Journal].

[Brief background — 1~2 sentences]

[Key findings — 2~3 sentences]

[Significance — 1~2 sentences why this fits the journal]

We confirm that:
- This work has not been published or under review elsewhere.
- All authors approved the submission.
- We have no conflicts of interest.
- The study was approved by [IRB/IACUC reference].

We suggest the following potential reviewers:
1. [Name, affiliation, email]
2. [Name]
3. [Name]

We respectfully request that the following individuals not be invited as reviewers:
1. [Name] (reason: competing project)

Sincerely,
[Corresponding Author]
[Affiliation]
[Email]
```

## 자주 하는 실수

1. **인용 형식 혼용**: 같은 논문 내 다른 인용 스타일
2. **Word Limit 초과**: 학술지마다 다름
3. **Reference 수 초과**: Lancet 50, Nature 50
4. **Abstract 비구조화**: Lancet·NEJM은 Structured 필수
5. **Figure 해상도 부족**: 300 dpi+
6. **Cover Letter 없음**: Top 학술지 필수
7. **사전 등록 미명시**: NIH·EU·일부 학술지 의무
8. **CONSORT·STROBE·PRISMA 미적용**: 의학 학술지 거부 사유

## 도구

- **EndNote / Zotero / Mendeley**: 인용 관리 + 자동 형식 변환
- **PaperPile**: Google Docs 통합
- **CSL (Citation Style Language)**: 형식 정의
- **Crossref**: DOI·메타데이터
- **JANE**: 학술지 추천 + 자동 인용

## 이 스킬을 사용하지 말아야 할 때

- **학술지 선정 자체** → `journal-selection`
- **논문 작성 (텍스트)** → `paper-writer`
- **Reviewer 시뮬레이션** → `devil-review`
- **DOCX·PDF 변환** → `gil-office:docx-generator`
