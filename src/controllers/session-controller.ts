import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { authConfig } from "@/configs/auth";
import jwt from "jsonwebtoken"

export class SessionController {
  async create(req: Request, res: Response) {
    const createSessionSchema = z.object({
      email: z.email({ message: "Invalid email address" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });

    const { email, password } = createSessionSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });
    
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign(
      { role: user.role ?? "EMPLOYEE" }, 
      secret, 
      { subject: user.id, expiresIn }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });
  }

}