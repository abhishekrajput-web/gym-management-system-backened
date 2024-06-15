import Contact from "../models/ContactUs.js";



const createContactController = async (req, res) => {
    try {
        const {name, email, city, phone, message } = req.body;
    
        if (!name) {
            return res.json({ message: "name is Required" });
        }

        if (!email) {
            return res.json({ message: "email is Required" });
        }
        if (!city) {
            return res.json({ message: "city is Required" });
        }

        if (!phone) {
            return res.json({ message: "phone is Required" });
        }

        if (!message) {
            return res.json({ message: "message is Required" });
        }

        // const existingQuery = await Contact.findOne({name});

        // if (existingQuery) {
        //     return res.status(200).json({message:"query already submitted with this name", success:true});
        // }

        // const userPlan = await new Plan({ planName, monthlyPlanAmount, yearlyPlanAmount }).save();

           const newContact = await new Contact({name, email, city, phone, message}).save();

        
        return res.status(201).json({
            message: "new Query Submitted Sucessfully",
            success: true,
            newContact
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in submitting query",
            error
        });
    }

}


const getAllContactController = async (req,res) =>{
    try{
        const contact = await Contact.find({});
        return res.status(200).json({
            success:true,
            message:"All plans accessed successfully",
            contact
        });
    }
    
    catch(err){
         res.status(500).json({
            success:false,
            message:"error in accessing all contacts",
        });
    }
    }



const contactCountController = async (req, res) => {
    try {
        const total = await Contact.find({}).estimatedDocumentCount();
        res.status(200).json({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, error, message: "Error in total Contact Count",
        })
    }
}



export {createContactController, contactCountController, getAllContactController};