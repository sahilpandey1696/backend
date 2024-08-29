import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Blank = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const resetPassword = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/verify-email",
        headers: {
          "Content-Type": "application/json",
        },
        data: state,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    const res = await resetPassword();
    if (res?.status === 200) {
      localStorage.setItem("emails", state.email);
      alert("reset link is shared to your email");
      navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>enter registered email</h1>
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
        <button onClick={handleSubmit}>submit</button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default Blank;
