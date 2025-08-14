import e from "express";
import { addLogs, getLogs, getTrend, recentActivity } from "../controller/logs.controler.js";

const logRouter=e.Router()

logRouter.get("/", getLogs);
logRouter.get("/trend", getTrend);
logRouter.get('/recent-activity',recentActivity)
logRouter.post('/add-logs',addLogs)
export default logRouter