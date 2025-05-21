const crypto = require('crypto');
const { keccak_256 } = require('js-sha3');

class SecureRandom {
  generateKey() {
    return crypto.randomBytes(32); 
  }

  generateUniformInt(range) {
    const max = Math.floor(0xFFFFFFFF / range) * range;
    let value;
    do {
      const bytes = crypto.randomBytes(4);
      value = bytes.readUInt32BE(0);
    } while (value >= max);
    return value % range;
  }

  computeHMAC(key, message) {
    const hmac = crypto.createHmac('sha3-256', key);
    hmac.update(message.toString());
    return hmac.digest('hex').toUpperCase();
  }
}

module.exports = SecureRandom;