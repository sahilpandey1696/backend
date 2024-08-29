import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import Home from "./component/home/Home";
import OtpVerify from "./component/otpverify/OtpVerify";
import UpdatePassword from "./component/updatePassword/UpdatePassword";
import ResetPassword from "./component/reset/ResetPassword";
import Blank from "./component/blank/Blank";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/otp-verify" element={<OtpVerify />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/update-password" element={<UpdatePassword />} />
        <Route exact path="/blank" element={<Blank />} />
        <Route exact path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
