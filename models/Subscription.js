
// subscription.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    userName:{
       type:String,
        required:true,
    },

    planType:{
       type:String,
        required:true,
    },

    planAmount:{
        type:String,
        required:true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan"
    },
    // Other subscription fields...
}, {timestamps:true} );

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;