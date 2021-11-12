 const jwt = require ('jsonwebtoken');
//const User = require ('./models/usermodel')

const checkToken = async (req, res, next) =>{
    try{
    const token = req.headers.authorization.split(' ')[1];


    if (!token) {
        return res.status(403).json({message:'No token'})}
 
        const decoded = jwt.verify(token, 'EverGarden2021')
    
        next()
    }
    catch(error){
        return res.status(401).json({message: error})
    }
}

module.exports = checkToken 