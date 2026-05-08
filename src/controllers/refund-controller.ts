import { Request, Response } from 'express';
import { Category as Categories } from '@/generated/prisma/enums';
import { z } from 'zod';

export class RefundController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2).max(255),
      category: z.enum([
        Categories.FOOD,
        Categories.SERVICES,
        Categories.TRANSPORT,
        Categories.ACCOMMODATION,
        Categories.OTHER
      ], { message: 'Invalid category' }),
      amount: z.number().positive({ message: 'Amount must be a positive number' }),
      filename: z.string().trim().min(1, { message: 'Filename is required' }),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);
    return res.json({ message: 'Ok' });
  }
}