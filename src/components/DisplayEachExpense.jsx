import React from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";
import { ExpenseTableHeading } from "./ExpenseTableHeading";

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: grey;
  padding: 2vh 1vw;
  min-width: 96vw;
  border-radius: 20px;
`;

export const DisplayEachExpense = ({
  todayExpenseData,
  yesterdayExpenseData,
  setUpdate,
}) => {
  console.log(todayExpenseData);

  return (
    <DataWrapper>
      {/* <ExpenseItem
        color={"#faf8f8"}
        b
        amount={"Amount"}
        date={"Date"}
        category={"Category"}
        desc={"Description"}
      /> */}

      <ExpenseTableHeading col={"#faf8f8"} bgcol={"#333333"} />

      {todayExpenseData.map((expense, index) => (
        <ExpenseItem
          key={index} // Remember to add a unique key when mapping over an array
          col={"#000000"}
          bgcol={index % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
          expense={expense}
          setUpdate={setUpdate}
        />
      ))}

      {yesterdayExpenseData.map((expense, index) => (
        <ExpenseItem
          key={index} // Remember to add a unique key when mapping over an array
          color={"#000000"}
          bgcol={index % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
          expense={expense}
          setUpdate={setUpdate}
        />
      ))}
    </DataWrapper>
  );
};
