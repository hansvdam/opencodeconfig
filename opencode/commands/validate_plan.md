---
description: Verify an implemented plan against its success criteria and report.
---

# Validate Plan

`$ARGUMENTS` is the plan path. If empty, infer the plan from recent commits.

Recent commits — !`git log --oneline -20`

Steps:
1. Read the plan fully. List what should have changed (files, success criteria, behavior).
2. Delegate verification to `@investigator`: confirm the planned code/test changes are present, compare actual vs specified, and capture deviations — with `file:line` refs.
3. Run each automated check from the plan (test/build/lint) and record pass/fail.
4. Report:

```markdown
## Validation Report: <plan>
### Status
- Phase 1: <done / partial / missing>
### Automated checks
- <command>: <pass / fail>
### Deviations
- <planned vs actual, with refs>
### Manual testing needed
- [ ] <step>
```

Be honest about gaps. Follow-ups: `/implement_plan` to finish remaining work, `/commit` to record it.
