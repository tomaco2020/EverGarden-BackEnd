const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersController = (User) => {
  const getUsers = async (req,res)=> {
    try {
      const {query} = req
      //uso comando de mongo y con el find sin parametros traigo todo
      const response = await User.find(query)
      return res.json(response)
    } catch(error){
      throw error
    }
  }
    
  const postUser = async (req,res) => {
    try {
      const {body} = req

      const newUserName = () => {
        if (body.lastName && body.firstName ) { 
          //solo tomo el primer nombre o apellido ingresado
          const splitFirstName = body.firstName.split(" ")
          const splitLastName = body.lastName.split(" ")
          const newusername = splitLastName[0].toUpperCase() + "-"+ splitFirstName[0] 
          return (newusername)
        }
      }

      const foundUser = await User.findOne ({"userName": newUserName()})
      if (foundUser){
        return  res.status(400).json({message: "Existing UserName - User not inserted"});
      }
      const newpassword = await  bcrypt.hash(body.password, 10) 
      
      const userObject = 
      {
        ...body,
        userName: newUserName(),
        password: newpassword
      }
      
      const user = new User (userObject)
      await user.save()
      return res.status(201).json(user)
    } catch (err) {
      if (err.name === "ValidationError") {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message
        })
  
        return res.status(400).send(errors)
      }
      res.status(500).json({message: "Something went wrong" , err})
    }
  }
  
  const postUserLogin = async (req, res) => {
    try{
      const {body} = req
      const {userName , password} = body
      
      const foundUser = await User.findOne ({"userName": userName})
      if (foundUser ) {// && passwordValidation(foundUser, password) ) {
        const isPasswordCorrect = await  bcrypt.compare( password , foundUser.password)
        if (isPasswordCorrect) { //&& foundUser.type == 'admin') {
            return  res.status(201).json({message: 'Valid User',  token: createToken (foundUser) })
          } 
        else {
          return  res.status(400).json({message: 'Invalid Password'})
        }
      } else {
        return  res.status(400).json({message: 'Invalid User'})
      }
    } catch (error) {
      console.log('postUserLogin error:' + error)
      throw  error
    }
  }

  const createToken = (user) =>{
    const tokenUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      type: user.type
    } 
    return  jwt.sign(tokenUser, 'EverGarden2021', { expiresIn: 20 })
  }

  const getUserById = async (req,res)=> {
      try {
      const {params} = req
      const response = await User.findById(params.userId)
      if ( response && response !== null) {
        return res.json(response)
      } else {
        return res.status(404).json({message:'User not found'})
      }
    } catch(error){
      console.log(' getUserById error:' + error)
      throw error
    }
  }
  
  const putUser = async (req,res)=> {
      try {
      const {params, body} = req
      const newUserName = () => {
        if (body.lastName && body.firstName ) { 
          //solo tomo el primer nombre o apellido ingresado
          const splitFirstName = body.firstName.split(" ")
          const splitLastName = body.lastName.split(" ")
          const newusername = splitLastName[0].toUpperCase() + "-"+ splitFirstName[0] 
          return (newusername)
        }
      }
      const newpassword = await  bcrypt.hash(body.password, 10) 

      const response = await User.updateOne({
          _id: params.userId 
      }, {
          $set: {
                ...body,
                userName: newUserName(),
                password: newpassword
      }
          }
      )
      if(response && response !== null) {
        return res.status(202).json(response)
      }
      else{
        return res.status(404).json({message:'User not found'})
      }
    } catch(error){
      console.log('putUser - error', error)
      throw error
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const {params} = req
      const response = await User.findByIdAndDelete( params.userId  )
      if ( response && response !== null) {
        return res.status(202).json({message:'User Deleted'})
      } else {
        return res.status(404).json({message:'User not found'})
      }            
    } catch(error){
      console.log('deleteUser - error', error)
      throw error
    }
  }

   return {getUsers , postUser, getUserById , putUser, deleteUser , postUserLogin }
} 

module.exports = usersController