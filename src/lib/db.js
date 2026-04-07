import mongoose from "mongoose";
import { config } from "dotenv";
config();

// const mongoDb_Url = process.env.MongoDbLocal_Url;
const mongoDb_Url = process.env.MongoDbOnline_Url;

mongoose.connect(mongoDb_Url);

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("database connected successfully");
})

db.on("disconnected",()=>{
    console.log("database disconnected successfully");
})

db.on("error",(error)=>{
    console.log("error in connecting database",error);
})

export default db;