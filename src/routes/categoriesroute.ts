import { Router } from "express";
import { AddCategory, DeleteCategory, GetAllCategories, UpdateCategory } from "../controllers/categoriesController";

const categoriesRoute: Router = Router();

categoriesRoute.route("/:id")
    .put(UpdateCategory)
    .delete(DeleteCategory)

categoriesRoute.route("/")
    .get(GetAllCategories)
    .post(AddCategory);


export default categoriesRoute;