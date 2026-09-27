# virtual-model-preset.md — 브랜드 가상 모델 프리셋

> `higgsfield-identity` | 브랜드 전용 **비실존 성인** 가상 모델을 정의하고, 50장면에서 같은 사람으로 보이게 유지하는 규칙.
> 프롬프트 문법은 `gil-creative:image-bridge/references/photoreal-prompt-grammar.md`(8칸·수위 스위치), 경로 판정은 `soul-vs-elements.md`.

**Evidence tier:** 계약 문서 (외형 시트·레코드 구조는 GIL 정책, 생성 결과의 일관성은 모델·버전에 따라 달라짐)

---

## 1. 원칙 (HARD)

- **[HARD] 성인·비실존.** 가상 모델은 `adult_age_range`가 20s~50s 안에 있고, 실존 인물(연예인·인플루언서·고객·직원)을 닮게 설계하지 않는다. 프롬프트·시트·참조 이미지 어디에도 실존 인물 이름을 쓰지 않는다.
- **[HARD] 실존 인물 학습은 서면 동의 없이는 blocker.** 사람 사진이 참조로 들어오는 순간 SKILL.md 0단계 게이트가 먼저 걸린다. `face_use_consent_status: confirmed` + `consent_record_id`가 없으면 업로드·Element 생성·Soul 학습 모두 하지 않는다. "가상 모델 시트를 만들 참고용"이라는 이유로도 예외가 없다.
- **[HARD] 외형 시트 12속성은 캠페인 중 바꾸지 않는다.** 바꾸면 다른 사람이다 — 새 `identity_authority_id`를 발급하고 기존 accepted 자산과 섞지 않는다.
- **[HARD] 수위 스위치는 시트가 아니라 장면이 갖는다.** 시트에 `sensuality_level`을 박아 두지 않는다. 기본 0, 시장 프로필 UZ/CIS·중동은 0 고정, 1 이상은 `gil-creative:publication-review` 레인 D 통과 필수(문법 §5).

---

## 2. 외형 시트 (고정 속성 12개)

미지 값은 빈 문자열로 둔다. **추정으로 채우지 않는다.**

```yaml
virtual_model_sheet:
  model_id: ""                      # 예: vm-brandname-01
  identity_authority_id: ""         # §4 레코드와 1:1
  adult_age_range: ""               # "late 20s" | "30s" | "40s" ... (필수, 20s 미만 불가)
  nationality_or_ethnicity_note: "" # "Korean" | "Uzbek" ... 사실 서술만
  fixed_attributes:                 # 12개 고정. 장면마다 프롬프트 1번 칸에 그대로 복사
    1_face_shape: ""                # 예: oval face, slightly wide jaw
    2_eye_shape_and_color: ""       # 예: monolid, dark brown, slight downturn at the outer corners
    3_brow_shape: ""                # 예: straight, medium thickness, natural gaps
    4_nose: ""                      # 예: low bridge, rounded tip
    5_lip_shape: ""                 # 예: full lower lip, defined cupid's bow
    6_skin_tone_and_texture: ""     # 예: warm light-medium skin, visible pores, faint freckles on the nose
    7_distinguishing_mark: ""       # 예: small mole under the left eye (일관성 앵커, 필수 1개)
    8_hair_color_length_texture: "" # 예: dark brown, collarbone length, slight wave
    9_default_hairstyle: ""         # 예: loose, parted slightly left
    10_height_and_build: ""         # 예: average height, straight shoulders, realistic proportions
    11_default_makeup_level: ""     # "none" | "natural (thin base, muted lip)" | "evening"
    12_signature_accessory: ""      # 예: thin gold hoop earrings (브랜드 제품이면 authorized_marks 등록)
  variable_attributes:              # 장면마다 바뀌어도 되는 것
    wardrobe: "scene-defined"
    expression: "scene-defined"
    pose: "scene-defined"
    hairstyle_variation: "tied | loose | under a hat 허용, 길이·색 변경 불가"
  reference_images:
    front: ""                       # 생성된 기준 컷 3장(정면·3/4·측면). 실존 인물 사진 불가
    three_quarter: ""
    profile: ""
  status: "draft | approved | retired"
```

작성 팁: 12속성 중 **7_distinguishing_mark**가 일관성의 앵커다. 점·주근깨·눈매 비대칭 같은 "완벽하지 않은 특징" 하나가 모델이 같은 사람을 다시 그리게 만드는 손잡이가 된다(문법 §2 `avoid perfect symmetry`와 같은 원리).

---

## 3. 50장면 일관성 유지 규칙

1. **기준 컷 먼저.** 시트를 확정한 뒤 정면·3/4·측면 3장을 먼저 생성해 승인받는다. 이 3장이 이후 모든 장면의 참조 원본이다(Element 또는 `--oref`, Gemini 참조 이미지 첫 슬롯).
2. **1번 칸은 복사, 나머지는 장면.** 프롬프트 1번(인물) 칸에는 시트의 12속성을 **그대로** 붙이고, 2~8번 칸만 장면별로 쓴다. 속성을 요약하거나 줄이면 드리프트가 시작된다.
3. **한 번에 한 축만 바꾼다.** 장면 간 변화는 장소·조명·의상 중 한 축을 고정해 가며 늘린다. 조명·의상·장소가 동시에 바뀐 컷이 실패하면 원인을 못 찾는다.
4. **드리프트 검사 5항목.** 각 컷을 기준 컷과 비교: 눈 간격·코 길이·입술 두께·distinguishing_mark 위치·헤어 색. 2항목 이상 다르면 `unresolved_defects`에 기록하고 교정 1회(코어 `creative-quality-loop.md` 상한).
5. **기준 컷을 갱신하지 않는다.** 잘 나온 최신 컷을 새 기준으로 삼으면 세대마다 조금씩 다른 사람이 된다. 참조는 언제나 승인된 원본 3장이다(`campaign-state` 핸드오프 규칙과 동일).
6. **10장면마다 대조 시트.** 10컷 단위로 정면 클로즈업 1장을 생성해 기준 컷과 나란히 놓고 검수 기록을 남긴다.
7. **필름·카메라는 캠페인 단위로 잠근다.** 한 캠페인 안에서 필름 에뮬레이션(문법 §1.8)과 기본 초점거리를 바꾸지 않는다. 피부 질감의 톤이 달라지면 얼굴이 달라 보인다.
8. **국적·연령대 표기는 고정 문자열.** `adult Korean woman in her 30s`를 컷마다 다르게 쓰지 않는다.

---

## 4. `identity_authorities` 레코드

캠페인 상태(`gil:project` 상태 파일)의 `identity_authorities[]`에 가상 모델 1명당 1개. 필드명은 캠페인 상태 규격 그대로이며 바꾸지 않는다.

```yaml
identity_authorities:
  - identity_authority_id: ""            # 예: ida-vm-brandname-01
    subject_authority_ref: ""            # virtual_model_sheet.model_id + 승인 버전
    identity_route: "one-use-reference | persistent-identity | not-applicable"
    consent_record_id: ""                # 가상 모델(비실존)이면 "not-applicable" 사유를 기록
    face_use_consent_status: "unknown | confirmed | not-applicable"   # 비실존 = not-applicable
    authorized_purpose_and_term: ""      # 예: "브랜드 X SNS·상세페이지, 2026-09 ~ 2027-08"
    existing_identity_check: "not-run | none-authorized | authorized-match-found | not-applicable"
    duplicate_training_status: "not-checked | blocked | not-a-duplicate | not-applicable"
    paid_approval_id: ""                 # Soul 학습 시 필수. Element 전용이면 빈 값
    status: "missing | draft | confirmed | invalidated | not-applicable"
```

- **비실존 가상 모델**: `face_use_consent_status: not-applicable`, `consent_record_id`에는 `"virtual-model, no real person referenced"`를 적는다. 단, 시트 작성에 실존 인물 사진이 **한 장이라도** 참고로 들어갔다면 비실존이 아니다 — 그 인물의 동의 레코드가 필요하다.
- **실존 인물(브랜드 대표·직원·계약 모델)**: `consent_record_id` 필수, `face_use_consent_status: confirmed`가 아니면 `status: draft`에서 멈춘다. 동의서에는 AI 학습·생성 목적과 기간이 명시돼야 하며, 촬영 동의서는 대체물이 아니다.
- `existing_identity_check`는 Soul 학습 전 `show_characters(action:'list', status:'ready')` 결과로 채운다. 같은 모델의 Soul이 있으면 `duplicate_training_status: blocked`.
- 시트 속성·목적·기간·경로가 바뀌면 `status: invalidated`로 내리고 새 레코드를 만든다.

---

## 5. Soul vs Element 선택 가이드 (가상 모델 관점)

| 상황 | 권장 경로 | 이유 |
|---|---|---|
| 캠페인 1회, 10컷 이하 | Element (기준 컷 1~3장) | 학습 비용 없음, 즉시 |
| 50장면 이상, 분기 단위 반복 | Soul (`soul_2`, 기준 컷 + 변형 8~12장) | 충실도. 학습 데이터는 **생성된 기준 컷**이며 실존 사진이 아님 |
| 한 컷에 가상 모델 2명 | Element 2개 | Soul은 한 생성에 1개 |
| 영상 확장(`gil-creative:higgsfield-video`) | `soul_cinematic` 또는 Element | 다운스트림 모델 호환 확인 |
| 제품(`authorized_marks`)과 함께 | Element(모델) + Element(제품) | 다중 배치 |

상세 판정은 `soul-vs-elements.md`. Soul 학습은 되돌릴 수 없으므로 SKILL.md 게이트 2(견적·승인)를 그대로 거친다.

---

## 6. 장면 프롬프트 조립 순서

```
[1] virtual_model_sheet.fixed_attributes 12개 → 8칸 문법 1번 칸 (문자열 그대로)
[2] candid-moments-kr-uz.md 장치 1개 → 2·3번 칸
[3] 브리프의 장소·제품(must_capture, authorized_marks) → 4·5번 칸
[4] 조명·카메라·필름 → 캠페인 잠금값 복사 (6·7·8번 칸)
[5] sensuality_level 확인 → 기본 0, 1 이상이면 review_id 확인
[6] 부정 제약 꼬리 문구 + authorized_marks 예외
[7] 생성 → media_job 레코드 1개 → 드리프트 검사 5항목 → accepted/교정 1회
```

## 관련 파일
- `soul-vs-elements.md` — 경로 판정 SSOT
- `training-photo-guide.md` — Soul 학습 사진 기준 (가상 모델은 생성 기준 컷으로 대체)
- `../../image-bridge/references/photoreal-prompt-grammar.md` — 8칸 문법·수위 스위치
- `../../image-bridge/references/candid-moments-kr-uz.md` — 찰나 장치
- `../../higgsfield-core/references/media-job-ledger.md` — 산출물 원장
