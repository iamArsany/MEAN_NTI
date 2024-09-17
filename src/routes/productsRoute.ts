import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductbyId, updateProduct } from "../controllers/productsController";
import { validateResult } from "../utils/validation/validationmiddleware";
import {
    createProductValidationRules,
    updateProductValidationRules,
    getProductByIdValidationRules,
    deleteProductValidationRules,
    getAllProductsValidationRules
} from "../utils/validation/ProductValidation";

const ProductsRoute: Router = Router();

ProductsRoute.route('/:id')
    .get(getProductByIdValidationRules, validateResult, getProductbyId)
    .put(updateProductValidationRules, validateResult, updateProduct)
    .delete(deleteProductValidationRules, validateResult, deleteProduct);

ProductsRoute.route('/')
    .get(getAllProductsValidationRules, validateResult, getAllProducts)
    .post(createProductValidationRules, validateResult, createProduct);

export default ProductsRoute;