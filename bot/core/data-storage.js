// 数据存储管理器
const fs = require('fs').promises;
const path = require('path');

class DataStorage {
  constructor(dataPath) {
    this.dataPath = dataPath || './data';
    this.bindingsFile = path.join(this.dataPath, 'bindings.json');
    this.snapshotFile = path.join(this.dataPath, 'snapshot.json');
    this.priorityFile = path.join(this.dataPath, 'priority-friends.json');
    
    // 确保数据目录存在
    this.ensureDirectoryExists();
  }

  async ensureDirectoryExists() {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  async getSteamId(qqId) {
    try {
      const data = await this.readJsonFile(this.bindingsFile);
      return data[qqId] || null;
    } catch (error) {
      return null;
    }
  }

  async bindSteamId(qqId, steamId) {
    try {
      const data = await this.readJsonFile(this.bindingsFile);
      data[qqId] = steamId;
      await this.writeJsonFile(this.bindingsFile, data);
    } catch (error) {
      throw error;
    }
  }

  async getPriorityFriends() {
    try {
      const data = await this.readJsonFile(this.priorityFile);
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async savePriorityFriends(friends) {
    try {
      await this.writeJsonFile(this.priorityFile, friends);
    } catch (error) {
      throw error;
    }
  }

  async readJsonFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }

  async writeJsonFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}

module.exports = { DataStorage };