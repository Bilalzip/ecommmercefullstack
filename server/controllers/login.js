         import { Comparepass } from "../helpers/authhelper.js";
         import UserModel from "../models/userModel.js";
         import jwt from 'jsonwebtoken'
         export const loginController = async (req, res) => {
           const { username, password } = req.body;
           if (!username || !password) {
              throw new Error("Invalid username or password")
           } else {
             try {
               const user = await UserModel.findOne({ username });
               if (!user) {
                throw new Error("User not found");
               } else {
                const matchpass = await Comparepass(password, user.password);
                if (matchpass==true){
                    const secretKey = process.env.JWT_SECRET;
          const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '5d' });
          res.json({"token": token , "user" : JSON.stringify(user), message:"Login successful"})
                }
               }
             } catch (error) {
               res.status(500).send("Internal server error" , error);
             }
           }
         };
         export default loginController;