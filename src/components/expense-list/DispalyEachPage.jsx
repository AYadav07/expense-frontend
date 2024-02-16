import React from "react";
import ExpenseItem from "../ExpenseItem";
import { ExpenseTableHeading } from "../ExpenseTableHeading";
import styled from "styled-components";

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    min-width: 92vw;
  }
`;

export const DispalyEachPage = ({ data }) => {
  return (
    <DataWrapper>
      <ExpenseTableHeading col={"#faf8f8"} bgcol={"#333333"} />
      {data.map((item, idx) => {
        return (
          <ExpenseItem
            key={idx}
            col={"#000000"}
            bgcol={idx % 2 === 0 ? "#f5f5f5" : "#e0e0e0"}
            expense={item}
          />
        );
      })}
    </DataWrapper>
  );
};
