import { Response } from "express";
import HttpStatusCodes from "http-status-codes";

interface IResponse extends Response {
    status(code: number): any;
    json(e: object): any;
    send(data: string): any;
}

class ResponseFactory {
    constructor(
        private response: IResponse,
        private code: number = 200
    ) {}

    internalServerError(error: Error): Response {
        console.log(error);
        this.code = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        return this.response.status(this.code).send(error.message);
    }

    validationResponse(errors: any[]): Response {
        this.code = HttpStatusCodes.BAD_REQUEST;
        return this.response.status(this.code).send(
            errors.map((el: any) => {
                return el.msg;
            })
        );
    }

    async checkForExistance(entity: any, id: string, callback: any) {
        try {
            const record = await entity.findOne({ _id: id });

            if(!record) {
                this.code = HttpStatusCodes.NOT_FOUND;
                return this.response.send("It doesn't exist");
            }

            await this.execute(callback);
        } catch (error) {
            this.internalServerError(error);
        }
    }
    

    async execute(command: any) {
        try {
            const result: any = await command();

            return this.response.send(result);
        } catch(error) {
            this.internalServerError(error);
        }
    }
}

export default ResponseFactory;
