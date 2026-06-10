# 한·UZ 듀얼 KPI 대시보드 가이드

> gil-data v0.1.0 | 트릴링구얼 KPI·환산·이슬람 명절·환차

## 개요

한국 본사 + UZ 자회사 통합 운영 시 양국 KPI 대시보드. KRW·UZS·USD 동시 표기, 트릴링구얼 라벨, 이슬람 명절 캘린더, 환차 영향 분리.

---

## 1. 표준 대시보드 구조

```
[헤더]
- 회사명·기간·기준일
- 환율 표시 (KRW/USD, UZS/USD)
- 언어 토글 (KO·EN·RU·UZ)

[KPI 카드 그리드 (3x4)]
1. 한국 매출 (KRW)
2. UZ 매출 (UZS)
3. 통합 매출 (USD)
4. 한국 사용자
5. UZ 사용자
6. 합계 사용자
7. 한국 ROAS
8. UZ ROAS
9. 통합 ROAS
10. 환율 (KRW/USD)
11. 환율 (UZS/USD)
12. 환차 영향

[시계열 차트]
- 매출 (USD) 양국 비교
- 환차 영향 분리 라인

[지역별 지도 (ECharts)]
- 한국: 17개 시도
- UZ: Tashkent·Samarkand·Buxoro·Andijan 등 14개 주

[비교 차트]
- 양국 KPI 막대 (Stacked)
- 분야별 성과

[캘린더]
- 한·UZ 명절 (이슬람 포함)
- 캠페인 일정

[푸터]
- 데이터 출처
- 환율 기준일
- 트릴링구얼 라벨
```

---

## 2. 트릴링구얼 라벨 시스템

### 라벨 매트릭스

```javascript
const labels = {
  ko: {
    revenue: '매출',
    users: '사용자',
    profit: '영업이익',
    growth: '성장률',
    korea: '한국',
    uzbekistan: '우즈벡',
    integrated: '통합',
    exchangeRate: '환율',
    quarter: '분기',
    month: '월',
  },
  en: {
    revenue: 'Revenue',
    users: 'Users',
    profit: 'Operating Profit',
    growth: 'Growth Rate',
    korea: 'Korea',
    uzbekistan: 'Uzbekistan',
    integrated: 'Integrated',
    exchangeRate: 'Exchange Rate',
    quarter: 'Quarter',
    month: 'Month',
  },
  ru: {
    revenue: 'Выручка',
    users: 'Пользователи',
    profit: 'Операционная прибыль',
    growth: 'Темп роста',
    korea: 'Корея',
    uzbekistan: 'Узбекистан',
    integrated: 'Интегрированный',
    exchangeRate: 'Курс валют',
    quarter: 'Квартал',
    month: 'Месяц',
  },
  uz: {
    revenue: 'Daromad',
    users: 'Foydalanuvchilar',
    profit: 'Operatsion foyda',
    growth: 'O\'sish sur\'ati',
    korea: 'Koreya',
    uzbekistan: 'O\'zbekiston',
    integrated: 'Integratsiyalashgan',
    exchangeRate: 'Valyuta kursi',
    quarter: 'Chorak',
    month: 'Oy',
  },
};
```

### 언어 토글 컴포넌트

```tsx
import { useState } from 'react';

export function LanguageToggle() {
  const [lang, setLang] = useState('ko');

  return (
    <div className="flex gap-2">
      {['ko', 'en', 'ru', 'uz'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={lang === l ? 'bg-primary text-white' : 'bg-muted'}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

---

## 3. 통화 환산 자동화

### 환율 셀 (수동 변경 가능)

```tsx
import { useState } from 'react';

export function ExchangeRateInput() {
  const [krwUsd, setKrwUsd] = useState(1380);
  const [uzsUsd, setUzsUsd] = useState(12500);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>KRW/USD</label>
        <input
          type="number"
          value={krwUsd}
          onChange={(e) => setKrwUsd(Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label>UZS/USD</label>
        <input
          type="number"
          value={uzsUsd}
          onChange={(e) => setUzsUsd(Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
```

### 환산 함수

```typescript
const convertToUSD = (amount: number, currency: 'KRW' | 'UZS', rates: ExchangeRates) => {
  if (currency === 'KRW') return amount / rates.krwUsd;
  if (currency === 'UZS') return amount / rates.uzsUsd;
  return amount;
};
```

### 통화 형식 함수

```typescript
const formatCurrency = (amount: number, currency: 'KRW' | 'UZS' | 'USD') => {
  if (currency === 'KRW') return `₩${amount.toLocaleString('ko-KR')}`;
  if (currency === 'UZS') return `${amount.toLocaleString('ru-RU').replace(/,/g, ' ')} UZS`;
  if (currency === 'USD') return `$${amount.toLocaleString('en-US')}`;
};

// 예:
// formatCurrency(1000000, 'KRW') → "₩1,000,000"
// formatCurrency(12000000, 'UZS') → "12 000 000 UZS"
// formatCurrency(950, 'USD') → "$950"
```

---

## 4. 환차 영향 분석

### 환차 분리 차트

매출 변화 = 실질 성장 + 환차 영향

```
[전월 대비 매출 변화]

Korea 매출:
- 실질 성장: ₩50M (+10%)
- 환차 영향: ₩20M (USD 강세)
- 총 변화: ₩70M (+14%)

UZ 매출:
- 실질 성장: 1,000,000,000 UZS (+8%)
- 환차 영향: -200,000,000 UZS (UZS 약세)
- 총 변화: 800,000,000 UZS (+6%)
```

### 코드 (Recharts)

```tsx
const data = [
  { month: 'Jan', real_growth_usd: 50000, fx_impact_usd: 20000 },
  { month: 'Feb', real_growth_usd: 60000, fx_impact_usd: -10000 },
  // ...
];

<BarChart data={data}>
  <Bar dataKey="real_growth_usd" stackId="a" fill="#0F7B7B" name="실질 성장" />
  <Bar dataKey="fx_impact_usd" stackId="a" fill="#D4AF37" name="환차" />
</BarChart>
```

---

## 5. 한·UZ 명절 캘린더

```javascript
const holidays = {
  korea: [
    { date: '2026-01-01', name: { ko: '신정', en: 'New Year', ru: 'Новый год', uz: 'Yangi yil' } },
    { date: '2026-02-17', name: { ko: '설날', en: 'Lunar NY', ru: 'Лунный новый год', uz: 'Qoraqo\'lpoq yil' } },
    { date: '2026-03-01', name: { ko: '삼일절', en: 'Independence Day', ru: 'День независимости', uz: 'Mustaqillik kuni (Koreya)' } },
    { date: '2026-05-05', name: { ko: '어린이날', en: 'Children\'s Day', ru: 'День детей', uz: 'Bolalar kuni' } },
    { date: '2026-09-25', name: { ko: '추석', en: 'Chuseok', ru: 'Чусок', uz: 'Chusok' } },
    { date: '2026-10-03', name: { ko: '개천절', en: 'National Foundation', ru: 'День основания', uz: 'Asoschilik kuni' } },
  ],
  uz: [
    { date: '2026-01-01', name: { ko: '새해', en: 'New Year', ru: 'Новый год', uz: 'Yangi yil' } },
    { date: '2026-03-08', name: { ko: '여성의 날', en: 'Women\'s Day', ru: 'Женский день', uz: 'Xotin-qizlar kuni' } },
    { date: '2026-03-21', name: { ko: '나브루즈 (봄 명절)', en: 'Navruz', ru: 'Навруз', uz: 'Navruz' } },
    { date: '2026-09-01', name: { ko: '독립 기념일', en: 'Independence Day', ru: 'День независимости', uz: 'Mustaqillik kuni' } },
    { date: '2026-12-08', name: { ko: '헌법의 날', en: 'Constitution Day', ru: 'День Конституции', uz: 'Konstitutsiya kuni' } },
    // 이슬람 명절 (변동)
    { date: '2026-03-19~20', name: { ko: 'Eid al-Fitr (변동)', en: 'Eid al-Fitr', ru: 'Ураза-байрам', uz: 'Ramazon hayit' } },
    { date: '2026-05-26~27', name: { ko: 'Eid al-Adha (변동)', en: 'Eid al-Adha', ru: 'Курбан-байрам', uz: 'Qurbon hayit' } },
  ],
};
```

### 캘린더 시각화 (Recharts)

```tsx
<Timeline
  events={holidays.korea.concat(holidays.uz)}
  highlightRamadan={true}  // Ramadan 단식월 강조
  workdayCalendar={true}    // 평일/명절 구분
/>
```

---

## 6. 시간대 통합 (KST vs UZ)

```javascript
// KST = UTC+9, UZ = UTC+5
// 시차: KST - 4시간 = UZ
// UZ + 4시간 = KST

const convertToUZTime = (kstDate) => new Date(kstDate.getTime() - 4 * 3600 * 1000);
const convertToKSTTime = (uzDate) => new Date(uzDate.getTime() + 4 * 3600 * 1000);
```

대시보드 표기:
- "데이터 기준: 2026-01-29 09:00 KST (= 05:00 UZ)"

---

## 7. 지도 시각화 (ECharts)

### 한국 지도 (17개 시도)

```javascript
import * as echarts from 'echarts';
import koreaMap from 'echarts/data/korea.json';

echarts.registerMap('korea', koreaMap);

const option = {
  series: [{
    type: 'map',
    map: 'korea',
    data: [
      { name: '서울', value: 9700000 },
      { name: '부산', value: 3300000 },
      // ...
    ],
  }],
};
```

### UZ 지도 (14개 주)

```javascript
import uzMap from './uz-map.json';

echarts.registerMap('uzbekistan', uzMap);

const option = {
  series: [{
    type: 'map',
    map: 'uzbekistan',
    data: [
      { name: 'Tashkent', value: 3200000 },
      { name: 'Samarqand', value: 530000 },
      { name: 'Buxoro', value: 280000 },
      // ...
    ],
  }],
};
```

UZ 14개 주:
- Toshkent (수도) + Toshkent viloyati (주)
- Andijon
- Buxoro
- Farg'ona
- Jizzax
- Xorazm
- Namangan
- Navoiy
- Qashqadaryo
- Qoraqalpog'iston (자치공화국)
- Samarqand
- Sirdaryo
- Surxondaryo

### 한·UZ 통합 지도

별도 차트 (한국 + UZ 옆에 배치) 또는 World Map (ECharts).

---

## 8. 환차 영향 시각화

```javascript
// 환차 영향 = 외화 매출 × (현재 환율 - 전기 환율)

const fxImpact = (revenueUSD, currentRate, previousRate) => {
  return revenueUSD * (currentRate - previousRate);
};

// Waterfall chart로 시각화
const waterfallData = [
  { name: '전기 매출', value: 1000 },
  { name: '실질 성장', value: 100 },
  { name: '환차 영향', value: -50 },
  { name: '당기 매출', value: 1050 },
];
```

---

## 9. 한·UZ 비즈니스 일정 통합

```
[월간 캘린더]

Week 1 (1/5~1/11):
- 한국: 정상 영업
- UZ: 정상 영업

Week 2 (1/12~1/18):
- 한국: 정상
- UZ: 정상

...

[2월]
- 2/17 한국 설날 (3일 휴무)
- UZ: 정상 (한국 본사 연락 X)

[3월]
- 3/1 한국 삼일절
- 3/8 UZ 여성의 날
- 3/21 UZ Navruz
- (변동) Ramadan 시작

[5월]
- 5/5 한국 어린이날
- (변동) Eid al-Fitr 1주 전 Ramadan 종료

[9월]
- 9/1 UZ 독립 기념일
- 9/25 한국 추석 (5일 휴무)
```

---

## 10. 대시보드 실행 체크리스트

```
[ ] 환율 (KRW/USD, UZS/USD) 기준일 명시
[ ] 트릴링구얼 라벨 (KO·EN·RU·UZ)
[ ] 통화 형식 (₩·UZS·$)
[ ] 환차 영향 분리
[ ] 양국 명절 캘린더
[ ] 시간대 명시 (KST·UZ)
[ ] 데이터 출처 (KOSIS·stat.uz·World Bank)
[ ] 다크 모드 지원
[ ] 모바일 반응형
[ ] 인쇄·PDF 출력 가능
[ ] 데이터 갱신 자동화 (해당 시)
```

---

## 11. 자원·도구

| 도구 | 용도 |
|------|------|
| Recharts | shadcn 공식 차트 |
| ECharts | 지도·복합 시각화 |
| date-fns | 한·UZ 시간대·명절 |
| next-intl | 다국어 |
| pandas | 데이터 정제 (Python) |
| numbro | 통화 형식 (다국어) |

---

> **주의**: 한·UZ 환율은 변동성 큼. 환율은 시트 1에 별도 셀 + 모든 환산이 참조하는 구조 필수. 일별 갱신 자동화 권장 (`cbu.uz` API).
