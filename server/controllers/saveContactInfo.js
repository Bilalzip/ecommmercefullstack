import Contact from "../models/contact.js";

export const saveContactInfo = async (req, res) => {
 
    try {
        const { fullName,
        email,
        message,} = req.body;
    
        if (!fullName){
      return res.json({message: "Please enter a full name"})
        }
    
        if (!email){
            return res.json({message: "Please enter a email"})
        }
    
        if (!message){
            return res.json({message: "Please enter a message"})
        }
    
        const save = await new Contact({
            fullName, email, message
        }).save();

        console.log(save);
    
        return res.json({message:"Your message has been sent"});
    } catch (error) {
        return res.json({message: "Error: " + error.message})
    }

}

export default saveContactInfo;
