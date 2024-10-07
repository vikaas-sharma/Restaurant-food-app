const express=require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require('../controllers/userController');
const auth = require('../middlewares/auth');
//router object
const router=express.Router();

//routes
//GET USER || GET
router.get('/getUser', auth, getUserController)

//UPDATE PROFILE
router.put('/updateUser',auth, updateUserController)

//RESET PASSWORD
router.post('/resetPassword',auth, resetPasswordController)

//UPDATE PASSWORD
router.post('/updatePassword',auth, updatePasswordController)

//DELETE USER
router.delete('/deleteUser/:id', auth, deleteUserController)

module.exports=router