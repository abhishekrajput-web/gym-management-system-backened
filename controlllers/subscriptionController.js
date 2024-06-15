import Plan from "../models/Plan.js";
// import User from "../models/User.js";
import { User } from "../models/User.js";
import  Subscription from "../models/Subscription.js";
// const createSubscriptionPlanController = async (req, res) => {
//     try {
//         const {userName, planType, planAmount, planId  } = req.body;
//         if (!userName) {
//             return res.json({ message: "username is Required" });
//         }
//         if (!planType) {
//             return res.json({ message: "planType is Required" });
//         }
//          const userId = req.user._id;

//         const user = await User.findById(userId);
//         const plan = await Plan.findById(planId);

//         if (!user) {
//             return res.status(400).json({message:"user not found", success:false});
//         }

//         if (!plan) {
//             return res.status(400).json({message:"plan not found", success:false});
//         }
        
//         const newSubscription = await new Subscription({
//             userName,
//             planType,
//             planAmount,
//             plan:planId, 
//             user:userId 
//         }).save();

//         return res.status(200).json({
//             message: "subscription created successfully",
//             success: true,
//             newSubscription
//         });


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "error in subscription",
//             error
//         });
//     }

// }

const createSubscriptionPlanController = async (req, res) => {
    try {
        const { userName, planType, planAmount, planId } = req.body;
        if (!userName) {
            return res.json({ message: "Username is required" });
        }
        if (!planType) {
            return res.json({ message: "Plan type is required" });
        }
        
        const userId = req.user._id;

        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        if (!plan) {
            return res.status(400).json({ message: "Plan not found", success: false });
        }

        // Check if the user already has a subscription for the selected plan type
        // const existingSubscription = await Subscription.findOne({ user: userId, planType });
        const existingSubscription = await Subscription.findOne({ user: userId });

        console.log("Existing Subscription:", existingSubscription); 
        if (existingSubscription) {
            // console.log("User already has an active subscription for this plan type");
            // return res.json({ message: "You already have an active subscription for this plan type", success: false });

               console.log("You already have an active subscription");
            return res.json({ message: "You already have an active subscription", success: false });

        }

        const newSubscription = await new Subscription({
            userName,
            planType,
            planAmount,
            plan: planId,
            user: userId,
            // createdAt:new Date()
        }).save();

        return res.status(200).json({
            message: "Subscription created successfully",
            success: true,
            newSubscription
        });

    } catch (error) {
        console.error("Error in subscription:", error); // Log error
        res.status(500).json({
            success: false,
            message: "Error in subscription",
            error
        });
    }
};


// Get all subscriptions
const getAllSubscriptionsController = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate('user').populate('plan');
        return res.status(200).json({ success: true, subscriptions });
    } catch (error) {
        console.error("Error getting subscriptions:", error);
        return res.status(500).json({ success: false, message: "Internal server error || error in getting subscription" });
    }
};


const getSubscriptionController = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findById(subscriptionId).populate('user').populate('plan');
        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        return res.status(200).json({ success: true, subscription });
    } catch (error) {
        console.error("Error getting subscription:", error);
        return res.status(500).json({ success: false, message: "Internal server error || Error getting subscription:" });
    }
};


// Update a subscription
const updateSubscriptionController = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const update = req.body;
        const updatedSubscription = await Subscription.findByIdAndUpdate(subscriptionId, update, { new: true });
        if (!updatedSubscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        return res.status(200).json({ success: true, message: "Subscription updated successfully", subscription: updatedSubscription });
    } catch (error) {
        console.error("Error updating subscription:", error);
        return res.status(500).json({ success: false, message: "Internal server error || erroe in updating subscription" });
    }
};


// Delete a subscription
const deleteSubscriptionController = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);
        if (!deletedSubscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        return res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } catch (error) {
        console.error("Error deleting subscription:", error);
        return res.status(500).json({ success: false, message: "Internal server error Error deleting subscription" });
    }
};

const subscriptionCountController = async (req, res) => {
    try {
        const total = await Subscription.find({}).estimatedDocumentCount();
        res.status(200).json({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, error, message: "Error in total User Count",
        })
    }
}



export { createSubscriptionPlanController, updateSubscriptionController, getAllSubscriptionsController, getSubscriptionController, deleteSubscriptionController, subscriptionCountController};



