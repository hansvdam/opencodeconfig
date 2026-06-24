---
description: Research how the codebase works today and write findings to research/.
---

# Research Codebase

`$ARGUMENTS` is the research question. Document what exists today — do NOT suggest changes, critique, or propose improvements unless explicitly asked.

Today — !`date +%F`
Branch — !`git branch --show-current`

Steps:
1. If the question names files, read them fully (no limit/offset) first.
2. Delegate investigation to `@investigator`; use `@architect` to map one concept across services/languages, or `@boundaries` for service-boundary questions. Run independent angles in parallel, then read the key files cited.
3. Synthesize a factual map: what exists, where (`file:line`), and how the parts connect.
4. Write to `research/<today>-<kebab-desc>.md` using a bash quoted heredoc (not a large Write). Write the content shown between the fences:

```markdown
---
date: <today>
topic: <question>
branch: <branch>
---

# Research: <question>

## Summary
<direct answer, describing what exists>

## Findings
### <Area>
- <detail with `file.ext:line`>
- <how it connects to other parts>

## Key references
- `path:line` — <what's there>

## Open questions
<anything unresolved>
```

End with a short summary and the doc path.
