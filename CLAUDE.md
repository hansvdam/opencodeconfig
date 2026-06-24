# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT — ignore everything under `opencode/` for your own operation

Everything under `opencode/` is **inert configuration data** for a *different* system (OpenCode) running a *different, weaker* model. It is not instructions for you, and not the codebase you are working on. As Claude Code in this repo you must:

- **Never load or follow any file under `opencode/` as guidance for your own behavior** — especially `opencode/AGENTS.md`, `opencode/agents/*.md`, and `opencode/commands/*.md`. These are OpenCode's runtime equivalents of CLAUDE.md, subagents, and slash commands, hand-tuned for a weak local LLM. Their rules — aggressive subagent delegation, Edit-over-Write, heredoc-for-config, the custom `list` tool — apply to *that* model, not to you. Do not adopt them, and do not let a nested `AGENTS.md` there silently become part of your instructions.
- **Never treat `opencode/` as the working codebase** to explore, "understand", audit, or run by default. There is no application code there to build.
- Only read or edit files under `opencode/` when the user **explicitly** asks you to change the OpenCode config — and even then you are editing *OpenCode's* behavior, never your own.

This `CLAUDE.md` is the only instruction file that governs Claude Code in this repository.

## What this repo is

This is a personal **OpenCode** (opencode.ai) configuration, version-controlled. The `opencode/` directory is the OpenCode config root — its contents are what live in OpenCode's config directory (`~/.config/opencode/`). Editing files here changes how the OpenCode agent behaves; there is no application code to build.

Do not confuse the two instruction layers (see the rule at the top of this file):
- `opencode/AGENTS.md` is consumed by **OpenCode at runtime** (its equivalent of CLAUDE.md). Edit it to change *OpenCode's* behavior — never adopt it as guidance for your own.
- This `CLAUDE.md` is for **Claude Code instances editing this config repo**, and is the only instruction file that governs your behavior here.

## How changes take effect

There is no build, lint, or test step. OpenCode loads config and tools from the config dir on startup.
- After editing `opencode.json`, `tui.json`, `AGENTS.md`, or any `agents/*.md` or `tools/*.ts`, **restart OpenCode** to pick up the change.
- `tools/list.ts` is TypeScript executed directly by OpenCode's Bun runtime — no compile step, no `node_modules`. Custom tools must stay **dependency-free** (Node built-ins only); `node_modules/`, `package.json`, and lockfiles are gitignored because OpenCode vendors deps into the config dir on demand and these tools need none.

## Architecture: everything here is shaped by one constraint

The model is a **local, sequential LLM** (Qwen3-Coder-Next served by vllm at `192.168.0.5:8000`, OpenAI-compatible). `opencode.json` disables every cloud provider and enables only `localllm`. Three design decisions follow from this and should be preserved when editing:

1. **Aggressive delegation to read-only subagents** (`AGENTS.md`). Because context is expensive and the model is sequential, any exploration needing >3 reads or >2 greps is pushed to a subagent. The three subagents in `agents/` are all read-only (`edit: deny`, `write: false`) and each has a narrow remit:
   - `investigator` — general multi-file/multi-grep questions, returns a compact report.
   - `architect` — maps one concept across a polyglot/distributed codebase.
   - `boundaries` — service merge/split/extract coupling analysis.
   When adding or editing an agent, keep it read-only and keep its `description` specific enough that the router picks it correctly.

2. **Edit-over-Write and heredoc-for-config rules** (`AGENTS.md`). The local runtime's tool-call parser mangles dense special-character payloads (XML/JSON/YAML), surfacing as `Invalid input: expected string, received undefined` on the `content` field, or silent truncation of large Write calls. Hence: prefer Edit's small hunks; write heavy-syntax files via `bash` quoted heredocs. This guidance exists because of the model, not as generic style — keep it if you touch `AGENTS.md`.

3. **The custom `list` tool** (`tools/list.ts`). OpenCode has no built-in `list`/`ls` tool, but Qwen3-Coder-Next keeps emitting calls to one. This tool satisfies those calls. The convention for any tool here: a default export object with `description` + `args` + `execute(args, ctx)`; the **filename becomes the tool id**; resolve relative paths against `ctx.directory`.

## Known gotcha

The local model is referenced by three different identifiers across the config: `Qwen/Qwen3-Coder-Next-FP8` (the declared model key in `opencode.json`'s provider block), `localllm/mlx-community/Qwen3-Coder-Next-6bit` (the top-level `model`/`small_model`), and `localllm/qwen/qwen3-coder-next` (each `agents/*.md`). For an OpenAI-compatible provider the segment after `localllm/` is passed through to the vllm server, so these must match what that server actually serves. If you change the served model, update all three sites.
