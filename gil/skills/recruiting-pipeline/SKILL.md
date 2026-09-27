---
name: recruiting-pipeline
description: |
  채용 파이프라인 추적 — 단계별 후보자 현황·병목·전환율을 관리합니다 트리거: "채용 현황 정리", "후보자 파이프라인", "포지션별 채용 진행률"
version: "2.4.1"
uz: references/uz-recruiting-pipeline.md
origin: anthropics/knowledge-work-plugins@2cf4294 (human-resources/recruiting-pipeline, Apache-2.0)
---

# recruiting-pipeline

## 스킬 개요(상세)

채용 파이프라인 추적 — 단계별 후보자 현황·병목·전환율을 관리합니다. 한국 표준 + UZ 듀얼 컨텍스트를 적용합니다.

**한국화 노트**: [경계] 서류 평가는 gil:resume-screener, 오퍼는 gil:draft-offer — 이 스킬은 파이프라인 운영 뷰.

**도구 일반화**: 원문의 미국 SaaS 연동은 방법론으로만 계승한다 — 한국 실무에서는 연결된 커넥터·업로드 문서·사용자 제공 정보를 소스로 쓴다.

**UZ 컨텍스트**: UZ: 주요 채용 채널(hh. 상세는 `references/uz-recruiting-pipeline.md`.

---

## 원문 방법론 (EN, knowledge-work-plugins)

<!-- source: human-resources/recruiting-pipeline -->
# Recruiting Pipeline

Help manage the recruiting pipeline from sourcing through offer acceptance.

## Pipeline Stages

| Stage | Description | Key Actions |
|-------|-------------|-------------|
| Sourced | Identified and reached out | Personalized outreach |
| Screen | Phone/video screen | Evaluate basic fit |
| Interview | On-site or panel interviews | Structured evaluation |
| Debrief | Team decision | Calibrate feedback |
| Offer | Extending offer | Comp package, negotiation |
| Accepted | Offer accepted | Transition to onboarding |

## Metrics to Track

- **Pipeline velocity**: Days per stage
- **Conversion rates**: Stage-to-stage drop-off
- **Source effectiveness**: Which channels produce hires
- **Offer acceptance rate**: Offers extended vs. accepted
- **Time to fill**: Days from req open to offer accepted

## If ATS Connected

Pull candidate data automatically, update statuses, and track pipeline metrics in real time.

