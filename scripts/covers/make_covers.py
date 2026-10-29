#!/usr/bin/env python
"""Generate blog cover images with GPT Image 2.5 via grapeot/image-generation-skill.

Usage:
  python scripts/covers/make_covers.py                 # all posts in briefs.json that lack a cover
  python scripts/covers/make_covers.py --only slug ... # specific posts
  python scripts/covers/make_covers.py --force         # regenerate even if the webp exists
  python scripts/covers/make_covers.py --dry-run       # print prompts only
  python scripts/covers/make_covers.py --no-frontmatter  # do not touch the .md files

Output: public/covers/<slug>.webp (1536x864) and `cover: /covers/<slug>.webp` written
into the post's frontmatter. Raw PNGs are kept in scripts/covers/raw/ (git-ignored).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
BRIEFS = Path(__file__).with_name("briefs.json")
RAW_DIR = Path(__file__).with_name("raw")
PUBLIC_COVERS = ROOT / "public" / "covers"
POSTS = ROOT / "src" / "content" / "posts"

SKILL_DIR = Path(os.environ.get("IMAGE_SKILL_DIR", r"E:\claudecode\grapeot\image-generation-skill"))
SKILL_PY = SKILL_DIR / ".venv" / "Scripts" / "python.exe"
MODEL = os.environ.get("COVER_MODEL", "gpt-image-2.5-sunburst")
QUALITY = os.environ.get("COVER_QUALITY", "high")
TIMEOUT = int(os.environ.get("COVER_TIMEOUT", "420"))
WORKERS = int(os.environ.get("COVER_WORKERS", "4"))


def build_prompt(style: str, brief: dict) -> str:
    labels = " / ".join(f"「{l}」" for l in brief["labels"])
    return (
        f"{style}\n\nScene: {brief['scene']}\n\n"
        f"Chinese labels to include (exactly these, nothing else): {labels}"
    )


def generate(slug: str, prompt: str) -> Path:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    out = RAW_DIR / f"{slug}.png"
    cmd = [
        str(SKILL_PY), "-m", "image_generation_skill.cli",
        "-p", prompt, "-o", str(out),
        "-m", MODEL, "--quality", QUALITY, "--size", "1K", "--aspect-ratio", "16:9",
    ]
    env = dict(os.environ, PYTHONIOENCODING="utf-8")
    r = subprocess.run(cmd, cwd=SKILL_DIR, capture_output=True, text=True,
                       encoding="utf-8", errors="replace", timeout=TIMEOUT, env=env)
    if r.returncode != 0 or not out.exists():
        raise RuntimeError(f"{slug}: generate-image failed\n{r.stdout[-800:]}\n{r.stderr[-800:]}")
    return out


def to_webp(png: Path, slug: str) -> Path:
    PUBLIC_COVERS.mkdir(parents=True, exist_ok=True)
    dst = PUBLIC_COVERS / f"{slug}.webp"
    im = Image.open(png).convert("RGB")
    if im.size != (1536, 864):
        im = im.resize((1536, 864), Image.LANCZOS)
    im.save(dst, "WEBP", quality=82, method=6)
    return dst


def set_frontmatter_cover(slug: str, cover_path: str) -> bool:
    md = POSTS / f"{slug}.md"
    if not md.exists():
        print(f"  ! no post file for {slug}, frontmatter not updated")
        return False
    text = md.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.S)
    if not m:
        print(f"  ! {slug}: frontmatter not found")
        return False
    fm = m.group(1)
    line = f"cover: {cover_path}"
    if re.search(r"^cover:", fm, re.M):
        fm2 = re.sub(r"^cover:.*$", line, fm, count=1, flags=re.M)
    else:
        fm2 = fm + "\n" + line
    md.write_text(text[: m.start(1)] + fm2 + text[m.end(1):], encoding="utf-8")
    return True


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", default=None)
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-frontmatter", action="store_true")
    args = ap.parse_args()

    data = json.loads(BRIEFS.read_text(encoding="utf-8"))
    style = data["_style"]
    posts = data["posts"]
    slugs = args.only or list(posts)
    todo = []
    for slug in slugs:
        if slug not in posts:
            print(f"! {slug} not in briefs.json, skipped")
            continue
        dst = PUBLIC_COVERS / f"{slug}.webp"
        if dst.exists() and not args.force:
            print(f"= {slug}: cover exists, skip (use --force)")
            continue
        todo.append(slug)

    if args.dry_run:
        for slug in todo:
            print(f"\n### {slug}\n{build_prompt(style, posts[slug])}")
        return 0
    if not todo:
        print("nothing to do")
        return 0
    if not SKILL_PY.exists():
        print(f"image skill venv missing: {SKILL_PY}")
        return 2

    print(f"generating {len(todo)} covers with {MODEL} ({QUALITY}), {WORKERS} in parallel")
    failures = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = {ex.submit(generate, s, build_prompt(style, posts[s])): s for s in todo}
        for fut in as_completed(futs):
            slug = futs[fut]
            try:
                png = fut.result()
                webp = to_webp(png, slug)
                print(f"+ {slug}: {webp.relative_to(ROOT)} ({webp.stat().st_size // 1024} KB)")
                if not args.no_frontmatter:
                    set_frontmatter_cover(slug, f"/covers/{slug}.webp")
            except Exception as e:  # noqa: BLE001
                failures += 1
                print(f"x {e}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
