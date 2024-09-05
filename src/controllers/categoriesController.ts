import { Request, Response, NextFunction } from "express";
import categoriesModel from "../models/categoriesModel";
import { Categories } from "../interfaces/categories";
import { CreateOne, deleteOne, getAll, updateOne } from "./genericCRUD";

export const GetAllCategories = getAll<Categories>(categoriesModel, 'categories');
export const AddCategory = CreateOne<Categories>(categoriesModel);
export const UpdateCategory = updateOne<Categories>(categoriesModel, 'categories');
export const DeleteCategory = deleteOne<Categories>(categoriesModel, 'categories');