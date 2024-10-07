const mongoose=require('mongoose');

//Schema
const categorySchema= new mongoose.Schema(
    {
      title:{
        type:String,
        required:[true,'category title is required']
      },
      imageUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHPDNLWEH5PHItjVnUtTQkhQCSxsOxqCG57w89oWYYyVd6_xX9i5gxhVXw5wMdwjUDRI&usqp=CAU"
      }
    },{timestamps: true}
)

//export
module.exports=mongoose.model('Categories', categorySchema)