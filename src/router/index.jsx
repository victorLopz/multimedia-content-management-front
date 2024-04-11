import { useRoutes } from "react-router-dom";

import SideMenu from "../layouts/side-menu/Main";
import { PrivateRoute } from "./PrivateRoute";
import { MODULOS } from "../utils/constants";

// Paginas
import Login from "../views/Login";
import Inicio from "../views/Inicio";
import NoAutorizado from "../views/NoAutorizado";
import NoEncontrado from "../views/NoEncontrado";
import { Content } from "../views/content/Content";
import { Theme } from "../views/theme/Theme";
import { AddContent } from "../views/content/AddContent";
import { AddTheme } from "../views/theme/AddTheme";

function Router() {
  const routes = [
    { path: "/", element: <Login /> },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <SideMenu />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute key={10 + Math.random() * 1000}>
              <Inicio />
            </PrivateRoute>
          )
        },
        {
          path: "content",
          element: (
            <PrivateRoute key={10 + Math.random() * 1000}>
              <Content />
            </PrivateRoute>
          )
        },
        {
          path: "content/agregar/:id",
          element: (
            <PrivateRoute key={10 + Math.random() * 1000}>
              <AddContent />
            </PrivateRoute>
          )
        },
        {
          path: "theme",
          element: (
            <PrivateRoute key={10 + Math.random() * 1000}>
              <Theme />
            </PrivateRoute>
          )
        },
        {
          path: "theme/agregar/:id",
          element: (
            <PrivateRoute key={10 + Math.random() * 1000}>
              <AddTheme />
            </PrivateRoute>
          )
        }
      ]
    },
    { path: "/no-autorizado", element: <NoAutorizado /> },
    { path: "*", element: <NoEncontrado /> }
  ];

  return useRoutes(routes);
}

export default Router;
