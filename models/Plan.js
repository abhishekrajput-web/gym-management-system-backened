import mongoose from "mongoose";

const planSchema = new mongoose.Schema({

    userName: {
        type: String,
        default:undefined
    },

    planName: {
        type: String,
        required: true,
    },

    monthlyPlanAmount: {
        type: String,
        required: true,
        unique: true
    },

    yearlyPlanAmount: {
        type: String,
        required: true,
        unique: true
    },

    waterStations:{
        type:String,
        required:true
    },

    lockerRooms:{
        type:String,
        required:true
    },

    wifiService:{
        type:String,
        required:true
    },

    cardioClass:{
        type:String,
        required:true
    },

    refreshment:{
        type:String,
        required:true
    },


    groupFitnessClasses:{
        type:String,
        required:true
    },


    personalTrainer:{
        type:String,
        required:true
    },


    specialEvents:{
        type:String,
        required:true
    },


    cafeOrLounge:{
        type:String,
        required:true
    },


}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;

