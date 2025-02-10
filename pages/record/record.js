// 引入 CryptoJS 模块
let CryptoJS;
try {
  CryptoJS = require('../../utils/crypto-js.js');
  console.log('CryptoJS loaded:', CryptoJS);
} catch (e) {
  console.error('Load error:', e);
}

// 引入 quotes 数据
const quotes = require('../../data/quotes.js');

Page({
  data: {
    records: []
  },

  // 页面加载时的生命周期函数
  onLoad: function () {
    // 从本地存储中获取记录数据，如果没有则初始化为空数组
    const records = wx.getStorageSync('records') || [];
    // 将记录数据设置到页面数据中
    this.setData({ records });
  },

  // 提交表单时的处理函数
  onSubmit: function (e) {
    // 检查 CryptoJS 是否成功引入
    if (!CryptoJS) {
      wx.showToast({
        title: 'CryptoJS 加载失败，请重试',
        icon: 'none'
      });
      return;
    }

    // 从表单数据中获取金额和描述
    const { amount, description } = e.detail.value;

    // 数据验证：检查金额和描述是否为空
    if (!amount || !description) {
      // 如果为空，显示提示信息
      wx.showToast({
        title: '金额和描述不能为空',
        icon: 'none'
      });
      return;
    }

    try {
      // 加密操作：使用 CryptoJS 对金额进行加密
      const encryptedAmount = CryptoJS.AES.encrypt(amount, 'your-secret-key').toString();
      // 创建新的记录对象
      const newRecord = {
        amount: encryptedAmount,
        description,
        date: new Date().toLocaleDateString()
      };
      // 获取页面中的记录数据
      const records = this.data.records;
      // 将新记录添加到记录数组中
      records.push(newRecord);
      // 将更新后的记录数组保存到本地存储中
      wx.setStorageSync('records', records);
      // 查找记账完成的提示语
      const quote = quotes.find(item => item.scene === '记账完成').text;
      // 显示记账完成的提示信息
      wx.showToast({
        title: quote,
        icon: 'none'
      });
    } catch (error) {
      // 加密失败时，显示错误提示信息
      wx.showToast({
        title: '加密失败，请重试',
        icon: 'none'
      });
      // 在控制台输出错误信息
      console.error('加密失败:', error);
    }
  }
})