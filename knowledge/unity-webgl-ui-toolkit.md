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

## 디자인 토큰 구조
- **계층**: `tokens.base.uss`(원시 색·간격·반경) → `tokens.semantic.uss`(의미 토큰: surface, border, accent 등) → 컴포넌트별 USS.
- **원시 값 직접 참조 금지** — 컴포넌트는 semantic 토큰만 바라보게 해서 테마 교체가 한 파일 수정으로 끝나도록 유지.
- **Spacer 스케일**은 토큰으로 고정(예: xxs/xs/sm/md/lg/xl). 인라인 수치 금지.

## UXML 구성 패턴
- **Template 재사용** — 반복되는 카드·패널·리스트 아이템은 `.uxml` 템플릿으로 분리하고 런타임에서 `TemplateContainer`로 clone.
- **상태는 클래스로** — `is-selected`, `is-disabled`, `is-loading` 등 상태 클래스를 USS에서 처리. 코드에서 스타일 직접 설정 금지.
- **Query 캐싱** — `rootVisualElement.Q<>()`는 초기 1회만 호출해 필드에 저장. 매 프레임 쿼리 금지.

## 주요 컴포넌트 유형
- **패널/모달** — 제목·콘텐츠·푸터 슬롯을 UXML 템플릿화.
- **리스트/드롭다운** — UI Toolkit `ListView` 기반 가상화 리스트 + 커스텀 아이템 템플릿.
- **파라미터 인스펙터** — 숫자/토글/슬라이더/컬러피커 조합. 데이터 바인딩은 `SerializedObject` 대신 경량 뷰모델로 직접 연결(WebGL 리플렉션 비용 회피).
- **토스트/알림** — USS 트랜지션 + 타이머 기반 자동 해제.

## 커스텀 uGUI 드롭다운 (별도)
UI Toolkit이 아닌 uGUI 쪽에서 필요했던 커스텀 드롭다운:
- DOTween으로 애니메이션
- 9-Slice 스프라이트로 반응형
- 브라우저 포커스 전환 시의 입력 누락 방지 패턴

<!-- 자세한 코드는 공개해도 될지 판단 후 업데이트 -->
