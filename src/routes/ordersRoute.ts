import { Router } from "express";
import { allowedTo, protectRoutes } from "../controllers/authController";
import { createCashOrder, filterOrders, getOrder, getAllOrders, deliverOrder, payOrder } from "../controllers/ordersController";

const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes)

ordersRoute.route('/')
  .get(filterOrders, getAllOrders)
  .post(allowedTo('user'), createCashOrder);

ordersRoute.route('/:id').get( getOrder)

ordersRoute.use(allowedTo('manager', 'admin'))
ordersRoute.route('/:id/paid').put( payOrder)
ordersRoute.route('/:id/delivered').put( deliverOrder)

export default ordersRoute;