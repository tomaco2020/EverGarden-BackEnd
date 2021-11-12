//archivo especifico para que maneje los endpoints de usuarios
const express = require('express')
const usersController = require('../controllers/usersController')
const validator = require ('express-joi-validation').createValidator()
const usersValidation = require ('../validations/usersValidations')
const checkToken = require ('../checkToken')

const routes = (User)=>{
    const userRouter = express.Router()
    const controller = usersController(User)

    userRouter.route('/admin/users')
      .get(checkToken,
        validator.query(usersValidation.usersValidationQuery), 
        controller.getUsers
      ) 
      .post(checkToken,
        validator.body(usersValidation.usersValidationBody), 
        controller.postUser
      )

    userRouter.route('/admin/users/:userId')
      .get(checkToken,
        validator.params(usersValidation.usersValidationParams), 
        controller.getUserById
      )
      .put(checkToken,
        validator.params(usersValidation.usersValidationParams), 
        validator.body(usersValidation.usersValidationPut), 
        controller.putUser
      )
      .delete(checkToken,
        validator.params(usersValidation.usersValidationParams), 
        controller.deleteUser
      )
        
    userRouter.route('/admin/users/login')
      .post(
        validator.body(usersValidation.usersValidationLogin),
        controller.postUserLogin
      )
     
  //salida de la funcion de rutas
  return userRouter
}

//exporto la funcion para poder convocarla
module.exports = routes