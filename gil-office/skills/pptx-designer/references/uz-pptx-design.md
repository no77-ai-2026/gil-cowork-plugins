# UZ PPT 디자인 가이드

> gil-office v0.1.0 | UZ 발표·IR·비즈니스 슬라이드 디자인

## 개요

UZ 시장 대상 PPT 발표는 한국과 디자인 코드가 다릅니다. 러시아어 키릴 폰트, 우즈벡 라틴, UZ 색상 코드 (청록·금색), 보수적 비주얼, 가족·공동체 메시지 등 점검 필수.

---

## 1. UZ 발표 시장 특성

### 청중 유형

| 청중 | 언어 | 톤 |
|------|------|-----|
| 정부·공공기관 | 우즈벡어 라틴 | 정중·전통 |
| 비즈니스·기업 | 러시아어 | 정중·전문 |
| 외국 투자자 | 영어 + 러시아어 | 글로벌 |
| 일반 청중 | 우즈벡어 + 러시아어 병기 | 친근·교육 |
| 한국 본사 + UZ 자회사 | 한국어 + 러시아어 | 인터컴퍼니 |

---

## 2. 폰트 가이드

### 러시아어 (키릴)

- **권장**: Inter Cyrillic, PT Sans, Roboto Cyrillic
- **전통**: Times New Roman, Arial
- 본문 11~14pt
- 제목 24~36pt

### 우즈벡어 (라틴)

- **권장**: Inter, Roboto, Open Sans, Manrope
- **특수 문자**: `oʻ`, `gʻ`, `ʻ` 정확
- 본문 11~14pt
- 제목 24~36pt

### 트릴링구얼 (한+러+우즈벡)

- 단일 다국어 폰트: **Inter** (한 폰트 패밀리에 한·러·우즈벡 모두)
- 한국어는 **Pretendard** 보조 가능 (Inter와 디자인 톤 일치)

### 폰트 임베드

```javascript
// pptxgenjs 폰트 임베드
pres.layout = "LAYOUT_WIDE";
pres.defineSlideMaster({
    title: "MASTER",
    background: { fill: "FFFFFF" },
    objects: [
        // 제목 영역
        { text: { text: "Заголовок", options: { fontFace: "Inter", fontSize: 32, bold: true } } }
    ]
});
```

---

## 3. 색상 팔레트

### UZ 청록·금색 (전통 + 헤리티지)

```
Primary: #0F7B7B (청록 - 우즈벡 도자기·돔)
Secondary: #D4AF37 (금색 - 부·태양·번영)
Accent: #FFFFFF (흰색 - 순수)
Text: #1A1A1A (거의 검정)
Background: #F5F1E8 (베이지·양피지)
```

### UZ 미니멀 (모던 비즈니스)

```
Primary: #2C3E50 (네이비 그레이)
Secondary: #0F7B7B (청록 악센트)
Accent: #E74C3C (붉은 강조)
Text: #2C3E50
Background: #FFFFFF
```

### K-Beauty UZ (K-콘텐츠 + UZ)

```
Primary: #FF6B9D (핑크)
Secondary: #0F7B7B (청록 - UZ 친화)
Accent: #D4AF37 (금색)
Text: #1A1A1A
Background: #FFF5F8
```

### 회피 색상 (단독)

- 검정 단독 (장례 연상)
- 노랑 단독 (질투)

---

## 4. 슬라이드 구조

### 표지 슬라이드

```
[로고]                              [발표일·회사 INN]

           [큰 제목 (러시아어 또는 우즈벡어)]
           [부제 (한국어 옵션)]

           [발표자 이름·직급·회사]

[하단 회사 정보 작게]
```

### 목차

```
Содержание / Mundarija / 목차

1. [섹션 1]
2. [섹션 2]
...

각 항목 우측에 슬라이드 번호 (~5)
```

### 본문 (1슬라이드 1메시지)

```
[제목 - 핵심 메시지 1줄]

[비주얼 (이미지·차트·다이어그램)]

[보조 텍스트 - 2~3줄]
[데이터·수치 강조]

[하단: 페이지 번호]
```

### 데이터·차트 슬라이드

```
[제목]

[큰 숫자 강조 (KPI)]
[보조 차트 (막대·꺾은선)]

[데이터 출처 (소문자)]
```

### 결론·CTA

```
[제목 - 핵심 결론]

[3가지 핵심 포인트]
1. ...
2. ...
3. ...

[CTA - 다음 단계 또는 행동 요청]
[연락처]
```

---

## 5. 트릴링구얼 슬라이드 옵션

### 옵션 A: 언어별 슬라이드 분리 (권장)

```
슬라이드 1~10: 한국어 (한국 본사용)
슬라이드 11~20: 러시아어 (UZ 비즈니스용)
슬라이드 21~30: 우즈벡어 (UZ 정부용)
```

장점: 각 언어 청중에게 풀 깊이 전달
단점: 슬라이드 수 3배

### 옵션 B: 동시 표기 (3단 분할)

```
[제목]

| 한국어  | Русский    | Oʻzbekcha |
|--------|-----------|-----------|
| 본문 1  | Текст 1   | Matn 1    |
| 본문 2  | Текст 2   | Matn 2    |
```

장점: 한 슬라이드로 다국어
단점: 텍스트 작아짐, 시각 답답

### 옵션 C: 메인 + 보조 (권장)

```
[메인 언어 (예: 러시아어) - 큰 글자]

[보조 언어 (한국어, 우즈벡어) - 작은 글자]

비주얼 + 차트
```

장점: 메인 청중에게 명확, 보조 청중도 이해
단점: 메인 언어 결정 필요

---

## 6. UZ 비주얼 코드

### 인물

- UZ/중앙아시아 외모 또는 한국+UZ 혼합
- 보수적 복장 (특히 여성)
- 가족·공동체 장면 효과

### 배경

- UZ 친화: 사마르칸트·부하라·타슈켄트
- 글로벌 미니멀: 흰 스튜디오
- 회피: 알코올·정치 상징

### 패턴·모티브

- Suzani 자수
- 사마르칸트 도자기
- Atlas 실크 줄무늬
- 면화 (목화)

상세는 `gil-media:nano-banana/references/uz-media-localization.md`.

### 아이콘

- Lucide React 아이콘
- 보편적·중립
- 종교 상징 회피

---

## 7. 차트·데이터

### UZS 통화 표기

```
850 000 UZS  (공백 구분, 한국 콤마 X)
≈ $68 USD    (USD 환산 동시)
```

### 차트 색상

- Primary: #0F7B7B (청록)
- 비교: #D4AF37 (금색)
- 강조 (부정): #E74C3C (빨강)
- 중립: #95A5A6 (회색)

### 데이터 시각화 도구

- pptxgenjs Chart (기본 막대·꺾은선·원형)
- Chart.js / Recharts (인터랙티브 — HTML 대시보드)
- Mermaid (다이어그램)

---

## 8. pptxgenjs 코드 예시 (UZ 슬라이드)

```javascript
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

// 마스터 슬라이드 (UZ 청록+금색)
pres.defineSlideMaster({
    title: "UZ_MASTER",
    background: { fill: "FFFFFF" },
    objects: [
        {
            rect: {
                x: 0, y: 0, w: "100%", h: 0.5,
                fill: { color: "0F7B7B" }
            }
        },
        {
            text: {
                text: "ООО Компания | ИНН 123456789",
                options: {
                    x: 0.3, y: 0.05, w: 8, h: 0.4,
                    fontSize: 10,
                    color: "FFFFFF",
                    fontFace: "Inter"
                }
            }
        }
    ]
});

// 표지 슬라이드
const slide1 = pres.addSlide({ masterName: "UZ_MASTER" });
slide1.addText("Презентация компании", {
    x: 0.5, y: 2, w: 12, h: 1,
    fontSize: 36,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B",
    align: "center"
});
slide1.addText("Korean K-Beauty UZ Launch 2026", {
    x: 0.5, y: 3.2, w: 12, h: 0.6,
    fontSize: 18,
    fontFace: "Inter",
    color: "1A1A1A",
    align: "center"
});

// 데이터 슬라이드
const slide2 = pres.addSlide({ masterName: "UZ_MASTER" });
slide2.addText("Финансовые показатели", {
    x: 0.5, y: 0.7, w: 12, h: 0.6,
    fontSize: 28,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B"
});

// UZS 매출 차트 데이터
const chartData = [
    {
        name: "Выручка (UZS)",
        labels: ["Q1", "Q2", "Q3", "Q4"],
        values: [850000000, 1200000000, 1500000000, 2000000000]
    }
];

slide2.addChart(pres.ChartType.bar, chartData, {
    x: 0.5, y: 1.5, w: 12, h: 5,
    chartColors: ["0F7B7B", "D4AF37"],
    showTitle: true,
    title: "Квартальная выручка 2026",
    showValue: true,
    valNumFmt: "# ##0"  // UZS 공백 구분
});

pres.writeFile("uz_presentation.pptx");
```

---

## 9. NotebookLM 스타일 프롬프트 (UZ)

### UZ 청록 + 골드

```
당신은 우즈벡 헤리티지 풍 비즈니스 프레젠테이션 디자이너입니다.
마크다운 슬라이드 원고를 기반으로 {N}장의 슬라이드를 설계해 주세요.
각 슬라이드는 "흰 또는 베이지 배경, 청록 (#0F7B7B) + 금색 (#D4AF37) 악센트,
Suzani 자수 모티브 또는 사마르칸트 도자기 패턴, Inter Cyrillic/Latin 폰트"로 구성합니다.
정중·전문 톤. 우즈벡 전통 + 모던 결합.
```

### UZ 미니멀 비즈니스

```
당신은 우즈벡 모던 비즈니스 프레젠테이션 디자이너입니다.
마크다운 슬라이드 원고를 기반으로 {N}장의 슬라이드를 설계해 주세요.
각 슬라이드는 "흰 배경, 굵은 Inter 폰트, 청록 (#0F7B7B) 악센트, 단색 아이콘, 충분한 여백"으로 구성.
한 슬라이드 = 한 메시지. K-Drama 모던 비즈니스 톤. UZ 친화 시각.
```

### K-Beauty UZ 출시

```
당신은 K-Beauty UZ 출시 프레젠테이션 디자이너입니다.
마크다운 슬라이드 원고를 기반으로 {N}장의 슬라이드를 설계해 주세요.
각 슬라이드는 "핑크 (#FF6B9D) + 청록 (#0F7B7B) + 금색 (#D4AF37),
한국 모델 또는 한+UZ 혼합 모델, K-Beauty 미학, Inter 폰트"로 구성.
한국 K-Beauty 매력 + UZ 친화 + 트릴링구얼 옵션.
```

---

## 10. 슬라이드 수 가이드

| 발표 시간 | 권장 슬라이드 수 |
|----------|-----------------|
| 5분 | 5~7장 |
| 10분 | 8~12장 |
| 15분 | 12~18장 |
| 20분 | 15~20장 |
| 30분 | 20~30장 |
| 1시간 | 30~50장 |

UZ 청중은 한국 대비 짧은 슬라이드 선호 (정중·집중 시간 짧음). 위 가이드의 하한선 권장.

---

## 11. 발표 톤 가이드

### 정중 (정부·공공)

- «Уважаемые коллеги»
- 짧고 명확한 문장
- 형식 표현 다수
- 권위·전통 강조

### 전문 (비즈니스)

- «Здравствуйте, дамы и господа»
- 데이터·수치 중심
- 결론 우선
- ROI·효율 강조

### 친근 (일반·교육)

- «Добрый день, друзья»
- 스토리텔링 추가
- 사례·경험 공유
- 참여 유도 (질문)

### 인터컴퍼니 (한국 본사 + UZ)

- 한국어 + 러시아어 결합
- 양국 가치 강조 (한국 전문성 + UZ 시장 이해)
- 데이터·전략·로드맵 명확
- 양국 팀 소개

---

## 12. 검수 체크리스트

```
[ ] 시장 적합 (한국 / UZ / 양국)
[ ] 언어 선택 (한국어 / 러시아어 / 우즈벡어 / 트릴링구얼)
[ ] 폰트 (Inter Cyrillic·Latin 또는 Pretendard)
[ ] 색상 팔레트 (60-30-10 또는 UZ 청록+금색)
[ ] 인물 (UZ 외모·보수 복장·해당 시)
[ ] 통화 (UZS 공백 구분, USD 환산 옵션)
[ ] 날짜 (DD.MM.YYYY)
[ ] 회사 정보 (INN·OKED·주소)
[ ] 슬라이드 수 (시간 대비)
[ ] 1슬라이드 1메시지
[ ] 문화·종교 코드 (술·돼지·정치 X)
[ ] 현지인 1차 검수 (UZ 발표 전)
```

---

## 13. 자원·도구

| 자원 | 용도 | URL |
|------|------|-----|
| pptxgenjs | PPT 코드 생성 | https://gitbrent.github.io/PptxGenJS |
| Inter 폰트 | 다국어 표시 | https://rsms.me/inter |
| Pretendard | 한국어 폰트 | https://pretendard.dev |
| KOTRA Tashkent | 한국 기업 자문 | https://www.kotra.or.kr/KBC/tashkent |

---

> **주의**: UZ PPT 발표는 청중·언어·문화 코드에 민감. 발표 전 현지인 검수 + 시연 권장. 본 가이드는 2026년 1월 기준.
