import { Request, Response } from "express";
import { z } from "zod";

export class SessionController {
  async create(req: Request, res: Response) {
    res.status(201).json({ message: "Session created successfully" });
  }

}