import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";
import { catAtom } from "../recoil/atom/catOptions";

const Container = styled.div`
  display: flex;
  width: 96vw;
  height: 8vh;
  background-color: #274da4df;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  position: fixed;
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const LeftDetails = styled.div`
  display: flex;
  gap: 2vw;
`;
const RightDetails = styled.div`
  display: flex;
  gap: 2vw;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 2px 3px;
  border-radius: 5px;

  &:hover {
    color: red;
    background-color: white;
  }
`;

export const Topbar = () => {
  const setUser = useSetRecoilState(userAtom);
  const setCat = useSetRecoilState(catAtom);
  const navigate = useNavigate();

  async function handelLogout() {
    try {
      const data = await axios.get(
        "https://expense-server-db0x.onrender.com/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setUser({
        username: "",
        email: "",
        name: "",
        profile_pic: "",
        cat: [],
      });
      setCat([]);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <LeftDetails>
        Logo
        <StyledLink to={"/"}>Home</StyledLink>
        <StyledLink to={"/"}>ExpenseList</StyledLink>
        <StyledLink to={"/"}>ExpenseList</StyledLink>
      </LeftDetails>

      <RightDetails>
        <StyledLink to={"/profile"}>Profile</StyledLink>
        <StyledLink to={"/change-pass"}>Change Password</StyledLink>
        <button onClick={handelLogout}>Logout</button>
      </RightDetails>
    </Container>
  );
};
