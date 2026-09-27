# GIL — Claude Cowork Plugins (한·UZ 듀얼)

![Version](https://img.shields.io/badge/version-2.4.0-blue) ![Plugins](https://img.shields.io/badge/plugins-3-green) ![Skills](https://img.shields.io/badge/skills-302-orange)

한국 표준 + 우즈베키스탄 듀얼 컨텍스트의 Claude Cowork 플러그인 마켓플레이스입니다.
"GIL — 한국과 중앙아시아를 잇는 길"

## 번들 구성

| 번들 | 스킬 | 버전 | 내용 |
|---|---|---|---|
| **gil** (코어) | 149 | 2.4.0 | 전략·컨설팅·문제해결(PSA)·검증형 리서치·오피스 문서(Word/PPT/Excel/한글/PDF)·데이터/공공데이터·법무·재무/세무·HR·CS·교육·연구·특허·ODA·생산성·커리어 + 에이전트 16 + MCP 6종(korean-law·korean-stats·archhub·kordoc·dart·context7) |
| gil-creative | 99 | 2.4.0 | 마케팅·콘텐츠·카피·디자인·광고 크리에이티브·이미지/영상/오디오·스토리 IP(웹툰·웹소설·시나리오)·출판 |
| gil-commerce | 54 | 2.4.0 | 스마트스토어·쿠팡·자사몰·UZ 채널(Uzum·OLX·Telegram·Yandex) 셀러 운영·상세페이지·광고 최적화·소상공인 루틴 |

## 설치

**방법 1 — 마켓플레이스 추가 (Claude Code)**

```
/plugin marketplace add no77-ai-2026/gil-cowork-plugins
/plugin install gil@gil-plugins
```

**방법 2 — 파일 업로드 (Claude 데스크톱/Cowork)**

각 번들 폴더를 zip으로 압축(`.plugin` 확장자, 내용물이 zip 루트에 오도록)한 뒤, Claude 데스크톱 앱 → 설정 → 플러그인 → 업로드.

## 사전 준비 (MCP 커넥터를 쓰려면)

| 도구 | 필요한 번들·서버 | 설치 |
|---|---|---|
| **uv** | gil(dart 런처) · gil-creative(threads-poster·ElevenLabs) · gil-commerce(smartstore·imweb·cafe24) | Windows: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 \| iex"` / macOS·Linux: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| **Node.js 18+** (dart는 20.19+) | gil(kordoc·dart·context7) | [nodejs.org](https://nodejs.org) LTS |

설치 후 Claude 앱을 재시작하세요. 없으면 해당 서버는 오류 없이 도구 목록에서 조용히 빠집니다.

**자격증명(API 키)** 은 플러그인 설치 시 뜨는 **입력 폼**(plugin.json `userConfig`)에 넣거나, 파일 `~/.gil/mcp/<서비스>.json`(Windows `C:\Users\<사용자>\.gil\mcp\`)에 저장합니다. `.mcp.json`의 `${KEY}` 환경변수 참조는 Claude 데스크톱에서 확장되지 않으므로 v2.3.1부터 쓰지 않습니다(각 번들 `CONNECTORS.md` 참조).

## v2.4.0 하이라이트 (2026-09-15) — 제작 통제 계약·실사 인물 프롬프트 문법

- **신규 4스킬** — `industry-overlay`(업종 11종 판별·업종 방향 패킷) · `reference-board`(출처 격리 레퍼런스 보드) · `publication-review`(게시 전 검수 4상태×5레인, Claude 자가 승인 불가) · `env-preflight`(로컬 실행 환경 4상태 점검)
- **공용 계약 9종** — 캠페인 상태·버전 무효화, 유료 생성 원장·기본 2회 상한, 광고 쓰기·예산·활성화 승인 3분리, 실사 인물 8칸 문법·수위 스위치(기본 0·UZ 0 고정)
- **MCP `reference-preview`** 추가(chany-studio MIT vendor) — 참고: chany-studio/chany-studio v2.8.1(MIT) 방법론 반영
- 사용자 구매 자료 원문(`references/private/`)은 공개 저장소에서 제외

## v2.3.1 하이라이트 (2026-09-03) — 모태 moai-cowork v1.2.5 동기화

- **MCP 자격증명 배선 수정** — `userConfig` 입력 폼 + `${user_config.KEY}` + 자체 서버 `CredentialStore`(환경변수 → `~/.gil/mcp/` 파일) + 제3자 서버 런처 `mcp-launch/mcp_launch.py`. Windows 기동 불가였던 context7 `/bin/bash` 배선 교정
- 검사기 `check-plugin-runtimes.py`로 배선 정합 게이트(오류 0)

## v2.3.0 하이라이트 (2026-09-02) — 모태 moai-cowork v1.2.4 동기화

- **승인 게이트** — Higgsfield 유료 소진·음성 복제·얼굴 사진·인스타 답글·디자인 파일 삭제 전 승인서 제시(런타임 중립)
- **humanize-korean 1.4.0** — 실증 교정 4건, LLM 정독 판정(Phase 2.5)·최종 검수(Phase 6), 영어 수사 구조 카테고리 N
- **◆최종본 한국어 감사 3단** — ai-slop → spell-check(민감도 public 시만) → humanize(마지막) + 체인 종단 「최종 검수」
- **슬라이드 정량 QA 의무화**(pt 환산 폰트 하한·아이콘 반복·제작 메타 노출 0), `/project` 인터뷰 8렌즈 도출·무응답≠거절
- 죽은 MCP 주소 4종 교체, Win/Mac 병기(pdf-writer GTK·CJK), `user-invocable: true` 제거

## v2.2.0 하이라이트

- **problem-solving** (신규) — PSA 문제 구조화: SCQ → 이슈화(3-Test: Fact/Fork/Action) → 로직트리 5유형 → 가설 QDT → Work Plan
- **research-verify** (신규) — 검증형 리서치: 출처 병기·[미검증]/[추정] 태그 → 3중 검증(팩트·출처·논리) → Red 반론 → 조건부 결론
- 기존 스킬 8종·에이전트 2종에 유기적 연동 라우팅 추가

상세 이력: `gil/CHANGELOG-v2.4.0.md`·`gil/CHANGELOG-v2.3.0.md`·`gil/CHANGELOG-v2.2.0.md` 및 각 번들 CHANGELOG.

## 라이선스

Apache-2.0 — 모태 [modu-ai/moai-cowork](https://github.com/modu-ai/moai-cowork) 차용·확장. 재배포 시 `LICENSE`·`NOTICE.md`를 함께 유지해 주세요. 제3자 구성요소는 각 라이선스 우선 (NOTICE.md 참조).
