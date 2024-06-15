// import User from "../models/User.js";
import { User } from "../models/User.js";
import Plan from "../models/Plan.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import Subscription from "../models/Subscription.js";
import Feedback from "../models/Feedback.js";


const registerController = async (req, res) => {
    try {
        const { name, email, password, city, contact } = req.body;

        if (!name) {
            return res.json({ message: "Name is Required" })
        }

        if (!email) {
            return res.json({ message: "Email is Required" })
        }

        if (!password) {
            return res.json({ message: "Password is Required" })
        }

        if (!city) {
            return res.json({ message: "City is Required" })
        }

        if (!contact) {
            return res.json({ message: "Contact is Required" })
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(200).json({
                message: "Already a regsitered a user! please login",
                success: true
            });
        }

        // create a new user or register new user
        const hashedPassword = await hashPassword(password);

        const user = await new User({ name: name, email: email, city: city, contact: contact, password: hashedPassword }).save();
        res.status(200).json({
            success: true,
            message: "user registered successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in registration",
            error
        });
    }

}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "invalid email or password",
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email is not registered",
            })
        }

        const matchPassword = await comparePassword(password, user.password);

        if (!matchPassword) {
            return res.status(200).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // token jwt for successfull login

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                city: user.city,
                contact: user.contact,
                // question:user.question,
                // role:user.role,
                _id: user._id,
            },
            token,
        });

    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in login",
            err
        })
    }

}



// forgotPassword controller
const forgotPasswordController = async (req, res) => {

    try {
        const { email, newPassword} = req.body;

        if (!email) {
            return res.json({ message: "Email is required" });
        }
        
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        
        const user = await User.findOne({email});

        if (!user) {
           return res.status(404).json({
                message:"Wrong Email or Question",
                success:false,
            });
        }

        const hashedPassword = await hashPassword(newPassword);

        await User.findByIdAndUpdate(user._id, {password: hashedPassword});

        res.status(200).json({
            message:"password change successfully",
            success:true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"something went wrong",
            success:false,
            error
        });
    }

}


// update profile

const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, city, contact } = req.body;
      const user = await User.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          contact: contact || user.contact,
          city: city || user.city,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };




const testController = (req, res) => {
    res.status(200).json({
       message:"routes is required",
       success:true,
   })
   console.log("routes protected");
   }

   
   const userCountController = async (req, res) => {
    try {
        const total = await User.find({}).estimatedDocumentCount();
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

const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, error, message: "Error in getting all users",
        })
    }
}



// Route to fetch user's subscription details
const getSubscriptionByUser = async (req, res) => {
    try {
        // Fetch subscription details including connected plan for the authenticated user
        const subscription = await Subscription.findOne({ user: req.user._id }).populate('plan');
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({success:true, subscription});
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllSubscriptionByUser = async (req, res) => {
    try {
        // Fetch subscription details including connected plan for the authenticated user
        const subscription = await Subscription.find({ user: req.user._id }).populate('plan');
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({success:true, subscription});
    } catch (error) {
        console.error('Error fetching All subscription:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllFeedbacksByUser = async (req, res) => {
    try {
        // Fetch subscription details including connected plan for the authenticated user
        const newFeedback = await Feedback.find({ user: req.user._id }).populate('user');
        if (!newFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({success:true, newFeedback});
    } catch (error) {
        console.error('Error fetching All Feedback:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//   // user plans
//   const getPlansController = async (req, res) => {
//     try {
//       const plans = await Plan
//         .find({ buyer: req.user._id })
//         .populate("plans")
//         .populate("buyer", "name");
//       res.status(200).json({success:true, plans });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Error WHile Geting Orders",
//         error,
//       });
//     }
//   };
  

// //   get all plans admin

// const getAllPlansController = async (req, res) => {
// try {
//     const plans = await Plan
//     .find({})
//     .populate("plans")
//     .populate("buyer", "name")
//     .sort({createdAt: "-1"})
//      res.status(200).json({success:true, plans });
// } catch (error) {
//     console.log(error);
//     res.status(500).json({
//         success: false,
//         message: "Error WHile Geting all admin plans",
//         error,
//     })
// }
// }


// // order status changes

// const getOrderStatusController = async (req, res) => {
//     try {
//         const {orderId} = req.params;
//         const {status} = req.body;
//         const orders = await Order.findByIdAndUpdate(orderId, {status}, {new:true});
//         res.status(200).json({
//             success: true, orders,
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false, error, message: "Error in update order",
//         })
//     }
//     }
    




export { registerController, loginController, forgotPasswordController, testController, updateProfileController, userCountController,getAllUsersController, getSubscriptionByUser, getAllSubscriptionByUser, getAllFeedbacksByUser };