import { Request, Response ,NextFunction} from "express";

export default interface callback {
    (req:Request,res:Response,next:NextFunction): Promise<boolean>
}