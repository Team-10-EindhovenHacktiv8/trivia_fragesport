'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First name required"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Last name required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email has already registered"
      },
      validate: {
        notEmpty: {
          msg: "Email required"
        }
        // isUnique(email, next) {
        //   User.findOne({
        //     where: {
        //       email: email
        //     }
        //   })
        //     .then(data => {
        //       // console.log({ data })
        //       if (data) {
        //         next('Email address already in use!'); 
        //       } else {
        //         next()
        //       }
        //     })
        //     .catch(err => {
        //       next(err)
        //     })
        // }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};