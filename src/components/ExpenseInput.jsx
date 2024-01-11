import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { AddOption } from "./AddOption";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 1vw;
  min-width: 96vw;
  background-color: grey;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  padding: 2vh 1vw;
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 20px;
  background-color: #f8f8f8;
`;

export const ExpenseInput = ({ setUpdate }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [addDate, setAddDate] = useState(false);
  const [newCategory, setNewCategory] = useState();
  const [error, setError] = useState();

  function validateInput() {
    if (amount <= 0 || amount > 9999999) {
      const err = new Error("Amount should be between 1 and 9999999");
      err.type = "amount";
      throw err;
    }
    if (description.length > 200) {
      const err = new Error(
        "The description should not be more than 200 words"
      );
      err.type = "desc";
      throw err;
    }
    if (expenseDate) {
      const now = new Date();
      const enteredDate = new Date(expenseDate);

      if (now < enteredDate) {
        const err = Error("Date Should be less than current date and time");
        err.type = "date";
        throw err;
      }
    }

    return true;
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      validateInput();
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
      setError("");
      setAddDate(false);
      setUpdate((updated) => !updated);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      //console.log(error.type);
      setError(err.message);
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
    <InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputWrapper>
        <InputItems>
          <Label>Amount</Label>
          <Input
            value={amount > 0 ? amount : ""}
            placeholder="₹ Amount"
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
            <Options value={""}>Select</Options>
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
            <AddOption
              setNewCategory={setNewCategory}
              handleAddingCategory={handleAddingCategory}
              setAddCategory={setAddCategory}
            />
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
        {addDate && (
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
        )}

        <InputItems>
          {!addDate && (
            <Label
              style={{ cursor: "pointer" }}
              onClick={() => setAddDate(true)}
            >
              Add date also
            </Label>
          )}
          <Button disabled={addCategory} onClick={handleSubmit}>
            Add Expense
          </Button>
        </InputItems>
      </InputWrapper>
    </InputContainer>
  );
};
