'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venue.hasMany(
        models.Event,
        { foreignKey: 'venueId' }
      )
      Venue.belongsTo(
        models.Group,
        { foreignKey: 'groupId' }
      )
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: "Street address is required"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: "City is required"
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,200],
          msg: "State is required"
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Latitude is not valid"
        }   
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Longitude is not valid"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};