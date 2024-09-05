import { Router } from "express";
import { AddCategory, DeleteCategory, GetAllCategories, UpdateCategory } from "../controllers/categoriesController";
import subCategoriesRoute from "./subCategoryRoute";

const categoriesRoute: Router = Router({mergeParams:true});
categoriesRoute.use("/:categoryId/Subcategory",subCategoriesRoute);
categoriesRoute.route("/:id")
    .put(UpdateCategory)
    .delete(DeleteCategory)

categoriesRoute.route("/")
    .get(GetAllCategories)
    .post(AddCategory);


export default categoriesRoute;