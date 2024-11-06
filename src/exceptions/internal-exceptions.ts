import { HttpException } from "./root";

export class InternalException extends HttpException{
    constructor(message: string, error: any, errorcode: number){
        super(message, errorcode,500, error);
        
    }
}