const quotes = require('../../data/quotes.js');

Page({
  data: {
    loadingPercent: 0,
    quote: ''
  },
  onLoad: function () {
    // 延迟 2 秒后跳转到登录页
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/login/login',  // 跳转到登录页
        fail: function (err) {
          console.error('跳转失败:', err);
        }
      });
    }, 2000);
    const quote = quotes.find(item => item.scene === '启动加载').text;
    this.setData({ quote });
    let percent = 0;
    const updateLoading = () => {
      percent += 10;
      this.setData({
        loadingPercent: percent
      });
      if (percent < 100) {
        setTimeout(updateLoading, 500);
      }
    };
    setTimeout(updateLoading, 500);
  }
})