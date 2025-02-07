try {
  const CryptoJS = require('../../utils/crypto-js.js');
  console.log('CryptoJS loaded:', CryptoJS);
} catch (e) {
  console.error('Load error:', e);
}

const quotes = require('../../data/quotes.js');
const CryptoJS = require('../../utils/crypto-js.js');

Page({
  data: {
    records: []
  },
  onLoad: function () {
    const records = wx.getStorageSync('records') || [];
    this.setData({ records });
  },
  onSubmit: function (e) {
    const { amount, description } = e.detail.value;

    // 数据验证
    if (!amount || !description) {
      wx.showToast({
        title: '金额和描述不能为空',
        icon: 'none'
      });
      return;
    }

    try {
      // 加密操作
      const encryptedAmount = CryptoJS.AES.encrypt(amount, 'your-secret-key').toString();
      const newRecord = {
        amount: encryptedAmount,
        description,
        date: new Date().toLocaleDateString()
      };
      const records = this.data.records;
      records.push(newRecord);
      wx.setStorageSync('records', records);
      const quote = quotes.find(item => item.scene === '记账完成').text;
      wx.showToast({
        title: quote,
        icon: 'none'
      });
    } catch (error) {
      wx.showToast({
        title: '加密失败，请重试',
        icon: 'none'
      });
      console.error('加密失败:', error);
    }
  }
})