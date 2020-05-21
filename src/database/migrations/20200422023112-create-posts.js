
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    place: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hashtags: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('posts'),
};
