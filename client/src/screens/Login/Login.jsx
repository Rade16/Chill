import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const userResponse = await axios.get(
        "http://localhost:3000/api/auth/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(userResponse.data.user);
      navigate("/transition");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__form-title">Авторизация</h1>

        <input
          className="login__form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__form-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__form-button" type="submit">
          Войти
        </button>
        <p className="login__form-text">Еще нет аккаунта?</p>
        <Link to={"/registration"}>
          <p className="login__form-link">Зарегестрироваться</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
