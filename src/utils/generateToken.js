require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = (id) => {
  const payload = {
    authorized_user: {
      id,
    },
  };

  const privateKey = fs.readFileSync('./private.pem');

  const token = jwt.sign(
    payload,
    {
      key: privateKey,
      passphrase: process.env.SECRET_KEY,
    },
    {
      expiresIn: '7d',
      algorithm: 'RS256',
    },
  );

  return token;
};
