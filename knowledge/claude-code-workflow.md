---
title: Claude Code Workflow
tags: [claude-code, ai-workflow, automation]
updated: 2026-04-19
maturity: draft
---

# Claude Code를 활용한 개발 워크플로우

> 이동희가 XREAL 프로젝트에서 실제로 운용 중인 AI 증강 개발 구조.

## 3-Agent 파이프라인

- **Planner** — 요구사항을 받고 작업을 분해. 전체 설계 먼저.
- **Generator** — Planner의 계획에 따라 코드 생성.
- **Evaluator** — Generator의 결과를 점검. Unity/C# 컨벤션, 성능, 게임 로직 일관성 관점에서 피드백.

각 역할은 `.claude/agents/`에 프롬프트로 분리되어 있고, 필요 시 슬래시 커맨드로 특정 에이전트만 호출 가능.

## CLAUDE.md 계층

- **Register (최상위 요약)** — 프로젝트 비전, 핵심 규칙. 짧게.
- **Cache (자주 쓰는 컨벤션)** — 파일명 규칙, 네이밍, 아키텍처 원칙.
- **RAM (상세 스펙)** — 필요할 때 참조할 세부 문서로 링크.
- **Disk (전체 코드베이스)** — RAG 또는 직접 탐색.

## 팀 지원

- **Discord 봇** — 비개발자 팀원(기획/디자인)이 "XX 씬 상태 어때?" 같은 질문을 자연어로 할 수 있게 함. 봇이 코드베이스를 쿼리하고 답변.

## 하지 말 것

- 매 세션마다 전체 코드베이스를 컨텍스트에 넣기 → 토큰 낭비.
- 모든 지식을 CLAUDE.md에 몰아넣기 → 계층 붕괴.
- Evaluator 없는 생성 → 실수 누적.

<!-- 실패 기록과 구체적 프롬프트 내용은 비공개 위키 -->
