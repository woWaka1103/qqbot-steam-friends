// 在线好友查询插件
const { SteamAPI } = require('../core/steam-api');
const { ImageGenerator } = require('../core/image-generator');

class FriendsQueryPlugin {
  constructor(bot) {
    this.bot = bot;
    this.steamAPI = new SteamAPI(bot.config.steamApiKey);
    this.imageGenerator = new ImageGenerator(bot.config);
  }

  async onCommand(message, args) {
    try {
      const steamFriends = this.bot.config.steamFriends;
      const friendsData = await this.steamAPI.getFriendsStatus(steamFriends);
      
      if (this.bot.config.broadcastImage && friendsData.length > 0) {
        const imageBuffer = await this.imageGenerator.generateFriendsImage(friendsData);
        await message.reply(imageBuffer);
      } else {
        let response = '📊 Steam好友在线状态：\n\n';
        friendsData.forEach(friend => {
          const statusIcon = this.getFriendStatusIcon(friend.status);
          response += `${statusIcon} ${friend.name} - ${friend.status}\n`;
        });
        await message.reply(response);
      }
    } catch (error) {
      this.bot.logger.error('查询好友状态失败:', error);
      await message.reply('❌ 查询好友状态失败，请稍后再试');
    }
  }

  getFriendStatusIcon(status) {
    switch (status) {
      case 'online': return '🟢';
      case 'ingame': return '🎮';
      case 'away': return '🟡';
      case 'busy': return '🔴';
      default: return '⚪';
    }
  }
}

module.exports = FriendsQueryPlugin;