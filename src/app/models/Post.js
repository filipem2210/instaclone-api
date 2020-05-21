module.exports = (sequelize, DataType) => {
  const Post = sequelize.define('Post', {
    image: DataType.STRING,
    place: DataType.STRING,
    description: DataType.STRING,
    hashtags: DataType.STRING,
    likes: DataType.STRING,
    user_id: DataType.INTEGER,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Post;
};
