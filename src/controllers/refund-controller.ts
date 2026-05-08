import { Request, Response } from 'express';

export class RefundController {
  async create(req: Request, res: Response) {
    return res.status(201).json({ message: 'Refund created successfully' });
  }
}