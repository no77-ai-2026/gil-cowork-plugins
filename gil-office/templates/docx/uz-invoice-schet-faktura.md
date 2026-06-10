# UZ Счёт-фактура (인보이스) 템플릿

> gil-office | DOCX 템플릿 | UZ 인보이스 NDS 12% 표기

## 메타 변수

```
{invoice_number}: 인보이스 번호
{invoice_date}: 발행일 (DD.MM.YYYY)
{contract_number}: 계약 번호 (해당 시)
{contract_date}: 계약일

{supplier_name}: 공급사명
{supplier_inn}: 공급사 INN
{supplier_address}: 공급사 주소
{supplier_account}: 공급사 계좌
{supplier_bank}: 공급사 은행

{buyer_name}: 구매사명
{buyer_inn}: 구매사 INN
{buyer_address}: 구매사 주소

{items}: 품목 리스트 (배열)
- {name}: 품목명
- {unit}: 단위 (шт./кг/м/час 등)
- {quantity}: 수량
- {unit_price}: 단가 (UZS)
- {amount}: 합계 (UZS)
- {nds}: NDS 12% (UZS)
- {total}: 총합 (UZS)

{subtotal}: 소계 (UZS)
{nds_total}: NDS 합계 (UZS)
{grand_total}: 총합 (UZS)
{grand_total_words}: 금액 한글/러시아어 표기
```

## 본문 구조

```
СЧЁТ-ФАКТУРА № {invoice_number}
от {invoice_date}

Поставщик:
Наименование: {supplier_name}
ИНН: {supplier_inn}
Адрес: {supplier_address}
р/с: {supplier_account} в {supplier_bank}

Покупатель:
Наименование: {buyer_name}
ИНН: {buyer_inn}
Адрес: {buyer_address}

Договор: № {contract_number} от {contract_date}

| № | Наименование товара/услуги | Ед. изм. | Кол-во | Цена за ед. (UZS) | Сумма (UZS) | НДС 12% (UZS) | Итого (UZS) |
|---|---------------------------|----------|--------|------------------|-------------|---------------|-------------|
| 1 | {item.name} | {item.unit} | {item.quantity} | {item.unit_price} | {item.amount} | {item.nds} | {item.total} |
| 2 | ... | ... | ... | ... | ... | ... | ... |

Итого по счёту:
- Без НДС: {subtotal} UZS
- НДС 12%: {nds_total} UZS
- Итого с НДС: {grand_total} UZS

Сумма прописью: {grand_total_words}

Поставщик:                              Покупатель:
_______________ [이름]                  _______________ [이름]
        М.П.                                    М.П.
```

## NDS 면제 카테고리

```
0% NDS:
- Базовые лекарственные средства (기본 의약품)
- Образование (교육)
- Медицинские услуги (의료)
- Экспорт (수출)
- Финансовые услуги (금융)

12% NDS (기본):
- 상품 일반
- 일반 서비스
- 임대
- 등
```

## 전자 인보이스 (soliq.uz)

UZ 2022년부터 전자 인보이스 의무:

```
1. soliq.uz 전자 시스템 가입
2. 전자 서명 등록
3. 인보이스 전자 작성·발행
4. 5년 보관
```

## python-docx 자동 생성 코드

```python
from docx import Document
from docx.shared import Pt, Cm

doc = Document()
section = doc.sections[0]
section.top_margin = Cm(2)
section.bottom_margin = Cm(2)

# 제목
title = doc.add_paragraph()
title.alignment = 1
run = title.add_run(f'СЧЁТ-ФАКТУРА № {invoice_number}\nот {invoice_date}')
run.font.name = 'Inter'
run.font.size = Pt(14)
run.bold = True

# 공급사·구매사 정보 (표)
info_table = doc.add_table(rows=2, cols=2)
info_table.cell(0, 0).text = 'Поставщик'
info_table.cell(0, 1).text = 'Покупатель'
info_table.cell(1, 0).text = f'{supplier_name}\nИНН: {supplier_inn}\nАдрес: {supplier_address}'
info_table.cell(1, 1).text = f'{buyer_name}\nИНН: {buyer_inn}\nАдрес: {buyer_address}'

# 품목 표
items_table = doc.add_table(rows=1+len(items), cols=8)
headers = ['№', 'Наименование', 'Ед. изм.', 'Кол-во', 'Цена', 'Сумма', 'НДС 12%', 'Итого']
for i, h in enumerate(headers):
    items_table.cell(0, i).text = h

for idx, item in enumerate(items, 1):
    items_table.cell(idx, 0).text = str(idx)
    items_table.cell(idx, 1).text = item['name']
    items_table.cell(idx, 2).text = item['unit']
    items_table.cell(idx, 3).text = str(item['quantity'])
    # UZS 공백 구분
    items_table.cell(idx, 4).text = f"{item['unit_price']:,}".replace(',', ' ')
    items_table.cell(idx, 5).text = f"{item['amount']:,}".replace(',', ' ')
    items_table.cell(idx, 6).text = f"{item['nds']:,}".replace(',', ' ')
    items_table.cell(idx, 7).text = f"{item['total']:,}".replace(',', ' ')

# 합계
doc.add_paragraph(f'Итого: {grand_total:,} UZS'.replace(',', ' '))
doc.add_paragraph(f'Сумма прописью: {grand_total_words}')

doc.save(f'invoice_{invoice_number}.docx')
```

## 검수 체크리스트

```
[ ] 인보이스 번호 고유
[ ] INN 양사 정확 (9자리)
[ ] UZS 공백 구분
[ ] NDS 12% 카테고리 정확
[ ] 합계 = 소계 + NDS
[ ] 금액 글자 표기 (러시아어)
[ ] 서명·도장 М.П.
[ ] 전자 인보이스 (soliq.uz) 등록
[ ] 5년 보관
```

## 사용

`gil-finance:tax-helper`의 UZ 세제 가이드와 병행 사용. NDS 카테고리 모호 시 UZ 회계사 자문.
