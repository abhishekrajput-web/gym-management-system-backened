// downloaded package require
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();

// initialise downlaoded package
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

dotenv.config();

const PORT = process.env.PORT || 5000;
// user defined package
import connectDB from "./utils/connectDB.js";
// import User from "./models/User.js";
import authRoute from "./routes/authRoute.js";
import planRoute from "./routes/planCategoryRoute.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";
import ContactRoute from "./routes/contactRoute.js";
import feedBackRoute from "./routes/feedBackRoute.js";

app.get("/", (req, res) =>{
res.send("server is running successfully");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/plan", planRoute);
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/contact", ContactRoute);
app.use("/api/v1/feedback", feedBackRoute);


const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
         console.log(`server is running on port ${PORT}`);
        });        
    }

    catch(err){
        console.log(err || "some error in starting server");
    }
}

startServer();








