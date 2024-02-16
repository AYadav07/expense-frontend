import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { ResetPassReq } from "./components/resetPassword/ResetPassReq";
import ResetPassword from "./components/resetPassword/ResetPassword";
import { Profile } from "./components/profile/Profile";
import { ChangePass } from "./components/change-password/ChangePass";
import { RecoilRoot } from "recoil";
import { Expenses } from "./components/expense-list/Expenses";
//import { Topbar } from "./components/Topbar";
import { Layout } from "./components/Layout";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/expense-list" element={<Expenses />} />
            <Route path="/change-pass" element={<ChangePass />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reset-pass-request" element={<ResetPassReq />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
