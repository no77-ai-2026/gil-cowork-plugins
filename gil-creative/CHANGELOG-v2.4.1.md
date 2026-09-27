# CHANGELOG — GIL v2.4.1 (2026-09-27) — 모태 데스크톱 범용성 동기화 1단계: MCP 안정성·정정 (패치)

모태 **modu-ai/moai-cowork** d71addc(v1.2.5) → **6bc6098a**(2026-09-26, Apache-2.0 유지) 중 **C(Windows·MCP 안정성)·F(정정)** 만 반영한 패치. 기능 추가(A 특허·상표 MCP, B GPT Image 2.5, D 검수 스킬)는 **v2.5.0**에서 진행한다. **ChatGPT Work·Codex 대응(.codex-plugin 매니페스트·workflow 진입 스킬·Higgsfield ChatGPT 경로·교차 호스트 버전 검사)은 사용자 결정으로 계속 제외**(Cowork 전용 원칙).

## 버전
- gil / gil-creative / gil-commerce 모두 2.4.0 → **2.4.1** (plugin.json ×3 + SKILL.md ×302 = 305지점)
- 스킬 302 불변(149 / 99 / 54), MCP 16 불변, 자격증명 입력칸 불변
- 롤백: `gil-bundles-v2.4.0-clean/` · `gil-upload-v2.4.0/`

## C. Windows·MCP 안정성 (벤더 서버 4종 + 런처)
3-way 병합(기준 d71addc 리브랜드본 ↔ GIL ↔ 모태 HEAD 리브랜드본). 코드 파일 충돌 0, 문서 5건만 GIL 쪽 유지로 해소.
- `gil_mcp_core`(cafe24·imweb·smartstore·threads-poster 벤더본): **여러 데스크톱 프로세스가 OAuth 토큰을 동시에 갱신할 때 잠금 직렬화**, 토큰 저장 **고유 임시파일**, **Windows 파일 교체 일시 충돌 재시도**, 동기화 결과 **UTF-8 기록**, 저장 실패 폴백 시 잠금 한계 명시
- gil-mcp-imweb: 토큰 저장 실패 경고, 쿠폰 요청 본문 oneOf 스키마 생성 수정(openapi·generator·tools 재생성)
- gil-mcp-cafe24: 클라이언트 경로 수정 + `tests/test_client_paths.py` 신규
- gil-mcp-smartstore: 자격증명 안내 정정, `check_auth.py` 경로
- `mcp-launch/mcp_launch.py`(gil·gil-creative 동일본): Windows cmd 런처 실행 수정. 테스트를 런처 옆 `test_mcp_launch.py`로 이동(구 `tests/`는 import 경로가 깨져 있던 결함 — 제거), 모태 레이아웃 전용 테스트 1건을 **GIL 번들 간 런처 동일성 검사**로 교체
- 문서의 ChatGPT Work·`.codex-plugin`·`plugins/moai-seller` 경로 문장은 GIL 경로로 교정·삭제
- **테스트**: cafe24 35 · imweb 34 · smartstore 28 · threads-poster 123 · mcp-launch 25(+1 skip)×2 = 전부 PASS

## C. humanize-korean (gil)
- 모태 korean-humanize 1.4.6 계보: **원문 보존 `01_input_original.txt`**(의미 보존 검수 기준)과 위생 처리본 `01_input.txt` 분리, **Phase 6 판정·근거를 `summary.md`에 기록**(판정 없음·`hold_and_report`는 검수 완료본 아님), 카피 앵커 검토 의무, 의미 보존 재작성 지침(quick-rules·rewriting-playbook·contextual-review·final-review·taxonomy), `verify_gates.py`·`metrics_v2.py` 수정
- GIL 고유 `scripts/` 배치·post-editese·strict-pipeline-spec 보존. `humanize_html.py`(모태 선택 도구)는 GIL 미탑재라 HTML 이스케이프 수정은 해당 없음
- 테스트 116 → **119 PASS**

## F. 정정
- **질문 채널 계약** — `gil:project` `common-rules.md` **§12 신설**(HARD): 질문 채널=런타임 질문 수단(Cowork=`AskUserQuestion`), 하위 실행·채널 없음이면 산문 되묻기 대신 **누락 입력·이유·재개 방법 blocker 반환**, 무응답≠거절≠승인, 승인 게이트는 명시적 선택으로만. 44개 파일 85곳의 `AskUserQuestion` 직접 지명을 `질문 채널(AskUserQuestion)`로 일반화(이미 "구조화 질문 도구" 표로 일반화된 곳·제목·주석은 유지)
- **커리어 성과 보장 문구 삭제** — interview-coach(합격률 "비약적" 패턴·복장 단정), portfolio-guide("메모장으로 합격"·"1시간 노션"·"2만뷰 검증"), resume-builder(헤드헌터 관행 단정 5줄) 14곳을 근거 중립 표현으로
- **gil-commerce:marketplace-curation** — 모태 공식 경로 재작성 병합: 입점 "가이드"→"입점 제안 자료 준비", 무신사·29CM·카카오 메이커스 **공식 신청 경로 링크**, 미확인 수수료·심사 기간·통과율·재신청 제한 단정 삭제(구 "주의사항" 60%+·매출 보장 문구 제거), kakao-makers.md 재작성, tests `execution_status: NOT-RUN` 명시. GIL 관련 스킬·비사용 조건 섹션 보존
- 제외: 모태 "동반 플러그인 없이 단독 설치" 경로 수정은 moai 18플러그인 구조 전용이라 해당 없음. Cafe24 공식 MCP 범위 문서 커밋은 보고서만 변경이라 해당 없음

## 게이트 (전수 PASS)
YAML·꺾쇠·kebab·dir==name·예약어 0 · `moai-[a-z]+[:/]` 0 · `gil-도메인:` 0 · 백틱 교차참조 끊김 0 · 충돌 마커·.MERGE 0 · 버전 305지점 2.4.1 · `check-plugin-runtimes` 오류 0 경고 0 · 네임스페이스 스크립트 dry-run = v2.4.0 기준선과 동일(68파일, 신규 증가 0) · zip 슬래시·plugin.json 최상위
