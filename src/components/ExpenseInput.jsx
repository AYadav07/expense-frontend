import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  padding: 2vh 1vw;
  min-width: 96vw;
  background-color: grey;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1vh;
`;

const Label = styled.label`
  color: #2e0149;
  font-size: 20px;
`;

const Input = styled.input`
  width: 16vw;
  height: 2vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
  border-radius: 8px;
`;

const DropDownItems = styled.select`
  width: 16vw;
  height: 4vh;
  font-size: 20px;
  padding: 0 0.5vw;
  border-radius: 8px;
`;

const AddCatBG = styled.div`
  z-index: 10;
  background-color: #086be4;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 10;
  padding: 2vh 1vw;
`;

const Options = styled.option`
  width: 16vw;
  height: 12vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 500;
  background-color: teal;
  color: yellow;
  border-radius: 10px;
  cursor: pointer;
`;

export const ExpenseInput = ({ setUpdate }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const expenseData = await axios.post(
        "http://localhost:5555/api/expense/add-expense",
        { amount, category, description, expenseDate },
        { withCredentials: true }
      );
      console.log(expenseData.data);
      setAmount(0);
      setCategory("");
      setDescription("");
      setExpenseDate(null);
      setUpdate((updated) => !updated);
    } catch (err) {
      console.log(err);
    }
  }

  const options = ["food", "drink", "grocerry"];
  console.log(typeof expenseDate);

  function handleAddingCategory(e) {
    e.preventDefault();
    options.push(newCategory);
    console.log(options);
    setAddCategory(false);
    setNewCategory("");
  }

  function onChangeDropdown(e) {
    if (e.target.value === "Add new category") {
      setAddCategory(true);
      console.log(addCategory);
    } else {
      setCategory(e.target.value);
    }
  }

  return (
    <InputWrapper>
      <InputItems>
        <Label>Amount</Label>
        <Input
          value={amount > 0 ? amount : ""}
          placeholder="$ Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </InputItems>
      <InputItems style={{ position: "relative" }}>
        <Label>Category</Label>
        {/* <Input
          placeholder="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        /> */}
        <DropDownItems value={category} onChange={onChangeDropdown}>
          {options.map((option, index) => (
            <>
              <Options key={index} value={option}>
                {option}
              </Options>
              <p>del</p>
            </>
          ))}
          <Options value={"Add new category"}>Add new category</Options>
        </DropDownItems>
        {addCategory && (
          <AddCatBG>
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddingCategory}>Add category</Button>
          </AddCatBG>
        )}
      </InputItems>
      <InputItems>
        <Label>Description</Label>
        <Input
          placeholder="description of kharcha"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
      </InputItems>
      <InputItems>
        <Label>Date</Label>
        <Input
          type="date"
          value={expenseDate ? expenseDate : ""}
          onChange={(e) => {
            setExpenseDate(e.target.value);
          }}
        />
      </InputItems>
      <InputItems>
        <Button onClick={handleSubmit}>Add Expense</Button>
      </InputItems>
    </InputWrapper>
  );
};
