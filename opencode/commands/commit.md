---
description: Stage and commit this session's changes as one or more focused commits.
---

# Commit

Session state:
- Status — !`git status`
- Diffstat — !`git diff --stat`
- Branch — !`git branch --show-current`

`$ARGUMENTS` may give a message hint or scope; otherwise infer intent from the diff.

Steps:
1. Read the diff (`git diff`, and `git diff --staged` for anything already staged) to understand what changed and why.
2. Group related files into one or more logical, atomic commits.
3. Stage each group with `git add <specific files>` — never `git add -A` or `git add .`.
4. Commit with a clear imperative message that explains *why* the change was made.
5. Show the result: `git log --oneline -5`.

Rules:
- Never add Claude/AI attribution, "Generated with…", or `Co-Authored-By` lines. The user is the sole author.
- Write each message as the user would.
- Don't ask for confirmation — the user ran `/commit` to commit.
