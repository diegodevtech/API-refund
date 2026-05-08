import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface ITokenPayload extends JwtPayload {
  role: string;
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    const decoded = jwt.verify(token, authConfig.jwt.secret);

    if (typeof decoded === "string" || typeof decoded.role !== "string" || typeof decoded.sub !== "string") {
      throw new AppError("Invalid token", 401);
    }

    const { role, sub: user_id } = decoded as ITokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();

  } catch {
    throw new AppError("Invalid token", 401);
  }
}