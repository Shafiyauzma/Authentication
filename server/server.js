import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 2000

connectDB();

// const allowedOrigins = ['https://authentication-1-liard.vercel.app']

app.use(express.json())
app.use(cookieParser())

// Allow all origins and support cookies
app.use(cors({
    
    origin: (origin, callback) =>{
        callback(null,true);
    },
     credentials:true
}));

// API Endpoints
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("HII")
})

app.listen(port, ()=>{
    console.log(`Server started on port:${port}`)
})