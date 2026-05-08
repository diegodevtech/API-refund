import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";

const refundRouter = Router();
const refundController = new RefundController();

refundRouter.post("/", (req, res) => refundController.create(req, res));

export  { refundRouter };