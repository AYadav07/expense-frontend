import React from "react";
import styled from "styled-components";
import { ExpenseItem } from "./ExpenseItem";

const Container = styled.div`
  min-height: 100vh;
  background-color: #070119e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  overflow-y: visible;
`;

const TopDataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  font-size: 37px;
  flex-wrap: wrap;
  background-color: #2f4f4f;
  margin-top: 2vh;
  padding: 3vh 2vw;
`;

const TopDataItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
`;

const TopDataItemHeading = styled.div`
  color: #f87b06df;
  font-weight: 400;
`;

const TopData = styled.div`
  color: #ff0000;
  font-weight: 800;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  padding: 2vh 2vw;
  background-color: #12042e;
  flex-wrap: wrap;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: grey;
  padding: 2vh 1vw;
`;

const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1vh;
`;

const Label = styled.label`
  color: orange;
  font-size: 30px;
`;

const Input = styled.input`
  width: 16vw;
  height: 2vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
`;

const Button = styled.button`
  padding: 2vh 2vw;
  font-size: 25px;
  font-weight: 500;
  background-color: teal;
  color: yellow;
  border-radius: 10px;
  cursor: pointer;
`;

export const Home = () => {
  return (
    <>
      <Container>
        <TopDataWrapper>
          <TopDataItems>
            <TopDataItemHeading>Today</TopDataItemHeading>
            <TopData>$123</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>Yesterday</TopDataItemHeading>
            <TopData>$254</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>This Week</TopDataItemHeading>
            <TopData>$1350</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>Last Week</TopDataItemHeading>
            <TopData>$1653</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>This Month</TopDataItemHeading>
            <TopData>$3590</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>Last Month</TopDataItemHeading>
            <TopData>$7896</TopData>
          </TopDataItems>

          <TopDataItems>
            <TopDataItemHeading>Last Year</TopDataItemHeading>
            <TopData>$98368</TopData>
          </TopDataItems>
        </TopDataWrapper>
        <InputWrapper>
          <InputItems>
            <Label>Amount</Label>
            <Input />
          </InputItems>
          <InputItems>
            <Label>Category</Label>
            <Input />
          </InputItems>
          <InputItems>
            <Label>Description</Label>
            <Input />
          </InputItems>
          <InputItems>
            <Label>Date</Label>
            <Input />
          </InputItems>
          <InputItems>
            <Button>Add Expense</Button>
          </InputItems>
        </InputWrapper>
        <DataWrapper>
          <ExpenseItem color={"red"} />
          <ExpenseItem color={"blue"} />
          <ExpenseItem color={"green"} />
          <ExpenseItem color={"red"} />
          <ExpenseItem color={"blue"} />
        </DataWrapper>
      </Container>
    </>
  );
};
