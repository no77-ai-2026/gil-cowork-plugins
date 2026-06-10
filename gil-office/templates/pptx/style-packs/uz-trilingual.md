# UZ 트릴링구얼 PPT 스타일 팩

> gil-office | PPTX 스타일 팩 | 한국어 + 러시아어 + 우즈벡어 동시

## 디자인 토큰

### 색상 (UZ 청록 + 금색)

```javascript
const colors = {
    primary: "0F7B7B",      // 청록 (도자기·돔)
    secondary: "D4AF37",    // 금색 (부·태양)
    accent: "FF6B9D",       // 핑크 (K-Beauty 등)
    text: "1A1A1A",          // 거의 검정
    background: "FFFFFF",    // 흰색
    backgroundSoft: "F5F1E8", // 베이지 (양피지)
    muted: "95A5A6"          // 회색
};
```

### 폰트

```javascript
const fonts = {
    heading: "Inter",         // 다국어 (한·러·우즈벡)
    body: "Inter",
    accent: "Pretendard",    // 한국어 강조
    sizes: {
        title: 32,
        heading: 24,
        body: 14,
        caption: 11
    }
};
```

### 슬라이드 비율

```javascript
pres.layout = "LAYOUT_WIDE";  // 16:9
// 또는
pres.layout = "LAYOUT_4x3";   // 4:3 (전통)
```

## 마스터 슬라이드

```javascript
pres.defineSlideMaster({
    title: "UZ_TRILINGUAL_MASTER",
    background: { fill: "FFFFFF" },
    objects: [
        // 상단 청록 바
        {
            rect: {
                x: 0, y: 0, w: "100%", h: 0.4,
                fill: { color: "0F7B7B" }
            }
        },
        // 회사 정보
        {
            text: {
                text: "ООО Компания | ИНН 123456789 | gil.uz",
                options: {
                    x: 0.3, y: 0.05, w: 8, h: 0.3,
                    fontSize: 9,
                    color: "FFFFFF",
                    fontFace: "Inter"
                }
            }
        },
        // 페이지 번호
        {
            placeholder: {
                options: { name: "slidenum", type: "slidenum",
                          x: 12, y: 7, w: 1, h: 0.3,
                          fontSize: 10, color: "95A5A6", fontFace: "Inter" },
                text: ""
            }
        }
    ]
});
```

## 표지 슬라이드 (3단 분할)

```javascript
const slide1 = pres.addSlide({ masterName: "UZ_TRILINGUAL_MASTER" });

// 상단 한국어 제목
slide1.addText("프로젝트 제목", {
    x: 1, y: 1.5, w: 11, h: 0.7,
    fontSize: 24,
    bold: true,
    fontFace: "Pretendard",
    color: "1A1A1A",
    align: "center"
});

// 중앙 러시아어 제목 (큰 글자 - 메인)
slide1.addText("Название проекта", {
    x: 1, y: 2.5, w: 11, h: 1,
    fontSize: 36,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B",
    align: "center"
});

// 하단 우즈벡어 제목
slide1.addText("Loyiha sarlavhasi", {
    x: 1, y: 3.7, w: 11, h: 0.7,
    fontSize: 24,
    bold: true,
    fontFace: "Inter",
    color: "1A1A1A",
    align: "center"
});

// 발표자 정보
slide1.addText("김민지 / Ким Минжи / Kim Minji", {
    x: 1, y: 5, w: 11, h: 0.4,
    fontSize: 16,
    fontFace: "Inter",
    color: "95A5A6",
    align: "center"
});
```

## 본문 슬라이드 (메인 + 보조 패턴)

```javascript
const slide2 = pres.addSlide({ masterName: "UZ_TRILINGUAL_MASTER" });

// 메인 제목 (러시아어)
slide2.addText("Финансовые показатели", {
    x: 0.5, y: 0.6, w: 12, h: 0.6,
    fontSize: 28,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B"
});

// 보조 제목 (한국어 + 우즈벡어, 작은 글자)
slide2.addText("재무 지표 / Moliyaviy ko'rsatkichlar", {
    x: 0.5, y: 1.2, w: 12, h: 0.4,
    fontSize: 14,
    fontFace: "Inter",
    color: "95A5A6"
});

// 큰 KPI 숫자
slide2.addText("850 000 UZS", {
    x: 0.5, y: 2.5, w: 6, h: 1.5,
    fontSize: 64,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B"
});

slide2.addText("Выручка Q1 2026\n(≈ $68,000 USD)", {
    x: 0.5, y: 4.2, w: 6, h: 0.8,
    fontSize: 14,
    fontFace: "Inter",
    color: "1A1A1A"
});

// 보조 텍스트 (한국어)
slide2.addText("2026년 1분기 매출", {
    x: 0.5, y: 5.0, w: 6, h: 0.4,
    fontSize: 11,
    fontFace: "Pretendard",
    color: "95A5A6"
});
```

## 데이터 차트 슬라이드

```javascript
const slide3 = pres.addSlide({ masterName: "UZ_TRILINGUAL_MASTER" });

slide3.addText("Квартальная динамика 2026", {
    x: 0.5, y: 0.6, w: 12, h: 0.6,
    fontSize: 24,
    bold: true,
    fontFace: "Inter",
    color: "0F7B7B"
});

const chartData = [
    {
        name: "Выручка (UZS, млн)",
        labels: ["Q1", "Q2", "Q3", "Q4"],
        values: [850, 1200, 1500, 2000]
    }
];

slide3.addChart(pres.ChartType.bar, chartData, {
    x: 0.5, y: 1.5, w: 12, h: 5,
    chartColors: ["0F7B7B", "D4AF37"],
    showTitle: false,
    showLegend: true,
    legendPos: "b",
    showValue: true,
    valNumFmt: "# ##0"  // UZS 공백 구분
});
```

## CTA 슬라이드

```javascript
const slideCTA = pres.addSlide({ masterName: "UZ_TRILINGUAL_MASTER" });

// 배경 청록
slideCTA.background = { fill: "0F7B7B" };

// 메인 CTA (러시아어)
slideCTA.addText("Свяжитесь с нами", {
    x: 1, y: 2.5, w: 11, h: 1,
    fontSize: 48,
    bold: true,
    fontFace: "Inter",
    color: "FFFFFF",
    align: "center"
});

// 보조 (한국어 + 우즈벡어)
slideCTA.addText("문의하기 / Biz bilan bog'laning", {
    x: 1, y: 3.7, w: 11, h: 0.6,
    fontSize: 20,
    fontFace: "Inter",
    color: "D4AF37",
    align: "center"
});

// 연락처
slideCTA.addText("contact@gil.uz | +998 XX XXX XXXX", {
    x: 1, y: 5, w: 11, h: 0.5,
    fontSize: 16,
    fontFace: "Inter",
    color: "FFFFFF",
    align: "center"
});
```

## 옵션별 사용 가이드

### 옵션 A: 언어별 분리

```
슬라이드 1~10: 한국어 (Pretendard, 한국 본사 청중)
슬라이드 11~20: 러시아어 (Inter Cyrillic, UZ 비즈니스 청중)
슬라이드 21~30: 우즈벡어 (Inter Latin, UZ 정부 청중)
```

### 옵션 B: 동시 표기

위 코드 예시처럼 한 슬라이드에 3개 언어 동시.

### 옵션 C: 메인 + 보조 (권장)

메인 언어 큰 글자 + 보조 언어 작은 글자.

## 트릴링구얼 PPT 발행 체크리스트

```
[ ] 폰트 임베드 (Inter Cyrillic·Latin, Pretendard)
[ ] 한국어·러시아어·우즈벡어 일관 톤
[ ] UZS 공백 구분
[ ] 우즈벡 라틴 특수 문자 (`oʻ`, `gʻ`) 정확
[ ] 색상 청록·금색 (UZ 친화)
[ ] 1슬라이드 1메시지
[ ] 차트 색상 일관 (청록·금색)
[ ] 회사 정보 (INN·OKED·연락처)
[ ] 발표 시간 대비 슬라이드 수
[ ] 청중 톤 (정부·비즈니스·일반)
[ ] 현지인 검수
```

## 사용

```javascript
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

// 위 마스터 + 슬라이드 코드 붙여넣기

pres.writeFile({ fileName: "uz_trilingual_presentation.pptx" });
```
