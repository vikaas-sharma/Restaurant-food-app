const categoryModel = require("../models/categoryModel");

const createCatController = async(req,res) => {
    try{
            const {title, imageUrl} =req.body;
            //validation
            if(!title){
                return res.status(500).send({
                    success:false,
                    message:'please provide category title or image'
                })
            }
             const newCategory = new categoryModel({title, imageUrl})
             await newCategory.save();
             res.status(201).send({
                success: true,
                message:"category created",
                newCategory
             })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Category API'
        })
    }
}

const getALLCatController = async(req,res) =>{
    try{
         const categories  = await categoryModel.find({});
         if(!categories){
            return res.status(404).send({
                success:true,
                message:"No category found"
            })
         }

         res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
         })
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Category API'
        })
    }
}

const updateCatbyId = async(req,res)=>{

    try{
     
        const {id } = req.params;
        const {title, imageUrl} =req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true});

        if(!updatedCategory)
        {
            return res.status(500).send({
                success:false,
                message: 'No category Found'
            })
        }
        res.status(200).send({
            success:true,
            message: 'category updated successfully',
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in UPDATE CATEGORY API'
        })
    }

}

const deleteCatController= async(req,res) =>{
    try{
           const {id} =req.params;
           if(!id)
           {
            return res.status(500).send({
                success:false,
                message:'Please provide Category ID'
            })
           }
           const category = await categoryModel.findById(id);
           if(!category){
            return res.status(500).send({
                success:false,
                message:'No category found with this id'
            })
           }
           
            await categoryModel.findByIdAndDelete(id)
            res.status(200).send({
                success:true,
                message: 'Category deleted successfully'
            })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in DELETE CATEGORY API'
        })
    }
 }
module.exports={createCatController,getALLCatController,updateCatbyId,deleteCatController}