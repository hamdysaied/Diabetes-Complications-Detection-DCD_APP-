import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import auth from "../firebaseAuth";
import Button from "./Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-top: 1rem;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  label {
    font-size: 1rem;
  }
  input {
    ::placeholder {
      opacity: 0.6;
    }
    border: none;
    border-radius: 0.2rem;
    padding: 0.8rem;
    background-color: #f1f1f1;
    width: 100%;
    box-sizing: border-box;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const handleInputChange = (e, setData) => {
    setData(e.target.value);
  };

  const handleLogin = async (e) => {
    console.log("lol");
    e.preventDefault();
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
  };

  if (!register)
    return (
      <div style={{ width: "clamp(250px, 40%, 400px)" }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="stepContent">
          <StyledForm className="textWrapper" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="example@email.com"
                name=""
                id="email"
                value={email}
                onChange={(e) => {
                  handleInputChange(e, setEmail);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name=""
                id="password"
                value={password}
                onChange={(e) => {
                  handleInputChange(e, setPassword);
                }}
              />
            </div>
            <Button
              style={{
                marginTop: "1rem",
                textAlign: "center",
                display: "block",
              }}
              text="white"
              color="#178dc2"
              type="submit"
            >
              Login
            </Button>
          </StyledForm>
          <p style={{ textAlign: "right", marginTop: "10px" }}>
            Don't have an account?{" "}
            <span
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => {
                setRegister(true);
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    );
  return (
    <div style={{ width: "clamp(250px, 40%, 400px)" }}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <div className="stepContent">
        <StyledForm className="textWrapper" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="example@email.com"
              name=""
              id="email"
              value={email}
              onChange={(e) => {
                handleInputChange(e, setEmail);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              value={password}
              onChange={(e) => {
                handleInputChange(e, setPassword);
              }}
            />
          </div>
          <Button
            style={{
              marginTop: "1rem",
              textAlign: "center",
              display: "block",
            }}
            text="white"
            color="#178dc2"
            type="submit"
          >
            Register
          </Button>
        </StyledForm>
        <p style={{ textAlign: "right", marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => {
              setRegister(false);
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
