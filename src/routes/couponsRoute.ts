import { Router } from 'express';
import { allowedTo, protectRoutes } from '../controllers/authController';
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from '../controllers/couponsController';

const couponsRoute: Router = Router()
couponsRoute.use(protectRoutes, allowedTo('manager', 'admin'))
couponsRoute.route('/')
  .get(getAllCoupons)
  .post( createCoupon);

couponsRoute.route('/:id')
  .get( getCoupon)
  .put( updateCoupon)
  .delete( deleteCoupon);

export default couponsRoute;