import express from 'express';
import { requireSignIn } from '../Middlewares/authMiddleware.js';
import {
  getAllFeedbacks,
  createFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  feedbackCountController
} from "../controlllers/feedbackController.js";

const router = express.Router();

// POST - Create Feedback
router.post('/create-feedback', requireSignIn, createFeedback);

// GET - Get all Feedbacks
router.get('/getall-feedback', getAllFeedbacks); // Optionally, apply isSubscribed middleware here too

// GET - Get Feedback by ID
router.get('/getsingle-feedback/:id', requireSignIn, getFeedbackById); // Optionally, apply isSubscribed middleware here too

// PUT - Update Feedback by ID
router.put('/update-feedback/:id', requireSignIn, updateFeedbackById);

// DELETE - Delete Feedback by ID
router.delete('/delete-feedback/:id', requireSignIn, deleteFeedbackById);

router.get("/total-feedback", feedbackCountController);


export default router;
