import prisma from "@/prisma";
import { UserCreateSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedBody = UserCreateSchema.safeParse(req.body);

    if (!parsedBody.success || !parsedBody.data) {
      res.status(400).json({ message: parsedBody.error.errors });
      return;
    }

    //check if user already exist
    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedBody.data?.email,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(parsedBody.data.password, salt);

    //create user
    const user = await prisma.user.create({
      data: {
        ...parsedBody.data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export default userRegistration;
