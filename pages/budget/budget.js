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
  const inputValue = e.detail.value;
  // 验证输入是否为数字
  if (/^\d+$/.test(inputValue)) {
    const budget = parseInt(inputValue);
    this.setData({ budget });
    this.checkBudget();
  } else {
    wx.showToast({
      title: '请输入有效的数字',
      icon: 'none'
    });
  }
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
      // 添加用户提示
      wx.showToast({
        title: '解密记录金额失败，请检查数据',
        icon: 'none'
      });
    }
  });
  this.setData({ expenses });
  this.checkBudget();
},

checkBudget: function () {
  // 获取预算和支出数据
  const { budget, expenses } = this.data;
  // 判断是否超预算
  const isOverBudget = expenses > budget;
  // 根据是否超预算获取相应的提示语
  const warningQuote = isOverBudget ? quotes.find(item => item.scene === '预算超支').text : '';
  // 更新页面数据
  this.setData({
    isOverBudget,
    warningQuote
  });
}
})