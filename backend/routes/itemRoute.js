const express = require("express");
const router = express.Router();
const {
  getFilteredItems,
  createItem,
  getSingleItem,
  getUserItems,
  deleteItem,
  updateItem,
  getItemsBasedOnQuery,
} = require("../controllers/itemController");
const authMiddleware = require("../middleware/auth");
const upload = require("../utils/multer");


//get all the items based on query
router.get("/getItems",authMiddleware , getFilteredItems);

//get items based on query
router.get("/getitemsonsearch" , getItemsBasedOnQuery) ;

//post the item
router.post("/postItem",upload.single('image') , authMiddleware ,  createItem); //only logged in users can post

//get user item
router.get('/myItems' , authMiddleware , getUserItems ) ;

//delete the item
router.delete('/deleteItem/:id' , authMiddleware , deleteItem) ;


router.put('/updateItem/:id' , upload.single('image') , authMiddleware , updateItem) ;

//get single item by id
router.get("/:id",getSingleItem);     //dynamic route last

module.exports = router;
