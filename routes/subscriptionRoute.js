import express from "express";
import {isAdmin, requireSignIn} from "../Middlewares/authMiddleware.js";
import {createSubscriptionPlanController, updateSubscriptionController, deleteSubscriptionController, getAllSubscriptionsController, getSubscriptionController, subscriptionCountController} from "../controlllers/subscriptionController.js"
const router = express.Router();

// plan - choose
router.post("/create-subscription", requireSignIn, createSubscriptionPlanController);

router.put("/update-subscription/:id", requireSignIn, updateSubscriptionController);

router.delete("/delete-subscription/:id", requireSignIn, deleteSubscriptionController);

router.get("/getall-subscription", requireSignIn, getAllSubscriptionsController);

router.get("/get-subscription/:id", requireSignIn, getSubscriptionController);

router.get("/total-subscription", subscriptionCountController);

export default router;

