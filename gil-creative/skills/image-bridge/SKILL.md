---
name: image-bridge
description: |
  [한·UZ 듀얼 · gil-creative] 크리에이티브 설계의 이미지 프롬프트를 실제 이미지로 생성하는 외부 API 브리지입니다. OpenAI(gpt-image 계열)와 Google Gemini(Imagen/Gemini Image) 최신 모델을 BYOK(사용자 키)로 호출합니다. 비라틴·다국어는 배경만 생성하고 카피는 후조판합니다. 이미지 생성만 외부이고, 나머지 텍스트 지능은 Claude가 직접 수행합니다.
  다음과 같은 요청 시 사용하세요:
  - "이 프롬프트로 이미지 생성해줘"
  - "OpenAI/Gemini로 히어로 이미지 만들어줘"
  - "배경 이미지만 생성 (후조판용)"
  - "포스터 비주얼 렌더"
  - "rasm yaratish" (이미지 생성, UZ)
  프롬프트 설계는 gil-creative:gpt-image-2-prompt·gil-creative:gemini-3-image-prompt와, 커넥터 폴백은 gil-creative:higgsfield-image와 조합합니다. BYOK 키는 환경변수/세션에만 두고 저장·메모리 기록하지 않습니다.
version: "2.4.1"
---

# 이미지 브리지 (Image Bridge) — BYOK

> **역할** gil-creative:creative-architect가 만든 이미지 프롬프트를 OpenAI/Gemini 최신 이미지 모델로 렌더한다. **이미지 생성만 외부**, BYOK.
> **보안 원칙** 사용자 API 키는 **환경변수/세션에만** 둔다. 파일·메모리에 저장하지 않고, 로그·산출물에 노출하지 않는다.

---

## 1. 제공자·모델
- **OpenAI**: 최신 gpt-image 계열(구현 시점 최신 버전). 프롬프트 = gil-creative:gpt-image-2-prompt 산출.
- **Google Gemini**: Imagen / Gemini Image 계열. 프롬프트 = gil-creative:gemini-3-image-prompt 산출.
- **제공자 토글**: 사용자가 `--provider openai|gemini` 선택. 기본 = openai.
- **기본 모델·오버라이드 계약**: 요청 기본 모델은 `gpt-image-2`이며, 실제 해석 모델(`resolved_model`)·`selection_status`·오버라이드 3조건·유료 실행 규칙은 `references/image-generation-runtime.md`가 정본이다. `--provider gemini` 토글은 사용자 명시 요청으로 `override-approved`에 해당한다. 모델·제공자를 바꾸면 견적·승인·수락 레코드가 무효화된다.

---

## 2. 실행 옵션 (Cowork 제약 대응)

| 옵션 | 설명 | 우선순위 |
|---|---|---|
| **A. 샌드박스 직접 호출** | 스킬 스크립트가 API 직접 호출 (BYOK) | **Phase 1 우선** (네트워크 허용 검증 후) |
| B. 커넥터 경유 | `gil-creative:higgsfield-image` 등 커넥터로 생성 | A 실패 시 폴백 |
| C. 서버 프록시 | 자체 서버가 키 받아 프록시 | Phase 2 |

> **동작**: A를 먼저 시도(`scripts/generate_image.py`). 샌드박스에서 네트워크가 막히면 즉시 B(커넥터)로 폴백하고 사용자에게 안내한다.

---

## 3. 파라미터

| 파라미터 | 값 |
|---|---|
| `--provider` | openai \| gemini |
| `--size` / `--aspect` | 1:1 · 4:5 · 9:16 · 16:9 |
| `--mode` | flat(통이미지) \| overlay(배경만, 후조판) |
| `--prompt` | 구조 + 레이아웃 규칙 + 시장 톤 오버레이 |
| `--n` | 시안 수 |

- **비라틴·다국어**: `--mode overlay`로 **배경만 생성**. 카피는 빌더가 코드/디자인으로 후조판(§ gil-creative:creative-architect 방법론 #10). CIS 기본 overlay.

---

## 4. BYOK 설정
```
# 환경변수 (세션 한정, 저장 금지)
export OPENAI_API_KEY="sk-..."
export GEMINI_API_KEY="..."
```
- 키가 없으면 스킬이 입력을 요청하고, 세션 종료 시 폐기. 메모리 파일에 절대 기록하지 않는다(민감정보 규칙).

---

## 5. 스크립트
- `scripts/generate_image.py` — provider 토글로 OpenAI/Gemini 호출, size/aspect/mode 지원, 결과를 outputs 폴더에 저장. 네트워크 차단 시 커넥터 폴백 안내를 stderr로 반환.
- 사용: `python3 scripts/generate_image.py --provider openai --aspect 4:5 --mode overlay --prompt "..." --out hero_bg.png`

---

## 유료 생성 원장·품질 루프 (v2.4.0 HARD)

BYOK 호출도 사용자 비용이 나가는 유료 생성이다. 정본: `gil-creative:higgsfield-core/references/media-job-ledger.md`, `gil-creative:higgsfield-core/references/creative-quality-loop.md`, 그리고 이 스킬의 `references/image-generation-runtime.md`.

- **[HARD] 요청 산출물 1개당 `media_job` 레코드 1개.** `--n` 시안 수만큼 레코드를 만들고 `output_index`는 불변이다.
- **[HARD] 기본 시도 상한 2회** — 초기 생성 1회 + 결함 1종 교정 1회. 확대는 명시 승인 + 새 비용 체크포인트.
- **[HARD] 미확인 응답은 재제출 금지.** 스크립트 타임아웃·네트워크 끊김이면 제공자 응답·이력을 먼저 확인하고, 실패한 인덱스만 재시도한다. 커넥터 폴백(옵션 B)으로 넘어가는 것도 제공자 변경이므로 새 승인이 필요하다.
- **[HARD] `accepted`는 검수 후에만.** 저장 성공은 `retrieved`다. technical(치수·형식·투명·가독성)/creative(원본 충실도·구도·카피·세이프 에어리어) 두 게이트를 통과해야 하며 must-pass 실패는 평균 점수로 은폐하지 않는다.
- **[HARD] 승인 전 표시 항목:** `requested_default`(`gpt-image-2`) + `resolved_model`, `--provider`, 입력과 역할, 프롬프트 전문, size/aspect/mode/n, 제공자 보고 비용(없으면 `unavailable`), 배치 상한.
- 품질 결함·타임아웃은 제공자 토글 사유가 아니다. 키·토큰·임시 URL은 출력에 노출하지 않는다.

---

## 6. 체이닝
| 목적 | 스킬 |
|---|---|
| OpenAI 프롬프트 설계 | `gil-creative:gpt-image-2-prompt` |
| Gemini 프롬프트 설계 | `gil-creative:gemini-3-image-prompt` |
| 커넥터 폴백(옵션 B) | `gil-creative:higgsfield-image` |
| 설계 입력 | `gil-creative:creative-architect` |
| 포맷 합성 | `gil-creative:poster-ad-builder`·`gil-commerce:detail-page-image`·`gil-creative:print-creative-builder` |

> UZ/CIS 후조판·채널 규격은 `references/uz-image-bridge.md`.

---

## 실사 인물·수위 규칙 (v2.4.0)

실사 인물(AI 인플루언서·브랜드 가상 모델) 프롬프트를 이 브리지로 렌더할 때는 아래 세 파일을 먼저 적용한다.

| 파일 | 역할 |
|---|---|
| `references/photoreal-prompt-grammar.md` | 8칸 문법(인물→포즈→표정→의상→장소→조명→카메라→필름 + 부정 제약), AI 티 제거 어휘집, 로고 `authorized_marks[]` 규칙, 6-Block 매핑, 수위 스위치, GIL 예시 20개 |
| `references/candid-moments-kr-uz.md` | 찰나 장치 30개(한국 15·UZ 15), 1장면 1장치, 제품 결합법, 감정여정 8단계 매핑 |
| `../higgsfield-identity/references/virtual-model-preset.md` | 가상 모델 외형 시트 12속성, 50장면 일관성, `identity_authorities` 레코드 |

- **[HARD]** `sensuality_level` 기본 0. 시장 프로필 UZ/CIS·중동은 0 고정(오버라이드는 사유 + `gil-creative:publication-review` 통과). 1 이상은 레인 D 통과 전 draft-only. 모든 수위에서 성인 명시(`adult`, `in her/his 20s~50s`), 미성년 암시 금지어 blocker, 동의 레코드 없는 실존 인물 초상 금지.
- **[HARD]** 로고·글자는 기본 전부 배제. 광고용은 `authorized_marks[]`에 등록된 원본만 참조 이미지로 재현하고, 텍스트 카피는 `--mode overlay`로 후조판한다.
- **private 원문 규칙**: `references/private/hanirum-general-50.md`·`hanirum-sexy-50.md`는 로컬 전용(git-ignored)이다. **파일이 있으면 읽고 없으면 GIL 예시만 사용.** 원문은 예시로만 쓰고, 공개 산출물·공유 링크에 재배포하지 않는다.
