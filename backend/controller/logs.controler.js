export async function getLogs(req, res){
  const {
    page = 1,
    limit = 50,
    status,
    interfaceName,
    startDate,
    endDate,
    search,
    sortBy = "timestamp",
    order = "desc"
  } = req.query;

  const query = {};
  if (status) query.status = status;
  if (interfaceName) query.interfaceName = interfaceName;
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

  const logs = await InterfaceLog.find(query)
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await InterfaceLog.countDocuments(query);

  res.json({ logs, total });
};

export async function getSummary(req, res){
  const { startDate, endDate } = req.query;
  const query = {};

  if (startDate && endDate) {
    query.timestamp = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const successCount = await InterfaceLog.countDocuments({
    ...query,
    status: "success"
  });

  const failureCount = await InterfaceLog.countDocuments({
    ...query,
    status: "failure"
  });

  res.json({ successCount, failureCount });
};
