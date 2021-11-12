const mongoose = require("mongoose")

// la clase moongoose se extrae el schema
const {Schema} =  mongoose

// creo un objeto a partir de la clase schema
const productModel = new Schema ({
/* -producto nombre
 - marca
 - rubro/categoria (planta interior- tierra-maceta-accesorio-riego-respuesto)
 - descripcion
 - dimension/medidas/peso
 - uso : interior, exterior, media sombra, pleno sol
 - foto-url*/
    product:{type: String , required: true},
    brand : {type: String },
    category :{type: String , required: true},
    description: {type: String , required: true},
    dimensions: {type: String },
    use: {type: String , required: true},
    photo_url: {type: String , required: true},
    price: {type: Number}
},
{
  collection: 'products'
})

module.exports = mongoose.model( "Product", productModel)