const CryptoJS = require('../../utils/crypto.js');
const quotes = require('../../data/quotes.js');

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
      const decryptedAmount = CryptoJS.AES.decrypt(record.amount, 'your-secret-key').toString(CryptoJS.enc.Utf8);
      expenses += parseFloat(decryptedAmount);
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