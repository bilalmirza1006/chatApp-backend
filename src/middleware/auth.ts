import { NextFunction, Request, Response } from "express"

const authMiddleware = async (req:Request , res:Response,  next:NextFunction) => {
    // 1. extract the token from the headers
    //2. if token is not present throw an error of unauthorized
    //3. token is present, verify the token and extract the payload
    //4. to get the user from the payloard
    //5. attach the user to the request object
    //6. call the next middleware in the stack



}

export default authMiddleware;