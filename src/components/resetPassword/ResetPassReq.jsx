import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div``;
const InputItems = styled.div``;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button``;

export const ResetPassReq = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        "http://localhost:5555/api/auth/reset-pass-req",
        { email }
      );
      setData(data.data);
    } catch (err) {
      setError(err.message);
    }
  }

  let resMessage;
  if (data.length > 0) {
    resMessage = <h1 style={{ color: "green" }}>{data}</h1>;
  } else if (error.length > 0) {
    resMessage = <h1 style={{ color: "red" }}>{error}</h1>;
  }
  return (
    <>
      <Container>
        <Wrapper>
          {resMessage ? (
            resMessage
          ) : (
            <>
              <InputItems>
                <Label>Input email :</Label>
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
