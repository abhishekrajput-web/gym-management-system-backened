import Plan from "../models/Plan.js";
import Subscription from "../models/Subscription.js";
// import User from "../models/User.js";

const createplanController = async (req, res) => {
    try {
        const {planName, monthlyPlanAmount, yearlyPlanAmount, waterStations,lockerRooms, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, cafeOrLounge } = req.body;
    
        if (!planName) {
            return res.json({ message: "planName is Required" });
        }
        if (!monthlyPlanAmount) {
            return res.json({ message: "monthlyPlanAmount is Required" });
        }
        if (!yearlyPlanAmount) {
            return res.json({ message: "yearlyPlanAmount is Required" });
        }

        if (!waterStations) {
            return res.json({ message: "waterstaions is Required" });
        }

        if (!lockerRooms) {
            return res.json({ message: "lockerRooms is Required" });
        }


        if (!wifiService) {
            return res.json({ message: "wifiService is Required" });
        }


        if (!cardioClass) {
            return res.json({ message: "cardioClass is Required" });
        }


        if (!refreshment) {
            return res.json({ message: "refreshment is Required" });
        }

        if (!groupFitnessClasses) {
            return res.json({ message: "groupFitnessClasses is Required" });
        }


        if (!personalTrainer) {
            return res.json({ message: "PersonalTrainer is Required" });
        }


        if (!specialEvents) {
            return res.json({ message: "specialEvents is Required" });
        }
        
        if (!cafeOrLounge) {
            return res.json({ message: "cafeOrLounge is Required" });
        }


        const existingPlan = await Plan.findOne({planName});

        if (existingPlan) {
            return res.status(200).json({message:"plan already exist", success:true});
        }

        // const userPlan = await new Plan({ planName, monthlyPlanAmount, yearlyPlanAmount }).save();

           const userPlan = await new Plan({planName, monthlyPlanAmount, yearlyPlanAmount, waterStations,lockerRooms, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, cafeOrLounge }).save();

        

        return res.status(201).json({
            message: "plan created successfully",
            success: true,
            userPlan
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in plan creating",
            error
        });
    }

}



// update plan by id:


const updateplanController = async (req, res) => {
    try {
        const {planName, monthlyPlanAmount, yearlyPlanAmount, waterStations,lockerRooms, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, cafeOrLounge } = req.body;

        const {planid} = req.params;

        const updateUserPlan = await Plan.findByIdAndUpdate(planid, {planName, monthlyPlanAmount, yearlyPlanAmount, waterStations,lockerRooms, wifiService, cardioClass, refreshment, groupFitnessClasses, personalTrainer, specialEvents, cafeOrLounge } , {new:true} );

        return res.status(200).json({
            message: "plan updated successfully",
            success: true,
            updateUserPlan
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in plan updating",
            error
        });
    }

}



// delete by id


// const deleteplanController = async (req, res) => {
//     try {
//         const {planid} = req.params;    
//         await Plan.findByIdAndDelete(planid);
//         return res.status(200).json({
//             message: "plan deleted successfully",
//             success: true,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "error in plan deleting",
//             error
//         });
//     }

// }



//chat gpt code 

const deleteplanController = async (req, res) => {
    try {
        const { planid } = req.params;

        // Find subscribers associated with the plan
        const subscribers = await Subscription.find({ plan: planid });

        // Check if there are subscribers associated with the plan
        if (subscribers.length > 0) {
            // Delete each subscriber associated with the plan
            for (const subscriber of subscribers) {
                try {
                    // await subscriber.remove();
                    await Subscription.deleteOne({ _id: subscriber._id });
                } catch (error) {
                    console.error(`Error deleting subscriber with ID ${subscriber._id}: ${error.message}`);
                }
            }
        }

        // Delete the plan itself
        await Plan.findByIdAndDelete(planid);

        return res.status(200).json({
            message: "Plan and associated subscriptions deleted successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in plan and subscription deletion",
            error: error.message // Send error message to client for debugging
        });
    }
}



// -------------------------------------------------------------



// get all plan

const getAllPlanController = async (req,res) =>{
try{
    const plans = await Plan.find({});
    return res.status(200).json({
        success:true,
        message:"All plans accessed successfully",
        plans
    });
}

catch(err){
     res.status(500).json({
        success:false,
        message:"error in accessing all plans",
    });
}
}

const getPlanController = async (req,res) =>{
    try{
        const {planid} = req.params;
        const plan = await Plan.findById(planid);
        return res.status(200).json({
            success:true,
            message:"plan accessed successfully",
            plan
        });
    }
    
    catch(err){
     res.status(500).json({
            success:false,
            message:"error in accessing a plan",
        });
    }
    }


    const planCountController = async (req, res) => {
        try {
            const total = await Plan.find({}).estimatedDocumentCount();
            res.status(200).json({
                success: true,
                total
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false, error, message: "Error in total Plan Count",
            })
        }
    }
    


export { createplanController, updateplanController, deleteplanController, getAllPlanController, getPlanController, planCountController};



