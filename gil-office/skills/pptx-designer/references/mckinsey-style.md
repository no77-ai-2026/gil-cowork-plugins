# pptx-designer — McKinsey(컨설팅) 스타일 프리셋

> gil-office | pptx-designer 참조 | 스타일 프리셋 = `mckinsey` | 방법론 차용: AX Labs `axlabs-mckinsey-pptx` (MIT)

`--style mckinsey`(또는 "맥킨지 스타일 PPT" 요청) 선택 시 적용하는 컨설팅 덱 디자인 시스템·슬라이드 아키타입 카탈로그. 기존 "일반(Claude 톤)" 프리셋과 분기한다. 본 프리셋은 **방법론·레이아웃 규칙·아키타입**을 pptxgenjs 엔진으로 구현한다(원본 python-pptx 코드는 직접 이식하지 않음).

## 1. 핵심 원칙 (컨설팅 덱)

- **액션 타이틀(Action Title)**: 슬라이드 제목은 주제어가 아니라 **결론 문장**("매출 14% 성장, 그러나 KPI 2건 지연"). 한 슬라이드의 So-What을 제목에 박는다.
- **MECE 구조**: 본문 항목은 상호배타·전체포괄. 2~4개 묶음 권장.
- **1 슬라이드 1 메시지**: 제목 = 메시지, 본문 = 근거.
- **출처·각주**: 하단에 source/footnote 명시(데이터 신뢰).
- **고스트 덱**: 내용 채우기 전 제목(액션 타이틀)만으로 스토리라인 먼저 확정.
- **절제된 비주얼**: 장식 최소, 데이터·구조 중심.

## 2. 테마 토큰 (딥네이비·블루·그레이·신호색)

```
navy(dark)   #0F2A4A   deep navy   #0A1F3D
blue(bright) #2E9BD6   mid #1F6FA8  light #4FB2E5  royal #2A2AE5
text         #1A1A1A   white #FFFFFF
gray  rule #999999 · light #E8E8E8 · soft #F2F2F2 · grid #D0D0D0 · footer #888888
status  green #4CAF50 · amber #F4C57A · red #E04E5E   (신호등 상태)
```
폰트: 제목·본문 산세리프(한국어 Pretendard / 영문 Inter), 위계는 굵기·크기로. 표지·섹션은 딥네이비 배경 + 화이트 텍스트.

## 3. 슬라이드 아키타입 카탈로그 (40종, "언제 쓰나")

**Executive summary**: ① paragraph(서술 2~4단락) ② takeaways+bullets(테이크어웨이 2~4 + 근거, 가장 표준) ③ dark-navy impact(단일 임팩트 문장, 네이비 배경)
**진단·평가**: ④ assessment table(신호등 상태표) ⑧ prioritization matrix(우선순위 2×2) ⑦ growth-share/BCG matrix ⑤⑥ bubble chart(±takeaways)
**비교**: ⑨ column comparison(포커스) ㉜ comparison table(Harvey balls) ㉝ pros/cons ㉞ two-column/before-after
**차트**: ⑩ 단순성장 ⑪ 분할성장 ⑫ historic+forecast 컬럼 · ㉟ stacked · ㊱ grouped · ㊲ line · ㊳ funnel
**트렌드·영역**: ⑬ three trends(icons) ⑭ trends table ⑮ trends numbered ⑯ five key areas ⑰ overview cards ⑱ issue tree
**조직·팀**: ⑲ org chart ⑳ project team circles ㉑ team chart(기능×역할)
**일정·프로세스**: ㉒ phases chevron(3) ㉓ phases table(4) ㉔ waves timeline(4) ㉕ Gantt weekly ㉖ process activities ㊳ process flow horizontal
**구성 요소**: ㉗ cover ㉘ section divider ㉙ agenda ㉚ stat hero/big number ㉛ quote ㊵ KPI dashboard

> 공통 옵션: title(액션 타이틀)·page_number·section_marker·source·footnote.
> 의도→아키타입 선택: "요약"=②, 단일 강조=③, "상태 점검"=④, "우선순위"=⑧, "성장 추세"=⑫, "로드맵"=㉒~㉕, "조직"=⑲, "KPI"=㊵, "표지/목차"=㉗㉙.

## 4. 빌드 흐름 (pptxgenjs)

1. 스토리라인: 각 슬라이드 **액션 타이틀**부터 작성(고스트 덱).
2. 아키타입 매핑: 의도별로 위 카탈로그에서 선택.
3. 테마 토큰 적용(네이비/블루/그레이/신호색) + 산세리프 위계.
4. 출처·페이지·섹션 마커 삽입.
5. pptx-designer QA 검수(텍스트 과밀·대비·1메시지) 후 .pptx 산출.

## 5. 일반 스타일과의 차이

| 축 | 맥킨지 | 일반(Claude 톤) |
|---|---|---|
| 제목 | 액션 타이틀(결론문) | 주제어 |
| 팔레트 | 네이비·블루·그레이·신호색 | 10 큐레이션 팔레트 |
| 톤 | 절제·데이터 중심 | 브랜드 톤·온도감 |
| 강점 | 컨설팅·임원 보고·전략 | 범용·마케팅·교육 |

## Attribution
아키타입 카탈로그·레이아웃 방법론은 [axlabs-mckinsey-pptx](https://github.com/seulee26/mckinsey-pptx) (MIT, © 2026 AX Labs / 이승필)에서 차용. 코드(python-pptx)는 이식하지 않고 방법론만 pptxgenjs로 재구현.
