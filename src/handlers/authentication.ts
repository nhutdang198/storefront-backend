import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/users";

async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body as unknown as {
      username: string;
      password: string;
    };
    const user = await User.getUserByUsername(username);
    let isMatch = false;
    if (user) {
      const match = await bcrypt.compare(password, user.password as string);
      if (match) {
        isMatch = true;
      }
    }
    if (isMatch) {
      const token = jwt.sign(
        { userId: user?.id },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "7d" }
      );
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { loginUser };
