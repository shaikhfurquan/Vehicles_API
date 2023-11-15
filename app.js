import express  from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoute.js'
import carRouter from './routes/carRoute.js'


const app = express();
dotenv.config() 
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [FRONTEND_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true
}))


app.use('/users' , userRouter)  //users routes
app.use('/cars' , carRouter)  //cars routes



//connection of mongodb
mongoose.connect(MONGO_URL , {
    dbName: DB_NAME,
}).then(()=>{
    console.log(`Connected to Atlas MongoDB --> DbName --> ${DB_NAME}`);
}).catch(() =>{
    console.log('Error While Connecting to MongoDB');
})

//App listening on port
app.listen(PORT , () =>{
    console.log(`App listening on ${PORT}`);
})