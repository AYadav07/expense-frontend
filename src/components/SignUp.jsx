import { useState } from "react";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUsername } from "../hooks/useUsername";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";
import { useLoginStatus } from "../hooks/checkLoginStatus";

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
  align-items: center;
  justify-content: center;
  gap: 5vh;
  background-color: #cccccc;
  width: 25vw;

  @media (max-width: 480px) {
    width: 82vw;
    gap: 3vh;
  }
`;
const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;

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
  height: 5vh;
  width: 20vw;
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

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useRecoilValue(userAtom);

  const loginStatus = useLoginStatus();

  if (loginStatus) {
    window.location.href = `/`;
  }

  const apiUrl = process.env.REACT_APP_API_URL;

  if (user && user.userId?.length > 0) {
    window.location.href = `/`;
  }

  const isAvail = useUsername(username, 300);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post(`${apiUrl}/api/auth/sign-up`, {
        username,
        email,
        password,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Heading>Sign Up</Heading>
          <InputItems>
            <Item>
              <Lable>User Name</Lable>
              <Input onChange={(e) => setUsername(e.target.value)} />
              {username.length >= 3 &&
                (isAvail ? (
                  <div style={{ color: "green", padding: "3px 0 0 5px" }}>
                    Username is available.
                  </div>
                ) : (
                  <div style={{ color: "red", padding: "3px 0 0 5px" }}>
                    Sorry! Username is not available.
                  </div>
                ))}
            </Item>
            <Item>
              <Lable>Email</Lable>
              <Input onChange={(e) => setEmail(e.target.value)} />
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
          <Button onClick={handleSubmit} disabled={!isAvail}>
            Sign Up
          </Button>
          <Link to="/sign-in">Sign In</Link>
        </Wrapper>
      </Container>
    </>
  );
};
