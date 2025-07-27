const express=require('express');
const cors = require('cors');

const app=express();
const dotenv=require('dotenv');
const dbConnect = require('./config/db');
dbConnect();
app.use(cors());
app.use(express.json());
dotenv.config();//makes the variables inside available via process.env
const dataRoutes=require('./routes/data');
app.use(dataRoutes);
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("Server Up!");
});