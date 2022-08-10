module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );

  return Comment;
};
