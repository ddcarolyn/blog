---
title: 如何给个人博客加一把锁：让有权限的人才能看，挡住爬虫和 AI
date: 2026-06-20
description: 个人博客是很好用的「随身资料库」，但默认全公开——只要知道网址，任何人、任何爬虫、任何 AI Agent 都能看到你的内容。这篇用大白话讲清原理，并给出一份实测可用的 Cloudflare 免费方案 SOP；最唬人的步骤其实都能交给 AI 帮你做，你只要点一下授权。
tags: [Cloudflare, 建站, 隐私, 权限管理]
category: 建站笔记
---

## 一、背景：博客是个超好用的「随身资料库」

有一个自己的博客，真的很方便。

平时做的调研、周期性整理的数据、各种笔记和报告，往博客上一放，就等于挂到了云上——之后不管在公司、在家、用电脑还是手机，打开网址就能看，零摩擦。不用传文件、不用找 U 盘、不用纠结「我电脑上那份是最新的吗」。

对经常要随时翻资料的人来说，这是个很舒服的工作方式。

## 二、风险：方便的另一面，是「裸奔」

但方便是有代价的。

绝大多数个人博客（包括我自己的，挂在 GitHub Pages 上）**默认是全公开的**。这意味着：**只要知道网址，全世界任何人都能看到里面的内容。**

平时你可能觉得「反正没人知道我的网址」。但今天这个假设已经不成立了——**现在 AI Agent 满天飞，它们会自动、大规模地抓取网页内容。** 你随手放上去的公司数据、私人资料，可能在你毫不知情的时候，就被某个爬虫或 AI 收走了。

也就是说：你以为只是「方便自己看」，实际上是「方便所有人和所有机器人看」。私密资料这么放，迟早出事。

## 三、思路：既要方便，又不泄密——加一把「邮箱白名单」的锁

我们想要的，其实是「既要又要」：**既要**继续用网址、随时随地无摩擦地访问；**又要**让没权限的人和机器人，连门都进不来。

实现这个，不用自己搭服务器、不用花钱。**用 Cloudflare 的免费方案就能给博客加一道锁**——访客打开你的私密网址，会先撞上一道「门」：

<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="私密网址的访问流程：先验证邮箱，名单内放行，陌生人和爬虫被挡" style="width:100%;height:auto;max-width:760px;display:block;margin:1.5em auto;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB',sans-serif;">
  <style>
    .cf-t  { fill: var(--diagram-text); font-size: 15px; font-weight: 600; }
    .cf-tb { fill: var(--diagram-text); font-size: 17px; font-weight: 700; }
    .cf-s  { fill: var(--diagram-text-muted); font-size: 12.5px; }
    .cf-box{ fill: var(--surface); stroke: var(--border); }
    .cf-mid{ fill: var(--diagram-b-bg); stroke: #5b9bff; }
    .cf-ok { fill: rgba(22,163,74,0.16); stroke: #16a34a; }
    .cf-no { fill: rgba(220,38,38,0.14); stroke: #dc2626; }
    .cf-ln { stroke: var(--diagram-text-muted); stroke-width: 1.6; fill: none; }
  </style>
  <defs>
    <marker id="cfArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-text-muted)"/>
    </marker>
  </defs>
  <text class="cf-tb" x="380" y="28" text-anchor="middle">私密网址的访问流程</text>
  <rect class="cf-box" x="20" y="135" width="150" height="64" rx="10" stroke-width="1.5"/>
  <text class="cf-t" x="95" y="162" text-anchor="middle">访客打开</text>
  <text class="cf-s" x="95" y="184" text-anchor="middle">你的私密网址</text>
  <path class="cf-ln" d="M174,167 L244,167" marker-end="url(#cfArrow)"/>
  <rect class="cf-mid" x="250" y="123" width="195" height="88" rx="10" stroke-width="1.5"/>
  <text class="cf-t" x="347" y="153" text-anchor="middle">🔒 Cloudflare 门口</text>
  <text class="cf-s" x="347" y="175" text-anchor="middle">输入邮箱</text>
  <text class="cf-s" x="347" y="193" text-anchor="middle">→ 收一次性验证码</text>
  <path class="cf-ln" d="M445,150 L516,98" marker-end="url(#cfArrow)"/>
  <path class="cf-ln" d="M445,184 L516,238" marker-end="url(#cfArrow)"/>
  <rect class="cf-ok" x="520" y="60" width="220" height="68" rx="10" stroke-width="1.5"/>
  <text class="cf-t" x="630" y="89" text-anchor="middle">✅ 邮箱在白名单</text>
  <text class="cf-s" x="630" y="111" text-anchor="middle">顺利看到你的内容</text>
  <rect class="cf-no" x="520" y="208" width="220" height="68" rx="10" stroke-width="1.5"/>
  <text class="cf-t" x="630" y="237" text-anchor="middle">❌ 陌生人 / 爬虫 / AI</text>
  <text class="cf-s" x="630" y="259" text-anchor="middle">被挡在门外</text>
</svg>

> 一句话原理：把私密内容放到 **Cloudflare Pages** 托管，再用 **Cloudflare Access** 加邮箱白名单。免费、几十分钟搞定，之后发布新内容只要 `git push` 就自动上线。

下面这套流程我已经亲自跑通、实测有效。

## 四、最省事的做法：把它整段交给你的 AI

这部分是重点——**你不需要自己对着教程一步步啃。**

下面准备了一份「一键复制 Prompt」，里面打包了**给 AI 的使用说明 + 完整 SOP**。你只要：点按钮复制 → 粘贴给你的 AI 助理（Claude、ChatGPT 等都行）→ 它会读懂这套流程，**能自动做的（比如建仓库、传文件）直接帮你做掉，需要你授权或在网页点的地方，再用大白话一步步带你**。

<div style="margin:1.5rem 0">
<button onclick="navigator.clipboard.writeText(document.getElementById('cf-prompt').textContent).then(()=>{this.textContent='✅ 已复制，去粘贴给你的 AI 吧';setTimeout(()=>{this.textContent='📋 一键复制 Prompt（含完整 SOP）'},2000)})" style="background:var(--accent);color:#fff;border:none;padding:.8rem 1.2rem;border-radius:10px;cursor:pointer;font-size:.98rem;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.15)">📋 一键复制 Prompt（含完整 SOP）</button>
<details style="margin-top:.6rem">
<summary style="cursor:pointer;color:var(--muted);font-size:.85rem">展开看看要复制的内容（万一复制没反应，可在这里手动全选）</summary>
<pre id="cf-prompt" style="white-space:pre-wrap;background:var(--code-bg);color:var(--code-fg);padding:1rem;border-radius:8px;font-size:.82rem;line-height:1.65;overflow:auto;margin-top:.5rem;border:1px solid var(--border)">你是我的技术助理。我想给我的个人静态博客加一个「私密二级站」：内容照常用网址访问，但只有我邮箱白名单里的人验证后才能看，其他人、爬虫和 AI 都打不开。

下面是一份已经实测成功的 SOP。请先完整读一遍、理解整套架构，然后带我做。原则：
- 凡是能用命令行完成的步骤（尤其阶段一：建私有仓库、上传文件、生成首页），请你直接用 GitHub CLI（gh）和 git 帮我做掉，只在需要我登录或授权时停下来，用一句话告诉我去点哪个按钮。
- 必须在 Cloudflare 网页后台点的步骤，请一步步指挥我（我会把界面截图发给你，你告诉我点哪里）。
- 每一步等我确认或回报结果后，再给下一步。不要一次把所有步骤倒给我。

开始前先问我三件事：1) 我的域名是什么、DNS 是否已经托管在 Cloudflare；2) 私密内容现在放在哪（哪个文件夹）；3) 允许访问的邮箱有哪些。注意：Cloudflare 后台是新版「Cloudflare One」，菜单位置以 SOP 里写的为准。

====== SOP：用 Cloudflare Pages + Access 搭私密站 ======

前提：域名 DNS 已托管在 Cloudflare（没有就先把域名 NS 指到 Cloudflare，只需做一次）。

原理：GitHub Pages 这类静态托管天生全公开、加不了登录验证。做法是把私密内容放到 Cloudflare Pages（源站只有 Cloudflare 能访问，绕不过去），再用 Cloudflare Access 加邮箱白名单。免费版 50 个名额，按整个账号共享。

阶段一 迁内容【可整段交给 AI 用 GitHub CLI 完成，用户只需点授权】：
1. 建一个私有 Git 仓库，把私密内容（静态 HTML 等）放进去。
2. 做一个 index.html 当门户首页，把所有内容列出来，方便只记一个网址。

阶段二 建 Cloudflare Pages【网页操作，AI 指挥用户点】：
3. dash.cloudflare.com 进入 Workers &amp; Pages → Create。新版默认进的是 Workers 流程，Pages 入口在那个页面最底部一行小字「Looking to deploy Pages? Get started」，点 Get started。
4. Connect to Git → 授权并选中你的仓库 → Begin setup。
5. 构建设置：Framework preset 选 None，Build command 留空，Build output directory 填 /。然后 Save and Deploy。

阶段三 绑定子域名【网页操作】：
6. 进 Pages 项目 → Custom domains → Set up a custom domain → 填你的子域名（例如 hub.你的域名）。因为 DNS 在 Cloudflare，会自动配好解析和 HTTPS 证书，等状态变成 Active。

阶段四 加邮箱白名单（核心）【网页操作】：
7. 进 Zero Trust（新版叫 Cloudflare One）。首次进会让你起一个 team name、选套餐，选 Free（0 元；激活时可能要填一张卡，但不会扣费）。
8. 建策略：Access controls → Policies → Add a policy。名字自起，Action 选 Allow，规则 Include → Emails → 填允许访问的邮箱（可以填多行）。Save。
9. 建应用：Access controls → Applications → Create new application → Self-hosted。在 Destinations 填你的子域名（Subdomain 加 Domain，Path 留空）。Create。
10. 挂策略：回到这个应用 → Policies → Add existing policy → 勾选刚建的策略 → Save。挂好后该应用的 Policies 会显示 1 条。

阶段五 让登录页直接显示「输入邮箱」框（去掉多余的一次点击）【网页操作】：
11. 新账号默认登录方式是「Cloudflare」，登录页会多一个按钮要先点一下。想让它打开就直接是邮箱框：进 Integrations → Identity providers → Add new → 选 One-time PIN；再把原来的 Cloudflare 那一项删掉。只剩 One-time PIN 时，登录页就直接是「输入邮箱 → 收验证码」了。

验证与收尾：
12. 用无痕窗口打开你的子域名，应当弹出登录页要邮箱；名单内的邮箱收到验证码能进，名单外的进不去。（注意：你自己已经登录过，同账号下其它站会因为单点登录而免验证直接进，这是正常的。）
13. 把原来公开托管里、已经迁走的旧目录删掉，否则那些旧地址还在公开裸奔。

日常使用：以后发布新内容 = git push，几十秒自动上线；增减访问人 = 改 Policies 里的邮箱列表，秒生效。

====== SOP 结束 ======</pre>
</details>
</div>

## 五、SOP 全文（图解版）

想自己看看每一步、或者照着做，下面是同一份流程的图解版。每个阶段都标了「谁来做」：

<div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin:1rem 0 1.4rem;font-size:.9rem;color:var(--muted)">
<span style="display:inline-flex;align-items:center;gap:.4rem"><span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2f6f6a;color:#fff">🤖 交给 AI</span> AI 直接帮你做，你只点授权</span>
<span style="display:inline-flex;align-items:center;gap:.4rem"><span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2a5fa8;color:#fff">🖱️ 你点几下</span> 网页里点几下，AI 在旁边指挥</span>
</div>

**前提**：你的域名 DNS 已经托管在 Cloudflare（没有的话，先把域名的 NS 指到 Cloudflare，这一步只做一次，也可以让 AI 教你）。

**原理一句话**：GitHub Pages 这类静态托管天生全公开、加不了登录；所以把私密内容搬到 **Cloudflare Pages**（源站只有 Cloudflare 能访问），再用 **Cloudflare Access** 加邮箱白名单。免费版 50 个名额，按整个账号共享（不是每站 50）。

<div style="border:1px solid var(--border);border-left:4px solid #2f6f6a;background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">阶段一　迁内容　<span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2f6f6a;color:#fff;vertical-align:middle">🤖 交给 AI</span></div>
<div>1. 建一个<b>私有</b> Git 仓库，把私密内容（静态 HTML 等）放进去。</div>
<div>2. 做一个 <code>index.html</code> 当门户首页，把所有内容列出来——这样你只要记住一个网址。</div>
<div style="margin-top:.7rem;padding:.7rem .9rem;background:rgba(47,111,106,.10);border-radius:8px;font-size:.9rem;color:var(--text)">💚 <b>别被「建仓库」三个字吓到。</b>这一步你<b>啥也不用装、也不用懂 Git</b>。直接让 AI 用 <b>GitHub CLI（gh）</b>帮你：自动建好私有仓库、把文件传上去、生成首页。全程你只需要在浏览器里点一下「授权」按钮。看起来最唬人的第一步，其实是最不用你操心的一步。</div>
</div>

<div style="border:1px solid var(--border);border-left:4px solid #2a5fa8;background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">阶段二　建 Cloudflare Pages　<span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2a5fa8;color:#fff;vertical-align:middle">🖱️ 你点几下</span></div>
<div>3. 进 <code>dash.cloudflare.com</code> → <b>Workers & Pages</b> → <b>Create</b>。⚠️ 新版默认进的是 Workers 流程，<b>Pages 入口藏在页面最底部一行小字</b>「Looking to deploy Pages? <b>Get started</b>」，点它。</div>
<div>4. <b>Connect to Git</b> → 授权并选中你的仓库 → <b>Begin setup</b>。</div>
<div>5. 构建设置：Framework preset 选 <b>None</b>，Build command <b>留空</b>，Build output directory 填 <b><code>/</code></b>。<b>Save and Deploy</b>。</div>
<div style="margin-top:.7rem;padding:.7rem .9rem;background:rgba(42,95,168,.10);border-radius:8px;font-size:.9rem;color:var(--text)">💙 <b>不用记这些英文。</b>把界面截图发给你的 AI，它会告诉你「点哪个按钮、填什么」。新版菜单藏得深，有 AI 当导航就不会迷路。</div>
</div>

<div style="border:1px solid var(--border);border-left:4px solid #2a5fa8;background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">阶段三　绑定子域名　<span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2a5fa8;color:#fff;vertical-align:middle">🖱️ 你点几下</span></div>
<div>6. 进 Pages 项目 → <b>Custom domains</b> → <b>Set up a custom domain</b> → 填你的子域名（如 <code>hub.你的域名</code>）。DNS 在 Cloudflare 会自动配好解析和证书，等状态变 <b>Active</b>。</div>
<div style="margin-top:.7rem;padding:.7rem .9rem;background:rgba(42,95,168,.10);border-radius:8px;font-size:.9rem;color:var(--text)">💙 填完域名等几分钟，状态变绿色 Active 就成了。证书、解析都是它自动配，你不用碰。</div>
</div>

<div style="border:1px solid var(--border);border-left:4px solid #2a5fa8;background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">阶段四　加邮箱白名单（核心）　<span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2a5fa8;color:#fff;vertical-align:middle">🖱️ 你点几下</span></div>
<div>7. 进 <b>Zero Trust</b>（新版叫 <b>Cloudflare One</b>）。首次进选套餐 <b>Free</b>（0 元，激活可能要填卡但不扣费）。</div>
<div>8. <b>建策略</b>：Access controls → <b>Policies</b> → <b>Add a policy</b>。Action 选 <b>Allow</b>，规则 Include → <b>Emails</b> → 填允许的邮箱（可多行）→ Save。</div>
<div>9. <b>建应用</b>：Access controls → <b>Applications</b> → <b>Create new application</b> → <b>Self-hosted</b>。Destinations 填你的子域名（Subdomain + Domain，Path 留空）→ Create。</div>
<div>10. <b>挂策略</b>：回到这个应用 → <b>Policies</b> → Add existing policy → 勾刚建的策略 → Save。</div>
<div style="margin-top:.7rem;padding:.7rem .9rem;background:rgba(42,95,168,.10);border-radius:8px;font-size:.9rem;color:var(--text)">💙 这步是整件事的「锁芯」，名词多但都是照着点。卡住就把那一屏截图发 AI，它会指给你看。「策略=谁能进」「应用=锁哪个网址」，把两者挂在一起就生效。</div>
</div>

<div style="border:1px solid var(--border);border-left:4px solid #2a5fa8;background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">阶段五　让登录页直接显示「输入邮箱」框　<span style="display:inline-block;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:20px;background:#2a5fa8;color:#fff;vertical-align:middle">🖱️ 你点几下</span></div>
<div>11. 默认登录方式是「Cloudflare」，会多一次点击。想要打开就直接是邮箱框：进 <b>Integrations → Identity providers</b>（位置很隐蔽）→ <b>Add new</b> → 选 <b>One-time PIN</b>；再把原来的 <b>Cloudflare</b> 那项删掉。</div>
<div style="margin-top:.7rem;padding:.7rem .9rem;background:rgba(42,95,168,.10);border-radius:8px;font-size:.9rem;color:var(--text)">💙 这步纯属「锦上添花」，不做也能用，只是登录时多点一下而已。嫌麻烦可以最后再弄。</div>
</div>

<div style="border:1px solid var(--border);border-left:4px solid var(--accent);background:var(--surface);border-radius:10px;padding:1rem 1.2rem;margin:1.1rem 0">
<div style="font-weight:700;font-size:1.05rem;margin-bottom:.5rem">✅ 验证与收尾</div>
<div>12. 用<b>无痕窗口</b>打开子域名 → 应弹出登录页；名单内邮箱能进，名单外进不去。（你自己已登录过，同账号其它站会单点登录免验证直接进，这是正常的。）</div>
<div>13. 把原来公开托管里<b>已迁走的旧目录删掉</b>，否则旧地址还在裸奔。（这步也能交给 AI 用命令行做。）</div>
</div>

> **日常**：发布新内容 = `git push`，几十秒上线；加/删访问人 = 改 Policies 里的邮箱，秒生效。

---

就这些。配好之后真的很舒服：私密资料照样随时随地打开，但只有我和我授权的人能看，爬虫和 AI 一律吃闭门羹。**最关键的心态是：别被一堆英文名词和「建仓库」吓退**——能自动化的都丢给 AI，剩下的就是照着截图点几下。把上面的 Prompt 复制给你的 AI，让它带你跑一遍就行。

—— Carolyn
