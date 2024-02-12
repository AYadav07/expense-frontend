import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";
import { catAtom } from "../recoil/atom/catOptions";
import { deleteCookie } from "../utils/browserStorage";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

const Wrapper = styled.div`
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

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100vw;
    height: auto;
    gap: 2vh;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const LeftDetails = styled.div`
  display: flex;
  gap: 2vw;
  @media (max-width: 480px) {
    width: 90vw;
    display: ${(props) => {
      if (props.open == true) return "flex";
      else return "none";
    }};
    flex-direction: column;
    gap: 2vh;
    align-items: center;
  }
`;
const RightDetails = styled.div`
  display: flex;
  gap: 2vw;
  @media (max-width: 480px) {
    width: 90vw;
    display: ${(props) => {
      if (props.open == true) return "flex";
      else return "none";
    }};
    flex-direction: column;
    gap: 2vh;
    align-items: center;
    padding-bottom: 1vh;
  }
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

const Icon = styled.div`
  display: none;

  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    padding: 1vh 0;
  }
`;

export const Topbar = () => {
  const setUser = useSetRecoilState(userAtom);
  const setCat = useSetRecoilState(catAtom);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handelLogout() {
    try {
      deleteCookie("access_token");
      console.log(document);

      setUser({
        username: "",
        email: "",
        name: "",
        profile_pic: "",
        userId: "",
      });
      setCat([]);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Wrapper open={open}>
        <Icon>
          {open ? (
            <MenuOpenOutlinedIcon onClick={() => setOpen(false)} />
          ) : (
            <MenuOutlinedIcon onClick={() => setOpen(true)} />
          )}
        </Icon>

        <LeftDetails open={open}>
          Logo
          <StyledLink to={"/"}>Home</StyledLink>
          <StyledLink to={"/"}>ExpenseList</StyledLink>
          <StyledLink to={"/"}>ExpenseList</StyledLink>
        </LeftDetails>

        <RightDetails open={open}>
          <StyledLink to={"/profile"}>Profile</StyledLink>
          <StyledLink to={"/change-pass"}>Change Password</StyledLink>
          <button onClick={handelLogout}>Logout</button>
        </RightDetails>
      </Wrapper>
    </>
  );
};
