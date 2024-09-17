import { Request, Response, NextFunction } from "express";
import { getAll, getOne, CreateOne, updateOne, deleteOne } from "../controllers/genericCRUD";
import Product from "../models/productsModel";
import Products from "../interfaces/Product";
import Features from "../utils/Features";

export const getAllProducts = getAll<Products>(Product, "Product", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const features = new Features(Product, req.query);

        if (req.query.limitFields) {
            features.limitFields(req.query.limitFields as string);
        } else {
            if (req.query.search) {
                features.search(req.query.search as string, ['name', 'description']);
            }

            if (req.query.sort) {
                features.sort(req.query.sort as string);
            }

            await features.paginate();

        }
        const searchResults = await features.execute();
        res.status(200).send({
            result: searchResults,
            pagination: features.paginationResult
        });
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        res.status(500).send({ error: "An error occurred while processing your request" });
    }
    return false;
});


export const getProductbyId = getOne<Products>(Product, "Product");
export const createProduct = CreateOne<Products>(Product);
export const updateProduct = updateOne<Products>(Product, "Product");
export const deleteProduct = deleteOne<Products>(Product, "Product");

console.log("type of ", typeof Product);