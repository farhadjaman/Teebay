import { jwtSecret } from "@/config";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLResolveInfo } from "graphql";
import { extractSelection } from "../utils/extractSelections";

// Defining our input interfaces
interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const authService = {
  // Register
  async register({ email, password, name }: RegisterInput) {
    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      // Only select fields that we want to expose
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return {
      message: "User created successfully",
      user,
    };
  },

  // Login
  async login({ email, password }: LoginInput) {
    // Find user by email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret,
      { expiresIn: "2h" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  },

  // Get current
  async getCurrentUser(userId: string, info: GraphQLResolveInfo) {
    const selections = extractSelection(info);
    return prisma.user.findUnique({
      where: { id: userId },
      select: selections.reduce(
        (acc, selection) => ({
          ...acc,
          [selection]: true,
        }),
        {},
      ),
    });
  },
};
