import { Response } from "express";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import bcrypt from "bcrypt";
import ResponseFactory from "../factories/responses.factory";
import AuthService from "../services/auth.service";
import Request from "../types/Request";
import { IUser } from "../models/User";
import passHashGenerator from "../utils/passwordHash.js";
import jwtGenerate from "../utils/jwtGenerate";

export interface IUserFields {
    username: string;
    email: string;
    password: string;
}

const authService = new AuthService();

class AuthController {
    async createUser(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseFactory.validationResponse(errors.array());
        }

        const { email, password, username }: IUser = req.body;

        const hashPassword: string = await passHashGenerator(password);

        const userFields: IUserFields = { email, password: hashPassword, username };

        try {
            const user = await authService.findUser(email);
            
            if (user) {
                return res.status(HttpStatusCodes.CONFLICT).send("Account already created");
            }
            
            const token: string = await authService.createUser(userFields);

            res.status(HttpStatusCodes.ACCEPTED).json({ token });
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async loginUser(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseFactory.validationResponse(errors.array());
        }

        const { email, password }: IUser = req.body;

        try {
            const user = await authService.findUser(email);

            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(HttpStatusCodes.FORBIDDEN).send("Incorrect password or email");
            }

            const token = jwtGenerate(user);
            
            res.status(HttpStatusCodes.ACCEPTED).json({ token });
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export default AuthController;