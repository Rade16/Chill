import React from "react";
import logo from "../../assets/logo.svg";
import "./CinemaNav.scss";
import search from "../../assets/search.svg";
import avatar from "../../assets/avatar.svg";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import exit from "../../assets/exit.svg";
import { use } from "react";

const CinemaNav = () => {
  const { user, setUser } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
    alert("Вы вышли из аккаунта");
  };
  console.log(user);
  return (
    <div className="cinemaNav">
      <div className="cinemaNav-container">
        <Link to="/transition">
          <img src={logo} alt="" className="cinemaNav-logo" />
        </Link>
        <nav className="cinemaNav-nav">
          <ul className="cinemaNav-nav-list">
            <li>
              <NavLink
                to="/cinema/films"
                className={({ isActive }) => {
                  return isActive ? "active" : "cinemaNav-nav-item";
                }}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cinema/series"
                className={({ isActive }) => {
                  return isActive ? "active" : "cinemaNav-nav-item";
                }}
              >
                Сериалы
              </NavLink>
            </li>
            {user.role == "admin" && (
              <li>
                <NavLink
                  to="/cinema/admin"
                  className={({ isActive }) => {
                    return isActive ? "active" : "cinemaNav-nav-item";
                  }}
                >
                  Админ-панель
                </NavLink>
              </li>
            )}
          </ul>
          <div className="cinemaNav-nav-search">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="Поиск"
              className="cinemaNav-nav-search-input"
            />
          </div>
        </nav>

        <div className="cinemaNav__user">
          <Link to={`/cinema/profile/${user.id}`}>
            <div className="cinemaNav__user-link">
              <img
                src={`http://localhost:3000/public/${user.avatar}`}
                alt=""
                className="cinemaNav__user-avatar"
              />
              <p className="cinemaNav__user-name">{user.username}</p>
            </div>
          </Link>
          <img
            src={exit}
            alt=""
            className="musicNav__user-logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default CinemaNav;
