import React, { useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";
import axios from "axios";

const Container = styled.div`
  min-width: 90vw;
  min-height: 90vh;
  background-color: #070119e2;
  color: white;
  font-size: 25px;
  padding: 5vh 5vw;
`;
const Wrapper = styled.div`
  background-color: azure;
  display: flex;
  justify-content: center;
  padding: 5vh 2vw;
  border-radius: 20px;
`;

const ProfileDetails = styled.div`
  width: 60vw;
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
  const [username, setUsername] = useState("amar7");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const user = await axios.post(
        "http://localhost:5555/api/profile/update-profile",
        { name, username },
        { withCredentials: true }
      );
      console.log(user);
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
                <Value>{username}</Value>
              ) : (
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
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
    </Container>
  );
};
