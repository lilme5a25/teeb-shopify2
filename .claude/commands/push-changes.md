---
description: Stage all changed theme files, commit with a descriptive message, and summarize what was changed
---

Review all modified files in the MyStore Shopify theme project, then:

1. Run `git status` to see what has changed
2. Run `git diff` to understand what exactly was modified
3. Group the changes into logical categories (e.g. CRO enhancements, bug fixes, new features, CSS updates)
4. Stage all changed files with `git add` (be specific — do not use `git add .` blindly, exclude any `.env` or secret files)
5. Write a clear, concise commit message that:
   - Has a short subject line (under 70 chars) describing the overall change
   - Lists the key files modified and what changed in each
6. Commit the changes
7. Report the commit hash and a summary of what was committed

Do NOT push to remote unless explicitly asked.
