import React from "react";
import styled from "styled-components";
import { Bar } from "./Bar";

const BarchartContainer = styled.div`
  background-color: white;
  max-width: 96vw;
`;

const BarGraph = styled.div`
  border-left: 2px solid balck;
  border-bottom: 2px solid black;
  padding: 5vh 3vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1vw;
`;

export const BarChart = ({ data }) => {
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
              height={`${h}vh`}
              label={item.label}
              barcolor={"#45455"}
              barbackground={"#c8987"}
              width={"2vw"}
            />
          );
        })}
      </BarGraph>
    </BarchartContainer>
  );
};
