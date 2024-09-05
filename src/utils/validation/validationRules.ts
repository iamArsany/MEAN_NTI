// src/utils/validationRules.ts
import { body, param, query } from 'express-validator';

// Validation rules for creating a category
export const createCategoryValidationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 255 }).withMessage('Name must be less than 255 characters'),
    body('image')
        .optional()
        .isString().withMessage('Image URL must be a string')
        .isURL().withMessage('Image URL must be a valid URL'),
];

// Validation rules for updating a category
export const updateCategoryValidationRules = [
    param('id')
        .isMongoId().withMessage('Invalid category ID'),
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .isLength({ max: 255 }).withMessage('Name must be less than 255 characters'),
    body('image')
        .optional()
        .isString().withMessage('Image URL must be a string')
        .isURL().withMessage('Image URL must be a valid URL'),
];

// Validation rules for getting a category by ID
export const getCategoryByIdValidationRules = [
    param('id')
        .isMongoId().withMessage('Invalid category ID'),
];
