const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("DB Connected");


    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
   
}
 module.exports=dbConnect;