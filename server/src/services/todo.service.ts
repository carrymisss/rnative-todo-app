import Todo, { ITodo } from "../models/Todo";
import { IFiltersQueries, IPaginationsParams, ITodoFields } from "../controllers/todo.controller";

class TodoService {
    async createTodo (userId: string, { title, description, completion, privacy }: ITodoFields): Promise<string> {
        const newTodo = new Todo({ author: userId, title, description, completion, privacy });
        await newTodo.save();
        return "Todo created";
    }
    
    async updateTodo (todoId: string, { title, description, completion, privacy }: ITodoFields): Promise<string> {
        await Todo.findOneAndUpdate(
            { _id: todoId },
            { $set: { title, description, completion, privacy } }
        );
        return "Todo updated";
    }

    async findAllTodos (id: string, filtersQueries: IFiltersQueries, paginationsParams: IPaginationsParams): Promise<{ items: ITodo[]; count: number; }> {
        const query = {
            author: id,
            title: filtersQueries.search !== undefined ? new RegExp(filtersQueries.search, "gi") : { $exists: true },
            completion: filtersQueries.completion !== undefined ? filtersQueries.completion : { $exists: true },
            privacy: filtersQueries.privacy !== undefined ? filtersQueries.privacy : { $exists: true }
        };

        const items: ITodo[] = await Todo.find(query).skip(paginationsParams.offset).limit(paginationsParams.limit).sort({ date: -1 });
        const count: number = await Todo.countDocuments(query);

        return {
            items,
            count
        };
    }

    async findTodo ({ title, description, completion, privacy }: ITodoFields): Promise<any> {
        return await Todo.findOne({ title, description, completion, privacy });
    }

    async findTodoById (todoId: string): Promise<ITodo> {
        return await Todo.findOne({ _id: todoId });
    }

    async deleteTodo (todoId: string): Promise<string> {
        await Todo.findOneAndRemove({ _id: todoId });
        return "Todo deleted";
    }
}

export default TodoService;