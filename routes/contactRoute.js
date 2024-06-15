import express from "express";
// import {isAdmin, requireSignIn} from "../Middlewares/authMiddleware.js"
import {createContactController, contactCountController, getAllContactController} from "../controlllers/contactController.js"
const router = express.Router();

// plan - choose
router.post("/create-contact", createContactController);

// router.put("/update-contact/:contactid", updateplanController);

// router.delete("/delete-contact/:contactid", deleteplanController);

router.get("/getall-contact", getAllContactController);

// router.get("/get-contact/:contactid", getPlanController);

router.get("/total-contact", contactCountController);


export default router;

