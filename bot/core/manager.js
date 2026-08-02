// 机器人管理器
const { WebSocketManager } = require('./websocket-manager');
const { PluginManager } = require('./plugin-manager');
const { Logger } = require('./logger');

class Manager {
  constructor() {
    this.config = this.loadConfig();
    this.logger = new Logger(this.config.logLevel);
    this.websocketManager = new WebSocketManager(this.config);
    this.pluginManager = new PluginManager(this);
  }

  loadConfig() {
    try {
      const config = require('../settings.json');
      return config;
    } catch (error) {
      this.logger.error('加载配置文件失败:', error);
      throw new Error('配置文件加载失败');
    }
  }

  async start() {
    try {
      // 初始化WebSocket连接
      await this.websocketManager.connect();
      
      // 初始化插件
      await this.pluginManager.initialize();
      
      this.logger.info('机器人初始化完成');
    } catch (error) {
      this.logger.error('机器人启动失败:', error);
      throw error;
    }
  }

  async stop() {
    try {
      await this.websocketManager.disconnect();
      this.logger.info('机器人已停止');
    } catch (error) {
      this.logger.error('停止机器人失败:', error);
    }
  }
}

module.exports = { Manager };