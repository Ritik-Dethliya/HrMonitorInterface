import e from "express";
import { getLogs, getSummary } from "../controller/logs.controler.js";

const logRouter=e.Router()

logRouter.get("/", getLogs);
logRouter.get("/summary", getSummary);

export default logRouter