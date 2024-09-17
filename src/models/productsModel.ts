import { Schema, model, Types } from "mongoose";
import Products from "../interfaces/Product";

const ProductsSchema = new Schema<Products>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  priceAfterDiscount: { type: Number, default: null },
  stockQuantity: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  subcategory: { type: Types.ObjectId, ref: 'subCategories', required: true },
  category: { type: Types.ObjectId, ref: 'categories', required: true },
  image: [{ type: String }],
  cover: { type: String },
  ratingAverage: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

export default model<Products>('Products', ProductsSchema);