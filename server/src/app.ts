require("dotenv").config();
import express from "express";
import Logger from "./misc/logger";

import issuesRouter from "./issues";
import usersRouter from "./users";

const app = express();
const port = 3000;

app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/", (req, res) => res.redirect("/issues"));

app.use(express.json());

app.listen(port, () => {
    Logger.log("app", `Server is running at http://localhost:${port}`);
});

app.use("/issues", issuesRouter);
app.use("/users", usersRouter);