# interview-schema.md — 수집 슬롯 정의 (Socratic slots)

> `higgsfield-core` | 크래프트 파일들이 실제로 소비하는 입력 슬롯 목록.
> 이 파일은 **수집할 슬롯을 정의**할 뿐, 도구 호출을 지시하지 않는다. 인터뷰는 오케스트레이터가 진행하는 흐름이며, 스킬(서브에이전트)은 슬롯을 문서화하되 사용자에게 직접 질문하지 않는다.

**Evidence tier:** 1차 (research.md §7 도출 — 크래프트 파일들이 요구하는 필드 역산)

---

## 1. 경계 (중요)

- 이 스킬 본문은 **수집할 슬롯(slots to collect)**을 서술한다. 실제 질문은 오케스트레이터가 질문 채널(`AskUserQuestion`)로 진행한다. 스킬/서브에이전트는 그 도구를 호출하지 않는다.
- 슬롯이 비어 있으면 스킬은 구조화된 blocker 보고를 반환한다(오케스트레이터가 사용자에게 물어 재위임). 스킬 본문에서 사용자에게 자유질문을 던지지 않는다.

## 2. 수집 슬롯 (크래프트 파일이 실제로 소비)

| 슬롯 | 설명 | 소비하는 크래프트 |
|---|---|---|
| subject | 주제·인물·객체 | 전 계열 |
| action | 동작·움직임(특히 i2v에서 핵심, R2) | Veo·Seedance·Wan·Kling |
| scene | 장소·환경 | 전 계열 |
| camera | 카메라 언어(앵글·렌즈·이동) | Nano Banana·Veo·Seedance·MiniMax |
| lighting/atmosphere | 조명·분위기 | Soul·Nano Banana·Kling·Cinema Studio |
| style | 스타일·매체·필름스톡 | 전 계열 |
| literal text (+ font) | 이미지 속 리터럴 텍스트 + 폰트(R3) | GPT Image·Nano Banana·Seedream·Recraft |
| audio/dialogue | 대사·SFX·앰비언트 | Veo·Seedance·Wan |
| references (+ 각 참조의 purpose) | 참조 미디어 + **각 참조의 용도 진술** | Seedance·Cinema Studio·Veo |
| shot count | 샷 수(멀티샷) | Seedance·Wan·Cinema Studio |
| aspect | 화면비(라이브 목록에서 검증) | 전 계열 |
| duration | 영상 길이(라이브 durations에서 검증) | 전 영상 계열 |
| quality/budget tier | 품질·예산 티어 | Soul(budget)·해상도 계열 |

## 3. 참조는 "무엇을 위한 참조인지"까지 수집한다

Seedance·Cinema Studio·Veo는 참조 미디어를 **용도(purpose)와 함께** 소비한다. 예: "@Image 1을 주인공으로", "@Image 2를 배경 스타일 참조로". `medias[]` role은 *어느 파일*이 Image 1/Video 1인지를 바인딩하지만, *용도 진술*은 프롬프트 산문에 남는다(→ `prompt-craft/seedance.md`). 따라서 references 슬롯은 파일뿐 아니라 각 파일의 purpose도 수집한다.
