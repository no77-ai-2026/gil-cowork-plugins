# Higgsfield 영상 생성 — 한·UZ 듀얼

## UZ 시장 영상 생성 개관
- UZ 한인·CIS 영상 광고의 1순위 노출 채널은 Telegram, 보조로 Yandex·Instagram Reels
- 트릴링구얼(한·러·우즈벡) 자막·내레이션 — 영상은 1개 언어판씩 분리 제작 후 자막 교체 권장
- 모바일 우선(Android ~92%) — 9:16 세로 영상이 기본, TV spot은 16:9

## 한·UZ 듀얼 체크
| 항목 | 한국 기준 | UZ 추가 고려 |
|---|---|---|
| 노출 채널 | 인스타·유튜브 | Telegram 채널·Yandex·Reels |
| 비율 | 16:9·9:16 | Telegram·Reels 9:16 우선, TV spot 16:9 |
| 자막·내레이션 | 한국어 | 러시아어·우즈벡어 — audio-gen 다국어 더빙 연계 |
| 길이 | 한국 광고 관행 | Telegram 피드 5~10초 숏폼 우선 |
| 프리셋 | UGC·TV spot | CIS 시장 신뢰감 — TV spot + Cinema Studio 3.5 |

## 워크플로우 팁
`higgsfield-image`로 트릴링구얼 시작 프레임 생성 → `higgsfield-video` image-to-video → `audio-gen`으로 러·우즈벡어 더빙.

## 트리거 키워드
"UZ 광고 영상 생성", "Telegram·Yandex 광고 영상", "트릴링구얼 영상 광고", "CIS 시장 숏폼"
