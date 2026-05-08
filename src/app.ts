import express from "express";
import cors from "cors";

import { errorHandlingMiddleware } from "@/middlewares/error-handling";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
 });

app.use(errorHandlingMiddleware);

export { app };