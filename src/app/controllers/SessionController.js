const { User } = require('../models');
const hashPwd = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async create(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          message: 'Usuário não existe',
        });
      }

      const pwdMatch = await hashPwd.compare(password, user.password);

      if (!pwdMatch) {
        return res.status(401).json({
          message: 'Senha incorreta',
        });
      }

      const token = await generateToken(user.id);

      return res.status(200).json({
        user: {
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },
};
