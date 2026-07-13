import { createBrowserRouter } from "react-router";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: Body,
    children: [
      { index: true, Component: Feed },
      { path: "login", Component: Login },
      { path: "profile", Component: Profile },
      { path: "connections", Component: Connections },
      { path: "requests", Component: Requests },
    ],
  },
]);

export default AppRouter;
