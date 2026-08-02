// QQ机器人主入口文件
const { Manager } = require('./core/manager');

// 初始化机器人管理器
const botManager = new Manager();

// 启动机器人
botManager.start()
  .then(() => {
    console.log('Steam QQ机器人启动成功！');
  })
  .catch(error => {
    console.error('机器人启动失败:', error);
  });

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  botManager.logger.error('未捕获的异常:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise rejection:', reason);
  botManager.logger.error('未处理的Promise rejection:', reason);
});