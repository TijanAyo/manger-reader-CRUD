import morgan from "morgan";
import express from "express";
import * as dotenv from "dotenv";

import index from "./routes/index.route.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false}));

// routes
app.use("/manga", index);

// Home
app.get("/", (_req, res) => {
    return res.status(200).json({statusCode: 200, message: `Manga Reader Example`});
});

// 404 route
app.get("*", (_req, res) => {
    return res.status(404).json({statusCode: 404, message: `Route not found`});
});

export default app;