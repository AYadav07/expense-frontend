import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { catAtom } from "../recoil/atom/catOptions";

const AddCatBG = styled.div`
  z-index: 10;
  background-color: #f8f9fa;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 1vw;
  border-radius: 15px;
  height: 30vh;
  width: 30vw;

  @media (max-width: 480px) {
    width: 80vw;
  }
`;

const Button = styled.button`
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 500;
  background-color: teal;
  color: yellow;
  border-radius: 10px;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const CloseIcon = styled.div`
  margin-left: auto;
  margin-bottom: 3vh;
  cursor: pointer;
  margin-top: 0;
`;
const Label = styled.label`
  font-size: 20px;
  margin-bottom: 1vh;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const DeleteCat = ({ setDel }) => {
  const [cat, setCat] = useRecoilState(catAtom);

  console.log("first");
  console.log(cat);

  async function handelDelete(item) {
    try {
      setCat((cats) => {
        const newCat = cats.filter((val) => val != item);
        return newCat;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AddCatBG>
      <CloseIcon onClick={() => setDel(false)}>X</CloseIcon>
      {cat.map((item, index) => {
        return (
          <Items key={index}>
            <Label>{item}</Label>
            <Button onClick={() => handelDelete(item)}>X</Button>
          </Items>
        );
      })}
      <Items>
        <Label>{"item"}</Label>
        <Button onClick={() => handelDelete("item")}>X</Button>
      </Items>
      ;
    </AddCatBG>
  );
};
