//core module
const express = require('express') ;
const router = express.Router() ;

//local module
const {register , login} = require('../controllers/auth') ;
const authMiddleware = require('../middleware/auth');

router.post('/register' , register) ;
router.post('/login' , login) ;

//protected route example
router.get('/protected' , authMiddleware , (req , res) => {
  res.status(200).json({msg : "Access granted" , user : req.user}) ;
})

module.exports = router ;

