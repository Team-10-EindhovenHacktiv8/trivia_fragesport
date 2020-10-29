'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } =require('../helpers/bcrypt')

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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique(email, next) {
          User.findOne({
            where: {
              email: email
            }
          })
            .then(data => {
              // console.log({ data })
              if (data) {
                next('Email address already in use!'); 
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    password: DataTypes.STRING
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