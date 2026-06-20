---
title: 给静态博客加一个「只有我能看」的私密二级站：Cloudflare Pages + Access 实战
date: 2026-06-20
description: 我的博客挂在 GitHub Pages 上，全公开。但有些调研报告、公司数据只想给特定的人看。折腾下来发现：子域名本身不带隐私，真正的锁在 Cloudflare Access 的邮箱白名单。一篇讲清原理、踩过的坑，和小白照着能做完的步骤。
tags: [Cloudflare, GitHub Pages, 建站, 权限管理]
category: 建站笔记
---

如果你也有一个静态博客（GitHub Pages / Cloudflare Pages 之类），又想在同一个域名下放一些「只给特定的人看」的内容，这篇能帮你少走我今天走的弯路。

我的博客 `ddcarolyn.com` 挂在 GitHub Pages 上，是全公开的。一直以来我把一些个人调研、公司数据报告，随手丢在 `ddcarolyn.com/keychron/` 这样的二级目录下，自己用着方便。直到我意识到一件事：**这些目录，全世界任何人、包括爬虫，都能直接访问。** 公司数据这么放，显然不行。

于是我想做一件事：**把内容按隐私分级，私密的部分加上「邮箱白名单」——只有我授权的邮箱，验证后才能看。**

下面是我把整件事跑通后的复盘。

## 我一开始的错误理解

我以为「私密」是靠**改成子域名**实现的——比如把 `ddcarolyn.com/keychron/` 改成 `keychron.ddcarolyn.com`，一级域名层级分开了，就安全了。

**错了。** 子域名和子目录一样，默认都是全公开的。换个地址不会凭空长出一把锁。

更关键的一点：**GitHub Pages 根本不支持任何登录验证。** 它天生就是给所有人看的，你在它上面无论怎么调整目录结构、子域名，都加不了白名单。而且就算你在前面加了验证，内容通过 `xxx.github.io` 那个原始地址照样能被绕过。

所以真正决定「公开 vs 私密」的，从来不是域名层级，而是**托管层有没有一道登录验证**。

## 正确的思路：换托管 + 加一道 Access 锁

理清之后，方案其实很清晰，两件事：

| 要解决的 | 用什么 |
|---|---|
| GitHub Pages 锁不住 | 把私密内容搬到 **Cloudflare Pages**（源站只有 Cloudflare 能访问，没法绕过） |
| 谁能进 | **Cloudflare Access**（邮箱白名单，输邮箱收验证码登录，免费 50 人） |

我最终的架构是这样：

| 站点 | 谁能看 |
|---|---|
| `ddcarolyn.com`（博客） | 所有人（保持公开） |
| `hub.ddcarolyn.com`（我的个人内容） | 只有我 |
| `keychron.ddcarolyn.com`（公司数据） | 我 + 几个同事 |

公开的博客继续放 GitHub Pages 不动；两个私密站搬到 Cloudflare Pages，各自挂一份白名单。**好处是：我以后发布新内容只要 `git push`，几十秒自动上线，再也不用每次导出一份离线 HTML 发给别人。**

## 完整步骤（小白向）

前提：你的域名 DNS 已经托管在 Cloudflare（这一步如果没做，要先把域名的 NS 指到 Cloudflare，是整件事里最花时间的，但只做一次）。

**① 把私密内容放进一个私有 Git 仓库。** 一个站一个仓库，里面就是静态文件（HTML 等）。建议做一个 `index.html` 当门户首页，把所有内容列出来——这样你只要记住一个地址。

**② 在 Cloudflare 建 Pages 项目。** 这里有个坑：Cloudflare 改版后，点 Create 默认进的是 Workers 流程，找不到 Pages。**真正的入口在那个页面最底部一行小字：「Looking to deploy Pages?」后面的 `Get started`。** 点它，再 Connect to Git 选你的仓库。构建设置：Framework preset 选 None、构建命令留空、输出目录填 `/`。Save and Deploy。

**③ 绑定子域名。** 进 Pages 项目 → Custom domains → 填 `hub.ddcarolyn.com`。因为 DNS 在 Cloudflare，它会自动配好解析和 HTTPS 证书，等几分钟状态变 Active。（顶部会吓你一句「可能要 48 小时」，实际几分钟就好，以 Active 为准。）

> 到这一步，子站能打开了，但**此刻还是公开的**。锁是下一步加的。先别把地址发出去。

**④ 加邮箱白名单（核心）。** 进 Cloudflare 的 **Zero Trust**（新版叫 Cloudflare One），第一次进会让你起个 team name、选套餐选 **Free**（$0，50 人）。然后分两步：

- **建策略**：Access controls → Policies → Add a policy → Action 选 **Allow** → 规则选 Include / Emails → 填你要放行的邮箱 → Save。
- **建应用并挂策略**：Access controls → Applications → Create → Self-hosted → 填子域名 → Create → 再回到这个应用，把刚才的策略加上去。

挂好后，再访问子站，就会自动跳转到一个登录页了。

## 两个把我卡住的坑

**坑一：登录页是「Sign in with Cloudflare」，不是直接填邮箱。**

我配完一看，登录页中间是一个「Sign in with: Cloudflare」的按钮，要先点一下，才进到填邮箱的环节。但我见过别人的都是**打开就直接一个邮箱输入框**，我想要那种。

原因是：新账号默认的「身份提供商」是 Cloudflare 自带的那个。**只要把登录方式换成只剩 `One-time PIN` 一种，登录页就会跳过选择、直接显示邮箱框。**

做法是加一个 One-time PIN、删掉默认的 Cloudflare。但这个设置藏得很深，我找了好久——它**不在** Settings、**也不在** Access settings，而是在：

> **左侧菜单最底部的 `Integrations` → `Identity providers`**

进去 Add new 选 One-time PIN，再把原来的 Cloudflare 删掉。搞定后，打开链接就是干净的「输入邮箱 → 收验证码」了。

**坑二：以为「两个站 = 100 个名额」。**

我本来想：建两个独立的站、两个 Cloudflare 项目，是不是就有 2×50 = 100 个访问名额？**不是。** 那 50 个名额是按**整个 Cloudflare 账号**算的，所有站共享一个池子。建几个站都还是 50。想要两个独立的 50，只能开两个 Cloudflare 账号，没必要。

（不过说实话，个人站就你自己、公司站几个同事，50 个名额怎么都用不完，这个坑知道一下就行。）

## 给同类人的自查清单

1. 先想清楚：私密**不是**靠子域名实现的，是靠托管层的那道登录验证。
2. GitHub Pages 锁不住，私密内容要搬到能加 Access 的托管（Cloudflare Pages 最顺手）。
3. 前提是域名 DNS 在 Cloudflare；没有的话先把 NS 指过去。
4. Pages 入口在 Create 页面**最底部**那行小字，别在 Workers 流程里干瞪眼。
5. 锁 = 「Access 应用」+「白名单策略」两件事，缺一个都不生效。
6. 想要「打开就填邮箱」：去 **Integrations → Identity providers**，只留 One-time PIN。
7. 50 个名额是**全账号共享**的，不是每站 50。
8. 全部配完，记得把博客原来那些公开的旧目录删掉，否则旧地址还在裸奔，等于白锁。

---

整件事第一次做大概花了我两小时，绝大部分时间是在新版 Cloudflare 改来改去的菜单里找东西。但配好之后真的香：发布新内容 `git push` 就行，加人删人改一下白名单秒生效。希望这一篇帮你一次跑通。

—— Carolyn
