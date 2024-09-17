// src/utils/subCategoryValidationRules.ts
import { body, param, query } from 'express-validator';
import { Types } from 'mongoose';

export const createSubCategoryValidationRules = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid category ID'),
  body('image')
    .optional()
    .isString().withMessage('Image must be a string')
    .isURL().withMessage('Image must be a valid URL'),
];

export const updateSubCategoryValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid subcategory ID'),
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('category')
    .optional()
    .custom(value => Types.ObjectId.isValid(value)).withMessage('Invalid category ID'),
  body('image')
    .optional()
    .isString().withMessage('Image must be a string')
    .isURL().withMessage('Image must be a valid URL'),
];

export const getSubCategoryByIdValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid subcategory ID'),
];

export const deleteSubCategoryValidationRules = [
  param('id')
    .isMongoId().withMessage('Invalid subcategory ID'),
];

export const getAllSubCategoriesValidationRules = [
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
];