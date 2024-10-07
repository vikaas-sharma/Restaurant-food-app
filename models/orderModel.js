const mongoose=require('mongoose');

//Schema
const ordersSchema= new mongoose.Schema(
    {
     foods:[{type : mongoose.Schema.Types.ObjectId, ref: 'foods'}],
     payment:{},
     buyer:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },
     status:{
        type:String,
        enum:['preparing','prepared','on the way','deliverd'],
        default:'preparing',
     },
     
    },{timestamps: true}
)

//export
module.exports=mongoose.model('Orders', ordersSchema)