import React from "react";
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
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Transition />,
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
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
