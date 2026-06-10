# UZ·CIS·국제 공공데이터 가이드

> gil-data v0.1.0 | UZ stat.uz·my.gov.uz·CIS·국제 데이터

## 개요

UZ·CIS·국제 공공데이터 통합 가이드. 한국 KOSIS·data.go.kr 외에 UZ·CIS·세계 통계 활용.

---

## 1. UZ 주요 공공데이터 소스

### stat.uz (통계청)

URL: https://stat.uz

분야:
- 인구 (Aholisi)
- 경제 (Iqtisodiyot)
- 무역 (Tashqi savdo)
- 농업 (Qishloq xo'jaligi)
- 산업 (Sanoat)
- 사회 (Ijtimoiy)
- 환경 (Atrof-muhit)

언어: 우즈벡어·러시아어·영어
형식: PDF·Excel·웹 페이지 (대부분), 일부 API

### my.gov.uz (전자정부)

URL: https://my.gov.uz

- 통합 정부 데이터
- 사업자 등록·세무 (soliq.uz 연동)
- 공공 서비스 통계

### data.gov.uz (Open Data Portal)

URL: https://data.gov.uz

- UZ 정부 개방 데이터
- CSV·JSON·API
- 분야별 카탈로그

### soliq.uz (국세청)

URL: https://soliq.uz

- 사업자 INN 검증
- 세무 데이터
- 전자 인보이스

### cbu.uz (중앙은행)

URL: https://cbu.uz

- UZS·USD·EUR 환율
- 금융 통계
- 외환 거래

### dxa.uz (공공조달)

URL: https://www.xarid.uzex.uz (또는 https://zakupki.uz)

- 정부·공공 입찰 데이터
- 계약 통계

---

## 2. CIS 통계

### Rosstat (러시아)

URL: https://rosstat.gov.ru

- 러시아 통계청 (UZ 통계 표준 영향)
- 러시아어
- API 일부

### Eurasian Stats

URL: https://eaeunion.org/?lang=en

- EAEU (러·벨라루스·카자흐·아르메니아·키르기스) 통합
- 영어·러시아어

### Belstat (벨라루스)·Stat.gov.kz (카자흐) 등

각국 통계청.

---

## 3. 국제 통계

### World Bank Open Data

URL: https://data.worldbank.org

- 무료 API
- 200+ 국가 (UZ·한국 포함)
- 1,400+ 지표
- 영어

핵심 지표:
- NY.GDP.MKTP.CD (GDP)
- SP.POP.TOTL (인구)
- NE.EXP.GNFS.CD (수출)
- NE.IMP.GNFS.CD (수입)
- SL.UEM.TOTL.ZS (실업률)
- SE.SEC.ENRR (중등 교육 등록률)

### UN Comtrade

URL: https://comtradeplus.un.org

- 무역 통계 (수출·수입·국가별·품목별)
- 무료 + 등록
- 영어

### UN Population

URL: https://population.un.org

- 인구·전망
- 영어

### IMF

URL: https://www.imf.org/en/Data

- 경제·금융
- DataMapper·IFS

### OECD Data

URL: https://data.oecd.org

- OECD 회원국 (한국 포함, UZ X)
- 한국·일본·미국·EU 비교

### WHO

URL: https://www.who.int/data

- 보건 통계 (UZ 포함)

### WTO

URL: https://www.wto.org/statistics

- 무역 협정·관세

### Our World in Data

URL: https://ourworldindata.org

- 시각화 + 데이터 통합
- 무료 다운로드

---

## 4. UZ 공공데이터 활용 시나리오

### 한국 회사 UZ 시장 분석

```
1. 인구·소득 (stat.uz·World Bank)
   → 시장 규모

2. 산업 구조 (stat.uz)
   → 진출 분야 결정

3. 무역 데이터 (stat.uz·UN Comtrade)
   → 한국 ↔ UZ 무역 트렌드

4. 환율 (cbu.uz)
   → 가격 결정

5. 경쟁사 (DART·UZ 정부 공시)
   → 시장 점유율
```

### ODA·EDCF 사업 데이터

```
1. UZ 개발 지표 (World Bank·UN)
   → 개발 격차 진단

2. KOICA·EDCF 과거 사업 (한국 외교부·EDCF)
   → 한·UZ 협력 트랙

3. UZ 정부 우선순위 (UZ MID)
   → 사업 매칭
```

### 인구 통계 (한·UZ 비교)

| 지표 | 한국 (KOSIS) | UZ (stat.uz) | 차이 |
|------|------------|------------|------|
| 인구 | 51M | 36M | -15M |
| GDP/캡 | $32K | $2.5K | 13배 |
| 도시화 | 81% | 50% | +31%p |
| 평균 연령 | 44 | 28 | -16 |
| 출산율 | 0.7 | 2.8 | -2.1 |

---

## 5. UZ 데이터 형식 주의

### 인코딩

- 현대: UTF-8
- 구식 (정부 일부): Windows-1251 (키릴)
- 변환: pandas `encoding="windows-1251"`

### 통화·숫자

- UZS: **공백 구분** (1 000 000)
- 소수점: **콤마** (1,5%)

### 날짜

- DD.MM.YYYY (러시아·CIS 표준)

### 언어

- 우즈벡어 라틴 (현재 표준)
- 우즈벡어 키릴 (구식·농촌)
- 러시아어 (비즈니스·교육·정부)
- 영어 (국제·IT)

---

## 6. API 호출 예시

### World Bank (UZ GDP)

```python
import requests

url = "https://api.worldbank.org/v2/country/UZB/indicator/NY.GDP.MKTP.CD"
params = {"format": "json", "date": "2014:2024", "per_page": 100}
response = requests.get(url, params=params)
data = response.json()

# data[1] = 결과 리스트
for item in data[1]:
    print(item['date'], item['value'])
```

### UN Comtrade (한·UZ 무역)

```python
url = "https://comtradeapi.un.org/data/v1/get/C/A/HS"
params = {
    "reporterCode": 410,  # 한국
    "partnerCode": 860,   # UZ
    "period": "2024",
    "subscription-key": YOUR_KEY,
}
response = requests.get(url, params=params)
data = response.json()
```

### stat.uz (웹 스크래핑 + Open Data)

stat.uz API 제한적. data.gov.uz·웹 스크래핑.

```python
from bs4 import BeautifulSoup

url = "https://stat.uz/uz/rasmiy-statistika/employment"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
# 테이블·다운로드 링크 파싱
```

---

## 7. 데이터 활용 우선순위

### 한국 회사 UZ 진출 분석

```
1순위: World Bank (UZ 거시 지표)
2순위: stat.uz (UZ 상세)
3순위: UN Comtrade (한·UZ 무역)
4순위: KOTRA (한국 기업 정보)
5순위: cbu.uz (환율)
```

### 인터컴퍼니 분석

```
1순위: 한국은행 ECOS·cbu.uz (양국 환율)
2순위: KOSIS·stat.uz (양국 매출 대비)
3순위: World Bank (양국 비교)
```

---

## 8. 한·UZ 협력 데이터 (NEW — gil-oda 연계)

- 한국 외교부 ODA 통계
- KOICA 사업 통계
- EDCF 차관 통계
- World Bank UZ 차관·원조 통계
- KOTRA Tashkent 한국 기업 진출 통계

상세는 `gil-oda` 플러그인 (Phase 4 #2 예정).

---

## 9. 자원

| 자원 | URL |
|------|-----|
| stat.uz | https://stat.uz |
| my.gov.uz | https://my.gov.uz |
| data.gov.uz | https://data.gov.uz |
| cbu.uz | https://cbu.uz |
| World Bank | https://data.worldbank.org |
| UN Comtrade | https://comtradeplus.un.org |
| OECD Data | https://data.oecd.org |
| KOTRA Tashkent | https://www.kotra.or.kr/KBC/tashkent |

---

> **주의**: UZ 공공데이터는 정부 정책에 따라 접근성·갱신 주기 변동. KOTRA Tashkent 또는 현지 컨설턴트 자문 권장.
