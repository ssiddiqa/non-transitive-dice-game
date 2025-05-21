const crypto = require('crypto');
const key = Buffer.from('CC64C6E1258FF51F9C651E2B1F9CCC22E806821D2114589FB15C5312F41F3063', 'hex');
const hmac = crypto.createHmac('sha3-256', key).update('0').digest('hex').toUpperCase();
console.log(hmac); 