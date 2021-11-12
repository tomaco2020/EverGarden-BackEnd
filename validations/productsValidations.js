const Joi = require ('joi')

const productsValidationBody = Joi.object({
    product: Joi.string().required(),
    brand : Joi.string().required(),
    category :Joi.string().required(),
    description: Joi.string().required(),
    dimensions: Joi.string().required(),
    use: Joi.string().required(),
    photo_url: Joi.string().required(),
    price: Joi.number()
})

const productsValidationQuery = Joi.object({
    product: Joi.string(),
    brand : Joi.string(),
    category :Joi.string(),
    description: Joi.string(),
    dimensions: Joi.string(),
    use: Joi.string(),
    photo_url: Joi.string(),
    price: Joi.number()
})

const productsValidationParams = Joi.object({
  productId: Joi.string().length(24).required()
})

const productsValidationPut = Joi.object({
    product: Joi.string().required(),
    brand : Joi.string().required(),
    category :Joi.string().required(),
    description: Joi.string().required(),
    dimensions: Joi.string().required(),
    use: Joi.string().required(),
    photo_url: Joi.string().required(),
    price: Joi.number()
})

module.exports = {productsValidationBody, productsValidationQuery, productsValidationParams, productsValidationPut}