const express=require('express');
const { registerController, loginController } = require('../controllers/authControllers');

//router object
const router=express.Router();

//REGISTER //POST
router.post('/register',registerController)
//LOGIN //POST
router.post('/login', loginController)
module.exports=router