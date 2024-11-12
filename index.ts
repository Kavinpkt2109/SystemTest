import db from "./models";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import controller from "./controller/controller";
import repo from "./Repository/respository";
import utils from "./utils/util";
import multer = require("multer");
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";

dotenv.config();
const app: Express = express();
app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(process.env.RUNNING_PORT, () =>
    console.log("app is running in port", process.env.RUNNING_PORT)
  );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ["GET", "POST"]);
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});
const repoInstance = new repo();
const controllerInstance = new controller(repoInstance);

//sign up
app.post("/registerUser", async (req: Request, res: Response) => {
  await controllerInstance.validateUser(req.body, res);
});
//sign in
app.post("/signin", async (req: Request, res: Response) => {
  await controllerInstance.checkUserExist(req, res);
});

//create msg
const upload = multer();
function middleWare() {
  upload.single("excelFile");
  verifyToken;
}
app.post("/postChat", middleWare, async (req, res) => {
  await controllerInstance.chatController(req, res);
});
const verifyToken = async function (req: Request,res: Response, next: NextFunction) {
  let token = req.headers["authorization"]?.split(" ")[1];
  let verify = jwt.verify(token!, process.env.SECRETKEY!);
  if (req.body.emailId != verify) {
    next();
  }
};
app.get("/getMessage/:status", verifyToken, async (req, res) => {
  await controllerInstance.verifyStatus(req, res);
});
