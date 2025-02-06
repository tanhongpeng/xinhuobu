const quotes = require('../../data/quotes.js');

Page({
  data: {
    loadingPercent: 0,
    quote: ''
  },
  onLoad: function () {
    const that = this;
    const quote = quotes.find(item => item.scene === '启动加载').text;
    this.setData({ quote });
    const loadingInterval = setInterval(() => {
      let percent = that.data.loadingPercent;
      percent += 10;
      that.setData({
        loadingPercent: percent
      });
      if (percent >= 100) {
        clearInterval(loadingInterval);
        wx.switchTab({
          url: '/pages/record/record'
        });
      }
    }, 500);
  }
})