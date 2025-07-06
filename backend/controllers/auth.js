//core module
const User = require("../models/user");

const register = async (req , res ) => {
  try {
    const { name , email , password } = req.body ;
    
    //check is user already exists
    const existingUser = await User.findOne({email}) ;
    if(existingUser) {
      return res.status(400).json({msg : 'user already exists'}) ;
    }

    const user = await User.create({name , email , password}) ;

    const token = user.createJWT() ;

    //send a response
    res.status(201).json({
      msg : 'user registered successfully' ,
      user : {
        id : user._id ,
        name : user.name ,
        email : user.email ,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({msg : "server error" , error : error.message }) ;
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "please provide email and password" });
    }


    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ msg: "invalid credentials" });
    }

    const isMatch = await user.comparePasswords(password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    //token
    const token = user.createJWT() ;

    res.status(200).json({
      msg : 'login successfull' ,
      user :{
        id : user._id ,
        name : user.name ,
        email : user.email
      },
      token ,
    });
  } catch (error) {
    console.log(error) ;
    res.status(500).json({ msg: "oops ! , try again after some time" });
  }
};

module.exports = { register, login };
