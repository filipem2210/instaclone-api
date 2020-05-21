const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    username: DataType.STRING,
    name: DataType.STRING,
    email: DataType.STRING,
    password: DataType.STRING,
    avatar: DataType.STRING,
  });

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(user.password, salt);

    user.set('password', hashPwd);
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { as: 'posts' });
  };

  return User;
};
