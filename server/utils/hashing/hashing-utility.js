const crypto = require('crypto');

const generateSalt = ({ length = 16 }) => (
  crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
);

const hash = string => (salt) => {
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(string);
  const hashingResult = hmac.digest('hex');
  return {
    salt,
    hashingResult,
  };
};

module.exports = {
  generateSalt,
  hash,
};
