import e from "express";
import { getLogs, getTrend } from "../controller/logs.controler.js";

const logRouter=e.Router()

logRouter.get("/", getLogs);
logRouter.get("/trend", getTrend);

export default logRouter