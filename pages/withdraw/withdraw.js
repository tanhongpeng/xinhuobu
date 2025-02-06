const CryptoJS = require('../../utils/crypto.js');

Page({
  data: {
    withdrawRecords: []
  },
  onLoad: function () {
    const records = wx.getStorageSync('withdrawRecords') || [];
    const decryptedRecords = records.map(record => {
      const decryptedAmount = CryptoJS.AES.decrypt(record.amount, 'your-secret-key').toString(CryptoJS.enc.Utf8);
      return {
        ...record,
        amount: decryptedAmount
      };
    });
    this.setData({ withdrawRecords: decryptedRecords });
  }
})