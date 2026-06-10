# Changelog

본 GIL Plugins 변경 이력은 [Keep a Changelog 1.1.0](https://keepachangelog.com/) 형식을 따릅니다.

모태: [modu-ai/cowork-plugins](https://github.com/modu-ai/cowork-plugins) (MIT)

---

## [1.0.1] — 2026-06-10 — 출범 전 정합성 패치

**깨진 교차참조 정정 + 레거시 제거 + 클린 이력.** 콘텐츠 규모 불변 (24 플러그인 · 183 스킬).

### Fixed
- 깨진 스킬 교차참조 9건 정정 (체이닝 silent fail 방지): `sbis365→sbiz365`(오타), `gil-commerce:copywriting→commerce-copywriting`, `gil-content:detail-page-copy·image→gil-commerce:`(4곳), `gil-content:email→gil-content:newsletter`, `gil-marketing:performance-marketing→performance-report`, `gil-marketing:seo-naver-kakao→seo-audit`(2파일), `gil-research:strategy-planner→gil-business:strategy-planner`(2곳)
- 존재하지 않는 네임스페이스 `gil-domain-copywriting` 7곳 정정 (커머스 문맥 → `gil-commerce:commerce-copywriting`, 브랜드 카피 문맥 → `gil-content:copywriting`)
- `gil` 플러그인 설명 "MoAI 코어" → "GIL 코어" (marketplace.json·plugin.json)
- `gil:skill-tester` 본문 yaml 예시 버전을 `<plugin-version>` 플레이스홀더로 변경 (일괄 버전 치환 오염 방지)
- 리브랜딩 잔여 미커밋 변경 반영 (`gil:project` references 3건 + `gil-profile-uz.md` 신규, `gkuz-profile-uz.md` 제거)

### Removed
- 레거시 추적 파일 13개 제거: `gkuz-v2.0.0.bundle`(1.7MB 구 git 이력) + 구버전 푸시 스크립트 12개
- git 이력을 fresh-root 단일 커밋으로 재구성 (구브랜드 이력·bundle blob 비공개화; 상세 이력은 본 CHANGELOG·로컬 백업에 보존)

### Changed
- 전 동기화 지점 208개 버전 `1.0.0 → 1.0.1`
- `PUSH-INSTRUCTIONS.md` v1.0.1 기준 현행화

---

## [1.0.0] — 2026-05-31 — GIL 출범 (리브랜딩)

**GKUZ → GIL 리브랜딩 + 전 플러그인 v1.0.0 출범.** 콘텐츠(24 플러그인·183 스킬)는 유지, 네임스페이스·브랜드·버전을 재설정.

### 변경 — 브랜드·네임스페이스
- 마켓플레이스 `gkuz-plugins` → **`gil-plugins`**, 표시명 **"GIL — 한국과 중앙아시아를 잇는 길"**
- 네임스페이스 `gkuz`/`gkuz-*`(24) → **`gil`/`gil-*`**, MCP `gkuz-ads-audit` → `gil-ads-audit`
- 교차참조 **757건** 통일 `gil*` (이전 `gil-*` 512 + `gkuz*` 245 정정 → gil-·gkuz 0)
- GitHub `no77-ai-2026/gkuz-cowork-plugins` → `gil-cowork-plugins`
- 전 버전 → **1.0.0** (marketplace 1 + plugin.json 24 + SKILL.md 183 = 208 지점)
- LICENSE/NOTICE/README/CLAUDE.md 브랜드 갱신, `modu-ai/cowork-plugins`(MIT) 등 어트리뷰션 보존

### 정체성
저자 이름 "길"=road=실크로드=한·CIS 가교. `gil` 단일 네임스페이스로 개인 브랜드·사업 정체성을 통합.

### 이전 이력 (GKUZ 브랜드, 아래)
v2.0.0~v2.17.1은 GKUZ 브랜드로 개발된 이력입니다(modu-ai/cowork-plugins MIT 모태 차용 + UZ 듀얼 오리지널 디벨롭). 리브랜딩으로 버전을 1.0.0으로 재설정했습니다.

---

## [2.17.1] — 2026-05-31

PATCH (GIL 오리지널 디벨롭). gil-office:pptx-designer에 PPT 스타일 프리셋 분기 신설. 24 플러그인·183 스킬 유지.

### 추가 — pptx-designer 스타일 프리셋
- 인터뷰 1단계에 **스타일 프리셋 선택**(맥킨지/일반/사용자지정) 신설. "맥킨지 스타일 PPT" 요청 시 자동 라우팅, 미지정 시 질문
- `references/mckinsey-style.md` 신규 — 컨설팅 덱 디자인 시스템(액션 타이틀·MECE·고스트덱), 네이비/블루/그레이/신호색 테마 토큰, **40 슬라이드 아키타입 카탈로그**(executive summary·BCG·KPI dashboard·roadmap·org·timeline·comparison 등 "언제 쓰나")
- description 트리거(맥킨지·컨설팅 덱) + gil-office keywords 보강
- 방법론 차용: [axlabs-mckinsey-pptx](https://github.com/seulee26/mckinsey-pptx) (MIT, AX Labs/이승필) — python-pptx 코드 미이식, 방법론만 pptxgenjs 재구현. NOTICE attribution 추가

### 버전
- 2.17.0 → 2.17.1 (208 지점)

---

## [2.17.0] — 2026-05-31

MINOR (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-book에 5번째 장르 프리셋 **경험서·실무회고**(GIL 오리지널) 신설. 24 플러그인·183 스킬 유지. Breaking change 없음.

### 추가 — gil-book 경험서 프리셋 (GIL 오리지널)
fieldnote-book-workflow(사용자 제공·자유 반영·개인 사용)에서 6요소를 발췌해 8 스킬에 반영(통째 이식 아님):
- **book-chapter-writer (大)**: §4 4→5 장르, §4-5 경험서 프리셋, 장(章) 단위 장면→맥락→원칙(30/40/30), 현장 노트·Before/After 보조 장치, [TODO] 마커 5종(FACT/SCENE/LINK/BA/REVIEW), 원재료(블로그·강의) 재구성 5규칙, 샘플 챕터 앵커. `references/uz-fieldnote.md` 신규
- **book-revision-coach (中)**: 경험서 문체 검증 행 + 통합 점검(장 간 용어·에피소드 중복·현장노트 순서) + [TODO] 전량 제거 확인
- **book-outline-designer (中)**: 경험서 분량·목차 패턴(도입→시행착오→체계→성찰)
- **book-concept-planner/target-reader/author-bio (小)**: 경험서 포지셔닝·JTBD·신뢰 신호(실무 경력 우선)
- **book-proposal-writer/publisher-matcher (최소)**: 장르 4→5 매핑
- 6 스킬 description UZ 트리거 + GIL 오리지널 명시

### 버전
- 2.16.4 → 2.17.0 (208 지점)

---

## [2.16.4] — 2026-05-31

PATCH (GIL 오리지널 디벨롭). language-tutor EN 팩 풀 커버리지. 24 플러그인·183 스킬 유지.

### 변경 — language-tutor EN 팩 풀 커버리지
- `en-soundblock-drills.md` 전면 확장 — 전 블록 그룹(be동사 4·It's/there·be-ving/be-pp·wanna/want-you-to/just-wanted/like/think/ve-got/have-to/know·조동사·코어동사 have/make/get/take/do/go/keep·디테일블록) 시그니처 구문 + 샘플 드릴(순한맛/매운맛/답안)
- `en-business-examples.md` — 전 40강 상황 커버리지 인덱스 추가(동사뱅크 67개가 전 상황 커버 확인)

### 버전
- 2.16.3 → 2.16.4 (208 지점)

---

## [2.16.3] — 2026-05-31

PATCH (GIL 오리지널 디벨롭). language-tutor EN 팩 예문·연습 확장. 24 플러그인·183 스킬 유지.

### 추가 — language-tutor EN 팩 컴패니언 (교재 기반)
- `references/en-business-examples.md` — 핵심 상황(검토·확인·공유·요청·일정·피드백) 예문+꿀팁 + 상황 다이얼로그(빈칸) + 순서배열 연습+답안
- `references/en-soundblock-drills.md` — 블록별(be동사·It's·wanna·have to·think) 순한맛(빈칸)/매운맛(한→영)/답안(영어+IPA+한국어) 드릴
- SKILL.md: business=verbs+examples+cis, life=soundblock+drills+contrastive 연계

### 버전
- 2.16.2 → 2.16.3 (208 지점)

---

## [2.16.2] — 2026-05-31

PATCH (GIL 오리지널 디벨롭). language-tutor EN 팩 교재 기반 심화. 24 플러그인·183 스킬 유지.

### 추가 — language-tutor EN 팩 (교재 기반, 사용자 제공·개인 사용·자유 반영)
- `references/en-business-verbs.md` — 비즈니스 필수동사 교재 기반: 상황별 동사 뱅크(검토·확인·공유·수정·승인·작성·피드백·참고·보고·일정·연기·취소·조사·요청·진행) casual↔formal 뉘앙스 + 5단계 레슨 포맷(한눈에→예문→Good to know→상황→순서배열 드릴) + 정중 요청 패턴
- `references/en-soundblock.md` — 소리블록 1단계 교재 기반: 블록(chunk) 스피킹 인덱스(be/It's/wanna/think/have to/코어동사 have·make·get·take·do·go·keep/디테일블록) + 3단 훈련(순한맛 빈칸/매운맛 한→영/쉐도잉) + 소리튠 발음기호 대조표(IPA 자가점검)
- SKILL.md: EN business=business-verbs+cis, life/회화·발음=soundblock+contrastive 연계

### 버전
- 2.16.1 → 2.16.2 (208 지점)

---

## [2.16.1] — 2026-05-30

PATCH (GIL 오리지널 디벨롭). language-tutor 전면 개편 Phase 2a — **EN(영어) 언어 팩 lean 추가**. 24 플러그인·183 스킬 유지.

### 추가 — language-tutor EN 팩 (lean)
- `references/en-cis-business.md` — CIS 맥락 비즈니스 영어(언제 영어를 쓰나·필수 표현·이메일/협상·CIS 주의·레지스터)
- `references/en-contrastive-ko.md` — 한·영 구조 대조·한국인 빈출 오류(관사·복수·시제·콩글리시)·발음 자가점검(최소대립쌍 R/L·F/P·TH 등)
- SKILL.md: EN을 "활성"으로 전환(RU·KO는 Phase 2b~3 예정)

### 버전
- 2.16.0 → 2.16.1 (208 지점)

---

## [2.16.0] — 2026-05-30

MINOR (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-education `uzbek-language-tutor` → **`language-tutor`** 전면 개편 Phase 1. 24 플러그인·183 스킬 유지(스킬 rename). Breaking: 스킬명 변경.

### 변경 — language-tutor (구 uzbek-language-tutor)
- **rename**: uzbek-language-tutor → language-tutor. UZ 레퍼런스 uzbek-*.md → uz-*.md(grammar·pronunciation·vocab·culture), uz-korean-learner → uz-contrastive-ko
- **범용 어학 튜터 엔진(명령형)** 으로 재작성: 청중 라우팅(`--audience korean`→en·ru·uz / `foreign`→ko) + 5모드(placement·lesson·drill·conversation·review) + 입력 슬롯 + 발음 자가점검(IPA·L1근사·최소대립쌍) + CIS 비즈니스 맥락
- **UZ 팩 활성**, RU·EN·KO 팩은 Phase 2~3 예정(엔진·라우팅은 이미 지원). 미검증 수치 단정 금지 명시
- 교차참조 8곳 정정(assessment-creator·curriculum-designer·textbook-builder refs, gil-education README, 루트 README)

### Migration
- 스킬 호출명 `uzbek-language-tutor` → `language-tutor`. 우즈벡어 학습은 `/language-tutor --audience korean --target uz`.

### 버전
- 2.15.5 → 2.16.0 (208 지점)

---

## [2.15.5] — 2026-05-30

PATCH (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-education 스킬별 약점·갭 콘텐츠 보완(패러다임 유지, 개인화 스타일 통일은 다음 단계). 24 플러그인·183 스킬 유지. Breaking change 없음.

### 변경 — gil-education 약점·갭 보완
- assessment-creator: 이원목적분류표(test blueprint) 양식 + 문항 유형별 실제 예시(선택형/서답형/수행) + 오답 분석표 양식
- curriculum-designer: 분야별 설계 예시(어학·자격증·직무역량·학위) 다양화
- textbook-builder: 산출 핸드오프 스펙(docx/pdf/슬라이드) + 교사용 지도서 양식
- past-exam-analyzer: 입력 모드 3분기(데이터 기반 / 구조 분석 / 부분) — 데이터 없을 때 허위 통계 금지 명시
- research-assistant: gil-research와 역할 경계 재정의(교육 자료조사 vs 학술 출판) + 위임 체인
- uzbek-language-tutor: 플러그인 내 포지션 명확화(유일 학습자용 스킬)

### 버전
- 2.15.4 → 2.15.5 (208 지점)

---

## [2.15.4] — 2026-05-30

PATCH (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-education 플러그인 8 스킬 전체 종합 디벨롭. 24 플러그인·183 스킬 유지. Breaking change 없음.

### 변경 — gil-education 네임스페이스 정정
- modu 출신 5종(course-curriculum-design·course-followup-sequence·curriculum-designer·assessment-creator·research-assistant)의 `gil-` 교차참조 **39건 → gil**로 정정(rebrand-namespace.py, 플러그인 한정). 체이닝 복구

### 변경 — GIL 오리지널 3종 UZ 주입
- past-exam-analyzer·textbook-builder·uzbek-language-tutor에 `[한·UZ 듀얼]` 태그 + UZ 트리거 + 듀얼 컨텍스트 노트
- uz-*.md 3종 신규: uz-exams(DTM·IELTS)·uz-textbook(트릴링구얼 교재)·uz-korean-learner(한국어 화자 학습 로드맵)

### 변경 — 얇은 modu 3종 콘텐츠 보강
- assessment-creator(+문항 설계·타당도/신뢰도·루브릭 심화)·research-assistant(+PRISMA·인용 충실성·인용 무결성, uz-academic-resources 신규)·curriculum-designer(+백워드 설계·역량 매핑 심화)
- 3종에 `[한·UZ 듀얼]` 태그 + 듀얼 컨텍스트 노트 추가

### 변경 — 파이프라인·README
- gil-education README 전면 정비(gil-→gil, 5→8 스킬, 학습콘텐츠·강사운영·학술언어 3 파이프라인 체이닝, UZ 듀얼 섹션)

### 버전
- 2.15.3 → 2.15.4 (208 지점). UZ-tagged 파일 85 → 89

---

## [2.15.3] — 2026-05-30

PATCH (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-research 고유 5에 UZ 주입 + AI 연구 무결성/인용 충실성 개념 clean-room 보강 + 파이프라인 체이닝. 24 플러그인·183 스킬 유지. Breaking change 없음.

### 변경 — gil-research 고유 5 (GIL 오리지널, UZ 주입)
- devil-review·journal-selection·journal-style-adapter·research-analysis·research-methodology에 `[한·UZ 듀얼]` 태그 + UZ 트리거 + 듀얼 컨텍스트 노트
- uz-*.md 5종 신규: uz-review-context(УзВАК·ВАК 심사)·uz-cis-journals·uz-gost-citation(ГОСТ 7.0.5)·uz-research-data(stat.uz)·uz-field-context(트릴링구얼 설문·IRB)

### 추가 — clean-room 개념 보강 (공개 방법론 기반, 외부 라이선스 미차용)
- devil-review: "AI 연구 무결성 게이트"(7 실패유형 차단 체크리스트) + "인용 충실성(claim-faithfulness) 점검"(지지/부분/무관/반대 라벨)
- research-methodology: "AI 보조 연구 — 인간 in-the-loop 무결성"(검증 책임 분리·출처 검증·게이트 연계)
- ⚠️ Imbad0202/academic-research-skills(CC-BY-NC-4.0)의 문구·코드·파일은 일절 미복사. 공개적으로 알려진 방법론 개념만 GIL 독자 표현으로 구현, 구체 논문 인용은 외부 검증 권고 명시.

### 추가 — 연구 파이프라인 체이닝
- devil-review·research-methodology에 research-methodology→paper-search/writer→research-analysis→devil-review→journal-style-adapter→journal-selection 체인 + gil:ai-slop-reviewer·gil-content:humanize-korean·gil-data:public-data 연계 명시

### 버전
- 2.15.2 → 2.15.3 (208 지점). UZ-tagged 파일 80 → 85

---

## [2.15.2] — 2026-05-30

PATCH (GIL 오리지널 디벨롭, 모태 동기화 아님). gil-commerce UZ 전용 4채널 스킬을 47줄 스텁 → 본격 운영 스킬로 확장. 24 플러그인·183 스킬 유지. Breaking change 없음.

### 변경 — gil-commerce UZ 4채널 (GIL 오리지널)
- `marketplace-uzum` 47 → 105줄 — Uzum 생태계(Market·Bank 할부·Delivery·Tezkor)·입점·수수료·트릴링구얼 SEO·광고·결제·정산·CS·체이닝
- `marketplace-olx` 47 → 79줄 — C2C/비즈니스 유형·등록·VIP 노출·한국 셀러 적합성(소량·도매·서비스)
- `telegram-commerce` 47 → 87줄 — 3모델(Channel·Bot·Shop)·결제(Click·Payme·Uzum Pay)·Telegram Ads
- `yandex-market` 47 → 75줄 — 러시아 직판 + UZ Yandex Direct 광고 두 역할·EAEU 입점·UZ 진출 시나리오
- 4종 모두 `[한·UZ 듀얼]` 태그 + 한국/UZ 트리거 보강, **깨진 reference 경로 정정**(`references/Uzum Market-guide.md` → `references/uzum-guide.md` 등)

### 버전
- 2.15.1 → 2.15.2 (208 지점)

---

## [2.15.1] — 2026-05-30

PATCH (GIL 오리지널 디벨롭, 모태 동기화 아님). humanize-korean을 im-not-ai v2.0.0 기준으로 강화 + 휴머나이징 체인 네임스페이스 정정 + 네임스페이스 자동화 자산 신설. 24 플러그인·183 스킬 유지. Breaking change 없음.

### 변경 — gil-content:humanize-korean (정본 SSOT, im-not-ai v1.6.1 → v2.0.0)
- `ai-tell-taxonomy.md` 490 → **587줄 (60+ 패턴)**
- `scripts/metrics_v2.py` 신규 — post-editese 3축(simplification·normalisation·interference) + 번역투 8종(T1~T8), v1.6 함수 회귀안전 import
- `references/baseline_v2.json`·`references/scholarship.md`(학술 근거 SSOT) 신규
- `rewriting-playbook.md`·`quick-rules.md`·`web-service-spec.md` v2.0 반영
- 규칙 7 준수: 실행 자산(`metrics.py`·`metrics_v2.py`)을 `references/` → **`scripts/`** 이동
- GIL 고유 `strict-pipeline-spec.md` 보존, attribution v1.6.1 → **v2.0.0**

### 변경 — gil:humanize-korean (코어)
- 정본(gil-content) 위임 **경량 포인터**로 단일화 (270 → 59줄, 중복 taxonomy 제거)

### 변경 — 휴머나이징 체인 네임스페이스 정정
- `gil:ai-slop-reviewer` · `gil-content:humanize-korean` · `gil-content:korean-spell-check` 호출 **97건**(53파일)을 `gil-*` → `gil*`로 교정 (자동 체이닝 정상화)

### 추가 — 네임스페이스 자동화 자산 (모든 업데이트 적용)
- `scripts/rebrand-namespace.py` — gil-*→gil* 콜론/슬래시 호출 자동 정정, 어트리뷰션 보존, 미매핑 플래그, `--only` 스코프
- `scripts/namespace-map.json` — 매핑 SSOT (23 plugin + literal gil-ads-audit)

### 버전
- 2.15.0 → 2.15.1 (marketplace 1 + plugin.json 24 + SKILL.md 183 = 208 지점)

---

## [2.15.0] — 2026-05-30

MINOR. **modu-ai/cowork-plugins v2.15.0 동기화** (GIL v2.13.0 → v2.15.0, 모태 v2.13.0 → v2.15.0 누적). 24 플러그인 유지, 181 → **183 스킬**, 동기화 지점 206 → **208**. Breaking change 없음. 기존 GIL 플러그인 아이덴티티·운영 방식 유지.

### 모태 동기화 — v2.13.0 → v2.15.0 누적
- v2.14.0: gil-design claude-design-prompt-builder·claude-design-handoff-reader 본문 보강 (프론티어 미디어 프로토타입·Canva 두 경로 분기), 루트 README 카탈로그 정정
- v2.14.1: gil-office 신규 `notebooklm-slide-prompt` (NotebookLM 슬라이드 데크 + 나노바나나 이미지 프롬프트 빌더, 49 시각 스타일 라이브러리)
- v2.15.0: gil-marketing 신규 `meta-ads-manager` (Meta 공식 Ads AI Connectors OAuth 라이브 운영), meta-ads 커넥터 OAuth 정정·서드파티 fallback 3종 제거

### 추가 — gil-office:notebooklm-slide-prompt (HARD 6 UZ 주입)
- 강연·강의 본문 MD → NotebookLM Studio 슬라이드 데크 프롬프트(공식 4축) + 슬라이드별 나노바나나 5-Component 이미지 프롬프트 동시 산출
- `references/slide-style-library.md` 49 시각 스타일 × 8 카테고리 라이브러리 포팅
- `references/uz-notebooklm-slides.md` 신규 — 트릴링구얼(한·러·우즈벡) 강연 슬라이드 출력 언어 분기·이미지 텍스트 가드
- `pptx-designer`(실제 .pptx 생성)와 페어 분리 명시

### 추가 — gil-marketing:meta-ads-manager (HARD 6 UZ 주입)
- Meta 공식 Ads AI Connectors(`https://mcp.facebook.com/ads`, OAuth 2.0) 기반 라이브 광고 운영 — 생성·수정·예산·온오프
- 안전 가드: 신규 리소스 PAUSED 기본 + 쓰기·결제 매번 사용자 승인 + 토큰 비노출
- `references/uz-meta-ads.md` 신규 — UZ 한인·고려인 타겟 지역·언어(러·우즈벡)·통화(UZS/USD) 운영 가이드
- 보고서 분석(`meta-ads-analyzer`)·픽셀 검증(`pixel-audit`)·기획(`campaign-planner`)과 페어 분리

### 변경 — gil-marketing 커넥터 정정
- `CONNECTORS.md`: `meta-ads` 인증 정적 `META_ACCESS_TOKEN` → Meta Business OAuth 2.0 커넥터 흐름 (RFC 9728 + RFC 6750, scope `ads_management ads_read catalog_management business_management pages_show_list`)
- 서드파티 오픈소스 fallback 3종(Adspirer·byadsco/meta-ads-mcp·pipeboard) 제거, Meta 공식 단일화. 정적 토큰은 개발 fallback으로 강등
- 자체 `gil-ads-audit` MCP(한국 50-check audit) 유지

### 변경 — gil-design 본문 보강 (v2.14.0 반영)
- `claude-design-prompt-builder`: 보조 패턴 "프론티어 미디어 프로토타입"(WebGL 셰이더·Three.js 3D·Web Audio·캔버스) 표 추가. 한·UZ 듀얼 마커 유지
- `claude-design-handoff-reader`: "두 경로 분기"(Claude Code 빌드 vs Canva 마케팅 후속) 표 추가. 한·UZ 듀얼 마커 유지

### 버전 동기화 (208 지점)
- marketplace.json metadata.version 1 + plugin.json × 24 + SKILL.md frontmatter × 183 = **208** 모두 2.15.0
- plugin.json keywords/description: gil-office(+NotebookLM)·gil-marketing(+Meta 광고·meta-ads-manager)

### UZ 보존 HARD 100%
- gil-oda 6 + gil-education 고유 3 + gil-research 고유 5 + gil-commerce UZ 4 + gil-media 보존 12 + humanize-korean 전량 보존
- UZ-tagged references 78 → **80** (신규 2)

---

## [2.13.0] — 2026-05-20

MINOR. **modu-ai/cowork-plugins v2.13.0 동기화** (GIL v2.1.0 → v2.13.0, 모태 v2.11.1 → v2.13.0 누적). 23 → **24 플러그인**, 174 → **181 스킬**, 동기화 지점 198 → **206**. Breaking change 없음.

### 모태 동기화 — v2.11.1 → v2.13.0 누적
- v2.12.0: 신규 플러그인 `gil-design` (5 스킬)
- v2.12.1: gil-office docx-generator·pptx-designer 모던 디자인 시스템 보강
- v2.12.2 / v2.12.3: gil-content card-news 보강·정련
- v2.13.0: gil-media 신규 2 스킬 (higgsfield-image·higgsfield-video)

### 추가 — gil-design 신규 플러그인 (5 스킬, HARD 6 UZ 주입)
Claude Design(claude.ai/design) 보조 풀스택. gil-design 포팅 + 한·UZ 듀얼 컨텍스트.

- `claude-design-brief` — Claude Design 6요소 브리프 빌더 + UZ 트릴링구얼 브리프
- `claude-design-system-prep` — 브랜드 자산 → DESIGN.md 합성 + 키릴·라틴 폰트 디자인 시스템
- `claude-design-prompt-builder` — 시니어 UX 10패턴 프롬프트 + UZ 다국어 UX CONTEXT
- `claude-design-handoff-reader` — Claude Code 핸드오프 번들 분석 + i18n(ko/ru/uz) 토큰 점검
- `claude-design-slop-check` — AI 슬롭 카피 검수 + 러시아어·우즈벡어 진부 표현 사전

### 추가 — gil-media 신규 2 스킬 (HARD 6 UZ 주입)
- `higgsfield-image` — Higgsfield MCP 직접 호출, 공식 11 이미지 모델 + UZ 트릴링구얼 텍스트 렌더링
- `higgsfield-video` — Higgsfield MCP 직접 호출, 공식 11 영상 모델·6 비디오 프리셋 + UZ Telegram·Yandex 채널
- gil-media `.mcp.json` — Higgsfield hosted MCP(OAuth) 서버 추가, ElevenLabs 유지
- gil-media `CONNECTORS.md`·`plugin.json` — Higgsfield 커넥터·키워드 확장

### 변경 — 기존 스킬 동기화
- `gil-office:docx-generator` — SKILL.md(모던 디자인 시스템) + modern-design-system.md·modern-templates.md·qa-checklist.md 추가
- `gil-office:pptx-designer` — SKILL.md + curated-palettes.md·slide-archetypes.md·typography-pairings.md·qa-checklist.md 추가
- `gil-content:card-news` — SKILL.md(10 구성 패턴·통합 프롬프트) + prompt-templates.md 추가

### 보존 (HARD) — UZ 듀얼 컨텍스트 100%
- gil-oda 6 / gil-education 고유 3 / gil-research 고유 5 / gil-commerce UZ 4 / gil-media 보존 12 / gil humanize-korean
- gil-office 기존 UZ refs (uz-business-templates·uz-document-formats·uz-gov-presentation·uz-pptx-design) 유지
- UZ-tagged references: **76** (기존 69 + 신규 7 — gil-design 5 + gil-media higgsfield 2)

### 변경 — 버전 동기화
- `marketplace.json` — 24 플러그인 목록 + v2.13.0 + 누적 description
- `plugin.json` × 24 — version 2.13.0 (gil-design 신규, gil-media keywords Higgsfield 확장)
- 모든 `SKILL.md` × 181 — frontmatter version 2.13.0 통일
- 동기화 지점 206 (marketplace 1 + plugin.json 24 + SKILL.md 181)

### 인프라
- `mcp-servers/gil-ads-audit` — modu-ai v2.13.0 변경분 없음, 현행 유지

---

## [2.1.0] — 2026-05-19

### 모태 동기화
- **modu-ai/cowork-plugins v2.11.1** 기반 (v2.0.0 → v2.11.1 누적 변경분 통합)
- 신규 플러그인 **gil-book → gil-book** (8 스킬) 포팅 완료
- 23 GIL 플러그인 / 174 스킬 / 198 동기화 지점 모두 v2.1.0 일치

### 추가 — gil-book 신규 플러그인 (8 스킬, HARD 6 UZ 주입)
한국 출판사 제출용 원고 집필 풀스택. UZ 한인사회·고려인 디아스포라·트릴링구얼 출판 듀얼 컨텍스트.

- `book-concept-planner` — 도서 컨셉서 (4 장르 자동 분기) + UZ 한인 출판 컨셉
- `book-target-reader` — JTBD 페르소나 + UZ 한인 4 페르소나
- `book-outline-designer` — 8장 모델 목차 설계 + 트릴링구얼 챕터 옵션
- `book-author-bio` — 한국 표준 약력 + UZ 한인 고려인 세대 표기
- `book-proposal-writer` — KPIPA 제안서 + UZ 시장 추가 분석
- `book-publisher-matcher` — 30+ 한국 출판사 매칭 + UZ 한인협회·CIS 채널
- `book-chapter-writer` — 챕터 집필 가이드 + 트릴링구얼 패턴
- `book-revision-coach` — 7단계 퇴고 + UZ 한인협회 감수 8단계

### 추가 — gil-commerce 13 / gil-media 3 / gil-content 1 신규 (UZ 트리거 주입)
- commerce: early-fan-builder·influencer-collab·ltv-cac-architect·marketing-compliance-kr·product-image-pipeline·promotion-planner·push-planner·repurchase-timer·review-aggregator·season-calendar·subscription-strategist·trend-namer·voc-triage
- media 신규 3: gemini-3-image-prompt·gpt-image-2-prompt·midjourney-v8-prompt + 보존 12
- content 신규: detail-page-planner

### 보존 (HARD) — UZ 듀얼 컨텍스트 100%
- gil-oda 6 / gil-education 고유 3 / gil-research 고유 5 / gil-commerce UZ 4 / gil-media 보존 12 / humanize-korean
- UZ-tagged references: 67+ (신규 8 gil-book + 기존 60+ 보존)

### 변경
- `plugin.json` × 23 — version 2.1.0, keywords UZ 머지 일관 적용
- `marketplace.json` — 23 플러그인 + v2.1.0
- 모든 `SKILL.md` × 174 — frontmatter version 2.1.0 통일

### 인프라
- `mcp-servers/gil-ads-audit` — modu-ai v2.11.1 변경분 머지, NOTICE.md attribution 유지

---

## [2.0.0] — 2026-05-17 (이전)

modu-ai v2.5.0 기반. 자세한 이력은 `CHANGELOG-v2.0.0.md` 참조.

---

## Attribution

본 GIL는 MIT 라이선스 하에 다음 프로젝트 차용:
- **modu-ai/cowork-plugins** (MIT) — 모태
- **AgriciDaniel/claude-ads v1.5.1** (MIT) — gil-ads-audit MCP 방법론
- **NomaDamas/k-skill** (MIT) — 한국 특화 6종
- **epoko77-ai/im-not-ai** (MIT, ⭐937+) — humanize-korean
