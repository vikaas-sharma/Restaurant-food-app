const express=require('express');
const auth = require('../middlewares/auth');
const { createCatController, getALLCatController, updateCatbyId, deleteCatController } = require('../controllers/categoryController');
//router object
const router=express.Router();

//routes
//CREATE CATEGORY
router.post('/create', auth, createCatController)
//GET ALL CATEGORY
router.get('/getallCat', getALLCatController)
//UPDATE CATEGORY
router.put('/update-cat/:id', auth, updateCatbyId)
//DELETE CATEGORY
router.delete('/delete/:id',auth, deleteCatController)
module.exports=router