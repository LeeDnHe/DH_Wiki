---
title: PBV 스마트 설계 시스템
status: active
period: 2024~
role: Developer (Unity WebGL 클라이언트)
stack: [Unity 6, WebGL, UI Toolkit, URP, Addressable, JSON Schema]
team:
  - 이동희 (Development)
milestones:
  - 충돌/거리/체적/무게 분석 기능 완성
  - 차체 높이 · 열 분석 개발 중
  - 주행 시뮬레이션 씬(AnimationScene) 개발 예정
---

# PBV 스마트 설계 시스템

## 개요
아키모스 개방형 설계 플랫폼(OnMakers 운영)의 **스마트 설계 시스템** 모듈. 웹 브라우저 위에서 Unity WebGL 빌드로 실행되며, 목적 기반 차량(PBV, Purpose-Built Vehicle)의 내·외장 구성을 3D 환경에서 자유롭게 설계·검토할 수 있는 인터랙티브 툴.

## 핵심 특징
- **데이터-주도 스폰** — `dynamic_properties.json`에 모든 차량·부품의 물리 속성, 배치 제약(Dot/Line/Plane), 스폰 후 자동 동작(카메라 이동, 자식 숨김, 도어 개방 등)을 정의. Addressable 레이블로 동적 로드.
- **JS ↔ Unity 양방향 연동** — 아키모스 웹에서 JSON 명령 전송, Unity에서 분석 결과·이벤트·측정값을 JS 콜백으로 회신. 모든 기능이 웹에서 제어 가능.
- **런타임 Hierarchy + 커스텀 Inspector** — UI Toolkit으로 씬 계층구조 뷰와 속성 편집창을 직접 구현. 선택·포커스는 씬과 양방향 동기화.
- **커맨드 패턴 Undo/Redo** — 스폰·삭제, 색상/텍스처, 기즈모 변환, 데칼, 환경 변경, 체적 계산까지 모두 커맨드 단위로 기록되어 Ctrl+Z/Ctrl+Y로 복원.
- **설계 검증 분석** — 메시 기반 충돌 분석(빨간 박스 시각화), 두 점 거리 측정, 체적/무게중심/관성 모멘트 계산, 총 무게 측정.

## 기술 도전
- 아키모스(OnMakers) 플랫폼과의 JS↔Unity 양방향 JSON 통신 (비동기 타이밍·에러 처리 포함)
- `dynamic_properties.json` 스키마 설계 — 차량/부품마다 물리 속성, 배치 제약(Dot/Line/Plane), 스폰 후 자동 동작(카메라 이동, 자식 숨김, 도어 개방 등)을 데이터로 기술
- UI Toolkit으로 런타임 계층구조(Hierarchy) 뷰와 커스텀 속성창(Inspector) 구현
- Unity WebGL과 브라우저 이벤트 루프 사이의 입력 경계 처리
- 대규모 부품 카탈로그(차량 5종 × 부품 40+종)의 Addressable 로드
- URP DecalProjector 기반 곡면 데칼의 정확한 투영과 배치 UX

## 역할
Unity WebGL 클라이언트 구현 전반. 아키모스 플랫폼 팀(OnMakers)과 연동 인터페이스를 협의해 구현.

## 배포 타깃
- 아키모스 플랫폼 내 스마트 설계 시스템 모듈로 서비스

<!-- 내부 수치·성능 데이터·클라이언트 논의는 비공개 위키 -->
