import User from "../models/User";
import { IUserFields } from "../controllers/auth.controller";
import jwtGenerate from "../utils/jwtGenerate";
 
class UserService {
    async createUser({ username, email, password }: IUserFields) {
        const newUser = new User({ username, email, password });        
        await newUser.save();
        const token: string = jwtGenerate(newUser);
        return token;
    }

    async findUser(email: string) {
        return await User.findOne({ email });
    }
}

export default UserService;