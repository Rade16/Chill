import React, { useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("username", username);
  formData.append("email", email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/updateUser/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/updatePassword/${user.id}`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewAvatar(URL.createObjectURL(file));
  };
  return (
    <div className="profile">
      <div className="profile__container">
        <form action="" className="profile__userForm" onSubmit={handleSubmit}>
          <h1 className="profile__userForm-title">Изменить профиль</h1>
          <div className="profile__userForm-user">
            <label htmlFor="avatar" className="profile__userForm-user-label">
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="profile__userForm-user-label-input"
                onChange={handleFileChange}
              />
              <img
                src={
                  previewAvatar || `http://localhost:3000/public${user.avatar}`
                }
                alt=""
                className="profile__userForm-user-img"
              />
            </label>
            <div className="profile__userForm-user-info">
              <input
                type="text"
                placeholder={user.username}
                className="profile__userForm-user-info-input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder={user.email}
                className="profile__userForm-user-info-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button className="profile__userForm-button" type="submit">
            Сохранить
          </button>
        </form>
        <form
          action=""
          className="profile__passwordForm"
          onSubmit={handlePasswordSubmit}
        >
          <h1 className="profile__passwordForm-title">Изменить пароль</h1>
          <input
            type="password"
            placeholder="Старый пароль"
            className="profile__passwordForm-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Новый пароль"
            className="profile__passwordForm-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="profile__passwordForm-button" type="submit">
            Изменить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
