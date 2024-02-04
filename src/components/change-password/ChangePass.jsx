import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-width: 100vw;
  min-height: 85vh;
  background-color: #070119e2;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    padding-top: 5vh;
    padding-bottom: 10vh;
    width: 96vw;
    flex-direction: column;
    justify-content: flex-start;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Wrapper = styled.div`
  width: 40vw;
  background-color: azure;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5vh 2vw;
  border-radius: 20px;

  @media (max-width: 480px) {
    width: 90vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Items = styled.div`
  padding: 3vh 2vw;
  display: flex;
  flex-direction: column;
  background-color: #f3f7f7;
  border-radius: 10px;
  gap: 2vh;
  @media (max-width: 480px) {
    width: 84vw;
    gap: 1vh;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5vw;
  margin-bottom: 5vh;

  @media (max-width: 480px) {
    width: 82vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Lable = styled.label`
  padding: 5px 8px;
  border-radius: 5px;
`;
const Heading = styled.div`
  align-items: center;
  color: #a202ff;
  font-size: 35px;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 0 10vh;
  @media (max-width: 480px) {
    padding: 0 0 3vh;
    &::-webkit-scrollbar {
      display: none;
    }
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
    width: 80vw;
  }
`;
const Button = styled.button`
  background-color: teal;
  width: 10vw;
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
    width: 60vw;
  }
`;

export const ChangePass = () => {
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const [matched, setMatched] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = axios.post(
        "https://expense-server-db0x.onrender.com/api/auth/change-pass",
        { pass, oldPass },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMatched(pass === confPass && pass.length > 0);
  }, [pass, confPass]);

  return (
    <Container>
      <Wrapper>
        <Heading>Change your password </Heading>
        <Items>
          <Item>
            <Lable>Enter old password</Lable>
            <Input
              type="password"
              onChange={(e) => setOldPass(e.target.value)}
              value={oldPass}
            />
          </Item>
          <Item>
            <Lable>Enter new password</Lable>
            <Input
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
          </Item>
          <Item>
            <Lable>Confirm password</Lable>
            <Input
              type="password"
              onChange={(e) => setConfPass(e.target.value)}
              value={confPass}
            />
            {matched === false && pass.length > 0 && confPass.length > 0 && (
              <div style={{ color: "red" }}>Password is not matching</div>
            )}
          </Item>
        </Items>
        <Button onClick={handleSubmit} disabled={!matched}>
          {" "}
          Change Password
        </Button>
      </Wrapper>
    </Container>
  );
};
