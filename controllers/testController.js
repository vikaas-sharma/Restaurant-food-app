const testUserController= (req,res)=>{
   try{
         res.status(200).send("<h1>user data</h1>")
   } catch(error){
       console.log('error in Test API', error)
   }
}

module.exports={testUserController}