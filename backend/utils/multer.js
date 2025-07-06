const multer = require('multer') ;
const path = require('path') ;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/image')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) ;
    cb(null, file.fieldname + '-' + uniqueSuffix + ext) ;
  }
})

const fileFilter = (req , file , cb) => {
  const allowedTypes = ['image/jpeg' , 'image/png' , 'image/jpg'] ;

  if(allowedTypes.includes(file.mimetype)) {
    cb(null , true) ;
  }else{
    cb(new Error('only JPEG , JPG , PNG are allowed') , false) ;
  }
}

const upload = multer({
  storage ,
  fileFilter ,
  limits : { fileSize : 100 * 1024 * 1024}
}) ;

module.exports = upload ;