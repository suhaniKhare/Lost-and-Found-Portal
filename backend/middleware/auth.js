//core module
const jwt = require('jsonwebtoken') ;

const authMiddleware = (req , res , next) => {
  
  const authHeader = req.headers.authorization ;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({msg : 'authorization header missing'}) ;
  }

  const token = authHeader.split(" ")[1] ;

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
    req.user = {id : decoded.id  , email : decoded.email};
    next() ;
  } catch (error) {
    console.error(error.message) ;
    return res.status(401).json({msg : 'invalid token'}) ;
  }
}

module.exports = authMiddleware ;
