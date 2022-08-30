'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(
        models.User, 
        { foreignKey: 'userId'}
      )
      Membership.belongsTo(
        models.Group,
        { foreignKey: 'groupId'}
      )
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      },
    },
    status: {
      type: DataTypes.ENUM('member', 'pending', 'co-host'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};