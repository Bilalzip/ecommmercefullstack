import Hashpass, { Comparepass } from "../helpers/authhelper.js";
import UserModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const Register = async (req,res)=>{
    try{
        const {email ,password , fullname , username } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Email not found" });
          }
          
          if (!password) {
            return res.status(400).json({ message: "Password not found" });
          }
          
          if (!fullname) {
            return res.status(400).json({ message: "Fullname not found" });
          }
          
          if (!username) {
            return res.status(400).json({ message: "Username not found" });
          }
          
          const existingUser = await UserModel.findOne({email});

        if (existingUser) {
            res.status(400).json("This email is already in use");
        } else {
            const Hasedpassword = await Hashpass(password);
            const RegisterUser = await new UserModel({ email, password: Hasedpassword, fullname, username }).save();
            res.json({ user: RegisterUser });
        }
    } catch (err) {
        res.json(err);
    }
}

export default Register;