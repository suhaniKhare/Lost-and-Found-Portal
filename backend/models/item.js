const mongoose = require('mongoose') ;

const itemSchema = new  mongoose.Schema(
  {
    title : {
      type : String ,
      required : true ,
      trim : true ,
    },
    description : {
      type : String ,
      required : [true , 'Description is required'] ,
    } ,
    type : {
      type : String ,
      enum : ['lost' , 'found'] ,
      required : [true , 'item type is required'] ,
    },
    // locationGeo:{
    //   type:{
    //     type: String ,
    //     enum:['Point'] ,
    //     required: true ,
    //   } ,
    //   coordinates:{
    //     type: [Number] ,   //lng , lat
    //     required : true ,
    //   },
    // },
    date : {
      type : Date ,
      default : Date.now,
    },
    imageUrl : {
      type : String ,
      required : true ,
    },
    createdBy : {
      type : mongoose.Schema.Types.ObjectId ,
      ref : 'User' ,
      required : true ,
    }
  } ,
  {timestamps : true} ,
) ;

itemSchema.index({ locationGeo : '2dsphere'}) ;

module.exports = mongoose.model('Item' , itemSchema) ;

