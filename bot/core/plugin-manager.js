// 插件管理器
const { FriendsQueryPlugin } = require('../plugins/friends-query');
const { PriorityFriendsPlugin } = require('../plugins/priority-friends');
const { HelpPlugin } = require('../plugins/help');
const { MonitorPlugin } = require('../plugins/monitor');
const { SteamBindPlugin } = require('../plugins/steam-bind');

class PluginManager {
  constructor(bot) {
    this.bot = bot;
    this.plugins = new Map();
  }

  async initialize() {
    // 注册所有插件
    this.registerPlugin('friends-query', new FriendsQueryPlugin(this.bot));
    this.registerPlugin('priority-friends', new PriorityFriendsPlugin(this.bot));
    this.registerPlugin('help', new HelpPlugin(this.bot));
    this.registerPlugin('monitor', new MonitorPlugin(this.bot));
    this.registerPlugin('steam-bind', new SteamBindPlugin(this.bot));

    // 启动监控插件
    const monitorPlugin = this.plugins.get('monitor');
    if (monitorPlugin) {
      monitorPlugin.startMonitoring();
    }
  }

  registerPlugin(name, plugin) {
    this.plugins.set(name, plugin);
  }

  async handleMessage(message) {
    const command = this.parseCommand(message.content);
    if (!command) return;

    const plugin = this.plugins.get(command.plugin);
    if (plugin && typeof plugin.onCommand === 'function') {
      await plugin.onCommand(message, command.args);
    }
  }

  parseCommand(content) {
    // 简单的命令解析逻辑
    const match = content.match(/^@机器人\s+(.+)$/);
    if (!match) return null;

    const commandText = match[1].trim();
    const parts = commandText.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    // 简单的插件映射
    const pluginMap = {
      '置顶': 'priority-friends',
      '取消置顶': 'priority-friends', 
      '置顶列表': 'priority-friends',
      '查在线': 'friends-query',
      '绑定': 'steam-bind'
    };

    const pluginName = pluginMap[command];
    if (!pluginName) return null;

    return {
      plugin: pluginName,
      command,
      args
    };
  }
}

module.exports = { PluginManager };