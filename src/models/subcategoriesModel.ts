import { Schema, model } from "mongoose";
import { SubCategories } from "../interfaces/subCategories";

const SubCategoriesSchema = new Schema<SubCategories>({
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    image: String,
}, {timestamps:true});

export default model('subcategory',SubCategoriesSchema);