# gil-media 커넥터·API 가이드

## 개요

`gil-media`는 AI 이미지·영상·음성 통합 플러그인입니다. v2.13.0에서 **Higgsfield MCP 직접 호출 스킬 2종**(`higgsfield-image`·`higgsfield-video`)이 추가되었습니다.

| 영역 | 스킬 | 커넥터 |
|---|---|---|
| 이미지 생성 (직접 렌더링) | `higgsfield-image` | Higgsfield MCP (hosted, OAuth) |
| 영상 생성 (직접 렌더링) | `higgsfield-video` | Higgsfield MCP (hosted, OAuth) |
| 음성·TTS·더빙·효과음 | `audio-gen` | ElevenLabs MCP (`ELEVENLABS_API_KEY`) |
| 이미지 프롬프트 텍스트 | `gpt-image-2-prompt`·`gemini-3-image-prompt`·`midjourney-v8-prompt` | 없음 (텍스트만 산출) |
| GIL 보존 미디어 스킬 12종 | image-gen·video-gen·nano-banana·speech-video·character-mgmt·fal-gateway·media-* | 스킬별 안내 참조 |

## MCP 서버 (자동 등록)

`gil-media/.mcp.json`이 **Higgsfield + ElevenLabs** 2개를 자동 등록합니다.

### Higgsfield (hosted, OAuth) — `higgsfield-image`·`higgsfield-video` 전용

- 공식 URL: `https://mcp.higgsfield.ai/mcp` (HTTP type)
- 첫 호출 직전 **Cowork → 설정 → MCP → Higgsfield → Connect**로 OAuth 인증 1회
- API 키 불필요 (OAuth)
- 공식 이미지 11종 + 영상 11종 + 6 비디오 프리셋
- 잔액·요금: `higgsfield.ai → Billing`

### ElevenLabs (`ELEVENLABS_API_KEY`) — `audio-gen` 전용

- 용도: TTS, 보이스 클로닝, 다국어 더빙, 효과음
- 발급: [elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)
- 등록: `.gil/credentials.env`에 `ELEVENLABS_API_KEY=sk_...`
- 사전 준비: `uv` 설치 (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Free 티어: 월 10,000자 TTS 무료

## 스킬-도구 매핑

| 스킬 | 출력 | 커넥터 |
|---|---|---|
| `higgsfield-image` | 이미지 (Higgsfield CDN URL) | Higgsfield MCP `generate_image` |
| `higgsfield-video` | 영상 (Higgsfield CDN URL) | Higgsfield MCP `generate_video` |
| `audio-gen` | MP3·WAV·OGG 음성 파일 | ElevenLabs MCP |
| `gpt-image-2-prompt` | OpenAI 6-Block 프롬프트 텍스트 | 없음 — ChatGPT에 복붙 |
| `gemini-3-image-prompt` | Google 5-component 프롬프트 텍스트 | 없음 — Google AI Studio에 복붙 |
| `midjourney-v8-prompt` | 키워드+`--파라미터` 프롬프트 텍스트 | 없음 — Discord `/imagine`에 복붙 |

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| Higgsfield "Not connected" | OAuth 미인증 | Cowork → 설정 → MCP → Higgsfield → Connect |
| Higgsfield `queued` 멈춤 | 잔액 부족 | `higgsfield.ai → Billing` 충전 |
| `uvx elevenlabs-mcp` 실패 | `uv` 미설치 | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| ElevenLabs 401 | API 키 오류 | 대시보드에서 키 재확인 |
| 프롬프트 빌더 결과 미흡 | 입력 컨텍스트 부족 | AskUserQuestion 프리셋 재선택 |

## 비용 관리

- **이미지 프롬프트 빌더 3종**: 0원 (텍스트 생성만)
- **Higgsfield**: 모델별 크레딧 차등 — Soul Cinema·Seedance Pro·Cinema Studio 3.5는 고비용. `batch_size`·`quality(2K/4K)`가 비용 배수
- **`audio-gen`**: ElevenLabs 사용량 기반 (Free 월 10,000자 / Starter $5 / Creator $22)

## UZ 듀얼 컨텍스트

UZ 한인사회·CIS 시장 미디어 제작 시: 트릴링구얼(한·러·우즈벡) 자막·더빙은 `audio-gen` 다국어 기능, UZ 광고 영상은 `higgsfield-video` + Telegram·Yandex 채널 규격을 함께 고려하세요. 스킬별 `references/uz-*.md` 참조.
