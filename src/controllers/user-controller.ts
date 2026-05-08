import { Request, Response } from 'express';

export class UserController {
  async create(request: Request, response: Response) {
    response.status(201).json({ message: 'User created successfully' });
  }
}