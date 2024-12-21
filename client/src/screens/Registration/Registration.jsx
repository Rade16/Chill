import React, { useState, useEffect } from "react";
import "./Registration.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/registration",
        { username, email, password }
      );
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration">
      <form action="" className="registration__form" onSubmit={handleSubmit}>
        <h1 className="registration__form-title">Регистрация</h1>
        <input
          className="registration__form-input"
          type="text"
          placeholder="Имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="registration__form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registration__form-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registration__form-button" type="submit">
          Зарегистрироваться
        </button>
        <p className="registration__form-text">Уже есть аккаунт?</p>
        <Link to={"/login"}>
          <p className="registration__form-link">Войти</p>
        </Link>
      </form>
    </div>
  );
};

export default Registration;
