import { Router } from "express";
import passport from "passport";
import TodoController from "../../controllers/todo.controller";
import ValidatorFactory from "../../factories/validators.factory";

const todosRouter: Router = Router();

const validatorFactory = new ValidatorFactory();
const todoController = new TodoController();

todosRouter.get("/", passport.authenticate("jwt", { session: false }), todoController.getAllTodo);

todosRouter.post("/", [passport.authenticate("jwt", { session: false }), validatorFactory.todo(),], todoController.createTodo);

todosRouter.put("/", [passport.authenticate("jwt", { session: false }), validatorFactory.todo(),], todoController.updateTodo);

todosRouter.get("/:id", passport.authenticate("jwt", { session: false }), todoController.getTodoById);

todosRouter.delete("/", passport.authenticate("jwt", { session: false }), todoController.deleteTodo);

export default todosRouter;