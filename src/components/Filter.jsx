import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { MultiSelect } from "./MultiSelect";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// const DateContainer = styled.div``;
// const CategoryContainer = styled.div``;
// const SelectedContainer = styled.div``;
const FilterOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
`;
const Button = styled.button`
  background-color: #706f6f;
  color: #353131;
  width: 9vw;
  padding: 1vh 0.5vw;
  cursor: pointer;
  margin-bottom: 1vh;
  border: none;
  border-radius: 10px;
`;
const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
`;
const Label = styled.label`
  font-size: 16px;
`;
const Input = styled.input`
  width: 12vw;
  padding: 1vh 0.5vw;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  margin-bottom: 1vh;
`;

export const Filter = ({ setData, setFilter }) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [cats, setCats] = useState([]);
  const [filtered, setFiltered] = useState(false);

  async function handleFilter() {
    try {
      if (filtered) {
        setFilter(false);
      } else {
        setFiltered(true);
        const categories = cats.map((item) => item.value).join(",");
        const queryString = `cats=${categories}&fromDate=${fromDate}&toDate=${toDate}`;
        console.log(cats);
        console.log("Quesry String is : " + queryString);
        try {
          const resData = await axios.get(
            `http://localhost:5555/api/expense/get-expense-data?${queryString}`,
            { withCredentials: true }
          );
          console.log(resData);
          //console.log(setData);
          setData(resData.data);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   const queryString = `cats=${cats.join(
  //     ","
  //   )}&fromDate=${fromDate}&toDate=${toDate}`;
  //   async function getData() {
  //     try {
  //       const resData = await axios.get(
  //         `http://localhost:5555/api/expense/get-expense-data?${queryString}`,
  //         { withCredentials: true }
  //       );
  //       console.log(resData);
  //       console.log(setData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   getData();
  // }, []);

  let filterButtonValue = "Apply filter";
  if (filtered) {
    filterButtonValue = "Clear filter";
  }

  return (
    <Container>
      <FilterOption>
        <InputItems>
          <Label>From Date</Label>
          <Input type="date" onChange={(e) => setFromDate(e.target.value)} />
        </InputItems>
        <InputItems>
          <Label>To Date</Label>
          <Input type="date" onChange={(e) => setToDate(e.target.value)} />
        </InputItems>

        <InputItems>
          <Label>Select Category</Label>
          <MultiSelect setCats={setCats} cats={cats} />
        </InputItems>
        <Button onClick={handleFilter}>{filterButtonValue}</Button>
      </FilterOption>
    </Container>
  );
};