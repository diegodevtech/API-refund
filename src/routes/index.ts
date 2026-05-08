import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { refundRouter } from "./refund-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const router = Router();

// public routes
router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

// protected routes
router.use(ensureAuthenticated);
router.use("/refunds", refundRouter);

export { router };