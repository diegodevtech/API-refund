import { Router } from "express";
import { userRoutes } from "./users-routes";

const router = Router();

// public routes
router.use("/users", userRoutes);

export { router };