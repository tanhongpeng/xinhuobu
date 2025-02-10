// 确保这里引用的是正确的 crypto-js 模块
const CryptoJS = require('crypto-js');

// 检查 CryptoJS 是否正确加载
if (!CryptoJS) {
  console.error('CryptoJS 加载失败');
}

module.exports = CryptoJS;