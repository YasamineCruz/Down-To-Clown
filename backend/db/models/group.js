'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      Group.hasMany(
        models.Event,
        { foreignKey: 'groupId'}
      )
      Group.belongsTo(
        models.User,
        { foreignKey: 'organizerId'}
      )
      Group.hasMany(
        models.GroupImage,
        { foreignKey: 'groupId'}
      )
      Group.belongsToMany(
        models.User,
        { through: models.Membership, foreignKey: 'groupId', otherKey: 'userId'}
      )
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type:  DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};