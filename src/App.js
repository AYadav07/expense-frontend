import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
