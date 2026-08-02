// 帮助插件
class HelpPlugin {
  constructor(bot) {
    this.bot = bot;
  }

  async onCommand(message, args) {
    const helpText = `📚 Steam QQ机器人帮助

可用命令：
- @机器人 置顶 [好友名称] - 添加置顶好友
- @机器人 取消置顶 [好友名称] - 移除置顶好友  
- @机器人 置顶列表 - 查看置顶好友列表
- @机器人 查在线 - 查看Steam好友在线状态

功能说明：
- 📊 在线好友查询：查看Steam好友的在线状态
- ⭐ 置顶好友排序：将重要好友置顶，并按状态排序显示
- 🖼️ 图片回复：生成好友列表图片，失败时自动 fallback 到文本
- 📋 状态排序：按"正在玩游戏 > 在线 > 离开 > 忙碌"的顺序排序

注意：实际使用前请替换配置文件中的敏感信息。`;
    
    await message.reply(helpText);
  }
}

module.exports = HelpPlugin;