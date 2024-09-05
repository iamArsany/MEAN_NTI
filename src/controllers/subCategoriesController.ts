import { CreateOne, deleteOne, getAll, getOne } from "./genericCRUD";
import { SubCategories } from "../interfaces/subCategories";
import subcategoriesModel from "../models/subcategoriesModel";

export const getAllSubcategories=getAll<SubCategories>(subcategoriesModel,'subCategories');
export const createSubcategory =CreateOne<SubCategories>(subcategoriesModel);
export const getSubcategoryById =getOne<SubCategories>(subcategoriesModel,'subCategories');
export const updateSubcategory = getOne<SubCategories>(subcategoriesModel,'subCategories');
export const deleteSubcategory = deleteOne<SubCategories>(subcategoriesModel,'subCategories');