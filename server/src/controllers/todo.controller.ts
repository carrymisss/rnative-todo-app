import { Response } from "express";
import { validationResult } from "express-validator/check";
import Request from "../types/Request";
import TodoService from "../services/todo.service";
import Todo, { ITodo } from "../models/Todo";
import ResponseFactory from "../factories/responses.factory";
import Privacy from "../types/Privacy";

export interface ITodoFields {
    title: string;
    description: string;
    completion: boolean;
    privacy: Privacy;
}

export interface IFiltersQueries {
    search: string | undefined;
    completion: boolean | undefined;
    privacy: Privacy | undefined;
}

export interface IPaginationsParams {
    offset: number;
    limit: number; 
}

const todoService = new TodoService();

class TodoController {
    async createTodo(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseFactory.validationResponse(errors.array());
        }

        const { title, description, completion, privacy }: ITodo = req.body;

        const todoFields: ITodoFields = { title, description, completion, privacy };

        responseFactory.execute(async () => {
            return await todoService.createTodo(req.user._id, todoFields);
        });
    }

    async updateTodo(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);        

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseFactory.validationResponse(errors.array());
        }

        const { title, description, completion, privacy }: ITodo = req.body;

        const todoFields: ITodoFields = { title, description, completion, privacy };

        await responseFactory.checkForExistance(Todo, req.body.id, async () => {
            return await todoService.updateTodo(req.body.id, todoFields);
        });
    }

    async getAllTodo(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);

        const { search, completion, privacy, offset, limit } = req.query;

        if (!offset || !limit) {
            return responseFactory.internalServerError(new Error("Offset and Limit in params required"));
        }

        const filtersQueries: IFiltersQueries = { 
            search: search ? search.toString() : undefined,
            completion: completion === "true" ? true : completion === "false" ? false : undefined,
            privacy: privacy === "private" ? "private" : privacy === "public" ? "public" : undefined
        };

        const paginationsParams: IPaginationsParams = {
            offset: Number(offset),
            limit: Number(limit)
        };

        responseFactory.execute(async () => {
            return await todoService.findAllTodos(req.user._id, filtersQueries, paginationsParams);
        });
    }

    async getTodoById(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);

        await responseFactory.checkForExistance(Todo, req.params.id, async () => {
            return await todoService.findTodoById(req.params.id);
        });
    }

    async deleteTodo(req: Request, res: Response) {
        const responseFactory = new ResponseFactory(res);
        
        await responseFactory.checkForExistance(Todo, req.body.id, async () => {
            return await todoService.deleteTodo(req.body.id);
        });
    }
}

export default TodoController;