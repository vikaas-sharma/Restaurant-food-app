const express=require('express');
const auth = require('../middlewares/auth');
const { createFoodController, getAllFoodController, getFoodById, getFoodByRestaurantController, updateFoodById, deleteFoodById, placeorderController, orderStatusController } = require('../controllers/foodController');
const admin = require('../middlewares/admin');
//router object
const router=express.Router();

//routes
//CREATE FOOD
router.post('/create',auth,createFoodController) 
// GET ALL FOOD
router.get('/getAll', getAllFoodController)
//GET FOOD BY ID
router.get('/get/:id', getFoodById)
//GET FOOD BY RESTAURANT
router.get('/getByRestaurant/:id', getFoodByRestaurantController)
//UPDATE FOOD BY ID
router.put('/update/:id', auth, updateFoodById)
//DELTE FOOD BY ID
router.delete('/delete/:id', auth, deleteFoodById)
//PLACE FOOD
router.post('/placeorder', auth, placeorderController)
//ORDER STATUS
router.post('/orderStatus/:id', auth, admin, orderStatusController)
module.exports=router