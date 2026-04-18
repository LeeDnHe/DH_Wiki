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

## GPU Instancing 활용 기준
- **같은 메시 · 같은 머티리얼**이 N개 이상 반복되는 오브젝트에만 적용. 1~2개뿐이면 오히려 오버헤드.
- **MaterialPropertyBlock**으로 색/파라미터 변주. 머티리얼 인스턴스 분기로 배치가 깨지지 않도록.
- 동적으로 스폰되는 프롭은 **프리팹 단계에서 Enable GPU Instancing**을 켜두고, 코드에서 머티리얼을 교체하지 않음.

## SRP Batcher 호환 셰이더 규칙
- 모든 머티리얼은 **Shader Graph 또는 SRP Batcher 호환 HLSL**로 통일. Standard Surface Shader는 금지.
- `UnityPerMaterial` CBuffer 레이아웃을 유지 — 프로퍼티 추가 시 전체 머티리얼 일괄 적용.
- 커스텀 셰이더는 Frame Debugger로 SRP Batcher 그룹이 끊기지 않는지 확인 후 머지.

## URP 경량화 설정
- **MSAA 2~4x** 기본. 8x는 비용 대비 이득 없음.
- **Post-processing 최소화** — Bloom/DoF는 씬 단위로 on/off. 풀타임 활성화 금지.
- **Shadow**: Realtime shadow는 주요 동적 오브젝트에만. 나머지는 라이트맵 + 베이크.
- **Renderer Features**는 필요한 씬에서만 활성화되도록 Renderer Asset 분리.

## 씬 로딩/해제 시 메모리 관리
- 씬 전환 직후 `Resources.UnloadUnusedAssets()` + `GC.Collect()` 1회 호출로 참조 끊긴 에셋 회수.
- **Addressable 명시적 Release** — `AsyncOperationHandle`를 보관해서 씬 해제 시 Release. 누락하면 텍스처가 VRAM에 남아 OOM 유발.
- **오디오 클립 스트리밍** — 긴 BGM은 `Load Type: Streaming`으로 VRAM 절약.
- 씬 간 공유 오브젝트는 별도의 Persistent 씬으로 분리, `DontDestroyOnLoad` 남발 금지.

<!-- 구체적 수치와 프로파일링 결과는 비공개 -->
