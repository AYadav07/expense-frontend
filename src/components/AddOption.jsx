import React from "react";
import styled from "styled-components";

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

const Input = styled.input`
  width: 16vw;
  height: 2vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
  border-radius: 8px;
  margin-bottom: 4vh;

  @media (max-width: 480px) {
    width: 40vw;
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

export const AddOption = ({
  setNewCategory,
  handleAddingCategory,
  setAddCategory,
}) => {
  return (
    <AddCatBG>
      <CloseIcon onClick={() => setAddCategory(false)}>X</CloseIcon>
      <Label>New category</Label>
      <Input
        placeholder="Category"
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={handleAddingCategory}>Add category</Button>
    </AddCatBG>
  );
};
