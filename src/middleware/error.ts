import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

// export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
//     res.status(error.statusCode).json({
//         message: error.message,
//         errorCode: error.errorCode,
//         error: error.errors
//     })
// }


export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode >= 400 && error.statusCode < 600 ? error.statusCode : 500;
    res.status(statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        error: error.errors
    });
};
