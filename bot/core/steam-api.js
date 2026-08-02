// Steam API客户端
const axios = require('axios');

class SteamAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.steampowered.com';
  }

  async getFriendsStatus(steamIds) {
    const friendsData = [];
    
    for (const steamId of steamIds) {
      try {
        const response = await axios.get(`${this.baseUrl}/ISteamUser/GetPlayerSummaries/v2/`, {
          params: {
            key: this.apiKey,
            steamids: steamId
          }
        });

        const player = response.data.response.players[0];
        if (player) {
          friendsData.push({
            steamId: player.steamid,
            name: player.personaname,
            status: this.getPlayerStatus(player),
            gameName: player.gameextrainfo || null
          });
        }
      } catch (error) {
        console.error(`获取Steam好友 ${steamId} 状态失败:`, error.message);
      }
    }

    // 按状态排序：正在玩游戏 > 在线 > 离开 > 忙碌
    const statusOrder = {
      'ingame': 0,
      'online': 1, 
      'away': 2,
      'busy': 3
    };

    return friendsData.sort((a, b) => {
      const orderA = statusOrder[a.status] || 4;
      const orderB = statusOrder[b.status] || 4;
      return orderA - orderB;
    });
  }

  getPlayerStatus(player) {
    if (player.gameextrainfo) return 'ingame';
    if (player.personastate === 1) return 'online';
    if (player.personastate === 3) return 'away';
    if (player.personastate === 4) return 'busy';
    return 'offline';
  }
}

module.exports = { SteamAPI };