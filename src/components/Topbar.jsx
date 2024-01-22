import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const LeftDetails = styled.div``;
const RightDetails = styled.div``;

export const Topbar = () => {
  return (
    <Container>
      <LeftDetails></LeftDetails>
      <RightDetails>
        <Link to={"/profile"}>Profile</Link>
      </RightDetails>
    </Container>
  );
};
