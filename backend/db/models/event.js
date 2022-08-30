'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Venues',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};