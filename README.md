# Steam QQ 机器人 - 在线好友查询与置顶排序功能

## 项目简介

这是一个基于 NapCat 的 Steam QQ 机器人，主要功能是查询 Steam 好友在线状态，并支持置顶好友排序功能。

## 功能特点

- **在线好友查询**：查看 Steam 好友的在线状态
- **置顶好友排序**：将重要好友置顶，并按状态排序显示
- **图片回复**：生成好友列表图片，失败时自动 fallback 到文本
- **状态排序**：按"正在玩游戏 > 在线 > 离开 > 忙碌"的顺序排序
- **置顶标记**：置顶好友名字前显示 ★ 标记

## 使用方法

### 基本命令

- `@机器人 置顶 黑兔P` - 添加置顶好友
- `@机器人 取消置顶 黑兔P` - 移除置顶好友
- `@机器人 置顶列表` - 查看当前置顶好友
- `@机器人 查在线` - 查看排序后的好友列表

### 排序规则

1. ⭐ 置顶好友排最前（名字带 ★ 标记）
2. 同组内按状态排序：正在玩游戏 > 在线 > 离开 > 忙碌

## 项目结构

### 精简版
```
QQbot_steam/
├── bot/                    # 机器人核心代码
│   ├── index.js           # 主入口
│   ├── package.json       # 项目配置
│   ├── settings.json      # 配置文件
│   ├── plugins/           # 插件
│   │   ├── friends-query.js    # 在线好友查询插件
│   │   ├── priority-friends.js # 置顶好友管理插件
│   │   ├── help.js           # 帮助插件
│   │   ├── monitor.js        # 监控插件
│   │   └── steam-bind.js     # Steam 绑定插件
│   └── core/              # 核心模块
│       ├── manager.js     # 机器人管理器
│       ├── websocket-manager.js # WebSocket管理
│       ├── plugin-manager.js   # 插件管理
│       ├── logger.js      # 日志管理
│       ├── steam-api.js   # Steam API客户端
│       └── image-generator.js  # 图片生成器
└── README.md             # 项目文档
```

## 技术栈

- **后端框架**：Node.js
- **QQ 机器人**：NapCat
- **Steam API**：Steam Web API
- **图片生成**：自定义图片生成模块
- **配置管理**：JSON 配置文件
- **WebSocket**：用于 NapCat 通信

## 参考资料

- [NapCat QQ 机器人](https://github.com/NapCat-Team/NapCatQQ)
- [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Node.js](https://nodejs.org/)

## 注意事项

本项目为 AI 生成，仅作技术交流参考使用。实际部署和使用前请自行测试和完善。

**重要：在部署前请替换以下敏感信息：**
- `settings.json` 中的 `steamApiKey` 为你自己的 Steam API 密钥
- `settings.json` 中的 `selfId` 为你的 QQ 机器人 ID
- `settings.json` 中的 `admins` 为你的管理员 QQ 号

## 安装指南

### 1. 克隆仓库
```bash
git clone https://github.com/woWaka1103/qqbot-steam-friends.git
cd qqbot_steam-friends
```

### 2. 安装依赖
```bash
cd bot
npm install
```

### 3. 配置文件
编辑 `settings.json` 文件，替换敏感信息：
```json
{
  "steamApiKey": "YOUR_STEAM_API_KEY",
  "selfId": "YOUR_QQ_BOT_ID", 
  "admins": ["YOUR_ADMIN_QQ"]
}
```

### 4. 运行机器人
```bash
node index.js
```