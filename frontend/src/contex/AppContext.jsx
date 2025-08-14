import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [Summary,setSummary]=useState(null)
  const [TrendData,setTrendData]=useState(null)
  const [Logs,setLogs]=useState(null)

  useEffect(()=>{
    getSummary()
    getLogs()
    getTrend()
  },[])

  async function getSummary(){
    try{
      let res=await axios.get("http://localhost:8000/api/get-summary")
      console.log(res.data)
      setSummary(res.data)
    }
    catch(error){
      console.log(error)
    }
  }

  async function getTrend(){
    try{
      let res=await axios.get("http://localhost:8000/api/get-trend")
      console.log(res.data)
      setTrendData(res.data)
    }
    catch(error){
      console.log(error)
    }
  }

   async function getLogs(){
    try{
      let res=await axios.get("http://localhost:8000/api/get-logs")
      console.log(res.data)
      setTrendData(res.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const summary = {
    success: 450,
    failure: 50,
  };

  const trendData = [
    { date: "Aug 1", success: 80, failure: 5 },
    { date: "Aug 2", success: 75, failure: 10 },
    { date: "Aug 3", success: 90, failure: 7 },
    { date: "Aug 4", success: 85, failure: 3 },
    { date: "Aug 5", success: 100, failure: 8 },
  ];

  const logs = [
    {
      interfaceName: "Employee Sync",
      integrationKey: "EMP001",
      status: "SUCCESS",
      message: "Data transferred successfully",
      timestamp: "2025-08-12T10:00:00Z",
    },
    {
      interfaceName: "Payroll Update",
      integrationKey: "PAY001",
      status: "FAILURE",
      message: "Error connecting to target system",
      timestamp: "2025-08-12T11:30:00Z",
    },
    {
      interfaceName: "Leave Data Sync",
      integrationKey: "LEAVE001",
      status: "WARNING",
      message: "Partial data missing",
      timestamp: "2025-08-12T12:00:00Z",
    },
  ];

  return (
    <AppContext.Provider value={{ summary, trendData, logs }}>
      {children}
    </AppContext.Provider>
  );
};
