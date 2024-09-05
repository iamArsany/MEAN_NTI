import { Request, Response, NextFunction } from "express";
import ErrorInterface from "../interfaces/ErrorInterface"; 

export const globalErrorHandler = (err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ||505 ;
    const status = err.status || "error";
    const message = err.message || "An unexpected error occurred.";
    return res.status(statusCode).send({
        "status":status,
        "message":message,
    });
};
