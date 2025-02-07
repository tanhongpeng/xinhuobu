const CryptoJS = require('../../utils/crypto.js');
const quotes = require('../../data/quotes.js');

// 提取验证预算输入的函数
function validateBudgetInput(value) {
  const budget = parseInt(value);
  return!isNaN(budget) && budget >= 0;
}

Page({
  data: {
    budget: 0,
    expenses: 0,
    isOverBudget: false,
    warningQuote: ''
  },
  onBudgetInput: function (e) {
    const value = e.detail.value;
    if (validateBudgetInput(value)) {
      const budget = parseInt(value);
      this.setData({ budget });
      this.checkBudget();
    } else {
      wx.showToast({
        title: '请输入有效的预算值',
        icon: 'none'
      });
    }
  },
  onLoad: function () {
    wx.getStorage({
      key: 'records',
      success: (res) => {
        const records = res.data || [];
        let expenses = 0;
        records.forEach(record => {
          try {
            const decryptedAmount = CryptoJS.AES.decrypt(record.amount, 'your-secret-key').toString(CryptoJS.enc.Utf8);
            expenses += parseFloat(decryptedAmount);
          } catch (error) {
            console.error('解密失败:', error);
          }
        });
        this.setData({ expenses });
        this.checkBudget();
      },
      fail: (error) => {
        console.error('获取存储数据失败:', error);
      }
    });
  }
})