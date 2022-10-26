import mongoose from "mongoose"
import dotEnv from "dotenv"
import users from "./data/users.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import colors from "colors"
import products from "./data/products.js"
import connectDB from "./config/db.js"

dotEnv.config()

await connectDB()

const importData = async () =>{
try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)

const adminUsers = createdUsers[0]._id

    const sampleProducts = products.map(product =>{
        return {...product , user:adminUsers}
    })
    await Product.insertMany(sampleProducts)
    console.log("Data Imported:".green.inverse);
    process.exit()


} catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1)
}
}
// await connectDB()

const destroyData = async () =>{
    try {

        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

    console.log("destroyData:".green.inverse );

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
    }

   if (process.argv[2] === "-d"){
    destroyData()
   }
   else{
    importData()
   }