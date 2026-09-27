---
name: higgsfield-assets
description: |
  Higgsfield MCP에서 이미지·영상 이외의 생성과 후처리를 다룹니다. 트리거: "이 사진을 3D 모델로 만들어줘", "GLB로 뽑아줘", "캐릭터 리깅해줘"
version: "2.4.0"
uz: n/a
origin: moai-cowork@61fac40 (v1.2.4, 2026-09-02 동기화)
---

# Higgsfield 에셋·후처리 (higgsfield-assets)

## 스킬 개요(상세)

Higgsfield MCP에서 이미지·영상 이외의 생성과 후처리를 다룹니다. 3D 메시(GLB) 생성·리깅·애니메이션,
오디오(효과음·앰비언스·음악·TTS), 완성 영상의 바이럴 점수 분석, 그리고 업스케일·리프레임·아웃페인팅·
배경 제거 같은 기존 에셋 후처리가 범위입니다.
다음과 같은 요청 시 사용하세요:
- "이 사진을 3D 모델로 만들어줘", "GLB로 뽑아줘", "캐릭터 리깅해줘"
- "효과음 만들어줘", "배경음악 깔아줘", "이 대본 한국어로 읽어줘"
- "이 광고 영상 훅이 괜찮은지 점수 내줘", "바이럴 가능성 분석"
- "이 이미지 4K로 키워줘", "세로 영상으로 리프레임", "배경 지워줘", "캔버스 넓혀줘"
모델 id·파라미터는 하드코딩하지 않고 models_explore로 라이브 조회합니다. 새 이미지·영상을 처음부터
만드는 요청은 higgsfield-image / higgsfield-video를 사용하세요.


> `gil-creative` | 3D · 오디오 · 영상 분석 · 후처리 (코어: `higgsfield-core`)

## 개요

`higgsfield-image`와 `higgsfield-video`가 "새 이미지·영상 만들기"를 담당한다면, 이 스킬은 **그 바깥의 네 영역**을 담당한다: 3D 에셋, 오디오, 완성 영상 분석, 그리고 이미 있는 에셋의 후처리.

호출 계약·비용 프리플라이트·namespace 해석은 코어를 따른다:
- 호출 계약: `../higgsfield-core/references/call-schema.md`
- 라이브 조회: `../higgsfield-core/references/catalog-protocol.md`
- 잡·비용·리드백: `../higgsfield-core/references/job-lifecycle.md`

## 트리거 키워드

3D, GLB, 메시, 리깅, 스켈레톤, 3D 모델링, 텍스처, PBR, 효과음, SFX, 앰비언스, 배경음악, BGM, 내레이션, TTS, 음성 합성, 보이스, 바이럴 예측, 훅 점수, 영상 분석, 업스케일, 4K, 리프레임, 아웃페인팅, 배경 제거, 누끼

## 네 영역과 진입점

| 영역 | 하는 일 | 상세 |
|---|---|---|
| 3D | 이미지·텍스트 → GLB 메시, 리깅, 애니메이션 | `references/3d.md` |
| 오디오 | 효과음·앰비언스·음악·TTS | `references/audio.md` |
| 분석 | 완성 영상의 주의·훅·리텐션 점수 | `references/analysis.md` |
| 후처리 | 업스케일·리프레임·아웃페인팅·배경 제거·모션 | 아래 §후처리 |

## 워크플로우

코어의 REQ-010 흐름을 그대로 따른다. 영역만 다를 뿐 순서는 같다.

1. **의도 → 영역·후보 좁히기.** 위 표에서 영역을 고르고, 해당 참조 파일로 후보 모델을 좁힌다. 파라미터를 단정하지 않는다.
2. **라이브 조회.** `models_explore(action:'get')`로 실제 제약을 가져온다. 3D·오디오는 모델별 파라미터 편차가 이미지·영상보다 크므로 이 단계를 건너뛰면 거의 실패한다.
3. **비용 프리플라이트.** `get_cost: true`로 `credits` 확인. 3D의 텍스처·리깅·애니메이션은 각각 추가 비용이므로, 옵션을 켠 상태의 비용을 확인한다.
4. **승인 게이트.** 크레딧이 나가기 전에 멈춘다 — 코어 §유료 생성 승인 게이트를 그대로 따른다. 프롬프트 전문·모델·입력 미디어·옵션·개수·`adjustments`·견적 크레딧을 보여주고 승인을 받는다. 3D에서 텍스처·리깅·애니메이션 옵션을 켰다면 **옵션별 추가 비용을 각각 보여준다** — 합계만 보여주면 어느 옵션이 비싼지 알 수 없다.
5. **생성.** 승인된 값으로만 호출.
6. **폴링·리드백.** `job_status`로 완료까지. `adjustments`가 있으면 사용자에게 보고한다.

## 후처리 (기존 에셋 변형)

새로 만들지 않고 이미 있는 에셋을 바꾸는 경우다. 각 작업에는 전용 도구가 있으므로, 같은 결과를 생성 모델로 재현하려 하지 않는다 — 전용 도구가 더 싸고 결과가 안정적이다.

| 요청 | 전용 도구 |
|---|---|
| 해상도 키우기 (이미지) | 이미지 업스케일 |
| 해상도 키우기 (영상) | 영상 업스케일 |
| 캔버스 넓히기 / 크롭 해제 | 아웃페인팅 |
| 영상 비율 변경 (가로↔세로) | 리프레임 |
| 배경 제거 / 투명 배경 | 배경 제거 |
| 모션 이식 / 리캐스트 / 퍼펫 | 모션 컨트롤 |

입력은 코어 규칙과 동일하게 `media_id` 또는 이전 잡의 `job_id`로 전달한다. 날것의 URL은 거부된다.

## 출력 형식

```
## Higgsfield 에셋 생성 결과
- 영역: [3D | 오디오 | 분석 | 후처리]
- 모델·도구: [models_explore로 확인한 실제 id]
- 적용 옵션: [텍스처·리깅·애니메이션 / 포맷·샘플레이트 / 등]
- 비용: [get_cost가 반환한 credits]
- Job ID / 결과 URL: [job_status completed]
- 서버 조정(adjustments): [있으면 그대로 보고]
```

## 주의사항

- 3D의 `enable_animation`은 `enable_rigging`을 요구하고, 텍스처 관련 옵션은 `should_texture`를 요구한다. 의존 관계를 어기면 오류다(→ `references/3d.md`).
- 리깅은 인간형(humanoid)에 맞춰져 있다. 동물·사물은 리깅 결과가 나쁠 수 있으며, 그 사실을 미리 알린다.
- 일부 오디오 모델은 라이브 스키마에 **게임 파이프라인 전용**으로 선언돼 있다. 범용 요청에 기본값으로 고르지 않는다(→ `references/audio.md`).
- 영상 분석은 미디어를 만들지 않고 **텍스트 리포트**를 반환한다. 생성 결과물을 기대하게 두지 않는다.
- 모델 id·파라미터를 추측하지 않는다 — 언제나 `models_explore`로 확인한다.
- 타인의 목소리를 동의 없이 복제하지 않는다.

## 유료 생성 원장·품질 루프 (v2.4.0 HARD)

3D·오디오·후처리 에셋 유료 생성은 코어 원장·품질 루프를 따른다. 정본: `gil-creative:higgsfield-core/references/media-job-ledger.md`, `gil-creative:higgsfield-core/references/creative-quality-loop.md`.

- **[HARD] 요청 산출물 1개당 `media_job` 레코드 1개.** `media_job_id`·`output_index`는 불변이며 배치 재시도에도 살아남은 항목의 번호를 다시 매기지 않는다.
- **[HARD] 기본 시도 상한 2회** — 초기 생성 1회 + 결함 1종 교정 1회(수락된 속성은 동결). 확대는 사용자 명시 승인 + 새 견적 체크포인트가 함께 있어야 한다.
- **[HARD] 미확인 응답은 재제출 금지.** 타임아웃·끊김·과금 불명이면 기존 잡 ID로 `job_status`·이력을 먼저 조회한다. 실패한 인덱스만, 과금 잡이 없음을 증명한 뒤 또는 새 승인 뒤에 재시도하고 수락된 형제는 재생성하지 않는다.
- **[HARD] `accepted`는 검수 후에만.** 제공자 `completed`는 `retrieved`까지다. technical(형식·길이·재생·무결성)/creative(원본 충실도·메시지·캠페인 일관성) 두 게이트가 모두 `pass`여야 하며 must-pass 실패는 평균 점수로 은폐하지 않는다.
- **[HARD] 승인 전 표시 항목:** 요청 기본 모델 + 실제 해석 모델, 입력 미디어와 역할, 프롬프트 전문, 조회 확정 옵션과 `adjustments`, 개수, 제공자 보고 비용·잔액(없으면 `unavailable`), 배치 상한. 이 중 하나라도 바뀌면 새 승인 버전이다.
- 품질 결함·타임아웃은 모델 교체 사유가 아니다. 모델·제공자를 바꾸면 견적·승인·수락 레코드가 무효화되므로 새 프리플라이트를 거친다.
- 영수증·토큰·임시 핸들은 원장 내부에만 두고 사용자 대면 출력에 노출하지 않는다. 수락 결과는 한 번만 표시한다.

## 관련 스킬

| 스킬 | 시점 |
|---|---|
| `gil-creative:higgsfield-core` | 코어: 호출 계약·비용·namespace |
| `gil-creative:higgsfield-image` | 선행: 3D 입력용 이미지 생성 |
| `gil-creative:higgsfield-video` | 선행: 분석·후처리 대상 영상 생성 |
| `gil-creative:higgsfield-explainer` | 후속: 오디오·클립을 설명 영상으로 조립 |
| `gil-creative:audio-gen` | 대안: ElevenLabs 기반 TTS·더빙 |
| `gil-creative:performance-report` | 후속: 분석 점수를 성과 리포트에 반영 |

## 출처

- [Higgsfield Skills (공식 agent 문서)](https://github.com/higgsfield-ai/skills) — `higgsfield-generate` v0.12.0 (MIT). 영역 구분과 바이럴 분석 해석 기준의 근거.
- 라이브 MCP 스키마 관측 (`models_explore` type=3d / type=audio) — 모델 목록·파라미터·의존 관계·게임 파이프라인 한정 표기의 근거. **Evidence tier: 1차.**
- 실제 파라미터는 런타임 `models_explore`가 유일한 진실원이다. 참조 파일의 값은 저술 시점 스냅샷이다.
