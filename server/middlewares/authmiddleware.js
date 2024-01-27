import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
export const checkadmin = async (req,res, next)=>{
    const {username,password} = req.body;
   const finduser = await UserModel.find(username);

   if (finduser[0].role !==1) {
    res.status(401).send({
        success:false,
        message: "user is not autherized"
    })
   } else {
    next() }
}

export const checksign = async (req,res,next)=>{

    const userauth = req.headers.authorization;

    if (!userauth){
        res.status(401).send({
            success:false,
            message: "check your token"
        })
    } else {
        const decode = jwt.verify(userauth, process.env.JWT_SECRET);

        if (!decode){
            res.status(401).send({
                success:false,
                message: "check your token"
            })
        } else {
            next();
        }
    }

}