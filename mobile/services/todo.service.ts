import HttpService from "./http.service";
import { IQueryParams, ITodoFormValues } from "../interfaces";

interface IPaginationsParams {
    offset: number;
    limit: number;
}

class TodoService extends HttpService {
    constructor(private token: string | null | undefined) {
        super();
        this.apiVersion = "api/todos";
    }
    
    getTodos({ search, completion, privacy }: IQueryParams, { offset, limit }: IPaginationsParams) {
        return this.get({
            headers: {
                "Authorization": this.token
            },
            url: `/?offset=${offset}&limit=${limit}&search=${search || ""}&completion=${completion === true ? true : completion === false ? false : ""}&privacy=${privacy || ""}`
        }, true);
    }
    
    createTodo(data: ITodoFormValues) {
        return this.post({
            headers: {
                "Authorization": this.token
            },
            url: "",
            data
        }, true);
    }

    editTodo(id: string, data: ITodoFormValues) {
        return this.put({
            headers: {
                "Authorization": this.token
            },
            url: "",
            data: { id, ...data }
        }, true);
    }

    deleteTodo(id: string) {      
        return this.delete({
            headers: {
                "Authorization": this.token
            },
            url: "",
            data: { id }
        }, true);
    }
}

export default TodoService;