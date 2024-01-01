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

const Button = styled.button`
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 500;
  background-color: teal;
  color: yellow;
  border-radius: 10px;
  cursor: pointer;
`;

export const ExpenseInput = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const expenseData = await axios.post(
        "http://localhost:5555/api/expense/add-expense",
        { amount, category, description, expenseDate },
        { withCredentials: true }
      );
      console.log(expenseData.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <InputWrapper>
      <InputItems>
        <Label>Amount</Label>
        <Input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </InputItems>
      <InputItems>
        <Label>Category</Label>
        <Input
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
      </InputItems>
      <InputItems>
        <Label>Description</Label>
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </InputItems>
      <InputItems>
        <Label>Date</Label>
        <Input
          type="date"
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
