---
description: Implement an approved plan from plans/, phase by phase.
---

# Implement Plan

`$ARGUMENTS` is the plan path. If empty, use the newest file in `plans/`.

Steps:
1. Read the plan fully, plus every file it references (no limit/offset). Note any existing `- [x]` and resume from the first unchecked item.
2. Implement one phase at a time, following the plan's intent. Adapt to what the code actually shows; if reality clearly contradicts the plan, state the mismatch (Expected / Found / Why it matters) and proceed with the sensible fix rather than stopping.
3. After each phase, run the project's automated checks (test/build/lint — detect the commands from the repo) and fix failures before moving on.
4. Check off completed items in the plan file with `Edit` as you go.
5. Use `@investigator` sparingly — only for targeted debugging of unfamiliar code.

When all phases are done, print a short summary and list the plan's manual-verification items for the user to test. Do not pause mid-run waiting for confirmation.
