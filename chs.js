/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com
 @idle games : http://www.gityx.com
 @QQ Group : 627141737

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Achievement Gotten!": "成就达成！",
    "shift+space": "shift+空格键",
    " Arcana": " 奥秘",
    " Mana": "法力",
    "(requires immediate ascent)": "（需要立即上升）",
    "Activate all links in the current fractal.": "激活当前分形中的所有链接。",
    "Adds inventory slots.": "添加库存槽。",
    "All crystals use the corresponding tier from their shop page.": "所有水晶都使用其商店页面中的相应等级。",
    "All hotkeys work inside your inventory as well.": "所有热键也可以在您的库存中使用。",
    "Arcana": "奥秘",
    "Arcana\n                    (": "奥秘\n (",
    "Ascend": "转生",
    "Ascend now, increasing level by": "现在转生，等级增加",
    "at Level": "在级别",
    "Available Talent Points": "可用天赋点",
    "Bigger Inventory": "更大的库存",
    "Bind to escape to revert to default.": "绑定到转义以恢复默认值。",
    "Blank": "空白",
    "Bonus": "奖励",
    "Boosts the effective value of": "提高有效值：",
    "Buy x1 of each": "每种购买 x1",
    "Clear all the links in the current fractal.": "清除当前分形中的所有链接。",
    "Complex": "复杂",
    "Conjure": "变戏法",
    "Connected links are animated to represent flow. Power (and ticks) flow downstream from the core path.\n            When there is a tie for distance, the link is inactive.": "连接的链接被动画化以表示流。能量（和tick）从核心路径向下游流动。\n 当距离平局时，链接处于非活动状态。",
    "Controls": "控制",
    "Copy the link layout of current fractal.": "复制当前分形的链接布局。",
    "Created with Raphaël 2.3.0": "使用拉斐尔 2.3.0 创建",
    "crystal from the Conjure panel on the right into a hexagonal slot on the board.\n            Then click links between the core and that crystal until you see green links flowing to the crystal from the core.": "将右侧的 Conjure 面板中的水晶放入板上的六角形槽中。\n 然后单击核心和水晶之间的链接，直到看到绿色链接从核心流向水晶。",
    "crystals to convert mana into a new resource that you can use to purchase upgrades in the Enchant tab.": "水晶将法力转化为新资源，您可以使用该资源在“附魔”选项卡中购买升级。",
    "Delete the crystal under your cursor.": "删除光标下的水晶。",
    "Description": "描述",
    "Desription": "描述",
    "Different stats and crystals do different things to upstream or downstream parts, so your layout is key.": "不同的统计数据和水晶对上游或下游部分做不同的事情，所以你的布局是关键。",
    "Enchant": "附魔",
    "Experience": "经验",
    "Experience gained from enchanting:": "附魔获得的经验：",
    "Experience gained from spent Arcana:": "从使用的奥秘中获得的经验：",
    "Fractals": "分形",
    "Full Reset": "完全重置",
    "Gameplay basics": "游戏基础",
    "Glow": "发光",
    "Help": "帮助",
    "Hold control and move your mouse over links to disable them.": "按住控制并将鼠标移到链接上以禁用它们。",
    "Hold shift and move your mouse over links to enable them.": "按住 shift 并将鼠标移到链接上以启用它们。",
    "Hover and scroll over the tier number to cycle it in the same manner.": "将鼠标悬停在层号上并滚动以以相同的方式循环它。",
    "Hover over the '< >' symbol in simple crystal shop page and scroll your mousewheel to cycle through available types.": "将鼠标悬停在简单水晶商店页面中的“< >”符号上并滚动鼠标滚轮以循环选择可用的类型。",
    "Inventory": "库存",
    "Key": "钥匙",
    "Left and rightclicking the button also works.": "左键和右键单击该按钮也可以。",
    "Level": "等级",
    "more)": "更多的）",
    "Move crystals using drag&drop": "使用拖放移动水晶",
    "Name": "姓名",
    "Next Bonus": "下一个奖励",
    "Next Cost": "下一个成本",
    "Next Discovery": "下一个发现",
    "Next Level At": "下一级",
    "Pause": "暂停",
    "Pause or unpause the game.": "暂停或取消暂停游戏。",
    "Place a blank crystal.": "放置一个空白水晶。",
    "Place a simple Arcana crystal.": "放置一个简单的奥秘水晶。",
    "Place a simple Glow crystal.": "放置一个简单的发光水晶。",
    "Place currently selected simple gem from the shop.": "放置当前从商店中选择的简单宝石。",
    "Refinement": "精炼",
    "Reroll": "重掷",
    "Reset Points": "重置点",
    "Reset to defaults": "重置为默认值",
    "Right click on the key to rebind.": "右键单击要重新绑定的键。",
    "Right- or double-click crystals to drop them into your inventory": "右键或双击水晶将它们放入您的库存中",
    "Rightclick or doubleclick a crystal in the shop to buy it into the first available slot in your inventory.": "右键单击或双击商店中的水晶，将其购买到您库存中的第一个可用插槽中。",
    "Rightclick or doubleclick a crystal to transfer it to your inventory from a node.": "右键单击或双击水晶以将其从节点转移到您的库存中。",
    "Rightclick or doubleclick a node to put the first crystal from your inventory into it.": "右键单击或双击一个节点，将您库存中的第一个水晶放入其中。",
    "Simple": "简单",
    "Spend Arcana to increase the effective value of a stat on all crystals.": "花费奥秘来增加所有水晶的属性的有效值。",
    "Spending Arcana on enchantments gives you a proportionate amount of experience. Gaining enough will\n            let you reset your run - Ascend - and gain talent points, allowing you to unlock new Aspects and crystals.": "在附魔上花费奥秘会给你相应的经验。获得足够的\n可以让你重置你的运行 - 转生 - 并获得天赋点，让你解锁新的 Aspects 和水晶。",
    "The crystal will start generating resources every tick. Conjure more crystals and expand your setup.\n            Place some Arcana": "水晶会在每刻开始生成资源。召唤更多水晶并扩展您的设置。\n 放置一些奥秘",
    "The goal of the game is to create crystals and use them to generate resources in order to progress.\n            To work, crystals need to be connected to the core (the rainbow crystal in the center).": "游戏的目标是创造水晶并使用它们来生成资源以促进进步。\n 要工作，水晶需要连接到核心（中心的彩虹水晶）。",
    "to lose all crystals, upgrades, AND EXPERIENCE, LEVELS, AND TALENTS.  This is a complete reset!  There is no going back!": "失去所有水晶、升级和经验、等级和天赋。这是一个完整的重置！没有回头路了！",
    "To start off, drag a Simple Glow": "首先，拖动一个简单的发光",
    "Toggle links by clicking on them": "通过单击它们来切换链接",
    "Trash": "垃圾",
    "Welcome to Fractory! Below you will find gameplay tips to help you get started.": "欢迎来到 Fractory！您将在下面找到可帮助您入门的游戏技巧。",
    "You can use regular keys, keys+ctrl-shift-alt, basically any combination, even key sequences, go nuts!": "您可以使用常规键，键+ctrl-shift-alt，基本上是任何组合，甚至键序列，发疯！",
    "You gain experience by enchanting, one point per arcana spent.": "你通过附魔获得经验，每消耗一分奥术。",
    "You will lose all crystals and enchant upgrades when you ascend.": "转生时，您将失去所有水晶和附魔升级。",
    "Zoom Out": "缩小",
    "/ tick after buffs).": "/ tick 在 buff 之后).",
    "Core": "核心",
    "Crystal of Glow": "光之水晶",
    "Determines maximum refinement.": "决定最大精炼。",
    "Generates": "生成",
    "Infinity": "无限",
    "mana  per tick. (": "法力每 tick. (",
    "Tier": "层",
    "Value": "值",
    "The core of your Fractory.  Cannot be moved.  All crystals must be linked to it to function.": "您的 Fractory 的核心。 无法移动。 所有水晶都必须与它相连才能发挥作用。",
    "Converts mana to arcana, which is spent on Enchanting.  Enchanting increases the effective value of all stats on all crystals.  (": "将法力转化为奥术，用于附魔。 附魔会增加所有水晶的所有属性的有效值。 (",
    "Costs up to": "成本提升到 ",
    "Crystal": "水晶",
    "Does nothing.": "什么都不做。",
    "Flaw": "瑕疵",
    "Flawed Arcane Crystal of Glow": "有缺陷的发光奥术水晶",
    "Flawed Crystal of Glow": "有缺陷的发光水晶",
    "mana per tick.": "法力每 tick.",
    "Price": "价格",
    "Flawed Crystal of Arcana": "有缺陷的奥秘水晶",
    "Flawed Glowing Crystal of Arcana": "有缺陷的奥秘发光水晶",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Refinement shows the capacity of a crystal. Aspect effects scale with amount, so in the beginning\n            you might want to reroll crystals until you get decently-filled ones. Flaw is a waste Aspect that you'll learn to deal with later on.\n            Note the difference in mana generation:": "精炼显示了晶体的容量。 方面效果随数量而变化，因此在开始时\n您可能想要重掷水晶，直到获得适当填充的水晶。 缺陷是一个浪费的方面，你稍后会学会处理。\n 请注意法力生成的差异：",
    // 图标代码，不能汉化
    "Jacorb's Games": "Jacorb's Games",
    "s": "s",
    "b": "b",
    "q": "q",
    "w": "w",
    "": "",
    "": "",
    "": "",
    "By Jacorb90": "By Jacorb90",
    "content_copy": "content_copy",
    "library_books": "library_books",
    "discord": "discord",
    "drag_handle": "drag_handle",
    "edit": "edit",
    "forum": "forum",
    "content_paste": "content_paste",
    "delete": "delete",
    "info": "info",
    "settings": "settings",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    'x': 'x',
    'QQ群号:': 'QQ群号:',
    '* 启用后台游戏': '* 启用后台游戏',
    '更多同类游戏:': '更多同类游戏:',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "\n": "\n",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Shift-Click to Toggle Tooltips: ": "Shift-单击以切换工具提示：",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "  ",
    " ": " ",
    "\n": "\n",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    "\t": "\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)\-([\d\.]+)\-([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^\(([\d\.]+)\)$/,
    /^([\d\.]+)\%$/,
    /^([\d\.]+)\/([\d\.]+)$/,
    /^\(([\d\.]+)\/([\d\.]+)\)$/,
    /^成本(.+)$/,
    /^\(([\d\.]+)\%\)$/,
    /^([\d\.]+):([\d\.]+):([\d\.]+)$/,
    /^([\d\.]+)K$/,
    /^([\d\.]+)M$/,
    /^([\d\.]+)B$/,
    /^([\d\.]+) K$/,
    /^([\d\.]+) M$/,
    /^([\d\.]+) B$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^\+([\d\.,]+)$/,
    /^\-([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^e([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^Saved (.+) secs ago$/, '上次保存于 $1 秒前'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)d ([\d\.]+)h ([\d\.]+)m$/, '$1天 $2小时 $3分'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) elves$/, '要求：$1 精灵'],
    [/^Req: (.+) \/ (.+) elves$/, '要求：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);