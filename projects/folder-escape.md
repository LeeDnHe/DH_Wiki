---
title: FolderEscape
status: active
period: 2026~
role: Solo Developer (기획·개발·사운드 전반)
stack: [TypeScript, Vite, GSAP, Tauri, Web Audio API]
team:
  - 이동희 (Solo)
milestones:
  - MVP (10 스테이지) 완성 — 스토브인디 공모전 제출
  - Stage 00~11 구현 완료
  - Stage 12 제작 중
---

# FolderEscape

## 개요
"너는 삭제 예정인 파일에 갇혔다." 파일 탐색기 안에서 `unknown_file.???`에 갇힌 플레이어가 주변 파일·폴더를 조작해 탈출하는 OS 해킹 퍼즐 게임.

## 핵심 특징
- **주소창이 곧 진행도** — 브레드크럼이 전체 탈출 경로를 표시하고, 스테이지를 클리어할 때마다 세그먼트가 하나씩 사라지며 루트(`C:`)에 가까워짐. 별도의 스테이지 선택 화면 없음.
- **메타적 몰입 장치** — 실제 Windows 탐색기 UI를 HTML/CSS로 재현. 커서 자체가 플레이어의 손이 되고, "내가 파일"이라는 감각이 핵심 훅.
- **조작 순서 중심의 Softlock 설계** — 잘못된 순서로 조작하면 퍼즐이 풀 수 없는 상태(Softlock)에 빠질 수 있음. Ctrl+Z와 F5(새로고침)로 복구 가능.

## 기술 도전
- 탐색기 UI 통일성 유지 — 아이콘/목록/타일 뷰 전환이 퍼즐의 일부로 작동하도록 레이아웃/그리드 체계를 명시적으로 고정.
- 파일 속성의 의미론 설계 — 이름(`NAME_BEHAVIOR_MAP`)과 확장자(`EXT_BEHAVIOR_MAP`)가 파일의 성질·행동을 결정하는 매핑 테이블 구조.
- Web 기반에서의 퍼즐 연출 — GSAP 애니메이션과 Web Audio 효과음으로 Stage 03 폭발·Stage 04 중력 낙하 같은 물리 연출 구현.

## 역할
1인 개발. 기획·TypeScript 구현·사운드·UI 전반. `.claude/agents/`에 Planner/Generator/Evaluator 3-Agent 파이프라인을 구성해 운용.

## 배포/전시 타깃
- 스토브인디 공모전 MVP(10 스테이지) 제출 완료
- Steam (PC) 타깃. Tauri 데스크탑 패키징 준비 중.

<!-- 세부 스테이지 솔루션·내부 기획 메모는 비공개 위키 -->
