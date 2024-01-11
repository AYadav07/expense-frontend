import React from "react";
import { BarChart } from "./BarChart";

export const GraphicalView = ({ dailyData, monthlyData }) => {
  const wordsMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function dailyDataConversion(dailyData) {
    let newDailyData = [];
    let days = 30;
    let dataIndex = 0;
    let now = new Date();
    let date = now.getDate();

    while (days > 0) {
      if (
        dataIndex < dailyData.length &&
        dailyData[dataIndex]["date"] === date
      ) {
        newDailyData.push({ label: date, amount: dailyData[dataIndex].amount });
        dataIndex++;
      } else {
        newDailyData.push({ label: date, amount: 0 });
      }
      date--;
      if (date <= 0) {
        now.setDate(0);
        date = now.getDate();
      }
      days--;
    }

    return newDailyData;
  }

  function monthDataConversion(monthData) {
    let newMonthData = [];
    let months = 12;
    let dataIndex = 0;
    let now = new Date();
    let month = now.getMonth();

    while (months > 0) {
      if (
        dataIndex < monthData.length &&
        monthData[dataIndex]["month"] === month
      ) {
        newMonthData.push({
          label: wordsMonth[month],
          amount: monthData[dataIndex].amount,
        });
        dataIndex++;
      } else {
        newMonthData.push({ label: wordsMonth[month], amount: 0 });
      }
      month--;
      if (month < 0) {
        month = 11;
      }
      months--;
    }

    return newMonthData;
  }

  const newDailyData = dailyDataConversion(dailyData);
  const newMonthlyData = monthDataConversion(monthlyData);
  console.log(newMonthlyData);

  return (
    <div>
      <BarChart data={newDailyData} />
      <BarChart data={newMonthlyData} />
    </div>
  );
};
