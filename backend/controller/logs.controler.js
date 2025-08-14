import InterfaceLogModel from "../models/interface.model.js"
export async function getLogs(req, res){
  const {
    page = 1,
    limit = 50,
    searchStatus,
    searchInterface,
    startDate,
    endDate,
    search,
    sortBy = "timestamp",
    order = "desc"
  } = req.query;

  const query = {};
  if (searchStatus) query.status = { $regex: `^${searchStatus}$`, $options: "i" };
  if (searchInterface) query.interfaceName = { $regex: searchInterface, $options: "i" }
  if (startDate && endDate) {
    query.timestamp = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  if (search) {
    query.$or = [
      { interfaceName: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } }
    ];
  }

  const sortQuery = {};
  sortQuery[sortBy] = order === "asc" ? 1 : -1;
  const total = await InterfaceLogModel.countDocuments(query);
  let logs;

if (total > 0 && total <= limit) {
 
  logs = await InterfaceLogModel.find(query)
    .sort(sortQuery)
    .limit(total);
} else {
  
  logs = await InterfaceLogModel.find(query)
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(Number(limit));
}

  

  res.json({ logs, total });
};


export async function getTrend(req, res) {
  try {
    const { range } = req.query;
    if (!["1h", "24h", "7d", "1m"].includes(range)) {
      return res.status(400).json({ error: "Invalid range value" });
    }

    // Calculate start date
    let startDate = new Date();
let endDate = new Date(); // defaults to now

if (range === "1h") {
  startDate.setHours(startDate.getHours() - 1);
}
if (range === "24h") {
  startDate.setHours(startDate.getHours() - 24);
}
if (range === "7d") {
  startDate.setDate(startDate.getDate() - 7);
}
if (range === "1m") {
  startDate.setMonth(startDate.getMonth() - 1);
}
let query={timestamp: { $gte: startDate, $lte: endDate }}
const summary = await InterfaceLogModel.aggregate([
  {
    $match: {
      timestamp: { $gte: startDate, $lte: endDate }
    }
  },
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
]);

console.log(summary);

    const summaryObj = { success: 0, failure: 0 ,warning:0};
    if (Array.isArray(summary)) {
      summary.forEach(item => {
        if (item._id === "success") summaryObj.success = item.count;
        if (item._id === "failure") summaryObj.failure = item.count;
        if(item._id==="warning")  summaryObj.warning=item.count;
      });
    }

    // Determine grouping granularity
    let groupId = {};
    if (range === "1h" || range === "24h") {
      groupId = {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: { $hour: "$timestamp" },
        status: "$status"
      };
    } else {
      groupId = {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        status: "$status"
      };
    }

    const trendData = await InterfaceLogModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: groupId,
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 } }
    ]);

    // Prepare labels and datasets
    const labels = [];
    const successData = [];
    const failureData = [];
    const warningData=[]

    trendData.forEach(item => {
      let label;
      if (item._id.hour !== undefined) {
        label = `${item._id.day}-${item._id.month} ${item._id.hour}:00`;
      } else {
        label = `${item._id.day}-${item._id.month}`;
      }

      if (!labels.includes(label)) labels.push(label);
    });

    labels.forEach(label => {
      const [dayMonth, hourPart] = label.split(" ");
      const [day, month] = dayMonth.split("-");

      const success = trendData.find(
        t =>
          t._id.day == day &&
          t._id.month == month &&
          (hourPart ? t._id.hour == parseInt(hourPart) : true) &&
          t._id.status === "success"
      );
      const failure = trendData.find(
        t =>
          t._id.day == day &&
          t._id.month == month &&
          (hourPart ? t._id.hour == parseInt(hourPart) : true) &&
          t._id.status === "failure"
      );
      const warning = trendData.find(
        t =>
          t._id.day == day &&
          t._id.month == month &&
          (hourPart ? t._id.hour == parseInt(hourPart) : true) &&
          t._id.status === "warning"
      );

      successData.push(success ? success.count : 0);
      failureData.push(failure ? failure.count : 0);
      warningData.push(warning ?warning.count:0 )
    });

    res.json({
      summary: summaryObj,
      labels,
      success: successData,
      failure: failureData,
      warning:warningData
    });
  } catch (error) {
    console.error("Error fetching trend:", error);
    res.status(500).json({ error: "Server error while fetching trend" });
  }
}

export async function recentActivity(req,res){
  try {
    const activity=await InterfaceLogModel.find().sort({timestamp:-1}).limit(5)
    res.status(200).send(activity)
  } catch (error) {
    console.log(error)
    res.status(500).send({"msg":"Something Went Wrong"})
  }
}

export async function addLogs(req,res){
  try {
    let newLog=await InterfaceLogModel.create(req.body)
    if(!newLog)return res.status(404).send({"msg":"unable to add log"})
    res.status(201).send({newLog})
  } catch (error) {
    console.log(error)
    res.status(500).send({"msg":"Something went Wrong in adding log"})
  }
}