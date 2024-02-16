import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    gap: 1vw;
    max-width: 90vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Button = styled.button`
  font-size: 20px;
  padding: 5px 8px;
  color: ${(props) => {
    return props.currPage ? "#e1dce2" : "aliceblue";
  }};
  background-color: ${(props) => {
    return props.currPage ? "#da38dd" : "#5b5858";
  }};
  border-radius: 5px;
  border: none;
`;

export const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  function handleClick(page) {
    onPageChange(page);
  }

  return (
    <Container>
      {pages.map((page, idx) => {
        return (
          <Button
            key={idx}
            onClick={() => handleClick(page - 1)}
            currPage={currentPage === page - 1}
          >
            {page}
          </Button>
        );
      })}
    </Container>
  );
};
