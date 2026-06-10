# UZ Yandex SEO 가이드

> gil-marketing v0.1.0 | UZ 검색엔진 최적화 (Yandex 우위)

## 개요

UZ 시장에서 검색엔진 점유율은 **Yandex와 Google이 경쟁**합니다. 러시아어 사용자가 다수이고 Yandex 생태계 (Mail.ru·Yandex Maps·Yandex.Market) 통합이 강해 Yandex SEO가 한국에서의 네이버만큼 중요합니다. 한국 회사가 UZ 진출 시 Google SEO만으로는 도달 절반 이상 누락 위험이 있습니다.

---

## 1. UZ 검색엔진 점유율 (2026 추정)

| 검색엔진 | 점유율 | 강점 |
|---------|--------|------|
| Yandex | ~50% | 러시아어·CIS·UZ 로컬 |
| Google | ~40% | 영어·IT·청년층 |
| Mail.ru | ~5% | 종합 포털 |
| Bing | ~3% | 윈도우 디폴트 |
| Yahoo·Baidu·기타 | ~2% | — |

> 도시·청년·IT는 Google ↑, 지방·러시아어 사용자·비즈니스는 Yandex ↑.

---

## 2. Yandex 알고리즘 (한국 네이버 등가)

### 주요 알고리즘

| 알고리즘 | 등장 | 역할 |
|---------|------|------|
| Vega | 2019 | 의미 검색 (의도 파악) |
| YATI | 2020 | BERT 유사 NLP |
| Y1 (Y1 Update) | 2021 | 행동 요인 강화 |
| Y2 / 신경망 | 2024+ | AI 답변·zero-click |

### 핵심 평가 요소

1. **Behavior Factor (BF)** — 가장 중요
   - 체류 시간
   - 재방문율
   - 클릭률 (CTR)
   - 페이지 이탈률
2. **Content Quality** — 신뢰·전문성·완성도
3. **Technical SEO** — 속도·모바일·HTTPS
4. **Backlinks** — 권위 있는 도메인의 링크
5. **Yandex Metrica 데이터** — 직접 활용

---

## 3. Yandex Webmaster + Yandex Metrica (필수 등록)

### Yandex Webmaster

URL: webmaster.yandex.com

기능:
- 사이트 등록 + 사이트맵 제출
- 색인 상태 확인
- 에러·경고 모니터링
- 검색 키워드·CTR 데이터
- 백링크 확인

### Yandex Metrica

URL: metrica.yandex.com

기능 (Google Analytics 등가):
- 트래픽 분석
- 행동 흐름·히트맵
- 전환 추적
- 사용자 세션 녹화 (특이 기능)

> Yandex Metrica 데이터는 Yandex 검색 알고리즘에 직접 영향. 등록 강력 권장.

---

## 4. 키워드 전략

### 도구

- **Yandex Wordstat** (wordstat.yandex.com) — 검색량
- **Yandex Webmaster** — 실제 검색어
- **Google Keyword Planner** — 우즈벡어 보조
- **Serpstat·Ahrefs** — 경쟁 분석 (러시아어 지원)

### 언어별 전략

**러시아어 키워드:**
- UZ 도시·비즈니스·교육층 표준
- 검색량 풍부
- Yandex Wordstat 정확
- 키워드 변형 다양 (남성/여성/시제)

**우즈벡어 키워드 (라틴):**
- 정부·일반 시민
- Wordstat 일부 데이터
- 검색량 변동성 ↑
- 경쟁 적음 → 진입 기회

**우즈벡어 키워드 (키릴):**
- 농촌·고령층
- 점차 사용 ↓
- 보조용

**영어 키워드:**
- IT·국제 비즈니스 한정
- 영어로 검색 시 Google 우위

### 키워드 배치

```
[제목] - 핵심 키워드 앞쪽
[Meta description] - 키워드 1회
[H1] - 핵심 키워드
[H2/H3] - 연관 키워드
[본문 첫 100자] - 핵심 키워드
[ALT 텍스트] - 자연스럽게
```

밀도: 1~2% (네이버·Google과 동일).

---

## 5. 콘텐츠 전략

### 분량

- 정보성: 1,500~3,000 글자
- 가이드: 2,000~5,000 글자
- 짧은 콘텐츠는 Yandex 평가 ↓

### 구조

```
[제목] - 키워드 + 혜택 (60자 이내)

[리드 단락]
- 첫 100자에 핵심 결론
- 독자 질문 즉시 해결

[H2 섹션 1] - 단계 1
[H2 섹션 2] - 단계 2
...

[FAQ 섹션] - GEO 효과 + Yandex 답변형 노출
[참고 문헌] - 신뢰도
```

### Yandex 우대 콘텐츠

- **고품질 사진** (3~7장, 사이트 자체)
- **표·리스트** (스캔 용이)
- **영상 임베드** (체류 시간 ↑)
- **전문가 저자 정보** (E-E-A-T)
- **출판일·갱신일 명시**

### 회피

- 얇은 콘텐츠 (500자 미만)
- AI 생성 직역 (탐지 강화 중)
- 키워드 스터핑
- 표절·자체 복제

---

## 6. 기술 SEO

### Yandex 추가 점검

```
[ ] sitemap.xml — Yandex Webmaster 제출
[ ] robots.txt — Yandex 크롤러 (Yandex/2.0) 허용
[ ] 호스팅 위치: 가능하면 .uz 또는 러시아 (속도)
[ ] CDN: Cloudflare·Yandex Cloud
[ ] HTTPS 인증
[ ] 모바일 친화적 (UZ 모바일 70%+)
[ ] hreflang: ko, ru, uz (다국어 사이트)
[ ] AMP 페이지 (모바일 속도)
[ ] Schema.org 마크업
[ ] Yandex.Turbo Pages (Yandex 전용 빠른 로딩)
```

### Yandex.Turbo Pages

- Yandex 전용 가속 페이지 (Google AMP 등가)
- 검색 결과에 빠른 로딩 표시 (CTR ↑)
- WordPress·Drupal 플러그인 가능
- 모바일 우선

---

## 7. Backlink 전략

### UZ에서 권위 있는 도메인

- **.uz 정부**: my.gov.uz, soliq.uz (정부 인용 받기 어려움)
- **UZ 미디어**: spot.uz, kun.uz, gazeta.uz, daryo.uz, repost.uz
- **러시아 미디어**: rbc.ru, kommersant.ru, vedomosti.ru
- **글로벌**: bbc.com, reuters.com, nytimes.com

### 백링크 확보 전략

- 제휴 콘텐츠 (Spot.uz·Kun.uz 등에 게시 $300~$3,000)
- 인플루언서 채널·블로그
- 게스트 포스팅 (Russian/Uzbek)
- 무역관·KOTRA 사이트
- 비즈니스 디렉토리 등록

---

## 8. Yandex SEO + Google SEO 동시 최적화

### 공통 영역
- 콘텐츠 품질
- HTTPS·모바일 친화
- 사이트맵
- Schema.org

### Yandex 특화
- Yandex Metrica
- Yandex.Turbo
- Behavior Factor 강화
- 러시아어 콘텐츠 우선

### Google 특화
- Core Web Vitals
- E-E-A-T
- AI Overview·GEO
- 영어·국제 SEO

> 한 사이트가 양쪽 모두 우위 가능. 단, 우선순위 결정 필요.

---

## 9. 다국어 사이트 구조

### URL 구조 옵션

| 구조 | 예시 | 장단점 |
|------|------|--------|
| 서브폴더 | example.com/ru/ | 도메인 권위 통합, 추천 |
| 서브도메인 | ru.example.com | 분리 운영 |
| 별도 도메인 | example.ru | 완전 분리, 권위 분산 |

### hreflang 태그

```html
<link rel="alternate" hreflang="ko" href="https://example.com/ko/" />
<link rel="alternate" hreflang="ru" href="https://example.com/ru/" />
<link rel="alternate" hreflang="uz" href="https://example.com/uz/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Yandex는 hreflang 인식. Google과 동일 사용.

---

## 10. UZ Yandex SEO 진입 6개월 로드맵

### 1~2개월: 기반 구축
- Yandex Webmaster + Metrica 등록
- 사이트맵 제출
- 러시아어 핵심 페이지 10~20개 작성
- 우즈벡어 보조 페이지 5개

### 3~4개월: 콘텐츠 확장
- 키워드 50개 전략 구축
- 주 2~3 콘텐츠 발행
- Spot.uz·Kun.uz 제휴 1~2건
- 인플루언서 백링크

### 5~6개월: 최적화·확장
- Behavior Factor 분석·개선
- Yandex.Turbo 적용
- A/B 테스트 (제목·메타)
- Top 10 진입 모니터링

---

## 11. 흔한 실수

1. **Yandex 무시**: Google만 → UZ 도달 절반 누락
2. **러시아어 직역**: 한국어 → AI 직역만 → 어색·탐지
3. **Yandex Metrica 미등록**: 알고리즘 데이터 활용 X
4. **Behavior Factor 무시**: 체류·재방문 개선 X
5. **모바일 무시**: UZ 70%+ 모바일
6. **백링크 없음**: 도메인 권위 X → 상위 노출 어려움

---

## 12. 자원·도구

| 도구 | 용도 | URL |
|------|------|-----|
| Yandex Webmaster | 사이트 등록·진단 | https://webmaster.yandex.com |
| Yandex Metrica | 분석 | https://metrica.yandex.com |
| Yandex Wordstat | 키워드 | https://wordstat.yandex.com |
| Yandex.Turbo | 가속 페이지 | https://yandex.com/dev/turbo/ |
| Serpstat | 경쟁 분석 | https://serpstat.com |

---

## 13. 한국 회사 UZ Yandex SEO 운영 모델

### 모델 A: 한국 본사 직접
- 한국 SEO팀이 Yandex 도구 학습
- KOTRA Tashkent 컨설팅
- 러시아어 번역 외주

### 모델 B: 현지 에이전시
- UZ Tashkent SEO 에이전시 위탁
- 한국 본사가 전략·예산
- 매월 보고

### 모델 C: 하이브리드
- 콘텐츠는 한국 본사 (한국어 마스터 → 러시아어 번역)
- 기술 SEO·Yandex 등록은 현지 에이전시
- 가장 효율적

---

> **주의**: Yandex 알고리즘은 비공개·자주 변경. Yandex Metrica·Webmaster 정기 모니터링 + KOTRA Tashkent 컨설팅 권장. 본 가이드는 2026년 1월 기준이며 정기 업데이트 필요.
