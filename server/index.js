const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require("cors")
dotenv.config();
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoutes")
const postRoute = require("./routes/postRoutes")

const app = express()
app.use(cors({origin:process.env.URL, credentials:true}))
app.use(express.json({limit: "25mb"}));
app.use(cookieParser());
app.use("/api/post", postRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
};


const startServer = async() =>{
  try{
      app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`))
      connectDB();
  }catch(err){
      console.log(err);
  }
}
startServer();
