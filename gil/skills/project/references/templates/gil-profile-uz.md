# {user_name} — UZ 거주·비즈니스 프로필

> 선택적 프로필. UZ 거주 한국인 사용자가 자주 사용하는 컨텍스트를 한 번 등록.
> 저장: `./.gil/profile-uz.md`

## 기본 정보

| 항목 | 값 |
|------|-----|
| 한국 이름 | {korean_name} |
| 영문 이름 | {english_name} |
| 거주 도시 | Tashkent (또는 {city}) |
| 거주 기간 | {residence_duration} |
| 비자 유형 | {visa_type} (관광·취업·학생·가족·영주) |
| 한국 본거지 | {korea_base} |

## 가족·자녀

| 가족 | 정보 |
|------|------|
| 배우자 | {spouse_info} |
| 자녀 1 | {child1_age_school} |
| 자녀 2 | {child2_age_school} |
| 부모 동반 | {parents_status} |

→ 자녀 학교 비교 시 `gil-lifestyle:wellness-coach (uz-child-education)` 자동 호출.

## 직업·비즈니스

| 항목 | 값 |
|------|-----|
| 한국 본사·자회사 | {company_kr_uz} |
| 직무·직책 | {role} |
| 주 근무 지역 | {work_location} |
| UZ 동료·파트너 | {uz_colleagues} |
| 한국 ↔ UZ 출장 빈도 | {travel_frequency} |

## 언어 능력

| 언어 | 수준 |
|------|------|
| 한국어 | 모국어 |
| 러시아어 | {russian_level} (None / 기초 / 일상 / 비즈니스 / 유창) |
| 우즈벡어 | {uzbek_level} |
| 영어 | {english_level} |

→ 언어 선택 옵션 자동 사전 설정.

## 자주 사용하는 플러그인 (Top 5)

```
1. gil-lifestyle (UZ 거주·여행)
2. gil-business (UZ 시장)
3. gil-content (트라이링구얼)
4. gil-oda (KOICA·EDCF — 해당 시)
5. gil-finance (UZ 세무·환율)
```

## API 키 사전 등록

| 키 | 등록 |
|----|------|
| 공공데이터포털 | {kr_open_data} |
| KOSIS | {kosis} |
| stat.uz | {stat_uz} |
| Gemini API | {gemini} |
| fal.ai | {fal_ai} |
| ElevenLabs | {elevenlabs} |

## 통화·시간 환경

```
주요 통화: KRW + UZS + USD
환율 자동 조회: cbu.uz (UZ 중앙은행)
시간대: UZ (UTC+5, KST -4)
포맷: KRW 1,000원 / UZS 1 000 so'm / USD $1
```

## 응급·중요 연락처

| 항목 | 연락처 |
|------|--------|
| 한국 대사관 영사 | +998 71 252-3151~3 |
| Korean Medical Center | {korean_medical_center} |
| UZ 응급 (구급) | 103 |
| UZ 통합 응급 | 112 |
| 한국 외교부 | +82-2-3210-0404 |

## 활용 예시

이 프로필이 등록되면:

```
"Tashkent 자녀 학교 정보 줘"
→ 자동으로 gil-lifestyle:wellness-coach (uz-child-education) 호출
→ 자녀 나이 기준 필터링 (자동)
→ 거주 지역 (Tashkent) 학교만 필터
→ 언어 환경 (러시아어 {russian_level}) 고려한 옵션 우선

"UZ 출장 보고서"
→ gil-business → gil-office:docx-generator
→ 언어 자동 선택 (한국어 + 러시아어 — 본사 + UZ 자회사)
→ 통화 자동 (KRW + UZS + USD)
```

---

> 이 파일은 선택입니다. 등록하지 않아도 모든 기능 사용 가능.
> 수정·삭제: `/project apikey` 또는 직접 편집.
