import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
const Items = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 80vw;
  }
`;
const Label = styled.label`
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

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [matched, setMatched] = useState(false);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post(
        // eslint-disable-next-line no-undef
        `${apiUrl}/api/auth/reset-password`,
        { password },
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setMatched(password === confirmPass && password.length > 0);
  }, [password, confirmPass]);

  console.log(password);
  console.log(confirmPass);
  console.log(confirmPass === password);

  return (
    <Container>
      <Wrapper>
        <Heading>Reset password</Heading>
        <InputItems>
          <Items>
            <Label>Enter New Password :</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Items>
          <Items>
            <Label>Confirm new password :</Label>
            <Input
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {matched === false &&
              password.length > 0 &&
              confirmPass.length > 0 && (
                <div style={{ color: "red" }}>Password is not matching</div>
              )}
          </Items>
        </InputItems>
        <Button onClick={handleSubmit} disabled={!matched}>
          Reset Password
        </Button>
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
