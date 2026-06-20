---
title: 如何给个人博客加一把锁：让有权限的人才能看，挡住爬虫和 AI
date: 2026-06-20
description: 个人博客是很好用的「随身资料库」，但默认全公开——只要知道网址，任何人、任何爬虫、任何 AI Agent 都能看到你的内容。这篇用大白话讲清原理，并给出一份实测可用的 Cloudflare 免费方案 SOP，还能一键复制成 Prompt 交给你的 AI 帮你执行。
tags: [Cloudflare, 建站, 隐私, 权限管理]
category: 建站笔记
---

## 一、背景：博客是个超好用的「随身资料库」

有一个自己的博客，真的很方便。

平时做的调研、周期性整理的数据、各种笔记和报告，往博客上一放，就等于挂到了云上——之后不管在公司、在家、用电脑还是手机，打开网址就能看，零摩擦。不用传文件、不用找 U 盘、不用「我电脑上那份是最新的吗」。

对经常要随时翻资料的人来说，这是个很舒服的工作方式。

## 二、风险：方便的另一面，是「裸奔」

但方便是有代价的。

绝大多数个人博客（包括我自己的，挂在 GitHub Pages 上）**默认是全公开的**。这意味着：**只要知道网址，全世界任何人都能看到里面的内容。**

平时你可能觉得「反正没人知道我的网址」。但今天这个假设已经不成立了——**现在 AI Agent 满天飞，它们会自动、大规模地抓取网页内容。** 你随手放上去的公司数据、私人资料，可能在你毫不知情的时候，就被某个爬虫或 AI 收走了。

也就是说：你以为只是「方便自己看」，实际上是「方便所有人和所有机器人看」。私密资料这么放，迟早出事。

## 三、思路：既要方便，又不泄密——加一把「邮箱白名单」的锁

我们想要的，其实是「既要又要」：

- **既要**继续用网址、随时随地无摩擦地访问；
- **又要**让没权限的人和机器人，连门都进不来。

实现这个，不用自己搭服务器、不用花钱。**用 Cloudflare 的免费方案就能给博客加一道锁**：访客打开你的私密网址 → 跳出一个登录框 → 输入邮箱 → 收一个验证码 → 你提前设好的「白名单」里有这个邮箱，才放行；否则一律挡在外面，爬虫和 AI 自然也进不来。

> 一句话原理：把私密内容放到 **Cloudflare Pages** 托管，再用 **Cloudflare Access** 加邮箱白名单。免费、几十分钟搞定，之后发布新内容只要 `git push` 就自动上线。

下面这套流程我已经亲自跑通、实测有效。

## 四、动手：把这套 SOP 交给你的 AI 来执行

这部分是最省事的地方——**你不需要自己对着教程一步步点。**

下面准备了一份「一键复制 Prompt」，里面打包了**给 AI 的使用说明 + 完整 SOP**。你只要：

1. 点下面的按钮复制；
2. 粘贴给你的 AI 助理（Claude、ChatGPT 等都行）；
3. 它会读懂这份 SOP，然后用大白话一步步带你做，遇到不懂的随时问它。

<div style="margin:1.5rem 0">
<button onclick="navigator.clipboard.writeText(document.getElementById('cf-prompt').textContent).then(()=>{this.textContent='✅ 已复制，去粘贴给你的 AI 吧';setTimeout(()=>{this.textContent='📋 一键复制 Prompt（含完整 SOP）'},2000)})" style="background:#2f6f6a;color:#fff;border:none;padding:.75rem 1.15rem;border-radius:8px;cursor:pointer;font-size:.95rem;font-weight:600">📋 一键复制 Prompt（含完整 SOP）</button>
<details style="margin-top:.6rem">
<summary style="cursor:pointer;color:#888;font-size:.85rem">展开看看要复制的内容（万一复制没反应，可在这里手动全选）</summary>
<pre id="cf-prompt" style="white-space:pre-wrap;background:rgba(120,120,120,.12);padding:1rem;border-radius:8px;font-size:.82rem;line-height:1.6;overflow:auto;margin-top:.5rem">你是我的技术助理。我想给我的个人静态博客加一个「私密二级站」：内容照常用网址访问，但只有我邮箱白名单里的人验证后才能看，其他人、爬虫和 AI 都打不开。

下面是一份已经实测成功的 SOP。请先完整读一遍、理解整套架构，然后用「小白能懂」的方式一步步带我做；每一步等我确认或回报结果后，再给下一步。开始前先问我三件事：1) 我的域名是什么、DNS 是否已经托管在 Cloudflare；2) 私密内容现在放在哪（哪个仓库或目录）；3) 允许访问的邮箱有哪些。注意：Cloudflare 后台是新版「Cloudflare One」，菜单位置以 SOP 里写的为准。

====== SOP：用 Cloudflare Pages + Access 搭私密站 ======

前提：域名 DNS 已托管在 Cloudflare（没有就先把域名 NS 指到 Cloudflare，只需做一次）。

原理：GitHub Pages 这类静态托管天生全公开、加不了登录验证。做法是把私密内容放到 Cloudflare Pages（源站只有 Cloudflare 能访问，绕不过去），再用 Cloudflare Access 加邮箱白名单。免费版 50 个名额，按整个账号共享。

阶段一 迁内容：
1. 建一个私有 Git 仓库，把私密内容（静态 HTML 等）放进去。
2. 做一个 index.html 当门户首页，把所有内容列出来，方便只记一个网址。

阶段二 建 Cloudflare Pages：
3. dash.cloudflare.com 进入 Workers &amp; Pages → Create。新版默认进的是 Workers 流程，Pages 入口在那个页面最底部一行小字「Looking to deploy Pages? Get started」，点 Get started。
4. Connect to Git → 授权并选中你的仓库 → Begin setup。
5. 构建设置：Framework preset 选 None，Build command 留空，Build output directory 填 /。然后 Save and Deploy。

阶段三 绑定子域名：
6. 进 Pages 项目 → Custom domains → Set up a custom domain → 填你的子域名（例如 hub.你的域名）。因为 DNS 在 Cloudflare，会自动配好解析和 HTTPS 证书，等状态变成 Active。

阶段四 加邮箱白名单（核心）：
7. 进 Zero Trust（新版叫 Cloudflare One）。首次进会让你起一个 team name、选套餐，选 Free（0 元；激活时可能要填一张卡，但不会扣费）。
8. 建策略：Access controls → Policies → Add a policy。名字自起，Action 选 Allow，规则 Include → Emails → 填允许访问的邮箱（可以填多行）。Save。
9. 建应用：Access controls → Applications → Create new application → Self-hosted。在 Destinations 填你的子域名（Subdomain 加 Domain，Path 留空）。Create。
10. 挂策略：回到这个应用 → Policies → Add existing policy → 勾选刚建的策略 → Save。挂好后该应用的 Policies 会显示 1 条。

阶段五 让登录页直接显示「输入邮箱」框（去掉多余的一次点击）：
11. 新账号默认登录方式是「Cloudflare」，登录页会多一个按钮要先点一下。想让它打开就直接是邮箱框：进 Integrations → Identity providers → Add new → 选 One-time PIN；再把原来的 Cloudflare 那一项删掉。只剩 One-time PIN 时，登录页就直接是「输入邮箱 → 收验证码」了。

验证与收尾：
12. 用无痕窗口打开你的子域名，应当弹出登录页要邮箱；名单内的邮箱收到验证码能进，名单外的进不去。（注意：你自己已经登录过，同账号下其它站会因为单点登录而免验证直接进，这是正常的。）
13. 把原来公开托管里、已经迁走的旧目录删掉，否则那些旧地址还在公开裸奔。

日常使用：以后发布新内容 = git push，几十秒自动上线；增减访问人 = 改 Policies 里的邮箱列表，秒生效。

====== SOP 结束 ======</pre>
</details>
</div>

如果你想自己照着做、或者先看看这套流程长什么样，下面是同一份 SOP 的可读版。

## 五、SOP 全文（可读版）

**前提**：你的域名 DNS 已经托管在 Cloudflare（没有的话，先把域名的 NS 指到 Cloudflare，这一步只做一次）。

**原理一句话**：GitHub Pages 这类静态托管天生全公开、加不了登录；所以把私密内容搬到 **Cloudflare Pages**（源站只有 Cloudflare 能访问），再用 **Cloudflare Access** 加邮箱白名单。免费版 50 个名额，按整个账号共享（不是每站 50）。

#### 阶段一　迁内容
1. 建一个**私有** Git 仓库，把私密内容（静态 HTML 等）放进去。
2. 做一个 `index.html` 当门户首页，把所有内容列出来——这样你只要记住一个网址。

#### 阶段二　建 Cloudflare Pages
3. 进 `dash.cloudflare.com` → **Workers & Pages** → **Create**。⚠️ 新版默认进的是 Workers 流程，**Pages 入口藏在页面最底部一行小字**「Looking to deploy Pages? **Get started**」，点它。
4. **Connect to Git** → 授权并选中你的仓库 → **Begin setup**。
5. 构建设置：Framework preset 选 **None**，Build command **留空**，Build output directory 填 **`/`**。**Save and Deploy**。

#### 阶段三　绑定子域名
6. 进 Pages 项目 → **Custom domains** → **Set up a custom domain** → 填你的子域名（如 `hub.你的域名`）。DNS 在 Cloudflare 会自动配好解析和证书，等状态变 **Active**。

#### 阶段四　加邮箱白名单（核心）
7. 进 **Zero Trust**（新版叫 **Cloudflare One**）。首次进选套餐 **Free**（0 元，激活可能要填卡但不扣费）。
8. **建策略**：Access controls → **Policies** → **Add a policy**。Action 选 **Allow**，规则 Include → **Emails** → 填允许的邮箱（可多行）→ Save。
9. **建应用**：Access controls → **Applications** → **Create new application** → **Self-hosted**。Destinations 填你的子域名（Subdomain + Domain，Path 留空）→ Create。
10. **挂策略**：回到这个应用 → **Policies** → Add existing policy → 勾刚建的策略 → Save。

#### 阶段五　让登录页直接显示「输入邮箱」框
11. 默认登录方式是「Cloudflare」，会多一次点击。想要打开就直接是邮箱框：进 **Integrations → Identity providers**（位置很隐蔽）→ **Add new** → 选 **One-time PIN**；再把原来的 **Cloudflare** 那项删掉。只剩 One-time PIN 时，登录页就是干净的「输入邮箱 → 收验证码」。

#### 验证与收尾
12. 用**无痕窗口**打开子域名 → 应弹出登录页；名单内邮箱能进，名单外进不去。（你自己已登录过，同账号其它站会单点登录免验证直接进，这是正常的。）
13. 把原来公开托管里**已迁走的旧目录删掉**，否则旧地址还在裸奔。

**日常**：发布新内容 = `git push`，几十秒上线；加/删访问人 = 改 Policies 里的邮箱，秒生效。

---

就这些。配好之后真的很舒服：私密资料照样随时随地打开，但只有我和我授权的人能看，爬虫和 AI 一律吃闭门羹。如果你也有同样的需求，把上面的 Prompt 复制给你的 AI，让它带你跑一遍就行。

—— Carolyn
