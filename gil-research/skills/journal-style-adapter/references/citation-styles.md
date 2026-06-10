# 인용 스타일 종합 가이드

> gil-research | journal-style-adapter 참조

## 6개 주요 스타일

### APA 7th (American Psychological Association)

본문 인용:
```
(Smith, 2024)
(Smith & Lee, 2024)
(Smith et al., 2024) — 3+ 저자
Smith (2024) found that...
```

References:
```
저널 논문:
Smith, J., & Lee, K. (2024). Title of article in sentence case.
*Journal Name*, *15*(3), 100-120. https://doi.org/10.1234/abc

책:
Smith, J. (2024). *Title of book*. Publisher.

책 챕터:
Smith, J. (2024). Title of chapter. In K. Lee (Ed.),
*Title of book* (pp. 100-120). Publisher.

웹:
Smith, J. (2024, March 15). Title of webpage. Site Name.
https://...
```

### Vancouver (의학·생명과학)

본문 인용:
```
[1] 또는 ¹ 또는 (1)
숫자만, 등장 순서
```

References:
```
저널 논문:
1. Smith J, Lee K. Title of article. Journal Name. 2024;15(3):100-120.

저자 7명+ → 6명 + et al.:
1. Smith J, Lee K, Kim S, Park J, Choi M, Han J, et al. Title.
   Journal. 2024;15(3):100-120.

책:
1. Smith J. Title of book. 2nd ed. New York: Publisher; 2024. 350 p.

웹:
1. Smith J. Title [Internet]. Site Name; 2024 [cited 2024 Mar 15].
   Available from: https://...
```

### IEEE (공학·CS)

본문 인용:
```
[1]
[1], [2]
[1]-[3]
```

References:
```
저널:
[1] J. Smith and K. Lee, "Title of article," *Journal Name*,
    vol. 15, no. 3, pp. 100-120, 2024.

학술회의:
[2] J. Smith, "Title of paper," in *Proc. Conf. Name*, 2024,
    pp. 50-60.

책:
[3] J. Smith, *Title of Book*, 2nd ed. New York, NY, USA: Publisher,
    2024.

웹:
[4] J. Smith. "Title." Site Name. https://... (accessed Mar. 15, 2024).
```

### Chicago (인문·역사)

#### Author-Date

본문:
```
(Smith 2024)
(Smith 2024, 105)
```

References:
```
Smith, John. 2024. Title of Book. Chicago: University of Chicago Press.

Smith, John, and Kim Lee. 2024. "Title of Article." Journal Name 15 (3): 100-120.
```

#### Notes-Bibliography

각주:
```
1. John Smith, *Title of Book* (Chicago: University of Chicago Press, 2024), 105.

2. John Smith and Kim Lee, "Title of Article," *Journal Name* 15, no. 3 (2024): 105.
```

Bibliography:
```
Smith, John. *Title of Book*. Chicago: University of Chicago Press, 2024.
```

### Harvard

본문:
```
(Smith, 2024)
(Smith and Lee, 2024)
(Smith et al., 2024)
Smith (2024) argues...
```

References:
```
저널:
Smith, J. and Lee, K. (2024) 'Title of article', Journal Name, 15(3),
pp. 100-120.

책:
Smith, J. (2024) Title of book. Publisher.
```

### KCI (한국 학술지)

본문:
```
(스미스, 2024)
(스미스와 이, 2024)
(스미스 등, 2024) — 3+ 저자
스미스 (2024)는 ~를 발견했다.

영어 저자: (Smith, 2024) 또는 (Smith et al., 2024)
```

References:
```
국문 저널:
스미스, 이 (2024). 논문 제목. *학술지명*, 15(3), 100-120.

영문 저널 (한국 학술지):
Smith, J., & Lee, K. (2024). Title of article in sentence case.
*Journal Name*, *15*(3), 100-120.

책:
스미스 (2024). *책 제목*. 출판사.
```

### ГОСТ Р 7.0.5-2008 (러시아·CIS)

본문:
```
[1] 또는 [1, с. 105]
```

References:
```
저널:
1. Смит Дж., Ли К. Название статьи // Журнал. — 2024. — Т. 15, № 3. —
   С. 100-120.

책:
2. Смит Дж. Название книги. — 2-е изд. — Москва: Издательство, 2024. — 350 с.

영문 저널 (러시아어 인용):
3. Smith J., Lee K. Title of article // Journal Name. — 2024. — Vol. 15,
   No. 3. — P. 100-120.
```

## 학술지별 권장

| 분야 | 학술지 예시 | 인용 |
|------|------------|------|
| 의학 | Lancet, NEJM, JAMA | Vancouver |
| 의학 (영국) | BMJ | Vancouver (변형) |
| 사회·교육 | APA Journals | APA 7 |
| 공학·CS | IEEE | IEEE |
| 인문·역사 | Chicago Journals | Chicago |
| 화학 | ACS | ACS Style (Vancouver 유사) |
| 자연 | Nature·Science | Author-Year (변형) |
| 한국 KCI | 대부분 | KCI |
| 러시아 RSCI | 대부분 | ГОСТ |

## DOI·URL 형식

### APA 7
```
https://doi.org/10.1234/abc
```
("DOI:" 표시 X)

### Vancouver
```
doi: 10.1234/abc
또는
https://doi.org/10.1234/abc
```

### IEEE
```
doi: 10.1234/abc
또는 생략
```

## 자동 변환 도구

### EndNote
- $250+
- 모든 스타일 + 학술지 템플릿

### Zotero
- 무료
- CSL 기반 모든 스타일

### Mendeley
- 무료
- Elsevier 기반

### CSL (Citation Style Language)
- XML 기반 표준
- 1만+ 스타일 지원

### Word·Pages 내장
- 기본 스타일만

## 변환 워크플로우

```
1. 마스터 References → BibTeX·RIS·CSL
2. EndNote / Zotero / Mendeley 라이브러리
3. 학술지별 스타일 적용 (자동)
4. 본문 인용·References 모두 일괄 변환
5. 검증 (DOI·페이지·연도)
```

## 흔한 실수

1. 본문 인용·References 형식 불일치
2. DOI 누락
3. 페이지 범위 형식 (- vs en-dash)
4. 저자 7+ 시 et al. 적용 X (Vancouver는 6명+1)
5. 이탤릭 (저널·책 제목)
6. 영문 저자 표기 (성-이름)
7. 한국 저자 영문화 시 일관성

## Predatory 학술지 인용 회피

- Beall's List 점검
- DOAJ 등재 확인
- Reviewer 신뢰도 ↓
