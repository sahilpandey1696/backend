import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const createApi = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/create",
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
    const res = await createApi();
    if (res?.status === 200) {
      navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>sign up page</h1>
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
          Already have an account <Link to="/">Login up here</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
