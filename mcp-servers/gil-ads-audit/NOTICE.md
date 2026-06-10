# NOTICE.md — gil-ads-audit MCP Attribution

## Upstream Attribution

본 MCP 서버는 다음 오픈소스 프로젝트 방법론을 차용합니다.

### agricidaniel/claude-ads (MIT License)
- **저장소**: https://github.com/AgriciDaniel/claude-ads
- **버전 차용**: v1.5.1 (2026-05-13 시점, ⭐4,815)
- **라이선스**: MIT
- **차용 항목**:
  - 50-check audit matrix
  - 가중치 스코어링 공식 `S_total = Σ(C_pass × W_sev × W_cat) / Σ(C_total × W_sev × W_cat) × 100`
  - Severity 5.0/3.0/1.5/0.5 + 카테고리 가중치 30/30/20/20
  - A-F 등급 임계값
  - Quick Wins 로직
  - EMQ tiered targets
- **MoAI 측 차용**: cowork-plugins/mcp-servers/gil-ads-audit (modu-ai v2.5.0)
- **GIL 측 추가 확장**:
  - 한국 시장 7 변화 영역 유지 (모태 보존)
  - UZ 시장 매핑 추가 (UZ 광고 규제 5종·Telegram Ads·Yandex Direct EMQ·UZS 통화)
  - 한국 벤치마크 8 카테고리에 UZ 비교 컬럼

## License

본 MCP 서버는 MIT 라이선스 하에 배포됩니다. claude-ads(MIT) 및 modu-ai/cowork-plugins(MIT)의 라이선스 조건을 준수합니다.

## axlabs-mckinsey-pptx (MIT)

gil-office:pptx-designer의 맥킨지(컨설팅) 스타일 프리셋(40 슬라이드 아키타입·액션타이틀·MECE 방법론)은 [seulee26/mckinsey-pptx](https://github.com/seulee26/mckinsey-pptx) (MIT License, © 2026 AX Labs / 이승필)에서 차용했습니다. python-pptx 코드는 이식하지 않고 방법론·레이아웃 규칙을 pptxgenjs로 재구현했습니다.
