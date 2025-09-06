import express from 'express';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import bhashiniRoutes from "./routes/bhashini.route.js"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT;


app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, parameterLimit:1000000 ,limit: '10mb' }));


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"]  //Add other headers you want to pass through CORS request
}));
// app.use(cors());




app.use("/api/auth",authRoutes);
app.use("/api",bhashiniRoutes);




app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT);
    connectDB();
});

 





