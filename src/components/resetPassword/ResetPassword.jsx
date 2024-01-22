import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div``;
const InputItems = styled.div``;
const Items = styled.div``;
const Label = styled.label``;
const Input = styled.input``;
const Button = styled.button`
  cursor: pointer;
`;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [matched, setMatched] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post(
        "http://localhost:5555/api/auth/reset-password",
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
        <InputItems>
          <Items>
            <Label>Enter New Password :</Label>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </Items>
          <Items>
            <Label>Confirm new password :</Label>
            <Input onChange={(e) => setConfirmPass(e.target.value)} />
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
