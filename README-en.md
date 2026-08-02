# Steam QQ Bot - Online Friends Query with Priority Sorting

## Project Overview

This is a Steam QQ bot based on NapCat, primarily designed to query Steam friends' online status with priority sorting functionality.

## Features

- **Online Friends Query**: Check Steam friends' online status
- **Priority Friends Sorting**: Pin important friends and sort by status
- **Image Replies**: Generate friend list images, fallback to text when failed
- **Status Sorting**: Sort by "Playing Game > Online > Away > Busy"
- **Priority Marking**: Show ★ prefix for pinned friends

## Usage

### Basic Commands

- `@bot pin BlackRabbitP` - Add pinned friend
- `@bot unpin BlackRabbitP` - Remove pinned friend
- `@bot pinned-list` - View current pinned friends
- `@bot check-online` - View sorted friend list

### Sorting Rules

1. ⭐ Pinned friends appear first (with ★ prefix)
2. Within same group, sort by status: Playing Game > Online > Away > Busy

## Project Structure

### Lightweight Version
```
QQbot_steam/
├── bot/                    # Bot core code
│   ├── index.js           # Main entry
│   ├── package.json       # Project configuration
│   ├── settings.json      # Configuration file
│   ├── plugins/           # Plugins
│   │   ├── friends-query.js    # Online friends query plugin
│   │   ├── priority-friends.js # Pinned friends management plugin
│   │   ├── help.js           # Help plugin
│   │   ├── monitor.js        # Monitor plugin
│   │   └── steam-bind.js     # Steam binding plugin
│   └── core/              # Core modules
│       ├── manager.js     # Bot manager
│       ├── websocket-manager.js # WebSocket management
│       ├── plugin-manager.js   # Plugin management
│       ├── logger.js      # Logging
│       ├── steam-api.js   # Steam API client
│       └── image-generator.js  # Image generator
└── README.md             # Project documentation
```

## Technology Stack

- **Backend Framework**: Node.js
- **QQ Bot**: NapCat
- **Steam API**: Steam Web API
- **Image Generation**: Custom image generation module
- **Configuration Management**: JSON configuration files
- **WebSocket**: For NapCat communication

## References

- [NapCat QQ Bot](https://github.com/NapCat-Team/NapCatQQ)
- [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API)
- [Node.js](https://nodejs.org/)

## Notes

This project is AI-generated and for technical exchange reference only. Please test and improve before actual deployment and usage.

**Important: Before deployment, please replace the following sensitive information:**
- `steamApiKey` in `settings.json` with your own Steam API key
- `selfId` in `settings.json` with your QQ bot ID
- `admins` in `settings.json` with your admin QQ IDs

## Installation Guide

### 1. Clone the repository
```bash
git clone https://github.com/woWaka1103/qqbot-steam-friends.git
cd qqbot_steam-friends
```

### 2. Install dependencies
```bash
cd bot
npm install
```

### 3. Configure the settings
Edit `settings.json` file and replace sensitive information:
```json
{
  "steamApiKey": "YOUR_STEAM_API_KEY",
  "selfId": "YOUR_QQ_BOT_ID", 
  "admins": ["YOUR_ADMIN_QQ"]
}
```

### 4. Run the bot
```bash
node index.js
```