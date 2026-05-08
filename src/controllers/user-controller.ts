import { UserRole } from '@/generated/prisma/enums';
import { Request, Response } from 'express';
import { z } from 'zod';

export class UserController {
  async create(request: Request, response: Response) {
    const createUserSchema = z.object({
      name: z.string().trim().min(2),
      email: z.email({ error: "Invalid email address" }).toLowerCase(),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
      role: z.enum([UserRole.EMPLOYEE, UserRole.MANAGER], { message: "Role must be either 'EMPLOYEE' or 'MANAGER'" }).default(UserRole.EMPLOYEE),
    });

    const { name, email, password, role } = createUserSchema.parse(request.body);
    response.status(201).json({ name, password, email, role });
  }
}