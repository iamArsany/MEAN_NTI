// src/utils/productValidationRules.ts
import { body, param, query } from 'express-validator';
import { Types } from 'mongoose';

export const createProductValidationRules = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 255 }).withMessage('Name must be less than 255 characters'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
  body('price')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('Price after discount must be a number')
    .isFloat({ min: 0 }).withMessage('Price after discount must be a positive number')
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error('Price after discount must be less than or equal to the original price');
      }
      return true;
    }),
  body('stockQuantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('subcategory')
    .notEmpty().withMessage('Subcategory is required')
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid subcategory ID'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid category ID'),
  body('image')
    .optional()
    .isArray().withMessage('Image must be an array')
    .custom(value => value.every((url: string) => typeof url === 'string' && url.trim() !== ''))
    .withMessage('Each image must be a non-empty string'),
  body('cover')
    .optional()
    .isString().withMessage('Cover must be a string')
    .notEmpty().withMessage('Cover cannot be an empty string'),
];

export const updateProductValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({ max: 255 }).withMessage('Name must be less than 255 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('price')
    .optional()
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('Price after discount must be a number')
    .isFloat({ min: 0 }).withMessage('Price after discount must be a positive number')
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error('Price after discount must be less than or equal to the original price');
      }
      return true;
    }),
  body('stockQuantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('subcategory')
    .optional()
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid subcategory ID'),
  body('category')
    .optional()
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid category ID'),
  body('image')
    .optional()
    .isArray().withMessage('Image must be an array')
    .custom(value => value.every((url: string) => typeof url === 'string' && url.trim() !== ''))
    .withMessage('Each image must be a non-empty string'),
  body('cover')
    .optional()
    .isString().withMessage('Cover must be a string')
    .notEmpty().withMessage('Cover cannot be an empty string'),
];

export const getProductByIdValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
];

export const deleteProductValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
];

export const getAllProductsValidationRules = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('sort')
    .optional()
    .isString().withMessage('Sort must be a string'),
  query('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID'),
  query('subcategory')
    .optional()
    .isMongoId().withMessage('Invalid subcategory ID'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Minimum price must be a non-negative number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Maximum price must be a non-negative number'),
];

export const updateProductStockValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
  body('stockQuantity')
    .isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
];

export const updateProductRatingValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
];