import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Builder from "../pages/Builder";
import Templates from "../pages/Templates";
import Preview from "../pages/Preview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App sebagai layout utama
    children: [
      { index: true, element: <Home /> },
      { path: "/builder", element: <Builder /> },
      { path: "/templates", element: <Templates /> },
      { path: "/preview", element: <Preview /> },
    ],
  },
]);
