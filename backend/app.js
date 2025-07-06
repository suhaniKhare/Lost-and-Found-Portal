//core module
require('dotenv').config() ;
const express = require('express') ;
const cors  = require('cors') ;
const app = express() ;

//local module
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth') ;
const itemRoutes = require('./routes/itemRoute') ;

//middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL // deployed React site
  ],
  credentials: true,
}));

app.use(express.json()) ;
app.use(express.static('public')) ; //serve static files from the 'public' directory

app.use("/api/v1/auth" , authRoutes) ;
app.use("/api/v1/items" , itemRoutes) ;


const PORT = process.env.PORT || 3001 ;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) ;
    app.listen(PORT , () => {console.log(`server is running at port ${PORT}`)}) ;
  } catch (error) {
    console.log(error) ;
  }
}

start() ;

