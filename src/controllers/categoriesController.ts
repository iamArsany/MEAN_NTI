import { Request, Response, NextFunction } from "express";
import categoriesModel from "../models/categoriesModel";
import { Categories } from "../interfaces/categories";

export const GetAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories: Categories[] = await categoriesModel.find();
    res.status(200).send({ data: categories });
}

export const AddCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.name, " ", req.body.image);
        const newCategory = new categoriesModel(req.body);
        console.log(req.body);

        await newCategory.save();
        return res.status(201).send({ "succed": "true" })
    }
    catch (err) {
        console.log(err);
        res.status(5000).send("internal server error while adding category")
    }

}

export const UpdateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const updated=await categoriesModel.updateOne({ _id:id }, {name:req.body.name,image:req.body.image});
        return res.status(200).send({"succed":"true","data":{updated}});
    } catch (err) {
        console.error(err);
        res.status(500).send("interanl server error while updating");
    }
}

export const DeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;

        const deletedCategory = await categoriesModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).send({ "succeed": "false", "message": "Category not found" });
        }

        return res.status(202).send({ "succeed": "true", "message": "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ "error": "Internal server error while deleting" });
        console.error(error);
    }
};