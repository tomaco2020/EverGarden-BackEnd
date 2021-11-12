// llamo al framework previa instalacion con npm express
const express = require('express')

//convoco a la base de datos
const mongoose = require('mongoose')
const Product = require('./models/productModel.js')
const User = require('./models/userModel.js')
const productRouter = require('./routes/productRouter.js')(Product) // con estos parentesis ejecuto la funcion que viene del require
const userRouter = require('./routes/userRouter.js')(User)
const jwt = require('express-jwt')
const cors = require('cors')

//ejecuto express como si fuera una funcion
const app = express()
const bodyParser = require('body-parser')

app.use(cors())
app.get('api/users/:id', function(req,res,next){
  res.json({msg:'this is cors-enabled for all origins'})
})

app.listen(8082, function(){
  console.log('cors-enabled web server listening on port 8082')
})
//estas dos lineas me permiten formatear de cierta manera lo que envio
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.all('/api/admin/', jwt( {secret:'EverGarden2021', algorithms:['HS256'] } ).unless({path: ['/api/admin/users/login']})) 
app.use('/api', productRouter)
app.use('/api', userRouter)

//me conecto a mongo
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/MyAPI")
  } catch (error){
    throw error
  }
}
connectDB() 

const port = 8080
//escucho el puerto localhost 8080
app.listen(port, ()=> {
  console.log(`server started on port : ${port}`)
})


