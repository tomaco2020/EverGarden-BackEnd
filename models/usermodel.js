const mongoose = require("mongoose")

// la clase moongoose se extrae el schema
const {Schema} =  mongoose

// creo un objeto a partir de la clase schema
const userModel = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String , required: true},
    userName: {type: String}, // lo creamos nosotros
    password: {type: String , required: true},
    email: {type: String , required: true},
    type: {type: String} // admin o visita
},
{
  collection: 'users'
})

module.exports = mongoose.model( "User", userModel)