---
title: VR Performance on Meta Quest
tags: [vr, quest, performance, unity]
updated: 2026-04-19
maturity: draft
---

# Meta Quest 성능 최적화 노트

> XREAL 프로젝트 기준 실전 노하우. Quest 3 타깃.

## 핵심 관심사
- **Draw call 감축** — standalone VR의 절대 제약
- **Fill rate vs. Geometry** — Quest 3 SoC 특성 고려
- **Rendering path 선택** — Forward / Mobile 기준

## 크로스 플랫폼 리서치
- Quest 3 vs. Samsung Galaxy XR 렌더링 특성 비교 (진행 중)

## 상세 패턴

TODO:
- GPU Instancing 활용 기준
- SRP Batcher 호환 셰이더 규칙
- URP 경량화 설정
- 씬 로딩/해제 시 메모리 관리

<!-- 구체적 수치와 프로파일링 결과는 비공개 -->
