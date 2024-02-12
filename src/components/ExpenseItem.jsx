/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import React from "react";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//import DeleteIcon from "@styled-icons/fluentui-system-regular/Delete";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  padding: 1vh 1vw;
  font-size: 20px;
  font-weight: 500;
  width: 94vw;
  color: ${(props) => props.col};
  background-color: ${(props) => props.bgcol};
  border-radius: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
    width: 90vw;
  }
`;
const Amount = styled.div`
  width: 20vw;
  @media (max-width: 480px) {
    width: 18vw;
  }
`;
const DateStyle = styled.div`
  width: 14vw;
  @media (max-width: 480px) {
    width: 13vw;
  }
`;
const Category = styled.div`
  width: 15vw;
  @media (max-width: 480px) {
    width: 14vw;
  }
`;
const Description = styled.div`
  width: 30vw;
  @media (max-width: 480px) {
    width: 28vw;
  }
`;

const DeleteIconStyle = styled.div`
  width: 3vw;
  cursor: pointer;
  opacity: 0.5; // Set the initial opacity: ;
  transition: "opacity 0.3s ease";

  &:hover {
    color: red;
  }

  @media (max-width: 480px) {
    width: 2vw;
  }
`;

const ExpenseItem = ({ col, bgcol, expense, setUpdate }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `${apiUrl}/api/expense/remove-expense/${id}`,
        { withCredentials: true }
      );
      console.log(res);
      setUpdate((updated) => !updated);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(setUpdate);
  const parseDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(dateString);
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    const dateStr = `${months[month]} ${date}, ${year}`;

    return dateStr;
  };

  return (
    <>
      <Container col={col} bgcol={bgcol}>
        <Amount>₹{expense.amount}</Amount>
        <DateStyle>{parseDate(expense.expenseDate)}</DateStyle>
        <Category>{expense.category}</Category>
        <Description>{expense.description}</Description>
        {/*<DeleteIcon />*/}
        <DeleteIconStyle
          onClick={() => handleDelete(expense._id)}
          onMouseEnter={(e) => (e.target.style.opacity = 1)} // Make the element visible on hover
          onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
        >
          <DeleteOutlineOutlinedIcon />
        </DeleteIconStyle>
      </Container>
    </>
  );
};

export default ExpenseItem;
