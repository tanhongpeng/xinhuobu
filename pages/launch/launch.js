// pages/launch/launch.js
const quotes = require('../../data/quotes.js');

Page({
  data: {
    loadingPercent: 0,
    quote: '',
    fontLoaded: false,    // 新增字体加载状态
    errorMessage: ''      // 错误信息
  },

  async onLoad() {
    try {
      // 第一步：加载网络字体
      await this._loadCustomFont();
      // 第二步：初始化语录和进度条
      this._initLaunchContent();
      this._startLoadingProgress();
    } catch (err) {
      console.error('启动流程异常:', err);
      this.setData({ 
        errorMessage: '资源加载异常，即将跳转...',
        fontLoaded: false
      });
      // 降级处理：无字体跳转
      setTimeout(() => this._navigateToHome(), 1500);
    }
  },

  // 字体加载方法（新增核心逻辑）
  _loadCustomFont() {
    return new Promise((resolve, reject) => {
        wx.loadFontFace({
            family: 'WenKai',
            source: 'url("https://fonts.lxgw.io/css2?family=LXGWWenKai")', // 网络字体
            global: true, // 全局生效
            success: () => {
                console.log('霞鹜文楷加载成功');
                this.setData({ fontLoaded: true });
                resolve();
            },
            fail: (err) => {
                console.warn('网络字体加载失败，尝试本地字体:', err);
                // 尝试加载本地备用字体
                wx.loadFontFace({
                    family: 'WenKai',
                    source: 'url("/assets/fonts/LXGWWenKai.ttf")',
                    success: () => {
                        this.setData({ fontLoaded: true });
                        resolve();
                    },
                    fail: (localErr) => {
                        console.error('本地字体加载失败，详细错误信息:', localErr); // 添加详细错误信息
                        reject(localErr);
                    }
                });
            }
        });
    });
},

  // 初始化文化语录
  _initLaunchContent() {
    const targetQuote = quotes.find(item => item.scene === '启动加载') || {};
    this.setData({ 
      quote: targetQuote.text || '薪火相传，匠心永铸'
    });
  },

  // 进度条动画
  _startLoadingProgress() {
    let percent = 0;
    const updateProgress = () => {
      percent += 10;
      this.setData({
        loadingPercent: Math.min(percent, 100)
      });
      
      if (percent < 100) {
        setTimeout(updateProgress, 300);
      } else {
        this._navigateToHome();
      }
    };
    setTimeout(updateProgress, 300);
  },

  // 导航逻辑（优化错误处理）
  _navigateToHome() {
    wx.reLaunch({
      url: '/pages/home/home',
      fail: (err) => {
        console.error('主页跳转失败:', err);
        this.setData({ 
          errorMessage: '跳转失败，请手动返回',
          loadingPercent: 100
        });
        // 应急跳转至记账页
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/record/record'
          });
        }, 2000);
      }
    });
  }
});