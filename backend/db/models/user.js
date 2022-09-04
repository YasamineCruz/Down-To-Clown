'use strict';
const { Model, Validator } = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this;
      return { id, firstName, lastName, username, email };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };

    static async login({ credential, password}) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
          username: credential,
          email: credential
          }
        }
      });
      if(user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      };
    };

    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
   



    static associate(models) {
      User.belongsToMany(
        models.Event, 
        { through: models.Attendance, foreignKey: 'userId', otherKey: 'eventId' }
      )
      User.hasMany(
        models.Group,
        { foreignKey: 'organizerId' }
      )
     User.belongsToMany(
       models.Group,
       { through: models.Membership, foreignKey: 'userId', otherKey: 'groupId' }
     )
     };

    };
    User.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 30],
            msg: "First Name is required"
          },
          isNotEmail(value) {
            if(Validator.isEmail(value)) {
              throw new Error('Cannot be an email')
            }
          },
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 30],
            msg: "Last Name is required"
          },
          isNotEmail(value) {
            if(Validator.isEmail(value)) {
              throw new Error('Cannot be an email')
            }
          },
          notEmpty: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if(Validator.isEmail(value)) {
              throw new Error('Cannot be an email')
            }
          },
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "User with that email already exists"
        },
        validate: {
          len: [3, 256],
          isEmail: {
            args: true,
            msg: "Invalid email"
          },
          notEmpty: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
          notEmpty: true 
        }
      },
    }, 
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};