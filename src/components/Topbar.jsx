import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 94vw;
  height: 8vh;
  background-color: #070119e2;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
`;
const LeftDetails = styled.div`
  display: flex;
  gap: 2vw;
`;
const RightDetails = styled.div`
  display: flex;
  gap: 2vw;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 2px 3px;
  border-radius: 5px;

  &:hover {
    color: red;
    background-color: white;
  }
`;

export const Topbar = () => {
  return (
    <Container>
      <LeftDetails>
        Logo
        <StyledLink to={"/"}>Home</StyledLink>
        <StyledLink to={"/"}>ExpenseList</StyledLink>
        <StyledLink to={"/"}>ExpenseList</StyledLink>
      </LeftDetails>

      <RightDetails>
        <StyledLink to={"/profile"}>Profile</StyledLink>
        <StyledLink to={"/change-pass"}>Change Password</StyledLink>
        LogOut
      </RightDetails>
    </Container>
  );
};
