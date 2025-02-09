const CryptoJS = require('../../utils/crypto-js.js');
const quotes = require('../../data/quotes.js');

const app = getApp();
// 从全局数据中获取密钥
const SECRET_KEY = app.globalData.SECRET_KEY;

// 后续代码保持不变

Page({
  data: {
    budget: 0,
    expenses: 0,
    isOverBudget: false,
    warningQuote: ''
  },
  onBudgetInput: function (e) {
    const budget = parseInt(e.detail.value);
    this.setData({ budget });
    this.checkBudget();
  },
  onLoad: function () {
    const records = wx.getStorageSync('records') || [];
    let expenses = 0;
    records.forEach(record => {
      try {
        const decryptedAmount = CryptoJS.AES.decrypt(record.amount, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        expenses += parseFloat(decryptedAmount);
      } catch (error) {
        console.error('解密失败:', error);
        // 可以在这里添加提示用户的代码
      }
    });
    this.setData({ expenses });
    this.checkBudget();
  },
  checkBudget: function () {
    const { budget, expenses } = this.data;
    const isOverBudget = expenses > budget;
    const warningQuote = isOverBudget ? quotes.find(item => item.scene === '预算超支').text : '';
    this.setData({
      isOverBudget,
      warningQuote
    });
  }
})