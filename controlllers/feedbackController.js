import Feedback from '../models/Feedback.js';
import { User } from '../models/User.js'; // Assuming you have a User model for user reference

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user'); // Populate user details
   return res.status(200).json({
      success: true,
      message: "All feedbacks accessed successfully",
      feedbacks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

// const createFeedback = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { message, rating } = req.body;

//     // Check if user already submitted feedback
//     const existingFeedback = await Feedback.findOne({ user: userId });
//     if (existingFeedback) {
//       return res.json({ message: 'Feedback already exists. please go to your profile then delete it and try again', success: false });
//     }

//     const newFeedback = new Feedback({
//       user: userId,
//       message,
//       rating,
//     });

//     await newFeedback.save();
//       res.status(201).json({ message: 'Feedback submitted successfully', success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error', success: false });
//   }
// };



const createFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message, rating } = req.body;

    // Check if user already submitted feedback
    const existingFeedback = await Feedback.findOne({ user: userId });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already exists. Please go to your profile, delete it, and try again', success: false });
    }

    const newFeedback = new Feedback({
      user: userId,
      message,
      rating,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};



const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.user._id).populate('user'); // Populate user details

    if (!feedback) {
      return res.json({ message: 'Feedback not found', success:false });
    }
   return res.status(200).json({
      success: true,
      message: "feedback accessed successfully",
      feedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

const updateFeedbackById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { message, rating } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, { message, rating }, { new: true });

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found', success:false });
    }

   return res.status(200).json({
      success: true,
      message: "feedback updated successfully",
      updatedFeedback
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', success:false });
  }
};

const deleteFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found', success:false });
    }

   return res.status(200).json({ message: 'Feedback deleted successfully', success:true, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


const feedbackCountController = async (req, res) => {
  try {
      const total = await Feedback.find({}).estimatedDocumentCount();
     return res.status(200).json({
          success: true,
          total
      })
  } catch (error) {
      console.log(error);
      res.status(500).json({
          success: false, error, message: "Error in total Feedback Count",
      })
  }
}


export { getAllFeedbacks, createFeedback, deleteFeedbackById, updateFeedbackById, getFeedbackById, feedbackCountController };