# GIL — 한국과 중앙아시아를 잇는 길

> `gil-cowork-plugins` · 한·CIS(우즈베키스탄) 듀얼 컨텍스트 도메인 전문가 AI 마켓플레이스

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Cowork](https://img.shields.io/badge/Claude-Cowork-blueviolet)](https://claude.ai)
[![Version](https://img.shields.io/badge/Version-1.0.1-blue)](CHANGELOG.md)
[![Plugins](https://img.shields.io/badge/Plugins-24-blue)](.claude-plugin/marketplace.json)
[![Skills](https://img.shields.io/badge/Skills-183-green)](.claude-plugin/marketplace.json)

**Claude Cowork 한국+우즈베키스탄 듀얼 컨텍스트 도메인 전문가 AI 마켓플레이스**

자연어 한 줄이면 사업계획서, 계약서 검토, 세금 계산, PPT 제작, 데이터 분석, 특허 검색, AI 이미지·영상·음성 생성, 메타 광고 진단, 한국 출판사 제출 원고 집필, Claude Design 보조, Higgsfield AI 미디어 생성, 트릴링구얼(한·러·우즈벡) 콘텐츠, EDCF·KOICA ODA 사업 기획까지 — **24개 독립 플러그인과 183개 전문 스킬**이 업무를 대신합니다.

> *Domain expert AI marketplace for [Claude Cowork](https://claude.ai). 24 plugins · 183 skills covering Korean + Uzbekistan dual context (trilingual: KR/RU/UZ) — business, marketing (with Meta Ads audit MCP), legal, finance, HR, content, commerce (Uzum·OLX·Telegram·Yandex), operations, education, lifestyle, product, support, document generation, data analysis, research/patents, book publishing, **Claude Design assist**, **Higgsfield AI media (image·video)**, and ODA (EDCF·KOICA·KSP) for Korea-Uzbekistan projects.*

---

## v1.0.1 — 2026-06-10

modu-ai/cowork-plugins **v2.15.0** 기반.

깨진 스킬 교차참조 16곳 정정(자동 체이닝 silent fail 방지) — `sbis365` 오타, `gil-content:detail-page-copy·image` 플러그인 오지정, `gil-domain-copywriting` 등 모태 잔재 네임스페이스 7곳 포함. `gil` 플러그인 설명 "MoAI 코어"→"GIL 코어". 레거시 추적 파일 13개(`gkuz-v2.0.0.bundle` 1.7MB 포함) 제거, git 이력 fresh-root 재구성. 콘텐츠 규모 불변(24 플러그인 · 183 스킬).


상세: [CHANGELOG.md](CHANGELOG.md)

---

## v1.0.0 — GIL 출범 (2026-05-31)

**GIL**(길)은 본 마켓플레이스의 새 이름입니다. 저자 이름 "길"이 곧 *road* 이고, 거주지 타슈켄트·사마르칸트가 실크로드의 심장이라는 점에서 — **한국과 중앙아시아를 잇는 길**이라는 정체성을 담았습니다. 네임스페이스를 `gil`/`gil-*`로 통일하고 전 플러그인을 **v1.0.0**으로 출범합니다.

- **24 플러그인 · 183 스킬** — 비즈니스·마케팅·법무·재무·HR·콘텐츠·커머스(Uzum·OLX·Telegram·Yandex)·운영·교육·리서치·출판·미디어·디자인·ODA(EDCF·KOICA) 등 한·CIS 듀얼 컨텍스트 전 도메인
- **한·UZ 듀얼 + 트릴링구얼(한·러·우즈벡)** 전면 — UZ 오리지널 자산(commerce UZ 4채널·research·education·book 경험서·language-tutor 어학 엔진 등)
- **글쓰기 품질 체인** `gil:ai-slop-reviewer → gil-content:humanize-korean → gil-content:korean-spell-check`
- **PPT 스타일 프리셋**(맥킨지/일반) · **language-tutor**(한국인→EN·RU·UZ / 외국인→KO) 등 오리지널 디벨롭 누적
- 네임스페이스 정합: 교차참조 757건 `gil*` 통일(이전 `gil-*`·`gkuz*` 0)

> 이전 이력: 본 프로젝트는 GKUZ(v2.x)로 개발되었으며, v1.0.0에서 GIL로 리브랜딩하며 버전을 재설정했습니다. 상세는 [CHANGELOG.md](CHANGELOG.md).

---

## 플러그인 카탈로그 (24개)

| 플러그인 | 설명 | 스킬 수 |
|---|---|---|
| [gil](./gil) | 코어 — `/project` init, 라우터, ai-slop-reviewer, humanize-korean, MCP 셋업 | 9 |
| [gil-business](./gil-business) | 사업계획서, 시장조사, IR, 소상공인 상권분석, 정부지원사업, UZ IT Park/SEZ | 10 |
| [gil-book](./gil-book) | 출판 풀스택: 컨셉서·페르소나·목차·약력·제안서·30+ 출판사·챕터·퇴고 + UZ 트릴링구얼 출판 | 8 |
| [gil-marketing](./gil-marketing) | 브랜딩, SEO, SNS, 캠페인, 메타 광고 운영(meta-ads-manager, v2.15 신규)·audit(meta-ads-analyzer) + 자체 MCP | 12 |
| [gil-legal](./gil-legal) | 계약서·NDA·컴플라이언스 + UZ 민법·상법·노동법 + IROS 등기부등본 | 5 |
| [gil-finance](./gil-finance) | 원천징수·부가세·K-IFRS·결산 + UZ NDS/NDFL + KRX·법원경매 | 6 |
| [gil-hr](./gil-hr) | 근로계약·4대보험·채용·평가 + UZ 노동법·외국인 노동허가 | 5 |
| [gil-content](./gil-content) | 카드뉴스·랜딩·상세·블로그·뉴스레터 + humanize-korean·html-report·바른한글 | 12 |
| [gil-design](./gil-design) 🆕 | Claude Design 보조: 6요소 브리프·DESIGN.md 합성·시니어 UX 프롬프트·핸드오프 분석·AI 슬롭 검수 + UZ 트릴링구얼 디자인 | 5 |
| [gil-commerce](./gil-commerce) | 네이버·쿠팡·D2C·크라우드펀딩·큐레이션·라이브·인플루언서·LTV/CAC·구독·VOC + UZ Uzum·OLX·Telegram·Yandex | 39 |
| [gil-operations](./gil-operations) | 결재·조달·SOP·벤더 + UZ zakupki.uz | 3 |
| [gil-education](./gil-education) | 강의·기출·교재·평가 + 우즈벡어 튜터 | 8 |
| [gil-lifestyle](./gil-lifestyle) | 여행(Silk Road·타슈켄트)·건강(할랄·UZ 약국)·이벤트 | 3 |
| [gil-office](./gil-office) | PPT·DOCX·XLSX·HWPX·트릴링구얼 PDF + 모던 디자인 시스템 + NotebookLM 슬라이드 프롬프트(v2.15 신규) + UZ Счёт-фактура | 6 |
| [gil-career](./gil-career) | 자기소개서·이력서·면접·포트폴리오 + 트릴링구얼·HeadHunter.uz | 4 |
| [gil-data](./gil-data) | CSV·Excel·공공데이터(KOSIS·stat.uz)·shadcn 대시보드 | 3 |
| [gil-research](./gil-research) | 논문·특허·연구비 + 연구 방법론·통계 분석·Devil's review | 10 |
| [gil-media](./gil-media) | Higgsfield 이미지·영상 직접 호출(v2.13 신규 2) + 이미지 프롬프트 빌더 3종 + ElevenLabs 음성 + 보존 미디어 12 | 18 |
| [gil-oda](./gil-oda) | GIL 전용: EDCF·KOICA·KSP 한·UZ 사업 (F/S·PCP·PDM·UN/WB/ADB 입찰) | 6 |
| [gil-product](./gil-product) | PM·UX 리서치·스펙 + 타슈켄트 IT Park 스타트업·러시아어 인터뷰 | 4 |
| [gil-support](./gil-support) | 티켓·KB·응대 + 러시아어/우즈벡어 CS·Telegram 채널 | 4 |
| [gil-pm](./gil-pm) | 한·UZ 다국적 팀 협업·KST/UZT 시차·트릴링구얼 주간 보고 | 1 |
| [gil-bi](./gil-bi) | 한·UZ 통합 BI·UZS/USD 환산·트릴링구얼 KPI | 1 |
| [gil-sales](./gil-sales) | 한·UZ B2B 제안서·KOTRA Tashkent·zakupki.uz | 1 |


---

## 총 산출물

| 항목 | 수량 |
|---|---|
| 플러그인 | **24** |
| 스킬 | **183** |
| UZ-tagged references | **94** |
| 동기화 지점 | **208** (HARD 일치) |
| MCP 서버 | **1** (gil-ads-audit) |


---

## 설치 방법

### Step 1: 마켓플레이스 추가

Claude Cowork 좌측 메뉴 → **사용자 지정** → 개인 플러그인 **+** → **마켓플레이스 추가** → URL 입력 후 **동기화**:

```
no77-ai-2026/gil-cowork-plugins
```

### Step 2: 플러그인 설치

동기화 완료 후 24개 플러그인 목록이 표시됩니다. **gil**(코어)를 먼저 설치한 뒤 필요한 도메인 플러그인을 추가합니다.

### Step 3: API 키·커넥터 등록 (선택)

| 환경 변수·커넥터 | 사용 스킬 | 발급처 |
|---|---|---|
| `Higgsfield` (OAuth) | gil-media/higgsfield-image·higgsfield-video | Cowork → 설정 → MCP → Higgsfield → Connect |
| `ELEVENLABS_API_KEY` | gil-media/audio-gen | [elevenlabs.io](https://elevenlabs.io/app/settings/api-keys) |
| `GEMINI_API_KEY` | gil-media/nano-banana | [ai.google.dev](https://ai.google.dev/) |
| `FAL_KEY` | gil-media/fal-gateway | [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) |
| `META_ACCESS_TOKEN` | gil-marketing/meta-ads-analyzer | `gil-marketing/CONNECTORS.md` 참조 |

### Step 4: 프로젝트 초기화

새 Cowork 프로젝트 채팅에서 `/project init` → 4-Phase 인터뷰(분야 → 플러그인 → API 키 → CLAUDE.md 자동 생성).

---

## 자연어 라우팅 예시

```
"Claude Design 브리프 만들어줘"    → gil-design/claude-design-brief (v2.13 신규)
"시니어 UX 프롬프트 빌더"          → gil-design/claude-design-prompt-builder (v2.13 신규)
"디자인 카피 AI 슬롭 검수"         → gil-design/claude-design-slop-check (v2.13 신규)
"Higgsfield로 이미지 만들어줘"     → gil-media/higgsfield-image (v2.13 신규)
"Veo 3로 광고 영상 생성"           → gil-media/higgsfield-video (v2.13 신규)
"출판 컨셉서 만들어줘"            → gil-book/book-concept-planner
"메타 광고 보고서 분석해줘"       → gil-marketing/meta-ads-analyzer
"메타 광고 만들어줘/예산 올려줘"   → gil-marketing/meta-ads-manager (v2.15 신규)
"NotebookLM 슬라이드 프롬프트"     → gil-office/notebooklm-slide-prompt (v2.15 신규)
"쿠팡 인플루언서 협업 기획"       → gil-commerce/commerce-influencer-collab
"EDCF 사업 F/S 작성"             → gil-oda/edcf-feasibility (GIL 전용)
"러시아어 비즈니스 회화 가르쳐줘"  → gil-education/language-tutor (v2.16 개편)
"한국어 가르쳐줘 (외국인)"         → gil-education/language-tutor (v2.16 개편)
"트릴링구얼 PDF 보고서"           → gil-office/pdf-writer (한·러·우)
"이 글 AI 같은 부분 다듬어줘"     → gil/humanize-korean
```

---

## 모태 및 차용 출처 (Attribution)

본 프로젝트는 다음 오픈소스를 기반으로 합니다 (모두 MIT):

| 프로젝트 | 차용 항목 | 라이선스 |
|---|---|---|
| [modu-ai/cowork-plugins](https://github.com/modu-ai/cowork-plugins) | v2.15.0 24 플러그인 183 스킬 모태 (gil-design·higgsfield·notebooklm·meta-ads-manager 포함) | MIT |
| [AgriciDaniel/claude-ads](https://github.com/AgriciDaniel/claude-ads) | gil-ads-audit MCP — 50-check matrix·가중치 스코어링 | MIT |
| [NomaDamas/k-skill](https://github.com/NomaDamas/k-skill) | 한국 특화 6종 (v2.0 누적) | MIT |
| [epoko77-ai/im-not-ai](https://github.com/epoko77-ai/im-not-ai) | humanize-korean (v2.1) | MIT |

**GIL 고유 추가**: UZ 듀얼 컨텍스트 (76 UZ references, 트릴링구얼), gil-oda 6 스킬 ODA 전용, gil-research 10 스킬, gil-commerce UZ 4 채널, gil-media 보존 12 스킬.

자세한 attribution: [mcp-servers/gil-ads-audit/NOTICE.md](mcp-servers/gil-ads-audit/NOTICE.md)

---

## 라이선스

[MIT](LICENSE)

## 문의

- 이슈/버그: GitHub Issues
- Email: no77show@gmail.com
