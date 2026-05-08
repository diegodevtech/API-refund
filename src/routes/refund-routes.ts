import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";
import { verifyAuthorization } from "@/middlewares/verify-authorization";
import { UserRole } from "@/generated/prisma/enums";

const refundRouter = Router();
const refundController = new RefundController();

refundRouter.get("/", verifyAuthorization([UserRole.EMPLOYEE]), refundController.getAll);
refundRouter.get("/all", verifyAuthorization([UserRole.MANAGER]), refundController.managerGetAll);
refundRouter.get("/:id", verifyAuthorization([UserRole.EMPLOYEE]), refundController.getById);
refundRouter.post("/", verifyAuthorization([UserRole.EMPLOYEE]), refundController.create);

export  { refundRouter };