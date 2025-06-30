import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No or malformed Authorization header");
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    console.log("Auth Header:", authHeader);
    console.log("Decoded Token:", decoded);

    const [email, name] = decoded.split(':');

    if (!email || !name) {
      console.log("Invalid token format");
    } else {
      (req as any).user = { email, name };
    }
  } catch (err: any) {
    console.log("Failed to decode token:", err.message);
  }

  next();
}

export function generateToken(user: { name: string; email: string }) {
  return Buffer.from(`${user.email}:${user.name}`).toString('base64');
}