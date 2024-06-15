import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url).then(() => console.log("connected mongodb successfully")).catch((err) => console.log(err || "mongodb not connected") );
}

export default connectDB;