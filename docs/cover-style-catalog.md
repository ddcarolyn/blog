# ddcarolyn 封面/配图风格图谱 v0.1(2026-11-03)

> 用途:给博客封面和正文配图定调。以后说「用 K1 出一张」「这篇走 K4」就能定位,不用每次重新描述。
> 带图的选型页:`docs/style-lab/index.html`(本地打开,参考图不进仓库)。
> 现状:博客 8 张封面全是 X0(停用风格),由 `scripts/covers/briefs.json` 的 `_style` 一段 prompt 统一生成。

## 0. 命名规则

- 代号前缀:**K-** 韩系家族(keychron.kr 那一路),**E-** 编辑/杂志感,**W-** Wayne 式代码矢量图,**T-** 技术图纸,**X-** 已停用。
- 每个风格 = 一句话定义 + 像什么 + 适合哪个专栏 + prompt 骨架 + 负向约束。prompt 骨架是英文(生图模型吃英文稳),中文标签另给。
- 以后新增风格就在这里加一节,代号不复用。

## 1. X0 日系治愈小剧场(停用)

现在博客封面的风格。特征:卷发女孩侧脸 + 猫 + 绿植 + 奶油色 + 圆润软阴影 + 气泡标签,人物一定有表情,物件堆得满。这是「日系 slice-of-life 动画 / 治愈系插画」一路,不是韩系。

**停用规则(以后默认遵守):**
- 不出现卡通人物脸、不出现猫狗宠物、不堆绿植和马克杯这类「治愈道具」。
- 不用圆角气泡标签塞中文,文字要么不出现,要么走 K3 由代码叠字。
- 不要奶油色铺满 + 软阴影的「Lofi 女孩」质感。

## 2. 韩系家族(K-)

keychron.kr 的视觉 DNA,我从首页、소식(内容页)、매거진 和用户评测栏目逐张看过,拆成四点:
1. **底色是灰白/米灰/浅木色**,不是奶油黄;饱和色只当点缀(一颗橘色键帽、一枚薄荷绿 Esc)。
2. **主体是物件,不是人**。人最多出现手,不出现脸。
3. **影棚感的单一柔光**,硬朗 3/4 俯视或正侧视,留白大,构图干净到能直接压标题。
4. **字是粗黑体,压在图上或图旁**,不做装饰字体。

### K1 「K-素光」(K-Studio)— 推荐主调

- **一句话**:灰白影棚里一件实物隐喻,单一柔光,大留白,一个点缀色。
- **像什么**:keychron.kr 产品页/소식 封面(`k1-*` 参考图)。
- **适合**:出海实战、建站手记、AI 工作流(把抽象概念换成实物:权限 = 一把钥匙,币种 = 两枚硬币,爬虫 = 被挡在玻璃外的小装置)。
- **prompt 骨架**:
  ```
  Korean minimalist studio still life, 16:9. One physical object as the metaphor for the topic: {OBJECT}. Light grey-white seamless backdrop, matte surfaces, single soft diffused key light from upper left, subtle contact shadow, three-quarter top-down view. Muted palette (off-white, warm grey, pale wood) with exactly one accent color: {ACCENT}. Generous negative space on the {LEFT|RIGHT} third for a headline. Photorealistic product-photography finish, clean and quiet. No people, no text, no logos, no clutter, no plants, no cartoon elements.
  ```
- **专栏强调色当 ACCENT**:work 赭橙 / ai 紫 / build、growth、books 各取 categories.ts 里的 accent。
- **风险**:像卖货图。解法:每篇一个「道具隐喻」而不是真产品,不出现键盘品牌。

### K2 「K-桌面日常」(K-Desk Life)

- **一句话**:真实桌面一角,米白木色,日光,物件多但摆得整齐,有手无脸。
- **像什么**:keychron.kr 用户评测、Daily 栏目(`k2-*` 参考图)。
- **适合**:学习提升、个人专栏(每日记录、读后感)、「我在做某件事」类的文章。
- **prompt 骨架**:
  ```
  Korean lifestyle desk scene, 16:9, editorial photo. A tidy work desk by a window: {OBJECTS}. Off-white and pale oak tones, soft morning daylight from the side, shallow depth of field, matte textures. Composition calm and orderly, items aligned to the desk edge. Hands may appear, no faces. Natural, slightly warm but not yellow. No text, no logos, no cartoon, no pets, no excessive plants.
  ```
- **风险**:物件一多就滑回 X0 的「治愈」气质。守住三条:无脸、无宠物、不超过 4 件道具。

### K3 「K-字版」(K-Type)

- **一句话**:纯色或米灰色底 + 一个主体物件 + 代码叠的大字黑体标题。
- **像什么**:keychron.kr 首页 hero 和 소식 卡片的「图 + 粗黑体」(`k3-*` 参考图),韩国 app(Toss、배민)的 banner 也是这一路。
- **适合**:所有专栏;批量、兜底、没时间调图的时候。
- **做法**:生图只出「色底 + 物件」,文字由现有 `src/pages/covers/[slug].svg.ts` 这套 SVG 系统叠上去(不让模型写中文,彻底绕开错字)。色底直接用专栏 accent 的淡化版。
- **prompt 骨架**:
  ```
  Flat solid background in {HEX}, 16:9. A single {OBJECT} rendered as a clean matte 3D object or a cut-out photo, placed in the right 40% of the frame, soft studio light, small soft shadow. Left 60% is empty flat color for a headline. Korean app-banner aesthetic, calm, premium. No text, no gradients, no glow, no people.
  ```
- **风险**:单调。解法:主体物件每篇换,色底跟专栏走,已经够区分。

### K4 「K-线描」(K-Doodle)

- **一句话**:白底单线涂鸦,细黑线,一两处淡彩,人物可有但不渲染、不卖萌。
- **像什么**:韩国 editorial 常见的 doodle 插画(`k4-korean-doodle.jpg`)。注意 `k4-baoyu-flat-doodle-boundary.webp` 是**边界反例**:一旦加了填色、笑脸、马克杯,就回到 X0。
- **适合**:书架、推理读后感、奇思妙想这类个人专栏。
- **prompt 骨架**:
  ```
  Korean editorial doodle illustration, 16:9. Thin uniform black ink line on pure white, no shading, no outlines thicker than hairline. Simple figure or object: {SCENE}. At most two pastel fills ({ACCENT} and a pale grey), everything else unfilled. Lots of white space, hand-drawn but precise. Minimal facial features (dots and a line) or no face at all. No cartoon eyes, no pets, no plants, no text, no color background.
  ```
- **风险**:和 X0 一线之隔。负向约束必须带「no shading / no cartoon eyes / no pets」。

### K5 「K-软糯 3D」(K-Clay)— 备选

- **一句话**:哑光粘土感 3D 图标,圆角,奶灰底 + 一个饱和色,柔光。
- **像什么**:Toss / Kakao 的 app 插画。
- **适合**:AI 工作流、工具类文章的图标式封面。
- **prompt 骨架**:
  ```
  Soft matte clay 3D icon of {OBJECT}, Korean fintech-app illustration style, 16:9. Rounded forms, pale warm grey background, one saturated accent {ACCENT}, soft studio lighting, gentle ambient occlusion, no gloss, no plastic shine. Centered subject, lots of empty space. No text, no people, no glow.
  ```
- **风险**:最容易出「AI 塑料味」。备选,不作主调。

## 3. 编辑/杂志感(E-)

来自 Phil-design-skills(FANzR-arch,19 套 gpt-image-2 风格 skill,中文排版规范单独一份)。和韩系不冲突,适合给重磅文章「换一口气」。

### E1 「静纸标本」(Quiet Paper)

- 陈纸大留白、单一主体、手写中文大标题、一个高饱和色点。对应 skill `quiet-paper-specimen`。参考图 `e1-baoyu-minimal.webp` 气质接近(baoyu 的 `minimal` 预设)。
- 适合:书架、个人叙事、年度复盘。

### E2 「白盒杂志」(Mono Editorial)

- 白色空间 + 极浅透视网格、写实主体、画面唯一黑色锚点、高反差衬线大标题,5:2 超宽。对应 skill `mono-editorial-banner`。
- 适合:深度长文、专栏首发。

## 4. Wayne 式代码矢量图(W-)

### W1 「矢量图解」(Code SVG)

- **这是 Wayne 自己博客的默认做法**,不是 AI 生图:blog-eval 规则写明「公开博客配图默认 SVG 矢量图,不含真实经营数据」;正文图全部由 Python/SVG 代码画(流程图、对比表、漏斗),数据从文章里抽,不编造。参考 `w1-wayne-*.svg`。
- 他在 KryoZon SEO 博客里试过 AI 信息图(Nano Banana),结论是「文字和图表会幻觉」,改成代码 SVG;中段配图只做流程图和对比表两类,知识图谱被他自己否掉(「这跟目录有什么区别」)。
- **适合**:正文配图默认走这里;封面不走。你现在的 SVG 兜底封面就是这个家族。

## 5. 技术图纸(T-)

### T1 「工程蓝图」(Blueprint)

- 线型分级、尺寸标注、气泡编号、右下角标题栏。对应 Phil `engineering-blueprint-sheet`,至顶 AI 实验室的「专利说明书 / 等轴测蓝图」同路。
- 适合:硬核拆解(主题审计、架构、流程),一年用两三次。

## 6. 工具映射(谁来出图)

| 工具 | 是什么 | 对应风格 | 本机状态 |
|---|---|---|---|
| 鸭哥 grapeot/image-generation-skill | 生图引擎(gpt-image-2 / Gemini flash、pro / 放大),无风格库 | 全部 | Win 有 venv;Mac 克隆了但没 venv 没 .env,跑不了 |
| baoyu-cover-image(JimLiu/baoyu-skills) | 五维封面系统:type × palette × rendering × text × mood,20 个预设 | K1≈`--type minimal --palette mono --rendering digital`;K4≈`--style flat-doodle` 加负向 | 未装,本机只有 baoyu-post-to-wechat |
| baoyu-image-gen | 多后端生图 CLI(OpenAI / Gemini / MiniMax image-01 / 豆包 Seedream / 即梦 / Replicate) | 任意 | 未装;钥匙串里有 MiniMax key,可免费试(中文字弱) |
| Phil-design-skills(FANzR-arch) | 19 套风格 skill,gpt-image-2 专用,带中文排版规范 | E1 / E2 / T1 | 未装 |
| ZD-AI-Lab Tech-Article-Illustration-Master | 25 种设计史风格 + 情绪匹配 + 反 AI 病负向约束 | T1 及技术文 | 未装,负向约束值得抄 |
| Wayne 仓库 | 博客封面走 grapeot skill;正文 SVG 代码画;KryoZon 商业图走 ComfyUI(FLUX/Qwen)+ Nano Banana + Seedream,铁律「产品像素零 AI 想象」 | W1 | 他的 ComfyUI 在他的 Win 上 |
| 陈然 | **没找到**。搜了 GitHub / 公众号 / 知乎,只有机器学习博主陈然(清华、CMU)的播客,没有生图 skill | — | 需要你指一下是哪位 |

## 7. 建议的调子

- **封面主调 K1 素光**,专栏色当点缀色;**批量/兜底走 K3 字版**(图只出色底 + 物件,字由 SVG 叠);**个人专栏走 K4 线描**;**正文配图一律 W1 代码 SVG**。
- E1 / E2 / T1 留给一年几次的重磅文。
- K2、K5 先不作主调,等看过样图再说。

## 8. 下一步(等你拍板)

1. 从 K1 / K3 / K4 里选主调,或者说「三个都出样图」。
2. 我在 Mac 上把 grapeot skill 的 venv 和 .env 配起来(OPENAI_API_KEY 你自己粘),或者先用 MiniMax 免费跑一轮粗样。
3. `briefs.json` 改成 `_styles: {K1: ..., K3: ..., K4: ...}` + 每篇一个 `style` 字段,重出 8 张封面,先 localhost 预览再 push。

## 9. 样图记录(2026-11-03,MiniMax image-01 粗样)

- 已出 K1 / K3 / K4 × 两篇(Shopify 收款 / 没成就感)共 6 张,在 `docs/style-lab/samples/`(不进仓库),选型页顶部「样图」区可看,拼图 `samples/K1-K3-K4-samples.jpg`。脚本在会话 scratchpad `make_samples.py`,正式接入时并进 `scripts/covers/`。
- **MiniMax image-01 的坑**:`prompt_optimizer` 要关(开了会改风格);**不认 hex 色值**,K3 第一轮两张都出了桃色底,改成颜色名(very pale sage green)才对;物件描述要具体(「brass balance scale」出了金杯,「old-fashioned two-pan brass balance scale」才是天平);出的颜色比要求饱和一档。gpt-image 对 hex 和构图更听话,正式出图优先 gpt-image。
- K3 叠字:粗样用 PIL + PingFang SC Semibold 92px 左对齐,标题 / 副题 / 专栏色短杠 / 域名,正式版走 `[slug].svg.ts`。

## 10. 首屏「给来到这里的你」风格代号(L-,2026-11-03)

首屏不是封面,是一封信:标题 + 6 段 12 行浓缩版,完整中英文在 `/letter/`。组件 `src/components/LetterHero.astro` 用 `variant` 属性切换,底 / 纸 / 贴纸 / 字体四样分开,可以按代号混搭(「L3 的底 + L1 的贴纸 + L8 的字」)。四款手写/楷体自托管子集在 `public/fonts/`(小赖 / 悠哉 / 霞鹜文楷 Light / 马善政),贴纸在 `public/images/stickers/`。

| 代号 | 名字 | 一句话 | 字体 |
|---|---|---|---|
| L1 | 手帐贴纸 | 淡蓝点阵底、白纸斜放、胶带、卡哇伊贴纸 | 小赖 |
| L2 | 薄荷奶油 | 薄荷到奶油渐变、大圆角卡片、郁金香雏菊蝴蝶结 | 悠哉 |
| L3 | 水彩云朵 | 水彩晕染底、半透明磨砂纸、月亮星星 | 文楷 |
| L4 | 极简白盒 | 纯白留白、细线框、无贴纸、字正着放 | 文楷 |
| L5 | 信封邮票 | 信从淡蓝信封里抽出来,右上角邮票 + 邮戳 | 小赖 |
| L6 | 便签拼贴 | 每段一张彩色便签,错落贴在淡紫底 | 悠哉 |
| L7 | 拍立得 | 左边拍立得照片,右边素纸写信 | 文楷 |
| L8 | 蓝格笔记本 | 活页本内页、天蓝方格、最后一句划荧光笔 | 小赖 |
| L9 | 暮色蓝 | 长春花蓝渐变、细碎星点、米白信纸、月亮 | 悠哉 |
| L10 | 韩系杂志 | 淡鼠尾草色块、细黑体大标题、右边一张 K3 沙漏图、字正着放 | 文楷 |

- **她拍板:首页用 L10 韩系杂志**(index.astro 传 `variant="l10"`)。其余九个保留在组件里备用,选型页 `/stylelab/` 已删,总览图在 `docs/style-lab/L1-L10-overview.jpg`。
- **「韩系小清新」≠ X0 日系治愈**:她要的是冷色系、颜色不能深、手写体斜着写、可以有卡哇伊贴纸(云朵/星星/郁金香这类物件贴纸),但仍然不要卡通人物脸、宠物、奶油色软阴影。X0 的停用规则不变。
- 过程教训:整封信贴在图旁边「太占位置」;毛笔字 + 照片质感纸「太丑」;正着排的手写体她不要,要斜;只给一个方案不够,要一次给十个可挑。
