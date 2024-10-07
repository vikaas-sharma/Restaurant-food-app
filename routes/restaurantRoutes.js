const express=require('express');
const auth = require('../middlewares/auth');
const { createRestaurantController, getAllRestaurantController, getRestaurantById, deleteRestaurantController } = require('../controllers/restaurantController');
//router object
const router=express.Router();

//routes
//CREATE RESTURANT || POST
router.post('/create', auth, createRestaurantController)

//GET ALL RESTAURANT || GET
router.get('/getAll', getAllRestaurantController)

//GET RESTAURANT BY ID
router.get('/get/:id',getRestaurantById)

// DELETE RESTAURANT || DELETE
router.delete('/delete/:id',auth,deleteRestaurantController)
module.exports=router