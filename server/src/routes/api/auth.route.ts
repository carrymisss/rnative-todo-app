import { Router } from "express";
import ValidatorFactory from "../../factories/validators.factory";
import AuthController from "../../controllers/auth.controller";

const userRouter: Router = Router();

const validatorFactory = new ValidatorFactory();
const authController = new AuthController();

userRouter.post("/signup", validatorFactory.signup(), authController.createUser);

userRouter.post("/login", validatorFactory.login(), authController.loginUser);

export default userRouter;