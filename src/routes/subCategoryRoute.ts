import { Response,Request,NextFunction, Router } from "express";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../controllers/subCategoriesController";
import IfilterData from "../interfaces/Filterdata";

const subCategoriesRoute: Router = Router();
 
export const filterSubCategories=(req:Request,res:Response,next:NextFunction)=>{
    const filterData:IfilterData={};
    if(req.params.categoryId){
        filterData.category=req.params.categoryId;
        req.filterData=filterData;
    }
    next();
}
subCategoriesRoute.route('/:id')
    .get(getSubcategoryById)
    .put(updateSubcategory)
    .delete(deleteSubcategory);

subCategoriesRoute.route('/')
    .get(filterSubCategories,getAllSubcategories)
    .post(createSubcategory);

export default subCategoriesRoute;