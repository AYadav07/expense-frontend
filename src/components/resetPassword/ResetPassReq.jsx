/* eslint-disable no-undef */
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #070119e2;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7vh;
  background-color: gainsboro;
  padding: 7vh 3vw 10vh;
  border-radius: 20px;
`;
const InputItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1vh;
`;
const Label = styled.label`
  padding-left: 1vw;
  padding-bottom: 1vh;
  font-size: 24px;

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
  width: 20vw;

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
  padding-bottom: 3vh;

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
  width: 15vw;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 5px 5px 8px #888888;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transition: all 1s ease;
    background-color: #007bff;
  }

  @media (max-width: 480px) {
    width: 50vw;
  }
`;

export const ResetPassReq = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await axios.post(`${apiUrl}/api/auth/reset-pass-req`, {
        email,
      });
      setData(data.data.message);
    } catch (err) {
      setError(err.message);
    }
  }

  let resMessage;
  if (data.length > 0) {
    resMessage = <h1 style={{ color: "green" }}>{data}</h1>;
  } else if (error.length > 0) {
    resMessage = <h1 style={{ color: "red" }}>Error in sending reset link</h1>;
  }
  return (
    <>
      <Container>
        <Wrapper>
          {resMessage ? (
            resMessage
          ) : (
            <>
              <Heading>Reset Passsword</Heading>
              <InputItems>
                <Label>Enter email :</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email@gmail.com"
                />
              </InputItems>
              <Button onClick={handleSubmit}>Reset Password</Button>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};
