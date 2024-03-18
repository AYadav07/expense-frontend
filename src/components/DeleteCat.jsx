import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { catAtom } from "../recoil/atom/catOptions";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const AddCatBG = styled.div`
  z-index: 10;
  background-color: #f9f8fa;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh 1vw;
  border-radius: 15px;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
`;

const CloseIcon = styled.div`
  margin-left: auto;
  margin-bottom: 3vh;
  cursor: pointer;
  margin-top: 0;
`;
const Label = styled.label`
  font-size: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20vw;
  padding: 0.5vh 3vw;
  background-color: ${(props) => (props.val ? "#e9c7dd" : "#c7d2e9")};
  border-radius: 5px;

  @media (max-width: 480px) {
    width: 80vw;
  }
`;

export const DeleteCat = ({ setDel }) => {
  const [cat, setCat] = useRecoilState(catAtom);

  async function handelDelete(item) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/expense/remove-category`,
        {
          cat: item,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data)
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
          <Items key={index} val={index % 2 == 0}>
            <Label>{item}</Label>
            <Button onClick={() => handelDelete(item)}>
              <DeleteOutlineOutlinedIcon />
            </Button>
          </Items>
        );
      })}
      ;
    </AddCatBG>
  );
};
