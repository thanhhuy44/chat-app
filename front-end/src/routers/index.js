import AuthLayout from "../layouts/AuthLayout";
import Mainlayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: Mainlayout,
  },
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
