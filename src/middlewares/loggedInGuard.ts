import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class UserGuardRequest {
  userId!: string;
  token!: string;
}

async function loggedInGuard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token =
    req?.headers?.authorization ||
    (req?.headers?.Authorization as string) ||
    "";
  if (!token) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  const jwtDecode = jwt.decode(token?.split(" ")?.[1]);
  if (!jwtDecode) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }
  const request = req as unknown as UserGuardRequest;
  request.userId = jwtDecode as string;
  request.token = token;
  next();
}

export { loggedInGuard };
