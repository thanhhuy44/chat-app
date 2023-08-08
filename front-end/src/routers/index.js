import AuthLayout from "../layouts/AuthLayout";
import Mainlayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import ChatRoom from "../pages/ChatRoom";
import Profile from "../pages/Profile";
import ProfileLayout from "../layouts/ProfileLayout";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: Mainlayout,
  },
  {
    path: "/conversations",
    component: Chat,
    layout: Mainlayout,
  },
  {
    path: "/conversations/:id",
    component: ChatRoom,
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
  {
    path: "/profile",
    component: Profile,
    layout: ProfileLayout,
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
