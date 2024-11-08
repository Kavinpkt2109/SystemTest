import { UserRequestBody } from "../interface";
import jwt from "jsonwebtoken";
import { Request } from "express";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import repoClass from  '../Repository/respository'
dotenv.config();
class utils {
  async createToken(user: UserRequestBody) {
    const token = await jwt.sign(user.name, process.env.SECRETKEY!, {
      expiresIn: 2,
    });
    return token;
  }

  async verifyUser(req: Request) {
    const repos= new repoClass()
    let token = req.headers["authorization"]?.split(" ")[1];
    let verify = jwt.verify(token!, process.env.SECRETKEY!);
    if(req.body.name!=verify)
    {
        return false
    }
    else{
        let getUserData=  await repos.getUser(req.body.emailId)
        let comparePass= await bcrypt.compare(req.body.name,getUserData.password)
        return comparePass
    }
  }
}
export default new utils();
