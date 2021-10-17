import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import AppRouter from "./routes";
import axios from "axios";
import passport from "passport";
import passportConfig from "../config/passport";

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

passportConfig(passport);
app.use(passport.initialize());

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();


// TODO: Move that to model GraphQL
const schema = buildSchema(`
  type Query {
    todos: String
  }
`);


// TODO: Create graphQL controller
const rootValue = {
    todos: async () => {
    // TODO: Create http service for that
        const todos = await axios.get("http://localhost:5000/api/todos");
        return todos.data;
    }
};


// TODO: Move that to router init function
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));

const port = app.get("port");
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;