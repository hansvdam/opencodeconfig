import { readdir } from "node:fs/promises"
import path from "node:path"

/**
 * `list` — directory listing tool (like `ls`), dependency-free.
 *
 * OpenCode has no built-in `list` tool; models trained with a `list`/`ls`-style
 * tool (e.g. Qwen3-Coder-Next) keep emitting calls to it, which the `invalid`
 * fallback rejects. This satisfies those calls so they actually work.
 *
 * Portable: uses only Node built-ins and a plain tool object (OpenCode's registry
 * accepts any export with `description` + `args` + `execute`). No `@opencode-ai/plugin`
 * import, so it needs no node_modules — drop it in <config>/tool/ and restart.
 * The default export + filename make the tool id "list".
 */
export default {
  description:
    "List the entries (files and subdirectories) of a single directory, like `ls`. " +
    "Directories are suffixed with '/'. For recursive search or glob patterns, use the `glob` tool instead.",
  args: {
    path: {
      type: "string",
      description:
        "Directory to list. Relative paths resolve against the project directory. Defaults to the project directory.",
    },
  },
  async execute(args: { path?: string; directory?: string }, ctx: { directory: string }) {
    const rel = (args && (args.path ?? args.directory)) || "."
    const target = path.resolve(ctx.directory, rel)

    let entries
    try {
      entries = await readdir(target, { withFileTypes: true })
    } catch (e: any) {
      return `Cannot list ${target}: ${e?.message ?? e}`
    }

    if (entries.length === 0) return `${target} is empty.`

    const names = entries
      .map((e) => (e.isDirectory() ? `${e.name}/` : e.name))
      .sort((a, b) => a.localeCompare(b))

    return [`${target} (${entries.length} entries):`, ...names].join("\n")
  },
}
