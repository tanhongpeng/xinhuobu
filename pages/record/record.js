const quotes = require('../../data/quotes.js');
const CryptoJS = require('../../utils/crypto.js');

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
  }
})