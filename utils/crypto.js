// utils/crypto.js
const CryptoJS = require('crypto-js');

// 这里可以定义一些加密相关的函数
function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

function decryptData(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encryptData,
    decryptData
};