import React, { useEffect, useState } from "react";
import axios from "axios";
import { DispalyEachPage } from "./DispalyEachPage";
import { Pagination } from "./Pagination";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { updateAtom } from "../../recoil/atom/updateAtom";
import { Filter } from "../Filter";

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2vh;

  // overflow-y: visible;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2vh;
    padding-top: 3vh;
    max-width: 100vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2vh 1vw;
  min-width: 96vw;
  border-radius: 20px;
  gap: 4vh;

  @media (max-width: 480px) {
    min-width: 92vw;
  }
`;

const Button = styled.button`
  background-color: #706f6f;
  color: #353131;
  width: 7vw;
  padding: 1vh 1vw;
  cursor: pointer;
  margin-bottom: 1vh;
  margin-left: auto;
  margin-right: 1vw;
  border: none;
  border-radius: 10px;

  @media (max-width: 480px) {
    width: 20vw;
    margin-left: auto;
    margin-right: 1vw;
  }
`;

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const updated = useRecoilValue(updateAtom);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiUrl}/api/expense/get-all-expenses`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchExpenses();

    return () => {
      //console.log("Cleanup function ran");
    };
  }, [updated]);

  const itemPerPage = 10;

  const totalPages = Math.ceil(expenses.length / itemPerPage);

  const indexOfLastRecord = (currPage + 1) * itemPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemPerPage;
  const currentItems = expenses.slice(indexOfFirstRecord, indexOfLastRecord);

  console.log(expenses);
  return (
    <Container>
      {filter ? (
        <Filter setData={setExpenses} setFilter={setFilter} />
      ) : (
        <Button onClick={() => setFilter(true)}>Use Filter</Button>
        //<button onClick={() => setFilter(true)}> Use Filter</button>
      )}
      <DataWrapper>
        <DispalyEachPage data={currentItems} />
        <Pagination
          pageCount={totalPages}
          onPageChange={(page) => setCurrPage(page)}
          currentPage={currPage}
        />
      </DataWrapper>
    </Container>
  );
};
