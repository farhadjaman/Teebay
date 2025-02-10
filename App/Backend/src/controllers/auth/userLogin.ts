import { jwtSecret } from "@/config";
import prisma from "@/prisma";
import { UserLoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    const ipAddress =
      (req.headers["x-forwarded-for"] as string) || req.ip || "";
    const userAgent = req.headers["user-agent"] || "";
    console.log(
      `Login attempt from IP address: ${ipAddress} and User Agent: ${userAgent}`,
    );

    const parsedBody = UserLoginSchema.safeParse(req.body);

    if (!parsedBody.success || !parsedBody.data) {
      res.status(400).json({ message: parsedBody.error.errors });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: parsedBody.data.email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    //compare password
    const isMatch = await bcrypt.compare(
      parsedBody.data.password,
      user.password,
    );

    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    //generate token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret || "secret-test-2323",
      {
        expiresIn: "2h",
      },
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default userLogin;
