import { Request,Response,NextFunction } from "express"
import subcategories from "../models/subcategoriesModel"
import categories from "../models/categoriesModel";
import mongoose from "mongoose";
export const getAllSubcategories=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const subCategoriesdata=await subcategories.find();
        return res.status(200).send({"data":subCategoriesdata});
    } catch (error) {
        res.status(500).send({"error":error});
        console.error(error);
    }
}


export const createSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, image } = req.body;

        // Validate the category ObjectId
        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).send({ message: "Invalid category ID" });
        }

        // Optional: Check if the category actually exists
        const categoryExists = await categories.findById(category);
        if (!categoryExists) {
            return res.status(404).send({ message: "Category not found" });
        }

        const newSubcategory = new subcategories({
            name,
            category,
            image
        });

        const savedSubcategory = await newSubcategory.save();
        return res.status(201).send({ data: savedSubcategory, message: "Subcategory created successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal server error while creating subcategory" });
        console.error(error);
    }
};

export const getSubcategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const subcategory = await subcategories.findById(id).populate('category');

        if (!subcategory) {
            return res.status(404).send({ message: "Subcategory not found" });
        }

        return res.status(200).send({ data: subcategory });
    } catch (error) {
        res.status(500).send({ error: "Internal server error while fetching subcategory" });
        console.error(error);
    }
};

export const updateSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSubcategory = await subcategories.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true 
        }).populate('category');

        if (!updatedSubcategory) {
            return res.status(404).send({ message: "Subcategory not found" });
        }

        return res.status(200).send({ data: updatedSubcategory, message: "Subcategory updated successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal server error while updating subcategory" });
        console.error(error);
    }
};

export const deleteSubcategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const deletedSubcategory = await subcategories.findByIdAndDelete(id);

        if (!deletedSubcategory) {
            return res.status(404).send({ message: "Subcategory not found" });
        }

        return res.status(202).send({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: "Internal server error while deleting subcategory" });
        console.error(error);
    }
};

