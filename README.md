# ddcarolyn.com

个人博客，使用 Astro 构建，GitHub Actions 自动部署到 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 生成 dist/
npm run preview  # 预览构建结果
```

## 写文章

在 `src/content/posts/` 下新建 `.md` 文件：

```markdown
---
title: 我的第一篇文章
date: 2026-04-23
description: 简短摘要（首页卡片和分享卡片都用它）
tags: [随笔]
category: books          # 专栏 slug，见下面「专栏」；写错会在构建时报错
cover: /covers/xxx.webp  # 可选；不填会自动生成一张带专栏色的文字封面
---

正文……
```

## 专栏

专栏登记表在 `src/lib/categories.ts`，一个专栏一行：slug、名字、英文副标、一句话、浅色/深色强调色。
首页的分类 tab、各专栏区块、`/c/<slug>/` 专栏页、文章页上的专栏标签、侧栏专栏列表、
SVG 兜底封面的配色全部从这张表取——**加一个新专栏 = 加一行，再给文章写 `category: <slug>`**。
没有文章的专栏不会出现在页面上。

现有：`work` 出海实战 · `ai` AI 工作流 · `build` 建站手记 · `growth` 学习提升 · `books` 书架。

## 封面

`public/covers/<slug>.webp`（1536×864）是原图。加了新封面后跑一次：

```bash
python3 scripts/covers/make_thumbs.py
```

会生成 `public/covers/thumbs/`（376×212）和 `public/covers/mid/`（768×432）两档小图，
页面用 srcset 按显示宽度取最小够用的那档，手机上首页不用再拉原图。
原图生成脚本 `scripts/covers/make_covers.py` 走 GPT Image，路径目前写的是 Windows 机器。

## 部署

推送到 `main` 分支，GitHub Actions 构建一次，同时发到：

- **Cloudflare Pages** 项目 `blog`（`blog-7if.pages.dev`，正式线路，ddcarolyn.com 指向这里）
- GitHub Pages（过渡期保留，DNS 切稳后可删 workflow 里的 `deploy-github-pages`）

Actions 需要仓库 secrets `CLOUDFLARE_API_TOKEN`（Pages 编辑权限）和 `CLOUDFLARE_ACCOUNT_ID`。
本地想先看效果：`npx wrangler pages deploy ./dist --project-name=blog --branch=preview`
会发到 `preview.blog-7if.pages.dev`，不碰正式站。
