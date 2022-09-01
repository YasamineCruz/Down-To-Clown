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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    status: {
      type: DataTypes.ENUM('member', 'pending', 'co-host', 'organizer'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};