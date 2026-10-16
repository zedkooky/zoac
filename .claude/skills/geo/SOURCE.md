# GEO-SEO skills: source

Vendored from https://github.com/zubair-trabzada/geo-seo-claude (MIT, see LICENSE) at commit 989cae0, reviewed 16 Oct 2026.

Changes from upstream:
- Installed per project in `.claude/` instead of `~/.claude/`; paths rewritten to `.claude/skills/geo/…`.
- `geo-update` skill left out: it overwrites these files with unreviewed upstream code. To update, re-download, review the diff, and replace the files.
- Agency-only extras left out: Flask CRM web app, CRM dashboard script, install scripts, examples.

Python helpers need: `pip install -r .claude/skills/geo/requirements.txt` (Playwright browsers optional).
