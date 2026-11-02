#!/usr/bin/env python3
"""把 public/covers/*.webp 缩成列表用的小图 public/covers/thumbs/<同名>.webp。

首页/标签页的缩略图只显示 188×106（手机 92×52），原图 1536×864、70~120KB 一张，
手机网络下 8 张一起拉很容易超时。这里出 376×212（2x 清晰度）、质量 80 的小图，
PostRow 用 srcset 优先取它。新加封面后重跑一次即可；已存在且比原图新的会跳过。

用法:
  python3 scripts/covers/make_thumbs.py          # 增量
  python3 scripts/covers/make_thumbs.py --force  # 全部重做
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "public" / "covers"
DST = SRC / "thumbs"
SIZE = (376, 212)
QUALITY = 80


def main() -> int:
    force = "--force" in sys.argv
    DST.mkdir(parents=True, exist_ok=True)
    made = skipped = 0
    for src in sorted(SRC.glob("*.webp")):
        dst = DST / src.name
        if not force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
            skipped += 1
            continue
        with Image.open(src) as im:
            im = im.convert("RGB")
            # 先按比例裁到 16:9 再缩，避免变形
            w, h = im.size
            target = SIZE[0] / SIZE[1]
            if w / h > target:
                nw = int(h * target)
                im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
            elif w / h < target:
                nh = int(w / target)
                im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
            im = im.resize(SIZE, Image.LANCZOS)
            im.save(dst, "WEBP", quality=QUALITY, method=6)
        made += 1
        print(f"{src.name}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB")
    print(f"done: {made} made, {skipped} skipped -> {DST.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
