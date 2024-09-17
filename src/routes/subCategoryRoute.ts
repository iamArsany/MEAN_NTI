import { Response, Request, NextFunction, Router } from "express";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../controllers/subCategoriesController";
import IfilterData from "../interfaces/Filterdata";
import { validateResult } from "../utils/validation/validationmiddleware";
import { createSubCategoryValidationRules, deleteSubCategoryValidationRules, getAllSubCategoriesValidationRules, getSubCategoryByIdValidationRules, updateSubCategoryValidationRules } from "../utils/validation/SubcategoryValidator";

const subCategoriesRoute: Router = Router();

export const filterSubCategories = (req: Request, res: Response, next: NextFunction) => {
    const filterData: IfilterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
        req.filterData = filterData;
    }
    next();
}
subCategoriesRoute.route('/:id')
    .put(updateSubCategoryValidationRules, validateResult, updateSubcategory)
    .get(getSubCategoryByIdValidationRules, validateResult, getSubcategoryById)
    .delete(deleteSubCategoryValidationRules, validateResult, deleteSubcategory);

subCategoriesRoute.route('/')
    .get(getAllSubCategoriesValidationRules, filterSubCategories, validateResult, getAllSubcategories)
    .post(createSubCategoryValidationRules, validateResult, createSubcategory);

export default subCategoriesRoute;