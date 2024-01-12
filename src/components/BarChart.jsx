import React from "react";
import styled from "styled-components";
import { Bar } from "./Bar";

const BarchartContainer = styled.div`
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
    gap: 0;
  }
`;

export const BarChart = ({ data, width }) => {
  const maxValue = Math.max(...data.map((item) => item.amount));
  return (
    <BarchartContainer>
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
