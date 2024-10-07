const express=require('express');
const colors=require('colors');
const morgan=require('morgan')
const dotenv=require('dotenv');
const { connectdB } = require('./config/db');

//dot env configuration
dotenv.config();
//DB connection
connectdB();
//rest object
const app=express();

//middlewares
app.use(express.json());
//tell us status code and time required to hit api
app.use(morgan("dev"));

//routes
app.use('/api/v1/test', require('./routes/testRoute'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))
app.use('/api/v1/food', require('./routes/foodRoutes'))



app.get('/',(req,res)=>
    {
        return res.status(200).send(`<h1>hello world</h1>`)
    });

  //PORT 
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server runnning on ${PORT}`.white.bgMagenta)
})