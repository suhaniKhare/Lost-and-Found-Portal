//local module
const Item = require("../models/item");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");

const createItem = async (req, res) => {
  try {
    const { title, description, type,  } = req.body;
    const file = req.file;

    if (!title || !description ||  !type) {
      return res.status(400).json({ msg: "please fill all fields" });
    }

    if (!file) {
      return res.status(400).json({ msg: "image field is required" });
    }

    console.log(file);
    const localFilePath = file.path;

    //upload that on cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
      folder: "images",
      use_filename: true,
      unique_filename: false,
    });

    console.log(cloudinaryResult);

    //delete the file from the local path
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted successfully");
      }
    });

    console.log("file deleted");

    // const locationGeo =
    //   lat && lng
    //     ? {
    //         type: "Point",
    //         coordinates: [parseFloat(lng), parseFloat(lat)],
    //       }
    //     : undefined;

    const item = await Item.create({
      title,
      description,
      // location,
      type,
      createdBy: req.user.id,
      imageUrl: cloudinaryResult.secure_url,
      // locationGeo,
    });
    res.status(201).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

const getFilteredItems = async (req, res) => {
  try {
    const { type } = req.query; //type = lost or found

    const allowedTypes = ["lost", "found"];
    let query = {};

    if (type && allowedTypes.includes(type.toLowerCase())) {
      query.type = type.toLowerCase();
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ msg: "unable to fetch items " });
  }
};

const getItemsBasedOnQuery = async ( req , res ) => {
  try {
    const { keyword } = req.query ;
    let query = {} ;

    if(keyword && keyword.trim() !== ""){
      const regex = new RegExp(keyword , 'i') ; //case insensitive 
      query.$or = [
        {title : regex } ,
        {description : regex }
      ]
    }

    const items = await Item.find(query) ;
    res.status(200).json({items}) ;

  } catch (error) {
    console.log("cannot fetch items based on query");
    res.status(500).json({message:"Internal server error"}) ;
  }
}

const getSingleItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "could not get single item" });
  }
};

const getUserItems = async (req, res) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id; // populated from auth middleware
    const items = await Item.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Could not fetch user items" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const userId = req.user.id;

    const item = await Item.findById(itemId);

    console.log(item);
    if (!item) {
      return res.status(404).json({ msg: "item not found" });
    }
    if (item.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "you are not allowed to delete the item " });
    }
    if (item.cloudinaryId) {
      await cloudinary.uploader.destroy(item.cloudinaryId);
    }
    await item.deleteOne();
    res.status(200).json({ msg: "Deleted successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "could not delete item " });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id: itemId } = req.params;
    const userId = req.user.id;
    const file = req.file;

    const item = await Item.findById(itemId);

    if (!item) {
      res.status(404).json({ msg: "item not found" });
    }

    if (item.createdBy.toString() !== userId) {
      res.status(403).json({ msg: "you are not allowed to update this item" });
    }

    //update basic feilds

    const { title, description, location, type, lat, lng } = req.body;

    if (title) item.title = title;

    if (description) item.description = description;

    if (location) item.location = location;

    if (type) item.type = type;

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);

      if (!isFinite(parsedLat || !isFinite(parsedLng))) {
        return res.status(400).json({ msg: "invalid latitude or longitude" });
      }

      item.locationGeo = {
        type: "Point",
        coordinates: [parsedLng, parsedLat],
      };
    }

    if (file) {
      if (item.cloudinaryId) {
        await cloudinary.uploader.destroy(item.cloudinaryId);
      }

      //upload new image to the cloudinary

      const localFilePath = req.file.path;

      const cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: "image",
        use_filename: true,
        unique_filename: true,
      });

      item.imageUrl = cloudinaryResult.secure_url;
      item.cloudinaryId = cloudinaryResult.public_id;

      //delete the file from the local server

      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted successfully");
        }
      });
    }

    await item.save();

    res.status(200).json({ msg: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "could not update the item , please try again later " });
  }
};

const searchNearByItem = async (req, res) => {
  try {
    const { lat, lng, type } = req.query;

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (!isFinite(parsedLat) || !isFinite(parsedLng)) {
      return res.status(403).json({ msg: "Invalid lat/lng" });
    }

    const query = {
      locationGeo: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLng, parsedLat],
          },
          $maxDistance: 2000,
        },
      },
    };

    if(type) {
      query.type = type ;
    }

    const items = await Item.find(query) ;

    res.status(200).json({ items }) ;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while searching nearby items" });
  }
};

module.exports = {
  createItem,
  getFilteredItems,
  getSingleItem,
  getUserItems,
  deleteItem,
  updateItem,
  searchNearByItem ,
  getItemsBasedOnQuery
};
