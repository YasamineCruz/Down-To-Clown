'use strict';
const { Venue, Group } = require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
 

    static associate(models) {
      Event.hasMany(
        models.EventImage,
        { foreignKey: 'eventId' }
      )
      Event.belongsToMany(
        models.User,
        { through: models.Attendance, foreignKey: 'eventId', otherKey: 'userId'}
      )
      Event.belongsTo(
        models.Venue,
        { foreignKey: 'venueId'}
      )
      Event.belongsTo(
        models.Group,
        { foreignKey: 'groupId'}
      )
    }
  }
  Event.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Venues',
        key: 'id'
      },
      onDelete: 'cascade',
      validate: {
        isInt: {
          args: true,
          msg: "Venue does not exist"
        },
      }
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,200],
          msg: "Name must be at least 5 characters"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 500],
          msg: "Description is required"
        }
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Capacity must be an integer"
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: "Price is invalid"
        }
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isInFuture(start){
      //     let now = new Date()
      //     if(start < now){
      //       throw new Error("Start date must be in the future")
      //     }
      //   }
      // }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      // laterThenStartDate(end){
      //   if(end < this.startDate){
      //     throw new Error("End date is less than start date")
      //   }
      //   }
      // }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};