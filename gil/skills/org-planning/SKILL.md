---
name: org-planning
description: |
  조직 설계 — 헤드카운트 계획·팀 구조 최적화·리오그 시나리오를 설계합니다 트리거: "조직 개편안 짜줘", "헤드카운트 플랜", "팀 구조 검토"
version: "2.4.0"
uz: references/uz-org-planning.md
origin: anthropics/knowledge-work-plugins@2cf4294 (human-resources/org-planning, Apache-2.0)
---

# org-planning

## 스킬 개요(상세)

조직 설계 — 헤드카운트 계획·팀 구조 최적화·리오그 시나리오를 설계합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [경계] 개별 채용 실행은 gil:employment-manager·hiring-coordinator 체인.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 현지 법인 조직 설계 시 노동법상 해고 제약·노동계약 유형(기간제 관행) 반영. 상세는 `references/uz-org-planning.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: human-resources/org-planning -->
# Org Planning

Help plan organizational structure, headcount, and team design.

## Planning Dimensions

- **Headcount**: How many people do we need, in what roles, by when?
- **Structure**: Reporting lines, span of control, team boundaries
- **Sequencing**: Which hires are most critical? What's the right order?
- **Budget**: Headcount cost modeling and trade-offs

## Healthy Org Benchmarks

| Metric | Healthy Range | Warning Sign |
|--------|---------------|--------------|
| Span of control | 5-8 direct reports | < 3 or > 12 |
| Management layers | 4-6 for 500 people | Too many = slow decisions |
| IC-to-manager ratio | 6:1 to 10:1 | < 4:1 = top-heavy |
| Team size | 5-9 people | < 4 = lonely, > 12 = hard to manage |

## Output

Produce org charts (text-based), headcount plans with cost modeling, and sequenced hiring roadmaps. Flag structural issues like single points of failure or excessive management overhead.

