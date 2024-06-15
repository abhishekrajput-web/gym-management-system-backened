import express from "express";
import {isAdmin, requireSignIn} from "../Middlewares/authMiddleware.js"
import {createplanController, updateplanController, deleteplanController, getAllPlanController, getPlanController, planCountController} from "../controlllers/PlanCategoryController.js"
const router = express.Router();

// plan - choose
router.post("/create-plan", requireSignIn, isAdmin, createplanController);

router.put("/update-plan/:planid", requireSignIn, isAdmin, updateplanController);

router.delete("/delete-plan/:planid", requireSignIn, isAdmin, deleteplanController);

router.get("/getall-plan", getAllPlanController);

router.get("/get-plan/:planid", getPlanController);

router.get("/total-plan", planCountController);


export default router;

