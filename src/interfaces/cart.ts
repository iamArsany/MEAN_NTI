import { Document } from "mongoose";
import { Users } from "./users";
import Products from "./Product";


export interface Carts extends Document{
    items:cartItems[];
    totalPrice:number;
    totalPriceAfterDiscount:number|undefined;
    user:Users;
}
export interface cartItems{
    _id?:string;
    product:Products;
    quantity:number;
    price:number;
}