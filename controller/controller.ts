import repo from "../Repository/respository";
import { UserRequestBody, excelData } from "../interface";
import { Response, Request } from "express";
import util from "../utils/util";
import bcrypt from "bcrypt";
import * as xlsx from "xlsx";

class ControllerClass {
  RespoInstance;
  constructor(repo: repo) {
    this.RespoInstance = repo;
  }
  async validateUser(user: UserRequestBody, res: Response) {
    try {
      let { name, password, emailId } = user;
      let errors: string[] = [];
      if (!name || name.trim() == "") {
        errors.push("invalid username!! please provide valid one");
      }
      if (password.trim() == "" || !password) {
        errors.push("invalid password!! please provide valid one");
      }
      let getDbValue = await this.RespoInstance.getUser(emailId);
      if (getDbValue) {
        errors.push("user alrady exist in db");
      }
      if (errors.length) {
        res.status(404).send({ errors });
        return;
      }
      let hashPass = await bcrypt.hash(user.password, 100);
      let userData = {
        name: user.name,
        password: hashPass,
        emailId: user.emailId,
      };
      let createdUser = await this.RespoInstance.createUser(userData);
      let token = await util.createToken(user);
      res.status(200).send({
        token,
        createdUser,
      });
    } catch (err: any) {
      console.log("error in validateUser", err.message);
      res.status(500).send(err.message);
    }
  }

  async chatController(req: Request, res: Response) {
    try {
      const getWorkbook = xlsx.read(req.file, { type: "buffer" });
      const getWorkSheet = getWorkbook.Sheets[getWorkbook.SheetNames[0]];
      let error: string[] = [];
      let allData: excelData[] = xlsx.utils.sheet_to_json(getWorkSheet);
      for (let i = 0; i < allData.length; i++) {
        if (!allData[i]?.userName) {
          error.push("invalid userName in the file");
        }
        if (!allData[i]?.message) {
          error.push("invalid message in the file");
        }
      }
      if (error.length) {
        res.status(400).send({ error });
      }
      let createDoc = await this.RespoInstance.createChats(allData);
      res.status(200).send(createDoc);
    } catch (err: any) {
      console.log("error in charcontroller", err.message);
      res.status(500).send(err.message);
    }
  }

  async checkUserExist(req: Request, res: Response) {
    try {
      let checkUser = await this.RespoInstance.getUser(req.body.emailId);
      if (!checkUser) {
        res.status(400).send("user is not registered");
        return;
      }
      let comparePass: boolean = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (comparePass) {
        let token: string = await util.createToken(checkUser);
        res.status(200).send({ user: checkUser, token });
        return;
      } else {
        res.status(400).send("invalid password for the user");
      }
    } catch (error) {
      console.error(error, "in checkUserExist");
    }
  }

  async verifyStatus(req: Request, res: Response) {
    const { status } = req.params;
    if (!status ||(status != "completed" && status != "pending" && status != "asigned")) {
      res.status(400).send("invalid status for the request");
      return;
    } else {
      const getData=await this.RespoInstance.getMessages(status);
      res.status(200).send(getData)
      return;
    }
  }
}

export default ControllerClass;
