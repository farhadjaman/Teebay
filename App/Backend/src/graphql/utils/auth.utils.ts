import { Request } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";

interface JwtPayload {
  userId: string;
}

export const getUserFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return null;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
