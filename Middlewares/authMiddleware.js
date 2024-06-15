import JWT from "jsonwebtoken";
// import User from "../models/User.js";
import {User} from "../models/User.js";
import Subscription from "../models/Subscription.js";
// protected routes token based
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }

    catch (err) {
        console.log(err);
        res.json(err);
    }

}

// admin access 
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized Access"
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
         res.status(401).json({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }


}


const isSubscribed = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const subscription = await Subscription.findOne({ user: userId });
        if (!subscription) {
            return res.status(403).json({
                success: false,
                message: "You need an active subscription to perform this action",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export { requireSignIn, isAdmin, isSubscribed };

