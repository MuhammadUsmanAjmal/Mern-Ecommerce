import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import products from "./data/products.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import morgan from "morgan";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import cors from "cors";
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  // console.log("data send by ===>",req.query.name);
  res.send("Api is Running.....");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

// app.get('/api/products/' , (req,res)=>{
//     res.json(products)
// })

// app.get('/api/products/:id' ,(req,res)=>{
//     const product= products?.find((p)=>{
//         return  p._id === req.params.id})
//     res.json(product)
// })

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} and webtoken is ${process.env.JWT_SECRET}`
      .yellow
  )
);
