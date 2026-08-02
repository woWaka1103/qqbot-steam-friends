// 置顶好友管理插件
const { DataStorage } = require('../core/data-storage');

class PriorityFriendsPlugin {
  constructor(bot) {
    this.bot = bot;
    this.storage = new DataStorage(bot.config.dataPath);
  }

  async onCommand(message, args) {
    const command = args[0];
    const friendName = args[1];

    if (!command) {
      return await this.showPriorityList(message);
    }

    switch (command) {
      case '置顶':
        return await this.addPriorityFriend(message, friendName);
      case '取消置顶':
        return await this.removePriorityFriend(message, friendName);
      case '置顶列表':
        return await this.showPriorityList(message);
      default:
        await message.reply('❌ 未知命令，可用命令：置顶、取消置顶、置顶列表');
    }
  }

  async addPriorityFriend(message, friendName) {
    if (!friendName) {
      return await message.reply('❌ 请指定要置顶的好友名称');
    }

    try {
      const currentList = await this.storage.getPriorityFriends();
      if (currentList.includes(friendName)) {
        return await message.reply(`⚠️ ${friendName} 已经在置顶列表中`);
      }

      currentList.push(friendName);
      await this.storage.savePriorityFriends(currentList);
      await message.reply(`✅ ${friendName} 已添加到置顶列表`);
    } catch (error) {
      this.bot.logger.error('添加置顶好友失败:', error);
      await message.reply('❌ 添加置顶好友失败，请稍后再试');
    }
  }

  async removePriorityFriend(message, friendName) {
    if (!friendName) {
      return await message.reply('❌ 请指定要取消置顶的好友名称');
    }

    try {
      const currentList = await this.storage.getPriorityFriends();
      const newList = currentList.filter(name => name !== friendName);
      
      if (currentList.length === newList.length) {
        return await message.reply(`⚠️ ${friendName} 不在置顶列表中`);
      }

      await this.storage.savePriorityFriends(newList);
      await message.reply(`✅ ${friendName} 已从置顶列表移除`);
    } catch (error) {
      this.bot.logger.error('取消置顶好友失败:', error);
      await message.reply('❌ 取消置顶好友失败，请稍后再试');
    }
  }

  async showPriorityList(message) {
    try {
      const priorityList = await this.storage.getPriorityFriends();
      
      if (priorityList.length === 0) {
        return await message.reply('📝 置顶列表为空');
      }

      let response = '⭐ 置顶好友列表：\n\n';
      priorityList.forEach((name, index) => {
        response += `${index + 1}. ${name}\n`;
      });
      await message.reply(response);
    } catch (error) {
      this.bot.logger.error('获取置顶列表失败:', error);
      await message.reply('❌ 获取置顶列表失败，请稍后再试');
    }
  }
}

module.exports = PriorityFriendsPlugin;