import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { ResetPassReq } from "./components/resetPassword/ResetPassReq";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { Profile } from "./components/profile/Profile";
import { ChangePass } from "./components/change-password/ChangePass";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-pass-request" element={<ResetPassReq />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-pass" element={<ChangePass />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
