---
title: 为什么我每天上班都很忙，却觉得一无所获 —— 关于"等待被打扰的容量"
date: 2026-05-10
description: 上班忙了一整天却毫无成就感？这可能不是意志力问题，而是反馈结构失衡。本文用系统反馈环和注意力残留机制拆解三层不可见消耗，给出从 1 个动作起步的解法。
tags: [注意力, 成就感, 知识工作, Deep Work, Done List]
category: Carolyn Log
---

最近我注意到一类很奇怪的产品：**手机背面的磁吸墨水屏**。

把它磁吸在你手机壳背面，正面是手机，背面是一块小小的电子墨水屏，能显示日历、待办、最近一条短信。听说做这事的有大学实验室出来的团队，融资规模不小，资本疯抢。

我第一反应是"这玩意谁用啊"。但仔细看完它的逻辑后我倒吸了一口冷气——它的核心卖点是：**手机扣过来放在桌上时，背面那一块空间是个"白送的、极佳的注意力位置"。**

注意力位置。

我意识到一件事：**注意力已经成为可以被计算、被切割、被买卖的稀缺资源**，连"手机扣过来时背面那 5 平方厘米"都被当作广告位重新分配了。

这不是产品评测，这是症状。这件事的另一半是——同一段时间，我自己开始陷入一种说不清的状态。

## 我的现象：忙了一整天，却像什么都没做

最近几个月，我的生活状态越来越不对劲。它怪在这种"不对劲"我连理由都说不出来。

不是任务太难——其实工作大都在我掌控之中。也不是没干活——我一天忙到爆炸。但每天下班，我有一种**强烈的"一无所获"感**。成就感稀薄到，我会在睡前想：今天我到底做了什么？

最初我以为是任务太多，然后我以为是我效率不行，再后来我以为是我太疲惫。但都对不上。

直到我把它写下来，才看见三层结构：

1. 我做的核心任务都是**长程任务**——一天结束的时候它根本完不了；
2. 我的注意力一直在被**各种小事**分散——本来 20 分钟能做完的事，我能磕磕碰碰拖到 2 小时；
3. 即使没有人来打扰我，我**内心一直留着一块"等待被触发"的容量**——预期被中断本身已经在持续消耗精力。

最后这一条让我后背发凉。它意味着：**就算我把通知全关了、把同事屏蔽了，也救不了我**——我的注意力不是被 IM 偷走的，是被"我以为 IM 随时会响"这个预期偷走的。

## 三层机制：从可见到不可见

我后来读了一些研究，发现这三层有学术名字。

![三层注意力消耗机制：从可见的外部中断到不可见的等待被打扰的容量](/three-layers.svg)

### L1 · 外部中断

最容易被讨论的一层：IM 弹出、邮件红点、有人拍肩。这层最常被骂，但其实**不是最致命的一层**。

顺便破一个流传很广的 myth：你可能听说过"被打断后需要 23 分钟才能回到原任务"。这个数字**没有学术出处**——它源自 Gloria Mark 一次媒体访谈被持续转引放大，但在她和 Gudith 与 Klocke [2008 年 CHI 那篇原论文](https://dl.acm.org/doi/10.1145/1357054.1357072)里没出现过。

更可信的数据来自 [Mark 2014 年另一篇 CHI 论文](https://dl.acm.org/doi/10.1145/2556288.2557204)：被外部中断后回到打断前任务的中位时间约 **47 秒**。47 秒不少，但远不是 23 分钟。

> 我们对 L1 的恐惧是被夸大的。真正的代价不在这里。

### L2 · 注意力残留（Attention Residue）

这才是真正烦的那一层。

明尼苏达大学的 Sophie Leroy 在 [2009 年的论文](https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399)里提出了 attention residue 这个概念：**上一任务的认知占用没散，就开始下一任务，新任务的表现会显著下降**。

通俗讲：你刚开完一个会，转身打开文档继续写报告，**那个会还在你脑子里占着 slot**。你以为你在写报告，其实你的工作记忆里有 30% 还在咀嚼会议。这就是为什么你"在没人打扰你"的时候也在分心。

她和 Glomb 在 [2018 年 *Organization Science* 的扩展研究](https://ideas.repec.org/a/inm/ororsc/v29y2018i3p380-397.html)里测试了一个干预：让人在切换任务前花两分钟写一个 "Ready-to-Resume Plan"——下次回到这个任务，从哪一行开始、要做什么。在一个**特定的决策任务**里，这个干预带来了约 +79% 的表现增益（最佳候选人识别正确率）。

注意诚实弱化：这是一个实验任务的 effect size，不能泛化为"所有任务恢复都 +79%"，但方向稳健。

### L3 · 等待被打扰的容量（这一层我没找到名字）

这是我自己琢磨出来的描述，结果发现学术词典里没有直接对应——中文语料里也几乎搜不到这种表达。

它说的是：**即使没人打扰你，预期被中断本身已经在消耗精力**。

学术上最近邻的研究是 Stothart, Mitchum 与 Yehnert（[2015 年 *J Exp Psych: HPP*](https://pubmed.ncbi.nlm.nih.gov/26121498/)）的 "通知预期=干扰"——他们发现，**即使手机不响、不看，知道它可能响**就足以损害任务表现。

更出名的是 Adrian Ward 等人 [2017 年的 "Brain Drain" 论文](https://www.journals.uchicago.edu/doi/full/10.1086/691462)：**手机翻面放在桌上**和**手机放抽屉**对认知任务的表现差异显著（"翻面没用，要物理隔离"）。

但这里我必须诚实——这条研究的复制状况不太好。Ruiz Pardo 与 Minda 的 [2022 年直接复制](https://www.sciencedirect.com/science/article/pii/S0001691822002323)拿到了 null 结果；[2023 年的 meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC10525686/)汇总后总效应 **g = -0.14**（小效应，复制争议未平息）。

所以我不能用 effect size 来卖"手机一定要放视线外"这件事。但我可以诚实说：**对我个人来说，最重要的不是认知任务表现，而是消除"脑后台一直瞄一眼"的主观体验**。这层"瞄一眼"的预算开销是质性的，研究没量化它，但我相信你也能感觉到。

## 反馈环失衡：为什么意志力解决不了

把上面三层放进系统视角，我画了一张图。

![R1 短反馈环（IM/通知/秒级）和 B1 长反馈环（长任务/天级）](/attention-feedback-loops.svg)

> ⚠️ 这张图是我自己结合 Donella Meadows 系统动力学和上面那些注意力研究画的简化模型，**不是某篇文献的直接图示**。但我觉得它把事情讲清楚了。

- **R1（短反馈环）**：通知 → 多巴胺微反馈 → 行为强化。周期短（秒级）、回报快、自我强化。
- **B1（长反馈环）**：长程任务 → 终于完成 → 大成就感。周期长（天/周级）、回报延迟、容易被压制。

短反馈环和长反馈环放在一起，**短的天然压制长的**——因为大脑就是一个延迟厌恶的器官。这不是你意志力差，这是反馈结构本身有问题。

Meadows 的系统杠杆点理论里，**改变反馈延迟**是非常深的杠杆——比抑制 R1（关通知）深得多。所以核心不是把短反馈环砸了，是**给长反馈环增加中间节点**——把"完成长任务"的反馈周期从天/周压到小时。

这就是整个解法的核心。

## 但首先，我想要的"成就感"到底是什么 job？

借用 Christensen 的 Jobs-to-be-Done 框架反过来问自己：当我说"我没成就感"，我**雇佣**成就感来完成什么 job？

我读了一些同类知识工作者的第一人称表达——dev.to 上四年开发者写"I feel stuck"、Anne Kearney 个人博客写 ["Why You Feel You Haven't Accomplished Anything"](https://www.annekearneyartist.com/drawing-connections/why-do-you-feel-you-havent-accomplished-anything)、freeCodeCamp 论坛上"我投入了时间但好像没进展"、CSDN 上"程序员成长虚无感"……

模式很一致：

> "在每一天结束时，给自己一个具体可触摸的证据，证明我今天既前进了一点（progress），又前进在一件值得做的事上（meaning）。"

**Progress + Meaning 必须同时满足。**

- 只满足 progress（我打了 20 个 todo 钩） → "事都做完了为什么还是空虚" 陷阱
- 只满足 meaning（我知道这事很重要） → "我知道但今天没动" 焦虑
- 双满足（我前进了一点，前进在重要的事上） → 这才是成就感

Cal Newport 在 ["Knowledge workers are bad at working"](https://calnewport.com/knowledge-workers-are-bad-at-working-and-heres-what-to-do-about-it/) 里说的也是这个——知识工作者最大的问题不是不努力，而是**"努力"没有形态**。

## 解法：从 1 个动作起步（不要堆 4 层）

我做调研的时候自己就差点犯了 Pre-mortem 模拟里最常见的失败——**一上来给出 4 层 8 个动作的解法清单**，结果第二周静默放弃，连解法都没执行就更挫败。

所以这次我硬性纪律：**MVP 1 个动作起步，连续做满 7 天再加第 2 个**。

### Week 1（MVP）· Done List + M/P 标签

每天下班前 5 分钟，在便签或备忘录写一份"今天做了什么"清单，**≤ 5 条**。

每条标一个标签：
- **M**（meaning）：这件事意义重要
- **P**（progress）：这件事推进了一个长任务
- **MP**：两者都有

7 天后看 MP 比例。**MP < 30% 是预警信号**——你今天忙的事 progress 多但 meaning 少。

机制：Amabile 与 Kramer 的 ["The Power of Small Wins" (HBR 2011)](https://hbr.org/2011/05/the-power-of-small-wins) Progress Principle + Kivetz 等人 [2006 年咖啡卡现场实验](https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf)的 goal-gradient。

诚实声明：**个人级"小赢仪式"目前没有 RCT 证据**，是从 Amabile diary study（相关而非因果）和 Kivetz 现场实验外推。这是一个**低证据强度**的建议——但执行成本极低，副作用为零，值得试。

### Week 2 · 加 If-Then 下一小步

每天结束最后一件事时，写一行 "Resumption Cue"：

> "明天打开电脑后，先做 ____。"

If-Then 句式（不写"明天我要努力"），具体到一行。

机制：Gollwitzer 与 Sheeran 的 [2006 年 implementation intentions meta-analysis](https://psycnet.apa.org/record/2007-19538-002)——94 项研究、超过 8000 人、d = 0.65。**这是这套解法里效应量最硬的一条**。同时减少 L2 注意力残留（Leroy & Glomb 2018 的轻量版）。

### Week 3 · Hill Charts 给长任务

把每个 ≥3 周的长任务画成一座山。左侧是"想清楚阶段"（不确定性递增），顶点是"已经清楚怎么做"（顶点 = 70% 完成感），右侧是"执行下坡"。**每周更新光标位置**。

每周问自己：**"它在山的哪一边？"**——而不是"它完成了百分之多少？"。后者会自欺，前者很难自欺。

机制：Endowed Progress（Kivetz 2006 同一篇）+ [Basecamp Shape Up Ch13 Hill Charts](https://basecamp.com/shapeup/3.4-chapter-13)。

### Week 4 · Weekly Meaning Check（这一条最容易被跳过）

每周一次（推荐周日），5 分钟回答一个问题：

> **"这周做的事如果全部删掉，谁会损失什么？"**

答不上来 → meaning 漏洞预警。
连续 2 周答不上来 → 你可能不只是协议问题，是工作内容本身的问题（详见监测信号 #2）。

灵感：Di Stefano et al. 2014 的 HBS 反思 RCT——每天结束 15 分钟反思的实验组，培训效果 +23%。

## 关于打断管理：中文 IM 文化的禁忌

调研里我读了 GitLab Handbook 和 Doist 的异步协作 best practice。它们都说"批处理通信窗口"比"屏蔽通知"好——后者破坏同事信任，前者承诺响应 SLA。

听起来很合理。**但有一个我必须诚实说出来的禁忌**：

⚠️ **不要在群里公开宣布"我每小时只看一次 IM"**。

Ask a Manager 上有篇 [真实案例](https://www.askamanager.org/2023/03/my-boss-expects-me-to-respond-immediately-no-matter-what-im-doing.html)就是讲这个翻车的。中国职场叠加了几个特殊因素：
- **已读机制**：钉钉/飞书的已读回执让"我看到了但没回"变得很显眼
- **"急"字通胀**：所有事都是"急"，导致即时响应成了基线
- **观察期 / 试用期**：公开 SLA 在评估期会变成绩效负面证据

所以：

- **私聊**直属上司 + 最常协作的 2–3 人，**私下**告诉他们"我尝试每小时整点回 IM，紧急的请打电话"
- **不要公开 channel 发表 SLA 声明**
- 观察期内（< 6 个月）甚至不做这个动作，**先纯个人协议**（关 badge、放手机、不看消息预览）

如果你在欧美异步组织或者技术团队，可以无视这一段，公开 SLA 是可行的。但中文环境我建议小心。

## 关于硬件：哪些值得试，哪些是噱头

调研里我扫了 20 来款"专注/注意力/任务管理"产品。一个核心发现：

**几乎所有主流产品都聚焦在"5 分钟到一天"的时间尺度——没有任何一款解决"3 周到 3 个月长任务的中段进度反馈"。**

Forest / Cold Turkey / Freedom 解决的是"刷手机"。Brick / Light Phone 解决的是"手机本身"。Sunsama / Motion 解决的是"今天怎么排"。GTD / Bullet Journal 解决的是"长清单怎么管"——但 weekly review 的失败模式就是被跳过。

**长程任务的中段反馈结构是市场普遍漏掉的子问题**。这也是为什么解法册的核心要靠你自己手写 Done List + Hill Chart——没有产品替你做这件事。

如果非要推荐三款硬件/工具：

1. **Xteink X4（69 美元）** —— 手机背磁吸墨水屏。文章开头那个产品类目。优先推荐：保留响应能力 + 消除"刷"的入口，对中文职场比 Brick 安全。
2. **Brick（49 美元）** —— 物理隔离手机最强长期留存证据。但中文职场要慎用，"工作不上心"标签风险共存。
3. **Granola（18 美元/月）** —— 会议场景的 AI 笔记，回收 meeting 后的 L2 注意力残留。

## 6 个月监测信号

我给自己设的 6 个 trigger（**这部分比解法本身重要**——它防止我假装它有效）：

| # | 信号 | 行动 |
|---|---|---|
| 1 | Week 1 后 MP 标签 < 30% | 提前启动 Weekly Meaning Check |
| 2 | 连续 2 周 Weekly Meaning Check 答不上来 | 工作内容可能 fundamentally 错配，**考虑换角色/项目，不是改协议** |
| 3 | Week 4 后协议执行得了但状态没改善 | 根因不是反馈结构 |
| 4 | Week 6 仍无显著改善 | 可能不是单纯结构问题，**建议专业咨询排除 burnout / 临床问题** |
| 5 | 任何一周协议执行率 < 50% | 砍回前一个 week，停一周再升级 |
| 6 | SLA 协议触发同事不满或老板施压 | 立即撤回纯个人协议 |

## 三段诚实声明

1. **本文不是医学/心理建议**。如果你的状态持续 6 周以上没改善、伴随睡眠问题或情绪低落，请专业咨询而不是继续套这个协议。Burnout 和单纯反馈结构问题在表象上很像，但处理方式完全不同。

2. **如果 4 周后协议执行得了但状态没改善**——根因可能不在反馈结构。最可能的真正原因是工作内容本身的错配（你的工作本质就是反应式 / 碎片化 / 缺意义）。这种情况下任何协议都解决不了，要考虑的是换角色 / 换项目 / 换工作。

3. **本文里很多研究的强度并不一致**——我尽量在每条引用旁边标了诚实弱化（"diary study 不是因果"、"复制 null"、"+79% 是单一任务 effect"）。Done List + M/P 标签这条**目前没有 RCT 直接证据**，是我自己外推的低证据强度建议——但因为执行成本极低、副作用为零，我觉得值得试。如果你是高自我要求型读者，请把执行失败也当作信息（"我做不到 X"是关于 X 适不适合你的真信号），而不是新的挫败来源。

---

## 写在最后

我开头说的那个磁吸墨水屏，看起来荒诞，但它在告诉我们一件真的事：**这是一个注意力被定价的时代**。手机背面 5 平方厘米都成了广告位，你脑子里 24 小时的待机注意力当然也是。

但反过来——如果注意力是稀缺资源，那"我每天能从这份稀缺里**为自己**抢回来多少"就是个有意义的目标了。不是抢回来给雇主用，是抢回来给自己用：用来感受 progress，感受 meaning，感受"今天我前进了一点，前进在我自己认为值得的事情上"。

这是注意力时代里，我能想到的最朴素的成就感。

---

**主要引用**

- Leroy, S. (2009). Why is it so hard to do my work? *Organizational Behavior and Human Decision Processes*. [Link](https://www.sciencedirect.com/science/article/abs/pii/S0749597809000399)
- Leroy, S. & Glomb, T. (2018). Tasks Interrupted. *Organization Science*. [Link](https://ideas.repec.org/a/inm/ororsc/v29y2018i3p380-397.html)
- Mark, G. et al. (2014). Bored Mondays and Focused Afternoons. *CHI*. [Link](https://dl.acm.org/doi/10.1145/2556288.2557204)
- Stothart, C. et al. (2015). The Attentional Cost of Receiving a Cell Phone Notification. *J Exp Psych: HPP*. [Link](https://pubmed.ncbi.nlm.nih.gov/26121498/)
- Ward, A. F. et al. (2017). Brain Drain. *Journal of the Association for Consumer Research*. [Link](https://www.journals.uchicago.edu/doi/full/10.1086/691462)
- Brain Drain Replication & Meta-analysis. [2022 replication](https://www.sciencedirect.com/science/article/pii/S0001691822002323) | [2023 meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC10525686/)
- Amabile, T. & Kramer, S. (2011). The Power of Small Wins. *HBR*. [Link](https://hbr.org/2011/05/the-power-of-small-wins)
- Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The Goal-Gradient Hypothesis Resurrected. *J Marketing Research*. [Link](https://home.uchicago.edu/ourminsky/Goal-Gradient_Illusionary_Goal_Progress.pdf)
- Gollwitzer, P. & Sheeran, P. (2006). Implementation Intentions and Goal Achievement: A Meta-analysis. [Link](https://psycnet.apa.org/record/2007-19538-002)
- Basecamp. *Shape Up*, Ch.13 Show Progress. [Link](https://basecamp.com/shapeup/3.4-chapter-13)
- GitLab Handbook on async communication. [Link](https://handbook.gitlab.com/handbook/company/culture/all-remote/asynchronous/)
- Doist async communication guide. [Link](https://async.twist.com/asynchronous-communication)
