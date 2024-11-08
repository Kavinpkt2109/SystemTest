import db from "./models";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import controller from "./controller/controller";
import repo from "./Repository/respository";
import utils from "./utils/util";
import multer = require("multer");
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

app.post("/registerUser", async (req: Request, res: Response) => {
  await controllerInstance.validateUser(req.body, res);
});

const upload = multer();
app.post("/postChat", upload.single("excelFile"), async (req, res) => {
  let check = await utils.verifyUser(req);
  if (check) {
   await controllerInstance.chatController(req,res);
  }
  else{
    res.status(401).send("Invalid token or password")
    return;
  }
});
