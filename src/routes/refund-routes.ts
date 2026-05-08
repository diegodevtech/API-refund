import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";
import { verifyAuthorization } from "@/middlewares/verify-authorization";
import { UserRole } from "@/generated/prisma/enums";

const refundRouter = Router();
const refundController = new RefundController();

refundRouter.post("/", verifyAuthorization([UserRole.EMPLOYEE]), refundController.create);

export  { refundRouter };