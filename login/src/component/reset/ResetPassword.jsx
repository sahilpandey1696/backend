import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [state, setState] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const resetPassword = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:4000/api/v1//reset/${token}`,
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
    let rea = localStorage.getItem("emails");
    console.log(rea);
    console.log(state);
    e.preventDefault();
    const res = await resetPassword();
    if (res?.status === 200) {
      alert("Your password is updated");
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>reset Password page</h1>
      <br />
      <br />
      <br />
      <form>
        <input
          type="password"
          placeholder="newPassword"
          name="newPassword"
          value={state.newPassword}
          onChange={handleChnage}
        />{" "}
        <br />
        <br />
        <br />
        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChnage}
        />{" "}
        <br />
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

export default ResetPassword;
