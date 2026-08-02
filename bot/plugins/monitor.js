// 监控插件
const { SteamAPI } = require('../core/steam-api');

class MonitorPlugin {
  constructor(bot) {
    this.bot = bot;
    this.steamAPI = new SteamAPI(bot.config.steamApiKey);
    this.lastStatus = new Map();
  }

  async startMonitoring() {
    setInterval(async () => {
      try {
        const steamFriends = this.bot.config.steamFriends;
        const friendsData = await this.steamAPI.getFriendsStatus(steamFriends);
        
        friendsData.forEach(friend => {
          const previousStatus = this.lastStatus.get(friend.steamId);
          if (previousStatus && previousStatus !== friend.status) {
            this.bot.logger.info(`好友状态变化: ${friend.name} - ${previousStatus} → ${friend.status}`);
            // 可以在这里添加状态变化通知逻辑
          }
          this.lastStatus.set(friend.steamId, friend.status);
        });
      } catch (error) {
        this.bot.logger.error('监控好友状态失败:', error);
      }
    }, 300000); // 每5分钟检查一次
  }
}

module.exports = MonitorPlugin;