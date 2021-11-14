import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
//for deploymemnt
// import path from 'path';

// component import
import {router} from './routes/userRouter.js';
import { notesRouter } from './routes/notesRouter.js';


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/user", router);
app.use("/api", notesRouter);
//Connect to Mongodb
const URI = process.env.MONGODB_URI

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('database connected')
})

// app.get('/', (req,res)=>{
//     res.json({msg: "hello world"})
// })


//deployement config
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('server is running on port', PORT);
})