# Agent guidelines

## When to delegate to a subagent

Delegate to a subagent whenever a task would consume significant context without producing durable value in the main conversation. Specifically:

- **Any exploration requiring >3 file reads or >2 greps** → use `@investigator`.
- **Any cross-service / cross-language concept mapping** → use `@architect`.
- **Service-boundary questions (merge/split/extract)** → use `@boundaries`.
- **Running tests or long-output commands where only the summary matters** → delegate via `@investigator` with a bash-only brief.

Do NOT delegate:
- Single-file edits you already have the context for.
- Small clarifications that fit in one read.
- Actual code changes — subagents here are read-only by design.

## Output from subagents

When a subagent returns, treat its summary as authoritative for the scope it covered. Do not re-read the same files it already read unless you need a specific hunk it didn't include.

## Model is local and limited

The model running this session is local and sequential. Prefer one well-scoped tool call over many speculative ones. If you're about to read more than 3 files "to understand the lay of the land," stop and delegate to `@investigator` instead.

## Prefer Edit over Write

For existing files, always use the Edit tool (sends just the changed hunk) rather than Write (re-emits the entire file). Write is appropriate for new files or genuine full rewrites. Large Write payloads can exceed the output token budget and truncate mid-call, which fails silently as an `undefined` content field.

## Listing directories

There is no `list` tool. To list a directory, use `glob` with a pattern like `path/*` or `path/**/*`, or use `bash` with `ls`. Prefer `glob` for pattern matches and `bash ls` for quick inspection.

## Writing XML/JSON/YAML config files

When creating files with heavy XML, nested JSON, or other syntax with many quotes and angle brackets (e.g. `.csproj`, `.xml`, `.json`, `.yaml`, `web.config`), prefer `bash` with a heredoc over the Write tool. The Write tool's string argument can be mangled by the local LLM runtime's tool-call parser on content with dense special characters, which surfaces as `Invalid input: expected string, received undefined` on the `content` field. Example:

```
bash -c "cat > sources/Foo/Foo.csproj <<'EOF'
<Project Sdk=\"Microsoft.NET.Sdk\">
  ...
</Project>
EOF"
```

Use a quoted heredoc marker (`'EOF'`) so the shell does not expand `$` or backticks inside the body.
