require("dotenv").config();
import express from "express";
import Logger from "./misc/logger";
import morgan from "morgan";
import cors from "cors";

import auth from "./session/auth";

import issuesRouter from "./issues";
import usersRouter from "./users";
import postsRouter from "./posts";
import sessionRouter from "./session";

const app = express();
const port = 3000;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));


auth(app);
app.use("/session", sessionRouter);

//routing
app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/", (req, res) => res.redirect("/issues"));
app.use("/issues", issuesRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
    Logger.log("app", `Server is running at \x1b[34mhttp://localhost:${port}`);
});