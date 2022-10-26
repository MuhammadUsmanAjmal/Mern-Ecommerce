import mongoose from "mongoose"

const connectDB = async ()  =>{
try {
    mongoose.connect(process.env.MONGODB_URI).then(() =>{
        console.log(`MongoDb Connected`.cyan.underline);
    })
} catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1)
}}



export default connectDB;