---
description: Check out a colleague's branch in a git worktree for local review.
---

# Local Review

`$ARGUMENTS` is `gh_username:branch` (e.g. `alice:eng-1696-fix-auth`).

Steps:
1. Split `$ARGUMENTS` on `:` into USER and BRANCH. Derive SHORT from a ticket id in the branch (e.g. `eng-1696`) or a sanitized branch slug. Get REPO from `git remote get-url origin` (basename, no `.git`), falling back to the current directory name.
2. Add the remote if missing: `git remote get-url USER` || `git remote add USER git@github.com:USER/REPO`.
3. Fetch it: `git fetch USER`.
4. Create the worktree: `git worktree add -b BRANCH ~/wt/REPO/SHORT USER/BRANCH`.
5. Install deps in the worktree using whatever the repo uses — detect from the manifest/lockfile (`package.json` → npm/pnpm/bun install, `pyproject.toml`/`poetry.lock` → poetry install, `go.mod` → go mod download, a `Makefile` setup target, etc.).
6. Print the worktree path so the user can `cd` into it and open it in OpenCode.

If the worktree already exists, tell the user to remove it first (`git worktree remove`). If the fetch fails, check the username/repo. If install fails, report the error but still print the path.
