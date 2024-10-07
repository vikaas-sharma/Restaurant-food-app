const mongoose=require('mongoose');

//Schema
const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true, 'username is required']
        },
        email:{
            type:String,
            required:[true, 'email is required']
        },
        password:{
            type:String,
            required:[true, 'password is required']
        },
        address:{
            type:Array,
        },
        phone:{
            type:String,
            required:[true, 'phone number is required']
        },
        userType:{
            type:String,
            requird:[true, 'user type is required'],
            default:'client',
            enum:['client','admin','vendor','driver']
        },
        profile:{
            type:String,
            default:'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/'
        },
        answer:{
            type:String,
            required: [true, 'Answer is required']
        }
    },{timestamps: true}
)

module.exports=mongoose.model('user', userSchema)