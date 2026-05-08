import { Request, Response } from 'express';
import { Category as Categories, UserRole } from '@/generated/prisma/enums';
import { AppError } from '@/utils/AppError';
import { z } from 'zod';
import { prisma } from '@/database/prisma';

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

    if(!req.user || !req.user?.id) {
      throw new AppError('User not found', 404);
    }

    if(!req.user?.role || req.user?.role !== UserRole.EMPLOYEE) {
      throw new AppError('Unauthorized', 403);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user.id
      }
    })
    res.status(201).json(refund);
  }
}