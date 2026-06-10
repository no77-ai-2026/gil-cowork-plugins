# gil-education

[한·UZ 듀얼] 강사·교수·교사 교육 콘텐츠 풀스택 — 커리큘럼 설계, 시험 출제·기출 분석, 학술 리서치, 교재 제작, 강의·연수 운영 매뉴얼, 수강 후 30일 후기 자산화, 그리고 **우즈벡어 교육·트릴링구얼(한·러·우즈벡) 학습**까지.

[![버전](https://img.shields.io/badge/version-2.15.4-blue)](../CHANGELOG.md)
[![라이선스](https://img.shields.io/badge/license-MIT-green)](../LICENSE)
[![스킬](https://img.shields.io/badge/skills-8-success)](#스킬)

온라인 강의 제작부터 교재·평가, 학술 논문, 자격증 대비, 강의·연수 운영 실무, 후기 자산화, UZ 한인·고려인 대상 우즈벡어 교육까지 — 한국 표준과 UZ 듀얼 컨텍스트를 함께 지원합니다.

## 스킬 (8)

| 스킬 | 설명 | 출신 | 상태 |
|------|------|:----:|:----:|
| [curriculum-designer](./skills/curriculum-designer/) | 강의 목차·학습목표·역량 갭 분석. 백워드 설계·역량 매핑(NCS·CEFR) 심화 | modu | ✅ |
| [textbook-builder](./skills/textbook-builder/) | 학습자 최적화 교재 자동 제작(Bloom·교사용 지도서). 트릴링구얼·키릴/라틴·고려인 학습자 | **GIL 오리지널** | ✅ |
| [assessment-creator](./skills/assessment-creator/) | 시험 출제·기출 분석·모의고사. 문항 설계·타당도/신뢰도·루브릭 심화 | modu | ✅ |
| [past-exam-analyzer](./skills/past-exam-analyzer/) | 기출 패턴 분석·다음 회차 예측·예상문제 생성. DTM·UZ 대학입시·IELTS | **GIL 오리지널** | ✅ |
| [research-assistant](./skills/research-assistant/) | 학술 리서치·논문 초안·인용 관리. PRISMA 선별·인용 충실성·CIS 학술 자원 | modu | ✅ |
| [language-tutor](./skills/language-tutor/) | 범용 어학 튜터 엔진(명령형 5모드). 한국인→CIS 영어·러시아어·우즈벡어 / 외국인→한국어. CEFR/TOPIK·대조 학습 | **GIL 오리지널** | ✅ |
| [course-curriculum-design](./skills/course-curriculum-design/) | 강의·연수·워크숍 운영 매뉴얼(시간표·동선·D-N 준비물·리스크 Plan B). `gil-office:docx-generator` 체이닝 | modu | ✅ |
| [course-followup-sequence](./skills/course-followup-sequence/) | 강의 후 30일 후기 시퀀스(D+1~D+30) + 인센티브·자산화 | modu | ✅ |

## 교육 파이프라인 (체이닝)

**① 학습 콘텐츠 제작 흐름**
```
curriculum-designer (설계·역량 매핑)
  → textbook-builder (교재; 트릴링구얼 시 uz-textbook)
  → assessment-creator (문항·루브릭)
  → past-exam-analyzer (기출 패턴·예상문제)
  → gil-office:docx-generator / pdf-writer (교재·시험지 출력)
```

**② 강사 운영 흐름**
```
course-curriculum-design (D-N 운영 매뉴얼·동선·Plan B)
  → gil-office:docx-generator (.docx)
  → (강의 실행)
  → course-followup-sequence (D+1~D+30 후기 카피)
  → gil-content:copywriting → gil:ai-slop-reviewer → gil-content:korean-spell-check
```

**③ 학술·언어 보조**
```
research-assistant (문헌 검토·인용 무결성)
  → gil-research:research-methodology / research-analysis / devil-review / paper-writer
language-tutor (어학 교습 엔진)  ↔  textbook-builder (어학 교재)
```

모든 텍스트 산출물은 `gil:ai-slop-reviewer` → `gil-content:humanize-korean`(한국어) 후처리 권장.

## 한국 + UZ 듀얼 컨텍스트

- **한국**: 블룸 분류법 학습목표, K-MOOC·HRD-Net 양식, NCS 직무능력 매핑, 자격증 한국형 출제 패턴(정보처리기사·SQLD·ADsP).
- **UZ·CIS**: DTM 국가시험·UZ 대학입시·IELTS/CEFR(past-exam), 트릴링구얼 교재·키릴/라틴(textbook), 한국어 화자 특화 우즈벡어(uzbek-tutor), CIS 학술 자원·РИНЦ(research-assistant). UZ 레퍼런스는 각 스킬의 `references/uz-*.md`.

## 다른 플러그인과의 경계

| 비슷해 보이지만 다른 영역 | 사용해야 할 스킬 |
|---|---|
| 학술 논문 본문 작성(KCI/IEEE 포맷) | `gil-research:paper-writer` |
| 연구비 신청서(NRF/IITP) | `gil-research:grant-writer` |
| 특허 검색·FTO 분석 | `gil-research:patent-search` |
| 사내 HR 교육·온보딩 체크리스트 | `gil-hr:employment-manager` |
| 어린이 발달 가이드 | `gil-lifestyle:wellness-coach` |
| 일반 마케팅·광고 카피 | `gil-content:copywriting` |

## 설치

Cowork → 설정 → Plugins → cowork-plugins에서 `gil-education` 선택.

## 참고자료

- [Anthropic 플러그인 가이드](https://code.claude.com/docs/en/plugins)
- [GIL 마켓플레이스](https://github.com/no77-ai-2026/gil-cowork-plugins) · 모태: [modu-ai/cowork-plugins](https://github.com/modu-ai/cowork-plugins) (MIT)
