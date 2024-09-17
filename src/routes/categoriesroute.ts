import { Router } from "express";
import { AddCategory, DeleteCategory, GetAllCategories, GetoneCategory, UpdateCategory } from "../controllers/categoriesController";
import subCategoriesRoute from "./subCategoryRoute";
import { createCategoryValidationRules, getCategoryByIdValidationRules, updateCategoryValidationRules } from "../utils/validation/CategoryValidationRules";
import { validateResult } from "../utils/validation/validationmiddleware";

const categoriesRoute: Router = Router({ mergeParams: true });
categoriesRoute.use("/:categoryId/Subcategory", subCategoriesRoute);
categoriesRoute.route("/:id")
    .put(updateCategoryValidationRules,validateResult, UpdateCategory)
    .delete(DeleteCategory)
    .get(getCategoryByIdValidationRules, validateResult,GetoneCategory)

categoriesRoute.route("/")
    .post(createCategoryValidationRules,validateResult, AddCategory)
    .get(GetAllCategories);


export default categoriesRoute;