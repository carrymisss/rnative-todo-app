import jwt from "jsonwebtoken";
import config from "config";
import { IUser } from "../models/User";

export default (user: IUser): string => {    
    const token = jwt.sign(
        {
            sub: user._id,
            iat: Date.now()
        },
        config.get("jwtSecret"),
        {
            expiresIn: "1d",
            algorithm: "HS256"
        }
    );

    return "jwt " + token;
};