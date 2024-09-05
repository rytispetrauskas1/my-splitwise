// src/pages/LoginPage.tsx

import React, { useState } from "react";
import "./LoginPage.css";
import { useGlobalState } from "../context/globalState";

const defaultUsers = [
  {
    id: 1,
    username: "rytis",
    password: "rytis1",
  },
  {
    id: 2,
    username: "vilte",
    password: "vilte1",
  },
];

const LoginPage: React.FC = () => {
  const { dispatch } = useGlobalState();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const checkPassword = (password: string) => {
    console.log(loginPassword);
    console.log(password);
    return loginPassword === password;
  };

  const checkLoginCreds = () => {
    const user = defaultUsers.find((user) => user.username === loginUsername);
    if (user && checkPassword(user.password)) {
      return user;
    }
    return null;
  };

  const handleLogin = () => {
    const user = checkLoginCreds();
    if (user) {
      dispatch({
        type: "SET_USERS",
        payload: defaultUsers,
      });
      dispatch({
        type: "SET_CURRENT_USER",
        payload: { id: user.id, username: loginUsername },
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="app-name">My Splitwise Copy</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            placeholder="Enter your username"
            className="login-input"
          />
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter your password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
