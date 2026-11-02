#!/usr/bin/env python3
"""把 public/covers/*.webp 缩成两档小图：
  public/covers/thumbs/<同名>.webp  376×212  列表行、侧列小卡用（约 10~15KB）
  public/covers/mid/<同名>.webp     768×432  卡片网格、文章头图的 2x 档（约 25~40KB）

原图 1536×864、70~120KB 一张，手机网络下首页十几张一起拉很容易超时；
PostCard / FeaturedCard / 文章页用 srcset 让浏览器按显示宽度挑最小够用的那档。
新加封面后重跑一次即可；已存在且比原图新的会跳过。

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
VARIANTS = [
    ("thumbs", (376, 212)),
    ("mid", (768, 432)),
]
QUALITY = 80


def main() -> int:
    force = "--force" in sys.argv
    made = skipped = 0
    for folder, size in VARIANTS:
        dst_dir = SRC / folder
        dst_dir.mkdir(parents=True, exist_ok=True)
        for src in sorted(SRC.glob("*.webp")):
            dst = dst_dir / src.name
            if not force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
                skipped += 1
                continue
            with Image.open(src) as im:
                im = im.convert("RGB")
                # 先按比例裁到 16:9 再缩，避免变形
                w, h = im.size
                target = size[0] / size[1]
                if w / h > target:
                    nw = int(h * target)
                    im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
                elif w / h < target:
                    nh = int(w / target)
                    im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
                im = im.resize(size, Image.LANCZOS)
                im.save(dst, "WEBP", quality=QUALITY, method=6)
            made += 1
            print(f"{folder}/{src.name}: {src.stat().st_size // 1024}KB -> {dst.stat().st_size // 1024}KB")
    print(f"done: {made} made, {skipped} skipped")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
