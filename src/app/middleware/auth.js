require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Não autorizado',
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  } else {
    return res.status(401).json({ message: 'Token inválido' });
  }

  try {
    const publicKey = fs.readFileSync('./public.pem', 'utf8');

    const verified = jwt.verify(
      token,
      publicKey,
      { algorithms: ['RS256'] },
    );

    req.authorized_user = verified.authorized_user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
