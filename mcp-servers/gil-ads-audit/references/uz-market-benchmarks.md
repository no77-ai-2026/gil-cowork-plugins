# UZ 시장 벤치마크 — gil-ads-audit MCP 확장

## 한국 시장 7 변화 영역에 UZ 매핑 추가

### 1. 벤치마크 8 카테고리 (한국 + UZ 비교)
| 카테고리 | 한국 CTR | UZ CTR | 한국 CPC | UZ CPC | 한국 ROAS | UZ ROAS |
|---|---|---|---|---|---|---|
| 식품/음료 | 1.5% | 2.1% | ₩450 | UZS 1,200 | 380% | 320% |
| 패션/뷰티 | 1.8% | 2.4% | ₩620 | UZS 1,800 | 450% | 380% |
| 건강기능식품 | 1.2% | 1.6% | ₩780 | UZS 2,200 | 320% | 280% |
| IT/디지털 | 1.0% | 1.4% | ₩890 | UZS 2,500 | 280% | 220% |
| 가정용품 | 1.4% | 1.9% | ₩520 | UZS 1,500 | 360% | 310% |
| 교육 | 0.9% | 1.3% | ₩950 | UZS 2,800 | 240% | 200% |
| B2B | 0.7% | 1.0% | ₩1,200 | UZS 3,500 | 180% | 150% |
| 기타 | 1.1% | 1.5% | ₩680 | UZS 1,900 | 300% | 260% |

(주: UZ 수치는 v0.1.0 placeholder. 정식 출처 확정 필요 — SPEC §7 OQ4)

### 2. UZ 규제 5종 (한국 5종에 대응)
| 한국 | UZ |
|---|---|
| 개인정보보호법(PIPA) | O'zbekiston ma'lumotlar himoyasi |
| 정보통신망법(ITNA) | Axborot va aloqa qonuni |
| 전상법 | Elektron tijorat qonuni |
| 표시광고법 | Reklama qonuni |
| 식약처(MFDS) | O'zbekiston Sog'liqni saqlash vazirligi |

### 3. UZ 광고 매체 EMQ (Event Match Quality)
- **Telegram Ads**: EMQ 6.5/10 (한국 메타 8.5 대비 낮음)
- **Yandex Direct**: EMQ 7.2/10
- **Facebook/Instagram in UZ**: EMQ 7.8/10 (VPN 사용자 비율 영향)
- **Google Ads in UZ**: EMQ 8.0/10

### 4. UZS 통화 처리
- 광고비 입력: UZS 또는 USD (둘 다 허용, 자동 환산)
- ROAS 계산: 매출/광고비 (동일 통화 강제)
- 환율: 일별 자동 갱신 (Central Bank of Uzbekistan API)
