---
name: print-creative-builder
description: |
  [한·UZ 듀얼 · gil-creative] 크리에이티브 설계(CreativeSpec)를 인쇄물(전단·배너·카탈로그)로 조립하는 포맷 빌더입니다. 화면용 RGB와 별개로 CMYK·재단 여백 3mm·300dpi 규격을 반영하고, 다국어·정확 문구를 위해 후조판을 기본으로 PDF 산출을 준비합니다. 최종본은 인쇄소 프리플라이트 확인을 전제로 합니다.
  다음과 같은 요청 시 사용하세요:
  - "전단지 만들어줘"
  - "카탈로그 PDF로"
  - "인쇄용 배너 시안"
  - "리플렛 인쇄물 제작"
  - "bosma reklama" (인쇄 광고, UZ)
  gil-creative:creative-architect 설계를 입력으로 받아 gil:pdf-writer로 PDF를 조립하고, 배경은 gil-creative:image-bridge로 렌더합니다. 인쇄 규격 후처리는 인쇄소 프리플라이트 전제입니다.
version: "2.4.1"
---

# 인쇄물 빌더 (Print Creative Builder)

> **역할** CreativeSpec을 **인쇄물**(전단·배너·카탈로그)로 조립한다. CMYK·재단·300dpi 규격 반영, PDF 산출.
> **주의** 화면용 RGB 산출과 인쇄용 CMYK는 별개 후처리다. 최종본은 **인쇄소 프리플라이트 확인 전제**.

---

## 1. 입력
- gil-creative:creative-architect의 CreativeSpec.
- 브랜드킷 토큰(gil-creative:design-system-prep), 프리셋, 시장 프로필.

## 2. 인쇄 규격

| 항목 | 값 |
|---|---|
| 색공간 | **CMYK** (화면 RGB → CMYK 변환, 색 정합 주의) |
| 해상도 | **300dpi** |
| 재단 여백(bleed) | **3mm** |
| 안전 여백 | 재단선 안쪽 5mm 권장 |
| 규격 | 전단 A4/A5, 배너 지정, 카탈로그 다페이지 |

## 3. 조립 규칙
- **후조판 기본**: 다국어·정확 문구·편집 필요 → 배경만 gil-creative:image-bridge로 생성, 카피는 PDF 레이어로 후조판.
- 감정 여정을 인쇄 포맷에 재편성(전단=단면/양면 압축, 카탈로그=제품별 페이지 전개).
- 베네핏 헤드라인·정보 위계·반복 금지 규칙 유지.

## 4. 산출
- gil:pdf-writer로 PDF 조립. CMYK·재단 여백은 메타로 명시하고, 정밀 색·재단은 인쇄소 프리플라이트로 최종 확정.
- 기본 `.md`(레이아웃·카피 스펙) + PDF. 파일명 `[인쇄물]_[제품·주제]_[YYYYMMDD]`.

## 5. 체이닝
| 목적 | 스킬 |
|---|---|
| 설계 입력 | `gil-creative:creative-architect` |
| PDF 조립 | `gil:pdf-writer` |
| 배경 렌더 | `gil-creative:image-bridge` |
| 브랜드킷 토큰 | `gil-creative:design-system-prep` |
| 텍스트 마감 | `gil:ai-slop-reviewer`→`gil:korean-spell-check`(민감도 public 시)→`gil:humanize-korean`(마지막, Phase 6 최종 검수) |
| 규제 | `gil-commerce:commerce-marketing-compliance-kr` |

> UZ/CIS 인쇄·다국어 규칙은 `references/uz-print-creative-builder.md`.
