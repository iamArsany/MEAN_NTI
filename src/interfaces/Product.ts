import { Categories } from "./categories";
import { SubCategories } from "./subCategories";

export default interface Products extends Document{
    _id: any;
    populate: any;
    name: string;
    description: string;
    price: number;
    priceAfterDiscount: number;
    stockQuantity: number;
    sold: number;
    subcategory: SubCategories;
    category: Categories;
    image: string[];
    cover: string;
    ratingAverage: number;
    ratingCount: number;
    // couponID: Coupon;
  };