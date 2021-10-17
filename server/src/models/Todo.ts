import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";

export interface ITodo extends Document {
    title: string;
    description: string;
    author: IUser["_id"];
    completion: boolean;
    privacy: "public" | "private";
    date: Date;
}

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    privacy: {
        type: String,
        require: true
    },
    completion: {
        type: Boolean,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
