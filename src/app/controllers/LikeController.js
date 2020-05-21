const { Post, User } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { postID } = req.params;

      const post = await Post.findByPk(postID, {
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar'],
        }],
      });

      if (!post) {
        return res.status(400).json({
          message: 'Post não existe',
        });
      }

      post.likes += 1;

      await post.save();

      req.io.emit('like', post);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },

  async delete(req, res) {
    try {
      const { postID } = req.params;

      const post = await Post.findByPk(postID, {
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar'],
        }],
      });

      if (!post) {
        return res.status(400).json({
          message: 'Post não existe',
        });
      }

      if (post.likes > 0) {
        post.likes -= 1;

        await post.save();
      }

      req.io.emit('like', post);

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(`${error}`);
    }
  },
};
