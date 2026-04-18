---
title: Photon Fusion 2 Patterns for Asymmetric VR Co-op
tags: [photon-fusion2, multiplayer, vr, asymmetric]
updated: 2026-04-19
maturity: draft
---

# 비대칭 협동 VR 멀티플레이 패턴 (Photon Fusion 2)

> XREAL Two of Us에서 사용하는 구현 패턴. 아직 초안.

## 비대칭 협동의 핵심 과제
- 두 플레이어가 서로 다른 정보를 봄 — 어디까지 동기화하고 어디까지 분리할지 결정
- 한쪽의 입력이 다른 쪽 세계에 영향을 미침 — 권한(authority) 설계

## 적용 중인 원칙
- **State Authority 명확 분리** — 각 퍼즐 요소별로 권한 주체 고정
- **이벤트 RPC 최소화** — NetworkedProperty 기반 상태 동기화 우선
- **시점 전용 로컬 상태** — 상대에게 보이면 안 되는 정보는 서버에 올리지 않음

## 상세 패턴

TODO: 
- Tick 기반 퍼즐 동기화 예제
- 예측/롤백이 VR에서 주는 영향
- 연결 끊김 복구 UX

<!-- 실전 코드는 공개 가능 여부 확인 후 업데이트 -->
