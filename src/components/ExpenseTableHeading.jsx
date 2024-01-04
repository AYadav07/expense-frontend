import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 700;
  width: 94vw;
  color: ${(props) => props.col};
  background-color: ${(props) => props.bgcol};
  border-radius: 5px;
`;
const Amount = styled.div`
  width: 20vw;
`;
const DateStyle = styled.div`
  width: 14vw;
`;
const Category = styled.div`
  width: 15vw;
`;
const Description = styled.div`
  width: 38vw;
`;

const DeleteIconStyle = styled.div`
  width: 5vw;
`;

export const ExpenseTableHeading = ({ col, bgcol }) => {
  return (
    <Container col={col} bgcol={bgcol}>
      <Amount>Amount</Amount>
      <DateStyle>Date</DateStyle>
      <Category>Category</Category>
      <Description>Description</Description>
      <DeleteIconStyle>Action</DeleteIconStyle>
    </Container>
  );
};
