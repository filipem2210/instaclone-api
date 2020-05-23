const { User } = require('../models');
const uploadImg = require('../../utils/uploadImg');
const generateToken = require('../../utils/generateToken');
// const sendEmail = require('../../utils/sendEmail');

module.exports = {
  async create(req, res) {
    try {
      const {
        username,
        name,
        email,
        password,
      } = req.body;

      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          message: 'Usuário já existe',
        });
      }

      let fileName = 'avatar.jpg';
      if (req.file) {
        fileName = await uploadImg(req.file, 150, 'avatar');
      }

      const user = await User.create({
        username,
        name,
        email,
        password,
        avatar: fileName,
      });

      const token = await generateToken(user.id);

      // sendEmail(email);

      return res.status(201).json({
        user: {
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: fileName,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.authorized_user;

      const {
        avatar,
        username,
        name,
        email,
      } = await User.findByPk(id);

      return res.status(200).json({
        avatar,
        username,
        name,
        email,
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async update(req, res) {
    try {
      const {
        username,
        name,
        email,
      } = req.body;

      const { id } = req.authorized_user;

      const user = await User.findByPk(id);

      if (user.username !== username) {
        user.username = username;
      }
      if (user.name !== name) {
        user.name = name;
      }

      if (req.file) {
        user.avatar = await uploadImg(req.file, 150, 'avatar');
      }

      if (user.email !== email) {
        const registeredEmail = await User.findOne({ where: { email } });

        if (registeredEmail) {
          return res.status(400).json({
            message: 'Email em uso',
          });
        }

        user.email = email;
      }

      await user.save();

      return res.status(200).json({
        message: 'Perfil alterado',
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },
};
