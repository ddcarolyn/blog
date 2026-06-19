---
title: 外包公司只给了一半代码？教你主动查清他们改了什么（Shopify 主题审计 SOP）
date: 2026-06-19
description: 和前端外包结束合作，对方说"代码只给一半"。但 Shopify 是 SaaS，线上跑的整套主题本来就在你后台。这篇是我整理的可照做 SOP——用 diff 把他们改过的每一行查出来。
tags: [Shopify, 主题, 外包交接, SOP, 独立站运营, diff]
category: Carolyn Log
---

和前端外包结束合作的时候，很容易遇到一个场景：对方交代码，内部反馈说"只给了一半，还有一半没给"，于是大家很头疼——怕缺东西，怕以后没法维护，怕换主题时踩坑。

但如果你们是 Shopify，这件事的焦虑有一半是个**误解**。我把主动核查的完整步骤整理成下面这份 SOP，写成可以直接照做的样子——从任意一台电脑取用、一步步跑都行。

> 用途：与前端外包结束合作时，主动盘清他们对 Shopify 主题做过的所有改动，为自己接手维护 / 更换主题做准备。

---

## 0. 一个必须先纠正的认知

**Shopify 是 SaaS，你线上正在跑的整套主题代码，100% 存在你自己的 Shopify 后台里，外包公司带不走。**
所以"对方只给了一半代码"这句话，要先分清指的是哪一半：

| 类别 | 在不在你手里 | 备注 |
|---|---|---|
| 线上正在跑的主题代码 | ✅ 完全在 | 后台可一键下载，是唯一可靠的"事实来源" |
| 主题历史版本 / 备份 | ✅ 基本在 | Shopify 自动保留旧版本 |
| 自建 App（挂在对方服务器上的） | ⚠️ 可能不在 | 真正可能缺的部分 |
| 开发工程（Git 仓库、构建工具、带注释源码） | ❌ 可能不在 | "缺的一半"最可能指这里 |
| 文档 / 密钥 / 第三方服务配置 | ❌ 常常没有 | 容易被忽略 |

**结论：对"更新 / 更换主题"这个目标来说，线上那套代码才是最权威的版本——它就是真实在跑的东西，比对方交付的任何版本都可信。**

---

## 1. 环境准备（在要执行的电脑上装好）

这套检测用到的工具就这几样（注意：用不到任何音频 / 其它无关软件）：

- **Node.js**（含 npm）— <https://nodejs.org> ，装 LTS 版
- **Shopify CLI** — 终端执行：`npm install -g @shopify/cli @shopify/theme`
- **Git** — <https://git-scm.com>
- **VS Code** — <https://code.visualstudio.com> （自带文件夹对比，用来看 diff）
- 一个有访问权限的 **Shopify 后台账号**（能进 Online Store → Themes）

验证：终端依次跑 `node -v`、`shopify version`、`git --version`，都能打印版本号就 OK。

---

## 2. 第一步：确认"基础母主题"是哪个

你这套主题一定是基于某个基础主题改出来的。先确认它叫什么、什么版本：

1. Shopify 后台 → **Online Store → Themes**
2. 看当前主题名字（如 *Dawn*、*Impulse*、*Prestige*、*Sense* 等）
3. 点 **⋯ → Edit code**，打开 `config/settings_schema.json`，最上面通常有 `theme_name` 和 `theme_version`，记下名字和版本号

> 这一步决定第 4 步去哪下原版。**免费主题**（如 Dawn）可在 GitHub / 主题商店免费拿原版；**付费主题**需要用购买账号去主题商店重新下载。

---

## 3. 第二步：下载线上正在跑的主题（事实来源）

**方式 A —— 后台点一下（最简单，零环境）**

1. 后台 → **Online Store → Themes**
2. 当前主题 → **⋯ → Download theme file**
3. Shopify 把整套主题打包成 zip 发到邮箱，下载解压即可

**方式 B —— 用 Shopify CLI 拉到本地（推荐，顺便建版本库）**

```bash
# 在一个空文件夹里
shopify theme pull
# 按提示登录店铺，选择要拉取的主题
```

---

## 4. 第三步：拿到母主题的"原版"

- **Dawn（官方免费主题）**：直接从开源仓库下对应版本 — <https://github.com/Shopify/dawn> ，在 Releases / Tags 里选到与第 2 步**相同的版本号**
- **其他免费主题**：到 Shopify Theme Store 对应页下载原版
- **付费主题**：用当初购买的账号登录，到 Theme Store → 已购主题重新下载

> 关键：原版版本号要和线上**尽量一致**，否则 diff 会混入"官方升级带来的差异"，干扰判断。

---

## 5. 第四步：跑 Diff —— 直接得出"他们改了哪些"

这是整套流程的核心。两份代码一对比，**所有差异 = 外包改过的每一处**。

1. 两份代码分别解压到两个文件夹：`live-theme/`（线上版本）、`base-theme/`（原版）
2. 用 VS Code 对比整个文件夹：
   - 选中 `base-theme` 文件夹 → 右键 **Select for Compare**
   - 再右键 `live-theme` 文件夹 → **Compare with Selected**
3. 读结果：
   - **新增文件** = 外包额外加的（自定义 section / snippet / 模板）
   - **被改文件**里的红绿差异 = 他们改动的每一行
   - 重点目录：`sections/`、`snippets/`、`templates/`、`assets/`（CSS/JS）、`layout/theme.liquid`、`config/settings_data.json`

**命令行替代方案：**

```bash
diff -rq base-theme/ live-theme/                  # 先看哪些文件不同
diff -ru base-theme/ live-theme/ > changes.diff   # 导出全部逐行差异
```

把对比结果存档，这就是给团队交代的"外包改动清单"。

---

## 6. 第五步：用 Git 把代码资产收编（长期）

避免以后再出现"不知道谁改了什么"：

```bash
cd live-theme/
git init
git add .
git commit -m "线上主题快照：交接基线"
```

之后每次改动都 commit，永远有版本记录。条件允许就推到自己的私有仓库。

---

## 7. 第六步：盘点 App、注入脚本和隐藏依赖

代码 diff 查不到的东西，单独盘：

- **App 清单**：Settings → Apps and sales channels，重点看有没有 **custom app / 自建 app**（这类可能连着外包的服务器）
- **注入脚本**：在 `layout/theme.liquid` 里搜 `<script>`、外部域名、追踪 / 像素代码，确认每段连到哪
- **结账脚本**：Settings → Checkout 里的 Additional scripts
- **Shopify Functions / Scripts**（如果用了）：在后台对应模块确认

---

## 8. 第七步：结束合作的"交接安全"动作

和查代码无关，但不做以后会出事：

- **撤销对方后台权限**：Settings → Users and permissions，删掉外包的 staff / collaborator 账号
- **轮换密钥**：Admin API token、custom app token、第三方服务密码全部重置
- **要清单而非要源码**：让对方交一份"改了 / 装了什么"的说明（用了哪些 app、自定义逻辑在哪几个文件、有无外部依赖）——比要源码更有用，源码你自己就能下

---

## 9. 注意事项 & 常见坑

- **不要在生产主题上直接改**：所有操作针对**下载下来的副本**或**复制出的草稿主题**，别动 Published 主题
- **版本要对齐**：原版和线上版本不一致时，diff 会混入官方升级差异，先对齐版本号
- **`settings_data.json` 差异多属正常**：这是主题设置（颜色、文案、模块开关），不一定是"代码改动"，区分对待
- **图片 / 字体等二进制资源**：diff 工具可能只提示"不同"不展示内容，按文件名和路径人工核对
- **先备份**：开工前把线上主题 zip 完整存一份归档，后续任何操作都不影响这份原始证据

---

### 一句话向团队汇报

> "线上主题代码本来就全在我们 Shopify 后台，外包带不走。我把它跟原版母主题做对比，他们改过的每一行、加的每个文件都能查出来。真正要追的是开发工程文档和那个自建 app（如果有），外加把对方的后台权限和密钥全部收回。"
