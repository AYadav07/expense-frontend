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

  @media (max-width: 480px) {
    font-size: 12px;
    width: 90vw;
  }
`;
const Amount = styled.div`
  width: 20vw;
  @media (max-width: 480px) {
    width: 18vw;
  }
`;
const DateStyle = styled.div`
  width: 14vw;
  @media (max-width: 480px) {
    width: 13vw;
  }
`;
const Category = styled.div`
  width: 15vw;
  @media (max-width: 480px) {
    width: 14vw;
  }
`;
const Description = styled.div`
  width: 30vw;
  @media (max-width: 480px) {
    width: 28vw;
  }
`;
const DeleteIconStyle = styled.div`
  width: 3vw;
  @media (max-width: 480px) {
    width: 2vw;
  }
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
