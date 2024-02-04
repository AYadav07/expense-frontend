import React, { useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "./ProfileImage";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/atom/userAtom";

const Container = styled.div`
  min-width: 90vw;
  min-height: 90vh;
  background-color: #070119e2;
  color: white;
  font-size: 25px;
  padding: 5vh 5vw;

  @media (max-width: 480px) {
    min-width: 90vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Wrapper = styled.div`
  background-color: azure;
  display: flex;
  justify-content: center;
  padding: 5vh 2vw;
  border-radius: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    width: 86vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ProfileDetails = styled.div`
  width: 60vw;
  background-color: azure;
  color: black;
  padding: 2vh 2vw;
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 82vw;
    align-items: center;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  @media (max-width: 480px) {
    width: 82vw;
    justify-content: center;
    align-items: center;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2vw;
  margin-bottom: 5vh;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    gap: 2vh;
    max-width: 82vw;
    margin-bottom: 3vh;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Lable = styled.label`
  flex: 4;
  padding: 5px 8px;
  background-color: rgb(217, 240, 230);
  border-radius: 5px;
  @media (max-width: 480px) {
    flex: auto;
    width: 70vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Value = styled.div`
  flex: 8;
  background-color: rgb(152, 252, 44);
  border: 1px solid yellow;
  border-radius: 5px;
  padding: 5px 8px;
  @media (max-width: 480px) {
    flex: auto;
    width: 70vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
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
    flex: auto;
    width: 70vw;
    &::-webkit-scrollbar {
      display: none;
    }
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
  @media (max-width: 480px) {
    width: 60vw;
  }
`;

export const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const user = await axios.post(
        "https://expense-server-db0x.onrender.com/api/profile/update-profile",
        { name, username },
        { withCredentials: true }
      );
      setUser(user.data);
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
              <Value style={backgroundColorOnEdit}>{user.email}</Value>
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
