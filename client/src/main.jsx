import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";
import Transition from "./screens/Transition/Transition.jsx";
import Cinema from "./screens/Cinema/Cinema.jsx";
import FilmPage from "./components/FilmPage/FilmPage.jsx";
import Films from "./screens/Films/Films.jsx";
import Music from "./screens/Music/Music.jsx";
import MusicMain from "./screens/MusicMain/MusicMain.jsx";
import Collections from "./screens/Collections/Collections.jsx";
import Series from "./screens/Series/Series.jsx";
import SeriesPage from "./components/SeriesPage/SeriesPage.jsx";
import Login from "./screens/Login/Login.jsx";
import Registration from "./screens/Registration/Registration.jsx";
import Profile from "./screens/Profile/Profile.jsx";
import Admin from "./screens/Admin/Admin.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  const { user, setUser } = useAuth();
  console.log(user);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:3000/api/auth/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    index: true,
    loader: () => redirect("/login"),
  },
  {
    path: "/transition",
    element: <Transition />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },

  {
    path: "/cinema",
    element: <Cinema />,
    children: [
      {
        index: true,
        loader: () => redirect("/cinema/films"),
      },
      {
        path: "/cinema/films",
        element: <Films />,
      },
      {
        path: "/cinema/films/:filmId",
        element: <FilmPage />,
      },
      {
        path: "/cinema/series",
        element: <Series />,
      },
      {
        path: "/cinema/series/:seriesId",
        element: <SeriesPage />,
      },
      {
        path: "/cinema/series/:seriesId/episode/:episodeId",
        element: <SeriesPage />,
      },
      {
        path: "/cinema/series/:seriesId/season/:seasonId/episode/:episodeId",
        element: <SeriesPage />,
      },
      {
        path: "/cinema/profile/:id",
        element: <Profile />,
      },
      {
        path: "/cinema/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/music",
    element: <Music />,
    children: [
      {
        index: true,
        loader: () => redirect("/music/main"),
      },
      {
        path: "/music/main",
        element: <MusicMain />,
      },
      {
        path: "/music/collections",
        element: <Collections />,
      },
      {
        path: "/music/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
