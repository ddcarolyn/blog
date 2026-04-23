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
description: 简短摘要
tags: [随笔]
---

正文……
```

## 写 Share（碎片）

在 `src/content/shares/` 下新建 `.md` 文件：

```markdown
---
date: 2026-04-23T20:00:00
tags: [想法]
---

短内容……
```

## 部署

推送到 `main` 分支，GitHub Actions 会自动构建并发布到 GitHub Pages。
