import React from "react";
import styled from "styled-components";

const BarConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
const Data = styled.div``;
const Bottom = styled.div``;
const Bars = styled.div`
  height: ${(props) => props.height};
  background-color: red;
  width: 2vw;
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
