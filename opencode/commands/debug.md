---
description: Investigate a bug from git state, logs, and code — read-only, no edits.
---

# Debug

`$ARGUMENTS` describes the problem (optionally with a plan/ticket path to read).

State:
- Status — !`git status`
- Recent commits — !`git log --oneline -10`

Steps:
1. If a file path is given, read it fully. Restate expected vs actual behavior.
2. Delegate to `@investigator` in one brief: find the relevant logs and error/stack traces, check recent changes (`git diff`) against the symptom, and inspect the code path or data/config state involved. Ask it to return findings with `file:line` refs.
3. Report concisely:

```markdown
## Debug Report
### What's wrong
<one-line statement from the evidence>
### Evidence
- <error / log line / changed code, with refs>
### Likely cause
<best explanation>
### Next steps
1. <specific thing to try>
2. <fallback>
```

Read-only — do not edit files. Flag anything outside reach (browser console, network tab, external services) for the user to check.
