// WebSocket管理器
const WebSocket = require('ws');

class WebSocketManager {
  constructor(config) {
    this.config = config;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const wsUrl = `ws://localhost:8080`;
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.on('open', () => {
        this.logger.info('WebSocket连接成功');
        this.reconnectAttempts = 0;
        resolve();
      });

      this.ws.on('message', (data) => {
        try {
          const message = JSON.parse(data);
          this.handleMessage(message);
        } catch (error) {
          this.logger.error('处理WebSocket消息失败:', error);
        }
      });

      this.ws.on('close', () => {
        this.logger.warn('WebSocket连接关闭');
        this.handleReconnect();
      });

      this.ws.on('error', (error) => {
        this.logger.error('WebSocket错误:', error);
        reject(error);
      });
    });
  }

  handleMessage(message) {
    // 处理来自NapCat的消息
    if (message.type === 'message') {
      this.pluginManager.handleMessage(message);
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.logger.info(`尝试重新连接 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.connect(), 5000);
    } else {
      this.logger.error('达到最大重连次数，停止重连');
    }
  }

  async disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

module.exports = { WebSocketManager };