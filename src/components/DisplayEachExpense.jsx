import React, { /*useEffect,*/ useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";
import { ExpenseTableHeading } from "./ExpenseTableHeading";
import { Filter } from "./Filter";
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

const Button = styled.button`
  background-color: #706f6f;
  color: #353131;
  width: 7vw;
  padding: 1vh 1vw;
  cursor: pointer;
  margin-bottom: 1vh;
  margin-left: auto;
  margin-right: 1vw;
  border: none;
  border-radius: 10px;

  @media (max-width: 480px) {
    width: 20vw;
    margin-left: auto;
    margin-right: 1vw;
  }
`;

export const DisplayEachExpense = ({ setUpdate, expenses }) => {
  // const [cats, setCats] = useState([]);
  // const [toDate, setToDate] = useState("");
  // const [fromDate, setFromDate] = useState("2024-01-01");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  // useEffect(() => {
  //   const queryString = `cats=${cats.join(
  //     ","
  //   )}&fromDate=${fromDate}&toDate=${toDate}`;
  //   async function getData() {
  //     try {
  //       const resData = await axios.get(
  //         `http://localhost:5555/api/expense/get-expense-data?${queryString}`,
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
    if (!filter) {
      setData(expenses);
    }
  }, [filter]);

  useEffect(() => {
    setData(expenses);
  }, [expenses]);

  return (
    <DataWrapper>
      {filter ? (
        <Filter setData={setData} setFilter={setFilter} />
      ) : (
        <Button onClick={() => setFilter(true)}>Use Filter</Button>
        //<button onClick={() => setFilter(true)}> Use Filter</button>
      )}
      <ExpenseTableHeading col={"#faf8f8"} bgcol={"#333333"} />
      {data.map((expense, index) => (
        <ExpenseItem
          key={index}
          col={"#000000"}
          bgcol={index % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
          expense={expense}
          setUpdate={setUpdate}
        />
      ))}
    </DataWrapper>
  );
};
