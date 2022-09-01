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
      Group.hasMany(
        models.Venue,
        { foreignKey: "groupId"}
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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    about: {
      type:  DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [50, 500],
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};