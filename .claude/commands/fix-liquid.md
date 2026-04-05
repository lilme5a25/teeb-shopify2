---
description: Scan all Liquid files for unclosed tags, missing endifs, and syntax errors then fix them
---

Scan every `.liquid` file in the project for Liquid syntax errors. Focus on:

1. Unclosed `{% if %}` / `{% for %}` / `{% unless %}` / `{% case %}` tags — every opening tag must have a matching closing tag (`{% endif %}`, `{% endfor %}`, etc.)
2. `{% liquid %}` blocks placed inside an open `{% if %}` or `{% elsif %}` branch instead of after `{% endif %}`
3. Mismatched `{% form %}` / `{% endform %}` pairs
4. Any tag that opens but is never closed before the end of the file

For each error found, show the file path, line number, the problem, and fix it directly. After fixing, confirm the corrected structure is valid.
