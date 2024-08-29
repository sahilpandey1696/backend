import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const otpGen = async (email) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "http://localhost:4000/api/v1/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: state,
    });

    if (res?.status == 200) {
      await otpGen(res.data.data.email);
      navigate("/otp-verify");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>login page</h1>
      <br />
      <br />
      <br />
      <form>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={state.email}
          onChange={handleChnage}
        />{" "}
        <br />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChnage}
        />{" "}
        <br />
        <br />
        <br />
        <br />
        <button onClick={handleSubmit}>submit</button>
        <br />
        <br />
        <p>
          new user <Link to="/signup">Sign up here</Link>{" "}
        </p>
        <p>
          forget password <Link to="/blank">click here</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
