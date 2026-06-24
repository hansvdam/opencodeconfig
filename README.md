# opencodeconfig

A version-controlled [OpenCode](https://opencode.ai) configuration. The `opencode/` directory in this repo mirrors OpenCode's global config directory one-to-one:

```
opencode/
├── opencode.json     # providers, model, permissions
├── tui.json          # theme (tokyonight)
├── AGENTS.md         # global rules applied to every session
├── agents/           # read-only subagents: investigator, architect, boundaries
└── tools/            # custom tools (list.ts)
```

"Using" this repo means making OpenCode load the contents of `opencode/` as its global config. There are three ways to do that, below.

> [!IMPORTANT]
> This config targets a **local vLLM server** (`192.168.0.5:8000`, OpenAI-compatible) and **disables every cloud provider**. Out of the box it only works if that server is reachable and serving `Qwen3-Coder-Next`. To use a different model/provider, edit `opencode/opencode.json` (the model id appears in three places).

## Prerequisites

- [Install OpenCode](https://opencode.ai/docs/) (the `opencode` CLI).
- A reachable model provider (see the note above).
- This repo cloned somewhere stable, e.g. `~/Projects/opencodeconfig`.

## Where OpenCode looks for global config

| OS | Global config directory |
| --- | --- |
| macOS / Linux | `~/.config/opencode/` |
| Windows | `%USERPROFILE%\.config\opencode\` (i.e. `C:\Users\<you>\.config\opencode\`) |

You can override this location with the `OPENCODE_CONFIG_DIR` environment variable (method B).

If a config dir already exists at the default location, **back it up first** so you don't lose it:

- macOS: `mv ~/.config/opencode ~/.config/opencode.bak`
- Windows (PowerShell): `Rename-Item "$env:USERPROFILE\.config\opencode" opencode.bak`

---

## Method A — Copy the files in

A plain copy into the default config location. Simplest and most portable — no symlinks or environment variables. The trade-off: you must re-run the copy after every `git pull`.

**macOS / Linux:**

```sh
mkdir -p ~/.config/opencode
cp -R opencode/. ~/.config/opencode/
```

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode" | Out-Null
Copy-Item -Recurse -Force opencode\* "$env:USERPROFILE\.config\opencode\"
```

## Method B — Point `OPENCODE_CONFIG_DIR` at this repo

No copying or symlinking. OpenCode reads config straight from your clone, so `git pull` is the only update step. Set the variable to the repo's `opencode/` subdirectory (not the repo root).

**macOS / Linux (zsh)** — add to `~/.zshrc`, then restart the shell:

```sh
export OPENCODE_CONFIG_DIR="$HOME/Projects/opencodeconfig/opencode"
```

**Windows (PowerShell)** — persist for the current user:

```powershell
setx OPENCODE_CONFIG_DIR "C:\Users\<you>\Projects\opencodeconfig\opencode"
```

Open a new terminal (so the variable is picked up) and run `opencode`.

## Method C — Symlink into the default location

Edits in the repo take effect immediately; `git pull` updates the live config.

**macOS / Linux:**

```sh
mkdir -p ~/.config
ln -s "$HOME/Projects/opencodeconfig/opencode" ~/.config/opencode
```

**Windows** — symlinks require an **admin** terminal or Developer Mode enabled.

PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config" | Out-Null
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.config\opencode" -Target "C:\Users\<you>\Projects\opencodeconfig\opencode"
```

cmd:

```bat
mklink /D "%USERPROFILE%\.config\opencode" "C:\Users\<you>\Projects\opencodeconfig\opencode"
```

---

## Verify it loaded

Launch `opencode` and confirm:

- The **tokyonight** theme is applied.
- The local model is selected (or change it with `/models`).
- The subagents `@investigator`, `@architect`, and `@boundaries` are available.
- The custom `list` tool works (it satisfies `ls`-style tool calls).

Restart OpenCode after any change to `opencode.json`, `tui.json`, `AGENTS.md`, or any file under `agents/` or `tools/` — config and tools are loaded at startup.

## Updating

```sh
git pull
```

With **Method B** or **C**, that's all. With **Method A** (copy), re-run the copy step.
