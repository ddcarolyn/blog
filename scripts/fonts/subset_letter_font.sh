#!/usr/bin/env bash
# 把首页信带(src/lib/letter.ts)用到的字从三款 OFL 字体里抠出来做成 woff2 子集;改了信的文案后重跑。
# 用法: scripts/fonts/subset_letter_font.sh xiaolai=/path/Xiaolai-Regular.ttf yozai=/path/Yozai-Regular.ttf wenkai-light=/path/LXGWWenKai-Light.ttf
# 字体来源(GitHub release):lxgw/kose-font(小赖) / lxgw/yozai-font(悠哉) / lxgw/LxgwWenKai(霞鹜文楷 Light)
# 需要 fonttools + brotli:PYFTSUBSET=/path/to/venv/bin/pyftsubset
set -euo pipefail
cd "$(dirname "$0")/../.."
[ $# -gt 0 ] || { echo "用法: $0 name=/path/font.ttf ..."; exit 1; }
CHARS="$(mktemp)"
python3 - <<'PY' > "$CHARS"
import re
s=open('src/lib/letter.ts',encoding='utf-8').read()
body=s
chars=set(re.sub(r"[\s'\[\],;=]","",body))
chars |= set("读完整的信→Carolyn0123456789，。：、！？—")
print(''.join(sorted(c for c in chars if c.strip())))
PY
PYBIN="${PYFTSUBSET:-pyftsubset}"
for pair in "$@"; do
  name="${pair%%=*}"; src="${pair#*=}"
  "$PYBIN" "$src" --text-file="$CHARS" --flavor=woff2 --layout-features='*' \
    --output-file="public/fonts/${name}-letter.woff2"
  ls -la "public/fonts/${name}-letter.woff2"
done
rm -f "$CHARS"
