// Steam绑定插件
const { DataStorage } = require('../core/data-storage');

class SteamBindPlugin {
  constructor(bot) {
    this.bot = bot;
    this.storage = new DataStorage(bot.config.dataPath);
  }

  async onCommand(message, args) {
    const qqId = message.sender.id;
    const steamId = args[0];

    if (!steamId) {
      return await this.showBindStatus(message);
    }

    try {
      await this.storage.bindSteamId(qqId, steamId);
      await message.reply(`✅ 已将QQ号 ${qqId} 绑定到Steam ID: ${steamId}`);
    } catch (error) {
      this.bot.logger.error('绑定Steam ID失败:', error);
      await message.reply('❌ 绑定失败，请稍后再试');
    }
  }

  async showBindStatus(message) {
    const qqId = message.sender.id;
    try {
      const steamId = await this.storage.getSteamId(qqId);
      if (steamId) {
        await message.reply(`🔗 当前绑定: QQ ${qqId} → Steam ${steamId}`);
      } else {
        await message.reply(`🔗 未绑定Steam ID，请使用命令: @机器人 绑定 [Steam ID]`);
      }
    } catch (error) {
      this.bot.logger.error('获取绑定状态失败:', error);
      await message.reply('❌ 获取绑定状态失败，请稍后再试');
    }
  }
}

module.exports = SteamBindPlugin;