import { Request, Response, NextFunction } from "express";
import categoriesModel from "../models/categoriesModel";
import { Categories } from "../interfaces/categories";
import { CreateOne, deleteOne, getAll, getOne, updateOne } from "./genericCRUD";
const callbackFunction = () => {
    console.log('Additional logic here after deleting the item');
};

export const AddCategory = CreateOne<Categories>(categoriesModel);

export const GetAllCategories = getAll<Categories>(categoriesModel, 'categories');
export const GetoneCategory = getOne<Categories>(categoriesModel, 'categories');
export const UpdateCategory = updateOne<Categories>(categoriesModel, 'categories');
export const DeleteCategory = deleteOne<Categories>(categoriesModel, 'categories')