import { CreateOne, deleteOne, getAll, getOne, updateOne } from "./genericCRUD";
import couponsModel from "../models/couponsModel";
import { Coupons } from "../interfaces/coupons";

export const getAllCoupons = getAll<Coupons>(couponsModel, 'coupons');
export const createCoupon = CreateOne<Coupons>(couponsModel);
export const getCoupon = getOne<Coupons>(couponsModel,'coupons');
export const updateCoupon = updateOne<Coupons>(couponsModel,'coupons')
export const deleteCoupon = deleteOne<Coupons>(couponsModel,'coupons')