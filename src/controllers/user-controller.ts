import { prisma } from '@/database/prisma';
import { UserRole } from '@/generated/prisma/enums';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from 'bcrypt';

export class UserController {
  async create(request: Request, response: Response) {
    const createUserSchema = z.object({
      name: z.string().trim().min(2, { message: "Name must be at least 2 characters long" }),
      email: z.email({ error: "Invalid email address" }).toLowerCase(),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
      role: z.enum([UserRole.EMPLOYEE, UserRole.MANAGER], { message: "Role must be either 'EMPLOYEE' or 'MANAGER'" }).default(UserRole.EMPLOYEE),
    });

    const { name, email, password, role } = createUserSchema.parse(request.body);

    const userWithEmailExists = await prisma.user.findUnique({ where: { email } });

    if (userWithEmailExists) {
      throw new AppError("A user with this email already exists", 409);
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    response.status(201).json({ message: `A new user for ${name} has been created` });
  }
}