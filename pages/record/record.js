const CryptoJS = require('../../utils/crypto-js.js');
const quotes = require('../../data/quotes.js');

Page({
  data: {
    formValid: false,
    amountValid: false,
    descValid: false
  },

  validateAmount(e) {
    const value = e.detail.value;
    const valid = /^\d+(\.\d{1,2})?$/.test(value);
    this.setData({ amountValid: valid });
    this._checkForm();
  },

  validateDescription(e) {
    const valid = e.detail.value.trim().length >= 2;
    this.setData({ descValid: valid });
    this._checkForm();
  },

  _checkForm() {
    this.setData({
      formValid: this.data.amountValid && this.data.descValid
    });
  },

  onSubmit(e) {
    const { amount, description } = e.detail.value;
    
    try {
      const encrypted = CryptoJS.AES.encrypt(
        amount, 
        '薪火簿2023', 
        { mode: CryptoJS.mode.CFB }
      ).toString();

      this._saveRecord({
        amount: encrypted,
        description: description.trim(),
        timestamp: new Date().getTime()
      });

      this._showSuccessFeedback();
    } catch (error) {
      this._handleEncryptError(error);
    }
  },

  _saveRecord(record) {
    const records = wx.getStorageSync('records') || [];
    records.push(record);
    wx.setStorageSync('records', records);
  },

  _showSuccessFeedback() {
    const quote = quotes.find(item => item.scene === '记账完成').text;
    wx.showToast({
      title: quote || '记录成功！',
      icon: 'none',
      duration: 2000
    });
    setTimeout(() => wx.navigateBack(), 1500);
  },

  _handleEncryptError(error) {
    console.error('加密失败:', error);
    wx.showToast({
      title: '数据加密失败，请重试',
      icon: 'none',
      duration: 2000
    });
  }
});