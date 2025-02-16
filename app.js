const FONT_KEY = `font_loaded_${Date.now()}`; // 动态缓存键

App({
  globalData: {
    currentTab: 0,
    fontStatus: 'unloaded'
  },

  onLaunch() {
    this.initFont();
  },

  initFont() {
    // 清除旧缓存
    try {
      wx.removeStorageSync(FONT_KEY);
    } catch (e) {
      console.log('缓存清理日志:', e);
    }

    const fontTask = wx.loadFontFace({
      family: 'LXGWWenKai',
      source: 'url("/assets/fonts/LXGWWenKai-Regular.ttf")',
      global: true, // 确保全局生效
      success: () => {
        console.log('[PERF] 字体加载完成');
        wx.setStorageSync(FONT_KEY, 'loaded');
        this.globalData.fontStatus = 'loaded';
        
        // 延迟跳转确保字体生效
        setTimeout(() => {
          wx.switchTab({ url: '/pages/home/home' });
        }, 500);
      },
      fail: (err) => {
        console.error('[ERROR] 字体加载异常:', err);
        wx.setStorageSync(FONT_KEY, 'failed');
        this.globalData.fontStatus = 'failed';
        
        // 失败后强制跳转
        wx.reLaunch({ url: '/pages/home/home' });
      }
    });

    // 添加加载进度监听（小程序基础库2.16.0+支持）
    if (fontTask?.onProgressUpdate) {
      fontTask.onProgressUpdate((res) => {
        console.log(`[STATUS] 加载进度: ${res.progress}%`);
      });
    }

    this.fontTask = fontTask;
  }
});