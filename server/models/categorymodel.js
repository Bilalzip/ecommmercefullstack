import mongoose from "mongoose";
import { Schema} from "mongoose";


const CategorySchema = new mongoose.Schema({
    category: {type: String , unique:true , }, slug: {type:String}
})
export const CategoryModel = new mongoose.model('categories', CategorySchema)