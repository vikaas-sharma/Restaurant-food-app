const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//Create food
const createFoodController = async(req,res) =>{
    try{
        const {title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating, ratingCount}=req.body;
    if(!title || !description || !price || !restaurant)
    {
        return res.status(500).send({
            success:false,
            message:'Please Provide all flelds'
        })
    }

    const newFood = new foodModel({title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating, ratingCount});
    await newFood.save();
    res.status(200).send({
        success:true,
        message:'New Food Item Created',
        newFood
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Food API'
        })
    }
}
const getAllFoodController =async(req,res) =>{
    try{
          const allfoods = await foodModel.find({});
          if(!allfoods){
            return res.status(404).send({
                success:true,
                message:"No foods found"
            })
         }
         res.status(200).send({
            success:true,
            totalFood:allfoods.length,
            allfoods
         })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get ALL Food API'
        })
    }

}

const getFoodById = async(req,res)=>{
    try{
         const {id}=req.params;
         if(!id)
            {
             return res.status(500).send({
                 success:false,
                 message:'Please provide FOOD ID'
             })
            }
            const Food = await foodModel.findById(id);
            if(!Food){
             return res.status(500).send({
                 success:false,
                 message:'No food found with this id'
             })
            }
            return res.status(200).send(
                {
                    success:true,
                    message:'Food found successfully',
                    Food
                }
)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get food by id API'
        })
    }
}

//GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async(req,res)=>{
    try{
         const restaurantid=req.params.id;
         if(!restaurantid)
            {
             return res.status(500).send({
                 success:false,
                 message:'Please provide valid restaurant ID'
             })
            }
            const Food = await foodModel.find({restaurant:restaurantid});
            if(!Food){
             return res.status(500).send({
                 success:false,
                 message:'No food found with this restaurant id'
             })
            }
            return res.status(200).send(
                {
                    success:true,
                    message:'Food based on restaurant found successfully',
                    Food
                }
)
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get food by id API'
        })
    }
}

const updateFoodById = async(req,res) =>{
       try{
             const foodId=req.params.id;
             if(!foodId){
                return res.status(404).send({
                    success:false,
                    message:'No food id is found'
                })
             }
             const food = await foodModel.findById(foodId);
             if(!food){
                return res.status(404).send({
                    success:false,
                    message:'No food is found'
                })
             }
             const {title,
                    description,
                     price,
                     imageUrl,
                      foodTags,
                     category,
                     code,
                     isAvailable,
                      restaurant,
                         rating,
                          ratingCount
                        } = req.body;
            const updatedFood = await foodModel.findByIdAndUpdate(foodId, {title,
                description,
                 price,
                 imageUrl,
                  foodTags,
                 category,
                 code,
                 isAvailable,
                  restaurant,
                     rating,
                      ratingCount
                    }, {new:true});

         res.status(201).send({
            success:true,
            message:'Food items are updated'
         })

       }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update food API',
            error
        })
       }
}

const deleteFoodById = async(req,res) => { 
    try{
         const foodId =req.params.id;
         //validating
         if(!foodId){
            return res.status(404).send({
                success:false,
                message:'No foodId is found'
            })
         }
         const food = await foodModel.findById(foodId);
         //validation
           if(!food){
            return res.status(500).send({
                success:false,
                message:'No food found with this id'
            })
           }
           
            await foodModel.findByIdAndDelete(foodId)
            res.status(200).send({
                success:true,
                message: 'Food deleted successfully'
            })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete food API',
            error
        })
       }
}

//PLACE ORDER
const placeorderController = async(req,res) =>{
    try{
         const {cart}=req.body;
         if(!cart){
            return res.status(500).send({
                success:false,
                message:'please add cart or payment method'
            })
         }
         let total=0;
         //calcule
         cart.map((i) =>{
            total += i.price;
         })

         const newOder =await new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body._id
         })
         await newOder.save();
         res.status(201).send({
            success:true,
            message:'Order Placed Successfully',
            newOder
         })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in place order API',
            error
        })
    }
}
//CHANGE ORDER STATUS
const orderStatusController =async(req,res)=>{
    try{
       const orderId=req.params.id;
       if(!orderId){
        return res.status(404).send({
            success:false,
            message:'plese provide valid orderID'
        })
       }
       const {status} = req.body;
       const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
       res.status(200).send({
        success:true,
        message:'Order status Updated',
        order
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in order Status API',
            error
        })
    }

}
module.exports={createFoodController, getAllFoodController,getFoodById, getFoodByRestaurantController, updateFoodById, deleteFoodById, placeorderController,orderStatusController}