const CryptoJS = require('../../utils/crypto.js');

Page({
  data: {
    withdrawRecords: []
  },
  onLoad: function () {
    const records = wx.getStorageSync('withdrawRecords') || [];
    const decryptedRecords = records.map(record => {
      try {
        const decryptedAmount = CryptoJS.AES.decrypt(record.amount, 'your-secret-key').toString(CryptoJS.enc.Utf8);
        return {
          ...record,
          amount: decryptedAmount
        };
      } catch (error) {
        console.error('解密失败:', error);
        return record;
      }
    });
    this.setData({ withdrawRecords: decryptedRecords });
  }
})