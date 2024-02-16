import React from "react";
import styled from "styled-components";
import { Bar } from "./Bar";

const BarchartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 96vw;
  border-radius: 10px;
  padding: 2vh 1vw;
  margin-bottom: 2vh;
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const BarGraph = styled.div`
  width: 90vw;
  padding: 5vh 1vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.7vw;

  @media (max-width: 480px) {
    width: 88vw;
    font-size: 10px;
    justify-content: space-between;
    gap: 0.5vw;
  }
`;

const Heading = styled.div`
  align-items: center;
  color: #a202ff;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 15px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const BarChart = ({ data, width, heading }) => {
  const maxValue = Math.max(...data.map((item) => item.amount));
  return (
    <BarchartContainer>
      <Heading>{heading}</Heading>
      <BarGraph>
        {data.map((item, index) => {
          const h = (item.amount / maxValue) * 40;

          return (
            <Bar
              key={index}
              amount={item.amount}
              height={h}
              label={item.label}
              barcolor={"#45455"}
              barbackground={"#c8987"}
              width={width}
            />
          );
        })}
      </BarGraph>
    </BarchartContainer>
  );
};
