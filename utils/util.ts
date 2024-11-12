import { UserRequestBody } from "../interface";
import jwt from "jsonwebtoken";
import { NextFunction, Request } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import repoClass from "../Repository/respository";
dotenv.config();
class utils {
  async createToken(user: UserRequestBody) {
    const token = await jwt.sign(user.emailId, process.env.SECRETKEY!, {
      expiresIn: 2,
    });
    return token;
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]?.split(" ")[1];
    let verify = jwt.verify(token!, process.env.SECRETKEY!);
    if (req.body.emailId != verify) {
      next();
      return true
    }
  }
}
export default new utils();
