import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import ExpenseItem from "./ExpenseItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ExpenseInput } from "./ExpenseInput";
import { DisplayEachExpense } from "./DisplayEachExpense";
import { GraphicalView } from "./GraphicalView";

const Container = styled.div`
  min-height: 100vh;
  background-color: #070119e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
  // overflow-y: visible;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2vh;
    max-width: 100vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TopDataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  font-size: 37px;
  flex-wrap: wrap;
  background-color: grey;
  margin-top: 2vh;
  padding: 2vh 1vw;
  min-width: 96vw;
  border-radius: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1vw;
    font-size: 25px;
    min-width: 92vw;
  }
`;

const TopDataGroup = styled.div`
  display: flex;
  gap: 1vw;
  @media (max-width: 480px) {
    width: 90vw;
    justify-content: space-around;
  }
`;
const TopDataItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
`;

const TopDataItemHeading = styled.div`
  color: #005e16fc;
  font-weight: 400;
`;

const TopData = styled.div`
  color: #210055;
  font-weight: 800;
`;

// const DataWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: grey;
//   padding: 2vh 1vw;
//   min-width: 96vw;
//   border-radius: 20px;
// `;

export const Home = () => {
  const [expenseData, setExpenseData] = useState({
    dailyExpenses: [],
    lastMonthTotalExpense: 0,
    lastOneYearExpense: 0,
    lastWeekTotalExpense: 0,
    monthlyExpense: [],
    thisMonthTotalExpense: 0,
    thisWeekTotalExpense: 0,
    todayExpense: [],
    todayTotalExpense: 0,
    yesterdayExpense: [],
    yesterdaytodayTotalExpense: 0,
    expenses: [],
  });
  const [error, setError] = useState("");
  const [updated, setUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExpense() {
      try {
        const expense = await axios.get(
          "http://localhost:5555/api/expense/get-expense",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json", // Replace with your token
            },
          }
        );
        setExpenseData(expense.data);
      } catch (err) {
        setError(err);
        console.log(error);
        navigate("/sign-in");
      }
    }
    fetchExpense();
  }, [updated]);

  useEffect(() => {
    console.log("expense are: ");
    console.log(expenseData.expenses);
  }, [expenseData]);
  console.log("first");
  return (
    <>
      <Container>
        <TopDataWrapper>
          <TopDataGroup>
            <TopDataItems>
              <TopDataItemHeading>Today</TopDataItemHeading>
              <TopData>₹{expenseData.todayTotalExpense}</TopData>
            </TopDataItems>

            <TopDataItems>
              <TopDataItemHeading>Yesterday</TopDataItemHeading>
              <TopData>₹{expenseData.yesterdaytodayTotalExpense}</TopData>
            </TopDataItems>
          </TopDataGroup>

          <TopDataGroup>
            <TopDataItems>
              <TopDataItemHeading>This Week</TopDataItemHeading>
              <TopData>₹{expenseData.thisWeekTotalExpense}</TopData>
            </TopDataItems>

            <TopDataItems>
              <TopDataItemHeading>Last Week</TopDataItemHeading>
              <TopData>₹{expenseData.lastWeekTotalExpense}</TopData>
            </TopDataItems>
          </TopDataGroup>

          <TopDataGroup>
            <TopDataItems>
              <TopDataItemHeading>This Month</TopDataItemHeading>
              <TopData>₹{expenseData.thisMonthTotalExpense}</TopData>
            </TopDataItems>

            <TopDataItems>
              <TopDataItemHeading>Last Month</TopDataItemHeading>
              <TopData>₹{expenseData.lastMonthTotalExpense}</TopData>
            </TopDataItems>
          </TopDataGroup>

          <TopDataItems>
            <TopDataItemHeading>Last Year</TopDataItemHeading>
            <TopData>₹{expenseData.lastOneYearExpense}</TopData>
          </TopDataItems>
        </TopDataWrapper>
        <ExpenseInput setUpdate={setUpdate} />
        {/* <DataWrapper>
          <ExpenseItem
            color={"#faf8f8"}
            bgcol={"#333333"}
            amount={"Amount"}
            date={"Date"}
            category={"Category"}
            desc={"Description"}
          />

          {expenseData.todayExpense.map((exp, index) => (
            <ExpenseItem
              key={index} // Remember to add a unique key when mapping over an array
              color={"#000000"}
              bgcol={index % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
              amount={exp.amount}
              date={parseDate(exp.expenseDate)} //new Date(exp.expenseDate).toLocaleDateString()}
              category={exp.category}
              desc={exp.description}
            />
          ))}
        </DataWrapper> */}
        <DisplayEachExpense
          setUpdate={setUpdate}
          expenses={expenseData.expenses}
        />

        <GraphicalView
          dailyData={expenseData.dailyExpenses}
          monthlyData={expenseData.monthlyExpense}
        />
      </Container>
    </>
  );
};
