const { Post, User } = require('../models');
const uploadImg = require('../../utils/uploadImg');

module.exports = {
  async index(req, res) {
    try {
      let posts;
      const { page = 1 } = req.query;

      if (req.query.page) {
        await Post.count().then((total) => {
          res.header('X-Total-Count', total);
        });

        posts = await Post.findAll({
          attributes: [
            'id',
            'image',
            'place',
            'description',
            'hashtags',
            'likes',
          ],
          order: [['id', 'DESC']],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'avatar'],
          }],
          limit: 5,
          offset: ((page - 1) * 5),
        });
      } else {
        posts = await Post.findAll({
          attributes: [
            'id',
            'image',
            'place',
            'description',
            'hashtags',
            'likes',
          ],
          order: [['id', 'DESC']],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'avatar'],
          }],
        });
      }

      const { id } = req.authorized_user;

      const { username, avatar } = await User.findByPk(id);

      return res.status(200).json({
        feed: posts,
        user: {
          id,
          username,
          avatar,
        },
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async create(req, res) {
    try {
      const {
        place,
        description,
        hashtags,
      } = req.body;

      const { id } = req.authorized_user;

      let fileName;
      if (req.file) {
        fileName = await uploadImg(req.file, 600, 'posts');
      } else {
        return res.status(400).json({ message: 'A imagem é obrigatória' });
      }

      const post = await Post.create({
        image: fileName,
        place,
        description,
        hashtags,
        user_id: id,
      });

      const newPost = await Post.findByPk(post.id, {
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar'],
        }],
      });

      req.io.emit('post', newPost);

      return res.status(201).send({ message: 'Post criado' });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async show(req, res) {
    try {
      const { postID } = req.params;
      const { id } = req.authorized_user;

      const post = await Post.findByPk(postID);

      if (!post) {
        return res.status(400).json({ error: 'Post não existe' });
      }
      if (post.user_id !== id) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      return res.status(200).json({
        image: post.image,
        place: post.place,
        description: post.description,
        hashtags: post.hashtags,
      });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async update(req, res) {
    try {
      const {
        place,
        description,
        hashtags,
      } = req.body;

      const { postID } = req.params;
      const { id } = req.authorized_user;

      const post = await Post.findByPk(postID);

      if (!post) {
        return res.status(400).json({ error: 'Post não existe' });
      }
      if (post.user_id !== id) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      if (post.place !== place) {
        post.place = place;
      }
      if (post.description !== description) {
        post.description = description;
      }
      if (post.hashtags !== hashtags) {
        post.hashtags = hashtags;
      }

      await post.save();

      return res.status(200).json({ message: 'Post atualizado' });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async delete(req, res) {
    try {
      const { postID } = req.params;
      const { id } = req.authorized_user;

      const post = await Post.findByPk(postID);

      if (!post) {
        return res.status(400).json({ error: 'Post não existe' });
      }
      if (post.user_id !== id) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await post.destroy();

      return res.status(200).json({ message: 'Post deletado' });
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },
};
