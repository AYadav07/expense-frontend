import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { AddOption } from "./AddOption";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DeleteCat } from "./DeleteCat";
import { catAtom } from "../recoil/atom/catOptions";
import { updateAtom } from "../recoil/atom/updateAtom";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 1vw;
  min-width: 96vw;
  background-color: grey;
  flex-wrap: wrap;
  border-radius: 10px;

  @media (max-width: 480px) {
    min-width: 92vw;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
  padding: 2vh 1vw;
  background-color: grey;
  flex-wrap: wrap;
  border-radius: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2vh;
    align-items: center;
    justify-content: center;
  }
`;

const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1vh;

  @media (max-width: 480px) {
    width: 85vw;
    flex-direction: row;
    gap: 1vw;
    justify-content: space-between;
    align-items: center;
  }
`;

const Label = styled.label`
  color: #2e0149;
  font-size: 15px;
`;

const Input = styled.input`
  width: 16vw;
  height: 3vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
  border-radius: 8px;

  @media (max-width: 480px) {
    width: 60vw;
    font-size: 15px;
  }
`;

const DropDownItems = styled.select`
  width: 16vw;
  height: 6vh;
  font-size: 20px;
  padding: 0 0.5vw;
  border-radius: 8px;

  @media (max-width: 480px) {
    width: 62vw;
    font-size: 15px;
    height: 4vh;
  }
`;

const Options = styled.option`
  width: 16vw;
  height: 12vh;
  font-size: 20px;
  padding: 1vh 0.5vw;
  border-radius: 8px;

  @media (max-width: 480px) {
    width: 60vw;
    font-size: 15px;
    height: 4vh;
  }
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

  @media (max-width: 480px) {
    padding: 1vh 1vw;
    font-size: 12px;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 20px;
  background-color: #f8f8f8;
`;

export const ExpenseInput = () => {
  const setUpdate = useSetRecoilState(updateAtom);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [addCategory, setAddCategory] = useState(false);
  const [addDate, setAddDate] = useState(false);
  const [newCategory, setNewCategory] = useState();
  const [error, setError] = useState();
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [cat, setCat] = useRecoilState(catAtom);
  const apiUrl = process.env.REACT_APP_API_URL;
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
        `${apiUrl}/api/expense/add-expense`,
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

  console.log(typeof expenseDate);

  async function handleAddingCategory(e) {
    try {
      e.preventDefault();

      const data = await axios.post(
        `${apiUrl}/api/expense/add-category`,
        { cat: newCategory },
        { withCredentials: true }
      );
      if (!data.data) throw new Error("Category not added");

      setCat([...cat, newCategory]);
      setAddCategory(false);
      setNewCategory("");
    } catch (err) {
      console.log(err);
    }
  }

  function onChangeDropdown(e) {
    if (e.target.value === "Add new category") {
      setAddCategory(true);
      console.log(addCategory);
    } else if (e.target.value === "delete category") {
      setDeleteCategory(true);
      console.log(deleteCategory);
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

          <DropDownItems value={category} onChange={onChangeDropdown}>
            <Options key={200002} value={""}>
              Select
            </Options>
            {cat?.map((option, index) => (
              <>
                <Options key={index} value={option}>
                  {option}
                </Options>
              </>
            ))}
            <Options key={200000} value={"Add new category"}>
              Add new category
            </Options>
            <Options key={200001} value={"delete category"}>
              Delete category
            </Options>
          </DropDownItems>
          {addCategory && (
            <AddOption
              setNewCategory={setNewCategory}
              handleAddingCategory={handleAddingCategory}
              setAddCategory={setAddCategory}
            />
          )}
          {deleteCategory && <DeleteCat setDel={setDeleteCategory} />}
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
