import { UserRequestBody, excelData } from "../interface";
import db from "../models";
class RepositoryClass {
  async createUser(user: UserRequestBody) {
    try {
      let createdUserRes: object = await db.user.create(user);
      return createdUserRes;
    }
    catch (err: any) {
      console.log("err in database", err.message);
      throw err;
    }
  }
  async getUser(emailId: string) {
    try {
      return await db.user.findOne({
        where: { email: emailId },
        exclude: ["createdAt", "updatedAt"],
      });
    }
    catch (err: any) {
      console.log("err in getUser", err.message);
      throw err;
    }
  }
  async createChats(chats: excelData[]) {
    try {
      return chats.map(async (val) => {
        let { id } = await db.chat.create(val);
        return id;
      });
    }
    catch (err: any) {
      console.log("err in createChats", err.message);
      throw err;
    }
  }
  async getMessages(status: string) {
    try {
      return await db.chat.findAll({ where: { status } });
    }
    catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}

export default RepositoryClass;
