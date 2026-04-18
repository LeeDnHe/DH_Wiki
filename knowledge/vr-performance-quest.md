---
title: "XREAL Two of Us에서 내가 맡은 VR 개발"
tags: [vr, quest, xreal, unity, photon-fusion, xr-interaction-toolkit]
updated: 2026-04-19
maturity: draft
---

# XREAL Two of Us에서 내가 맡은 VR 개발

> Meta Quest 협동 VR 게임 "XREAL Two of Us"에서 Unity/C#/XR 구현 쪽을 맡고 있는 부분 위주로 정리해둔 노트. 프로젝트의 `CLAUDE.md`, `docs/`, 메모리에 실제로 박혀 있는 결정에서만 가져왔다.

## 스택과 전체 구조

- 엔진: Unity 6 (6000.x) / C#
- XR: XR Interaction Toolkit + OpenXR → Meta Quest
- VR 그랩: AutoHand
- 네트워크: Photon Fusion 2 (`NetworkBehaviour`, `NetworkRunner`) — 팀 내 멀티플레이 담당자와 공유
- 씬 흐름: LoadingScene → LobbyScene → MainScene(Stage 1~5) → ReportScene
- 역할: Observer(1) / Explorer(2) — `GameConstants.PlayerRole`

## 내가 주로 맡은 범위

- Unity/C#/XR 구현 전반
- 시스템 간 통신을 묶는 **이벤트 버스 아키텍처**(`EventsManager`) 결정과 구현
- **VR 인터랙션 시스템** — Magic Gun / VR Socket / Block Stepping
- **NPC 대화 게이트** 기반 스테이지 진행
- **VR 친화적 UI 패턴** — 로비 메뉴, 페이드 전환, VR 더블클릭 방지, Emotion UI, Flashlight UI, Explorer Marker 등

팀 내 다른 영역은 따로 맡은 분들이 있다: 순수 멀티플레이 구현, LLM 분석, 애니메이션·연출, UI/프랍 디자인, 레벨 디자인.

## 이벤트 버스: 시스템 간 통신을 묶기

모든 시스템 간 통신을 `EventsManager` 싱글턴을 통한 이벤트 버스 방식으로 정리해뒀다. 스테이지·NPC·스폰·시나리오 등 종류별로 분리.

- `stage1Events` / `stage2Events` / `stage3Events` — 스테이지별 이벤트
- `npcEvents` — NPC 대화
- `spawnEvents` — 오브젝트 스폰
- `scenarioEvents` — 스테이지 클리어, 리스폰

구독은 **반드시 `Awake()`에서** 하는 걸 팀 공통 규칙으로 정했다. Fusion의 `Spawned()`가 `Start()`보다 먼저 호출될 수 있어서 `Start()`에서 구독하면 이벤트를 놓치는 일이 생긴다.

## Observer / Explorer 비대칭 역할

두 플레이어가 다른 인풋 채널로 같은 월드에 참여한다.

- **Observer(1)**: `ViewerGunHandler`로 총을 제어. X버튼으로 활성/비활성 토글.
- **Explorer(2)**: 직접 이동하고 블록을 밟아 퍼즐을 진행.

역할이 다르면 "볼 수 있는 것"과 "건드릴 수 있는 것"도 다르기 때문에, 핸들러를 역할 기준으로 나누고 같은 이벤트에 역할별 핸들러가 각자 반응하도록 짜는 쪽을 택했다. 예: `ExplorerMarkerController`는 `OnGunSpawned`가 아니라 `OnNPCDialogueEnded(Stage1)`에 붙여야 타이밍이 맞는다는 걸 실패하면서 배운 뒤 규칙으로 남겼다.

## VR 인터랙션 시스템

- **Magic Gun** (`Player_Tools/MagicGun/`) — 레이캐스트로 대상을 선택해 `RemoteSelectDragger`로 Y축 이동. `GunMovement`는 `NetworkBehaviour`로 동기화.
- **VR Socket** (`Interaction/VRSocketSystem/`) — 카드-소켓 매칭 퍼즐.
- **Block Stepping** (`Interaction/Step/`) — 블록 밟기. `Stage1Events.onStepped` 발행 → 오렌지 발광 + RPC 동기화.
- **Grab / Collision** — AutoHand 기반 집기와 충돌 반응 확장.

인터랙션이 네트워크에 걸릴 때 RPC는 `ScenarioSync.Main.RPC_*()`를 통해서만 호출하는 걸 ADR-004로 박아뒀다.

## VR 친화적 UI 패턴

로비/메인의 UI 스크립트 쪽(`Assets/02.Scripts/UI/`)에서 정리한 VR UI 공통 규칙.

- **3-State 스프라이트 교체** — normal / hover / clicked. `EmotionButton` 패턴을 이어받아 `LobbyMenuButton`, `SliderHandleVisual`로 확장.
- **isTransitioning 잠금** — VR 트리거 더블클릭을 막기 위해 전환 중 추가 클릭은 버린다.
- **`DOKill()` 먼저** — `UIAnim` 직접 호출 전 기존 트윈을 정리해 충돌 방지.
- **페이드 기반 전환** — `UIAnim.FadeIn/FadeOut` + `FadeUI`(OnEnable에서 자동 FadeIn)로 화면·패널 전환.
- **Canvas VR 검증** — `CanvasVRSetupValidator`, `HandCanvasPointerSetupValidator`로 VR 포인터·캔버스 설정이 엇나간 경우를 에디터/런타임에서 잡는다.

같은 UI 패턴을 Emotion UI, Flashlight UI, Explorer Marker, Mission Button 등에도 동일하게 적용한다.

## 씬 간 영속 설정

언어 같은 영속 설정은 `ApiModelConfig.Instance.SttLanguage`에 담아 `PlayerPrefs`로 저장한다. 로비의 `SettingPanelController`가 저장하고, 메인 씬의 각 스크립트가 `Awake()`에서 읽는 방식. 전달용 핸들러를 별도로 두지 않는 쪽을 택했다(로컬 UI용 영속 설정이라 RPC도 불필요).

## 코드 스타일 규칙 (팀 기준)

- 한국어 주석·영어 커밋(Conventional Commits).
- 매직 넘버 금지 → `const` 또는 `[SerializeField]`.

<!-- 구체 시나리오·성능 수치·사내 논의는 비공개 -->
