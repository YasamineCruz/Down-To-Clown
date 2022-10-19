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
        len: {
          args: [1,60],
          msg: "Name must be 60 characters or less"
        }
      }
    },
    about: {
      type:  DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [50, 500],
          msg: "About must be 50 characters and less than 501"
        },
      }
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false,
      validate: {
        checkType(val){
          if(val !== "Online" && val !== "In person"){
            throw new Error("Type must be 'Online' or 'In person'")
          }
        }
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        onlyBooleans(value) {
          let val = value.toString();
          if(val !== "true" && val !== "false"){
            throw new Error("Private must be a boolean")
          }
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "City is required"
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "State is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};