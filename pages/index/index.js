const quotes = require('../../data/quotes.js');

Page({
  data: {
    loadingPercent: 0,
    quote: ''
  },
  onLoad: function () {
    // 延迟 2 秒后跳转到主页
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/home/home',  // 替换成实际的主页路径
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
      } else {
        wx.switchTab({
          url: '/pages/record/record'
        });
      }
    };
    setTimeout(updateLoading, 500);
  }
})