import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      role:{
        type: Number, default: 1,
      },
        orders: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
          },
        ],
        image:{
          type: String
        },
        website:{
          type: String
        },
        phone:{
          type: Number
        }
      
}, {timestamps:true})

const UserModel = mongoose.model('registers', userSchema );
export default UserModel;
