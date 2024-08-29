import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  //   const updatePassword = async () => {
  //     try {
  //       const res = await axios({
  //         method: "post",
  //         url: "http://localhost:4000/api/v1/otp-verify",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: state,
  //       });
  //       return res;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    // const res = await otpVerify();
    // if (res?.status === 200) {
    //   navigate("/home");
    // }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>otp verify</h1>
      <br />
      <br />
      <br />
      <form>
        <input
          type="text"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={handleChnage}
        />{" "}
        <br />
        <br />
        <br />
        <button onClick={handleSubmit}>submit</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
