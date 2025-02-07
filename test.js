const crypto = require('crypto');

const data = 'Hello, World!';
const hash = crypto.createHash('md5').update(data).digest('hex');

console.log('MD5 Hash:', hash);