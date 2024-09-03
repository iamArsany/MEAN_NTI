import { Router } from "express";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../controllers/subCategoriesController";

const subCategoriesRoute: Router = Router();

subCategoriesRoute.route('/:id')
    .get(getSubcategoryById)
    .put(updateSubcategory)
    .delete(deleteSubcategory);

subCategoriesRoute.route('/')
    .get(getAllSubcategories)
    .post(createSubcategory);

export default subCategoriesRoute;