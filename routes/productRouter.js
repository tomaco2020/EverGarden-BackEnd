const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const productsController = require('../controllers/productsController.js')
const productsValidation = require ('../validations/productsValidations')
const checkToken = require ('../checkToken')

const routes = (Product) => {
  const productRouter = express.Router()
  const controller = productsController(Product)

  productRouter.route('/admin/products')
    .get (checkToken,validator.query(productsValidation.productsValidationQuery),controller.getProducts)    
    .post (checkToken,validator.body(productsValidation.productsValidationBody),controller.postProducts) 

  productRouter.route('/admin/products/:productId')
  .get(checkToken,validator.params(productsValidation.productsValidationParams),controller.getProductById)
  .put(checkToken,validator.params(productsValidation.productsValidationParams),validator.body(productsValidation.productsValidationPut),controller.putProductById)
  .delete(checkToken,validator.params(productsValidation.productsValidationParams), controller.deleteProductById)

  productRouter.route('/products')
    .get (validator.query(productsValidation.productsValidationQuery),controller.getProducts)    
  return productRouter
}

module.exports = routes