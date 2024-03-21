import express from "express";
import {Register} from "../controllers/Register.js";
import JWT from 'jsonwebtoken'
import { loginController } from "../controllers/login.js";
import { checkadmin, checksign } from "../middlewares/authmiddleware.js";
import handlecategory from "../controllers/handlecategory.js";
import UserModel from "../models/userModel.js";
import UpdateProfileController from "../controllers/UpdateProfileController.js";
// router object 
const router = express.Router();
router.post('/register' , Register)
router.post('/login', loginController)
router.get("/admin" ,checksign , checkadmin);
router.post("/profile/edit", UpdateProfileController);
router.post('/profile',async(req,res)=>{
    const {username} = req.body;
    const profile_details = await UserModel.find({username: username})
    console.log(profile_details)
    const Profile_response = {
        image: profile_details[0].image, website: profile_details[0].website,phone:profile_details[0].phone,
    }
    console.log(Profile_response)
    res.json(Profile_response);
});
router.get('/user', checkadmin,(req,res)=>{
    res.status(200).send({ok:true});
});
export default router
