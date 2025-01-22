import React, { useState } from "react";
import "./MusicNav.scss";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import { Link, NavLink } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import exit from "../../assets/exit.svg";
const MusicNav = ({ onSearch }) => {
  const { user, setUser } = useAuth();
  if (!user) {
    return <p>Загрузка...</p>;
  }

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
    alert("Вы вышли из аккаунта");
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="musicNav">
      <div className="musicNav__container">
        <Link to="/transition">
          <img src={logo} alt="" className="musicNav__logo" />
        </Link>
        <div className="musicNav__nav">
          <nav>
            <ul className="musicNav__list">
              <li className="musicNav__item">
                <NavLink
                  to="/music/main"
                  className={({ isActive }) =>
                    isActive ? "active" : "musicNav__item"
                  }
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/music/collections"
                  className={({ isActive }) =>
                    isActive ? "active" : "musicNav__item"
                  }
                >
                  Коллекции
                </NavLink>
              </li>
              {user.role === "admin" && (
                <li>
                  <NavLink
                    to="/music/admin"
                    className={({ isActive }) =>
                      isActive ? "active" : "musicNav__item"
                    }
                  >
                    Админ-панель
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className="musicNav__search">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="Поиск"
              className="musicNav__search-input"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="musicNav__user">
          <Link to={`/music/profile/${user.id}`}>
            <div className="musicNav__user-link">
              <img
                src={`http://localhost:3000/public${user.avatar}`}
                alt=""
                className="musicNav__user-avatar"
              />
              <p className="musicNav__user-name">{user.username}</p>
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

export default MusicNav;
