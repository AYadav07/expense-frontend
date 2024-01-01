/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 500;
  width: 94vw;
  color: ${(props) => props.col};
  background-color: ${(props) => props.bgCol};
  border-radius: 5px;
`;
const Amount = styled.div`
  width: 20vw;
`;
const Date = styled.div`
  width: 14vw;
`;
const Category = styled.div`
  width: 15vw;
`;
const Description = styled.div`
  width: 43vw;
`;

const ExpenseItem = ({ color, bgCol, amount, date, category, desc }) => {
  return (
    <>
      <Container col={color} bgCol={bgCol}>
        <Amount>{amount}</Amount>
        <Date>{date}</Date>
        <Category>{category}</Category>
        <Description>{desc}</Description>
      </Container>
    </>
  );
};

export default ExpenseItem;
