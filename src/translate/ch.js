export const ch = {
  scene1: {
    title: "场景 1：欢迎新来的太空猴",
    text1: `— 那么，宇航员，你终于走到了这一步。你过去去宜家的那些事已经无关紧要了。问题不在于你曾经多买了一个架子。真正的问题是，当你沉迷于租金和信用的细枝末节时，你早已被愚弄了。两次。`,
    text2: `— 你以为自己掌控着自己的生活。事实上，所有这些折扣、新设备和“个性化”优惠，只不过是他们用来牵制你的手段。他们清楚你明天会做什么，这意味着，在他们眼中，你不过是一个可预测且有价值的资源。`,
    text3: `— 但是问题在于：即使你成为那个下达命令的人，你依然是系统的一部分。牧羊人也好，羊群也罢——角色可以不同，但规则始终不变。`,
    text4: `— 真正的选择不在于爬得更高，而是彻底退出这场游戏。这不是关于权力，而是关于自由。几乎就像摆脱轮回一样。如果你厌倦了在这个循环中生活，欢迎来到赛博朋克的世界。`,
    text5: `— 这是你的第一步。签署这个文件。一个数字签名——你就加入我们了。`,
    desc: `> 您的太空猴卡包含一个用于季票的以太坊账户。\n>\n>使用季票账户，您需要签署一条包含以下文本的消息：\n>\n>\`I'm a space monkey!\`\n>\n>以下是使用 MetaMask 应用程序和 Etherscan 服务执行此操作的示例：\n>\n>- 您需要将季票账户导入 [MetaMask](https://metamask.io/)\n>\n>- 接下来，在应用程序中，您需要转到浏览器选项卡并粘贴指向 Etherscan 消息签名服务的链接：\n>\n>https://etherscan.io/verifiedSignatures\n>\n>- 在服务中，选择“签署消息”功能并批准与 MetaMask 的连接\n>\n>- 粘贴消息并签名\n>\n>- 复制签名哈希并单击“发布”以发布消息`,
    button: "Send Tyler a signed message",
    text7:
      "— 已签署——这意味着你已加入。从这里开始，我们将看看你能走多远。战斗不是与他人，而是与自己。",
    button_next: "Next scene",
    text8: "请输入您的以太坊主网地址。",
    error1: "The address specified is not valid",
    error2: "The pass has already been activated",
    error3: "You don't have an activated pass",
    error4: "签名尝试失败。请重新启动机器人并再试一次。",
    text9: "请输入签名消息的哈希值。",
    exit: "Exit",
  },
  scene2: {
    title: "场景 2：泰勒陪同前往第一个地点",
    text1: `— 好的，宇航员。你现在在曼谷，这里是深入赛博朋克基础的绝佳机会。虽然这不是千叶市，但在这里，自由在每个角落回荡。`,
    text2: `— 没读过《神经漫游者》或玩过《赛博朋克》？没有？没关系。只要别僵住就行。我们从简单的开始：去酒吧，做一些你从未尝试过的事情。`,
    text3: `— 这是地点。一到那里，点一杯饮料。然后把你的季票给调酒师看——你会得到三个地点的指示。`,
    text3_desc: `> https://maps.app.goo.gl/FmFBpJWwWAGNVgMa8\n>\n>工作时间：19:00 至 00:00\n>\n>看看二楼。\n>\n>（并不需要在同一天访问所有地点，你可以在任务的所有日子里逐步完成。）`,
    text4: `— 一旦你坐下，拿到调酒师的东西，马上告诉我。`,
    button: "我在酒吧",
    group: "联系任务控制中心",
    error:
      "好的，完美。不过我有种感觉有人在盯着我，所以我得等一等。大约25分钟后给我发个信号，在此期间，你就放松一下。",
    reset:
      "看起来你玩得很开心，伙计。不过，找到决心完成任务——你还有25分钟。之后，游戏结束。",
    button_reset: "Try again",
    gameover:
      "好吧，你搞砸了，宇航员，真可惜。如果你真的想逃离这面黑镜，某天再来找我吧。但现在——告别了。",
  },
  scene3: {
    title: `场景 3：在酒吧“中年危机”`,
    text1: `— 一个有趣的地方。一场中年危机。我们并没有看到那些曾经向往后现代生活的街头孩子们所追寻的“来世”，而是看到了一个受折磨、诚实纳税人的脖子上松松垮垮系着的领带。这既是喜剧，也是悲剧。`,
    text2: `— 这家酒吧是我们的门户。更准确地说，是这家酒吧的洗手间。`,
    text3: `— 进入洗手间，四处看看。那里会有一个漏水传感器，和说明中提到的一样。你需要闭合它的接触点。`,
    text4: `— 你可以舔一舔它，或者想出更聪明的方法——由你自己决定。`,
    text5: `— 一旦你完成这个，我就会在我的频率上看到信号，并给你发送下一个地点的坐标。在那里，你会找到一段特殊的脑舞，内容涉及某个按摩房间的事件。`,
    group: "如果你卡住了，联系游戏控制中心",
    finish: `— — 看起来你成功了！你找到的设备已经发送了下一个地点的坐标链接。通过这个交易找到它们：`,
    finish_desc: `> https://robonomics.subscan.io/extrinsic/__blockNumber__-__txIndex__\n>\n>工作时间：11:00 至 23:00\n>\n>9号房间`,
    button_next: "Next scene",
  },
  scene4: {
    title: `场景 4：前往按摩店的路上`,
    text1: `— 这里有一个有趣的历史事实：当那场臭名昭著的冲突在附近的半岛上激烈进行时——库布里克在《全金属外壳》中描绘的那场冲突——一些在那儿作战的勇敢士兵驻扎在附近的芭堤雅。他们对此地爱得深沉，以至于十年后，泰国的性旅游蓬勃发展，达到了前所未有的繁荣。`,
    text2: `— 现在情况变得更加简单：四星和五星级酒店，苏坤逸路上，女孩们沿路而站。只需握住她的手——她就是你的，想怎么做就怎么做。当然，这一切都是由投资者的钱资助的。`,
    text3: `— 你知道有什么特别尴尬的吗？芭提雅现在不仅是寻找性服务的游客的聚集地，还是来自后苏联国家的已婚男士的去处。想象一下，当一个英国人发现一个白俄罗斯人或哈萨克斯坦人带着妻子和三个孩子来到这里时的反应？这就是悖论，简单明了。`,
    text4: `— 好了，让我们开始正事。你需要进入我朋友的按摩店。在入口处出示你的季票，她会带你去一个特殊的房间。那个房间里现在没有人工作，但在它的墙壁里保存着一个有趣的故事。你得亲自去看看。`,
    text5: `— 在你进入之前，按摩店需要先激活。店主是个体面的女人，所以别把这个地方想成是个发泄的地方。当你距离那里还有15分钟时给我发消息，我会确认那里不会有其他人。你应该会在30分钟内被接待并带进去。`,
    button: "我离地点很近，泰勒。",
    group: "如果你卡住了，联系游戏控制中心",
    error:
      "稍等一下，伙计。我在雷达上看到房间已经被占用了。等大约40分钟，再联系我。",
    activated:
      "地点已激活。在入口处出示你的季票。不要耽搁——一旦进入按摩店，你将有15分钟时间。",
  },
  scene5: {
    title: `场景五：在按摩院`, //
    text1:
      "— 曼谷按摩店里狭小的房间——这里是学生、单身母亲和来自偏远村庄的女孩们工作的地方，她们通过周末的机会逃离到广阔的购物中心。想象一下，正是在这里，第一个“裂口手术师”出现了——那些不仅非法安装铬合金，还解放合成意识，打破创作者设定的规则的人。但先驱者往往在未来的背景下燃尽自己。听听这段录音，想象一下这里发生了什么。找出获取下一个地点坐标的方法。",
    text2:
      "该死的洋娃娃爱好者！我们创造它们是为了服务我们，而你却在解放它们脱离阿西莫夫的枷锁！无论如何——少了一个这样的黑客。现在，那该死的中继器在哪里…",
    text3:
      "我的联系人说，信息可以通过正确操作灯光开关来访问——大太阳，左箭头，右箭头。当你看到灯泡闪烁时…",
    group: "如果你卡住了，联系游戏控制中心",
    reset:
      "嘿，宇航员，你是不是在那儿睡着了？我还没收到你的信号。你还有45分钟时间来完成任务。",
    button_reset: "Try again",
    gameover:
      "好吧，你搞砸了，宇航员，真可惜。如果你真的想逃离这面黑镜，某天再来找我吧。但现在——告别了。",
    finish: `— 好吧，你找到如何激活第二个钥匙了。真是个悲伤的故事。那个女孩并没有做错什么，但总会有那些追求“纯洁”的狂热者——那些严苛、狭隘的人。现在，宇航员，是时候前往第三个地点了。以下是你激活的设备发送的交易。和之前一样，找到坐标：`,
    finish_desc: `> https://robonomics.subscan.io/extrinsic/__blockNumber__-__txIndex__\n>\n>工作时间：17:00 至 22:00`,
    button_next: "Next scene",
  },
  scene6: {
    title: `场景 6：最后的任务`,
    text1:
      "— 你的最终目的地是太空猴子的监控中心。这是个高度机密的地点，所以保持低调。寻找一个带有 'I ❤️ PIZZA' 大标志的集装箱结构。找到带栅栏的门和楼梯，上到三楼。你会看到一个标准的美式双人间。进去后，你会看到打开的行李箱。寻找一张带猴子图案的塑料酒店钥匙，然后走到阳台上。到了那里，你可能会有裂口手术师的感觉——打开安卓的头盖，看里面，找到保险箱的密码。",
    button: "我在地点上。",
    group: "如果你卡住了，联系游戏控制中心",
    error: "稍等。有可疑人员在摄像头附近徘徊。请等待 15 分钟，然后重试。",
    activated: "— 太好了。15 分钟内您都可以使用这个位置。别把事情搞砸了。",
    finish1: "— 成功了！现在你只需打开保险箱即可。",
    finish2:
      "— 好了，就这些了，宇航员。飞行过程中只需完成几个简单的任务 — 我想这正是你所需要的。别忘了你这样做的原因 — 退出系统。所以，断开与云层的连接吧，伙计！",
    finish3:
      "> 该任务由 Robonomics 团队准备。如果您有兴趣支持我们或了解更多信息，请在此聊天中留言，我们会将消息发送给开发人员。祝您好运！",
    reset:
      "我不知道你在那里搞什么，但听着——这是你的最后一次机会，伙计。之后，数字门就会关闭。",
    button_reset: "Try again",
    gameover:
      "好吧，你搞砸了，宇航员，真可惜。如果你真的想逃离这面黑镜，某天再来找我吧。但现在——告别了。",
  },
};
