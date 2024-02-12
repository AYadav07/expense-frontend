import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";
import { catAtom } from "../recoil/atom/catOptions";

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;
const Wrapper = styled.div`
  padding: 5vh 5vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8vh;
  background-color: #cccccc;
  width: 25vw;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 82vw;
    gap: 3vh;
  }
`;
const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;

  @media (max-width: 480px) {
    width: 80vw;
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 80vw;
  }
`;
const Lable = styled.label`
  padding-left: 0.5vw;
  padding-bottom: 1vh;

  @media (max-width: 480px) {
    width: 76vw;
  }
`;
const Input = styled.input`
  background: transparent;
  height: 4vh;
  border: 1px solid grey;
  border-radius: 10px;
  box-shadow: 5px 5px 8px #888888;
  padding: 5px 10px;
  font-size: 20px;
  width: 25vw;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    transition: all 0.3s ease;
  }

  &:focus {
  }
  @media (max-width: 480px) {
    width: 76vw;
  }
`;
const Heading = styled.div`
  align-items: center;
  color: #a202ff;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: 480px) {
    padding: 0 0 3vh;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Button = styled.button`
  background-color: teal;
  margin: 0 15px;
  width: 20vw;
  height: 5vh;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 5px 5px 8px #888888;
  cursor: pointer;

  &:hover {
    transition: all 1s ease;
    background-color: #007bff;
  }

  @media (max-width: 480px) {
    width: 50vw;
  }
`;

export const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useRecoilState(userAtom);
  const [cat, setCat] = useRecoilState(catAtom);

  const navigate = useNavigate();

  console.log("displaying user: ");
  console.log(user);
  // if (user.userId.length > 0) {
  //   navigate("/");
  // }
  // eslint-disable-next-line no-undef
  const apiUrl = process.env.REACT_APP_API_URL;
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        // eslint-disable-next-line no-undef
        `${apiUrl}/api/auth/sign-in`,
        {
          userId,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // eslint-disable-next-line no-undef
            //Authorization: `Bearer ${accessToken}`, // Replace with your token
          },
        }
      );
      console.log(data.data);
      if (data?.data.user) {
        setUser(data.data.user);
        setCat(data.data.cat);
      }
      navigate("/");
      console.log(cat);
      console.log(user);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  console.log("from .env" + apiUrl);
  return (
    <>
      <Container>
        <Wrapper>
          <Heading>Sign-In</Heading>
          <InputItems>
            <Item>
              <Lable>Email or Username</Lable>
              <Input onChange={(e) => setUserId(e.target.value)} />
            </Item>
            <Item>
              <Lable>Password</Lable>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Item>
          </InputItems>
          {error.length > 0 && <p>{error}</p>}
          <Button onClick={handleSubmit}> Sign In</Button>

          <Link to="/reset-pass-request">Reset Password</Link>
          <Link to="/sign-up">Sign Up</Link>
        </Wrapper>
      </Container>
    </>
  );
};
