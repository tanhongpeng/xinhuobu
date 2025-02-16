const quotes = require('../../data/quotes.js');

Page({
  data: {
    loadingPercent: 0,
    quote: '',
    fontLoaded: false,
    errorMessage: ''
  },

  async onLoad() {
    try {
      await this._loadCustomFont();
      this._initLaunchContent();
      this._startLoadingProgress();
    } catch (err) {
      console.error('启动异常:', err);
      this._handleLaunchError();
    }
  },

  _loadCustomFont() {
    return new Promise((resolve, reject) => {
      wx.loadFontFace({
        family: 'WenKai',
        source: 'url("/assets/fonts/LXGWWenKai-Regular.ttf")',
        global: true,
        success: () => {
          this.setData({ fontLoaded: true });
          resolve();
        },
        fail: () => {
          wx.loadFontFace({
            family: 'WenKai',
            source: 'url("/assets/fonts/LXGWWenKai-Regular.ttf")',
            success: () => {
              this.setData({ fontLoaded: true });
              resolve();
            },
            fail: (err) => reject(err)
          });
        }
      });
    });
  },

  _initLaunchContent() {
    const targetQuote = quotes.find(item => item.scene === '启动加载') || {};
    this.setData({ 
      quote: targetQuote.text || '薪火相传，匠心永铸'
    });
  },

  _startLoadingProgress() {
    let current = 0;
    const animate = () => {
      if (current < 100) {
        current += Math.floor(Math.random() * 15) + 5;
        this.setData({
          loadingPercent: Math.min(current, 100)
        });
        setTimeout(animate, 300);
      } else {
        this._navigateToHome();
      }
    };
    animate();
  },

// 修改后（增加加载状态检查）
_navigateToHome() {
  if (this.data.fontLoaded) {
    wx.switchTab({ url: '/pages/home/home' });
  } else {
    setTimeout(() => this._navigateToHome(), 500);
  }
},

  _handleLaunchError() {
    this.setData({ 
      errorMessage: '资源加载异常，即将跳转...',
      loadingPercent: 100
    });
    setTimeout(() => this._navigateToHome(), 1500);
  }
});