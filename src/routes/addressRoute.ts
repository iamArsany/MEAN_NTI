import { Router } from 'express';
import { allowedTo, protectRoutes } from '../controllers/authController';
import { addAddress, deleteAddress, getUserAddress } from '../controllers/addressController';

const addressRoute: Router = Router()
addressRoute.use(protectRoutes, allowedTo('user'))
addressRoute.route('/')
  .get(getUserAddress)
  .post(addAddress)

addressRoute.route('/:addressId')
  .delete(deleteAddress);

export default addressRoute;