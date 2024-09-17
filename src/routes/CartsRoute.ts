import { Router } from 'express';
import { allowedTo, protectRoutes } from '../controllers/authController';
import { addProductToCart, applyCoupon, deleteUserCart, getUserCart, removeProductFromCart, updateProductQuantity } from '../controllers/cartsController';

const cartRoute: Router = Router()
cartRoute.use(protectRoutes, allowedTo('user'))
cartRoute.route('/')
    .get(getUserCart)
    .post(addProductToCart)
    .delete(deleteUserCart);
cartRoute.put('/applyCoupon', applyCoupon)
cartRoute.route('/:itemId')
    .put(updateProductQuantity)
    .delete(removeProductFromCart);

export default cartRoute;