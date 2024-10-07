const { type } = require('express/lib/response');
const mongoose=require('mongoose');

//Schema
const foodSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, 'Food title is require']
        },
        description:{
            type:String,
            required: [true, 'food description is required']
        },
        price:{
            type:Number,
            required: [true, 'food price is required']
        },
        imageUrl:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHPDNLWEH5PHItjVnUtTQkhQCSxsOxqCG57w89oWYYyVd6_xX9i5gxhVXw5wMdwjUDRI&usqp=CAU"
        },
        foodTags:{
            type:String
        },
        category:{
            type:String
        },
        code:{
            type:String
        },
        isAvailable:{
            type:Boolean,
            default:true
        },
        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Restaurant'
        },
        rating:{
            type:Number,
            default:5,
            min:1,
            max:5
        },
        ratingCount:{
            type:String
        }
    },{timestamps: true}
)

//export
module.exports=mongoose.model('foods', foodSchema)