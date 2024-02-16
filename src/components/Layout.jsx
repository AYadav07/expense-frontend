import React from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: #070119e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

export const Layout = () => {
  return (
    <Container>
      <Topbar />
      <Outlet />
    </Container>
  );
};
