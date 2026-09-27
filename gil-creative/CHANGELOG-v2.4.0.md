# CHANGELOG — GIL v2.4.0 (2026-09-15) — Chany's Studio 방법론 반영 + 실사 인물 프롬프트 문법 (마이너)

외부 플러그인 **chany-studio/chany-studio v2.8.1 (MIT)** 를 분석해 GIL에 없던 제작 통제 계약 6종과 새 능력 2종을 이식하고, 사용자 구매 자료(AI 인플루언서 가이드북 2권, 프롬프트 100개)의 문법을 GIL 오리지널로 재구성했다. 모태(modu-ai/moai-cowork d71addc, v1.2.5) 변경 없음.

## 버전
- gil 2.3.1 → **2.4.0**, gil-creative 2.2.1 → **2.4.0**, gil-commerce 2.2.1 → **2.4.0** (세 번들 모두 수정되어 통일)
- 스킬 298 → **302** (gil 148→149 / creative 96→99 / commerce 54)
- MCP 15 → **16** (gil-creative `reference-preview`, Node 로컬)
- 롤백: `gil-bundles-v2.3.1-clean/` · `gil-upload-v2.3.1/`

## 신규 스킬 4
| 스킬 | 번들 | 역할 |
|---|---|---|
| `industry-overlay` | gil-creative | 업종 11종(전문서비스·교육·의료·식음·숙박여행·공간부동산·디지털제품·공연행사·자동차·소비자테크·기업고용브랜드) 판별 → canonical `industry_direction` 패킷(증거 원장·금지표현·고지·리뷰 게이트) → 제작 스킬 인계. 플레이북 11종(정본 6·축약 5, 각 UZ 듀얼 주석) + `industry-taxonomy.json` |
| `reference-board` | gil-creative | 4레인(Pinterest·상업사진·수상광고·MeiGen) 출처 격리 레퍼런스 보드, 기본 6장 대화 내 표시, L1→L2 검색, 채점표, Visual DNA(direction-only) → creative-architect |
| `publication-review` | gil-creative | 게시 전 검수 4상태(`blocked / draft-only / ready-for-named-human-review / reviewed-by-named-owner`) × 5레인(주장·오퍼·발송·권리·플랫폼), 버전 결속·무효화, `official_sources[]` 날짜 미상은 `unknown`. Claude는 승인 상태로 스스로 올리지 못함 |
| `env-preflight` | gil | 로컬 실행 환경 4상태(`available / missing / not_observable / blocked`) 점검 — Node·uv·Python·npx·ffmpeg·한글 폰트 코드포인트·`~/.gil/mcp/*.json`·MCP 기동·OS·device_bash. 비파괴, 설치는 승인 후, Win/Mac 병기 |

## 공용 참고자료 9 (신규)
- `gil-creative/creative-wizard/references/campaign-state.md` — 캠페인 상태 YAML·버전 무효화 그래프·`specialist_handoffs[]` 귀속 레코드·`sensuality_level`
- `gil-creative/publication-review/references/publication-gate.md` — 4상태·5레인·인계 패킷 7항목
- `gil-creative/higgsfield-core/references/media-job-ledger.md`, `creative-quality-loop.md` — 산출물당 `media_job` 원장, **기본 2회 상한(초기 1 + 결함 교정 1)**, 미확인 응답 재제출 금지, accepted는 검수 후만
- `gil-creative/image-bridge/references/image-generation-runtime.md` — 이미지 모델 기본값 정직 표기(`selection_status`), 품질 결함·타임아웃은 교체 사유 아님
- `gil-creative/meta-ads-manager/references/platform-publication-adapter.md` — 발견사항 3분류, 쓰기·예산·활성화 **승인 3분리**, PAUSED 기본
- `gil-creative/image-bridge/references/photoreal-prompt-grammar.md` — **GIL 오리지널** 실사 인물 8칸 문법(인물→포즈→표정→의상→장소→조명→카메라→필름), AI 티 제거 어휘 28개, 로고·글자 규칙(`authorized_marks[]`), 6-Block 매핑, **수위 스위치 `sensuality_level 0|1|2`**(기본 0·UZ 0 고정·1 이상 게시 검수·성인·초상 금지), GIL 작성 예시 20개(한국 10 + UZ 10)
- `gil-creative/image-bridge/references/candid-moments-kr-uz.md` — 연출 아닌 찰나 장치 한국 15 + UZ 15, 감정여정 8단계 매핑
- `gil-creative/higgsfield-identity/references/virtual-model-preset.md` — 브랜드 가상 모델 외형 시트 12속성·50장면 일관성·`identity_authorities` 동의 레코드·성인·비실존 원칙

## 수정 스킬 18
- creative-wizard: 0단계 업종 오버레이, 3-1 레퍼런스 보드, 9-1 게시 전 검수, 캠페인 상태 레코드, 브리프에 industry·sensuality 추가 / creative-architect: 업종 패킷 필드 소비·버전 ID 기록
- higgsfield-core·image·video·identity·product·assets, image-bridge, codex-image: `## 유료 생성 원장·품질 루프 (v2.4.0 HARD)`
- gpt-image-2-prompt·gemini-3-image-prompt·midjourney-v8-prompt: 실사 인물 8칸 문법·수위 규칙 / design-slop-check: 이미지 AI 티 12항목 / higgsfield-identity: 가상 모델 프리셋
- meta-ads-manager: 승인 3분리·publication-review 최종 게이트 / gil-commerce marketplace-naver-ads·marketplace-coupang-ads: 라이브 집행 안전 가드
- gil-commerce commerce-ad-claim-compliance-kr·commerce-marketing-compliance-kr: 게시 검수 4상태 기록, "내보내도 돼?" 트리거 → publication-review 위임
- gil mcp-connector-setup: env-preflight 연결 / `project/references/core/common-rules.md`: §2.4 교차 번들 호출 시 실제 확인·`specialist_handoffs` 귀속, **§11 실사 인물 이미지·게시 검수 HARD 신설**

## MCP
- `gil-creative/mcp-servers/reference-preview/` — chany-studio 소스 무변경 vendor(server.mjs 899줄, 의존성 0, MIT LICENSE 동봉, 테스트 15 PASS). `.mcp.json` `reference-preview`(`node`, `alwaysLoad`). `check-plugin-runtimes.py` 오류 0. CONNECTORS.md ×3 절 추가.

## 로컬 전용 자료
- `gil-creative/skills/image-bridge/references/private/hanirum-general-50.md`, `hanirum-sexy-50.md` — 사용자 구매 가이드북 원문 프롬프트 100개. **로컬 설치본(.plugin)에만 포함**, 공개 저장소는 루트 `.gitignore`(`**/references/private/`)로 제외. 스킬은 파일이 있으면 읽고 없으면 GIL 예시 20개만 사용.

## 출처 표기
- NOTICE.md ×3에 chany-studio(MIT) 1행 + 가이드북 원문 처리 원칙 1행. PDF 유래 문법은 GIL 오리지널(v1.7.1 선례).

## 게이트 (전수 PASS)
꺾쇠·YAML·kebab·dir==name·moai 0·`gil-도메인:` 0·끊긴 교차참조 0·버전 302+3 지점 일치·zip 슬래시/plugin.json 최상위·check-plugin-runtimes 0·공개 repo `private/` 0건·신규 패킷 필수 필드 존재·MCP 서버 테스트.
