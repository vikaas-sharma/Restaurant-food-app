const restaurantModel = require("../models/restaurantModel");
const mongoose=require("mongoose")
//CREATE RESTAURANT
const createRestaurantController=async(req,res)=>{
  try{
         const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, code, coords}=req.body;
         if(!title || !coords)
         {
            return res.status(500).send({
                success:false,
                message:'Please provide title and address',
            })
         }

         const newRestaurant = new restaurantModel({title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, code, coords});
         await newRestaurant.save();
         return res.status(201).send({
            success:true,
            message:'New Restaurant created successfully'
         })
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Create Restaurant API',
        error
    })
  }
}

const getAllRestaurantController=async(req,res)=>{
  try{
      const restaurants = await restaurantModel.find({});
      if(!restaurants)
      {
        return res.status(400).send({
          success:false,
          message:'No Restaurant Available'
        })
      }
    return res.status(200).send({
        success:true,
        totaCount:restaurants.length,
        restaurants
      })
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in GET ALL Restaurant API',
        error
    })
  }
}

const getRestaurantById = async(req,res)=>{
   try{

    const restaurant_id=req.params.id;
    //validation
    if(!restaurant_id)
    {
      return res.status(400).send({
        success:false,
        message:'Please Provide restaurant id'
      })
    }
    //find restaurant
    const restaurant = await restaurantModel.findById(restaurant_id);
    if(!restaurant)
    {
      return res.status(400).send({
        success:false,
        message:'No Restaurant Found'
      })
    }
   return  res.status(200).send({
      success:true,
      restaurant
    })
   }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in GET ALL Restaurant API',
        error
    })
   }
}

//DELETE RESTAURANT
const deleteRestaurantController = async(req,res) =>{

  try{
      //  const restaurant_id =req.params.id;
      //  mongoose.isValidObjectId(restaurant_id):
      //  This method checks if the provided restaurant_id 
      //  is a valid ObjectId. If it's not valid, the code
      //   will return an error response, preventing the query
      //    from being executed.
      // Validate the restaurant ID
    //   if (!mongoose.isValidObjectId(restaurant_id)) {
    //     return res.status(400).send({
    //         success: false,
    //         message: 'Invalid restaurant ID format',
    //     });
    // }
      //  if(!restaurant_id)
      //   {
      //     return res.status(400).send({
      //       success:false,
      //       message:'No Restaurant Found'
      //     })
      //   }

    //  await restaurantModel.findByIdAndDelete(restaurant_id);
    //  return res.status(200).send({
    //   success: true,
    //   message: "Restaurant Deleted Successfully"
    //  })
    
    const restaurant_id = req.params.id;

        // Validate the restaurant ID
        if (!mongoose.isValidObjectId(restaurant_id)) {
            return res.status(400).send({
                success: false,
                message: `Invalid restaurant ID format: ${restaurant_id}. Expected a valid 24-character ObjectId.`,
            });
        }

        // Find and delete restaurant
        const deletedRestaurant = await restaurantModel.findByIdAndDelete(restaurant_id);
        if (!deletedRestaurant) {
            return res.status(404).send({
                success: false,
                message: `No restaurant found with ID: ${restaurant_id}`,
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully',
        });
    

  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in DELETE Restaurant API',
        error
    })
  }
}
module.exports={createRestaurantController,getAllRestaurantController,getRestaurantById,deleteRestaurantController}