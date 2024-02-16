import React, { /*useEffect,*/ useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";
import { ExpenseTableHeading } from "./ExpenseTableHeading";
//import axios from "axios";

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: grey;
  padding: 2vh 1vw;
  min-width: 96vw;
  border-radius: 20px;

  @media (max-width: 480px) {
    min-width: 92vw;
  }
`;

export const DisplayEachExpense = ({ expenses }) => {
  // const [cats, setCats] = useState([]);
  // const [toDate, setToDate] = useState("");
  // const [fromDate, setFromDate] = useState("2024-01-01");
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const queryString = `cats=${cats.join(
  //     ","
  //   )}&fromDate=${fromDate}&toDate=${toDate}`;
  //   async function getData() {
  //     try {
  //       const resData = await axios.get(
  //         `https://expense-server-db0x.onrender.com/api/expense/get-expense-data?${queryString}`,
  //         { withCredentials: true }
  //       );
  //       console.log(resData);
  //       setData(resData.data);
  //     } catch (err) {
  //       console.log(err);
  //       console.log(setCats);
  //       console.log(setFromDate);
  //       console.log(setToDate);
  //     }
  //   }

  //   getData();
  // }, []);

  useEffect(() => {
    setData(expenses);
  }, [expenses]);

  return (
    <DataWrapper>
      <ExpenseTableHeading col={"#faf8f8"} bgcol={"#333333"} />
      {data.map((expense, index) => (
        <ExpenseItem
          key={index}
          col={"#000000"}
          bgcol={index % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
          expense={expense}
        />
      ))}
    </DataWrapper>
  );
};
