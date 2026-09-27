# 우즈베키스탄/CIS 맥락 — 로컬 실행 환경 점검 (uz-env-preflight)

한국 표준(4상태·비파괴 점검·승인 후 교정·한국어 고정 보고 템플릿)은 그대로 적용하고, 우즈베키스탄·CIS 사용자 PC를 점검할 때 추가로 보는 항목입니다.

## 용어 병기(RU/UZ)

| 한국어 | RU | UZ |
|---|---|---|
| 환경 점검 | проверка окружения | muhitni tekshirish |
| 사용 가능 / 누락 | доступно / отсутствует | mavjud / yo'q |
| 관찰 불가 / 차단 | не наблюдается / заблокировано | kuzatib bo'lmaydi / bloklangan |
| 설치 명령 | команда установки | o'rnatish buyrug'i |

## 현지 PC 특이점

- OS 로케일이 러시아어·우즈벡어인 Windows가 많습니다. `ver`·`winget` 출력이 키릴 문자로 나와도 버전 문자열은 그대로 판정합니다. 오류 메시지 번역을 추측하지 말고 종료 코드를 근거로 씁니다.
- 사용자 홈 경로에 키릴 문자(예: `C:\Users\Шахзод`)가 들어가면 uv·npx 캐시 경로에서 인코딩 문제가 날 수 있습니다. 관찰되면 `blocked`가 아니라 원인을 적은 `missing`/`available`로 두고, 해결안에 ASCII 경로 사용자 폴더 또는 `UV_CACHE_DIR`·`npm_config_cache` 재지정을 승인 후 제안합니다.
- 네트워크: 일부 통신사·기관망에서 `astral.sh`·`nodejs.org`·`registry.npmjs.org` 접근이 느리거나 차단될 수 있습니다. 설치 명령이 타임아웃되면 `blocked(네트워크)`로 기록하고 오프라인 설치본(Node MSI·uv zip) 경로를 안내합니다.
- 흔한 배포 채널: 텔레그램으로 받은 설치본은 공식 해시와 비교하기 전에는 실행을 권하지 않습니다. 공식 출처(nodejs.org·astral.sh·python.org) 링크만 제시합니다.

## 폰트 점검 확장

- 우즈벡 시장 산출물은 라틴 UZ(ʻ, ʼ, Oʻ, Gʻ 등 U+02BB·U+02BC 포함)와 키릴(러시아어·키릴 우즈벡)이 한글과 함께 들어갑니다. 승인 문자열에 이 문자가 있으면 한글 폰트 하나로는 대개 부족하므로, 코드포인트 검사를 **문자열 전체**로 수행하고 빠진 글리프를 스크립트별로 보고합니다.
- 후보: `Noto Sans` + `Noto Sans CJK KR` 조합, Windows `Arial`/`Segoe UI`(라틴·키릴) + `Malgun Gothic`(한글). 폰트 두 개를 쓰면 굽기 단계에서 폰트 폴백이 아닌 명시적 분리 렌더가 필요함을 해결안에 적습니다.

## 관련 현지 작업

- Uzum·Yandex Market·OLX·Telegram 자동화(`gil-commerce:marketplace-uzum` 등, 해당 번들 설치 시)는 대부분 http 커넥터라 본 스킬 범위 밖이며, 인증은 `gil:mcp-connector-setup`으로 넘깁니다.
- 광고 영상에 UZ/RU 자막을 굽는 작업은 폰트 점검 통과 후에만 `gil-creative:higgsfield-video`(해당 번들 설치 시)로 넘깁니다.
