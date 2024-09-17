import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import IfilterData from "../interfaces/Filterdata";
import callback from "../interfaces/callback";

export const getAll = <modelType>(model: Model<any>, modelName: string, callback?: callback) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let filterData: any = {};
            if (req.filterData) {
                filterData = req.filterData;
            }
            const Models: modelType[] = await model.find(filterData);
            if (callback) {
                let result=await callback(req,res,next);
                if (result===false)return ; 

            }
            res.status(200).json({ data: Models });
        } catch (error) {
            console.error(`Error fetching ${modelName}:`, error);
            next(error)
        }
    };

export const getOne = <modelType>(model: Model<any>, modelName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const document: modelType | null = await model.findById(id);
            if (!document) {
                return res.status(404).send({ message: `${modelName} not found` });
            }
            res.status(200).json({ data: document });
        } catch (error) {
            console.error(`Error fetching ${modelName}:`, error);
            next(error)
        }
    };

export const CreateOne = <modelType>(model: Model<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const created: modelType = await model.create(req.body);
            res.status(201).json({ message: "created successfully", data: created });
        } catch (error: any) {
            // console.error("Error creating document:",error);
            next(error);
        }
    };

export const updateOne = <modelType>(model: Model<any>, modelName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const updated = await model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!updated) {
                return res.status(404).send({ message: `${modelName} not found` });
            }
            res.status(200).json({ message: "updated successfully", data: updated });
        } catch (error) {
            console.error(`Error updating ${modelName}:`, error);
            next(error)
        }
    };
export const deleteOne = <modelType>(model: Model<any>, modelName: string, callback?: callback) =>
    async (req: Request, res: Response, next: NextFunction) => {
        if (callback) {
            if (!callback(req, res, next)) return;

        }
        console.log("iam here in the delete function")
        try {
            const id = req.params.id;
            const deleted = await model.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).send({ message: `${modelName} not found` });
            }
            res.status(202).json({ message: "deleted successfully" });
        } catch (error) {
            console.error(`Error deleting ${modelName}:`, error);
            next(error);
        }
    };
