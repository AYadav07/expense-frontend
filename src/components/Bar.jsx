import React from "react";
import styled from "styled-components";

const BarConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;

  @media (max-width: 480px) {
    gap: 1vh;
  }
`;
const Data = styled.div``;
const Bottom = styled.div``;
const Bars = styled.div`
  height: ${(props) => {
    return props.height + "vh";
  }};
  background-color: red;
  width: ${(props) => {
    return props.width + "vw";
  }};

  @media (max-width: 480px) {
    height: ${(props) => {
      return props.height / 2 + "vh";
    }};
    width: ${(props) => {
      return props.width / 2 + "vw";
    }};
  }
`;
export const Bar = ({
  amount,
  height,
  label,
  barcolor,
  barbackground,
  width,
}) => {
  return (
    <BarConatiner b={barbackground}>
      <Data>{amount}</Data>
      <Bars height={height} barcolor={barcolor} width={width}></Bars>
      <Bottom>{label}</Bottom>
    </BarConatiner>
  );
};
