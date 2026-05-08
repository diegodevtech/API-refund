import express from "express";
import cors from "cors";

import { errorHandlingMiddleware } from "@/middlewares/error-handling";
import { router } from "./routes";

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use(errorHandlingMiddleware);

export { app };