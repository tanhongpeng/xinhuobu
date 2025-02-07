// utils/crypto.js
const CryptoJS = require('crypto-js');

// 加密数据
// @param {string} data - 要加密的数据
// @param {string} key - 加密密钥
// @returns {string} - 加密后的字符串
function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

// 解密数据
// @param {string} ciphertext - 要解密的密文
// @param {string} key - 解密密钥
// @returns {string} - 解密后的字符串
function decryptData(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encryptData,
  decryptData
};