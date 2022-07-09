import { NextFunction, Request, Response } from "express";

import Unauthorized from "../errors/Unauthorized";
import jwt from "jsonwebtoken";

export async function authenticateToken(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    throw new Unauthorized("You must be logged in to access this resource");

  const token = authHeader?.replace("Bearer ", "");
  if (!token)
    throw new Unauthorized("You must be logged in to access this resource");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    res.locals.user = user;
  } catch (error) {
    throw new Unauthorized("You must be logged in to access this resource");
  }
  _next();
}