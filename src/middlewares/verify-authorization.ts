import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function verifyAuthorization(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.role;

    if (!userRoles) {
      throw new AppError("User roles not found", 401);
    }

    const hasPermission = roles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      throw new AppError("Only EMPLOYEES can perform this action", 403);
    }

    next();
  };
}