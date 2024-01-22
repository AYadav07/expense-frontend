import React, { useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #070119e2;
  color: white;
  font-size: 25px;
`;
const Wrapper = styled.div`
  padding: 8vh 2vw 0;
  display: flex;
`;

const ProfileDetails = styled.div`
  width: 57vw;
  background-color: azure;
  color: black;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2vw;
  margin-bottom: 5vh;
`;
const Lable = styled.label`
  flex: 4;
  padding: 5px 8px;
  background-color: rgb(217, 240, 230);
  border-radius: 5px;
`;
const Value = styled.div`
  flex: 8;
  background-color: rgb(152, 252, 44);
  border: 1px solid yellow;
  border-radius: 5px;
  padding: 5px 8px;
`;
const Input = styled.input`
  flex: 8;
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
  margin-left: auto;
  margin-right: 7vw;
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
`;

export const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("amar7");
  const [userName, setUserName] = useState("amar7");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  }
  let backgroundColorOnEdit = null;
  if (edit)
    backgroundColorOnEdit = {
      backgroundColor: "transparent",
      border: "1px solid grey",
      borderRadius: "10px",
      boxShadow: "5px 5px 8px #888888",
      padding: "5px 10px",
      fontSize: "20px",
      width: "25vw",
    };
  return (
    <Container>
      <Wrapper>
        <ProfileImage />
        <ProfileDetails>
          <Items>
            <Item>
              <Lable>Name</Lable>
              {!edit ? (
                <Value>{name}</Value>
              ) : (
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              )}
            </Item>
            <Item>
              <Lable>username</Lable>
              {!edit ? (
                <Value>{userName}</Value>
              ) : (
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              )}
            </Item>
            <Item>
              <Lable>Email</Lable>
              <Value style={backgroundColorOnEdit}>amr@gmail.com</Value>
            </Item>
          </Items>

          <Item>
            <Button onClick={() => setEdit((x) => !x)}>
              {edit ? "cancel" : "edit"}
            </Button>

            {edit && <Button onClick={handleSubmit}>Submit</Button>}
          </Item>
        </ProfileDetails>
      </Wrapper>
      <Input />
    </Container>
  );
};
