const userModel =require('../models/userModel')
const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken')
//REGISTER
const registerController= async(req,res)=>{
    try{
        const {userName,email,password,phone,address,answer}=req.body;
        console.log(req.body)
        //validation
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide all Fields'
            })
        }
        //check user
        const existingUser =await userModel.findOne({email});
        if(existingUser){
            return res.status(500).send(
                {
                    success:false,
                message:'Email Alreadt Registed Please Login'
                }
            )
        }
        
    
        //hashing password
        const saltRounds = 10;//it is used for encryption
        const hashedPassword= await bcrypt.hash(password, saltRounds);
        const user = await userModel.create({userName, email, password:hashedPassword, address, phone, answer})
       //create new user
        res.status(201).send(
            {
                success:true,
                message:'Successfully registerd',
                user
            }
        )

    } catch(error){
        console.log(error);
        res.status(500).send(
            {
                success:false,
                message:'Error in Register API',
                error
            }
        )
    }
 }
 const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide both email and password"
            });
        }

        // Check if the user exists in the database
        const user = await userModel.findOne({ email });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not found, please register or check your email"
            });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the password is incorrect, return an error
        if (!passwordMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials, password is incorrect"
            });
        }
       //creating jwt token
       const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
       })
       //for not showing password
       user.password=undefined;
        // If both checks pass, send a success response
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in LOGIN API",
            error: error.message // Adding error message for more details
        });
    }
};

 
 module.exports={registerController,loginController}