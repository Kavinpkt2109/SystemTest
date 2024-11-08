import { UserRequestBody, excelData } from "../interface";
import db from "../models";
class RepositoryClass {
  async createUser(user: UserRequestBody) {
    try {
      let createdUserRes: object = await db.user.create(user);
      return createdUserRes;
    } catch (err: any) {
      console.log("err in database", err.message);
      throw err

    }
  }

  async getUser(emailId: string) {
    try {
      return await db.user.getOne({ where: { email: emailId } });
    } catch (err: any) {
      console.log("err in getUser", err.message);
      throw err
    }
  }

  async createChats(chats: excelData[]) {
    try {
      chats.map(async (val) => {
        let { id } = await db.chat.create(val);
        return id;
      });
    } catch (err: any) {
        console.log("err in createChats", err.message);
        throw err
    }
  }
}

export default RepositoryClass;
