---
title: Unity WebGL + UI Toolkit Patterns
tags: [unity, webgl, ui-toolkit, pbv]
updated: 2026-04-19
maturity: draft
---

# Unity WebGL 환경의 UI Toolkit 활용 패턴

> PBV 프로젝트에서 정립한 실전 패턴. 자세한 구현 예시는 아직 정리 중.

## 기본 원칙
- **Spacer 기반 간격 관리** — margin 대신 명시적 Spacer 엘리먼트. WebGL 환경의 렌더링 일관성을 위해.
- **Pretendard / NotoSansKR** 고정 — 한국어 UI 품질 확보.
- **WebGL 안전 입력 처리** — 브라우저 이벤트 루프와 Unity 입력 시스템의 경계에서 발생하는 이슈 회피.

## 커스텀 uGUI 드롭다운 (별도)
UI Toolkit이 아닌 uGUI 쪽에서 필요했던 커스텀 드롭다운은:
- DOTween으로 애니메이션
- 9-Slice 스프라이트로 반응형
- 브라우저 포커스 전환 시의 입력 누락 방지 패턴

## 상세 구현

TODO: 실제 USS/UXML 예제, 디자인 토큰 구조, 주요 컴포넌트 목록.

<!-- 자세한 코드는 공개해도 될지 판단 후 업데이트 -->
