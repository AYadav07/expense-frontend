import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #121212;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  //align-self: center;
  flex-grow: 1; // Fill remaining space
  min-width: 0;
  font-size: 20px;
`;
const Wrapper = styled.div`
  padding: 12vh 5vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8vh;
  background-color: #cccccc;
  width: 25vw;

  @media (max-width: 480px) {
    width: 90vw;
  }
`;
const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const Lable = styled.label`
  padding-left: 0.5vw;
  padding-bottom: 1vh;
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
    width: 90vw;
  }
`;
const Button = styled.button`
  background-color: teal;
  margin: 0 15px;
  height: 5vh;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 5px 5px 8px #888888;
  cursor: pointer;

  &:hover {
    transition: all 1s ease;
    background-color: #007bff;
  }
`;

export const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        "http://localhost:5555/api/auth/sign-in",
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
      navigate("/");
      console.log(data, userId, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
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
        </Wrapper>
      </Container>
    </>
  );
};
