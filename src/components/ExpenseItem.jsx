/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vw;
  padding: 1vh 1vw;
  font-size: 25px;
  font-weight: 500;
  width: 90vw;
  background-color: ${(props) => props.col};
`;
const Amount = styled.div`
  flex: 2;
`;
const Date = styled.div`
  flex: 2;
`;
const Category = styled.div`
  flex: 3;
`;
const Description = styled.div`
  flex: 8;
`;

export const ExpenseItem = (props) => {
  return (
    <>
      <Container col={props.color}>
        <Amount>$400</Amount>
        <Date>29-Dec-2023</Date>
        <Category>Grocery</Category>
        <Description>
          Spent so that I can save in my other Food Expenses.
        </Description>
      </Container>
    </>
  );
};
