import { Document } from "mongoose";
import { cartItems } from "./cart";
import { UserAddress, Users } from "./users";


export interface Orders extends Document {
    items: cartItems[];
    totalPrice: number;
    paymentMethod: Payment;
    deliverdAt: Date | number;
    paidAt:Date;
    isPaid:boolean;
    isDelivered: boolean;
    taxPrice: number;
    address: UserAddress;
    user: Users;
}

type Payment = "cash" | "card";