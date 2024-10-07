//GET USER INFO

const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const getUserController = async (req,res)=>{
     try{
          //find user
          const user = await userModel.findById({_id:req.body._id});
          //validation
          if(!user){
               return res.status(404).send({
                    success:false,
                    message:'User Not Found'
               })
          }
          //hide password
          user.password=undefined;
          //finally if all good
          res.status(200).send({
               success:true,
               message:'User get Successfully',
               user
          })

     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:'Error in getUser API',
               error
          })
     }
}

//UPDATE USER
const updateUserController = async(req,res)=>{
     try{
          //find user
          const user = await userModel.findById({_id:req.body._id});
          //validation
          if(!user){
               return res.status(404).send({
                    success:false,
                    message:'User Not Found'
               })
          }
          //update user
          const {userName, address, phone} =req.body;
             if(userName) user.userName = userName;
             if(address) user.address = address;
             if(phone) user.phone = phone;
          //save user
          await user.save();
          res.status(200).send({
               success:true,
               message:'User updated Successfully'
          })

     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:'Error in update User API',
               error
          })
     }
}

const resetPasswordController = async(req,res)=>{
     try{
          const {email, newPassword, answer} = req.body;
          //validation
          if(!email || !newPassword || !answer){
               return res.status(400).send({
                    success:false,
                    message:"Please Provide All Fields"
               })
          }
         //validating user
         const user = await userModel.findOne({email,answer});
         if(!user){
          return res.status(404).send({
               success:false,
               message:"User not Found or Invalid User"
          })
     }
     //updating password
     const saltRounds = 10;//it is used for encryption
     const hashedPassword= await bcrypt.hash(newPassword, saltRounds);
     user.password=hashedPassword;
     await user.save();
     res.status(200).send({
          success:true,
          message:'Password Reset Successfully'
     })

     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:'Error in PASSWORD RESET API',
               error
          })
     }
}
//UPDATE USER PASSWORD
const updatePasswordController = async(req,res) =>{
     try{
                //find user
                const user = await userModel.findById({_id:req.body._id});

                //validation
                if(!user)
                {
                   return res.status(404).send({
                    success:false,
                    message:'User Not Found'
                   }) 
                }

                //GET DATA FROM THE USER
                const {oldPassword, newPassword} = req.body;
                if(!oldPassword || !newPassword){
                    return res.status(500).send({
                         success:false,
                         message:"Please Provide old and new Password"
                    })
                }
                // Check if the password matches
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        // If the password is incorrect, return an error
        if (!passwordMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid old password"
            });
        }
        //saving the password in hashing form
        const saltRounds = 10;//it is used for encryption
        const hashedPassword= await bcrypt.hash(newPassword, saltRounds);
        user.password=hashedPassword;
        await user.save();
        res.status(200).send({
          success:true,
          message:'Password Updated'
        })
     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:'Error in PASSWORD UPDATE API',
               error
          })
     }
}

const deleteUserController = async(req,res)=>{
     try{
           await userModel.findByIdAndDelete(req.params.id)
           return res.status(200).send({
               success: true,
               message: 'Your Account has been deleted'
           })
     }catch(error){
          console.log(error);
          res.status(500).send({
               success:false,
               message:'Error in Delete Profile API',
               error
          })
     }
}
module.exports={getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteUserController}