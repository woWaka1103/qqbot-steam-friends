// 图片生成器
const { createCanvas, Image } = require('canvas');
const fs = require('fs').promises;

class ImageGenerator {
  constructor(config) {
    this.config = config;
  }

  async generateFriendsImage(friendsData) {
    try {
      const canvas = createCanvas(800, 600);
      const ctx = canvas.getContext('2d');

      // 设置背景
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 标题
      ctx.fillStyle = '#ecf0f1';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('Steam好友在线状态', 20, 40);

      // 绘制好友列表
      let y = 80;
      friendsData.forEach((friend, index) => {
        // 状态图标
        const statusIcon = this.getStatusIcon(friend.status);
        ctx.font = '20px Arial';
        ctx.fillText(statusIcon, 20, y);

        // 好友名称
        ctx.font = '18px Arial';
        ctx.fillStyle = '#3498db';
        ctx.fillText(friend.name, 50, y);

        // 状态
        ctx.font = '16px Arial';
        ctx.fillStyle = '#95a5a6';
        ctx.fillText(friend.status, 200, y);

        // 如果正在玩游戏，显示游戏名称
        if (friend.gameName) {
          ctx.font = '14px Arial';
          ctx.fillStyle = '#e74c3c';
          ctx.fillText(`🎮 ${friend.gameName}`, 300, y);
        }

        y += 30;
        if (y > 550) break; // 防止超出画布
      });

      // 转换为Buffer
      const buffer = canvas.toBuffer('image/png', { quality: this.config.imageQuality });
      return buffer;
    } catch (error) {
      console.error('生成图片失败:', error);
      throw error;
    }
  }

  getStatusIcon(status) {
    switch (status) {
      case 'ingame': return '🎮';
      case 'online': return '🟢';
      case 'away': return '🟡';
      case 'busy': return '🔴';
      default: return '⚪';
    }
  }
}

module.exports = { ImageGenerator };