import ordersModel from "../models/ordersModel";
import { Orders } from "../interfaces/orders";
import { getAll, getOne } from "../controllers/genericCRUD";
import { NextFunction, Request, Response } from "express";
import FilterData from "../interfaces/Filterdata";
import cartsModel from "../models/cartsModel";
import ApiError from "../utils/ApiError";
import { cartItems } from "../interfaces/cart";
import productsModel from "../models/productsModel";

// filter orders if user role === user
export const filterOrders = ((req: Request, res: Response, next: NextFunction) => {
    next();
});

// get all orders
export const getAllOrders = getAll<Orders>(ordersModel, 'orders');
// get one order
export const getOrder = getOne<Orders>(ordersModel,'orders')

/* create order
1- set tax price
2- get user cart
3- check if user has cart
4- create order and set in order (cartItems, totalPrice, userAddress, taxPrice, userId)
5- update products quantity and sold in cartItems using bulkWrite
6- delete user cart
*/
export const createCashOrder = (async (req: Request, res: Response, next: NextFunction) => {
    const taxPrice: number = 100;
    const cart: any = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) { return next(new ApiError("you don't have cart to checkout", 400)) };
    const order = await ordersModel.create({
        items: cart.items,
        taxPrice,
        totalPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice,
        address: req.body.address,
        user: req.user?._id
    });
    const bulkOption = cart.items.map((item: cartItems) => ({
        updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
        },
    }))
    await productsModel.bulkWrite(bulkOption);
    await cartsModel.deleteOne({ user: req.user?._id });
    res.status(200).json({ data: order })
});

// update order paid
export const payOrder = (async (req: Request, res: Response, next: NextFunction) => {
    const order = await ordersModel.findByIdAndUpdate(req.params.id, {
        isPaid: true,
        paidAt: Date.now()
    }, { new: true })
    res.status(200).json({ data: order })
});

// update order delivered
export const deliverOrder = (async (req: Request, res: Response, next: NextFunction) => {
    const order = await ordersModel.findByIdAndUpdate(req.params.id, {
        isDelivered: true,
        deliveredAt: Date.now()
    }, { new: true })
    res.status(200).json({ data: order })
});