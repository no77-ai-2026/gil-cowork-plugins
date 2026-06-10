# Revise & Resubmit 응답 템플릿

> gil-research | devil-review 참조

## 표준 응답 양식

각 Reviewer 코멘트별:

```
Reviewer #X, Comment Y:
[원문 코멘트 정확히 인용]

Author Response:
We thank the reviewer for [감사 표현 — insightful comment, careful reading, 등].

[수용·반박·부분 수용 — 명확하게]

[수용 시] We have addressed this concern by [구체적 변경].
The revised manuscript now reads (page X, line Y-Z):

"[새 텍스트 - 직접 인용]"

[변경 추적]
- Page X, lines Y-Z: Added/Modified ...
- Figure N: Updated ...
- Reference list: Added [authors, year]
```

## 카테고리별 응답 템플릿

### 1. "Lack of novelty" (혁신성 부족)

```
Reviewer Comment:
"The novelty of this work is unclear given previous studies by Smith et al. (2023)."

Author Response:
We thank the reviewer for raising this important point. We acknowledge
that Smith et al. (2023) addressed a related question. However, our work
differs in three key ways:

(1) [구체적 차별점 1 - 방법론·표본·맥락]
(2) [구체적 차별점 2 - 새 데이터·접근]
(3) [구체적 차별점 3 - 새 발견·함의]

To clarify, we have revised the Introduction (page 3, lines 80-95):

"[새 텍스트 명시적으로 본 연구의 차별점 강조]"

We have also added the comparison table (Table 1) summarizing differences
between our work and prior studies.
```

### 2. "Sample size too small" (표본 부족)

```
Reviewer Comment:
"The sample size of 50 is too small to draw meaningful conclusions."

Author Response:
We appreciate the reviewer's concern about sample size. We provide the
following clarifications:

(1) Sample size justification:
A priori power analysis (G*Power 3.1) indicated that 48 participants
were sufficient to detect a medium effect size (Cohen's d = 0.5) with
80% power and α = 0.05. We recruited 50 to allow for attrition.

(2) Effect size and confidence intervals:
We report effect sizes with 95% CIs throughout (Tables 2-3), which provide
estimation rather than relying solely on p-values.

(3) Acknowledged limitation:
We have added a more thorough discussion of the limitations on
page 18 (lines 450-465):

"[새 limitation 텍스트 - 표본 부족 솔직 인정 + 향후 연구 방향]"

(4) [선택] We have also conducted a sensitivity analysis using bootstrap
resampling (10,000 iterations), which confirmed the robustness of our
findings (new Supplementary Figure S2).
```

### 3. "Methods not rigorous" (방법론 한계)

```
Reviewer Comment:
"The methodology lacks rigor, particularly in [구체 영역]."

Author Response:
We thank the reviewer for this constructive feedback. We have strengthened
the methods section as follows:

(1) Detailed methodology:
We now provide a more detailed description of [영역] in the Methods
section (page 7, lines 200-225), following the [CONSORT/STROBE/PRISMA]
guideline.

(2) Additional analyses:
We have conducted [구체 추가 분석] to address this concern (new Table 3,
new Figure 4).

(3) Sensitivity analyses:
We performed sensitivity analyses by [구체적 방법] which confirmed
the robustness of our main findings (Supplementary Tables S2-S3).

(4) Code and data sharing:
All analysis code and de-identified data are now publicly available at
[GitHub URL] / [Zenodo DOI].
```

### 4. "Statistical concerns" (통계 비판)

```
Reviewer Comment:
"The statistical approach is questionable; multiple comparisons not corrected."

Author Response:
We thank the reviewer for raising this important methodological concern.
We have addressed this comprehensively:

(1) Multiple comparison correction:
We have re-analyzed the data using the Benjamini-Hochberg procedure to
control the false discovery rate (FDR) at 5%. The results remain
statistically significant after FDR correction (revised Table 2).

(2) Effect sizes and CIs:
All comparisons now report Cohen's d (or appropriate effect size) with
95% confidence intervals (revised Tables 2-3).

(3) Statistical consultation:
This revision benefited from consultation with Dr. [name], a senior
biostatistician at [institution] (now acknowledged in Acknowledgments).

(4) Pre-registration:
Although the study was not pre-registered, we have uploaded our analysis
plan and all code to OSF (https://osf.io/xxxx) for transparency.
```

### 5. "Generalizability concerns" (일반화 어려움)

```
Reviewer Comment:
"The findings may not generalize beyond the studied population."

Author Response:
We agree with the reviewer that generalizability is an important consideration.
We have addressed this in two ways:

(1) Detailed sample characterization:
We now provide more detailed demographic information (Table 1) and
discuss how our sample compares to the broader population (page 8,
lines 230-245).

(2) Acknowledged limitation and future work:
We have expanded the limitations section (page 18, lines 480-500):

"[새 limitations 텍스트 - 일반화 한계 솔직 + 향후 다양한 표본 연구 제안]"

(3) [선택] External validation:
We have begun a multi-center validation study with collaborators in
[지역·기관] to test generalizability, which we plan to report in future work.
```

### 6. "Writing/clarity issues" (작성·명료성)

```
Reviewer Comment:
"The writing requires significant improvement; many sentences are unclear."

Author Response:
We apologize for the writing quality. We have addressed this by:

(1) Professional editing:
The manuscript was professionally edited by [Editage/Enago/AJE],
a scientific editing service. The certificate of editing is attached.

(2) Restructured sections:
We have rewritten the [Introduction/Methods/Discussion] for clarity
(see tracked changes throughout).

(3) Defined terms:
All abbreviations are now defined at first use, and a glossary has been
added (Supplementary Table S1).

(4) Improved transitions:
Topic sentences and transitions have been added between paragraphs to
improve flow.
```

### 7. "Citation gaps" (인용 누락)

```
Reviewer Comment:
"The literature review is incomplete; key works by [Author] are missing."

Author Response:
We thank the reviewer for highlighting these important references. We have
now incorporated them throughout:

(1) Added citations:
- [Author, Year] is now cited in Introduction (page 3, line 90) for
  [reason]
- [Author, Year] is cited in Discussion (page 16, line 410) for [reason]
- [Author, Year] is added to References

(2) Updated literature review:
The Introduction (pages 2-4) has been revised to provide a more
comprehensive overview of the relevant literature.

(3) Total new references added: [N]
```

### 8. "Ethical concerns" (윤리)

```
Reviewer Comment:
"Ethical considerations are insufficiently addressed."

Author Response:
We thank the reviewer for raising these important concerns. We have
addressed them:

(1) IRB approval:
The study was approved by the [Institutional Name] IRB
(approval number XXX-YYY-ZZZ). We have added this information to
Methods (page 6, line 180).

(2) Informed consent:
Written informed consent was obtained from all participants. The
consent process is now described in detail (page 6, lines 185-195).

(3) Data protection:
All data were de-identified before analysis. Data are stored on
[secure server] with access limited to study personnel.

(4) COI disclosure:
We have updated the Conflict of Interest statement (page 19) to
include [명시할 잠재적 COI].
```

### 9. "Reviewer 2 특수: Self-citation 요구"

```
Reviewer Comment:
"The authors should cite my recent work on this topic, e.g., Smith et al. (2023)."

Author Response:
We thank the reviewer for highlighting this related work. We have
reviewed Smith et al. (2023) and:

[Case A - 적합] We agree this is highly relevant and have now cited it
in the Introduction (page 3, line 95) and Discussion (page 16, line 425).

[Case B - 부적합 - 정중 거절]
We carefully reviewed Smith et al. (2023). While we recognize its
contribution to [related area], we believe its scope ([구체적 차이])
differs from our focus ([본 연구 초점]). We have, however, cited it
briefly in the Discussion (page 16, line 430) when noting related work.

If the reviewer feels strongly about more extensive citation, we are
happy to expand this discussion further.
```

### 10. 종합 R&R Cover Letter

```
Dear Dr. [Editor Name],

We are pleased to submit a revised version of our manuscript
"[Title]" (Manuscript ID: XXX-YYY-ZZZ) for your consideration in
[Journal Name].

We thank the reviewers for their thoughtful and constructive comments,
which have substantially improved our manuscript. We have carefully
addressed each comment, with detailed responses in the accompanying
Response to Reviewers document.

Major revisions include:
1. [핵심 변경 1 - 구체적]
2. [핵심 변경 2]
3. [핵심 변경 3]

In addition, we have:
- Added [N] new references
- Included [new analyses/figures]
- Improved [section] for clarity
- Updated [Conflict of Interest / Data sharing] statements

All revisions are highlighted in the manuscript using tracked changes.
A clean version is also provided.

We believe these revisions have significantly strengthened the
manuscript and hope it now meets the standards for publication in
[Journal Name].

We thank you and the reviewers for your time and attention.

Sincerely,

[Corresponding Author Name]
[Title, Institution]
[Email]
```

## 전략 가이드

### 항상
- 정중·전문적 어조
- 모든 코멘트에 응답 (무시 X)
- 구체적 page·line·table·figure 참조
- 수용·반박 명확

### Reviewer가 틀렸다고 판단 시
- 정중 거절 OK
- 근거 (인용·이론·데이터)
- 편집자 판단에 맡기기

### 마감
- 보통 30~60일 (Minor)
- 60~120일 (Major)
- 연장 요청 가능 (1회 + 정중)

### 리뷰어가 만족할 때까지
- 1차 R&R → 2차 R&R 일반
- 3차+ → 학술지 변경 고려
