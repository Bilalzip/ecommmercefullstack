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
router.get('/user', checkadmin,(req,res)=>{
    res.status(200).send({ok:true})
});
export default router
