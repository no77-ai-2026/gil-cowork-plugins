# UZ 듀얼 — 우즈베키스탄 시장용 GPT Image 프롬프트 (GIL 오리지널)

- **수위 스위치 고정**: 시장 프로필이 UZ/CIS면 `sensuality_level = 0` 고정(`image-bridge/references/photoreal-prompt-grammar.md`). 의상은 무릎·어깨를 덮는 일상복 기준.
- **이미지 속 글자**: 우즈베크어(라틴) 우선, 러시아어(키릴) 병기 여부는 시장 프로필을 따른다. 따옴표 verbatim 규칙(`references/text-rendering.md`)을 그대로 적용하고, 라틴 특수문자(oʻ, gʻ)의 아포스트로피 형태를 프롬프트에 명시한다.
- **장소·소품**: 타슈켄트 아파트 단지, 초르수 바자르, 플롭(오시) 식탁, 수자니 자수 등은 `image-bridge/references/candid-moments-kr-uz.md`의 UZ 15종에서 1개만 고른다. 관광 엽서형 과장(낙타·사막)은 쓰지 않는다.
- **인물**: 실존 인물·유명인 닮은꼴 금지, 성인만(`adult`, `in her/his 20s~50s`). 종교 상징은 브리프에 명시된 경우에만.
- **모델**: 2.5 명시 요청이면 `gil-mcp-openai`로 생성. 결제·과금 안내는 한국어 + (요청 시) 우즈베크어로 병기.

## 트리거 예시 (UZ)
- "rasm uchun prompt yozib ber" (이미지 프롬프트 써줘)
- "Toshkent kafesi uchun reklama rasmi, GPT Image 2.5" (타슈켄트 카페 광고 이미지)
