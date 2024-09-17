import { CreateOne, deleteOne, getAll, getOne, updateOne } from "./genericCRUD";
import { SubCategories } from "../interfaces/subCategories";
import subcategoriesModel from "../models/subcategoriesModel";

export const getAllSubcategories=getAll<SubCategories>(subcategoriesModel,'subCategories');
export const createSubcategory =CreateOne<SubCategories>(subcategoriesModel);
export const getSubcategoryById =getOne<SubCategories>(subcategoriesModel,'subCategories');
export const updateSubcategory = updateOne<SubCategories>(subcategoriesModel,'subCategories');
export const deleteSubcategory = deleteOne<SubCategories>(subcategoriesModel,'subCategories');