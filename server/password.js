const crypto = require('crypto');

const secret = Buffer.from('a82daeb6add4543d2f683ea9ddda2de8', 'hex');
const iv = Buffer.from('45a6536a8d48006f082d42950cb74f86', 'hex');
const method = 'aes-128-gcm';

const decipher = crypto.createDecipheriv(method, secret, iv);

const passwordHash = Buffer('ff305507', 'hex');
const password = decipher.update(passwordHash).toString();

module.exports = {
    password,
};
