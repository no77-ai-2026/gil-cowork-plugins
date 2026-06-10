# UZ Compliance 매트릭스 확장

## audit_uz_compliance 도구 (gil 신규 추가 1종)

기존 gil-ads-audit의 한국 5 규제 audit 위에 UZ 5 규제 audit 레이어 추가:

### 체크 항목
1. **광고 표기 의무** — 우즈벡어 또는 러시아어 광고 카피의 "광고/Reklama" 표기 존재
2. **소비자 보호** — 환불 정책 14일 (UZ 표준) vs 7일 (한국) 명시
3. **개인정보 처리** — 키릴/라틴 양식 동의서
4. **금융 광고** — 우즈벡 중앙은행(CBU) 라이선스 명시
5. **의료/건강** — O'zbekiston Sog'liqni saqlash vazirligi 사전 승인 표기

### Severity 점수
- Critical (5.0): 5종 규제 위반 — 즉시 광고 차단
- High (3.0): 카피 누락 — 7일 내 시정
- Medium (1.5): 양식 미비 — 30일 권장
- Low (0.5): 권고 — 차후 개선
