---
description: Research the codebase and write a phased implementation plan to plans/.
---

# Create Plan

`$ARGUMENTS` is the task (or a path to a ticket/spec file). Produce a complete, actionable plan with no back-and-forth — resolve open questions through research, not by asking.

Today — !`date +%F`

Steps:
1. If `$ARGUMENTS` names a file, read it fully (no limit/offset), plus any files it references.
2. Explore before planning. Delegate to `@investigator` for anything needing >3 reads or >2 greps; use `@architect` if the task spans services/languages. Run independent investigations in parallel, then read the key files the subagent cites.
3. Decide the approach from the evidence. If something is genuinely undecidable, pick the most reasonable option and note it under an "Open decisions" heading — do not stop to ask.
4. Write the plan to `plans/<today>-<kebab-desc>.md`. Use a bash quoted heredoc for this markdown file (`cat > plans/... <<'EOF' … EOF`) — a large Write can truncate silently on this runtime.

Plan structure (write the content shown between the fences):

```markdown
# <Title> — Implementation Plan

## Overview
<1–2 sentences: what and why>

## Current State
<What exists now (with `file:line` refs) and what's missing>

## What we're NOT doing
<Explicit out-of-scope items>

## Phase 1: <name>
- **File**: `path` — <change>
- <key code or notes>
### Success criteria
- Automated: <test/build/lint commands to run>
- Manual: <what a human must verify>

## Phase 2: <name>
<same shape>
```

Keep phases small and testable, reference real paths, and leave no unresolved questions. End by printing the plan's path.
