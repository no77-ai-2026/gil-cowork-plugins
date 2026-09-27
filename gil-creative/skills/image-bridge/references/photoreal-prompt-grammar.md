# photoreal-prompt-grammar.md — AI 인플루언서 실사 프롬프트 문법 (GIL 오리지널 재구성)

> `image-bridge` | 실사 인물(가상 모델·AI 인플루언서) 이미지를 "AI 티 없이" 뽑기 위한 8칸 문법·어휘집·수위 스위치.
> 유료 강의 자료 100개 프롬프트의 **반복 구조만** 추출해 GIL 어휘로 다시 썼다. 원문 문장은 이 파일에 없다(§7).
> 적용 모델: GPT-image-2 · Gemini 3 Pro Image · Midjourney v8 · Higgsfield(Soul/Element). 프롬프트 본문은 영문, 설명은 한국어.

**Evidence tier:** 2차 (유료 강의 자료 100개 프롬프트의 구조 분석 + GIL 자체 실험) — 특정 모델의 렌더 결과는 버전마다 달라지므로 어휘의 효과는 "경향"으로 읽는다.

---

## 1. 8칸 문법 (순서 고정)

실사 인물 프롬프트는 아래 8칸을 **이 순서대로** 채운다. 한 칸이 비면 모델이 그 칸을 "가장 흔한 값"으로 채우고, 그 흔한 값이 곧 AI 티(균일 조명·완벽 피부·스튜디오 배경)가 된다.

| # | 칸 | 반드시 들어갈 것 | 빠지면 생기는 AI 티 |
|---|---|---|---|
| 1 | 인물 | **adult** 명시, 국적·연령대("Korean woman in her 30s", "Uzbek man in his 40s"), 메이크업 정도, 피부 질감(pores, peach fuzz, faint lines) | 나이 불명의 매끈한 얼굴, 미성년 오인 |
| 2 | 포즈 | 손이 무엇을 하는지, 무게 중심, 몸통 방향, "captured mid-action" 여부 | 정면 차렷, 손 실종 |
| 3 | 표정 | 미세 표정 1개(half-smile, brows lifted, eyes squinting), 시선 방향 | 카탈로그 미소 |
| 4 | 의상 | 소재(cotton jersey, ribbed knit, linen, wool), 마감(matte), 주름·당김선(natural creases, stretch lines) | 주름 없는 CG 천 |
| 5 | 장소/환경 | 구체 장소 + 시간대 + 공기(steam, haze, dust, drizzle) + 소품 2~3개(브랜드 없음) | 무국적 스튜디오 |
| 6 | 조명 | 혼합 색온도(warm + cool), 바운스 면(pale wall, tabletop), highlight roll-off, 필요 시 halation | 균일 소프트박스 |
| 7 | 카메라 | 초점거리(28/35/50/85mm), 조리개(f/1.4~2.8), handheld, 프레이밍(waist-up, knee-up, close) | 무한 심도·기하학적 완벽 구도 |
| 8 | 필름 에뮬레이션 | 필름명 + 입자(fine/medium/visible grain) + 톤 특징 1개 | 디지털 과선명·HDR 광택 |
| + | 부정 제약 | 아래 §1.9 공통 문구 | 로고·글자·워터마크 유령 |

### 1.1 인물 칸 작성 규칙
- 첫 단어군에 `adult` 또는 `in her/his 20s|30s|40s|50s`를 **반드시** 넣는다(§5 HARD).
- 메이크업은 정도만: `no makeup / natural makeup (thin base, muted lip) / evening makeup`.
- 피부는 최소 2개 어휘: `visible pores`, `fine peach fuzz`, `faint smile lines`, `slight redness on cheeks`, `subtle skin sheen`.
- 국적은 사실 서술로만 쓴다. 외모 평가 형용사(alluring, stunning 등)는 GIL 기본 어휘에서 제외한다 — 수위 스위치가 담당한다(§5).

### 1.2 포즈 칸
- 동사 1개 + 손 위치 1개 + 몸통 방향 1개. 예: `leaning one elbow on the counter, other hand wiping condensation off a glass, torso turned three-quarter`.
- 동작 중 프레임이면 `captured mid-action, not posed`를 붙인다. 정지 포즈는 `weight on one hip, shoulders dropped`로 긴장을 푼다.

### 1.3 표정 칸
- 표정은 근육 단위로 쓴다: `half-smile with crescent eyes`, `brows slightly raised`, `lips closed, corners relaxed`, `mid-laugh with teeth partly visible`.
- 시선은 3택: `looking at camera` / `looking off-frame left` / `looking down at (object)`.

### 1.4 의상 칸
- 소재 + 색 + 핏 + 주름. 예: `charcoal ribbed knit sweater, matte, natural creases at the elbows`.
- 젖음·땀·바람 같은 물리 상태는 여기서 함께 적는다: `fabric slightly damp at the shoulders from drizzle`.

### 1.5 장소/환경 칸
- 장소명은 한 단계 구체화한다: "Seoul" 대신 `a tent-covered street food stall (pojangmacha) in Seoul on a cold night`.
- 소품은 무브랜드로: `unbranded green bottle`, `plain paper cup`, `teapot without markings`.
- 공기 어휘 1개: `light steam`, `thin haze`, `dust in a sunbeam`, `breath visible in cold air`.

### 1.6 조명 칸 (가장 효과 큰 칸)
- **혼합 색온도**: `warm tungsten overhead + cool spill from the street`처럼 두 광원을 색온도 대비로 적는다.
- **바운스**: 빛이 반사되는 면을 지정한다 — `bounce from a pale tabletop fills the shadows under the eyes`.
- **highlight roll-off**: `smooth highlight roll-off, no clipped highlights`를 관용구처럼 붙인다.
- **헤일레이션**: 야간 점광원이 있을 때만 `mild halation around the lamps`.
- 노출: `exposed slightly under for realism` — 밝게 뜨는 AI 특유의 광택을 막는다.

### 1.7 카메라 칸
| 초점거리 | 언제 |
|---|---|
| 28mm | 거리 스냅, 환경을 많이 담을 때, 약간의 왜곡이 오히려 실사감 |
| 35mm | 실내 생활감, 상반신 + 배경 |
| 50mm | 기본. 식탁·카페·지하철 |
| 85mm | 얼굴 강조, 배경 압축, 편집 화보 |

조리개는 f/1.4~2.8. 항상 `handheld`를 붙이고, 필요 시 `slight handheld motion feel`. 프레이밍은 `close / waist-up / knee-up / full body` 중 하나.

### 1.8 필름 에뮬레이션 표

| 필름 | 성격 | 언제 쓰나 | 짝이 되는 조명 |
|---|---|---|---|
| Kodak Portra 160 | 미세 입자, 부드러운 피부톤 | 밝은 낮 실내, 서점·카페, 화보 | 창가 확산광 |
| Kodak Portra 400 | 만능, 따뜻한 하이라이트 | 골든아워, 옥상, 창가, 기본값 | 늦은 오후 측광 |
| Kodak Portra 800 | 눈에 띄는 입자, 저조도 강함 | 야간 식당, 포장마차, 지하철 | 텅스텐 + 앰비언트 |
| Kodak Gold 200 | 따뜻한 노스탤직, 약한 비네팅 | 한낮 골목, 옥상, 정원, 가족 스냅 | 직사광 + 바운스 |
| Cinestill 800T | 텅스텐 밸런스, 강한 헤일레이션 | 네온·가로등·PC방·바 | 점광원 야간 |
| Kodak Vision3 500T | 시네마 톤, 혼합 색온도에 강함 | 블루아워, 비 오는 밤, 택시·차창 | 하늘 잔광 + 가로등 |
| Fujifilm Pro 400H | 파스텔 바이어스, 낮은 대비 | 아침 창가, 원룸, 봄 정원 | 부드러운 아침광 |
| Fujifilm Superia 400 | 자연 채도, 중간 입자, 소비자 필름 느낌 | 편의점, 거리, 쇼핑몰, 일상 스냅 | 형광등·낮 혼합 |

표기 형식: `Film look: Kodak Portra 800, visible grain, warm highlights, mild halation`.

### 1.9 부정 제약 (공통 꼬리 문구)
모든 실사 인물 프롬프트 끝에 붙인다.

```
No readable text, no signage, no logos, no labels, no watermark. No HDR, no over-sharpening,
no plastic skin, no beauty filter, avoid perfect facial symmetry, no CGI look, no extra people
duplicated in the background.
```

광고용으로 특정 로고·제품을 살려야 하면 §3의 `authorized_marks[]` 규칙으로 이 문구를 부분 해제한다.

---

## 2. AI 티 제거 어휘집 (28)

| # | 영문 키워드 | 한국어 설명 | 효과 |
|---|---|---|---|
| 1 | `visible pores` | 모공이 보이는 피부 | 플라스틱 피부 제거 |
| 2 | `fine peach fuzz` | 솜털 | 피부 가장자리에 미세 결 생김 |
| 3 | `faint smile lines` / `subtle imperfections` | 잔주름·잡티 | 나이·생활감 부여 |
| 4 | `slight redness on cheeks/nose` | 볼·코 끝의 약한 홍조 | 균일 피부톤 깨기 |
| 5 | `subtle skin sheen` | 은은한 피부 광 | 매트 CG 질감 방지 |
| 6 | `mixed color temperatures` | 혼합 색온도 | 단일 광원 스튜디오 티 제거 |
| 7 | `bounce light from (surface)` | 특정 면에서 오는 반사광 | 그림자 밑이 자연스럽게 밝아짐 |
| 8 | `smooth highlight roll-off` | 하이라이트가 부드럽게 꺾임 | 날아간 흰색·HDR 광택 방지 |
| 9 | `no clipped highlights` | 하이라이트 클리핑 없음 | 이마·콧등 번들거림 제거 |
| 10 | `mild halation` | 점광원 주변 번짐 | 필름 야경 질감 |
| 11 | `exposed slightly under` | 노출 살짝 언더 | AI 특유의 밝은 광택 억제 |
| 12 | `subtle noise consistent with low light` | 저조도에 맞는 노이즈 | 야간인데 깨끗한 모순 제거 |
| 13 | `handheld, slight motion feel` | 핸드헬드 미세 흔들림 | 삼각대식 완벽 구도 회피 |
| 14 | `slight motion blur in the background only` | 배경만 모션블러 | 스냅 촬영 순간감 |
| 15 | `shallow depth of field, creamy bokeh` | 얕은 심도 | 무한 심도 CG 제거 |
| 16 | `film grain (fine/medium/visible)` | 필름 입자 | 디지털 매끈함 제거 |
| 17 | `slightly lowered digital sharpness` | 디지털 선명도 낮춤 | 과선명 제거 |
| 18 | `natural fabric creases / stretch lines` | 천 주름·당김선 | 의상 CG 티 제거 |
| 19 | `flyaway hair strands` | 흩날리는 잔머리 | 헬멧 같은 머리 제거 |
| 20 | `steam catching the light` | 빛을 받는 김 | 공기층·부피감 |
| 21 | `condensation on the glass` | 잔 표면 결로 | 소품 실재감 |
| 22 | `reflections on (metal/glass) surfaces` | 금속·유리 반사 | 환경광 상호작용 |
| 23 | `wet ground reflections` | 젖은 바닥 반사 | 비 오는 장면 실사감 |
| 24 | `patrons as soft bokeh silhouettes` | 배경 인물은 실루엣 | 복붙 배경 인물 방지 |
| 25 | `captured mid-action, not posed` | 동작 중 포착 | 포즈 티 제거 |
| 26 | `avoid perfect symmetry` | 완벽 대칭 회피 | 얼굴 좌우 완벽 대칭 방지 |
| 27 | `breath visible in cold air` | 입김 | 겨울 장면 온도감 |
| 28 | `dust motes in a sunbeam` | 햇살 속 먼지 | 실내 공기층 |

사용량 기준: 한 프롬프트에 6~10개. 모두 넣으면 모델이 "질감"만 그리고 인물이 흐려진다.

---

## 3. 로고·글자 규칙

### 3.1 기본: 전부 배제
- 기본값은 §1.9 꼬리 문구다. 간판·메뉴판·포스터·의류 프린트·패키지 라벨은 모두 `unreadable / abstract shapes only`로 만든다.
- 이유 두 가지: (a) 모델이 글자를 깨뜨려 AI 티가 나고, (b) 의도치 않은 실제 브랜드가 들어가면 광고심의·상표 문제가 된다.

### 3.2 광고용 예외: `authorized_marks[]`
캠페인 상태(`gil:project` 상태 파일 또는 `gil-creative:creative-wizard` 브리프)에 아래 배열이 있을 때만 해당 항목을 살린다.

```yaml
authorized_marks:
  - mark_id: ""              # 예: brand-logo-main
    kind: "logo | product | package | signage"
    authority_asset_ref: ""  # 원본 로고·제품 이미지의 권위 자산 경로/버전
    placement: ""            # 예: on the paper cup held in her hand
    lock: "exact-reproduction"  # 항상 원본 재현. 재디자인·변형 금지
```

- **권위 원본 잠금**: 로고·제품은 프롬프트 텍스트로 "그려 달라"고 하지 않는다. 원본 이미지를 Reference Element(Higgsfield) 또는 참조 이미지(Gemini)로 주입하고, 프롬프트에는 `the logo on the cup is the provided reference, reproduced exactly, no redesign`처럼 **재현 지시**만 쓴다.
- 등록되지 않은 모든 마크는 여전히 배제 문구를 유지한다: `all other text, logos and signage unreadable`.
- 텍스트 카피(헤드라인 등)는 이미지에 넣지 않고 후조판한다(`image-bridge` `--mode overlay`).

### 3.3 industry-overlay 연결
`gil-creative:industry-overlay` 패킷의 `must_capture[]`(반드시 프레임에 들어갈 것)와 `proof_objects[]`(증거 사물)가 있으면:
- `proof_objects[]` 중 브랜드·글자를 가진 것은 **자동으로 `authorized_marks[]` 후보**가 되며, `authority_asset_ref`가 비어 있으면 생성하지 않고 blocker를 낸다.
- `must_capture[]`는 8칸 문법의 5번(장소/환경) 소품 자리에 들어간다. 소품이 인물 손·시선과 연결되도록 2번(포즈)에 상호작용 동사를 추가한다.

---

## 4. gpt-image-prompt 6-Block ↔ 8칸 매핑

| 6-Block (gil-creative:gpt-image-prompt) | 8칸 | 변환 메모 |
|---|---|---|
| Subject | 1 인물 + 4 의상 | 성인 명시·피부 질감·소재를 Subject 절에 합친다 |
| Action | 2 포즈 + 3 표정 | 동사 + 손 + 미세 표정을 한 절로 |
| Scene | 5 장소/환경 | 장소·시간대·공기·무브랜드 소품 |
| Composition | 7 카메라 | 초점거리·조리개·핸드헬드·프레이밍 |
| Lighting | 6 조명 | 혼합 색온도·바운스·roll-off·halation |
| Style & Text | 8 필름 + 부정 제약 | 필름명 + 입자 + §1.9 꼬리 문구. 텍스트는 "없음"이 기본 |

6-Block은 자연어 한 단락, 8칸은 라벨식 블록이다. GPT-image-2에는 8칸을 **한 단락으로 이어 쓰되 순서는 유지**하고, Higgsfield·Gemini에는 라벨을 남겨도 된다.

### 4.1 Gemini 3 Pro Image 변환
- 5-component 문장형으로 접는다: `[1+4] [2+3] in [5]. [7]. [6]. [8 + 부정 제약].`
- 참조 이미지를 붙일 때 첫 슬롯에 얼굴 권위(가상 모델 시트), 둘째에 `authorized_marks` 원본을 둔다.
- SynthID 워터마크는 제거 불가. 부정 제약의 "no watermark"는 **화면에 그려지는 워터마크**를 뜻한다.

### 4.2 Midjourney v8 변환
- 키워드 콤마 나열 + 파라미터: `adult Korean woman in her 30s, visible pores, ..., 50mm f/1.8 handheld, Kodak Portra 800 grain --ar 4:5 --style raw --s 100~250 --no text, logo, signage, watermark, hdr`.
- `--style raw`는 필수. `--s`가 높으면 뷰티필터 방향으로 미끄러진다.
- 가상 모델 얼굴 고정은 `--oref <시트 이미지> --cw 20~40` (조명까지 상속되는 `--cw 100` 함정 주의).
- 부정 제약은 문장 대신 `--no` 파라미터로 옮긴다.

---

## 5. 수위 스위치 `sensuality_level: 0 | 1 | 2`

### 5.1 정의

| level | 이름 | 허용 | 불허 |
|---|---|---|---|
| 0 | 일상·비관능 (**기본**) | 생활 동작, 웃음, 식사, 이동, 일 | 시선·포즈로 매력을 강조하는 지시 |
| 1 | 은은한 매력 | 카메라 응시, 차분한 미소, 의상 핏 언급, 골든아워 역광 | 노출 확대, 관능 형용사, 신체 부위 강조 |
| 2 | 관능적 연출 | 포즈·시점·표정 강조(over-shoulder gaze, hip angled, half-lidded eyes), 저조도 무드 | **여전히 non-explicit**: 속옷·수영복 노출 없음, 젖은 옷 밀착·투시 없음, 나체·성적 행위·성적 프레이밍 없음 |

### 5.2 HARD 규칙
- **[HARD] 기본값은 0이다.** 브리프에 `sensuality_level`이 없으면 0으로 처리하고, 1·2로 올리려면 사유가 상태 파일에 남아야 한다.
- **[HARD] 시장 프로필(`gil-creative:market-profile-engine`)이 UZ/CIS 또는 중동이면 0으로 고정한다.** 오버라이드는 사유 기록 + `gil-creative:publication-review` 통과가 모두 필요하다. 우즈베키스탄 광고법의 풍기문란 조항과 현지 정서를 우선한다.
- **[HARD] 1 이상은 `gil-creative:publication-review` 레인 D(권리·표현) 통과 전에는 `draft-only`다.** 산출물에 `sensuality_level`과 리뷰 `review_id`를 함께 기록한다.
- **[HARD] 모든 수위에서 성인만.** 프롬프트에 `adult` 또는 `in her/his 20s~50s`가 없으면 생성하지 않는다.
- **[HARD] 미성년 암시 표현 절대 금지(모든 수위).** 금지어: `school uniform / sailor uniform / student / schoolgirl / schoolboy / teen / teenage / youthful-looking / childlike / petite (신체 묘사 맥락) / lolita / 교복 / 학생 / 소녀 / 소년 / 여고생 / 앳된`. 검출 시 blocker.
  - `girl`·`boy`는 **인물을 가리킬 때만** 금지어입니다. 성인 인물은 `woman`·`man`으로 적습니다. `delivery boy`처럼 직업·관용구로 쓰이는 복합어, 또는 인물 묘사가 아닌 문맥은 오탐이므로 막지 않습니다. 판단이 애매하면 인물 표기를 `adult woman/man in her/his 20s`로 바꿔 해소합니다.
- **[HARD] 실존 인물 초상 금지.** `identity_authorities[]`에 `face_use_consent_status: confirmed`인 `consent_record_id`가 없는 실제 인물 사진은 참조·학습·프롬프트 언급(연예인 이름 등) 모두 금지. 가상 모델은 `virtual-model-preset.md`(`gil-creative:higgsfield-identity`)의 비실존 원칙을 따른다.
- **[HARD] 제3자 인물을 level 2로 연출하려면 해당 인물의 동의 범위(`authorized_purpose_and_term`)에 명시돼 있어야 한다.** 촬영 동의는 관능 연출 동의가 아니다.

### 5.3 규제 요약 (법률 자문이 아님)
- 한국 광고심의(방송광고·온라인 자율심의): 성적 표현으로 상품과 무관한 신체 노출·선정적 포즈를 소구하는 광고는 심의 지적 대상. 특히 미성년 모델·미성년 오인 연출은 즉시 위반. 주류 광고는 별도 규제(음주 미화 금지)이므로 §6 포장마차 예시류는 주류 브랜드 광고에 그대로 쓰지 않는다.
- Meta 광고 정책(성인 콘텐츠·성적 암시): 나체, 노골적 신체 부위 강조, 성적 포즈·암시 카피, 속옷·수영복 클로즈업으로 시선을 끄는 이미지 거부. level 2는 Meta 게재 시 거부 가능성이 높으므로 기본적으로 오가닉·자사 채널 한정으로 권고하고, 광고 집행 시 level 1 이하로 재생성한다.
- 우즈베키스탄: 광고법상 풍기문란·종교 감정 훼손 표현 금지, 외국어 표기 규정. level 0 고정 근거.

### 5.4 수위별 어휘 표

| 칸 | level 0 | level 1 | level 2 (non-explicit) |
|---|---|---|---|
| 표정 | `mid-laugh`, `focused on the task`, `surprised`, `content half-smile` | `calm direct gaze`, `soft closed-lip smile`, `eyes slightly narrowed by the sun` | `half-lidded eyes`, `lips slightly parted, no smile`, `unwavering eye contact`, `glance back over the shoulder` |
| 포즈 | `mid-action`, `hands busy with (object)`, `walking`, `eating` | `leaning on a railing, weight on one hip`, `hand brushing hair behind the ear` | `torso turned, hips angled`, `one hand gripping (railing/pole) for tension`, `seated sideways, one knee raised` |
| 의상 | `oversized sweater`, `work shirt`, `puffer jacket`, 소재·주름만 | `fitted knit top`, `well-cut blazer`, `linen dress` (핏 언급까지) | `fitted ribbed knit`, `high-waist skirt`, `opaque bodysuit-style top under a blazer` — 항상 `opaque, not see-through`, 속옷·수영복 없음 |
| 시점 | eye-level, 3/4, 거리 스냅 | 85mm 얼굴 강조, 살짝 로우앵글 | over-the-shoulder, low-angle knee-to-shoulder, close intimate distance |
| 조명 | 낮·혼합광 | 골든아워 역광 rim | 저조도 + 점광원 halation, 블라인드 그림자 줄무늬 |

---

## 6. GIL 작성 예시 프롬프트 20개

모든 예시는 8칸 순서를 지키고, 끝에 §1.9 꼬리 문구를 붙인다(지면상 생략). 수위 표기가 없으면 level 0.

### 6.1 한국 10

**KR-01 포장마차 (level 0)**
```
Adult Korean man in his 40s, no makeup, weathered skin with visible pores and faint lines at the eyes.
Pose: seated on a plastic stool, one hand steadying a paper bowl of fish-cake broth, the other holding a wooden skewer, captured mid-action.
Expression: eyes squinting from the steam, small contented smile.
Wardrobe: navy wool work jacket over a grey cotton crewneck, matte, natural creases at the shoulders.
Place: tent-covered street food stall in Seoul on a cold night, light steam and breath visible, unbranded green bottles blurred on the counter.
Lighting: warm tungsten bulb overhead + cool blue spill from the street, bounce from the steel counter, smooth highlight roll-off, mild halation around the bulb.
Camera: 50mm, f/1.8, handheld, waist-up, slight motion feel.
Film look: Kodak Portra 800, visible grain, warm highlights, subtle noise consistent with low light.
```

**KR-02 편의점 (level 0)**
```
Adult Korean woman in her 20s, natural makeup with thin base, visible pores, slight redness on the nose.
Pose: crouched at the lowest shelf comparing two instant noodle cups held in each hand, weight on the toes.
Expression: brows raised, lips pressed in mock indecision.
Wardrobe: oversized beige hoodie and black track pants, matte cotton, creases at the elbows.
Place: Seoul convenience store aisle near midnight, glossy packaging in the background with unreadable labels.
Lighting: cool fluorescent ceiling + warm spill from the hot-food counter, mixed color temperatures on skin, smooth highlight roll-off.
Camera: 28mm, f/2.2, handheld at shelf height, knee-up.
Film look: Fujifilm Superia 400, medium grain, natural saturation.
```

**KR-03 지하철 (level 0)**
```
Adult Korean man in his 30s, clean-shaven, visible pores, faint dark circles.
Pose: standing in a subway car holding the overhead strap, other hand scrolling a phone with the screen turned away, body swaying slightly with the train.
Expression: tired half-smile at something on the phone, eyes down.
Wardrobe: charcoal wool coat over a white oxford shirt, collar slightly crumpled, natural drape.
Place: Seoul subway car at evening rush, commuters as soft bokeh silhouettes, window reflections.
Lighting: cool interior fluorescent + brief warm flashes from tunnel lights, reflections on the steel pole, exposed slightly under.
Camera: 35mm, f/2, handheld, waist-up, slight motion blur in the background only.
Film look: Kodak Portra 800, visible grain, subtle noise consistent with low light.
```

**KR-04 옥상 (level 1)** — 유일한 level 1 예시. 레인 D 통과 전 draft-only.
```
Adult Korean woman in her 30s, natural makeup, visible pores, fine peach fuzz along the jaw.
Pose: leaning forearms on a rooftop railing, one hand holding a canned drink with no label, weight on one hip.
Expression: calm direct gaze at camera, soft closed-lip smile.
Wardrobe: fitted cream ribbed knit top and high-waist linen trousers, matte, gentle stretch lines at the elbow.
Place: Seoul apartment rooftop at 5pm, water tanks and antennas softened in the background, thin haze.
Lighting: warm low sun from behind creating rim light on flyaway hair, bounce from the pale concrete floor filling the face, smooth highlight roll-off, no clipped highlights.
Camera: 85mm, f/2, handheld, waist-up.
Film look: Kodak Portra 400, subtle grain, warm highlights, gentle vignette.
```

**KR-05 원룸 (level 0)**
```
Adult Korean woman in her 20s, no makeup, visible pores, hair still damp and tied up with a plain clip.
Pose: sitting cross-legged on the floor folding laundry, holding up a sock that came out of the dryer stuck to a sweater.
Expression: laughing at herself, eyes crescent, teeth partly visible.
Wardrobe: oversized grey cotton t-shirt and plaid pajama shorts, soft creases, matte.
Place: small Seoul studio apartment on a weekend morning, a mattress on the floor, a plain mug on a low table, dust motes in a sunbeam.
Lighting: soft morning window daylight from the left + bounce from white bedding under the chin, smooth shadow gradients.
Camera: 35mm, f/2, handheld, knee-up from a low seated height.
Film look: Fujifilm Pro 400H, fine grain, soft contrast, slight pastel bias.
```

**KR-06 강변 (level 0)**
```
Adult Korean man in his 50s, short grey-streaked hair, deep smile lines, visible pores, tanned forearms.
Pose: pausing on a riverside path with a bicycle, one foot on the pedal, wiping his forehead with a rolled sleeve, captured mid-action.
Expression: eyes half-closed against the low sun, open-mouth grin.
Wardrobe: faded olive windbreaker over a cotton polo, sleeves pushed up, natural wrinkles.
Place: Han River bicycle path at late golden hour, glitter path on the water, distant bridge in bokeh.
Lighting: strong backlight rimming the hair and shoulders, reflected light from the water flickering on the cheek, exposed slightly under.
Camera: 85mm, f/2, handheld, waist-up.
Film look: Kodak Portra 800, medium grain, warm highlights, gentle halation on water glints.
```

**KR-07 서점 (level 0)**
```
Adult Korean woman in her 40s, minimal makeup, reading glasses pushed up into her hair, faint lines at the eyes, visible pores.
Pose: standing between shelves with a book open in one hand, the other finger marking a second page, shoulder resting on the shelf.
Expression: absorbed, brows slightly drawn, lips parted in concentration, looking down at the page.
Wardrobe: camel wool cardigan over a black turtleneck, pilling visible, natural creases.
Place: quiet second-floor bookstore in Seoul on a weekday afternoon, book spines as abstract color blocks, pages visible but no readable text.
Lighting: soft overhead warm light + cool daylight from a far window, bounce from the pale floor, no harsh shadows.
Camera: 50mm, f/2, handheld at shoulder level, waist-up.
Film look: Kodak Portra 160, fine grain, soft skin tones.
```

**KR-08 PC방 (level 0)**
```
Adult Korean man in his 20s, light stubble, visible pores, slight oily sheen on the forehead.
Pose: leaning back in a gaming chair with one hand on the mouse, headphones around the neck, other hand reaching for a cup of instant ramen with no label.
Expression: mid-laugh at something off-screen, head tilted toward a friend out of frame.
Wardrobe: black cotton zip hoodie, sleeves pushed up, creases at the waist.
Place: dim Seoul PC room at night, rows of monitors as blurred glow, screen content unreadable.
Lighting: cool monitor glow on one side of the face + warm ceiling spot behind, mixed color temperatures, mild halation around the monitors, subtle noise consistent with low light.
Camera: 85mm, f/1.8, handheld, close portrait, shallow depth of field.
Film look: Cinestill 800T, visible grain, tungsten balance, soft highlight roll-off.
```

**KR-09 빵집 (level 0)**
```
Adult Korean woman in her 30s, natural makeup with muted lip, visible pores, a crumb on the lower lip.
Pose: seated at a small window table, fork halfway to the mouth with a piece of cream cake, other hand steadying the plate.
Expression: eyes closed for a second in enjoyment, cheeks lifted.
Wardrobe: soft pink cotton shirt with rolled sleeves, natural wrinkles, small plain earrings.
Place: neighborhood bakery cafe in Seoul around 4pm, tray of bread in the background as bokeh, iced drink with condensation on the table.
Lighting: warm late-afternoon sun through the window casting soft shadow lines across the table, bounce from the white plate under the chin, smooth highlight roll-off.
Camera: 50mm, f/1.8, handheld, close waist-up.
Film look: Kodak Gold 200, gentle grain, warm highlight bias.
```

**KR-10 비 오는 골목 (level 0)**
```
Adult Korean woman in her 20s, natural makeup partly washed by the rain, visible pores, damp hair strands stuck to the cheek.
Pose: ducking under the eave of a closed shop, shaking a small umbrella with one hand, the other holding a tote bag against the chest, captured mid-action.
Expression: surprised open-mouth laugh at the sudden downpour, shoulders raised.
Wardrobe: light grey trench coat darkened at the shoulders by rain, white cotton tee beneath, natural wet creases.
Place: narrow Seoul back alley at dusk in heavy rain, wet asphalt, puddle reflections, shutters and signs blurred and unreadable.
Lighting: cool overcast sky + warm spill from a window across the alley, wet ground reflections adding bounce, mild halation, exposed slightly under.
Camera: 35mm, f/2, handheld, knee-up, slight motion blur in the falling rain.
Film look: Kodak Vision3 500T, visible grain, smooth tonal transitions.
```

### 6.2 우즈베키스탄 10

**UZ-01 초이호나에서 차 마시기 (level 0)**
```
Adult Uzbek man in his 60s, white beard trimmed short, deep lines around the eyes, visible pores, sun-darkened skin.
Pose: seated cross-legged on a raised wooden tapchan, pouring green tea from a plain ceramic teapot into a small bowl, elbow resting on a cushion.
Expression: quiet smile, eyes on the pouring tea.
Wardrobe: dark green quilted chapan over a white cotton shirt, black embroidered doppi cap, fabric creases at the elbows.
Place: shaded choyxona courtyard in Tashkent on a summer afternoon, grapevine trellis above, steam rising from the tea, a plate of dried apricots.
Lighting: dappled sunlight through the vines + open shade fill, bounce from the pale cushions, smooth highlight roll-off.
Camera: 50mm, f/2, handheld, waist-up.
Film look: Kodak Gold 200, gentle grain, warm highlight bias.
```

**UZ-02 초르수 바자르 (level 0)**
```
Adult Uzbek woman in her 40s, light makeup, visible pores, faint smile lines, headscarf loosely tied.
Pose: standing at a spice stall holding a paper bag open while the vendor's hands (only forearms visible) scoop cumin, other hand counting coins.
Expression: mid-negotiation laugh, brows raised, eyes on the vendor.
Wardrobe: floral cotton dress in muted colors under a plain dark cardigan, natural creases, no printed text.
Place: Chorsu Bazaar in Tashkent on a weekday morning, mounds of spices and dried fruit in the background as color bokeh, dust in the air.
Lighting: cool light from the dome skylights + warm bounce from the spice mounds, mixed color temperatures on the face.
Camera: 35mm, f/2, handheld, waist-up, slight motion blur on passersby.
Film look: Fujifilm Superia 400, medium grain, natural saturation.
```

**UZ-03 타슈켄트 지하철역 홀 (level 0)**
```
Adult Uzbek man in his 20s, short dark hair, light stubble, visible pores.
Pose: walking through a station hall with a backpack over one shoulder, glancing up at the ceiling while adjusting an earbud, captured mid-stride.
Expression: mild curiosity, lips relaxed, eyes up and to the right.
Wardrobe: black cotton bomber jacket over a grey tee, dark jeans, natural fabric wrinkles.
Place: Tashkent metro station hall with ornate ceiling and marble columns softened in bokeh, evening commuters as silhouettes, signage unreadable.
Lighting: warm ornate chandeliers + cool spill from the platform, reflections on the polished floor, exposed slightly under.
Camera: 28mm, f/2.2, handheld, full body from a low angle.
Film look: Cinestill 800T, visible grain, mild halation around the chandeliers.
```

**UZ-04 마할라 골목 저녁 (level 0)**
```
Adult Uzbek woman in her 30s, no makeup, visible pores, slight redness on the cheeks from cooking heat.
Pose: standing at a mahalla gate carrying a covered tray of fresh bread to a neighbor, one hand pushing the gate with the hip, captured mid-action.
Expression: warm closed-lip smile toward someone off-frame, chin slightly lifted.
Wardrobe: long cotton house dress in dusty blue, sleeves rolled, light scarf over the shoulders, natural creases.
Place: narrow mahalla lane in Tashkent at dusk, mud-brick walls, a mulberry tree, neighbors' silhouettes far down the lane.
Lighting: fading blue sky + warm light from an open doorway behind her, bounce from the pale wall, mild halation around the doorway.
Camera: 35mm, f/2, handheld, knee-up.
Film look: Kodak Vision3 500T, visible grain, smooth tonal transitions.
```

**UZ-05 아미르 티무르 광장 근처 카페 (level 0)**
```
Adult Uzbek woman in her 20s, natural makeup with thin base, visible pores, fine peach fuzz.
Pose: seated at an outdoor cafe table with a laptop half-closed, stirring a cup of coffee while looking at a friend across the table (only the friend's hand visible).
Expression: listening, small nod, half-smile.
Wardrobe: cream linen blazer over a white cotton tee, gold-tone plain earrings, natural wrinkles at the sleeve.
Place: cafe terrace near Amir Timur Square in Tashkent, late afternoon, plane trees and passing traffic as bokeh, menu board unreadable.
Lighting: warm side sun filtered by the trees + open sky fill, bounce from the white tabletop, smooth highlight roll-off.
Camera: 85mm, f/2, handheld, waist-up.
Film look: Kodak Portra 400, subtle grain, warm highlights.
```

**UZ-06 사마르칸트 레기스탄 저녁 산책 (level 0)** — 관광 클리셰이므로 1개만.
```
Adult Uzbek couple in their 30s (man and woman), both with visible pores, the man with light stubble, the woman with minimal makeup.
Pose: walking side by side along the plaza edge, the woman pointing at the tilework, the man carrying a paper bag of fruit, captured mid-stride.
Expression: both mid-conversation, relaxed smiles, not looking at the camera.
Wardrobe: him in a dark cotton shirt and chinos; her in a long muted-green dress with a light shawl, natural creases.
Place: Registan square in Samarkand at blue hour, madrasah facades softened in the background, tourists as distant silhouettes.
Lighting: cool ambient sky + warm floodlight spill on the tilework, bounce from the pale stone floor, exposed slightly under.
Camera: 50mm, f/2, handheld, full body.
Film look: Kodak Portra 800, medium grain, mild halation on the floodlights.
```

**UZ-07 플로프 식당 (level 0)**
```
Adult Uzbek man in his 40s, thick dark moustache, visible pores, sheen on the forehead from the kitchen heat.
Pose: standing behind a large kazan, lifting rice with a long metal ladle so steam bursts upward, other hand on the rim, captured mid-action.
Expression: proud grin, eyes squinting from the steam.
Wardrobe: white cotton chef jacket with rolled sleeves, sweat-darkened at the collar, checkered apron, natural creases.
Place: busy plov house in Tashkent at lunchtime, stacks of plain ceramic plates, diners as bokeh silhouettes.
Lighting: warm tungsten overhead + cool daylight from a side door, steam catching the light, reflections on the kazan.
Camera: 35mm, f/2, handheld, waist-up.
Film look: Kodak Portra 800, visible grain, warm highlights.
```

**UZ-08 Tashkent City 쇼핑몰 (level 0)**
```
Adult Uzbek woman in her 20s, evening makeup kept natural, visible pores, hair in a loose low bun.
Pose: riding an escalator in a modern mall, one hand on the rail, the other holding two plain paper shopping bags, looking back over the shoulder at someone below.
Expression: playful open smile, brows lifted.
Wardrobe: oversized beige wool coat over a black knit dress, matte, natural drape.
Place: Tashkent City mall atrium in the evening, glass railings and storefront glow as abstract bokeh, no readable signs.
Lighting: cool white ceiling light + warm storefront spill, reflections on the glass rail, smooth highlight roll-off.
Camera: 50mm, f/1.8, handheld from a few steps below, waist-up.
Film look: Fujifilm Superia 400, medium grain, natural saturation.
```

**UZ-09 봄날 정원 (level 0)**
```
Adult Uzbek woman in her 50s, grey strands in dark hair, deep smile lines, visible pores, no makeup.
Pose: kneeling at a garden bed tying up a young tomato plant, sleeves pushed up, soil on the fingers.
Expression: focused, lips pursed, then a hint of a smile.
Wardrobe: faded floral cotton blouse and a knitted vest, headscarf tied at the back, natural creases.
Place: family garden in a Tashkent suburb on a spring morning, apricot blossoms out of focus, a plain metal watering can.
Lighting: soft morning sun from the side + bounce from the light soil, dust motes in the sunbeam, smooth highlight roll-off.
Camera: 50mm, f/2, handheld, knee-up.
Film look: Fujifilm Pro 400H, fine grain, soft contrast, slight pastel bias.
```

**UZ-10 겨울 눈 온 아파트 마당 (level 0)**
```
Adult Uzbek man in his 30s, dark beard, visible pores, cheeks reddened by cold, breath visible.
Pose: brushing snow off a parked car with a sleeve while a small dog on a leash tugs at the other hand, captured mid-action.
Expression: laughing at the dog, eyes crescent.
Wardrobe: black quilted puffer jacket, grey knit beanie, natural fabric creases, no printed logos.
Place: Soviet-era apartment courtyard in Tashkent after fresh snow, bare trees and balconies softened in the background.
Lighting: flat overcast daylight + faint warm spill from a ground-floor window, bounce from the snow filling the shadows, exposed slightly under.
Camera: 35mm, f/2.2, handheld, knee-up, slight motion blur on the dog.
Film look: Kodak Portra 400, subtle grain, cool-neutral balance with warm skin retained.
```

---

## 7. private 원문 참조 규칙

- 유료 강의 원문 100개는 `references/private/hanirum-general-50.md`·`hanirum-sexy-50.md`에 **로컬 전용**으로 존재할 수 있다(`.gitignore`: `**/references/private/`).
- **규칙: 파일이 있으면 읽고 없으면 GIL 예시만 사용.** 파일 부재는 오류가 아니다.
- 원문은 8칸 문법을 이해하기 위한 **예시 원문**으로만 쓴다. 공개 산출물(스킬 파일·문서·리포트·공유 링크)에 원문 문장을 재배포하지 않는다. 사용자 캠페인 프롬프트에 원문을 그대로 쓰는 것은 사용자의 구매 라이선스 범위에서 사용자 책임이며, 그 경우에도 §3 로고·§5 수위·초상 HARD와 `gil-creative:publication-review` 게이트는 동일하게 적용된다.
- SEXY 50 원문에는 level 2를 넘는 표현(속옷·수영복·젖은 옷 밀착·남성 POV 프레이밍)이 포함돼 있다. GIL은 이를 **채택하지 않는다**. 원문을 읽더라도 §5.1 표의 불허 열에 해당하는 요소는 걸러낸다.

---

## 관련 파일
- `candid-moments-kr-uz.md` — 연출이 아닌 찰나 장치 30개, 감정여정 8단계 매핑
- `../../higgsfield-identity/references/virtual-model-preset.md` — 브랜드 가상 모델 외형 시트·`identity_authorities`
- `../../gpt-image-prompt/references/prompt-blocks.md` — 6-Block 원 규격
- `../../design-slop-check/SKILL.md` — 이미지 AI 티 체크리스트 12항목
